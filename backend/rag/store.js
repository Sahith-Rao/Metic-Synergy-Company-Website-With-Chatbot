const { Pinecone } = require('@pinecone-database/pinecone');

class PineconeStore {
  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    this.index = this.pinecone.Index(process.env.PINECONE_INDEX_NAME || 'meticsynergy-content-1024');
  }

  async reindex(chunks, embeddings) {
    const vectors = chunks.map((chunk, i) => ({
      id: `chunk_${Date.now()}_${i}`,
      values: embeddings[i],
      metadata: {
        ...chunk.metadata,
        content: chunk.content,
      }
    }));

    // Skip deleteAll if index is empty or doesn't exist
    try {
      await this.index.deleteAll();
    } catch (err) {
      console.log('Index may be empty or not exist yet, continuing with upsert...');
    }
    
    // Upsert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await this.index.upsert(batch);
    }
  }

  async search(queryEmbedding, k = 5) {
    const results = await this.index.query({
      vector: queryEmbedding,
      topK: k,
      includeMetadata: true
    });
    
    return results.matches.map(match => ({
      score: match.score,
      content: match.metadata.content,
      metadata: {
        path: match.metadata.path,
        route: match.metadata.route,
        chunkIndex: match.metadata.chunkIndex
      }
    }));
  }
}

module.exports = { PineconeStore };


