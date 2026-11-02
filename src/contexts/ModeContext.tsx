import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "developer" | "recruiter";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  isDark: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialise from localStorage
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const stored = localStorage.getItem("portfolio-theme");
      if (stored === "dark" || stored === "developer") return "developer";
      if (stored === "light" || stored === "recruiter") return "recruiter";
      return "recruiter"; // Default to light doodle aesthetic
    } catch {
      return "recruiter";
    }
  });

  const isDark = mode === "developer";
  const theme: "dark" | "light" = isDark ? "dark" : "light";

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    body.style.backgroundColor = "";
    body.style.color = "";

    if (isDark) {
      body.classList.add("developer-mode");
      body.classList.add("dark");
      html.classList.add("dark");
      body.classList.remove("recruiter-mode");
    } else {
      body.classList.add("recruiter-mode");
      body.classList.remove("developer-mode");
      body.classList.remove("dark");
      html.classList.remove("dark");
    }

    try {
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

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

  const toggleTheme = toggleMode;

  return (
    <ModeContext.Provider value={{ mode, toggleMode, isDark, theme, toggleTheme }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within a ModeProvider");
  return context;
};

