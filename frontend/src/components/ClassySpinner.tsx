import React from 'react';
import { motion } from 'framer-motion';

interface ClassySpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSeal?: boolean;
}

export const ClassySpinner: React.FC<ClassySpinnerProps> = ({ 
  size = 'md', 
  className = '',
  showSeal = true 
}) => {
  const dimensions = {
    sm: 52,
    md: 84,
    lg: 124,
    xl: 148,
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="hankoSealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#661010" />
          </linearGradient>
          <filter id="hankoShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#1c1917" floodOpacity="0.25" />
          </filter>
          <filter id="satelliteGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* ── 1. Outer Dark Ink Arc Ring ── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        >
          <ellipse
            cx="60"
            cy="60"
            rx="45"
            ry="45"
            stroke="#1c1917"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="190 95"
            className="dark:stroke-stone-200"
          />
        </motion.g>

        {/* ── 2. Primary Red Orbital Ellipse (Tilted 38° with glowing red satellite bead) ── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        >
          <g transform="rotate(38 60 60)">
            <ellipse
              cx="60"
              cy="60"
              rx="49"
              ry="36"
              stroke="#8b2323"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeDasharray="185 85"
            />
            {/* Glowing Red Orbital Bead at apex */}
            <circle
              cx="109"
              cy="60"
              r="3.2"
              fill="#dc2626"
              filter="url(#satelliteGlow)"
            />
          </g>
        </motion.g>

        {/* ── 3. Secondary Red Orbital Ellipse (Tilted -40°, Counter-Rotating) ── */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        >
          <g transform="rotate(-40 60 60)">
            <ellipse
              cx="60"
              cy="60"
              rx="47"
              ry="34"
              stroke="#6b1a1a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="165 95"
            />
          </g>
        </motion.g>

        {/* ── 4. Center Hanko Seal (普 - Pranav) ── */}
        {showSeal && (
          <motion.g
            animate={{ scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "60px", originY: "60px" }}
            filter="url(#hankoShadow)"
          >
            <rect
              x="44"
              y="44"
              width="32"
              height="32"
              rx="8.5"
              fill="url(#hankoSealGradient)"
              stroke="#580f0f"
              strokeWidth="0.5"
            />
            <text
              x="60"
              y="66.5"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontFamily="'Plus Jakarta Sans', serif"
              fontWeight="bold"
              fontSize="17"
            >
              普
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
};

export default ClassySpinner;
