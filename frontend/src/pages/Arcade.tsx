import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { 
  Gamepad2, Hexagon, Activity, TrainFront, Bird, Folder, Music, Globe, 
  Users, UtensilsCrossed, Circle, Square, ChevronLeft, Smartphone, Tablet, 
  Monitor, ExternalLink
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   RETRO OS CONSOLE SIMULATOR (Black & White Paper Theme)
───────────────────────────────────────────────────────────────────────────── */
type AppType = 
  | 'home' 
  | 'mario' 
  | 'hextris' 
  | 'dino' 
  | 'tetris' 
  | 'subway' 
  | 'flappy' 
  | 'spotify' 
  | 'jansampark' 
  | 'pashurakshak' 
  | 'solar' 
  | 'agriscore' 
  | 'dsa' 
  | 'attrition' 
  | 'tastifyy';

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

const RetroOSConsole: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('tablet');
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    { 
      id: 'mario', 
      name: 'Mario', 
      icon: <PaperAppIcon Icon={Gamepad2} alt="Super Mario" /> 
    },
    { 
      id: 'hextris', 
      name: 'Hextris', 
      icon: <PaperAppIcon Icon={Hexagon} alt="Hextris" /> 
    },
    { 
      id: 'dino', 
      name: 'Dino Run', 
      icon: <PaperAppIcon Icon={Activity} alt="Dino Run" /> 
    },
    { 
      id: 'tetris', 
      name: 'Tetris', 
      icon: <PaperAppIcon Icon={TetrisIcon} alt="Tetris" /> 
    },
    { 
      id: 'subway', 
      name: 'Surfers', 
      icon: <PaperAppIcon Icon={TrainFront} alt="Subway Surfers" /> 
    },
    { 
      id: 'flappy', 
      name: 'Flappy', 
      icon: <PaperAppIcon Icon={Bird} alt="Flappy Bird" /> 
    },
    { 
      id: 'projects_folder', 
      name: 'Projects', 
      isFolder: true, 
      icon: (
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0">
          <Folder size={24} className="text-stone-900 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8b2323] text-white text-[9px] font-mono font-bold flex items-center justify-center">
            7
          </span>
        </div>
      ),
      folderApps: [
        { id: 'jansampark', name: 'JanSampark', icon: <PaperAppIcon Icon={Globe} alt="JanSampark" />, appId: 'jansampark' },
        { id: 'attrition', name: 'Attrition AI', icon: <PaperAppIcon Icon={Users} alt="Attrition AI" />, appId: 'attrition' },
        { id: 'tastifyy', name: 'Tastifyy', icon: <PaperAppIcon Icon={UtensilsCrossed} alt="Tastifyy" />, appId: 'tastifyy' },
        { id: 'pashurakshak', name: 'PashuRakshak', icon: <PaperAppIcon Icon={Activity} alt="PashuRakshak" />, appId: 'pashurakshak' },
        { id: 'solar', name: 'Solar Analytics', icon: <PaperAppIcon Icon={Hexagon} alt="Solar Analytics" />, appId: 'solar' },
        { id: 'agriscore', name: 'AgriScore', icon: <PaperAppIcon Icon={Circle} alt="AgriScore" />, appId: 'agriscore' },
        { id: 'dsa', name: 'DSA', icon: <PaperAppIcon Icon={Square} alt="DSA" />, appId: 'dsa' }
      ]
    },
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: <PaperAppIcon Icon={Music} alt="Spotify" /> 
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mb-16">
      {/* View Mode Switcher (Clean, standalone pill control) */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-2 border-stone-900 rounded-full p-1 shadow-[2px_2px_0px_#1c1917]">
          {(['mobile', 'tablet', 'desktop'] as const).map((type) => {
            const icons = {
              mobile: Smartphone,
              tablet: Tablet,
              desktop: Monitor,
            };
            const Icon = icons[type];
            const isActive = deviceType === type;

            return (
              <button
                key={type}
                onClick={() => setDeviceType(type)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                <Icon size={14} />
                <span className="capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Device Frame (Standalone, no surrounding outer card box) */}
      <motion.div
        layout
        className={`relative w-full mx-auto bg-stone-950 border-[8px] sm:border-[12px] border-stone-900 shadow-2xl overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] transition-all duration-500 ${
          deviceType === 'mobile'
            ? 'max-w-[340px] aspect-[9/16]'
            : deviceType === 'tablet'
              ? 'max-w-[720px] aspect-[16/11]'
              : 'max-w-full aspect-[16/10]'
        }`}
      >
        {/* Screen Content - Black & White Paper Aesthetic */}
        <div className="relative w-full h-full bg-[#faf7f0] overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {/* HOME SCREEN (Black and White Theme Like Paper) */}
            {activeApp === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col bg-[#faf7f0] bg-[radial-gradient(#e5dfd3_1px,transparent_1px)] [background-size:16px_16px] text-stone-900 select-none overflow-hidden"
              >
                {/* Subtle paper grain & ink texture */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"
                  style={{ backgroundImage: `url('/photo/sumie_website_bg.webp')` }}
                />

                {/* Decorative Japanese Ink Paper Accents */}
                <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
                  <div className="px-1.5 py-0.5 rounded-xs border border-[#8b2323] text-[#8b2323] text-[9px] font-serif font-bold tracking-widest bg-[#8b2323]/5">
                    遊戯
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium tracking-wider">PS-OS v2.6</span>
                </div>

                <div className="relative z-10 flex flex-col h-full pt-8 sm:pt-10 px-4 sm:px-8 pb-14">
                  {/* Digital Clock in Ink Black Serif Typography */}
                  <div className="w-full flex flex-col items-center justify-center mb-6 sm:mb-8 pointer-events-none">
                    <span className="text-stone-900 text-4xl sm:text-6xl font-light tracking-tight font-sans">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-stone-600 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase mt-1">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* App Grid - 4x2 Clean Grid */}
                  <div className="grid grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-5 mx-auto max-w-sm mt-auto mb-4">
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
                        <span className="text-stone-900 text-[11px] font-mono font-bold text-center truncate w-full px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folder Popup Overlay (Paper Theme) */}
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
                            <span>{apps.find((a) => a.id === openFolder)?.name}</span>
                          </h4>
                          <button 
                            onClick={() => setOpenFolder(null)}
                            className="p-1 rounded-full text-stone-500 hover:text-stone-900 text-xs cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {apps.find((a) => a.id === openFolder)?.folderApps?.map((fApp) => (
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

            {/* MARIO */}
            {activeApp === 'mario' && (
              <motion.div key="mario" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://supermariobrosonline.github.io/"
                  className="w-full h-full border-none bg-black"
                  title="Super Mario"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* HEXTRIS */}
            {activeApp === 'hextris' && (
              <motion.div key="hextris" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://hextris.github.io/hextris/"
                  className="w-full h-full border-none bg-black"
                  title="Hextris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* DINO RUN */}
            {activeApp === 'dino' && (
              <motion.div key="dino" className="absolute inset-0 pb-10 bg-white">
                <iframe
                  src="https://wayou.github.io/t-rex-runner/"
                  className="w-full h-full border-none bg-white"
                  title="T-Rex Runner"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* TETRIS */}
            {activeApp === 'tetris' && (
              <motion.div key="tetris" className="absolute inset-0 pb-10 bg-zinc-900">
                <iframe
                  src="https://chvin.github.io/react-tetris/"
                  className="w-full h-full border-none bg-zinc-900"
                  title="Tetris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* SUBWAY SURFERS */}
            {activeApp === 'subway' && (
              <motion.div key="subway" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://subwaysurfers76.github.io/"
                  className="w-full h-full border-none"
                  title="Subway Surfers"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* FLAPPY BIRD */}
            {activeApp === 'flappy' && (
              <motion.div key="flappy" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://flappybird.io/"
                  className="w-full h-full border-none"
                  title="Flappy Bird"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* JANSAMPARK PROJECT PREVIEW */}
            {activeApp === 'jansampark' && (
              <motion.div key="jansampark" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://projectjansampark.pranavshende.online/"
                  className="w-full h-full border-none bg-white"
                  title="JanSampark"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* PASHURAKSHAK PROJECT PREVIEW */}
            {activeApp === 'pashurakshak' && (
              <motion.div key="pashurakshak" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://projectpashurakshak.pranavshende.online/"
                  className="w-full h-full border-none bg-white"
                  title="PashuRakshak"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* SOLAR ANALYTICS PREVIEW */}
            {activeApp === 'solar' && (
              <motion.div key="solar" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://projectsolarsalesanalysis.pranavshende.online/"
                  className="w-full h-full border-none bg-white"
                  title="Solar Analysis"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* TASTIFYY LIVE APP */}
            {activeApp === 'tastifyy' && (
              <motion.div key="tastifyy" className="absolute inset-0 pb-10 bg-white">
                <iframe
                  src="https://www.tastifyy.in/"
                  className="w-full h-full border-none bg-white"
                  title="Tastifyy Delivery Platform"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* ATTRITION AI PREVIEW */}
            {activeApp === 'attrition' && (
              <motion.div key="attrition" className="absolute inset-0 pb-10 bg-[#0c1815] flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-3xl shadow-lg">
                  📊
                </div>
                <h3 className="font-bold text-xl mb-1 text-white">Employee Attrition Intelligence System</h3>
                <p className="text-emerald-300 text-xs font-mono mb-2">React 19 • Flask • Google Gemini 2.5 Flash</p>
                <p className="text-zinc-300 text-xs max-w-sm mb-5 leading-relaxed">
                  Predictive flight-risk modeling, 11 interactive Chart.js visualizations, and an AttritionAI copilot grounded in real workforce cohorts.
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/pranavshende/EmployeeAttritionSystem"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveApp('home')}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Back to Desktop
                  </button>
                </div>
              </motion.div>
            )}

            {/* SPOTIFY */}
            {activeApp === 'spotify' && (
              <motion.div key="spotify" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                  className="w-full h-full border-none"
                  title="Spotify"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* AGRISCORE & DSA */}
            {(activeApp === 'agriscore' || activeApp === 'dsa') && (
              <motion.div key={activeApp} className="absolute inset-0 pb-10 bg-zinc-900 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="text-4xl mb-3">🌱</span>
                <h3 className="font-bold text-xl mb-1">Source Code Available</h3>
                <p className="text-zinc-400 text-xs max-w-xs mb-4">
                  Check out the full repository and implementation details directly on GitHub!
                </p>
                <button
                  onClick={() => setActiveApp('home')}
                  className="px-5 py-1.5 bg-white text-zinc-900 rounded-full text-xs font-bold cursor-pointer"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Android Bottom Navigation Bar (Ink Paper Style) */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-[#f4eee3] flex items-center justify-around z-50 border-t-2 border-stone-900/15 px-6">
            <button
              onClick={() => setActiveApp('home')}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Back"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setActiveApp('home')}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Home"
            >
              <Circle size={14} className="fill-transparent stroke-[2.5]" />
            </button>
            <button
              onClick={() => setOpenFolder(null)}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Apps"
            >
              <Square size={13} className="fill-transparent stroke-[2.5]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ARCADE PAGE
───────────────────────────────────────────────────────────────────────────── */
export const Arcade: React.FC = () => {
  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HEADER ROW
      ────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col sm:flex-row items-start justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug sm:leading-snug">
            Welcome to my arcade! This is where I design and code little games just for fun.
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
            Step right up! Everything here is interactive and made with code & love.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          THE RETRO OS CONSOLE (No outer box, B&W paper theme inside)
      ────────────────────────────────────────────────────────────── */}
      <RetroOSConsole />
    </DoodleLayout>
  );
};

export default Arcade;
