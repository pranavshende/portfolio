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
            initial={{ scale: 0.88 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.88 }}
            transition={{ duration: 0.15 }}
            className="p-3.5 rounded-full bg-[#faf6f0]/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]"
          >
            <ClassySpinner size="sm" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitchSpinner;
