import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateZ: number;
  opacity: number;
}

export const SakuraFall: React.FC = () => {
  // Generate 16 stable random petals
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      startX: (i * 6.25) + ((i * 13) % 7) - 2, // Spread evenly across 0-100vw with slight natural jitter
      startY: -40 - ((i * 35) % 150),
      size: 11 + ((i * 5) % 9), // 11px to 19px
      duration: 9 + ((i * 3) % 7), // 9s to 15s smooth float
      delay: (i * 0.7) % 6,
      drift: ((i % 2 === 0 ? 1 : -1) * (18 + ((i * 7) % 25))), // wind drift
      rotateZ: (i * 45) % 360,
      opacity: 0.55 + ((i % 4) * 0.1), // 0.55 to 0.85
    }));
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[15] overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="sakura-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb7c5" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#f48fb1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e91e63" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="sakura-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.startX}vw`,
            y: '-5vh',
            rotate: p.rotateZ,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: [`${p.startX}vw`, `${p.startX + p.drift * 0.5}vw`, `${p.startX + p.drift}vw`],
            y: '108vh',
            rotate: [p.rotateZ, p.rotateZ + 180, p.rotateZ + 360],
            scale: [0.8, 1.05, 0.9],
            opacity: [0, p.opacity, p.opacity * 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size * 1.35,
          }}
          className="will-change-transform"
        >
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(233,30,99,0.15)] dark:drop-shadow-[0_2px_4px_rgba(244,63,94,0.25)]"
          >
            {/* Organic curved Japanese Sakura petal geometry */}
            <path
              d="M15 0 C7 8 2 18 2 27 C2 34 8 39 15 39 C22 39 28 34 28 27 C28 18 23 8 15 0 Z M15 39 C14 36 12 34 10 34"
              fill="url(#sakura-gradient)"
              className="dark:hidden"
            />
            <path
              d="M15 0 C7 8 2 18 2 27 C2 34 8 39 15 39 C22 39 28 34 28 27 C28 18 23 8 15 0 Z M15 39 C14 36 12 34 10 34"
              fill="url(#sakura-gradient-dark)"
              className="hidden dark:block"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SakuraFall;
