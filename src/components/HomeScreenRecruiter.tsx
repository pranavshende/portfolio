import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Github, Linkedin, Mail, Phone, Briefcase, FolderOpen, Code2, User, Trophy, BookOpen, ArrowRight } from "lucide-react";
import type { TabId } from "./MobileNavDock";

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
}

const appIcons = [
  { id: "experience" as TabId, label: "Work", icon: Briefcase, bg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { id: "projects" as TabId, label: "Projects", icon: FolderOpen, bg: "bg-amber-50", iconColor: "text-amber-600" },
  { id: "skills" as TabId, label: "Skills", icon: Code2, bg: "bg-teal-50", iconColor: "text-teal-600" },
  { id: "about" as TabId, label: "About", icon: User, bg: "bg-rose-50", iconColor: "text-rose-600" },
  { id: "contact" as TabId, label: "Contact", icon: Mail, bg: "bg-sky-50", iconColor: "text-sky-600" },
];

const quickStats = [
  { label: "APIs Built", value: 40, suffix: "+", border: "border-l-indigo-500", isFloat: false },
  { label: "Internships", value: 2, suffix: "", border: "border-l-amber-500", isFloat: false },
  { label: "IEEE Paper", value: 1, suffix: "", border: "border-l-teal-500", isFloat: false },
  { label: "CGPA", value: 8.3, suffix: "", border: "border-l-rose-500", isFloat: true },
];

const AnimatedCounter = ({ value, isFloat }: { value: number; isFloat: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => isFloat ? latest.toFixed(1) : Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, delay: 0.3, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

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
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            {/* Avatar + Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-xl font-bold text-zinc-900 shadow-lg">
                  PS
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight font-display tracking-normal">Pranav Shende</h1>
                  <p className="text-xs text-zinc-500 mt-1">Full Stack Developer</p>
                </div>
              </div>
              {/* Online badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 border border-black/10">
                <span className="pulse-dot" />
                <span className="text-[10px] font-semibold text-zinc-700">Open to Work</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
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
                  className="w-8 h-8 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center hover:bg-black/10 hover:border-black/20 transition-all"
                >
                  <s.icon size={13} className="text-zinc-600" />
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
              className={`glass-card p-3 text-center border-l-[3px] ${stat.border}`}
            >
              <div className="text-lg font-bold text-zinc-800">
                <AnimatedCounter value={stat.value} isFloat={stat.isFloat} />
                {stat.suffix}
              </div>
              <div className="text-[9px] text-zinc-500 font-medium leading-tight mt-0.5">{stat.label}</div>
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
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Explore</h2>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-5 gap-3">
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
                  className={`app-icon ${app.bg}`}
                  style={{ borderRadius: "12px" }}
                >
                  <app.icon size={22} className={app.iconColor} />
                </button>
                <span className="text-[10px] font-medium text-zinc-500 text-center">{app.label}</span>
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
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Currently</h3>
            <div className="flex items-center gap-1">
              <span className="pulse-dot" />
              <span className="text-[10px] text-zinc-700 font-medium">Active</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3 rounded-[12px] bg-black/5 border border-black/5 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Briefcase size={13} className="text-zinc-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-900 truncate">Android App Dev Intern</p>
                <p className="text-[10px] text-zinc-500 truncate">NK SkillEdge • JanSampark</p>
              </div>
              <ArrowRight size={12} className="text-zinc-400 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[12px] bg-black/5 border border-black/5 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <BookOpen size={13} className="text-zinc-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-900 truncate">Data Analyst Intern</p>
                <p className="text-[10px] text-zinc-500 truncate">IT Daksh • Solar Intelligence</p>
              </div>
              <ArrowRight size={12} className="text-zinc-400 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>

        {/* Achievement highlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="p-4 rounded-2xl overflow-hidden relative glass-card"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="text-2xl">🏆</div>
            <div>
              <p className="text-xs font-bold text-zinc-900">IEEE Published Researcher</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Best Research Paper Award — ICTT</p>
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
