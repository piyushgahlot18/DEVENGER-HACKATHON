import { getSystemPrompt } from '../../src/services/ai/prompts';
import type { AIMessage, AssistantRole } from '../../src/services/ai/types';

type ChatRequest = {
  message?: string;
  role?: AssistantRole;
  language?: string;
  history?: AIMessage[];
};

type VercelRequest = {
  method?: string;
  body?: ChatRequest;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const assistantRoles: AssistantRole[] = [
  'citizen-query',
  'scheme-advisor',
  'complaint-draft',
  'document-advisor',
  'policy-simplifier',
  'multilingual',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const body = req.body ?? {};
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const role = assistantRoles.includes(body.role as AssistantRole)
      ? body.role as AssistantRole
      : 'citizen-query';
    const language = typeof body.language === 'string' && body.language.trim()
      ? body.language.trim()
      : 'English';
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase();
    const content = provider === 'openai'
      ? await chatWithOpenAI(message, role, language, history)
      : await chatWithGemini(message, role, language, history);

    return res.status(200).json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI request failed.';
    return res.status(500).json({ error: message });
  }
}

async function chatWithGemini(
  message: string,
  role: AssistantRole,
  language: string,
  history: AIMessage[],
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in Vercel Environment Variables.');
  }

  const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
  const systemPrompt = getSystemPrompt(role, language);
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [
    {
      role: 'user',
      parts: [{ text: `[SYSTEM INSTRUCTIONS - follow exactly]\n${systemPrompt}` }],
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I will follow all instructions precisely.' }],
    },
  ];

  for (const item of history.slice(-20)) {
    if (item.role === 'system') continue;
    contents.push({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    });
  }

  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: Number(process.env.AI_MAX_TOKENS ?? 1024),
          temperature: Number(process.env.AI_TEMPERATURE ?? 0.7),
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(error.error?.message ?? `Gemini API error ${response.status}`);
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error('Gemini returned no content.');
  return text;
}

async function chatWithOpenAI(
  message: string,
  role: AssistantRole,
  language: string,
  history: AIMessage[],
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured in Vercel Environment Variables.');
  }

  const baseUrl = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com';
  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const systemPrompt = getSystemPrompt(role, language);
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-20)
      .filter(item => item.role !== 'system')
      .map(item => ({
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: item.content,
      })),
    { role: 'user', content: message },
  ];

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: Number(process.env.AI_MAX_TOKENS ?? 1024),
      temperature: Number(process.env.AI_TEMPERATURE ?? 0.7),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(error.error?.message ?? `OpenAI API error ${response.status}`);
  }

  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content;

  if (!text) throw new Error('OpenAI returned no content.');
  return text;
}
