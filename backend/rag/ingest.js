const path = require('path');
const { listFilesRecursive, readFileSafe, stripTsxToText, extractRouteFromPath } = require('./utils');

// Import Cohere correctly with the new SDK
const { CohereClient } = require('cohere-ai');

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function embedTexts(texts) {
  const maxRetries = 4;
  const baseDelayMs = 500;
  const batchSize = 90; // Cohere allows fairly large batches
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await cohere.embed({
          texts: batch.map(t => t || ''),
          model: 'embed-english-v3.0',
          inputType: 'search_document'
        });
        // cohere v3 returns { embeddings: number[][] }
        allEmbeddings.push(...res.embeddings);
        break;
      } catch (err) {
        const isRetryable = err?.statusCode === 429 || err?.statusCode >= 500;
        if (attempt < maxRetries - 1 && isRetryable) {
          const delay = baseDelayMs * Math.pow(2, attempt);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        // fallback per-item to ensure progress
        for (const t of batch) {
          let done = false;
          for (let a = 0; a < maxRetries; a++) {
            try {
              const single = await cohere.embed({
                texts: [t || ''],
                model: 'embed-english-v3.0',
                inputType: 'search_document'
              });
              allEmbeddings.push(single.embeddings[0]);
              done = true;
              break;
            } catch (e) {
              const retryable = e?.statusCode === 429 || e?.statusCode >= 500;
              if (a < maxRetries - 1 && retryable) {
                const delay = baseDelayMs * Math.pow(2, a);
                await new Promise(r => setTimeout(r, delay));
                continue;
              }
            }
          }
          if (!done) {
            // Cohere v3 embeddings are 1024-dim
            allEmbeddings.push(new Array(1024).fill(0));
          }
        }
        break;
      }
    }
  }

  return allEmbeddings;
}

function chunkText(text, chunkSize = 1000, overlap = 150) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(text.length, start + chunkSize);
    const slice = text.slice(start, end);
    if (slice.trim().length > 0) chunks.push(slice.trim());
    if (end === text.length) break;
    start = end - overlap;
    if (start < 0) start = 0;
  }
  return chunks;
}

async function ingestSite() {
  const sources = [];
  const pageFiles = await listFilesRecursive(path.resolve(__dirname, '../../frontend/src/pages'), ['.tsx', '.ts']);
  const componentFiles = await listFilesRecursive(path.resolve(__dirname, '../../frontend/src/components'), ['.tsx', '.ts']);
  const mdFiles = [
    path.resolve(__dirname, '../../README.md'),
    path.resolve(__dirname, '../../SEO-Analysis.md'),
    path.resolve(__dirname, '../../SEO-Implementation-Report.md'),
    path.resolve(__dirname, '../../SEO-Implementation-Summary.md')
  ];

  const allFiles = [...pageFiles, ...componentFiles, ...mdFiles];

  for (const filePath of allFiles) {
    const raw = await readFileSafe(filePath);
    if (!raw) continue;
    const text = filePath.endsWith('.md') ? raw : stripTsxToText(raw);
    const chunks = chunkText(text);
    const route = extractRouteFromPath(filePath);
    chunks.forEach((content, idx) => {
      sources.push({ content, metadata: { path: filePath, route, chunkIndex: idx } });
    });
  }

  return sources;
}

module.exports = { ingestSite, embedTexts };


