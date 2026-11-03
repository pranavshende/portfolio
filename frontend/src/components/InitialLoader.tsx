import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cherryBlossomMist from "@/photo/cherry_blossom_mist.jpg";
import cherryBlossomMistMobile from "@/photo/cherry_blossom_mist_mobile.jpg";
import profilePhoto from "@/photo/profile_photo_wide.png";

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
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 5;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 400);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

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
          key="sumie-clean-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden bg-[#eee0d1]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Fullscreen Cherry Blossom Mist Artwork (HD Desktop & QHD Mobile) */}
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

          {/* Center Clean Japanese Sumi-e Spinner Box */}
          <div className="relative z-30 flex flex-col items-center space-y-4 px-4">
            {/* Ink Circle (Enso) with Round Profile Photo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0"
            >
              {/* Outer Enso Ink Ring */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] opacity-85 text-stone-900 pointer-events-none">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeDasharray="210 50"
                  strokeLinecap="round"
                />
              </svg>

              {/* Inner Round Profile Photo with crimson border */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full overflow-hidden border-2 border-[#8b2323] shadow-sm bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center">
                <img
                  src={profilePhoto}
                  alt="Pranav Shende"
                  className="w-full h-full max-w-full max-h-full object-cover object-center scale-[1.7] translate-y-0.5 pointer-events-none select-none"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Name */}
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 drop-shadow-2xs">
              Pranav Shende
            </h1>

            {/* Compact Spinner Bar (Smaller size requested) */}
            <div className="flex flex-col items-center pt-1">
              <div className="w-36 sm:w-44 h-1.5 sm:h-2 rounded-full bg-stone-900/10 p-0.5 border border-stone-800/20 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#8b2323] shadow-xs"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Minimal percentage counter */}
              <span className="font-serif text-[11px] sm:text-xs tracking-[0.2em] text-stone-600 font-semibold mt-1.5">
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
