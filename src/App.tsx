import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";
import PlayGames from "./pages/PlayGames";
import { ModeProvider } from "./contexts/ModeContext";

import React, { useState } from "react";
import InitialLoader from "./components/InitialLoader";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
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
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/playgames" element={<PageTransition><PlayGames /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
              <AnimatedRoutes />
            </BrowserRouter>
          )}
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
