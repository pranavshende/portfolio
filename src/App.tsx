import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Art from "@/pages/Art";
import Arcade from "@/pages/Arcade";
import ProjectsPage from "@/pages/ProjectsPage";
import NotFound from "@/pages/NotFound";
import PlayGames from "@/pages/PlayGames";
import { ModeProvider } from "@/contexts/ModeContext";

import React, { useState, useEffect, useRef } from "react";
import InitialLoader from "./components/InitialLoader";
import PageSwitchSpinner from "./components/PageSwitchSpinner";
import { AnimatePresence, motion } from "framer-motion";
import cherryBlossomMist from "@/photo/cherry_blossom_mist.jpg";
import cherryBlossomMistDark from "@/photo/cherry_blossom_mist_dark.jpg";
import cherryBlossomMistMobile from "@/photo/cherry_blossom_mist_mobile.jpg";
import cherryBlossomMistMobileDark from "@/photo/cherry_blossom_mist_mobile_dark.jpg";

const queryClient = new QueryClient();

const GlobalBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    {/* Light Mode Desktop */}
    <div 
      className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed opacity-95 dark:opacity-0 transition-opacity duration-300"
      style={{ backgroundImage: `url(${cherryBlossomMist})` }}
    />
    {/* Light Mode Mobile (Prominent sakura branch & Mount Fuji) */}
    <div 
      className="block md:hidden absolute inset-0 bg-cover bg-top bg-fixed opacity-95 dark:opacity-0 transition-opacity duration-300"
      style={{ backgroundImage: `url(${cherryBlossomMistMobile})` }}
    />

    {/* Dark Mode Desktop */}
    <div 
      className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed opacity-0 dark:opacity-90 transition-opacity duration-300"
      style={{ backgroundImage: `url(${cherryBlossomMistDark})` }}
    />
    {/* Dark Mode Mobile */}
    <div 
      className="block md:hidden absolute inset-0 bg-cover bg-top bg-fixed opacity-0 dark:opacity-90 transition-opacity duration-300"
      style={{ backgroundImage: `url(${cherryBlossomMistMobileDark})` }}
    />

    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/[0.02] via-transparent to-stone-900/[0.04] dark:from-black/40 dark:to-black/60" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    
    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.body.scrollTop = 0;
    html.scrollTop = 0;

    const handleScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.body.scrollTop = 0;
      html.scrollTop = 0;
    };

    const timeoutId1 = setTimeout(handleScroll, 50);
    const timeoutId2 = setTimeout(() => {
      handleScroll();
      html.style.scrollBehavior = originalScrollBehavior;
    }, 150);
    const timeoutId3 = setTimeout(handleScroll, 300);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      html.style.scrollBehavior = originalScrollBehavior;
    };
  }, [pathname]);

  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  return (
    <>
      <PageSwitchSpinner isLoading={isNavigating} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/art" element={<PageTransition><Art /></PageTransition>} />
          <Route path="/arcade" element={<PageTransition><Arcade /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/playgames" element={<PageTransition><PlayGames /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ModeProvider>
          {!isAppLoaded ? (
            <InitialLoader onComplete={() => setIsAppLoaded(true)} />
          ) : (
            <BrowserRouter>
              <GlobalBackground />
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          )}
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
