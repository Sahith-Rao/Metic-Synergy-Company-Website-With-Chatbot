const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const { embedTexts } = require('./ingest');
const { PineconeStore } = require('./store');

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

async function ingestMarkdown(absPath) {
  const store = new PineconeStore();
  const raw = await fs.readFile(absPath, 'utf-8');
  const chunks = chunkText(raw);

  const items = chunks.map((content, idx) => ({
    content,
    metadata: {
      path: absPath,
      route: '/company-profile',
      chunkIndex: idx,
    }
  }));

  console.log(`Embedding ${items.length} chunks...`);
  const embeddings = await embedTexts(items.map(i => i.content));
  console.log('Upserting to Pinecone...');
  await store.reindex(items, embeddings);
  console.log('Done.');
}

(async () => {
  try {
    const filePath = process.argv[2] || path.resolve(__dirname, '../Metic_Synergy_Company_Profile.md');
    await ingestMarkdown(filePath);
  } catch (err) {
    console.error('Ingestion failed:', err);
    process.exit(1);
  }
})();
