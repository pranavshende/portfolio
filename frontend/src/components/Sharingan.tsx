import React from 'react';

interface SharinganProps {
  className?: string;
  size?: number;
  spinning?: boolean;
}

export const Sharingan: React.FC<SharinganProps> = ({ 
  className = 'w-16 h-16', 
  size,
  spinning = true 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-[0_0_14px_rgba(220,38,38,0.75)] ${
          spinning ? 'animate-[spin_2.2s_linear_infinite]' : ''
        }`}
      >
        <defs>
          <radialGradient id="sharinganIris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="65%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#691212" />
          </radialGradient>

          {/* Single authentic Tomoe with circular head & curved sweeping tail */}
          <g id="sharinganTomoe">
            <circle cx="50" cy="24" r="4.8" fill="#0c0d10" />
            <path
              d="M 54.8,24 C 54.8,30 48,34.8 42,36.2 C 46.5,33.6 49.2,29.4 48.5,24.5 Z"
              fill="#0c0d10"
            />
          </g>
        </defs>

        {/* Outer Dark Rim & Red Iris */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#sharinganIris)"
          stroke="#0c0d10"
          strokeWidth="3.5"
        />

        {/* Concentric Tomoe Track Ring */}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="none"
          stroke="#0c0d10"
          strokeWidth="2.2"
          strokeOpacity="0.8"
        />

        {/* Center Black Pupil */}
        <circle cx="50" cy="50" r="8" fill="#0c0d10" />

        {/* 3 Tomoe placed symmetrically at 120-degree intervals */}
        <use href="#sharinganTomoe" />
        <use href="#sharinganTomoe" transform="rotate(120, 50, 50)" />
        <use href="#sharinganTomoe" transform="rotate(240, 50, 50)" />
      </svg>
    </div>
  );
};

export default Sharingan;

