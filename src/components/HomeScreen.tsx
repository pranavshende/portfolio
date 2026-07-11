import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../photo/1000170373_optimized_1000.jpg.jpeg';
import SkillsMarquee from './SkillsMarquee';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, X, Play, Pause } from 'lucide-react';

export const HomeScreen = () => {
  const [photoOpen, setPhotoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        // Play returns a promise which can reject if the audio source is invalid or blocked
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (photoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [photoOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col pt-8 sm:pt-12 px-4 sm:px-6">
      
      {/* Hero Banner + Profile Picture wrapper */}
      <div className="relative w-full mb-12 sm:mb-14">
        {/* Banner */}
        <div className="relative w-full h-32 sm:h-48 rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=3540&auto=format&fit=crop" 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Resume button */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
            <a 
              href="https://drive.google.com/drive/folders/1vgcE2naPfhC52fyWzBFe9Brv_SwjK8df?usp=sharing"
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-100 active:scale-95 transition-all border border-white/20 shadow-md backdrop-blur-md"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>
        </div>

        {/* Profile Picture — sits below banner, not inside overflow-hidden */}
        <div className="absolute -bottom-10 left-6 sm:left-8 z-10">
          <button
            onClick={() => setPhotoOpen(true)}
            aria-label="View profile photo"
            className="group block w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 border-black shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-zoom-in transition-transform duration-200 hover:scale-105"
          >
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        </div>
      </div>

      {/* ── Profile Photo Lightbox ── */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          style={{ animation: 'fcb-lb-bg 0.25s ease forwards' }}
          onClick={() => setPhotoOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Frame */}
          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{ animation: 'fcb-lb-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing ring */}
            <div className="relative rounded-2xl p-[3px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 shadow-2xl shadow-emerald-500/30">
              <div className="rounded-[14px] overflow-hidden w-64 h-64 sm:w-80 sm:h-80">
                <img
                  src={profilePhoto}
                  alt="Pranav Shende"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
            </div>

            {/* Name tag */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Pranav Shende</span>
              <span className="text-emerald-400 text-xs font-mono">@pranavshende</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setPhotoOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <style>{`
            @keyframes fcb-lb-bg  { from { opacity: 0 } to { opacity: 1 } }
            @keyframes fcb-lb-pop { from { opacity: 0; transform: scale(0.7) } to { opacity: 1; transform: scale(1) } }
          `}</style>
        </div>
      )}

      {/* Profile Info — frosted glass panel for readability over the animated background */}
      <div className="relative rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7 space-y-6">
        <div className="space-y-1.5">
          <h1 
            className="font-bold text-2xl sm:text-3xl tracking-tight text-white"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Pranav Shende
          </h1>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-zinc-400 pt-1">
            <a 
              href="https://x.com/pranavshende" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/PranavShende" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/pranavshende" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="mailto:pranavshende97@gmail.com" 
              className="hover:text-white transition-colors"
              aria-label="Email"
              title="pranavshende97@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <span className="font-serif italic text-lg text-zinc-500 select-none">pranavshende</span>
            <div className="h-[1px] bg-zinc-800 w-32"></div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm sm:text-base text-zinc-400 leading-relaxed space-y-4 max-w-2xl">
          <p>
            B.Tech IT student at <span className="text-white font-semibold">SVPCET, Nagpur</span> specializing in the{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mx-0.5">MERN</span>{' '}
            stack and{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mx-0.5">React Native</span>,
            focused on <span className="text-white font-semibold">scalable backend architectures</span> and shipping things that{' '}
            <span className="italic text-white">actually work</span> under pressure.
          </p>
          <p>
            IEEE-published researcher with hands-on experience in <span className="text-white font-semibold">AI/ML, edge computing,</span> and building{' '}
            <span className="text-white font-semibold">40+ REST APIs</span>. I like digging into distributed systems and the kind of engineering where
            you have to think about what happens when things <span className="italic text-white">go wrong</span>.
          </p>
          <p>
            When I learn something worth sharing, I{' '}
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-white font-medium underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors"
            >
              write about it
            </button>.
          </p>
        </div>

        {/* Recently Listening & Key Stats */}
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500">Recently <span className="text-white">listening</span></h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 max-w-sm hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-zinc-800 overflow-hidden relative flex-shrink-0 group-hover:shadow-md transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" 
                    alt="Album art" 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`} 
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <a href="https://open.spotify.com/track/0ct6r3EZaNONV2eHwL0b6p" target="_blank" rel="noreferrer" className="text-xs font-medium text-white truncate hover:text-emerald-400 transition-colors">The Nights</a>
                  <span className="text-[10px] text-zinc-500 truncate">by Avicii</span>
                </div>
              </div>
              <audio 
                ref={audioRef} 
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
                onEnded={() => setIsPlaying(false)}
                className="hidden" 
                preload="none"
              />
              <div className="flex items-center gap-3">
                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-3 mr-1">
                    <span className="w-0.5 h-[60%] bg-emerald-500 animate-[bounce_1s_infinite] origin-bottom"></span>
                    <span className="w-0.5 h-[100%] bg-emerald-500 animate-[bounce_1s_infinite_0.2s] origin-bottom"></span>
                    <span className="w-0.5 h-[40%] bg-emerald-500 animate-[bounce_1s_infinite_0.4s] origin-bottom"></span>
                  </div>
                )}
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-400 hover:scale-105 transition-all shadow-md"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <a href="https://open.spotify.com/track/0ct6r3EZaNONV2eHwL0b6p" target="_blank" rel="noreferrer" aria-label="Open in Spotify">
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 hover:text-zinc-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2 max-w-xs">
            <button 
              onClick={() => scrollToSection('projects')}
              className="flex flex-col text-left hover:opacity-80 transition-opacity group"
            >
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">40+</span>
              <span className="text-[10px] text-zinc-500 leading-tight">REST APIs built</span>
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="flex flex-col text-left hover:opacity-80 transition-opacity group"
            >
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">3</span>
              <span className="text-[10px] text-zinc-500 leading-tight">Internships</span>
            </button>
            <a 
              href="https://github.com/PranavShende"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col text-left hover:opacity-80 transition-opacity group"
            >
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">IEEE</span>
              <span className="text-[10px] text-zinc-500 leading-tight">Published</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
