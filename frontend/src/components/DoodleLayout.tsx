import React, { useState, useEffect } from 'react';
import { DoodleSidebar } from './DoodleSidebar';
import cherryBlossomMist from '@/photo/cherry_blossom_mist.webp';
import cherryBlossomMistDark from '@/photo/cherry_blossom_mist_dark.webp';
import cherryBlossomMistMobile from '@/photo/cherry_blossom_mist_mobile.webp';
import cherryBlossomMistMobileDark from '@/photo/cherry_blossom_mist_mobile_dark.webp';

interface DoodleLayoutProps {
  children: React.ReactNode;
}

export const DoodleLayout: React.FC<DoodleLayoutProps> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 font-sans selection:bg-[#8b2323] selection:text-white relative transition-colors duration-200">
      {/* ── Japanese Paper & Dot-Grid Canvas Background ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Crisp Paper Dot-Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#d6cec0_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#2b2e38_1.25px,transparent_1.25px)] [background-size:18px_18px] opacity-75 dark:opacity-60 pointer-events-none" 
        />

        {/* Light Mode Desktop Watercolor Mist (Subtle atmospheric wash) */}
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed opacity-30 dark:opacity-0 mix-blend-multiply transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${cherryBlossomMist})`,
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
        {/* Light Mode Mobile Watercolor Mist */}
        <div 
          className="block md:hidden absolute inset-0 bg-cover bg-top bg-fixed opacity-35 dark:opacity-0 mix-blend-multiply transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${cherryBlossomMistMobile})`,
            imageRendering: '-webkit-optimize-contrast'
          }}
        />

        {/* Dark Mode Desktop Mist */}
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed opacity-0 dark:opacity-20 transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${cherryBlossomMistDark})`,
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
        {/* Dark Mode Mobile Mist */}
        <div 
          className="block md:hidden absolute inset-0 bg-cover bg-top bg-fixed opacity-0 dark:opacity-25 transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${cherryBlossomMistMobileDark})`,
            imageRendering: '-webkit-optimize-contrast'
          }}
        />

        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/[0.015] via-transparent to-stone-900/[0.03] dark:from-black/30 dark:to-black/50" />
      </div>

      <DoodleSidebar />

      {/* Main Content Area - Generous width filling the screen without excessive right-side void */}
      <div className="md:pl-[264px] flex flex-col min-h-screen relative z-10">
        <main className="flex-1 w-full max-w-[1700px] px-4 sm:px-6 md:px-8 lg:px-10 xl:pr-14 py-6 sm:py-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* ── Thin Translucent Line replacing scrollbar ── */}
      <div 
        className="fixed right-1.5 sm:right-2 top-0 bottom-0 w-[1.5px] bg-stone-300/60 dark:bg-zinc-800 pointer-events-none z-50"
        aria-hidden="true"
      >
        <div
          className="w-[2.5px] -ml-[0.5px] bg-[#8b2323] dark:bg-rose-500 rounded-full transition-transform duration-75 ease-out shadow-xs"
          style={{
            height: '45px',
            transform: `translateY(${scrollProgress * ((typeof window !== 'undefined' ? window.innerHeight : 800) - 60) / 100}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default DoodleLayout;
