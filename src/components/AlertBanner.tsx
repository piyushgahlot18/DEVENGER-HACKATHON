import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Megaphone, ChevronRight } from 'lucide-react';

const alerts = [
  { id: 1, text: '🎉 New: Unified RTI filing portal now live — apply online in minutes!', link: '#' },
  { id: 2, text: '📣 PM-KISAN 17th instalment releasing soon. Check your status now.', link: '#' },
  { id: 3, text: '⚡ Aadhaar Card update fee waived till Dec 2026. Update yours for free!', link: '#' },
];

export const AlertBanner = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white text-sm py-2.5 px-4 flex items-center justify-center gap-3 overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)` }}
      />
      <Megaphone className="w-3.5 h-3.5 flex-shrink-0 text-yellow-300" />
      <div className="overflow-hidden h-5 relative flex-1 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-xs font-medium text-white/95 flex items-center justify-center gap-2"
          >
            {alerts[current].text}
            <a href={alerts[current].link} className="underline text-yellow-300 hover:text-yellow-200 transition-colors whitespace-nowrap flex items-center gap-0.5">
              Learn more <ChevronRight className="w-3 h-3" />
            </a>
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
