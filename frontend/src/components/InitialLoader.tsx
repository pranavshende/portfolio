import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cherryBlossomMist from "@/photo/cherry_blossom_mist.webp";
import cherryBlossomMistMobile from "@/photo/cherry_blossom_mist_mobile.webp";
import ClassySpinner from "./ClassySpinner";

interface InitialLoaderProps {
  onComplete: () => void;
}

const SakuraPetal = ({ delay, startX, duration }: { delay: number; startX: number; duration: number }) => (
  <motion.div
    initial={{ y: -40, x: `${startX}vw`, rotate: 0, opacity: 0 }}
    animate={{
      y: "105vh",
      x: `${startX + (Math.sin(startX) * 10 + 5)}vw`,
      rotate: [0, 90, 180, 270, 360],
      opacity: [0, 0.85, 0.9, 0.7, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="fixed pointer-events-none z-20"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-red-500/80 fill-rose-400/80 drop-shadow-2xs">
      <path d="M12 2C8.5 2 4 6.5 4 11c0 5 4.5 9 8 11 3.5-2 8-6 8-11 0-4.5-4.5-9-8-9z" />
    </svg>
  </motion.div>
);

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant calibrated display duration (~1100ms) for a classy, instant feel
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 350);
    }, 1150);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const petals = [
    { delay: 0.1, startX: 12, duration: 4.8 },
    { delay: 0.5, startX: 28, duration: 5.2 },
    { delay: 0.2, startX: 55, duration: 4.5 },
    { delay: 0.8, startX: 72, duration: 5.5 },
    { delay: 1.2, startX: 85, duration: 4.9 },
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="aesthetic-zen-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden bg-[#eee0d1]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Fullscreen Cherry Blossom Mist Artwork */}
          <div
            className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-100"
            style={{
              backgroundImage: `url(${cherryBlossomMist})`,
              backgroundPosition: "center center",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div
            className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-top transition-transform duration-1000 scale-100"
            style={{
              backgroundImage: `url(${cherryBlossomMistMobile})`,
              backgroundPosition: "top center",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />

          {/* Drifting Sakura Petals */}
          {petals.map((p, idx) => (
            <SakuraPetal key={idx} delay={p.delay} startX={p.startX} duration={p.duration} />
          ))}

          {/* Aesthetic Japanese Washi Card */}
          <motion.div 
            initial={{ scale: 0.92, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-30 flex flex-col items-center px-8 py-7 sm:px-10 sm:py-9 rounded-3xl bg-[#faf6f0]/95 backdrop-blur-md border-2 border-stone-900 shadow-[5px_5px_0px_#1c1917] max-w-[90vw] sm:max-w-md"
          >
            {/* Classy Zen Orbit Spinner with Red Hanko Core */}
            <div className="mb-4">
              <ClassySpinner size="lg" />
            </div>

            {/* Name with tracked serif typography */}
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-[0.28em] uppercase text-stone-900 drop-shadow-2xs text-center">
              Pranav Shende
            </h1>

            {/* Minimalist Subtitle */}
            <p className="font-serif text-xs sm:text-sm text-stone-600 font-medium tracking-wide mt-1 text-center">
              Full Stack &amp; AI Engineer
            </p>

            {/* Status indicator (replaced the progress bar with an elegant badge) */}
            <div className="mt-4 pt-3 border-t border-stone-900/15 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b2323] animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-700 font-semibold">
                「 読込中 」 ENTERING
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
