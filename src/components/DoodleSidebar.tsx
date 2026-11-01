import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Menu, X, ExternalLink } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'About', path: '/about', icon: '😃' },
  { name: 'Art', path: '/art', icon: '🎨' },
  { name: 'Arcade', path: '/arcade', icon: '🎮' },
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
          DESKTOP FIXED SIDEBAR (md and above)
      ────────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col justify-between w-60 h-screen fixed left-0 top-0 bg-[#ffffff] border-r border-zinc-200/90 px-6 py-8 z-40 select-none overflow-y-auto">
        <div className="flex flex-col space-y-7">
          {/* Header / Brand */}
          <NavLink to="/" className="group flex flex-col">
            <div className="flex items-center gap-2.5">
              {/* Hand-drawn pencil icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-zinc-900 -rotate-12 transition-transform duration-300 group-hover:rotate-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
                <path d="M11 9l4 4" />
              </svg>
              <span className="font-doodle font-bold text-2xl text-zinc-900 tracking-wide">
                Pranav Shende
              </span>
            </div>
            <span className="font-doodle text-sm text-zinc-500 font-medium pl-8 mt-0.5 tracking-wide">
              Full Stack Developer
            </span>
          </NavLink>

          <hr className="border-t border-zinc-200/80 -mx-2" />

          {/* Navigation Section */}
          <div className="flex flex-col space-y-2">
            <span className="font-doodle text-xs font-bold tracking-widest text-zinc-400 uppercase px-3">
              Navigation
            </span>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`relative flex items-center gap-3 px-3.5 py-2 rounded-xl font-doodle text-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-[#fef08a] text-zinc-900 font-bold shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 font-medium'
                    }`}
                  >
                    <span className="text-lg leading-none">{item.icon}</span>
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
          <div className="flex flex-col space-y-2 pt-2">
            <span className="font-doodle text-xs font-bold tracking-widest text-zinc-400 uppercase px-3">
              Contacts
            </span>
            <div className="flex flex-col space-y-1">
              <a
                href={emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl font-doodle text-base font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
                title="Send email to pranavshende97@gmail.com"
              >
                <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors shrink-0" />
                <span className="pt-0.5">Email</span>
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl font-doodle text-base font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors shrink-0" />
                <span className="pt-0.5">LinkedIn</span>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl font-doodle text-base font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors shrink-0" />
                <span className="pt-0.5">GitHub</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl font-doodle text-base font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
                title="View Pranav's Resume on Google Drive"
              >
                <FileText className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors shrink-0" />
                <span className="pt-0.5">Resume</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-dashed border-zinc-200 text-zinc-500 font-doodle flex flex-col space-y-1">
          <p className="flex items-center gap-1.5 text-zinc-700 text-base font-semibold">
            <span>Doodled with love</span>
            <span className="text-red-500 text-base">❤️</span>
          </p>
          <p className="text-zinc-400 text-sm">© Pranav Shende 2026</p>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOP NAVBAR & DRAWER
      ────────────────────────────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-zinc-200/90 px-4 flex items-center justify-between z-50">
        <NavLink to="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-zinc-900 -rotate-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
            <path d="M11 9l4 4" />
          </svg>
          <span className="font-doodle font-bold text-xl text-zinc-900">
            Pranav Shende
          </span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 focus:outline-none"
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
            className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-zinc-200 px-6 py-6 shadow-xl z-50 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-1">
              <span className="font-doodle text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Navigation
              </span>
              <nav className="flex flex-col space-y-1 pt-1">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-doodle text-lg ${
                        isActive
                          ? 'bg-[#fef08a] text-zinc-900 font-bold'
                          : 'text-zinc-700 hover:bg-zinc-100 font-medium'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col space-y-2 border-t border-zinc-100 pt-4">
              <span className="font-doodle text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Contacts
              </span>
              <div className="flex flex-col space-y-2 pt-1 font-doodle text-base">
                <a
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg text-zinc-700 hover:bg-zinc-100"
                >
                  <Mail className="w-4 h-4 text-zinc-600" />
                  <span>pranavshende97@gmail.com</span>
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg text-zinc-700 hover:bg-zinc-100"
                >
                  <FileText className="w-4 h-4 text-zinc-600" />
                  <span>View Resume (Google Drive)</span>
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-sm text-zinc-400 font-doodle pt-2">
              Doodled with love ❤️ • © Pranav Shende 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
