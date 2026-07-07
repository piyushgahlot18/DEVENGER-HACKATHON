import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  info: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge = ({ children, variant = 'default', size = 'sm', className }: BadgeProps) => {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full font-medium', variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
};

export const priorityBadge = (priority: string) => {
  const map: Record<string, { variant: 'error' | 'warning' | 'info' | 'default'; label: string }> = {
    urgent: { variant: 'error', label: 'Urgent' },
    high: { variant: 'warning', label: 'High' },
    medium: { variant: 'info', label: 'Medium' },
    low: { variant: 'default', label: 'Low' },
  };
  return map[priority] || { variant: 'default', label: priority };
};

export const statusBadge = (status: string) => {
  const map: Record<string, { variant: 'success' | 'warning' | 'info' | 'outline' | 'default' | 'error'; label: string }> = {
    open: { variant: 'info', label: 'Open' },
    in_progress: { variant: 'warning', label: 'In Progress' },
    resolved: { variant: 'success', label: 'Resolved' },
    closed: { variant: 'outline', label: 'Closed' },
    uploaded: { variant: 'success', label: 'Uploaded' },
    missing: { variant: 'error', label: 'Missing' },
    expired: { variant: 'warning', label: 'Expired' },
    processing: { variant: 'info', label: 'Processing' },
  };
  return map[status] || { variant: 'default', label: status };
};
