import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "developer" | "recruiter";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("developer");

  useEffect(() => {
    // Add appropriate class to body for global CSS targeting
    if (mode === "developer") {
      document.body.classList.add("developer-mode");
      document.body.classList.remove("recruiter-mode");
    } else {
      document.body.classList.add("recruiter-mode");
      document.body.classList.remove("developer-mode");
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "developer" ? "recruiter" : "developer"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
