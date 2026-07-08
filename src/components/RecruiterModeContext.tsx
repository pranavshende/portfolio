import { createContext, useContext, useState, ReactNode } from "react";

interface RecruiterModeContextType {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  translate: (devText: string, recruiterText: string) => string;
}

const RecruiterModeContext = createContext<RecruiterModeContextType>({
  recruiterMode: false,
  setRecruiterMode: () => {},
  translate: (devText) => devText,
});

export const RecruiterModeProvider = ({ children }: { children: ReactNode }) => {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const translate = (devText: string, recruiterText: string) =>
    recruiterMode ? recruiterText : devText;
  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, setRecruiterMode, translate }}>
      {children}
    </RecruiterModeContext.Provider>
  );
};

export const useRecruiterMode = () => useContext(RecruiterModeContext);
