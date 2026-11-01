import React from 'react';
import { motion } from 'framer-motion';

export const PropellerHat = ({ className = '', spinning = false }: { className?: string; spinning?: boolean }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      {/* Propeller blades at the top */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: spinning ? 0.6 : 3,
            ease: 'linear',
          }}
          className="relative w-10 h-3 flex items-center justify-center"
        >
          {/* Left blade */}
          <div className="absolute left-0 w-4 h-2 bg-amber-400 rounded-full border border-black transform -rotate-6 shadow-sm" />
          {/* Right blade */}
          <div className="absolute right-0 w-4 h-2 bg-cyan-400 rounded-full border border-black transform rotate-6 shadow-sm" />
          {/* Center bead / pin */}
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black z-10" />
        </motion.div>
      </div>

      {/* Small center rod */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[3px] h-3 bg-zinc-800 rounded-full z-10" />

      {/* Cap dome */}
      <svg
        viewBox="0 0 100 65"
        className="w-16 h-11 drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cap segments: Red, Yellow, Blue, Green */}
        {/* Segment 1: Red */}
        <path
          d="M 50 15 C 32 15 15 28 10 46 C 22 47 38 48 50 48 Z"
          fill="#ef4444"
          stroke="#18181b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Segment 2: Yellow */}
        <path
          d="M 50 15 C 38 25 35 38 34 48 C 45 49 55 49 66 48 C 65 38 62 25 50 15 Z"
          fill="#facc15"
          stroke="#18181b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Segment 3: Cyan/Blue */}
        <path
          d="M 50 15 C 68 15 85 28 90 46 C 78 47 62 48 50 48 Z"
          fill="#06b6d4"
          stroke="#18181b"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Visor / Brim */}
        <path
          d="M 8 46 C 20 40 40 38 50 38 C 60 38 80 40 92 46 C 96 52 82 56 50 56 C 18 56 4 52 8 46 Z"
          fill="#3b82f6"
          stroke="#18181b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Little button top */}
        <circle cx="50" cy="15" r="4" fill="#18181b" />
      </svg>
    </div>
  );
};
