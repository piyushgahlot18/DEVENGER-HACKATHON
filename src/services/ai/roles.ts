import type { AssistantRoleConfig } from './types';

// ─── Role metadata ─────────────────────────────────────────────────────────────

export const ASSISTANT_ROLES: AssistantRoleConfig[] = [
  {
    id: 'citizen-query',
    label: 'Citizen Query Assistant',
    description: 'General government service help',
    icon: '🏛️',
    color: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-600 to-indigo-600',
    suggestedPrompts: [
      'How do I apply for an Aadhaar card?',
      'What is DigiLocker and how to use it?',
      'How to file an RTI application?',
      'How to check my EPF balance online?',
      'What is the process for name change on Aadhaar?',
    ],
  },
  {
    id: 'scheme-advisor',
    label: 'Government Scheme Advisor',
    description: "Find schemes you're eligible for",
    icon: '💰',
    color: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-teal-600',
    suggestedPrompts: [
      'What schemes are available for farmers?',
      'Am I eligible for Ayushman Bharat?',
      'Tell me about PM Ujjwala Yojana benefits',
      'What scholarships are available for OBC students?',
      'Which schemes help small business owners?',
    ],
  },
  {
    id: 'complaint-draft',
    label: 'Complaint Drafting Assistant',
    description: 'Draft official complaints with AI',
    icon: '✍️',
    color: 'text-rose-600 dark:text-rose-400',
    gradient: 'from-rose-500 to-red-600',
    suggestedPrompts: [
      'Draft a complaint about a broken street light',
      'Write a complaint about water supply issues',
      'Help me file a consumer complaint',
      'Draft a complaint about road potholes',
      'Write a complaint about electricity billing error',
    ],
  },
  {
    id: 'document-advisor',
    label: 'Document Requirement Assistant',
    description: 'Know exactly what documents you need',
    icon: '📋',
    color: 'text-violet-600 dark:text-violet-400',
    gradient: 'from-violet-500 to-purple-600',
    suggestedPrompts: [
      'What documents do I need for a passport?',
      'Documents required for PAN card application',
      'What do I need to apply for a ration card?',
      'Documents for driving license renewal',
      'What proof of address is accepted for Aadhaar update?',
    ],
  },
  {
    id: 'policy-simplifier',
    label: 'Government Policy Simplifier',
    description: 'Complex laws explained simply',
    icon: '⚖️',
    color: 'text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500 to-orange-600',
    suggestedPrompts: [
      'Explain the Right to Information Act simply',
      'What is the Consumer Protection Act 2019?',
      'Explain GST in simple terms',
      'What are my rights as a tenant in India?',
      'Explain the Motor Vehicles Act provisions',
    ],
  },
  {
    id: 'multilingual',
    label: 'Multilingual Assistant',
    description: 'Help in any Indian language',
    icon: '🌐',
    color: 'text-cyan-600 dark:text-cyan-400',
    gradient: 'from-cyan-500 to-sky-600',
    suggestedPrompts: [
      'मुझे राशन कार्ड के लिए क्या करना होगा?',
      'আধার কার্ড আপডেট কীভাবে করব?',
      'பான் கார்டு எப்படி apply செய்வது?',
      'পাসপোর্ট রিনিউ করার প্রক্রিয়া কী?',
      'ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ ਲਈ ਕੀ ਚਾਹੀਦਾ ਹੈ?',
    ],
  },
];

export const getRoleConfig = (id: string): AssistantRoleConfig =>
  ASSISTANT_ROLES.find(r => r.id === id) ?? ASSISTANT_ROLES[0];
