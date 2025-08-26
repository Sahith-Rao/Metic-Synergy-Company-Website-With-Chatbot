const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ingestSite, embedTexts } = require('../rag/ingest');
const { PineconeStore } = require('../rag/store');
const { GeminiGenerator } = require('../rag/generator');
const { sendSupportEmail } = require('../services/supportEmail');

const store = new PineconeStore();
const generator = new GeminiGenerator();

router.post('/query', async (req, res) => {
  try {
    const { query, userData, chatHistory, k = 5, escalateIfUnknown = true } = req.body || {};
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'query is required' });
    }

    // Heuristic: determine if should escalate immediately
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

    // Retrieval
    const queryEmbedding = (await embedTexts([query]))[0];
    const matches = await store.search(queryEmbedding, k);
    const contexts = matches.map(m => ({ content: m.content, metadata: m.metadata, score: m.score }));

    const answer = await generator.generate(query, contexts);

    const unknown = /i don't know|not in the context|not available/i.test(answer);
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
    // Temporarily disable JWT verification for testing
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


