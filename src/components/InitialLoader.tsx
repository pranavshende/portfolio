import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sumieLoaderBase from "@/photo/sumie_loader_base.jpg";

interface InitialLoaderProps {
  onComplete: () => void;
}

// Sakura petal component for falling blossom effect
const SakuraPetal = ({ delay, startX, duration }: { delay: number; startX: number; duration: number }) => (
  <motion.div
    initial={{ y: -40, x: `${startX}vw`, rotate: 0, opacity: 0 }}
    animate={{
      y: "105vh",
      x: `${startX + (Math.sin(startX) * 12 + 6)}vw`,
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
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-red-400/80 fill-rose-300/80 drop-shadow-2xs">
      <path d="M12 2C8.5 2 4 6.5 4 11c0 5 4.5 9 8 11 3.5-2 8-6 8-11 0-4.5-4.5-9-8-9z" />
    </svg>
  </motion.div>
);

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Smooth progress increment from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic increment steps
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 450);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Generate a few random petals
  const petals = [
    { delay: 0.1, startX: 10, duration: 4.8 },
    { delay: 0.4, startX: 25, duration: 5.4 },
    { delay: 0.9, startX: 40, duration: 4.5 },
    { delay: 0.2, startX: 60, duration: 5.8 },
    { delay: 0.7, startX: 75, duration: 4.9 },
    { delay: 1.2, startX: 88, duration: 5.2 },
    { delay: 1.5, startX: 18, duration: 5.0 },
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="sumie-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden bg-[#eee0d1]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Fullscreen Japanese Artwork */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-100"
            style={{
              backgroundImage: `url(${sumieLoaderBase})`,
              backgroundPosition: "center center",
            }}
          />

          {/* Gentle parchment vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />

          {/* Drifting Sakura Petals */}
          {petals.map((p, idx) => (
            <SakuraPetal key={idx} delay={p.delay} startX={p.startX} duration={p.duration} />
          ))}

          {/* Interactive Progress Bar & Percentage (Layered precisely on artwork track) */}
          <div className="relative z-30 flex flex-col items-center mt-36 sm:mt-40 md:mt-44 px-4 w-full max-w-sm sm:max-w-md">
            {/* The Brushstroke Track */}
            <div className="w-64 sm:w-80 h-2.5 sm:h-3 rounded-full bg-stone-900/15 backdrop-blur-2xs p-0.5 border border-stone-800/20 shadow-inner overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#991b1b] shadow-xs"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* Percentage Counter in classic calligraphy style */}
            <div className="mt-2 text-center">
              <span className="font-serif text-sm sm:text-base tracking-[0.25em] text-stone-700 font-semibold drop-shadow-2xs">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
