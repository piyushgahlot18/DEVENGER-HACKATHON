// ─── Core message types ───────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'system';

export interface AIMessage {
  role: MessageRole;
  content: string;
}

// ─── Parsed structured response ───────────────────────────────────────────────

export type ActionType = 'link' | 'service' | 'complaint' | 'document' | 'copy' | 'scheme' | 'phone';

export interface AIAction {
  type: ActionType;
  label: string;
  url?: string;
  serviceId?: string;
  category?: string;
  service?: string;
  content?: string;
  phone?: string;
  schemeId?: string;
  icon?: string;
}

export interface ParsedAIResponse {
  /** The human-readable markdown content (with action block stripped out) */
  content: string;
  /** Parsed action cards to render below the message */
  actions: AIAction[];
  /** The raw full text from the LLM (for copy/regenerate) */
  raw: string;
  /** Language the response was given in */
  language?: string;
}

// ─── Streaming support ────────────────────────────────────────────────────────

export type StreamCallback = (chunk: string, done: boolean) => void;

// ─── Assistant roles ──────────────────────────────────────────────────────────

export type AssistantRole =
  | 'citizen-query'
  | 'scheme-advisor'
  | 'complaint-draft'
  | 'document-advisor'
  | 'policy-simplifier'
  | 'multilingual';

export interface AssistantRoleConfig {
  id: AssistantRole;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  suggestedPrompts: string[];
}

// ─── Provider interface ───────────────────────────────────────────────────────

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIProviderOption {
  id: ProviderName;
  label: string;
  description: string;
  needsApiKey: boolean;
}

export interface ChatOptions {
  role: AssistantRole;
  language: string;
  history: AIMessage[];
  stream?: StreamCallback;
}

/** Every concrete provider must implement this interface */
export abstract class AIProvider {
  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  abstract get name(): string;
  abstract get isAvailable(): boolean;

  abstract chat(
    userMessage: string,
    options: ChatOptions
  ): Promise<string>;
}

// ─── Provider name enum ───────────────────────────────────────────────────────

export type ProviderName = 'server' | 'gemini' | 'openai' | 'mock';
