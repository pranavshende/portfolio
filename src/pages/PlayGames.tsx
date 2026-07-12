import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Circle, Square,
  Grid, Hexagon, Activity, Gamepad2, TrainFront, Bird, Globe, Music, Folder,
  Smartphone, Tablet
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

type AppType = 'home' | 'game2048' | 'hextris' | 'dino' | 'tetris' | 'subway' | 'flappy' | 'spotify' | 'jansampark' | 'pashurakshak' | 'solar' | 'agriscore';

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
    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-sm overflow-hidden flex items-center justify-center bg-gradient-to-br ${gradient} border border-white/10 group-hover:scale-95 transition-transform duration-200`}>
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
      
      {/* iOS Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none"></div>
    </div>
  );
};

const PlayGames = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet'>('tablet');

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
    { id: 'game2048', name: '2048', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/2048_logo.svg" FallbackIcon={Grid} gradient="from-yellow-400 to-orange-500" alt="2048" /> },
    { id: 'hextris', name: 'Hextris', icon: <SquircleIcon imgUrl="https://raw.githubusercontent.com/hextris/hextris/master/favicon.ico" FallbackIcon={Hexagon} gradient="from-slate-700 to-slate-900" alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-zinc-400 to-zinc-600" alt="Dino" /> },
    { id: 'tetris', name: 'Tetris', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Gamepad2} gradient="from-violet-500 to-fuchsia-600" alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={TrainFront} gradient="from-amber-400 to-yellow-600" alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" FallbackIcon={Bird} gradient="from-sky-300 to-blue-500" alt="Flappy Bird" /> },
    { id: 'projects_folder', name: 'Projects', isFolder: true, folderApps: [
      { id: 'jansampark', name: 'JanSampark', icon: <SquircleIcon imgUrl="https://projectjansampark.pranavshende.online/favicon.ico" FallbackIcon={Globe} gradient="from-blue-500 to-indigo-600" alt="JanSampark" />, appId: 'jansampark' },
      { id: 'pashurakshak', name: 'PashuRakshak', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-emerald-400 to-teal-600" alt="PashuRakshak" />, appId: 'pashurakshak' },
      { id: 'solar', name: 'Solar Analytics', icon: <SquircleIcon imgUrl="https://projectsolarsalesanalysis.pranavshende.online/favicon.ico" FallbackIcon={Hexagon} gradient="from-amber-400 to-orange-600" alt="Solar Analytics" />, appId: 'solar' },
      { id: 'agriscore', name: 'AgriScore', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Circle} gradient="from-green-400 to-emerald-600" alt="AgriScore" />, appId: 'agriscore' }
    ], icon: (
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm shadow-sm flex items-center justify-center border border-white/30 group-hover:scale-95 transition-transform duration-200">
        <Folder size={22} className="text-white drop-shadow-md" fill="currentColor" opacity={0.8} />
      </div>
    )},
    { id: 'spotify', name: 'Spotify', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" FallbackIcon={Music} gradient="from-[#1ED760] to-[#1DB954]" alt="Spotify" /> },
  ];

  return (
    <div className="h-[100dvh] sm:min-h-screen bg-black flex flex-col items-center justify-center p-0 sm:p-8 font-sans overflow-hidden">
      
      {/* Back to Portfolio Link */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-zinc-300 hover:text-white flex items-center gap-2 transition-colors z-[60] bg-black/40 backdrop-blur-md p-2 sm:px-0 sm:py-0 sm:bg-transparent rounded-full"
      >
        <ChevronLeft size={20} />
        <span className="font-medium hidden sm:inline">Back to Portfolio</span>
      </Link>

      {/* Device Toggle (Desktop only) */}
      <div className="hidden sm:flex absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/40 backdrop-blur-md rounded-full p-1 z-[60] border border-white/10">
        <button
          onClick={() => setDeviceType('mobile')}
          className={`p-2 rounded-full transition-colors ${deviceType === 'mobile' ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          title="Mobile View"
        >
          <Smartphone size={20} />
        </button>
        <button
          onClick={() => setDeviceType('tablet')}
          className={`p-2 rounded-full transition-colors ${deviceType === 'tablet' ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          title="Tablet View"
        >
          <Tablet size={20} />
        </button>
      </div>

      {/* Background ambient glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Device Frame */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`relative w-full h-full sm:w-auto sm:max-h-[85vh] bg-zinc-950 sm:border-[10px] sm:border-zinc-800 shadow-2xl overflow-hidden sm:shadow-purple-900/20 transition-all duration-500 ${
          deviceType === 'mobile' 
            ? 'sm:h-[812px] sm:aspect-[375/812] sm:rounded-[3rem]' 
            : 'sm:h-[820px] sm:aspect-[1180/820] sm:rounded-[2rem]'
        }`}
      >
        {/* Hardware Buttons */}
        <div className="hidden sm:block absolute -left-[14px] top-32 w-1 h-12 bg-zinc-700 rounded-l-md" />
        <div className="hidden sm:block absolute -left-[14px] top-48 w-1 h-12 bg-zinc-700 rounded-l-md" />
        <div className="hidden sm:block absolute -right-[14px] top-40 w-1 h-16 bg-zinc-700 rounded-r-md" />

        {/* Screen Content */}
        <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* HOME SCREEN */}
            {activeApp === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full pt-16 px-6 pb-8">
                  {/* Aesthetic Clock Widget */}
                  <div className="w-full flex flex-col items-center justify-center mb-12 mt-4 pointer-events-none drop-shadow-lg">
                    <span className="text-white text-6xl font-light tracking-tight">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-white/80 text-sm font-medium tracking-widest uppercase mt-2">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Apps Grid */}
                  <div className="grid grid-cols-4 gap-x-4 gap-y-8 max-w-sm mx-auto mt-auto mb-10 w-full">
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
                        <span className="text-white text-[11px] font-medium drop-shadow-md tracking-wide w-full text-center truncate px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folder Overlay */}
                <AnimatePresence>
                  {openFolder && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                      onClick={() => setOpenFolder(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-[280px] bg-white/20 backdrop-blur-md rounded-[32px] p-6 border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-white font-medium text-center mb-6 text-sm tracking-wide">
                          {apps.find(a => a.id === openFolder)?.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-6">
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
                              className="flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                              {fApp.icon}
                              <span className="text-white text-[10px] font-medium drop-shadow-md tracking-wide w-full text-center truncate px-1">
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
            {(activeApp === 'pashurakshak' || activeApp === 'agriscore') && (
              <motion.div 
                key={activeApp}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-10 bg-zinc-900 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                  {activeApp === 'pashurakshak' && <Activity size={32} className="text-emerald-500" />}
                  {activeApp === 'agriscore' && <Circle size={32} className="text-green-500" />}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {activeApp === 'pashurakshak' && 'PashuRakshak'}
                  {activeApp === 'agriscore' && 'AgriScore'}
                </h3>
                <p className="text-zinc-400 text-sm mb-8">
                  This project is currently not deployed on a public URL. You can check out the source code on GitHub!
                </p>
                <button 
                  onClick={() => setActiveApp('home')}
                  className="px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
              >
                <iframe 
                  src="https://projectjansampark.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="JanSampark"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
              >
                <iframe 
                  src="https://projectsolarsalesanalysis.pranavshende.online/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="Solar Analysis"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'game2048' && (
              <motion.div 
                key="game2048"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
              >
                <iframe 
                  src="https://cyberzhg.github.io/2048/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="2048"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
                className="absolute top-0 left-0 right-0 bottom-10 bg-black"
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
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-md flex items-center justify-around z-50 border-t border-white/10">
          <button 
            onClick={() => setActiveApp('home')}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => setActiveApp('home')}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Home"
          >
            <Circle size={16} className="fill-transparent stroke-2" />
          </button>

          <Link 
            to="/"
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Portfolio"
          >
            <Square size={14} className="fill-transparent stroke-2" />
          </Link>
        </div>
      </motion.div>
      
      <p className="hidden sm:flex mt-8 text-zinc-500 text-sm font-medium flex-col items-center">
        <span>Click the navigation buttons at the bottom to return to the Arcade launcher</span>
      </p>
    </div>
  );
};

export default PlayGames;
