import { AIProvider } from '../types';
import type { AIProviderConfig, ChatOptions } from '../types';
import { getSystemPrompt } from '../prompts/index';

/**
 * Google Gemini provider using the Gemini REST API.
 * Model: gemini-2.0-flash (fast, cheap, great for chat)
 */
export class GeminiProvider extends AIProvider {
  private readonly apiUrl: string;

  constructor(config: AIProviderConfig) {
    super(config);
    const model = config.model ?? 'gemini-2.0-flash';
    const key = config.apiKey ?? '';
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  }

  get name(): string {
    return 'Google Gemini';
  }

  get isAvailable(): boolean {
    return Boolean(this.config.apiKey);
  }

  async chat(userMessage: string, options: ChatOptions): Promise<string> {
    const systemPrompt = getSystemPrompt(options.role, options.language);

    // Build Gemini contents array
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    // Inject system prompt as first user-model exchange (Gemini pattern)
    contents.push({
      role: 'user',
      parts: [{ text: `[SYSTEM INSTRUCTIONS — follow exactly]\n${systemPrompt}` }],
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Understood. I will follow all instructions precisely and respond accordingly.' }],
    });

    // Add conversation history (skip system messages)
    for (const msg of options.history) {
      if (msg.role === 'system') continue;
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    // Add the new user message
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const body = {
      contents,
      generationConfig: {
        maxOutputTokens: this.config.maxTokens ?? 1024,
        temperature: this.config.temperature ?? 0.7,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        `Gemini API error ${res.status}: ${(err as { error?: { message?: string } })?.error?.message ?? res.statusText}`
      );
    }

    const data = await res.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini returned no content.');
    return text;
  }
}
