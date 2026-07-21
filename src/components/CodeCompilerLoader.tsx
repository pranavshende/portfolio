import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface CodeCompilerLoaderProps {
  onComplete: () => void;
}

const codeLines = [
  "npm install @portfolio/core",
  "Resolving packages...",
  "Fetched 1342 packages in 0.8s",
  "npm run build",
  "> portfolio@1.0.0 build",
  "> vite build",
  "vite v5.4.19 building for production...",
  "✓ 42 modules transformed.",
  "dist/index.html               1.45 kB",
  "dist/assets/index-D1g9h.css  16.90 kB",
  "dist/assets/index-Cb8k2.js  145.20 kB",
  "✓ built in 1.25s"
];

export const CodeCompilerLoader: React.FC<CodeCompilerLoaderProps> = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    const nextLine = () => {
      if (currentLine < codeLines.length) {
        setDisplayedLines(prev => [...prev, codeLines[currentLine]]);
        currentLine++;
        
        // Vary the speed to simulate actual compilation/typing
        let delay = 100;
        if (currentLine === 2 || currentLine === 6) delay = 400; // Fake delay for resolving/building
        if (currentLine === codeLines.length) delay = 300; 
        
        setTimeout(nextLine, delay);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };
    
    setTimeout(nextLine, 300);
    
    return () => {};
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d1117] text-[#c9d1d9] font-mono p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full max-w-2xl bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="flex items-center px-4 py-2 bg-[#010409] border-b border-[#30363d]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto flex items-center text-xs text-[#8b949e]">
            <Terminal className="w-3 h-3 mr-2" />
            bash - build
          </div>
        </div>
        
        <div className="p-4 md:p-6 text-xs md:text-sm h-[300px] md:h-[400px] overflow-y-auto flex flex-col justify-end">
          <div className="flex flex-col space-y-1">
            {displayedLines.map((line, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className={
                  line.includes("✓") ? "text-green-400" :
                  line.includes("error") ? "text-red-400" :
                  line.includes(">") ? "text-blue-400" : 
                  "text-[#c9d1d9]"
                }
              >
                <span className="text-[#8b949e] mr-2 opacity-50">~</span>
                {line}
              </motion.div>
            ))}
            
            {!isComplete && (
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-white mt-1"
              />
            )}
            
            {isComplete && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-400 font-bold"
              >
                [Process completed] Starting application...
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeCompilerLoader;
