import { AIProvider } from '../types';
import type { AIProviderConfig, ChatOptions } from '../types';
import { getSystemPrompt } from '../prompts/index';

/**
 * OpenAI-compatible provider.
 * Works with: OpenAI GPT-4o, GPT-3.5-turbo, Azure OpenAI,
 * Groq (llama-3.3-70b), Together AI, Ollama (local), any OpenAI-spec API.
 */
export class OpenAIProvider extends AIProvider {
  private readonly apiUrl: string;

  constructor(config: AIProviderConfig) {
    super(config);
    this.apiUrl = (config.baseUrl ?? 'https://api.openai.com') + '/v1/chat/completions';
  }

  get name(): string {
    return 'OpenAI';
  }

  get isAvailable(): boolean {
    return Boolean(this.config.apiKey);
  }

  async chat(userMessage: string, options: ChatOptions): Promise<string> {
    const systemPrompt = getSystemPrompt(options.role, options.language);

    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    for (const msg of options.history) {
      if (msg.role === 'system') continue;
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      });
    }

    messages.push({ role: 'user', content: userMessage });

    const body = {
      model: this.config.model ?? 'gpt-4o-mini',
      messages,
      max_tokens: this.config.maxTokens ?? 1024,
      temperature: this.config.temperature ?? 0.7,
    };

    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        `OpenAI API error ${res.status}: ${(err as { error?: { message?: string } })?.error?.message ?? res.statusText}`
      );
    }

    const data = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('OpenAI returned no content.');
    return text;
  }
}
