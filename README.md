# Civic AI - Generative AI Citizen Services Platform

Civic AI is a hackathon-ready web application that uses Generative AI to make Indian government services easier to understand and use. It helps citizens ask questions, simplify policies, discover relevant schemes, prepare documents, draft complaints, and track civic issues from one accessible interface.

## Problem Statement

Citizens often struggle with complex government language, scattered portals, unclear eligibility rules, document confusion, slow complaint processes, and limited language accessibility. Civic AI solves this by turning everyday civic interactions into simple, guided, multilingual workflows.

## Solution Overview

Civic AI provides an AI-powered civic assistant and service dashboard for:

- Simplifying complex government policies into plain language
- Answering citizen queries with step-by-step guidance
- Recommending relevant schemes and public services
- Assisting with document requirements and readiness checks
- Drafting and tracking complaints with AI summaries
- Supporting multilingual access for digital inclusion
- Providing official links, next steps, and transparent reasoning

## Key Generative AI Features

The assistant is structured around specialized system prompts:

- **Government Scheme Advisor** - recommends welfare schemes and explains eligibility, benefits, application steps, and documents.
- **Citizen Query Assistant** - answers general government-service questions in simple terms.
- **Complaint Drafting Assistant** - creates formal, copy-ready complaint drafts with department and escalation guidance.
- **Document Requirement Assistant** - provides required-document checklists and warns about common rejection reasons.
- **Government Policy Simplifier** - explains laws, policies, rights, and duties in accessible language.
- **Multilingual Assistant** - responds in the selected language for inclusive access.

Each AI response is designed to include:

- Simple explanations
- Session-aware conversation context
- Actionable next steps
- Structured quick action cards
- Official portal links when relevant
- Safety notes to verify critical information

## Why Civic AI Fits the Evaluation Criteria

| Requirement | Civic AI Implementation |
|---|---|
| Generative AI | LLM-powered assistant with Vercel-safe serverless AI proxy |
| Simplifies government information | Dedicated policy simplifier and plain-language prompts |
| Answers citizen queries | Citizen Query Assistant with contextual chat |
| Recommends services | Dashboard recommendations, service discovery, scheme advisor, action cards |
| Document help | Document assistant, document health score, AI document insight |
| Complaint tracking | Complaint center with reference numbers, status, priority, timeline, AI summaries |
| Multilingual support | Language selector and multilingual assistant prompt |
| Transparency | Official links, verify-important-info messaging, structured next steps |
| Accessibility | Mobile-friendly UI, simple language, no-registration demo journey |
| Digital inclusion | Indian-language support and citizen-first workflows |

## Demo Journey for Judges

1. Open the app landing page and see the civic AI value proposition.
2. Go to **AI Assistant** and ask: "What schemes are available for farmers?"
3. Switch to **Document Requirement Assistant** and ask: "What documents do I need for a passport?"
4. Switch to **Complaint Drafting Assistant** and ask: "Draft a complaint about a broken street light."
5. Visit **Services** to browse government services and required documents.
6. Visit **Documents** to see AI document health insights.
7. Visit **Complaints** to see complaint status tracking and AI summaries.
8. Try the language selector for multilingual support.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Radix UI
- Lucide React
- Vercel Serverless Functions
- Gemini or OpenAI-compatible LLM provider

## AI Provider Architecture

The AI layer is provider-swappable:

- `server` - recommended for Vercel production. Frontend calls `/api/ai/chat`; API keys stay private.
- `gemini` - direct browser Gemini mode for local demos only.
- `openai` - direct browser OpenAI-compatible mode for local demos only.
- `mock` - offline demo responses.

Production should use:

```env
VITE_AI_PROVIDER=server
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
```

Do not expose real API keys with `VITE_GEMINI_API_KEY` or `VITE_OPENAI_API_KEY` in production.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Vercel Deployment Checklist

- Set build command: `npm run build`
- Set output directory: `dist`
- Add environment variables:
  - `VITE_AI_PROVIDER=server`
  - `AI_PROVIDER=gemini`
  - `GEMINI_API_KEY=<your key>`
  - `GEMINI_MODEL=gemini-2.0-flash`
- Redeploy after adding environment variables
- Test `/assistant` on the live Vercel URL
- Ask a real AI question and verify response/action cards

## Current Prototype Scope

This is a strong hackathon prototype. The AI assistant and Vercel-safe LLM integration are implemented. Complaint records, document uploads, and profile recommendations currently use demo data/local UI flows and can be connected to a database or government APIs in a production version.

## Future Scope

- Real complaint persistence with database storage
- Document upload and OCR-based validation
- Eligibility engine using user profile data
- Official government API integrations
- Voice input and text-to-speech for accessibility
- Regional-language onboarding flows
- Admin dashboard for departments

## Impact

Civic AI makes everyday civic tasks faster, smarter, and more user-friendly. It reduces confusion, improves transparency, supports multilingual citizens, and helps people take concrete next steps instead of getting stuck in complex government processes.
