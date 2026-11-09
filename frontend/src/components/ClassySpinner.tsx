import React from 'react';
import { motion } from 'framer-motion';

interface ClassySpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSeal?: boolean;
}

export const ClassySpinner: React.FC<ClassySpinnerProps> = ({ 
  size = 'md', 
  className = '',
  showSeal = true 
}) => {
  const dimensions = {
    sm: { px: 44, strokeWidth: 1.5, sealSize: 18 },
    md: { px: 68, strokeWidth: 1.75, sealSize: 26 },
    lg: { px: 96, strokeWidth: 2, sealSize: 34 },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimensions.px}
        height={dimensions.px}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Subtle Static Outer Guide Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-stone-400/40 dark:text-stone-600/40"
          strokeDasharray="2 4"
        />

        {/* Outer Clockwise Rotating Zen Ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        >
          {/* Main Ink Arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#1c1917"
            strokeWidth={dimensions.strokeWidth}
            strokeLinecap="round"
            strokeDasharray="160 80"
            className="dark:stroke-stone-200"
          />
          {/* Cardinal Zen Marks */}
          <circle cx="50" cy="8" r="1.75" fill="#8b2323" />
          <circle cx="92" cy="50" r="1.25" fill="#1c1917" className="dark:fill-stone-300" />
          <circle cx="50" cy="92" r="1.25" fill="#1c1917" className="dark:fill-stone-300" />
          <circle cx="8" cy="50" r="1.25" fill="#1c1917" className="dark:fill-stone-300" />
        </motion.g>

        {/* Inner Counter-Clockwise Vermilion Orbit */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#8b2323"
            strokeWidth={dimensions.strokeWidth}
            strokeLinecap="round"
            strokeDasharray="80 60"
          />
          {/* Orbiting Red Particle */}
          <circle cx="50" cy="20" r="2.25" fill="#8b2323" />
        </motion.g>

        {/* Micro Dashed Inner Ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        >
          <circle
            cx="50"
            cy="50"
            r="22"
            stroke="#8b2323"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            strokeOpacity="0.45"
          />
        </motion.g>
      </svg>

      {/* Centerpiece: Minimalist Japanese Red Hanko (Seal) or Sakura Blossom Core */}
      {showSeal && (
        <motion.div
          animate={{
            scale: [0.94, 1.04, 0.94],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div 
            className="flex items-center justify-center rounded-lg bg-[#8b2323] text-[#faf6f0] border border-[#5c1616] shadow-[1.5px_1.5px_0px_#1c1917] font-serif font-black select-none"
            style={{ 
              width: `${dimensions.sealSize}px`, 
              height: `${dimensions.sealSize}px`,
              fontSize: `${Math.round(dimensions.sealSize * 0.52)}px`
            }}
          >
            普
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ClassySpinner;
