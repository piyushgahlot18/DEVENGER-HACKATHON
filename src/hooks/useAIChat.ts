import { useState, useCallback, useRef } from 'react';
import { aiService } from '../services/ai/AIService';
import type { AssistantRole, ParsedAIResponse } from '../services/ai/types';

// ─── Chat message (UI model) ──────────────────────────────────────────────────

export interface ChatEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  assistantRole: AssistantRole;
  language: string;
  parsed?: ParsedAIResponse;
  timestamp: Date;
  isLoading?: boolean;
  error?: string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAIChat() {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<AssistantRole>('citizen-query');
  const [language, setLanguage] = useState('English');

  /** Keeps the raw AIMessage history for the provider (context window) */
  const historyRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userEntry: ChatEntry = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      assistantRole: activeRole,
      language,
      timestamp: new Date(),
    };

    // Placeholder while loading
    const loadingId = `a-${Date.now()}`;
    const loadingEntry: ChatEntry = {
      id: loadingId,
      role: 'assistant',
      content: '',
      assistantRole: activeRole,
      language,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userEntry, loadingEntry]);
    setIsLoading(true);

    // Add user turn to context history
    historyRef.current.push({ role: 'user', content: text });

    try {
      const parsed = await aiService.send(text, {
        role: activeRole,
        language,
        history: historyRef.current.slice(0, -1), // exclude the just-added message
      });

      // Add assistant turn to context history
      historyRef.current.push({ role: 'assistant', content: parsed.raw });

      // Keep context window bounded to last 10 turns
      if (historyRef.current.length > 20) {
        historyRef.current = historyRef.current.slice(-20);
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === loadingId
            ? { ...m, content: parsed.content, parsed, isLoading: false }
            : m
        )
      );
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'An unexpected error occurred.';

      setMessages(prev =>
        prev.map(m =>
          m.id === loadingId
            ? {
                ...m,
                content: `Sorry, I encountered an error: **${errorMsg}**\n\nPlease try again or check your API key configuration.`,
                isLoading: false,
                error: errorMsg,
              }
            : m
        )
      );

      // Remove the failed user message from history
      historyRef.current.pop();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, activeRole, language]);

  const clearChat = useCallback(() => {
    setMessages([]);
    historyRef.current = [];
  }, []);

  const regenerateLast = useCallback(async () => {
    const lastUserIndex = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserIndex === -1) return;

    const lastUserMsg = messages[lastUserIndex];
    const retainedMessages = messages.slice(0, lastUserIndex);

    setMessages(retainedMessages);
    historyRef.current = retainedMessages.map(m => ({
      role: m.role,
      content: m.role === 'assistant' ? m.parsed?.raw ?? m.content : m.content,
    }));

    await sendMessage(lastUserMsg.content);
  }, [messages, sendMessage]);

  const switchRole = useCallback((role: AssistantRole) => {
    setActiveRole(role);
    // Clear history when switching roles (fresh context)
    historyRef.current = [];
  }, []);

  const switchLanguage = useCallback((nextLanguage: string) => {
    setLanguage(nextLanguage);
    // Language is part of the system instruction, so start a fresh provider context.
    historyRef.current = [];
  }, []);

  return {
    messages,
    isLoading,
    activeRole,
    language,
    setLanguage: switchLanguage,
    sendMessage,
    clearChat,
    regenerateLast,
    switchRole,
    providerName: aiService.activeProviderName,
    isUsingMock: aiService.isUsingMock,
  };
}
