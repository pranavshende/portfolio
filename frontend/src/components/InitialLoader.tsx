import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cherryBlossomMist from "@/photo/cherry_blossom_mist.webp";
import cherryBlossomMistMobile from "@/photo/cherry_blossom_mist_mobile.webp";
import ClassySpinner from "./ClassySpinner";

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant calibrated display duration (~1200ms) without any text
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 350);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="minimal-zen-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden bg-[#f6eee3] dark:bg-[#121316]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Subtle Authentic Washi Watercolor Background */}
          <div
            className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center opacity-70 dark:opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url(${cherryBlossomMist})`,
              backgroundPosition: "center right",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div
            className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-top opacity-70 dark:opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url(${cherryBlossomMistMobile})`,
              backgroundPosition: "top right",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />

          {/* Centerpiece: Clean Circle Spinner with Inner Orbiting Ball (No Text) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-30 flex items-center justify-center p-6"
          >
            <ClassySpinner size="xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
