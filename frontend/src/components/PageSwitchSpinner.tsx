import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePhoto from '@/photo/profile_photo_wide.png';

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
            {/* Japanese Sumi-e Enso Ink Spinner with Round Photo */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer rotating ink brush circle */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_1.4s_cubic-bezier(0.4,0,0.2,1)_infinite] text-[#8b2323] dark:text-rose-500 drop-shadow-xs"
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

              {/* Inner Round Profile Photo with crimson border */}
              <div className="absolute w-10 h-10 rounded-full overflow-hidden border-2 border-[#8b2323] shadow-xs bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <img
                  src={profilePhoto}
                  alt="Pranav Shende"
                  className="w-full h-full object-cover scale-[1.7] translate-y-0.5"
                />
              </div>
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
