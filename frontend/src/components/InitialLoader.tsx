import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClassySpinner from "./ClassySpinner";

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Seamlessly hand off and remove static pre-react loader
    const preLoader = document.getElementById('pre-react-loader');
    if (preLoader) {
      preLoader.remove();
    }

    // Calibrated quick display duration (400ms + 250ms fade) without blocking LCP
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 250);
    }, 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="minimal-zen-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden bg-[#f6eee3] dark:bg-[#121316] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* Subtle Washi Background using shared CSS rule (zero extra network load) */}
          <div className="absolute inset-0 global-site-bg opacity-70 dark:opacity-40" />

          {/* Centerpiece: Clean Circle Spinner with Inner Orbiting Ball */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-30 flex items-center justify-center p-6"
          >
            <ClassySpinner size="xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
