const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { ingestSite, embedTexts } = require('../rag/ingest');
const { PineconeStore } = require('../rag/store');
const { GeminiGenerator } = require('../rag/generator');
const { sendSupportEmail } = require('../services/supportEmail');

const store = new PineconeStore();
const generator = new GeminiGenerator();

function extractFoundersSection() {
  try {
    const mdPath = path.resolve(__dirname, '../Metic_Synergy_Company_Profile.md');
    const raw = fs.readFileSync(mdPath, 'utf-8');
    const start = raw.indexOf('## About / Founders');
    if (start === -1) return null;
    const rest = raw.slice(start);
    const endIdx = rest.indexOf('\n## ');
    const section = endIdx !== -1 ? rest.slice(0, endIdx) : rest;
    return section.trim();
  } catch (_) {
    return null;
  }
}

router.post('/query', async (req, res) => {
  try {
    const { query, userData, chatHistory, k = 10, escalateIfUnknown = true } = req.body || {};
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'query is required' });
    }

    const lower = query.toLowerCase();
    const escalateKeywords = ['pricing', 'quote', 'custom', 'contact', 'call', 'phone', 'email me', 'reach out'];
    const wantsHuman = escalateKeywords.some(w => lower.includes(w));

    if (wantsHuman && userData?.email) {
      const result = await sendSupportEmail(userData, query, chatHistory);
      return res.json({
        answer: "I've sent your details to our team—they'll follow up shortly.",
        needsSupport: true,
        emailSent: result.ok,
      });
    }

    const queryEmbedding = (await embedTexts([query]))[0];
    const matches = await store.search(queryEmbedding, k);
    let contexts = matches.map(m => ({ content: m.content, metadata: m.metadata, score: m.score }));

    // Keyword-boosted context for founders/owners questions
    if (/(founder|owner)/i.test(query)) {
      const founders = extractFoundersSection();
      if (founders) {
        contexts = [
          { content: founders, metadata: { route: '/company-profile', path: 'Metic_Synergy_Company_Profile.md', chunkIndex: -1 } },
          ...contexts,
        ];
      }
    }

    const answer = await generator.generate(query, contexts);

    const unknown = /i don't have|not in my context|not in the context|don't know/i.test(answer);
    if (unknown && escalateIfUnknown && userData?.email) {
      const result = await sendSupportEmail(userData, query, chatHistory);
      return res.json({
        answer: "I couldn't find that in our docs. I've forwarded your query to our team.",
        needsSupport: true,
        emailSent: result.ok,
        sources: contexts.map(c => c.metadata),
      });
    }

    res.json({
      answer,
      sources: contexts.map(c => c.metadata),
      needsSupport: false,
    });
  } catch (err) {
    console.error('RAG /query error', err);
    res.status(500).json({ message: 'Failed to process query' });
  }
});

router.post('/reindex', async (req, res) => {
  try {
    // Temporarily disabled auth for testing
    // const token = req.headers.authorization?.split(' ')[1];
    // if (!token) return res.status(401).json({ message: 'Unauthorized' });
    // jwt.verify(token, process.env.JWT_SECRET);

    console.log('Starting reindex...');
    const chunks = await ingestSite();
    console.log(`Found ${chunks.length} chunks to embed`);
    const texts = chunks.map(c => c.content);
    const embeddings = await embedTexts(texts);
    console.log(`Generated ${embeddings.length} embeddings`);
    await store.reindex(chunks, embeddings);
    console.log('Reindex completed successfully');
    res.json({ message: 'Reindexed', count: chunks.length });
  } catch (err) {
    console.error('RAG /reindex error', err);
    res.status(500).json({ message: 'Failed to reindex' });
  }
});

module.exports = router;


