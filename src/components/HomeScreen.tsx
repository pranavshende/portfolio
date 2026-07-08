import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Briefcase, FolderOpen, Code2, User, Trophy, BookOpen, ArrowRight } from "lucide-react";
import type { TabId } from "./MobileNavDock";

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
}

const appIcons = [
  {
    id: "experience" as TabId,
    label: "Work",
    icon: Briefcase,
    gradient: "from-violet-600 to-purple-700",
    glow: "rgba(124,58,237,0.4)",
  },
  {
    id: "projects" as TabId,
    label: "Projects",
    icon: FolderOpen,
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.4)",
  },
  {
    id: "skills" as TabId,
    label: "Skills",
    icon: Code2,
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    id: "about" as TabId,
    label: "About",
    icon: User,
    gradient: "from-orange-500 to-amber-600",
    glow: "rgba(249,115,22,0.4)",
  },
  {
    id: "contact" as TabId,
    label: "Contact",
    icon: Mail,
    gradient: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.4)",
  },
];

const quickStats = [
  { label: "APIs Built", value: "40+", color: "#a78bfa" },
  { label: "Internships", value: "2", color: "#06b6d4" },
  { label: "IEEE Paper", value: "1", color: "#10b981" },
  { label: "CGPA", value: "8.3", color: "#f59e0b" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/PranavShende", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/pranavshende", label: "LinkedIn" },
  { icon: Mail, href: "mailto:pranavshende97@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+918421358609", label: "Phone" },
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="app-screen bg-dots">
      <div className="screen-content space-y-5">

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card-violet p-5 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/15 rounded-full blur-2xl" />

          <div className="relative z-10">
            {/* Avatar + Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                  PS
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white leading-tight">Pranav Shende</h1>
                  <p className="text-xs text-white/50 mt-0.5">Full Stack Developer</p>
                </div>
              </div>
              {/* Online badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                <span className="pulse-dot" />
                <span className="text-[10px] font-semibold text-emerald-400">Open to Work</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-white/55 leading-relaxed mb-4">
              MERN + React Native developer. IEEE-published researcher. Building AI-powered civic & agri platforms. SVPCET '27.
            </p>

            {/* Social row */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-violet-500/40 transition-all"
                >
                  <s.icon size={13} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-4 gap-2"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 300 }}
              className="glass-card p-3 text-center"
            >
              <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[9px] text-white/40 font-medium leading-tight mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* App Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Explore</h2>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {appIcons.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.25 + i * 0.07,
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                }}
                className="flex flex-col items-center gap-2"
              >
                <button
                  onClick={() => onNavigate(app.id)}
                  className="app-icon"
                  style={{
                    background: `linear-gradient(135deg, ${app.gradient.includes("violet") ? "#7c3aed, #9333ea" : app.gradient.includes("cyan") ? "#0891b2, #1d4ed8" : app.gradient.includes("emerald") ? "#059669, #0d9488" : app.gradient.includes("orange") ? "#ea580c, #d97706" : "#e11d48, #db2777"})`,
                    boxShadow: `0 8px 20px ${app.glow}`,
                  }}
                >
                  <app.icon size={22} className="text-white" />
                </button>
                <span className="text-[10px] font-medium text-white/50 text-center">{app.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="glass-card p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Currently</h3>
            <div className="flex items-center gap-1">
              <span className="pulse-dot" />
              <span className="text-[10px] text-emerald-400 font-medium">Active</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="w-8 h-8 rounded-xl bg-violet-600/20 flex items-center justify-center">
                <Briefcase size={13} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/90 truncate">Android App Dev Intern</p>
                <p className="text-[10px] text-white/40 truncate">NK SkillEdge • JanSampark</p>
              </div>
              <ArrowRight size={12} className="text-white/20 flex-shrink-0" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="w-8 h-8 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                <BookOpen size={13} className="text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/90 truncate">Data Analyst Intern</p>
                <p className="text-[10px] text-white/40 truncate">IT Daksh • Solar Intelligence</p>
              </div>
              <ArrowRight size={12} className="text-white/20 flex-shrink-0" />
            </div>
          </div>
        </motion.div>

        {/* Achievement highlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="p-4 rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(124,58,237,0.2)"
          }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-violet-600/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="text-2xl">🏆</div>
            <div>
              <p className="text-xs font-bold text-white/90">IEEE Published Researcher</p>
              <p className="text-[10px] text-white/40 mt-0.5">Best Research Paper Award — ICTT</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
};

export default HomeScreen;
