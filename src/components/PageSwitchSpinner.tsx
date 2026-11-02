import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageSwitchSpinnerProps {
  isLoading: boolean;
}

export const PageSwitchSpinner: React.FC<PageSwitchSpinnerProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-switch-spinner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f2ea]/70 dark:bg-[#0c0d10]/75 backdrop-blur-xs pointer-events-none select-none"
        >
          <div className="flex flex-col items-center space-y-3">
            {/* Japanese Sumi-e Enso Ink Spinner */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Outer rotating ink brush circle */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite] text-[#8b2323] dark:text-rose-500 drop-shadow-xs"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray="180 80"
                  strokeLinecap="round"
                />
              </svg>

              {/* Inner Sakura Petal / Brush Core */}
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center text-[#8b2323] dark:text-rose-400"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                  <path d="M12 2C8.5 2 4 6.5 4 11c0 5 4.5 9 8 11 3.5-2 8-6 8-11 0-4.5-4.5-9-8-9z" />
                </svg>
              </motion.div>
            </div>

            {/* Subtle Sumi-e Ink Label */}
            <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-serif text-xs tracking-wider">
              <span className="text-[#8b2323]">⛩</span>
              <span>Loading...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitchSpinner;
