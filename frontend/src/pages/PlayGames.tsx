import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Circle, Square,
  Grid, Hexagon, Activity, Gamepad2, TrainFront, Bird, Globe, Music, Folder,
  Smartphone, Tablet, Monitor, ExternalLink
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FloatingHeader from '../components/FloatingHeader';
import { PageSeo } from '@/components/PageSeo';

type AppType = 'home' | 'mario' | 'hextris' | 'dino' | 'tetris' | 'subway' | 'flappy' | 'spotify' | 'jansampark' | 'pashurakshak' | 'solar' | 'agriscore' | 'dsa';

// Custom Tetris Tetromino 4-block Icon
const TetrisIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="10" width="6" height="6" rx="1" />
    <rect x="9" y="10" width="6" height="6" rx="1" />
    <rect x="15" y="10" width="6" height="6" rx="1" />
    <rect x="9" y="4" width="6" height="6" rx="1" />
  </svg>
);

const PaperAppIcon = ({
  Icon,
  alt
}: { 
  Icon: any;
  alt: string;
}) => {
  return (
    <div 
      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0"
      title={alt}
    >
      <Icon size={24} className="text-stone-900 stroke-[1.8]" />
    </div>
  );
};

const PlayGames = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('tablet');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [openFolder, setOpenFolder] = useState<string | null>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('folder');
  });

  type AppItem = {
    id: string;
    name: string;
    icon: JSX.Element;
    isFolder?: boolean;
    folderApps?: {
      id: string;
      name: string;
      icon: JSX.Element;
      appId?: string;
      link?: string;
    }[];
  };

  const apps: AppItem[] = [
    { id: 'mario', name: 'Mario', icon: <PaperAppIcon Icon={Gamepad2} alt="Super Mario" /> },
    { id: 'hextris', name: 'Hextris', icon: <PaperAppIcon Icon={Hexagon} alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <PaperAppIcon Icon={Activity} alt="Dino Run" /> },
    { id: 'tetris', name: 'Tetris', icon: <PaperAppIcon Icon={TetrisIcon} alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <PaperAppIcon Icon={TrainFront} alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <PaperAppIcon Icon={Bird} alt="Flappy Bird" /> },
    { id: 'projects_folder', name: 'Projects', isFolder: true, 
      icon: (
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0">
          <Folder size={24} className="text-stone-900 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8b2323] text-white text-[9px] font-mono font-bold flex items-center justify-center">
            5
          </span>
        </div>
      ),
      folderApps: [
        { id: 'jansampark', name: 'JanSampark', icon: <PaperAppIcon Icon={Globe} alt="JanSampark" />, appId: 'jansampark' },
        { id: 'pashurakshak', name: 'PashuRakshak', icon: <PaperAppIcon Icon={Activity} alt="PashuRakshak" />, appId: 'pashurakshak' },
        { id: 'solar', name: 'Solar Analytics', icon: <PaperAppIcon Icon={Hexagon} alt="Solar Analytics" />, appId: 'solar' },
        { id: 'agriscore', name: 'AgriScore', icon: <PaperAppIcon Icon={Circle} alt="AgriScore" />, appId: 'agriscore' },
        { id: 'dsa', name: 'DSA', icon: <PaperAppIcon Icon={Square} alt="DSA" />, appId: 'dsa' }
      ]
    },
    { id: 'spotify', name: 'Spotify', icon: <PaperAppIcon Icon={Music} alt="Spotify" /> },
  ];

  return (
    <div className="h-[100dvh] sm:h-screen bg-zinc-50 dark:bg-black flex flex-col p-0 sm:p-6 md:p-8 font-sans overflow-hidden">
      <PageSeo
        title="Gaming Station & Interactive Retro Console | Pranav Shende"
        description="Play classic arcade titles including Mario, Hextris, Dino Runner, Tetris, Flappy Bird, and Subway Surfers directly in the browser."
        canonicalPath="/playgames"
        keywords={[
          'Web Games',
          'Retro Gaming Station',
          'Browser Arcade',
          'React Games',
          'Mario Web',
          'Tetris Online',
          'Pranav Shende'
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Interactive Gaming Station',
          'operatingSystem': 'Web Browser',
          'applicationCategory': 'GameApplication',
          'url': 'https://pranavshende.online/playgames',
          'author': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/'
          }
        }}
      />
      
      <div className="hidden lg:block">
        <FloatingHeader />
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex w-full justify-between items-center z-[60] mb-4 shrink-0 pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors bg-black/5 hover:bg-black/10 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 dark:border-white/10"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Portfolio</span>
        </Link>

        <div className="pointer-events-auto flex bg-black/5 dark:bg-black/40 backdrop-blur-md rounded-full p-1 border border-black/10 dark:border-white/10 relative">
          {(['mobile', 'tablet', 'desktop'] as const).map((type) => {
            const icons = {
              mobile: Smartphone,
              tablet: Tablet,
              desktop: Monitor
            };
            const Icon = icons[type];
            const isActive = deviceType === type;
            
            return (
              <button
                key={type}
                onClick={() => setDeviceType(type)}
                className={`relative p-2 rounded-full transition-colors z-10 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-device-mode"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-fuchsia-500/40 to-purple-500/30 rounded-full z-0 overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[200%]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
                        ease: "linear",
                        repeatDelay: 0.5 
                      }}
                    />
                  </motion.div>
                )}
                <Icon size={20} className="relative z-10 drop-shadow-sm" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Absolute Back Button */}
      <Link 
        to="/" 
        className="sm:hidden absolute top-6 left-6 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors z-[60] bg-black/10 dark:bg-black/40 backdrop-blur-xl p-3 rounded-full border border-black/10 dark:border-white/10 shadow-lg"
      >
        <ChevronLeft size={22} className="drop-shadow-sm" />
      </Link>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 relative">
        {/* Background ambient glow */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Device Frame */}
      <motion.div 
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={`relative w-full h-full sm:max-h-full bg-[#09090b] sm:border-[10px] sm:border-[#27272a] shadow-2xl overflow-hidden sm:shadow-purple-900/20 transition-all duration-500 ${
          deviceType === 'mobile' 
            ? 'sm:h-[812px] sm:w-auto sm:aspect-[375/812] sm:rounded-[3rem]' 
            : deviceType === 'tablet'
              ? 'sm:h-[820px] sm:w-auto sm:aspect-[1180/820] sm:rounded-[2rem]'
              : 'sm:w-full sm:h-auto sm:max-w-[1200px] sm:aspect-[16/9] sm:rounded-[1rem]'
        }`}
      >
        {/* Hardware Buttons */}
        {deviceType !== 'desktop' && (
          <>
            <div className="hidden sm:block absolute -left-[14px] top-32 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -left-[14px] top-48 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -right-[14px] top-40 w-1 h-16 bg-[#3f3f46] rounded-r-md" />
          </>
        )}

        {/* Screen Content */}
        <div className="relative w-full h-full bg-[#18181b] overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* HOME SCREEN */}
            {activeApp === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col bg-[#faf7f0] bg-[radial-gradient(#e5dfd3_1px,transparent_1px)] [background-size:16px_16px] text-stone-900 select-none overflow-hidden"
              >
                {/* Subtle paper grain & ink texture */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"
                  style={{ backgroundImage: `url('/photo/sumie_website_bg.webp')` }}
                />

                {/* Decorative Japanese Ink Paper Accents */}
                <div className="absolute top-4 right-5 flex items-center gap-2 pointer-events-none">
                  <div className="px-1.5 py-0.5 rounded-xs border border-[#8b2323] text-[#8b2323] text-[9px] font-serif font-bold tracking-widest bg-[#8b2323]/5">
                    遊戯
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium tracking-wider">PS-OS v2.6</span>
                </div>
                
                <div className="relative z-10 flex flex-col h-full pt-16 px-6 pb-20 sm:pb-16">
                  {/* Aesthetic Clock Widget in Ink Black */}
                  <div className="w-full flex flex-col items-center justify-center mb-10 mt-2 sm:mb-12 sm:mt-4 pointer-events-none">
                    <span className="text-stone-900 text-5xl sm:text-7xl font-light tracking-tight font-sans">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-stone-600 text-[11px] sm:text-sm font-mono font-bold tracking-widest uppercase mt-2">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Apps Grid */}
                  <div className={`grid gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 mx-auto mt-auto mb-6 sm:mb-10 w-full px-2 sm:px-0 ${
                    deviceType === 'desktop' 
                      ? 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 max-w-4xl' 
                      : 'grid-cols-4 max-w-sm'
                  }`}>
                    {apps.map((app) => (
                      <div 
                        key={app.id} 
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => {
                          if (app.isFolder) {
                            setOpenFolder(app.id);
                          } else {
                            setActiveApp(app.id as AppType);
                          }
                        }}
                      >
                        {app.icon}
                        <span className="text-stone-900 text-[11px] font-mono font-bold tracking-tight w-full text-center truncate px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folder Overlay (Paper Theme) */}
                <AnimatePresence>
                  {openFolder && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-stone-900/40 backdrop-blur-xs flex flex-col items-center justify-center p-6"
                      onClick={() => setOpenFolder(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-[300px] bg-[#faf6f0] rounded-3xl p-5 border-2 border-stone-900 shadow-[4px_4px_0px_#1c1917]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-300">
                          <h4 className="text-stone-900 font-bold text-sm tracking-wide font-mono flex items-center gap-1.5">
                            <Folder size={16} />
                            <span>{apps.find(a => a.id === openFolder)?.name}</span>
                          </h4>
                          <button 
                            onClick={() => setOpenFolder(null)}
                            className="p-1 rounded-full text-stone-500 hover:text-stone-900 text-xs cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {apps.find(a => a.id === openFolder)?.folderApps?.map((fApp) => (
                            <div 
                              key={fApp.id} 
                              onClick={() => {
                                if (fApp.appId) {
                                  setActiveApp(fApp.appId as AppType);
                                  setOpenFolder(null);
                                } else if (fApp.link) {
                                  window.open(fApp.link, '_blank');
                                }
                              }}
                              className="flex flex-col items-center gap-1 cursor-pointer group"
                            >
                              {fApp.icon}
                              <span className="text-stone-900 text-[10px] font-mono font-bold text-center truncate w-full">
                                {fApp.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}

            {/* COMING SOON SCREENS FOR UNDEPLOYED PROJECTS */}
            {(activeApp === 'agriscore') && (
              <motion.div 
                key={activeApp}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-10 bg-[#18181b] flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-20 h-20 bg-[#27272a] rounded-full flex items-center justify-center mb-6">
                  {activeApp === 'agriscore' && <Circle size={32} className="text-green-500" />}
                </div>
                <h3 className="text-[#ffffff] font-bold text-xl mb-2">
                  {activeApp === 'agriscore' && 'AgriScore'}
                </h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  This project is currently not deployed on a public URL. You can check out the source code on GitHub!
                </p>
                <button 
                  onClick={() => setActiveApp('home')}
                  className="px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-[#e4e4e7] transition-colors"
                >
                  Go Back
                </button>
              </motion.div>
            )}

            {/* ARCADE / GAME SCREENS */}
            {activeApp === 'jansampark' && (
              <motion.div 
                key="jansampark"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://projectjansampark.pranavshende.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://projectjansampark.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="JanSampark"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'pashurakshak' && (
              <motion.div 
                key="pashurakshak"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://projectpashurakshak.pranavshende.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://projectpashurakshak.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="PashuRakshak"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'solar' && (
              <motion.div 
                key="solar"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://projectsolarsalesanalysis.pranavshende.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://projectsolarsalesanalysis.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="Solar Analysis"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'dsa' && (
              <motion.div 
                key="dsa"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://dsa.pranavshende.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://dsa.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="DSA"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'mario' && (
              <motion.div 
                key="mario"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://supermariobrosonline.github.io/" 
                  className="w-full h-full border-none pointer-events-auto bg-black"
                  title="Super Mario"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'hextris' && (
              <motion.div 
                key="hextris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://hextris.github.io/hextris/" 
                  className="w-full h-full border-none pointer-events-auto bg-black"
                  title="Hextris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'dino' && (
              <motion.div 
                key="dino"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://wayou.github.io/t-rex-runner/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="T-Rex Runner"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'tetris' && (
              <motion.div 
                key="tetris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://chvin.github.io/react-tetris/" 
                  className="w-full h-full border-none pointer-events-auto bg-zinc-900"
                  title="Tetris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'subway' && (
              <motion.div 
                key="subway"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://subwaysurfers76.github.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Subway Surfers"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'flappy' && (
              <motion.div 
                key="flappy"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://flappybird.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Flappy Bird"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}



            {activeApp === 'spotify' && (
              <motion.div 
                key="spotify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Spotify"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-12 bg-black/90 backdrop-blur-xl flex items-center justify-around z-50 border-t border-white/10 pb-2 sm:pb-0 px-2 sm:px-0">
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Back"
          >
            <ChevronLeft size={24} className="sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Home"
          >
            <Circle size={18} className="fill-transparent stroke-2 sm:w-4 sm:h-4" />
          </button>

          <Link 
            to="/"
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Portfolio"
          >
            <Square size={16} className="fill-transparent stroke-2 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </motion.div>
      
      </div>
    </div>
  );
};

export default PlayGames;
