import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Menu, X, ExternalLink } from 'lucide-react';
import profilePhoto from '../photo/profile_photo_wide.png';

// ── Hand-drawn outline doodle icons ──────────────────────────
const DoodleHouse = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
    <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
    <path d="M18 5.5V3h-2v4.2" />
  </svg>
);

const DoodleSmiley = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="8.5" cy="10" r="1.2" fill="currentColor" />
    <circle cx="15.5" cy="10" r="1.2" fill="currentColor" />
    <path d="M7.5 14c1.2 2 3.2 2.5 4.5 2.5s3.3-.5 4.5-2.5" />
  </svg>
);

const DoodlePalette = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1.5 4.5 3.5 5 1 .25 1.5.8 1.5 1.8 0 1.8 1.5 3.2 3.2 3.2h1.8c5.5 0 10-4.5 10-10C22 6.5 17.5 2 12 2Z" />
    <circle cx="7.5" cy="9.5" r="1.3" fill="currentColor" />
    <circle cx="11.5" cy="6.5" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="14" r="1.3" fill="currentColor" />
  </svg>
);

const DoodleGamepad = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="20" height="12" x="2" y="6" rx="6" />
    <path d="M6 12h4" />
    <path d="M8 10v4" />
    <circle cx="15" cy="11" r="1.2" fill="currentColor" />
    <circle cx="18" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

const DoodleEmail = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="20" height="15" x="2" y="4.5" rx="2" />
    <path d="m22 6-10 7L2 6" />
    <path d="m10 13-7 5.5" />
    <path d="m14 13 7 5.5" />
  </svg>
);

const DoodleLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M7.5 10.5v6" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
    <path d="M12 16.5v-3.5c0-1.2.8-2 2-2s2 .8 2 2v3.5" />
    <path d="M12 10.5v6" />
  </svg>
);

const DoodleGitHub = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const DoodleResume = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-zinc-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h6" />
  </svg>
);

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: <DoodleHouse /> },
  { name: 'About', path: '/about', icon: <DoodleSmiley /> },
  { name: 'Art', path: '/art', icon: <DoodlePalette /> },
  { name: 'Arcade', path: '/arcade', icon: <DoodleGamepad /> },
];

export const DoodleSidebar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact links from previous website
  const emailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com";
  const resumeUrl = "https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing";
  const linkedInUrl = "https://linkedin.com/in/pranavshende";
  const githubUrl = "https://github.com/PranavShende";

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP FIXED SIDEBAR
          Clean, perfectly proportioned, 100% fixed with zero scrollbar
      ────────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col justify-between w-60 h-screen fixed left-0 top-0 bg-[#ffffff] border-r border-zinc-200/80 px-5 py-5 z-40 select-none overflow-hidden font-sans">
        <div className="flex flex-col space-y-3.5">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            {/* Circular Profile Photo */}
            <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-zinc-900 shadow-xs bg-zinc-100 mb-1.5">
              <img
                src={profilePhoto}
                alt="Pranav Shende"
                className="w-full h-full object-cover object-center scale-[1.7] translate-y-2"
              />
            </div>

            {/* Blue Open to Work Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold tracking-wide border border-blue-200/70 mb-1.5 shadow-2xs">
              <Briefcase className="w-3 h-3 text-blue-600 shrink-0" />
              <span>Open to Work</span>
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight leading-none font-display">
              Pranav Shende
            </h1>

            {/* Title */}
            <p className="text-xs font-semibold text-zinc-500 mt-1 leading-none">
              Full Stack Developer
            </p>

            {/* Location */}
            <p className="inline-flex items-center gap-1 text-[11px] text-zinc-400 font-medium mt-1 leading-none">
              <MapPin className="w-2.5 h-2.5 text-zinc-400" />
              <span>Nagpur, India</span>
            </p>
          </div>

          <hr className="border-t border-zinc-200/70 -mx-2" />

          {/* Navigation Section */}
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase px-3">
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
                    className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#fef08a] text-zinc-900 font-bold shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="leading-none pt-0.5">{item.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-xl bg-[#fef08a] -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col space-y-1 pt-0.5">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase px-3">
              Contacts
            </span>
            <div className="flex flex-col space-y-0.5 pt-0.5">
              <a
                href={emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
                title="Send email to pranavshende97@gmail.com"
              >
                <DoodleEmail />
                <span className="pt-0.5">Email</span>
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
              >
                <DoodleLinkedIn />
                <span className="pt-0.5">LinkedIn</span>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
              >
                <DoodleGitHub />
                <span className="pt-0.5">GitHub</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
                title="View Pranav's Resume on Google Drive"
              >
                <DoodleResume />
                <span className="pt-0.5">Resume</span>
                <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="pt-2 border-t border-dashed border-zinc-200 text-zinc-400 flex items-center justify-between text-[11px]">
          <span>© Pranav Shende 2026</span>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOP NAVBAR & DRAWER
      ────────────────────────────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 flex items-center justify-between z-50">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-900">
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover scale-[1.7] translate-y-1"
            />
          </div>
          <div>
            <span className="font-bold text-base text-zinc-900 leading-none block">
              Pranav Shende
            </span>
            <span className="text-[10px] text-blue-600 font-semibold leading-none block mt-0.5">
              Open to Work
            </span>
          </div>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-14 bg-white border-b border-zinc-200 px-5 py-5 shadow-xl z-50 flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold ${
                        isActive
                          ? 'bg-[#fef08a] text-zinc-900 font-bold'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-zinc-100 pt-3">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                Contacts
              </span>
              <div className="flex flex-col space-y-1 text-sm font-semibold">
                <a
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100"
                >
                  <DoodleEmail />
                  <span>pranavshende97@gmail.com</span>
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100"
                >
                  <DoodleResume />
                  <span>View Resume (Google Drive)</span>
                </a>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                    aria-label="LinkedIn"
                  >
                    <DoodleLinkedIn />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                    aria-label="GitHub"
                  >
                    <DoodleGitHub />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 pt-2 border-t border-dashed border-zinc-200">
              © Pranav Shende 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
