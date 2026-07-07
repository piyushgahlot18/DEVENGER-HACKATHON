import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ExternalLink, Phone, Copy, CheckCheck, FileText,
  AlertCircle, Briefcase, ChevronRight
} from 'lucide-react';
import type { AIAction } from '../../services/ai/types';
import { cn } from '../../lib/utils';

interface ActionCardProps {
  action: AIAction;
  index: number;
}

const actionStyles: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  link: {
    bg: 'bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: <ExternalLink className="w-3.5 h-3.5" />,
  },
  service: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: <Briefcase className="w-3.5 h-3.5" />,
  },
  complaint: {
    bg: 'bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  document: {
    bg: 'bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/50',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800',
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  copy: {
    bg: 'bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-700',
    icon: <Copy className="w-3.5 h-3.5" />,
  },
  scheme: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: <ChevronRight className="w-3.5 h-3.5" />,
  },
  phone: {
    bg: 'bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/50',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    icon: <Phone className="w-3.5 h-3.5" />,
  },
};

const getStyle = (type: string) =>
  actionStyles[type] ?? actionStyles.link;

export const ActionCard = ({ action, index }: ActionCardProps) => {
  const [copied, setCopied] = useState(false);
  const style = getStyle(action.type);

  const handleCopy = () => {
    if (action.content) {
      navigator.clipboard.writeText(action.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer select-none',
        style.bg,
        style.text,
        style.border
      )}
    >
      {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : style.icon}
      <span>{copied ? 'Copied!' : action.label}</span>
      {action.type === 'phone' && action.phone && (
        <span className="ml-auto font-mono text-xs opacity-70">{action.phone}</span>
      )}
    </motion.div>
  );

  // Route each action type appropriately
  if (action.type === 'link' && action.url) {
    return (
      <a href={action.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  if (action.type === 'phone' && action.phone) {
    return (
      <a href={`tel:${action.phone}`}>
        {inner}
      </a>
    );
  }

  if (action.type === 'service') {
    return (
      <Link to="/services">
        {inner}
      </Link>
    );
  }

  if (action.type === 'complaint') {
    return (
      <Link to="/complaints">
        {inner}
      </Link>
    );
  }

  if (action.type === 'document') {
    return (
      <Link to="/documents">
        {inner}
      </Link>
    );
  }

  if (action.type === 'scheme') {
    return (
      <Link to="/services">
        {inner}
      </Link>
    );
  }

  if (action.type === 'copy') {
    return (
      <div onClick={handleCopy}>
        {inner}
      </div>
    );
  }

  return inner;
};

interface ActionCardsProps {
  actions: AIAction[];
}

export const ActionCards = ({ actions }: ActionCardsProps) => {
  if (!actions.length) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">Quick Actions</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, i) => (
          <ActionCard key={`${action.type}-${i}`} action={action} index={i} />
        ))}
      </div>
    </div>
  );
};
