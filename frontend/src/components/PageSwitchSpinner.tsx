import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sharingan from './Sharingan';

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
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f2ea]/75 dark:bg-[#0c0d10]/80 backdrop-blur-xs pointer-events-none select-none"
        >
          <div className="flex flex-col items-center space-y-3">
            {/* Spinning Sharingan */}
            <div className="relative flex items-center justify-center">
              <Sharingan className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>

            {/* Subtle Sumi-e Label */}
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
