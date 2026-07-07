import type { ProviderName, AIProviderConfig } from './types';

/**
 * Reads provider config from environment variables.
 * Set these in a .env.local file (never commit API keys).
 *
 * VITE_AI_PROVIDER=server          # 'server' | 'gemini' | 'openai' | 'mock'
 *
 * For Vercel production, use VITE_AI_PROVIDER=server and set private
 * serverless env vars such as GEMINI_API_KEY or OPENAI_API_KEY in Vercel.
 *
 * Direct browser providers below are useful for local demos only because
 * VITE_* variables are visible in the built frontend.
 *
 * VITE_AI_PROVIDER=gemini          # local-only direct browser mode
 * VITE_GEMINI_API_KEY=your_key
 * VITE_OPENAI_API_KEY=your_key
 * VITE_OPENAI_BASE_URL=https://...  # optional, for Groq/Azure/Ollama
 * VITE_OPENAI_MODEL=gpt-4o-mini     # optional model override
 * VITE_GEMINI_MODEL=gemini-2.0-flash # optional model override
 */

function getEnv(key: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[key];
}

export const AI_PROVIDER: ProviderName =
  (getEnv('VITE_AI_PROVIDER') as ProviderName | undefined) ??
  (import.meta.env.PROD ? 'server' : 'mock');

export const GEMINI_CONFIG: AIProviderConfig = {
  apiKey: getEnv('VITE_GEMINI_API_KEY'),
  model: getEnv('VITE_GEMINI_MODEL') ?? 'gemini-2.0-flash',
  maxTokens: 1024,
  temperature: 0.7,
};

export const OPENAI_CONFIG: AIProviderConfig = {
  apiKey: getEnv('VITE_OPENAI_API_KEY'),
  model: getEnv('VITE_OPENAI_MODEL') ?? 'gpt-4o-mini',
  baseUrl: getEnv('VITE_OPENAI_BASE_URL') ?? 'https://api.openai.com',
  maxTokens: 1024,
  temperature: 0.7,
};

export const MOCK_CONFIG: AIProviderConfig = {};
