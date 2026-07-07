import type { ParsedAIResponse, AIAction, ChatOptions, AIProviderOption, ProviderName } from './types';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/openai';
import { MockProvider } from './providers/mock';
import { ServerProvider } from './providers/server';
import { AI_PROVIDER, GEMINI_CONFIG, OPENAI_CONFIG, MOCK_CONFIG } from './config';
import type { AIProvider } from './types';

// ─── Response parser ──────────────────────────────────────────────────────────

const ACTIONS_FENCE_RE = /```actions\s*([\s\S]*?)```/i;

export const AI_PROVIDER_OPTIONS: AIProviderOption[] = [
  {
    id: 'server',
    label: 'Vercel Server AI',
    description: 'Production-safe serverless provider that keeps API keys private.',
    needsApiKey: false,
  },
  {
    id: 'gemini',
    label: 'Google Gemini',
    description: 'Direct browser Gemini provider for local demos.',
    needsApiKey: true,
  },
  {
    id: 'openai',
    label: 'OpenAI Compatible',
    description: 'Works with OpenAI and OpenAI-compatible APIs.',
    needsApiKey: true,
  },
  {
    id: 'mock',
    label: 'Mock Demo',
    description: 'Offline demo responses for development and presentations.',
    needsApiKey: false,
  },
];

export function parseAIResponse(raw: string): ParsedAIResponse {
  const match = ACTIONS_FENCE_RE.exec(raw);
  let actions: AIAction[] = [];
  let content = raw;

  if (match) {
    try {
      const parsed = JSON.parse(match[1].trim());
      actions = Array.isArray(parsed) ? parsed.filter(isValidAction) : [];
    } catch {
      actions = [];
    }
    // Remove the actions block from visible content
    content = raw.replace(ACTIONS_FENCE_RE, '').trim();
  }

  return { content, actions, raw };
}

function isValidAction(action: unknown): action is AIAction {
  if (!action || typeof action !== 'object') return false;

  const candidate = action as Partial<AIAction>;
  const validTypes = new Set<AIAction['type']>([
    'link',
    'service',
    'complaint',
    'document',
    'copy',
    'scheme',
    'phone',
  ]);

  return Boolean(
    candidate.type &&
    validTypes.has(candidate.type) &&
    typeof candidate.label === 'string' &&
    candidate.label.trim()
  );
}

// ─── AI Service (main orchestrator) ──────────────────────────────────────────

class AIService {
  private provider: AIProvider;
  private providerName: string;

  constructor() {
    this.provider = this.buildProvider();
    this.providerName = this.provider.name;
  }

  private buildProvider(): AIProvider {
    switch (AI_PROVIDER) {
      case 'server':
        return new ServerProvider();
      case 'gemini': {
        const p = new GeminiProvider(GEMINI_CONFIG);
        if (p.isAvailable) return p;
        console.warn('[CivicAI] Gemini API key not set, falling back to mock.');
        return new MockProvider(MOCK_CONFIG);
      }
      case 'openai': {
        const p = new OpenAIProvider(OPENAI_CONFIG);
        if (p.isAvailable) return p;
        console.warn('[CivicAI] OpenAI API key not set, falling back to mock.');
        return new MockProvider(MOCK_CONFIG);
      }
      case 'mock':
      default:
        return new MockProvider(MOCK_CONFIG);
    }
  }

  /** Swap the active provider at runtime */
  setProvider(name: ProviderName) {
    switch (name) {
      case 'server':
        this.provider = new ServerProvider();
        break;
      case 'gemini':
        this.provider = new GeminiProvider(GEMINI_CONFIG);
        break;
      case 'openai':
        this.provider = new OpenAIProvider(OPENAI_CONFIG);
        break;
      default:
        this.provider = new MockProvider(MOCK_CONFIG);
    }

    if (!this.provider.isAvailable) {
      console.warn(`[CivicAI] ${this.provider.name} is not configured, falling back to mock.`);
      this.provider = new MockProvider(MOCK_CONFIG);
    }

    this.providerName = this.provider.name;
  }

  get activeProviderName(): string {
    return this.providerName;
  }

  get isUsingMock(): boolean {
    return this.provider instanceof MockProvider;
  }

  async send(userMessage: string, options: ChatOptions): Promise<ParsedAIResponse> {
    const raw = await this.provider.chat(userMessage, options);
    return parseAIResponse(raw);
  }
}

// Singleton — import this everywhere
export const aiService = new AIService();
