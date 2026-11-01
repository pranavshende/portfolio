import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Menu, X, ExternalLink } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
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

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP FIXED SIDEBAR (Visible on md and above)
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
              <span className="font-bold text-lg text-zinc-900 tracking-tight font-display">
                Pranav Shende
              </span>
            </div>
            <span className="text-xs text-zinc-500 font-medium pl-8 mt-0.5">
              Product Designer & Engineer
            </span>
          </NavLink>

          <hr className="border-t border-zinc-200/80 -mx-2" />

          {/* Navigation Section */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase px-3">
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
                    className={`relative flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#fef08a] text-zinc-900 font-bold shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80'
                    }`}
                  >
                    <span className="text-base leading-none">{item.icon}</span>
                    <span className="font-sans">{item.name}</span>

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
            <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase px-3">
              Contacts
            </span>
            <div className="flex flex-col space-y-1">
              <a
                href="mailto:pranavshende97@gmail.com"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <span>Email</span>
              </a>

              <a
                href="https://linkedin.com/in/pranavshende"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/PranavShende"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <span>GitHub</span>
              </a>

              <a
                href="https://raw.githubusercontent.com/PranavShende/Resume/main/Pranav_Shende_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                <FileText className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <span>Resume</span>
                <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-dashed border-zinc-200 text-xs text-zinc-500 font-doodle flex flex-col space-y-1">
          <p className="flex items-center gap-1.5 text-zinc-600 text-sm">
            <span>Doodled with love</span>
            <span className="text-red-500 text-base">❤️</span>
          </p>
          <p className="text-zinc-400 text-xs font-sans">© Pranav Shende 2026</p>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOP NAVBAR & DRAWER (Visible on mobile/tablet < md)
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
          <span className="font-bold text-base text-zinc-900 font-display">
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
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium ${
                        isActive
                          ? 'bg-[#fef08a] text-zinc-900 font-bold'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col space-y-1 border-t border-zinc-100 pt-4">
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                Contacts
              </span>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="mailto:pranavshende97@gmail.com"
                  className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/pranavshende"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/PranavShende"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://raw.githubusercontent.com/PranavShende/Resume/main/Pranav_Shende_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:text-zinc-950"
                  aria-label="Resume"
                >
                  <FileText className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-xs text-zinc-400 font-doodle pt-2">
              Doodled with love ❤️ • © Pranav Shende 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
