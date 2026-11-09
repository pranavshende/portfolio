import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cherryBlossomMist from "@/photo/cherry_blossom_mist.webp";
import cherryBlossomMistMobile from "@/photo/cherry_blossom_mist_mobile.webp";
import ClassySpinner from "./ClassySpinner";

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Calibrated duration (~1400ms) to enjoy the aesthetic entrance without excessive waiting
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="zen-bin-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden bg-[#f6eee3] dark:bg-[#121316]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Subtle Authentic Washi Watercolor Background (Mist on right as shown in reference) */}
          <div
            className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center opacity-70 dark:opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url(${cherryBlossomMist})`,
              backgroundPosition: "center right",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div
            className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-top opacity-70 dark:opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url(${cherryBlossomMistMobile})`,
              backgroundPosition: "top right",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />

          {/* Center Stage: Minimal, floating content matching reference image */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-30 flex flex-col items-center text-center px-6 max-w-xl mx-auto"
          >
            {/* ── 1. The Interlocking Gyroscopic Orbital Spinner ── */}
            <div className="mb-7 sm:mb-8">
              <ClassySpinner size="lg" />
            </div>

            {/* ── 2. Primary Title: "WELCOME TO MY BIN" ── */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-black tracking-[0.22em] uppercase text-stone-900 dark:text-stone-100 drop-shadow-2xs leading-tight">
              WELCOME TO MY BIN
            </h1>

            {/* ── 3. Subtitle: "Preparing your workspace" ── */}
            <p className="font-serif italic text-sm sm:text-base text-stone-600 dark:text-stone-400 font-medium tracking-wide mt-2">
              Preparing your workspace
            </p>

            {/* ── 4. Hairline Divider Rule ── */}
            <div className="w-56 sm:w-72 h-[1px] bg-stone-400/40 dark:bg-stone-700/60 my-4 sm:my-5" />

            {/* ── 5. Status Indicator: |  ● ● ○  |  LOADING .... ── */}
            <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-[13px] tracking-[0.22em] text-stone-600 dark:text-stone-400 font-semibold uppercase">
              <span className="text-stone-400 dark:text-stone-600 font-light">|</span>

              {/* 3 Staggered Pulsing Red Dots */}
              <div className="flex items-center gap-1.5 px-0.5">
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[#8b2323]"
                />
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.25, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[#a82828]"
                />
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[#d97706]/70 dark:bg-stone-500"
                />
              </div>

              <span className="text-stone-400 dark:text-stone-600 font-light">|</span>

              <div className="flex items-center">
                <span>LOADING</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-0.5 font-bold text-[#8b2323]"
                >
                  ....
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
