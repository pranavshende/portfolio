import React from 'react';
import { Home, Briefcase, FolderGit2, Code2, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMode } from '../contexts/ModeContext';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  type: 'scroll';
}

const FloatingDock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useMode();
  const isDark = mode === 'developer';

  const handleNavigation = (path: string, hash?: string) => {
    if (location.pathname !== path) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      icon: <Briefcase className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'Experience',
      action: () => handleNavigation('/', 'experience'),
      type: 'scroll',
    },
    {
      icon: <FolderGit2 className="w-3.5 h-3.5 sm:w-[16px] sm:h-[16px]" />,
      label: 'Projects',
      action: () => handleNavigation('/projects'),
      type: 'scroll',
    },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-md px-2 pb-safe">
      <div className={`mx-auto flex justify-evenly items-center backdrop-blur-xl rounded-full px-1.5 sm:px-3 py-1 sm:py-1.5 transition-all duration-300 ${
        isDark 
          ? 'bg-black border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
          : 'bg-white border border-gray-200 shadow-md'
      }`}>
        {dockItems.map((item) => {
          const isActive = (item.label === 'Home' && location.pathname === '/') || 
                           (item.label === 'About' && location.pathname === '/about') ||
                           (item.label === 'Projects' && location.pathname === '/projects');
          
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`relative flex items-center justify-center rounded-full transition-all duration-300 h-7 sm:h-8 px-2 sm:px-3 active:scale-95 group ${
                isActive 
                  ? (isDark 
                      ? 'text-[#EAF8FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.45)]' 
                      : 'text-blue-600') 
                  : (isDark 
                      ? 'text-zinc-400 hover:text-cyan-400' 
                      : 'text-gray-500 hover:text-blue-500')
              }`}
              aria-label={item.label}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <span className={`transition-all duration-300 ${isActive ? (isDark ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.45)]' : '') : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-colors duration-300`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingDock;
