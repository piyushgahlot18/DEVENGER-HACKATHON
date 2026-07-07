import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, hover = false, onClick }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border border-white/20 bg-white/80 backdrop-blur-md shadow-lg dark:bg-white/5 dark:border-white/10 dark:shadow-black/30',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
