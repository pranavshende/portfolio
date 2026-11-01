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

import React, { useState, useEffect } from "react";
import InitialLoader from "./components/InitialLoader";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

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
  
  return (
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
