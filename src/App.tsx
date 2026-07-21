import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlayGames from "./pages/PlayGames";
import { ModeProvider } from "./contexts/ModeContext";

import React, { useState } from "react";
import InitialLoader from "./components/InitialLoader";

const queryClient = new QueryClient();

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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/playgames" element={<PlayGames />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
