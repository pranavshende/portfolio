import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Circle, Square,
  Grid, Hexagon, Activity, Gamepad2, TrainFront, Bird, Globe, Music
} from 'lucide-react';
import { Link } from 'react-router-dom';

type AppType = 'home' | 'game2048' | 'hextris' | 'dino' | 'tetris' | 'subway' | 'flappy' | 'jansampark' | 'spotify';

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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'game2048', name: '2048', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/2048_logo.svg" FallbackIcon={Grid} gradient="from-yellow-400 to-orange-500" alt="2048" /> },
    { id: 'hextris', name: 'Hextris', icon: <SquircleIcon imgUrl="https://raw.githubusercontent.com/hextris/hextris/master/favicon.ico" FallbackIcon={Hexagon} gradient="from-slate-700 to-slate-900" alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-zinc-400 to-zinc-600" alt="Dino" /> },
    { id: 'tetris', name: 'Tetris', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Gamepad2} gradient="from-violet-500 to-fuchsia-600" alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={TrainFront} gradient="from-amber-400 to-yellow-600" alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" FallbackIcon={Bird} gradient="from-sky-300 to-blue-500" alt="Flappy Bird" /> },
    { id: 'jansampark', name: 'JanSampark', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Globe} gradient="from-blue-500 to-indigo-600" alt="JanSampark" /> },
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

      {/* Background ambient glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Phone Frame */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative w-full h-full sm:w-[340px] sm:h-[720px] sm:rounded-[3rem] bg-zinc-950 sm:border-[10px] sm:border-zinc-800 shadow-2xl overflow-hidden sm:shadow-purple-900/20"
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
                        onClick={() => setActiveApp(app.id as AppType)}
                      >
                        {app.icon}
                        <span className="text-white text-[11px] font-medium drop-shadow-md tracking-wide w-full text-center truncate px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ARCADE / GAME SCREENS */}
            {activeApp === 'game2048' && (
              <motion.div 
                key="game2048"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-black"
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
                className="absolute inset-0 bg-black"
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
                className="absolute inset-0 bg-black"
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
                className="absolute inset-0 bg-black"
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
                className="absolute inset-0 bg-black"
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
                className="absolute inset-0 bg-black"
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

            {activeApp === 'jansampark' && (
              <motion.div 
                key="jansampark"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-black"
              >
                <iframe 
                  src="https://jan-sampark-deployable-6sleg73ch-raprax.vercel.app/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="JanSampark"
                  allow="geolocation; microphone; camera; display-capture"
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
                className="absolute inset-0 bg-black"
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
