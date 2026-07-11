import React, { useState } from 'react';
import { Home, Github, Linkedin, Mail, Briefcase, FolderGit2, Code2 } from 'lucide-react';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  type: 'scroll' | 'link' | 'email';
  href?: string;
}

const FloatingDock = () => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems: DockItem[] = [
    {
      icon: <Home className="w-[18px] h-[18px]" />,
      label: 'Home',
      action: () => scrollTo('home'),
      type: 'scroll',
    },
    {
      icon: <Briefcase className="w-[18px] h-[18px]" />,
      label: 'Experience',
      action: () => scrollTo('experience'),
      type: 'scroll',
    },
    {
      icon: <FolderGit2 className="w-[18px] h-[18px]" />,
      label: 'Projects',
      action: () => scrollTo('projects'),
      type: 'scroll',
    },
    {
      icon: <Code2 className="w-[18px] h-[18px]" />,
      label: 'Skills',
      action: () => scrollTo('skills'),
      type: 'scroll',
    },
    {
      icon: <Github className="w-[18px] h-[18px]" />,
      label: 'GitHub',
      action: () => window.open('https://github.com/PranavShende', '_blank'),
      type: 'link',
      href: 'https://github.com/PranavShende',
    },
    {
      icon: <Linkedin className="w-[18px] h-[18px]" />,
      label: 'LinkedIn',
      action: () => window.open('https://linkedin.com/in/pranavshende', '_blank'),
      type: 'link',
      href: 'https://linkedin.com/in/pranavshende',
    },
    {
      icon: <Mail className="w-[18px] h-[18px]" />,
      label: 'Email',
      action: () => { window.location.href = 'mailto:pranavshende97@gmail.com'; },
      type: 'email',
    },

  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      {/* Tooltip */}
      <div 
        className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700/50 rounded-full px-3 py-1 text-[11px] font-medium text-white whitespace-nowrap transition-all duration-150 ${tooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}
      >
        {tooltip}
      </div>

      {/* Separator between nav and social */}
      <div className="mx-auto h-14 flex items-center bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-full px-2.5 py-2 shadow-2xl gap-1">
        {dockItems.map((item, i) => (
          <React.Fragment key={item.label}>
            {/* Divider before social links */}
            {i === 4 && <div className="w-[1px] h-5 bg-zinc-800 mx-1" />}
            
            <button
              onClick={item.action}
              onMouseEnter={() => setTooltip(item.label)}
              onMouseLeave={() => setTooltip(null)}
              className="relative flex items-center justify-center rounded-full bg-zinc-900 transition-all duration-200 hover:bg-zinc-700 hover:scale-110 w-9 h-9 border border-zinc-800/50 text-zinc-400 hover:text-white active:scale-95"
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FloatingDock;
