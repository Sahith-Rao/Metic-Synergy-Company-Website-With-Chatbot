const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const FRONTEND_ROOT = path.resolve(__dirname, '../../frontend');

async function readFileSafe(filePath) {
  try {
    return await fsp.readFile(filePath, 'utf-8');
  } catch (_) {
    return '';
  }
}

async function listFilesRecursive(dir, exts) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) return listFilesRecursive(res, exts);
    const ext = path.extname(entry.name).toLowerCase();
    if (!exts || exts.includes(ext)) return [res];
    return [];
  }));
  return files.flat();
}

function extractRouteFromPath(absPath) {
  const rel = path.relative(FRONTEND_ROOT, absPath);
  if (rel.startsWith('src/pages')) {
    const base = rel.replace(/^src\/pages\//, '').replace(/\.tsx?$/, '');
    if (base.toLowerCase() === 'home') return '/';
    return '/' + base.replace(/index$/i, '').replace(/\\/g, '/');
  }
  return '/';
}

function stripTsxToText(source) {
  return source
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/\{[\s\S]*?\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = {
  readFileSafe,
  listFilesRecursive,
  extractRouteFromPath,
  stripTsxToText,
  FRONTEND_ROOT,
};


