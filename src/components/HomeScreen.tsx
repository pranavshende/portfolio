import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../photo/1000170373_optimized_1000.jpg.jpeg';
import SkillsMarquee from './SkillsMarquee';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, X, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {
  const [photoOpen, setPhotoOpen] = useState(false);
  const spotifyContainerRef = useRef<HTMLDivElement>(null);
  const spotifyControllerRef = useRef<any>(null);

  // Initialize Spotify IFrame API for programmatic control
  useEffect(() => {
    // Define the global callback
    (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
      const element = spotifyContainerRef.current;
      if (!element) return;

      const options = {
        uri: 'spotify:track:5y2ijHECwFYWqcAHKTZgzD',
        width: '100%',
        height: '152',
        theme: '0'
      };

      IFrameAPI.createController(element, options, (EmbedController: any) => {
        spotifyControllerRef.current = EmbedController;
      });
    };

    // Inject the Spotify script if it doesn't exist
    if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
      const script = document.createElement('script');
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup
    return () => {
      (window as any).onSpotifyIframeApiReady = null;
    };
  }, []);

  // Pause music automatically when app goes to background / tab is switched
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && spotifyControllerRef.current) {
        spotifyControllerRef.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

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
    <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col px-4 sm:px-6">
      
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

          {/* Buttons */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2">
            <Link 
              to="/playgames"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20 backdrop-blur-md"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Arcade
            </Link>
            <a 
              href="https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing"
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
            <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30">
              {/* This div is replaced by the Spotify IFrame API */}
              <div ref={spotifyContainerRef}></div>
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
          
          {/* Research Publications */}
          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <h3 className="text-xs font-medium text-zinc-500">Research <span className="text-white">Publications</span></h3>
            
            <div className="space-y-4">
              <div className="group relative border-l-2 border-emerald-500/30 pl-4 py-1 hover:border-emerald-500 transition-colors">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-white font-semibold">CNN Based Classification of Lumpy Skin Disease</span> presented at the 2025 4th OPJU International Conference (IEEE)
                </p>
                <a href="https://doi.org/10.1109/OTCON65728.2025.11070341" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline mt-1 inline-block">
                  doi: 10.1109/OTCON65728.2025.11070341
                </a>
              </div>

              <div className="group relative border-l-2 border-teal-500/30 pl-4 py-1 hover:border-teal-500 transition-colors">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-white font-semibold">Intelligent Platform to Interconnect Alumni and Student for Educational Institutes</span> published in the <span className="italic">International Journal on Advanced Computer Theory and Engineering</span>, 14(1): 193–197, May 2025
                </p>
                <a href="https://doi.org/10.65521/ijacte.v14i1.388" target="_blank" rel="noopener noreferrer" className="text-xs text-teal-400 hover:text-teal-300 hover:underline mt-1 inline-block">
                  doi: 10.65521/ijacte.v14i1.388
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
