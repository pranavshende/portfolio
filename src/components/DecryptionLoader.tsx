import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DecryptionLoaderProps {
  onComplete: () => void;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

export const DecryptionLoader: React.FC<DecryptionLoaderProps> = ({ onComplete }) => {
  const [text, setText] = useState("");
  const targetText = "ACCESS GRANTED";
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setText((prev) =>
          targetText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait a bit before completing
        }

        iteration += 1 / 3;
      }, 50);
    };

    // Small initial delay
    setTimeout(startAnimation, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-green-500 font-mono overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center w-full px-4 text-center">
        {/* Background grid/matrix effect hint */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <motion.div
          className="text-2xl md:text-5xl lg:text-7xl font-bold tracking-widest break-words max-w-full"
          animate={{ textShadow: isComplete ? "0 0 20px rgba(34, 197, 94, 0.8)" : "0 0 0px rgba(34, 197, 94, 0)" }}
        >
          {text || Array(targetText.length).fill("_").join("")}
        </motion.div>
        
        {/* Decorative elements */}
        <div className="mt-8 text-xs md:text-sm text-green-700 max-w-xs md:max-w-md opacity-70">
          <p className="animate-pulse">INITIALIZING SECURE CONNECTION...</p>
          <div className="flex justify-between w-full mt-2 border-t border-green-900 pt-2">
            <span>SYS.VER: 4.9.1</span>
            <span>PORT: 8080</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DecryptionLoader;
