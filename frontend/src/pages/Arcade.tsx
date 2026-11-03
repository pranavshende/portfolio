import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { triggerConfetti } from '@/lib/confetti';
import { 
  Sparkles, RefreshCw, Trophy, Gamepad2, Gift, 
  ChevronLeft, Circle, Square, Smartphone, Tablet, Monitor,
  Activity, Hexagon, TrainFront, Bird, Folder, Music, Globe, ExternalLink, UtensilsCrossed, Users
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   1. RETRO OS CONSOLE SIMULATOR (Direct match to uploaded image)
───────────────────────────────────────────────────────────────────────────── */
type AppType = 'home' | 'mario' | 'hextris' | 'dino' | 'tetris' | 'subway' | 'flappy' | 'spotify' | 'jansampark' | 'pashurakshak' | 'solar' | 'agriscore' | 'dsa' | 'attrition' | 'tastifyy';

const SquircleIcon = ({ 
  imgUrl, 
  FallbackIcon, 
  gradient,
  alt
}: { 
  imgUrl: string, 
  FallbackIcon: any, 
  gradient: string,
  alt: string
}) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md overflow-hidden flex items-center justify-center bg-gradient-to-br ${gradient} border-2 border-white/20 group-hover:scale-95 transition-transform duration-200`}>
      {!error ? (
        <img 
          src={imgUrl} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setError(true)}
        />
      ) : (
        <FallbackIcon size={26} className="text-white drop-shadow-md opacity-90" strokeWidth={1.5} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
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
    { id: 'mario', name: 'Mario', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Super_Mario_Bros._box.png/220px-Super_Mario_Bros._box.png" FallbackIcon={Gamepad2} gradient="from-red-500 to-blue-600" alt="Super Mario" /> },
    { id: 'hextris', name: 'Hextris', icon: <SquircleIcon imgUrl="https://raw.githubusercontent.com/hextris/hextris/master/favicon.ico" FallbackIcon={Hexagon} gradient="from-slate-700 to-slate-900" alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-zinc-400 to-zinc-600" alt="Dino" /> },
    { id: 'tetris', name: 'Tetris', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Gamepad2} gradient="from-violet-500 to-fuchsia-600" alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={TrainFront} gradient="from-amber-400 to-yellow-600" alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" FallbackIcon={Bird} gradient="from-sky-300 to-blue-500" alt="Flappy Bird" /> },
    { id: 'projects_folder', name: 'Projects', isFolder: true, folderApps: [
      { id: 'jansampark', name: 'JanSampark', icon: <SquircleIcon imgUrl="https://projectjansampark.pranavshende.online/favicon.ico" FallbackIcon={Globe} gradient="from-blue-500 to-indigo-600" alt="JanSampark" />, appId: 'jansampark' },
      { id: 'attrition', name: 'Attrition AI', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Users} gradient="from-emerald-500 to-teal-700" alt="Attrition AI" />, appId: 'attrition' },
      { id: 'tastifyy', name: 'Tastifyy', icon: <SquircleIcon imgUrl="https://raw.githubusercontent.com/pranavshende/tastifyy/master/website/public/android-icon.png" FallbackIcon={UtensilsCrossed} gradient="from-orange-500 to-amber-600" alt="Tastifyy" />, appId: 'tastifyy' },
      { id: 'pashurakshak', name: 'PashuRakshak', icon: <SquircleIcon imgUrl="https://projectpashurakshak.pranavshende.online/favicon.ico" FallbackIcon={Activity} gradient="from-emerald-400 to-teal-600" alt="PashuRakshak" />, appId: 'pashurakshak' },
      { id: 'solar', name: 'Solar Analytics', icon: <SquircleIcon imgUrl="https://projectsolarsalesanalysis.pranavshende.online/favicon.ico" FallbackIcon={Hexagon} gradient="from-amber-400 to-orange-600" alt="Solar Analytics" />, appId: 'solar' },
      { id: 'agriscore', name: 'AgriScore', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Circle} gradient="from-green-400 to-emerald-600" alt="AgriScore" />, appId: 'agriscore' },
      { id: 'dsa', name: 'DSA', icon: <SquircleIcon imgUrl="https://dsa.pranavshende.online/favicon.ico" FallbackIcon={Square} gradient="from-indigo-400 to-purple-600" alt="DSA" />, appId: 'dsa' }
    ], icon: (
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm shadow-md flex items-center justify-center border-2 border-white/40 group-hover:scale-95 transition-transform duration-200">
        <Folder size={22} className="text-white drop-shadow-md" fill="currentColor" opacity={0.85} />
      </div>
    )},
    { id: 'spotify', name: 'Spotify', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" FallbackIcon={Music} gradient="from-[#1ED760] to-[#1DB954]" alt="Spotify" /> },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-3xl p-4 sm:p-6 shadow-sm mb-16">
      {/* Device Switcher Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-zinc-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕹️</span>
          <div>
            <h3 className="font-bold text-lg text-zinc-900 leading-none">
              Interactive OS Arcade Console
            </h3>
            <span className="text-xs text-zinc-500 font-medium">
              Play real games & launch interactive project iframes
            </span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-white border-2 border-zinc-900 rounded-full p-1 shadow-2xs">
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
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#fef08a] text-zinc-900 border border-zinc-900 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                <Icon size={15} />
                <span className="capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Device Frame */}
      <motion.div
        layout
        className={`relative w-full bg-[#09090b] border-[8px] sm:border-[12px] border-[#27272a] shadow-2xl overflow-hidden rounded-[2rem] transition-all duration-500 ${
          deviceType === 'mobile'
            ? 'max-w-[340px] aspect-[9/16]'
            : deviceType === 'tablet'
              ? 'max-w-[720px] aspect-[16/11]'
              : 'max-w-full aspect-[16/10]'
        }`}
      >
        {/* Screen Content */}
        <div className="relative w-full h-full bg-[#18181b] overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {/* HOME SCREEN */}
            {activeApp === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full pt-10 px-4 sm:px-8 pb-14">
                  {/* Digital Clock */}
                  <div className="w-full flex flex-col items-center justify-center mb-6 sm:mb-8 pointer-events-none drop-shadow-lg">
                    <span className="text-white text-4xl sm:text-6xl font-light tracking-tight font-sans">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase mt-1">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-x-3 gap-y-5 mx-auto max-w-sm mt-auto mb-4">
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                        onClick={() => {
                          if (app.isFolder) {
                            setOpenFolder(app.id);
                          } else {
                            setActiveApp(app.id as AppType);
                          }
                        }}
                      >
                        {app.icon}
                        <span className="text-white text-[11px] font-bold drop-shadow-md text-center truncate w-full px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folder Popup Overlay */}
                <AnimatePresence>
                  {openFolder && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6"
                      onClick={() => setOpenFolder(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-[280px] bg-white/20 backdrop-blur-xl rounded-[28px] p-5 border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h4 className="text-white font-bold text-center mb-4 text-sm tracking-wide">
                          {apps.find((a) => a.id === openFolder)?.name}
                        </h4>
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
                              <span className="text-white text-[10px] font-bold drop-shadow-md text-center truncate w-full">
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
              <motion.div key="mario" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="hextris" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="dino" className="absolute inset-0 pb-12 bg-white">
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
              <motion.div key="tetris" className="absolute inset-0 pb-12 bg-zinc-900">
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
              <motion.div key="subway" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="flappy" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="jansampark" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="pashurakshak" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="solar" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key="tastifyy" className="absolute inset-0 pb-12 bg-white">
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
              <motion.div key="attrition" className="absolute inset-0 pb-12 bg-[#0c1815] flex flex-col items-center justify-center p-6 text-center text-white">
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
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Back to Desktop
                  </button>
                </div>
              </motion.div>
            )}

            {/* SPOTIFY */}
            {activeApp === 'spotify' && (
              <motion.div key="spotify" className="absolute inset-0 pb-12 bg-black">
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
              <motion.div key={activeApp} className="absolute inset-0 pb-12 bg-zinc-900 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="text-4xl mb-3">🌱</span>
                <h3 className="font-bold text-xl mb-1">Source Code Available</h3>
                <p className="text-zinc-400 text-xs max-w-xs mb-4">
                  Check out the full repository and implementation details directly on GitHub!
                </p>
                <button
                  onClick={() => setActiveApp('home')}
                  className="px-5 py-1.5 bg-white text-zinc-900 rounded-full text-xs font-bold"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Android Bottom Navigation Bar */}
          <div className="absolute bottom-0 inset-x-0 h-11 bg-black/95 backdrop-blur-md flex items-center justify-around z-50 border-t border-white/10 px-6">
            <button
              onClick={() => setActiveApp('home')}
              className="text-white/70 hover:text-white p-2"
              title="Back"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveApp('home')}
              className="text-white/70 hover:text-white p-2"
              title="Home"
            >
              <Circle size={15} className="fill-transparent stroke-2" />
            </button>
            <button
              onClick={() => setOpenFolder(null)}
              className="text-white/70 hover:text-white p-2"
              title="Apps"
            >
              <Square size={14} className="fill-transparent stroke-2" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. CLAW MACHINE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
interface PrizeItem {
  id: string;
  name: string;
  emoji: string;
  x: number;
}

const INITIAL_PRIZES: PrizeItem[] = [
  { id: 'cap', name: 'Vintage Cap', emoji: '🧢', x: 20 },
  { id: 'coffee', name: 'Fresh Latte', emoji: '☕', x: 35 },
  { id: 'gamepad', name: 'Retro Controller', emoji: '🎮', x: 50 },
  { id: 'burger', name: 'Cheeseburger', emoji: '🍔', x: 65 },
  { id: 'apple', name: 'Lucky Apple', emoji: '🍎', x: 80 },
  { id: 'teddy', name: 'Plushie Teddy', emoji: '🧸', x: 42 },
  { id: 'camera', name: 'Lofi Camera', emoji: '📷', x: 58 },
  { id: 'sparkles', name: 'Magic Star', emoji: '⭐', x: 28 },
];

const ClawMachine: React.FC = () => {
  const [clawX, setClawX] = useState<number>(50);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [clawY, setClawY] = useState<number>(10);
  const [grabbedPrize, setGrabbedPrize] = useState<PrizeItem | null>(null);
  const [wonPrizes, setWonPrizes] = useState<PrizeItem[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('Aim with buttons or A/D keys!');

  const moveLeft = () => {
    if (isDropping) return;
    setClawX((prev) => Math.max(15, prev - 8));
  };

  const moveRight = () => {
    if (isDropping) return;
    setClawX((prev) => Math.min(85, prev + 8));
  };

  const dropClaw = () => {
    if (isDropping) return;
    setIsDropping(true);
    setStatusMessage('Dropping claw...');
    setClawY(62);

    setTimeout(() => {
      const target = INITIAL_PRIZES.find((p) => Math.abs(p.x - clawX) <= 12);
      if (target && Math.random() > 0.15) {
        setGrabbedPrize(target);
        setStatusMessage(`Grabbed the ${target.name}! Raising...`);
      } else {
        setStatusMessage('Missed! Raising claw...');
      }

      setClawY(10);

      setTimeout(() => {
        setClawX(15);

        setTimeout(() => {
          if (target) {
            setWonPrizes((prev) => [target, ...prev]);
            setStatusMessage(`🎉 You caught the ${target.name}!`);
            triggerConfetti(0.3, 0.5);
          } else {
            setStatusMessage('Empty claw! Try again.');
          }
          setGrabbedPrize(null);
          setIsDropping(false);
        }, 800);
      }, 900);
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        moveLeft();
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        moveRight();
      } else if (e.key === ' ' && !isDropping) {
        e.preventDefault();
        dropClaw();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropping, clawX]);

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      <div className="w-full bg-[#fef08a] border-2 border-zinc-900 rounded-xl py-1.5 px-4 mb-3 text-center shadow-xs">
        <span className="font-extrabold text-base tracking-wide text-zinc-900">
          Slot Machine
        </span>
      </div>

      <div className="relative w-full h-64 bg-white border-2 border-zinc-900 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-2">
        <div className="absolute top-0 inset-x-0 h-3 bg-zinc-200 border-b border-zinc-400" />

        <div className="absolute bottom-0 left-1 w-12 h-14 bg-zinc-100 border-2 border-dashed border-zinc-400 rounded-t-lg flex flex-col items-center justify-center">
          <span className="text-[9px] font-mono font-bold text-zinc-500">CHUTE</span>
          <span className="text-xs">⬇️</span>
        </div>

        <div
          className="absolute z-20 transition-all duration-700 ease-out flex flex-col items-center"
          style={{
            left: `${clawX}%`,
            top: `${clawY}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="w-[3px] h-12 bg-zinc-700 -mt-12" />
          <div className="w-6 h-4 bg-zinc-700 border border-zinc-900 rounded-t-sm" />
          <div className="flex justify-between w-8 -mt-0.5">
            <div className="w-1.5 h-4 bg-zinc-800 rounded-bl-full rotate-12" />
            <div className="w-1.5 h-4 bg-zinc-800 rounded-br-full -rotate-12" />
          </div>

          {grabbedPrize && (
            <div className="text-xl -mt-1 animate-bounce">
              {grabbedPrize.emoji}
            </div>
          )}
        </div>

        <div className="relative z-10 w-full h-16 flex items-end justify-around px-8 mt-auto">
          {INITIAL_PRIZES.map((prize) => (
            <span
              key={prize.id}
              className="text-2xl select-none hover:scale-125 transition-transform cursor-pointer drop-shadow-xs"
              title={prize.name}
            >
              {prize.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full mt-3 bg-zinc-100 border-2 border-zinc-900 rounded-xl p-3 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={moveLeft}
              disabled={isDropping}
              className="w-9 h-9 bg-white border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs active:translate-y-0.5 disabled:opacity-50"
            >
              A ◀
            </button>
            <button
              onClick={moveRight}
              disabled={isDropping}
              className="w-9 h-9 bg-white border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs active:translate-y-0.5 disabled:opacity-50"
            >
              ▶ D
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-zinc-900 shadow-xs" />
            <div className="w-1.5 h-3 bg-zinc-600 rounded-full" />
          </div>

          <button
            onClick={dropClaw}
            disabled={isDropping}
            className="px-4 py-2 bg-[#fef08a] border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs hover:bg-[#fde047] active:translate-y-0.5 disabled:opacity-50"
          >
            space Release
          </button>
        </div>

        <p className="text-xs text-zinc-600 text-center truncate font-semibold">
          {statusMessage}
        </p>
      </div>

      {wonPrizes.length > 0 && (
        <div className="w-full mt-2.5 pt-2 border-t border-dashed border-zinc-300 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Won:</span>
          {wonPrizes.map((p, i) => (
            <span key={i} className="text-base" title={p.name}>
              {p.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   3. GUMBALL MACHINE COMPONENT ("Drag to Twist")
───────────────────────────────────────────────────────────────────────────── */
interface FortunePrize {
  title: string;
  fortune: string;
  icon: string;
  color: string;
}

const FORTUNES: FortunePrize[] = [
  { title: 'The Architect', fortune: 'Your next deployment will pass all tests on the first try!', icon: '🏛️', color: '#38bdf8' },
  { title: 'Lucky Bug-Hunter', fortune: 'You will squash a tricky edge case in less than 5 minutes today.', icon: '🐞', color: '#f43f5e' },
  { title: 'Golden Spark', fortune: 'Creativity flows when you step away from the keyboard and take a walk.', icon: '✨', color: '#facc15' },
  { title: 'Full-Stack Sage', fortune: 'Clean architecture today saves 100 hours of refactoring tomorrow.', icon: '🧙‍♂️', color: '#a855f7' },
  { title: 'Infinite Coffee', fortune: 'May your APIs be snappy and your database indexes always hot.', icon: '☕', color: '#fb923c' },
];

const GumballMachine: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isTwisting, setIsTwisting] = useState<boolean>(false);
  const [dispensedBall, setDispensedBall] = useState<FortunePrize | null>(null);
  const [modalFortune, setModalFortune] = useState<FortunePrize | null>(null);

  const twistCrank = () => {
    if (isTwisting) return;
    setIsTwisting(true);
    setRotation((prev) => prev + 360);

    setTimeout(() => {
      const prize = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setDispensedBall(prize);
      setIsTwisting(false);
      triggerConfetti(0.5, 0.6);
    }, 700);
  };

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      <div className="relative w-44 h-44 rounded-full bg-white/90 border-2 border-zinc-900 shadow-inner flex items-center justify-center overflow-hidden p-2">
        <div className="absolute top-2 left-4 w-12 h-6 bg-white rounded-full opacity-60 rotate-[-25deg] pointer-events-none" />

        <div className="grid grid-cols-4 gap-1.5 p-3">
          {['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#84cc16', '#6366f1'].map((c, i) => (
            <motion.div
              key={i}
              animate={isTwisting ? { y: [0, -6, 2, 0], x: [0, 3, -3, 0] } : {}}
              transition={{ duration: 0.3, repeat: isTwisting ? 2 : 0 }}
              className="w-6 h-6 rounded-full border border-zinc-800 shadow-xs relative overflow-hidden"
              style={{ backgroundColor: c }}
            >
              <div className="absolute top-0.5 left-1 w-2 h-1 bg-white rounded-full opacity-70" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative w-40 bg-zinc-200 border-2 border-zinc-900 rounded-b-2xl p-3 flex flex-col items-center -mt-3 pt-4 shadow-sm">
        <button
          onClick={twistCrank}
          disabled={isTwisting}
          className="group relative flex flex-col items-center focus:outline-none"
          title="Click to turn crank!"
        >
          <div className="px-2.5 py-0.5 rounded-full bg-[#fef08a] border border-zinc-900 text-[10px] font-bold text-zinc-900 mb-1 shadow-2xs group-hover:bg-[#fde047]">
            Drag to Twist
          </div>

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-2 bg-zinc-800 rounded-full" />
            <div className="w-2 h-8 bg-zinc-800 rounded-full absolute" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-zinc-900 z-10" />
          </motion.div>
        </button>

        <div className="w-14 h-12 bg-zinc-800 border-2 border-zinc-900 rounded-t-lg mt-3 flex items-center justify-center relative overflow-hidden">
          {dispensedBall ? (
            <motion.div
              initial={{ y: -20, scale: 0.5 }}
              animate={{ y: 0, scale: 1 }}
              onClick={() => setModalFortune(dispensedBall)}
              className="cursor-pointer flex flex-col items-center animate-pulse"
              title="Click capsule to open!"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs"
                style={{ backgroundColor: dispensedBall.color }}
              >
                {dispensedBall.icon}
              </div>
              <span className="text-[8px] text-white font-mono font-bold">OPEN ME</span>
            </motion.div>
          ) : (
            <span className="text-[9px] text-zinc-400 font-mono">PUSH</span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modalFortune && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-zinc-900 p-6 text-center shadow-2xl space-y-4"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl border-2 border-zinc-900 shadow-md"
                style={{ backgroundColor: modalFortune.color }}
              >
                {modalFortune.icon}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Capsule Unlocked!
                </span>
                <h3 className="text-xl font-bold text-zinc-900">
                  {modalFortune.title}
                </h3>
                <p className="text-base text-zinc-600 font-semibold leading-relaxed pt-2">
                  "{modalFortune.fortune}"
                </p>
              </div>

              <button
                onClick={() => setModalFortune(null)}
                className="w-full py-2.5 bg-[#fef08a] border-2 border-zinc-900 rounded-xl font-bold text-base text-zinc-900 hover:bg-[#fde047] shadow-xs"
              >
                Awesome! ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   4. SCRATCH TO WIN COMPONENT ("find 3 Smiles")
───────────────────────────────────────────────────────────────────────────── */
interface ScratchCell {
  id: number;
  icon: string;
  isSmile: boolean;
  scratched: boolean;
}

const ScratchToWin: React.FC = () => {
  const [cells, setCells] = useState<ScratchCell[]>([]);
  const [smilesFound, setSmilesFound] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const initGame = () => {
    const totalCells = 12;
    const smileCount = 3;
    const icons = ['⭐', '💎', '🍀', '🚀', '🍕', '🎉', '⚡', '🎈'];

    const newCells: ScratchCell[] = [];
    const smileIndices = new Set<number>();
    while (smileIndices.size < smileCount) {
      smileIndices.add(Math.floor(Math.random() * totalCells));
    }

    for (let i = 0; i < totalCells; i++) {
      const isSmile = smileIndices.has(i);
      newCells.push({
        id: i,
        icon: isSmile ? '😊' : icons[Math.floor(Math.random() * icons.length)],
        isSmile,
        scratched: false,
      });
    }

    setCells(newCells);
    setSmilesFound(0);
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const scratchCell = (id: number) => {
    setCells((prev) =>
      prev.map((cell) => {
        if (cell.id === id && !cell.scratched) {
          const updated = { ...cell, scratched: true };
          if (updated.isSmile) {
            const nextSmiles = smilesFound + 1;
            setSmilesFound(nextSmiles);
            if (nextSmiles >= 3) {
              setHasWon(true);
              triggerConfetti(0.7, 0.5);
            }
          }
          return updated;
        }
        return cell;
      })
    );
  };

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      <div className="w-full text-center pb-2 border-b-2 border-dashed border-zinc-300">
        <h3 className="font-bold text-lg text-zinc-900 tracking-tight">
          Scratch to Win!
        </h3>
        <p className="text-sm text-zinc-500 font-semibold">
          find 3 Smiles 😊 (Found: {smilesFound}/3)
        </p>
      </div>

      <div className="w-full bg-white border-2 border-zinc-900 rounded-xl p-3 my-3 shadow-inner">
        <div className="grid grid-cols-3 gap-3">
          {cells.map((cell) => (
            <button
              key={cell.id}
              onClick={() => scratchCell(cell.id)}
              disabled={cell.scratched}
              className={`relative w-14 h-14 mx-auto rounded-full border-2 border-zinc-900 flex items-center justify-center font-bold text-lg transition-all duration-200 select-none ${
                cell.scratched
                  ? cell.isSmile
                    ? 'bg-amber-100 scale-105 shadow-sm'
                    : 'bg-zinc-100 text-zinc-600'
                  : 'bg-[#fef08a] hover:bg-[#fde047] active:scale-95 shadow-xs cursor-pointer'
              }`}
            >
              {cell.scratched ? (
                <span className="text-2xl">{cell.icon}</span>
              ) : (
                <span className="text-[11px] text-zinc-900 font-bold uppercase leading-tight text-center">
                  scratch<br />me
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {hasWon ? (
        <div className="w-full bg-emerald-100 border-2 border-emerald-600 rounded-xl p-2.5 text-center space-y-1">
          <p className="font-bold text-base text-emerald-800">
            🎉 You found 3 Smiles! Winner!
          </p>
          <button
            onClick={initGame}
            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
          >
            Play Another Card
          </button>
        </div>
      ) : (
        <button
          onClick={initGame}
          className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 font-bold pt-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Scratch Card</span>
        </button>
      )}

      <div className="w-full flex justify-end text-xs text-zinc-400 font-bold pr-1 pt-1">
        PS 2026
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ARCADE PAGE
───────────────────────────────────────────────────────────────────────────── */
export const Arcade: React.FC = () => {
  const [surpriseOpen, setSurpriseOpen] = useState<boolean>(false);
  const [surprisePrize, setSurprisePrize] = useState<string>('');

  const surprises = [
    '☕ You unlocked free virtual coffee! Keep building awesome things!',
    '🌟 High five! You have discovered the secret builder level.',
    '🚀 May your code run smoothly and your ideas ship fast!',
    '🎨 True craft is doing what feels playful and purposeful.',
    '🕹️ You are a certified Arcade Champion!',
  ];

  const handleSurpriseClick = () => {
    const random = surprises[Math.floor(Math.random() * surprises.length)];
    setSurprisePrize(random);
    setSurpriseOpen(true);
    triggerConfetti(0.85, 0.2);
  };

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HEADER ROW WITH TOP-RIGHT SURPRISE BOX
      ────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col sm:flex-row items-start justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 leading-snug sm:leading-snug">
            Welcome to my arcade! This is where I design and code little games just for fun.
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 mt-2 font-medium">
            Step right up! Everything here is interactive and made with code & love.
          </p>
        </div>

        {/* Top-Right Surprise Box */}
        <div className="self-end sm:self-start flex flex-col items-center">
          <div className="px-3 py-1 rounded-full bg-white border-2 border-zinc-900 text-sm font-bold text-zinc-800 shadow-xs mb-1.5">
            Click for a nice surprise!
          </div>

          <button
            onClick={handleSurpriseClick}
            className="group relative focus:outline-none hover:scale-105 active:scale-95 transition-transform"
            title="Open surprise!"
          >
            <div className="w-16 h-14 bg-[#fef08a] border-2 border-zinc-900 rounded-xl shadow-md flex items-center justify-center relative overflow-hidden group-hover:bg-[#fde047]">
              <div className="w-full h-2.5 bg-amber-400 border-y border-zinc-900" />
              <div className="h-full w-2.5 bg-amber-400 border-x border-zinc-900 absolute" />
              <span className="absolute z-10 text-xl group-hover:animate-bounce">🎁</span>
            </div>
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          1. THE RETRO OS CONSOLE (Requested in prompt)
      ────────────────────────────────────────────────────────────── */}
      <RetroOSConsole />

      {/* ─────────────────────────────────────────────────────────────
          2. THE 3 PHYSICAL DOODLE MACHINES (Claw, Gumball, Scratch)
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full border-b-2 border-dashed border-zinc-200 pb-3 mb-8 flex items-center gap-2">
        <span className="text-xl">🎰</span>
        <h2 className="text-2xl font-bold text-zinc-900">
          Hand-Drawn Arcade Machines
        </h2>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-12">
        <div className="w-full flex justify-center">
          <ClawMachine />
        </div>
        <div className="w-full flex justify-center">
          <GumballMachine />
        </div>
        <div className="w-full flex justify-center">
          <ScratchToWin />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SURPRISE MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {surpriseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-zinc-900 p-6 text-center shadow-2xl space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-zinc-900 mx-auto flex items-center justify-center text-3xl shadow-sm animate-bounce">
                🎁
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Special Surprise!
                </span>
                <h3 className="text-xl font-bold text-zinc-900">
                  You Unlocked a Treat!
                </h3>
                <p className="text-base text-zinc-700 font-medium leading-relaxed pt-2">
                  {surprisePrize}
                </p>
              </div>

              <button
                onClick={() => setSurpriseOpen(false)}
                className="w-full py-2.5 bg-[#fef08a] border-2 border-zinc-900 rounded-xl font-bold text-base text-zinc-900 hover:bg-[#fde047] shadow-xs"
              >
                Yay, thank you! 🎉
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DoodleLayout>
  );
};

export default Arcade;
