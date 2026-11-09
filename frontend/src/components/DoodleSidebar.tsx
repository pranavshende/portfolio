import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Menu, X, ExternalLink, GraduationCap, Sun, Moon, Lock, Send, Download } from 'lucide-react';
import { useMode } from '@/contexts/ModeContext';
import { api } from '@/lib/api';
import profilePhoto from '../photo/profile_photo_wide.webp';

// ── Hand-drawn outline doodle icons ──────────────────────────
const DoodleHouse = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
    <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
    <path d="M18 5.5V3h-2v4.2" />
  </svg>
);

const DoodleSmiley = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="8.5" cy="10" r="1.2" fill="currentColor" />
    <circle cx="15.5" cy="10" r="1.2" fill="currentColor" />
    <path d="M7.5 14c1.2 2 3.2 2.5 4.5 2.5s3.3-.5 4.5-2.5" />
  </svg>
);

const DoodlePalette = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1.5 4.5 3.5 5 1 .25 1.5.8 1.5 1.8 0 1.8 1.5 3.2 3.2 3.2h1.8c5.5 0 10-4.5 10-10C22 6.5 17.5 2 12 2Z" />
    <circle cx="7.5" cy="9.5" r="1.3" fill="currentColor" />
    <circle cx="11.5" cy="6.5" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="14" r="1.3" fill="currentColor" />
  </svg>
);

const DoodleGamepad = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="20" height="12" x="2" y="6" rx="6" />
    <path d="M6 12h4" />
    <path d="M8 10v4" />
    <circle cx="15" cy="11" r="1.2" fill="currentColor" />
    <circle cx="18" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

const DoodleEmail = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="20" height="15" x="2" y="4.5" rx="2" />
    <path d="m22 6-10 7L2 6" />
    <path d="m10 13-7 5.5" />
    <path d="m14 13 7 5.5" />
  </svg>
);

const DoodleLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M7.5 10.5v6" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
    <path d="M12 16.5v-3.5c0-1.2.8-2 2-2s2 .8 2 2v3.5" />
    <path d="M12 10.5v6" />
  </svg>
);

const DoodleGitHub = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const DoodleResume = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h6" />
  </svg>
);

const DoodleMedium = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-current">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const DoodleFolder = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8.5l-2-2.5H4a1 1 0 0 0-1 1z" />
    <path d="M3 11h18" />
  </svg>
);

const DoodleBook = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-current fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M6 14h6" />
  </svg>
);

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: <DoodleHouse /> },
  { name: 'Projects', path: '/projects', icon: <DoodleFolder /> },
  { name: 'Blog', path: '/blog', icon: <DoodleBook /> },
  { name: 'About', path: '/about', icon: <DoodleSmiley /> },
  { name: 'Arcade', path: '/arcade', icon: <DoodleGamepad /> },
];

export const DoodleSidebar: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Prevent background scrolling and handle Escape key when profile modal is open
  useEffect(() => {
    if (profileModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setProfileModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [profileModalOpen]);

  // Dynamic links from website settings
  const [socialLinks, setSocialLinks] = useState({
    emailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com",
    resumeUrl: "https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing",
    linkedInUrl: "https://linkedin.com/in/pranavshende",
    githubUrl: "https://github.com/PranavShende",
  });

  useEffect(() => {
    try {
      const cached = localStorage.getItem('site_settings');
      if (cached) {
        const s = JSON.parse(cached);
        setSocialLinks({
          emailUrl: s.contactEmail ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(s.contactEmail)}` : "https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com",
          resumeUrl: s.resumeDriveUrl || "https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing",
          linkedInUrl: s.linkedinUrl || "https://linkedin.com/in/pranavshende",
          githubUrl: s.githubUrl || "https://github.com/PranavShende",
        });
      }
    } catch {}
  }, []);

  const { emailUrl, resumeUrl, linkedInUrl, githubUrl } = socialLinks;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP FIXED SIDEBAR
          Clean, perfectly proportioned, 100% fixed with zero scrollbar
      ────────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col justify-between w-[240px] h-[calc(100vh-2rem)] fixed left-4 top-4 rounded-3xl bg-[#faf7f0]/95 dark:bg-[#15161c]/95 backdrop-blur-md border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] px-4 py-4 z-40 select-none overflow-y-auto scrollbar-none font-sans transition-colors duration-200">
        <div className="flex flex-col space-y-2.5">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            {/* Clickable Circular Profile Photo with red accent ring (Compact size matching mockup) */}
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="group relative cursor-pointer focus:outline-hidden mb-2"
              title="Click to view details & bio"
              aria-label="View profile details"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#8b2323] shadow-xs bg-zinc-100 dark:bg-zinc-800 shrink-0 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#8b2323]/30 transition-all duration-200">
                <img
                  src={profilePhoto}
                  alt="Pranav Shende"
                  className="w-full h-full object-cover object-center scale-[1.7] translate-y-1"
                />
              </div>
            </button>

            {/* Name */}
            <h1 
              onClick={() => setProfileModalOpen(true)}
              className="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-none font-serif cursor-pointer hover:text-[#8b2323] dark:hover:text-red-400 transition-colors"
              title="Click to view full profile details"
            >
              Pranav Shende
            </h1>

            {/* Title */}
            <p className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 mt-1 leading-none">
              Full Stack Developer
            </p>

            {/* Location */}
            <p className="inline-flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-1 leading-none">
              <MapPin className="w-2.5 h-2.5 text-stone-500 dark:text-stone-400" />
              <span>Nagpur, India</span>
            </p>
          </div>

          {/* Torii Gate Divider */}
          <div className="flex items-center gap-2 text-stone-400 my-1 px-2">
            <div className="h-[1px] flex-1 bg-stone-300/80 dark:bg-stone-700/80" />
            <span className="text-xs text-[#8b2323]">⛩</span>
            <div className="h-[1px] flex-1 bg-stone-300/80 dark:bg-stone-700/80" />
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col space-y-1">
            <span className="text-[9px] font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase px-3">
              Navigation
            </span>
            <nav className="flex flex-col space-y-1 pt-0.5">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? '!bg-[#8b2323] !text-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                    }`}
                    style={isActive ? { backgroundColor: '#8b2323', color: '#ffffff' } : undefined}
                  >
                    <span className="shrink-0" style={isActive ? { color: '#ffffff' } : undefined}>{item.icon}</span>
                    <span className="leading-none pt-0.5" style={isActive ? { color: '#ffffff' } : undefined}>{item.name}</span>
                  </NavLink>
                );
              })}

              {/* Resume Navigation Item */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all duration-150 group cursor-pointer"
                title="Open Pranav's Resume on Google Drive"
              >
                <span className="shrink-0"><DoodleResume /></span>
                <span className="leading-none pt-0.5">Resume</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Dark / Light Mode Switch */}
          <div className="pt-0.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>{isDark ? "Dark Theme" : "Light Theme"}</span>
              </div>
              <div className={`w-7 h-3.5 rounded-full transition-colors relative flex items-center p-0.5 ${isDark ? 'bg-amber-400/30' : 'bg-[#8b2323]/20'}`}>
                <div className={`w-2.5 h-2.5 rounded-full transition-transform ${isDark ? 'bg-amber-400 translate-x-3.5' : 'bg-[#8b2323] translate-x-3.5'} shadow-2xs`} />
              </div>
            </button>
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col space-y-1 pt-0.5">
            <span className="text-[10px] font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase px-3">
              Contacts
            </span>
            <div className="flex flex-col space-y-0.5 pt-0.5">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-[#8b2323] dark:text-rose-400 hover:text-white hover:bg-[#8b2323] dark:hover:bg-rose-900/60 transition-colors text-left cursor-pointer"
                title="Send inquiry & receive instant confirmation email"
              >
                <Send className="w-4 h-4 shrink-0 text-[#8b2323] dark:text-rose-400 group-hover:text-white" />
                <span className="pt-0.5">Contact Me</span>
              </button>

              <a
                href={emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
                title="Send email to pranavshende97@gmail.com"
              >
                <DoodleEmail />
                <span className="pt-0.5">Email</span>
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
              >
                <DoodleLinkedIn />
                <span className="pt-0.5">LinkedIn</span>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
              >
                <DoodleGitHub />
                <span className="pt-0.5">GitHub</span>
              </a>

              <a
                href="https://medium.com/@pranavshende97"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
                title="Read Pranav's Articles on Medium"
              >
                <DoodleMedium />
                <span className="pt-0.5">Medium</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
                title="View Pranav's Resume on Google Drive"
              >
                <DoodleResume />
                <span className="pt-0.5">Resume</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Clean Footer with Ink Mountain Silhouette & Admin Portal */}
        <div className="pt-2 border-t border-stone-800/10 dark:border-stone-700/30 flex flex-col items-center text-center space-y-1">
          <svg viewBox="0 0 100 24" className="w-20 h-5 text-stone-600 dark:text-stone-400 opacity-60 fill-none stroke-current stroke-[1.4] stroke-linecap-round stroke-linejoin-round">
            <path d="M5 22 L25 10 L40 17 L62 4 L80 15 L95 8" />
            <path d="M15 22 L32 14 L50 20 L72 10 L88 18" />
          </svg>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-wide">
            © Pranav Shende 2026
          </span>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-600 hover:text-[#8b2323] dark:text-stone-400 dark:hover:text-rose-400 transition-colors pt-0.5"
            title="Administrator Login & CMS"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOP NAVBAR & DRAWER
      ────────────────────────────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 left-0 right-0 h-14 bg-[#faf7f0]/95 dark:bg-[#15161c]/95 backdrop-blur-xl border-b-2 border-stone-900 dark:border-stone-700 shadow-[0_2px_0px_#1c1917] dark:shadow-[0_2px_0px_#000000] px-3 sm:px-4 flex items-center justify-between z-40 transition-colors">
        <button
          type="button"
          onClick={() => setProfileModalOpen(true)}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-hidden"
          title="Click to view full profile details & bio"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#8b2323] shrink-0 group-hover:scale-105 transition-transform shadow-[1.5px_1.5px_0px_#1c1917]">
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover scale-[1.7] translate-y-0.5"
            />
          </div>
          <div>
            <span className="font-bold text-sm text-stone-950 dark:text-stone-50 leading-none block group-hover:text-[#8b2323] dark:group-hover:text-red-400 transition-colors">
              Pranav Shende
            </span>
            <span className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold leading-none block mt-0.5 font-mono">
              Open to Work • Details
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Resume Quick Action in Mobile Top Nav */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:opacity-90 active:scale-95 transition-all cursor-pointer font-mono"
            title="Open Pranav's Resume on Google Drive"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#1c1917] dark:hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer shrink-0"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-800" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#1c1917] dark:hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer shrink-0 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#8b2323]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE FLOATING BOTTOM DOCK
          Compact & Resized 5-item Navigation Dock (Paper Block)
      ────────────────────────────────────────────────────────────── */}
      <nav 
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-2.5 inset-x-0 z-40 flex justify-center px-2 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-0.5 p-1 rounded-full bg-[#faf7f0]/95 dark:bg-[#15161c]/95 backdrop-blur-xl border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] max-w-fit">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] font-bold transition-all duration-150 ${
                  isActive
                    ? '!bg-[#8b2323] !text-white border border-stone-900 shadow-[1px_1px_0px_#1c1917]'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
                style={isActive ? { backgroundColor: '#8b2323', color: '#ffffff' } : undefined}
              >
                <span className="shrink-0 scale-75 origin-center" style={isActive ? { color: '#ffffff' } : undefined}>
                  {item.icon}
                </span>
                <span className="leading-none pt-0.5" style={isActive ? { color: '#ffffff' } : undefined}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-14 bg-[#faf7f0]/98 dark:bg-[#15161c]/98 backdrop-blur-md border-b-2 border-stone-900 dark:border-stone-700 shadow-[0_6px_0px_#1c1917] px-5 py-5 z-50 flex flex-col space-y-4 transition-colors"
          >
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase">
                Navigation
              </span>
              <nav className="flex flex-col space-y-0.5 pt-0.5">
                {navItems.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? '!bg-[#8b2323] !text-white shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/60'
                      }`}
                      style={isActive ? { backgroundColor: '#8b2323', color: '#ffffff' } : undefined}
                    >
                      <span className="shrink-0" style={isActive ? { color: '#ffffff' } : undefined}>{item.icon}</span>
                      <span style={isActive ? { color: '#ffffff' } : undefined}>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                Contacts
              </span>
              <div className="flex flex-col space-y-1 text-sm font-semibold">
                <a
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                >
                  <DoodleEmail />
                  <span>pranavshende97@gmail.com</span>
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                >
                  <DoodleResume />
                  <span>View Resume (Google Drive)</span>
                </a>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <DoodleLinkedIn />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <DoodleGitHub />
                  </a>
                  <a
                    href="https://medium.com/@pranavshende97"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    aria-label="Medium"
                    title="Medium Articles"
                  >
                    <DoodleMedium />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span>© Pranav Shende 2026</span>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-[#8b2323] transition-colors"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          PROFILE DETAILS & PHOTO MODAL (Light-box Dialog - Portal)
          Opens on clicking the sidebar profile photo or name
      ────────────────────────────────────────────────────────────── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {profileModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-auto">
              {/* Fullscreen Backdrop Click to Close */}
              <div 
                className="absolute inset-0 bg-transparent"
                onClick={() => setProfileModalOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-lg max-h-[85dvh] sm:max-h-[88dvh] overflow-y-auto bg-[#faf7f0] dark:bg-[#16171b] rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] p-5 sm:p-8 space-y-5 overscroll-contain"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                  aria-label="Close profile modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Profile Card Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 pt-1">
                  {/* Large High-Res Photo View */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] bg-stone-100 dark:bg-stone-800 shrink-0">
                    <img
                      src={profilePhoto}
                      alt="Pranav Shende"
                      className="w-full h-full object-cover object-center scale-[1.7] translate-y-1"
                    />
                  </div>

                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 flex-1 pr-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/70 dark:border-blue-800/60 shadow-2xs">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>Open to Work • 2026</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight font-serif">
                      Pranav Shende
                    </h2>

                    <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 leading-tight">
                      Full Stack Developer & AI Engineer
                    </p>

                    <p className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Nagpur, Maharashtra, India</span>
                    </p>
                  </div>
                </div>

                {/* Bio / Summary */}
                <div className="space-y-1.5 border-t-2 border-stone-900/15 dark:border-stone-800 pt-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
                    About Me
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    Full-stack software engineer and IEEE-published researcher passionate about building scalable backend architectures, high-performance web systems, edge AI applications, and intuitive mobile solutions.
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-1.5 border-t-2 border-stone-900/15 dark:border-stone-800 pt-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
                    Education
                  </h3>
                  <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] space-y-0.5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#8b2323] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                        St. Vincent Pallotti College of Engineering and Technology
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 pl-6">
                      B.Tech in Information Technology • Nagpur (2022 – 2026)
                    </p>
                  </div>
                </div>

                {/* Core Technical Expertise */}
                <div className="space-y-2 border-t-2 border-stone-900/15 dark:border-stone-800 pt-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
                    Core Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'RAG & GenAI',
                      'Kafka Event Streams',
                      'Redis Caching',
                      'Full-Stack Systems',
                      'React 19 & Next.js',
                      'React Native & Expo',
                      'Node.js & Express',
                      'Python & Flask',
                      'PostgreSQL & Prisma',
                      'Google Gemini 2.5',
                      'TensorFlow Lite Edge AI',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs border-2 border-stone-900 dark:border-stone-700 shadow-[1.5px_1.5px_0px_#1c1917]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Links */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3.5 border-t-2 border-stone-900/15 dark:border-stone-800">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#fef08a] text-zinc-900 border-2 border-stone-900 text-xs sm:text-sm font-bold hover:bg-[#fde047] transition-all shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    <DoodleResume />
                    <span>View Resume</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  <a
                    href={emailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs sm:text-sm font-bold hover:bg-stone-800 dark:hover:bg-stone-200 border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <DoodleEmail />
                    <span>Send Email</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href={linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 text-stone-700 dark:text-stone-300 transition-colors flex items-center justify-center border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]"
                      title="LinkedIn Profile"
                      aria-label="LinkedIn"
                    >
                      <DoodleLinkedIn />
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 text-stone-700 dark:text-stone-300 transition-colors flex items-center justify-center border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]"
                      title="GitHub Profile"
                      aria-label="GitHub"
                    >
                      <DoodleGitHub />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
