import React from 'react';
import { motion } from 'framer-motion';

interface ClassySpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ClassySpinner: React.FC<ClassySpinnerProps> = ({ 
  size = 'md', 
  className = '',
}) => {
  const config = {
    sm: { box: 48, radius: 20, strokeWidth: 2.5, ballRadius: 4.5, orbit: 14 },
    md: { box: 72, radius: 31, strokeWidth: 3, ballRadius: 6.5, orbit: 22 },
    lg: { box: 96, radius: 42, strokeWidth: 3.5, ballRadius: 8.5, orbit: 30 },
    xl: { box: 120, radius: 52, strokeWidth: 4, ballRadius: 10.5, orbit: 38 },
  }[size];

  const center = config.box / 2;

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: config.box, height: config.box }}
    >
      <svg
        width={config.box}
        height={config.box}
        viewBox={`0 0 ${config.box} ${config.box}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Outer Circular Ring matching reference */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-stone-900 dark:text-stone-100"
          strokeLinecap="round"
        />
      </svg>

      {/* Orbiting / Swirling Inner Ball with Random Fluid Dynamics */}
      <motion.div
        animate={{
          rotate: [0, 160, 290, 420, 600, 720],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: [0.45, 0.05, 0.55, 0.95],
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ originX: '50%', originY: '50%' }}
      >
        <motion.div
          animate={{
            y: [config.orbit, config.orbit * 0.72, config.orbit * 0.95, config.orbit * 0.6, config.orbit],
            x: [0, config.orbit * 0.25, -config.orbit * 0.2, config.orbit * 0.15, 0],
            scale: [1, 0.88, 1.08, 0.92, 1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: config.ballRadius * 2,
            height: config.ballRadius * 2,
          }}
          className="rounded-full bg-stone-900 dark:bg-stone-100 shadow-[0_1px_4px_rgba(0,0,0,0.18)]"
        />
      </motion.div>
    </div>
  );
};

export default ClassySpinner;
