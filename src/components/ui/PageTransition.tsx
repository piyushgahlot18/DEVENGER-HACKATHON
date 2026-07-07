import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

interface PageTransitionProps {
  children: React.ReactNode;
  key?: string;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
