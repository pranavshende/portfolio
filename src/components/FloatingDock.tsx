import React, { useState } from 'react';
import { Home, FolderGit2, User, Bot } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMode } from '../contexts/ModeContext';
import AskAIChatbot from './AskAIChatbot';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  type: 'scroll' | 'action';
}

const FloatingDock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useMode();
  const isDark = mode === 'developer';
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigation = (path: string, hash?: string) => {
    setIsChatOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const dockItems: DockItem[] = [
    {
      icon: <Home className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'Home',
      action: () => handleNavigation('/', 'home'),
      type: 'scroll',
    },
    {
      icon: <User className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'About',
      action: () => handleNavigation('/about'),
      type: 'scroll',
    },
    {
      icon: <Bot className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'Ask AI',
      action: () => setIsChatOpen(prev => !prev),
      type: 'action',
    },
    {
      icon: <FolderGit2 className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'Projects',
      action: () => handleNavigation('/projects'),
      type: 'scroll',
    },
  ];

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-md px-2 pb-safe">
        <div className="mx-auto flex justify-evenly items-center backdrop-blur-xl rounded-[18px] border-2 border-[#22c55e] px-1 sm:px-2.5 py-1 sm:py-1.5 transition-all duration-300 bg-zinc-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-glow-pulse">
          {dockItems.map((item) => {
            const isActive = (item.label === 'Home' && location.pathname === '/' && !isChatOpen) || 
                             (item.label === 'About' && location.pathname === '/about' && !isChatOpen) ||
                             (item.label === 'Projects' && location.pathname === '/projects' && !isChatOpen) ||
                             (item.label === 'Ask AI' && isChatOpen);
            
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`relative flex items-center justify-center rounded-full transition-all duration-250 h-7 sm:h-8 px-2 sm:px-3 active:scale-95 group ${
                  isActive 
                    ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.65)]' 
                    : 'text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.65)]'
                }`}
                aria-label={item.label}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                  <span className={`transition-all duration-250 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.65)]' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-colors duration-250">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <AskAIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingDock;
