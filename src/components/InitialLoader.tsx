import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Animated Pencil Sketch Icon */}
          <div className="relative flex flex-col items-center space-y-4">
            <motion.div
              animate={{
                rotate: [-15, 10, -15],
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-zinc-900 flex items-center justify-center shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-zinc-900"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
                <path d="M11 9l4 4" />
              </svg>
            </motion.div>

            <div className="flex flex-col items-center space-y-1">
              <span className="font-display font-bold text-lg text-zinc-900">
                Pranav Shende
              </span>
              <span className="font-doodle text-sm text-zinc-500">
                doodling portfolio... ✏️
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
