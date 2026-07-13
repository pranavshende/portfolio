import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "developer" | "recruiter";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialise from localStorage — default dark (developer)
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const stored = localStorage.getItem("portfolio-theme") as Mode | null;
      return stored === "recruiter" ? "recruiter" : "developer";
    } catch {
      return "developer";
    }
  });

  useEffect(() => {
    const body = document.body;
    // Clear any inline styles set by old useTheme hook
    body.style.backgroundColor = "";
    body.style.color = "";

    if (mode === "developer") {
      body.classList.add("developer-mode");
      body.classList.add("dark");
      body.classList.remove("recruiter-mode");
    } else {
      body.classList.add("recruiter-mode");
      body.classList.remove("developer-mode");
      body.classList.remove("dark");
    }

    try { localStorage.setItem("portfolio-theme", mode); } catch {}
  }, [mode]);

  const toggleMode = () => {
    const nextMode = mode === "developer" ? "recruiter" : "developer";
    
    if (!('startViewTransition' in document)) {
      setMode(nextMode);
      return;
    }

    const isGoingDark = nextMode === "developer";
    document.documentElement.dataset.themeTransition = isGoingDark ? "slide-left" : "slide-right";

    // @ts-ignore
    document.startViewTransition(() => {
      setMode(nextMode);
    });
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within a ModeProvider");
  return context;
};
