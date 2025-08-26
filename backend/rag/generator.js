// Import Cohere correctly with the new SDK
const { CohereClient } = require('cohere-ai');

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

let lastCallAt = 0;
const MIN_INTERVAL_MS = 1200;

async function rateLimitWait() {
  const now = Date.now();
  const elapsed = now - lastCallAt;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise(r => setTimeout(r, MIN_INTERVAL_MS - elapsed));
  }
  lastCallAt = Date.now();
}

class GeminiGenerator { // keep class name to avoid wider refactors
  constructor() {}

  buildPrompt(query, contexts) {
    const contextText = contexts.map((c, i) => `Source ${i + 1} (${c.metadata.route}):\n${c.content}`).join('\n\n');
    return `You are MetaGrow AI for Metic Synergy. Answer ONLY from the provided CONTEXT. If not present, say you don't know and offer to connect support. Keep answers concise (1-3 sentences).\n\nCONTEXT:\n${contextText}\n\nQUESTION: ${query}\n\nANSWER:`;
  }

  async generate(query, contexts) {
    const prompt = this.buildPrompt(query, contexts);
    const maxRetries = 3;
    const baseDelayMs = 600;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await rateLimitWait();
        const res = await cohere.generate({
          model: 'command-light',
          prompt,
          maxTokens: 250,
          temperature: 0.2,
        });
        return res.generations?.[0]?.text?.trim() || "I don't have that information in my context.";
      } catch (err) {
        const status = err?.statusCode || err?.status;
        const retryable = status === 429 || status >= 500;
        if (attempt < maxRetries - 1 && retryable) {
          const delay = baseDelayMs * Math.pow(2, attempt);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        return "I'm at capacity right now. Please try again in a minute or share your contact details and I'll alert our team.";
      }
    }
  }
}

module.exports = { GeminiGenerator };


