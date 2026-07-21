import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialLoaderProps {
  onComplete: () => void;
}

const keywords = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", 
  "Frontend", "Backend", "UI/UX", "APIs", "Database", 
  "Framer Motion", "Vite", "JavaScript", "HTML5", "CSS3"
];

const colors = [
  "text-blue-700", "text-purple-700", "text-emerald-700", 
  "text-rose-700", "text-amber-700", "text-cyan-700", "text-indigo-700"
];

// Helper to generate a random position and color
const getRandomProps = () => ({
  x: Math.floor(Math.random() * 80) + 10 + "%", // 10% to 90%
  y: Math.floor(Math.random() * 80) + 10 + "%", // 10% to 90%
  colorClass: colors[Math.floor(Math.random() * colors.length)],
});

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [keywordProps, setKeywordProps] = useState<{x: string, y: string, colorClass: string}[]>([]);

  useEffect(() => {
    // Generate static random positions and colors on mount to avoid hydration mismatches
    setKeywordProps(keywords.map(() => getRandomProps()));

    // Complete the loading screen after a fixed duration (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Central Glowing Light Effect */}
          <motion.div 
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/5 rounded-full blur-[80px] md:blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Keywords */}
          {keywordProps.length > 0 && keywords.map((word, i) => {
            const props = keywordProps[i];
            const delay = i * 0.1;
            return (
              <motion.div
                key={word}
                className={`absolute font-bold text-sm md:text-xl pointer-events-none whitespace-nowrap ${props.colorClass}`}
                style={{ left: props.x, top: props.y }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.7, 0], 
                  y: [20, -20],
                  scale: [0.8, 1.1]
                }}
                transition={{
                  duration: 2,
                  delay: delay,
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.div>
            );
          })}

          {/* Main Loading Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              className="text-white text-2xl md:text-4xl font-bold tracking-widest mb-4 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Pranav Shende
            </motion.div>
            
            {/* Minimal Progress Bar */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
