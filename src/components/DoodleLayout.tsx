import React, { useState, useEffect } from 'react';
import { DoodleSidebar } from './DoodleSidebar';
import sumieWebsiteBg from '@/photo/sumie_website_bg.jpg';

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
    <div className="min-h-screen bg-[#f7f2ea] dark:bg-[#0c0d10] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#fef08a] selection:text-zinc-900 relative transition-colors duration-200">
      {/* ── Japanese Sumi-e Artistic Background (Direct match to uploaded artwork) ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Light mode: sumi-e artwork with warm washi paper texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-75 dark:opacity-0 transition-opacity duration-300"
          style={{ backgroundImage: `url(${sumieWebsiteBg})` }}
        />
        {/* Dark mode: nocturnal ink wash interpretation with atmospheric contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-0 dark:opacity-15 invert dark:invert-0 filter brightness-90 contrast-125 transition-opacity duration-300"
          style={{ backgroundImage: `url(${sumieWebsiteBg})` }}
        />
        {/* Subtle atmospheric tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/[0.02] to-stone-900/[0.04] dark:from-black/40 dark:to-black/60" />
      </div>

      <DoodleSidebar />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col min-h-screen relative z-10">
        <main className="flex-1 w-full max-w-5xl px-6 sm:px-12 lg:px-16 py-8 sm:py-12 mx-auto">
          {children}
        </main>
      </div>

      {/* ── Thin Translucent Line replacing scrollbar (Direct match to Image 2) ── */}
      <div 
        className="fixed right-1.5 sm:right-2 top-0 bottom-0 w-[1.5px] bg-zinc-200/80 dark:bg-zinc-800 pointer-events-none z-50"
        aria-hidden="true"
      >
        {/* Subtle active progress indicator gliding on the line */}
        <div
          className="w-[2.5px] -ml-[0.5px] bg-[#991b1b] dark:bg-zinc-500 rounded-full transition-transform duration-75 ease-out shadow-xs"
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
