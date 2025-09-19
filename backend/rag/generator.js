const { CohereClient } = require("cohere-ai");

let lastCallAt = 0;
const MIN_INTERVAL_MS = 1800; // pacing between calls

async function rateLimitWait() {
  const now = Date.now();
  const elapsed = now - lastCallAt;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed));
  }
  lastCallAt = Date.now();
}

class GeminiGenerator {
  constructor() {}

  // Build only the context block now
  buildPrompt(query, contexts) {
    const contextText = contexts
      .map(
        (c, i) => `Source ${i + 1} (${c.metadata.route}):\n${c.content}`
      )
      .join("\n\n");

    return `CONTEXT:\n${contextText}\n\nUSER QUESTION: ${query}`;
  }

  async generate(query, contexts) {
    const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

    const systemPrompt = 'You are MetaGrow AI, a helpful assistant for Metic Synergy digital marketing agency. Be concise (1-3 sentences). Answer ONLY from the provided context. If missing, say "I don\'t have that information in my context" and offer to connect support.';
    const userContent = this.buildPrompt(query, contexts);
    const combinedMessage = `${systemPrompt}\n\n${userContent}`;

    const maxRetries = 5;
    const baseDelayMs = 800;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await rateLimitWait();
        const res = await cohere.chat({
          model: 'command-a-03-2025',
          message: combinedMessage,
          maxTokens: 250,
          temperature: 0.2,
        });
        const text = res.text || res.message;
        return (text && String(text).trim()) || "I don't have that information in my context.";
      } catch (err) {
        const status = err?.statusCode || err?.status;
        const retryable = status === 429 || status >= 500;
        if (attempt < maxRetries - 1 && retryable) {
          const delay = baseDelayMs * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        if (process.env.SHOW_MODEL_ERRORS === 'true') {
          const details = {
            status: status ?? null,
            message: err?.message ?? 'Unknown error',
          };
          return `Model error: ${JSON.stringify(details)}`;
        }
        return "I'm at capacity right now. Please try again in a minute or share your contact details and I'll alert our team.";
      }
    }
  }
}

module.exports = { GeminiGenerator };