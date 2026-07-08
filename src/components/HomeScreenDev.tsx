import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Github, Linkedin, Mail, Phone, Briefcase, FolderOpen, Code2, User, Trophy, BookOpen, ArrowRight, Terminal } from "lucide-react";
import type { TabId } from "./MobileNavDock";

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
}

const appIcons = [
  { id: "experience" as TabId, label: "experience.tsx", icon: Briefcase },
  { id: "projects" as TabId, label: "projects.tsx", icon: FolderOpen },
  { id: "skills" as TabId, label: "skills.json", icon: Code2 },
  { id: "about" as TabId, label: "about.md", icon: User },
  { id: "contact" as TabId, label: "contact.sh", icon: Mail },
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
        {/* Terminal Boot Sequence Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="glass-card p-5 font-mono text-[13px] sm:text-sm space-y-4"
        >
          <div>
            <span className="text-[#3FB950] mr-2">➜</span>
            <span className="text-[#58A6FF]">~</span>
            <span className="text-[#C9D1D9] ml-2">$ whoami</span>
          </div>
          <div className="text-[#C9D1D9] pl-4 text-base font-bold">Pranav Shende</div>

          <div>
            <span className="text-[#3FB950] mr-2">➜</span>
            <span className="text-[#58A6FF]">~</span>
            <span className="text-[#C9D1D9] ml-2">$ cat role.txt</span>
          </div>
          <div className="text-[#C9D1D9] pl-4">Full Stack Developer — MERN + React Native</div>

          <div>
            <span className="text-[#3FB950] mr-2">➜</span>
            <span className="text-[#58A6FF]">~</span>
            <span className="text-[#C9D1D9] ml-2">$ status --check</span>
          </div>
          <div className="flex items-center gap-2 pl-4 text-[#C9D1D9]">
            <span className="w-2 h-2 rounded-full bg-[#3FB950]"></span>
            <span>Open to Internships</span>
            <span className="inline-block w-2 h-[15px] bg-[#C9D1D9] blink-cursor translate-y-[1px]"></span>
          </div>
        </motion.div>

        {/* JSON Stats Block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="glass-card p-4 font-mono text-[13px] leading-loose overflow-x-auto"
        >
          <div className="text-[#8B949E]">{'// profile.json'}</div>
          <div><span className="text-[#C9D1D9]">{'{'}</span></div>
          <div className="pl-4">
            <span className="text-[#58A6FF]">"apis_built"</span>
            <span className="text-[#C9D1D9]">: </span>
            <span className="text-[#3FB950]">"40+"</span>
            <span className="text-[#C9D1D9]">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[#58A6FF]">"internships"</span>
            <span className="text-[#C9D1D9]">: </span>
            <span className="text-[#D2A8FF]">2</span>
            <span className="text-[#C9D1D9]">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[#58A6FF]">"ieee_papers"</span>
            <span className="text-[#C9D1D9]">: </span>
            <span className="text-[#D2A8FF]">1</span>
            <span className="text-[#C9D1D9]">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[#58A6FF]">"cgpa"</span>
            <span className="text-[#C9D1D9]">: </span>
            <span className="text-[#D2A8FF]">8.3</span>
          </div>
          <div><span className="text-[#C9D1D9]">{'}'}</span></div>
        </motion.div>

        {/* App Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest">Files</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {appIcons.map((app, i) => (
              <motion.button
                key={app.id}
                onClick={() => onNavigate(app.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-center gap-3 p-3 glass-card hover:border-[#58A6FF] transition-colors"
              >
                <app.icon size={16} className="text-[#58A6FF]" />
                <span className="text-xs font-mono text-[#C9D1D9]">{app.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Current Focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="glass-card p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest">Running Processes</h3>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />
              <span className="text-[10px] font-mono text-[#3FB950]">Active</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-md bg-[#0D1117] border border-[#30363D] cursor-pointer group">
              <Terminal size={14} className="text-[#58A6FF]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-[#C9D1D9] truncate">node jansampark_dev.js</p>
                <p className="text-[10px] font-mono text-[#8B949E] truncate">NK SkillEdge • Android Intern</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-[#0D1117] border border-[#30363D] cursor-pointer group">
              <Terminal size={14} className="text-[#58A6FF]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-[#C9D1D9] truncate">python analyze_solar.py</p>
                <p className="text-[10px] font-mono text-[#8B949E] truncate">IT Daksh • Data Analyst</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          className="p-4 rounded-md glass-card"
        >
          <div className="flex items-center gap-3">
            <Trophy size={20} className="text-[#D2A8FF]" />
            <div>
              <p className="text-xs font-mono text-[#C9D1D9]">IEEE Published Researcher</p>
              <p className="text-[10px] font-mono text-[#8B949E] mt-1">Best Research Paper Award — ICTT</p>
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
