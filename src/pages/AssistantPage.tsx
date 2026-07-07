import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, Paperclip, Copy, RotateCcw, Languages,
  Sparkles, CheckCheck, User, Volume2, Trash2, ChevronDown,
  Zap, Info, X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PageTransition } from '../components/ui/PageTransition';
import { ActionCards } from '../components/ui/ActionCards';
import { useAIChat } from '../hooks/useAIChat';
import { ASSISTANT_ROLES, getRoleConfig } from '../services/ai/roles';
import type { AssistantRole } from '../services/ai/types';

const LANGUAGES = [
  'English', 'हिंदी (Hindi)', 'বাংলা (Bengali)', 'తెలుగు (Telugu)',
  'मराठी (Marathi)', 'தமிழ் (Tamil)', 'ગુજરાતી (Gujarati)',
  'ಕನ್ನಡ (Kannada)', 'മലയാളം (Malayalam)', 'ਪੰਜਾਬੀ (Punjabi)',
  'ଓଡ଼ିଆ (Odia)', 'অসমীয়া (Assamese)', 'اردو (Urdu)',
];

// ─── Role Selector ─────────────────────────────────────────────────────────────

const RoleSelector = ({
  activeRole,
  onSwitch,
}: {
  activeRole: AssistantRole;
  onSwitch: (role: AssistantRole) => void;
}) => {
  const [open, setOpen] = useState(false);
  const active = getRoleConfig(activeRole);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{active.icon}</span>
        <span className={`font-medium text-xs hidden sm:block ${active.color}`}>{active.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-11 w-72 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl z-40 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Switch AI Mode</p>
              </div>
              <div className="p-2 space-y-1">
                {ASSISTANT_ROLES.map(role => (
                  <button
                    key={role.id}
                    onClick={() => { onSwitch(role.id as AssistantRole); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      activeRole === role.id
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{role.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${activeRole === role.id ? role.color : 'text-gray-900 dark:text-gray-100'}`}>
                        {role.label}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{role.description}</p>
                    </div>
                    {activeRole === role.id && (
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${role.gradient} flex-shrink-0`} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Language Selector ─────────────────────────────────────────────────────────

const LanguagePicker = ({
  language,
  onSelect,
}: {
  language: string;
  onSelect: (lang: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const shortName = language.split(' ')[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Languages className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{shortName}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              className="absolute right-0 top-11 w-52 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl z-40 overflow-hidden max-h-72 overflow-y-auto"
            >
              <div className="p-2 space-y-0.5">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { onSelect(lang.split(' ')[0]); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      language === lang.split(' ')[0]
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Message Bubble ─────────────────────────────────────────────────────────────

const MessageBubble = ({
  entry,
  activeRole,
  onCopy,
  onRegenerate,
  copiedId,
}: {
  entry: ReturnType<typeof useAIChat>['messages'][number];
  activeRole: AssistantRole;
  onCopy: (id: string, content: string) => void;
  onRegenerate: () => void;
  copiedId: string | null;
}) => {
  const role = getRoleConfig(entry.assistantRole ?? activeRole);
  const isUser = entry.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center flex-shrink-0 shadow-lg mt-1 text-sm`}>
          {entry.isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            role.icon
          )}
        </div>
      )}

      <div className={`group max-w-[85%] sm:max-w-2xl flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && !entry.isLoading && (
          <span className={`text-xs font-medium ml-1 ${role.color}`}>{role.label}</span>
        )}

        <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? `bg-gradient-to-br ${role.gradient} text-white rounded-tr-md shadow-lg`
            : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-md shadow-sm'
        }`}>
          {entry.isLoading ? (
            <div className="flex gap-1.5 items-center py-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-blue-400"
                />
              ))}
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{entry.content}</p>
          ) : entry.error ? (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-xs">AI Error</span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{entry.content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-code:bg-blue-50 dark:prose-code:bg-blue-950/30 prose-code:text-blue-700 dark:prose-code:text-blue-300
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs
              prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20
              prose-blockquote:rounded-r-xl prose-blockquote:py-1
              prose-table:text-xs prose-th:bg-gray-50 dark:prose-th:bg-gray-800
              prose-strong:text-gray-900 dark:prose-strong:text-white">
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Action cards for AI messages */}
        {!isUser && !entry.isLoading && entry.parsed?.actions.length ? (
          <div className="w-full px-1">
            <ActionCards actions={entry.parsed.actions} />
          </div>
        ) : null}

        {/* Message actions toolbar */}
        {!isUser && !entry.isLoading && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
            <button
              onClick={() => onCopy(entry.id, entry.parsed?.raw ?? entry.content)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
              title="Copy response"
            >
              {copiedId === entry.id
                ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                : <Copy className="w-3.5 h-3.5" />
              }
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
              title="Read aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRegenerate}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
              title="Regenerate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

// ─── Welcome Screen ─────────────────────────────────────────────────────────────

const WelcomeScreen = ({
  activeRole,
  onPrompt,
}: {
  activeRole: AssistantRole;
  onPrompt: (p: string) => void;
}) => {
  const role = getRoleConfig(activeRole);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-blue-500/20`}
      >
        {role.icon}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{role.label}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-8">{role.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg space-y-2"
      >
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Suggested Questions
        </p>
        {role.suggestedPrompts.map((prompt, i) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.06 }}
            onClick={() => onPrompt(prompt)}
            className="w-full text-left px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all group"
          >
            <span className="flex items-center gap-2">
              <span className={`text-base ${role.color}`}>›</span>
              {prompt}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

export const AssistantPage = () => {
  const {
    messages,
    isLoading,
    activeRole,
    language,
    setLanguage,
    sendMessage,
    clearChat,
    regenerateLast,
    switchRole,
    providerName,
    isUsingMock,
  } = useAIChat();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showProviderInfo, setShowProviderInfo] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput('');
    sendMessage(msg);
    // Auto-resize textarea back to default
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-grow textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  const activeRoleConfig = getRoleConfig(activeRole);

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-gray-950">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* AI status */}
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeRoleConfig.gradient} flex items-center justify-center text-base shadow-lg flex-shrink-0`}>
                {activeRoleConfig.icon}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Civic AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <button
                    onClick={() => setShowProviderInfo(s => !s)}
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {providerName} {isUsingMock && '(Demo)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Role selector */}
            <RoleSelector activeRole={activeRole} onSwitch={switchRole} />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguagePicker language={language} onSelect={setLanguage} />

            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Provider info banner ── */}
        <AnimatePresence>
          {showProviderInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="px-6 py-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 flex items-start gap-3">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-xs text-amber-800 dark:text-amber-200">
                  <span className="font-semibold">Active Provider: {providerName}</span>
                  {isUsingMock && (
                    <span> — Running in Demo mode. To use a real LLM, add <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">VITE_AI_PROVIDER=gemini</code> and <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">VITE_GEMINI_API_KEY=your_key</code> to your <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">.env.local</code> file.</span>
                  )}
                  <span className="block mt-1 text-amber-600 dark:text-amber-400">To swap providers: set <code>VITE_AI_PROVIDER</code> to <code>gemini</code>, <code>openai</code>, or <code>mock</code>.</span>
                </div>
                <button onClick={() => setShowProviderInfo(false)} className="text-amber-500 hover:text-amber-700 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Messages / Welcome ── */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen activeRole={activeRole} onPrompt={handleSend} />
          ) : (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
              <AnimatePresence>
                {messages.map(entry => (
                  <MessageBubble
                    key={entry.id}
                    entry={entry}
                    activeRole={activeRole}
                    onCopy={handleCopy}
                    onRegenerate={regenerateLast}
                    copiedId={copiedId}
                  />
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Suggested prompts bar (when there are messages) ── */}
        {messages.length > 0 && (
          <div className="flex-shrink-0 px-4 sm:px-6 py-2 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {activeRoleConfig.suggestedPrompts.slice(0, 4).map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 border border-gray-200 dark:border-gray-700 transition-all whitespace-nowrap"
                  >
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    {prompt.length > 40 ? prompt.slice(0, 38) + '…' : prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Input area ── */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <div className={`flex items-end gap-2 p-2.5 rounded-2xl bg-white dark:bg-gray-900 border transition-all shadow-lg ${
              isLoading
                ? 'border-blue-300 dark:border-blue-700 shadow-blue-500/10'
                : 'border-gray-200 dark:border-gray-700 focus-within:border-blue-400 dark:focus-within:border-blue-600 focus-within:shadow-blue-500/10'
            }`}>
              {/* File attach */}
              <button
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors flex-shrink-0"
                title="Attach file"
                disabled={isLoading}
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Text input */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={`Ask ${activeRoleConfig.label} anything…`}
                rows={1}
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none leading-relaxed py-1 max-h-32"
              />

              {/* Voice (UI only) */}
              <button
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors flex-shrink-0"
                title="Voice input"
                disabled={isLoading}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send */}
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-xl text-white transition-all flex-shrink-0 shadow-lg ${
                  input.trim() && !isLoading
                    ? `bg-gradient-to-br ${activeRoleConfig.gradient} hover:opacity-90 shadow-blue-500/25`
                    : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed shadow-none'
                }`}
                title="Send message"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-300 dark:text-gray-700 mt-2">
              Civic AI may make errors. Verify important information on official government portals. · {language}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
