import React from 'react';
import SkillsMarquee from './SkillsMarquee';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Pause } from 'lucide-react';

export const HomeScreen = () => {

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col pt-8 sm:pt-12 px-4 sm:px-6">
      
      {/* Hero Banner */}
      <div className="relative w-full h-32 sm:h-48 rounded-2xl overflow-hidden mb-12 sm:mb-16">
        <img 
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=3540&auto=format&fit=crop" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        {/* Profile Picture */}
        <div className="absolute -bottom-8 left-6 sm:left-8 z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 border-black bg-zinc-900 shadow-xl flex items-center justify-center">
            <span className="text-3xl font-bold text-zinc-400">PS</span>
          </div>
        </div>

        {/* Resume button — links to LinkedIn since no PDF is uploaded */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <a 
            href="https://linkedin.com/in/pranavshende"
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/50 text-white hover:bg-black/80 transition-colors border border-white/10 backdrop-blur-md"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-6">
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

        {/* Problem Solving & Listening */}
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500">Find my <span className="text-white">problem solving</span></h3>
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href="https://leetcode.com/u/PranavShende/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 hover:border-amber-500/30 transition-colors text-xs font-medium text-zinc-300"
              >
                <span className="text-amber-400 font-bold text-sm leading-none">L</span> LeetCode
              </a>
              <a 
                href="https://codeforces.com/profile/PranavShende" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 hover:border-blue-500/30 transition-colors text-xs font-medium text-zinc-300"
              >
                <span className="text-blue-400 font-bold text-xs">CF</span> Codeforces
              </a>
              <a 
                href="https://www.codechef.com/users/pranavshende" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 hover:border-orange-500/30 transition-colors text-xs font-medium text-zinc-300"
              >
                <span className="text-orange-400 font-bold text-xs">CC</span> CodeChef
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500">Recently <span className="text-white">listening</span></h3>
            <a 
              href="https://open.spotify.com/" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 max-w-sm hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-zinc-800 overflow-hidden relative flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" 
                    alt="Album art" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-white truncate">The Nights</span>
                  <span className="text-[10px] text-zinc-500 truncate">by Avicii</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </a>
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
