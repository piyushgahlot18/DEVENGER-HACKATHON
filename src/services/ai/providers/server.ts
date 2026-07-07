import { AIProvider } from '../types';
import type { AIProviderConfig, ChatOptions } from '../types';

export class ServerProvider extends AIProvider {
  constructor(config: AIProviderConfig = {}) {
    super(config);
  }

  get name(): string {
    return 'Vercel Server AI';
  }

  get isAvailable(): boolean {
    return true;
  }

  async chat(userMessage: string, options: ChatOptions): Promise<string> {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        role: options.role,
        language: options.language,
        history: options.history,
      }),
    });

    const data = await res.json().catch(() => ({})) as {
      content?: string;
      error?: string;
    };

    if (!res.ok) {
      throw new Error(data.error ?? `AI server error ${res.status}`);
    }

    if (!data.content) {
      throw new Error('AI server returned no content.');
    }

    return data.content;
  }
}
