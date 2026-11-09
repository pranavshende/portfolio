import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClassySpinner from './ClassySpinner';

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
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/15 dark:bg-black/35 backdrop-blur-[2px] pointer-events-none select-none"
        >
          <motion.div
            initial={{ scale: 0.92, y: 4 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#faf6f0]/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]"
          >
            <ClassySpinner size="sm" />
            <div className="flex flex-col">
              <span className="font-serif text-xs font-bold tracking-wider text-stone-900 dark:text-stone-100">
                Opening...
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8b2323] dark:text-rose-400 font-bold">
                「 栞 」 SHIORI
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitchSpinner;
