export interface RagSourceMeta {
  path: string;
  route: string;
  chunkIndex: number;
}

export interface RagResponse {
  answer: string;
  sources?: RagSourceMeta[];
  needsSupport?: boolean;
  emailSent?: boolean;
}

export async function askRag(query: string, userData?: any, chatHistory?: any[]): Promise<RagResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rag/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, userData, chatHistory }),
  });
  if (!res.ok) throw new Error('RAG query failed');
  return res.json();
}


