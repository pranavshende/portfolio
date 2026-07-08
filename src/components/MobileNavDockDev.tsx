import { motion } from "framer-motion";
import { ChevronDown, FileCode, FileJson, FileText, Terminal, Briefcase } from "lucide-react";
import { useMode } from "../contexts/ModeContext";

export type TabId = "home" | "experience" | "projects" | "skills" | "about" | "contact";

interface AppNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as TabId, label: "home.tsx", icon: FileCode },
  { id: "experience" as TabId, label: "experience.tsx", icon: FileCode },
  { id: "projects" as TabId, label: "projects.tsx", icon: FileCode },
  { id: "skills" as TabId, label: "skills.json", icon: FileJson },
  { id: "about" as TabId, label: "about.md", icon: FileText },
  { id: "contact" as TabId, label: "contact.sh", icon: Terminal },
];

/* ── Desktop Left Sidebar ─────────────────────── */
export const DesktopSidebar = ({ activeTab, onTabChange }: AppNavProps) => {
  const { mode, toggleMode } = useMode();
  return (
  <aside className="desktop-sidebar">
    <div className="sidebar-logo">
      <p className="text-sm font-mono text-[#8B949E] uppercase tracking-wider mb-2">Explorer</p>
      <div className="flex items-center gap-2 text-[#C9D1D9] font-mono text-sm cursor-default">
        <ChevronDown size={16} />
        <span>portfolio/</span>
      </div>
    </div>

    <nav className="flex flex-col">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`sidebar-nav-item ${isActive ? "active" : ""}`}
          >
            <tab.icon size={15} style={{ color: isActive ? "#58A6FF" : "#8B949E" }} />
            <span
              className="text-[13px] font-mono"
              style={{ color: isActive ? "#58A6FF" : "#C9D1D9" }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>

    <div className="flex-1" />

    <div className="px-4 pb-2 space-y-4">
      <button 
        onClick={toggleMode}
        className="w-full flex items-center justify-between px-3 py-2 rounded border border-[#30363D] bg-[#0D1117] hover:bg-[#161B22] transition-colors"
      >
        <span className="text-[11px] font-mono text-[#8B949E]">Mode:</span>
        <div className="flex items-center gap-1.5 text-[#C9D1D9]">
          <Briefcase size={12} className="text-[#8B949E]" />
          <span className="text-[11px] font-mono">Recruiter</span>
        </div>
      </button>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
        <span className="text-xs font-mono text-[#3FB950]">Open to Work</span>
      </div>
    </div>
  </aside>
  );
};

/* ── Mobile Bottom Dock ───────────────────────── */
export const MobileBottomDock = ({ activeTab, onTabChange }: AppNavProps) => {
  const { mode, toggleMode } = useMode();
  return (
  <>
  <div className="flex justify-between items-center p-3 border-b border-[#30363D] bg-[#0D1117] md:hidden">
    <div className="text-xs font-mono text-[#58A6FF]">~/$ whoami</div>
    <button onClick={toggleMode} className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#30363D] bg-[#161B22] text-[#C9D1D9]">
      <Briefcase size={12} className="text-[#8B949E]"/>
      <span className="text-[10px] font-mono">Recruiter Mode</span>
    </button>
  </div>
  <div className="bottom-dock">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <motion.button
          key={tab.id}
          className={`dock-item ${isActive ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="dock-icon-wrap relative">
            <tab.icon
              size={18}
              className={isActive ? "text-[#58A6FF]" : "text-[#8B949E]"}
            />
          </div>
          <span
            className="text-[9px] font-mono tracking-wide mt-1"
            style={{ color: isActive ? "#58A6FF" : "#8B949E" }}
          >
            {tab.label.split(".")[0]}
          </span>
        </motion.button>
      );
    })}
  </div>
  </>
  );
};

export default MobileBottomDock;
