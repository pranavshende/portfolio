import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../photo/profile_photo_wide.webp';
import bannerBg from '../photo/home_banner_bg.webp';
import SkillsMarquee from './SkillsMarquee';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, X, Gamepad2, BadgeCheck, MapPin, Trophy, GraduationCap, Code } from 'lucide-react';
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
      
      {/* New Hero Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-12 mb-8 sm:mb-16">
        {/* Profile Picture */}
        <div className="relative shrink-0">
          <button
            onClick={() => setPhotoOpen(true)}
            aria-label="View profile photo"
            className="group block w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#121212] shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-zoom-in transition-transform duration-200 hover:scale-105 bg-zinc-900"
          >
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.0]"
              style={{ transform: 'scale(1.75) translateY(8%)' }}
            />
          </button>
        </div>

        {/* Info Content */}
        <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Hi, I'm Pranav
            </h1>
            <BadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 shrink-0" fill="currentColor" stroke="black" />
          </div>

          {/* Subheader */}
          <p className="text-sm sm:text-lg text-zinc-800 dark:text-zinc-100 font-medium leading-snug max-w-xl">
            Full-stack engineer dedicated to building scalable backend architectures, exploring system design, and shipping high-impact solutions.
          </p>
          
          <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            IT B.Tech student building backend systems and cross-platform apps. Currently focusing on MERN stack, React Native, and AI/ML integrations.
          </p>

          {/* Details List */}
          <div className="flex flex-col gap-2.5 pt-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-mono sm:font-sans w-full max-w-md items-start sm:items-start text-left pl-2 sm:pl-0">
            <div className="flex items-center gap-2.5">
              <Code className="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <span>Full Stack Developer @ NkSkillEdge Pvt. Ltd</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <span>Nagpur, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-500 dark:hover:text-emerald-400 underline underline-offset-2 decoration-zinc-400 dark:decoration-zinc-700 hover:decoration-emerald-500 transition-colors"
              >
                pranavshende97@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-yellow-600 dark:text-yellow-400 font-medium">
              <Trophy className="w-4 h-4 shrink-0 mt-0.5" />
              <span>IEEE Published Researcher</span>
            </div>
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <span>IT @SVPCET, Nagpur, graduating 2027</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 pt-2 sm:pt-4">
            <a 
              href="https://github.com/PranavShende" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-[#222] hover:border-zinc-300 dark:hover:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-sm"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/pranavshende" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-[#222] hover:border-zinc-300 dark:hover:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-[#222] hover:border-zinc-300 dark:hover:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <Link 
              to="/playgames"
              className="flex items-center justify-center gap-1.5 h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-emerald-500 text-black text-xs sm:text-sm font-semibold hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20"
            >
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Arcade
            </Link>
            <a 
              href="https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing"
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black text-xs sm:text-sm font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Resume
            </a>
          </div>
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
                  className="w-full h-full object-cover object-[54%_12%] scale-[1.1]"
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

      {/* Bottom Content Area */}
      <div className="relative rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7 space-y-6">
        {/* Recently Listening & Key Stats */}
        <div className="space-y-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500">Recently <span className="text-white">listening</span></h3>
            <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/5y2ijHECwFYWqcAHKTZgzD?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy" 
                title="Recently Listening"
              />
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
