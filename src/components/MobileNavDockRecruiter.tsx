import { motion } from "framer-motion";
import { ChevronDown, FileCode, FileJson, FileText, Terminal, TerminalSquare } from "lucide-react";
import { useMode } from "../contexts/ModeContext";

export type TabId = "home" | "experience" | "projects" | "skills" | "about" | "contact";

interface AppNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as TabId, label: "Home", icon: FileCode },
  { id: "experience" as TabId, label: "Experience", icon: FileCode },
  { id: "projects" as TabId, label: "Projects", icon: FileCode },
  { id: "skills" as TabId, label: "Skills", icon: FileJson },
  { id: "about" as TabId, label: "About", icon: FileText },
  { id: "contact" as TabId, label: "Contact", icon: Terminal },
];

export const DesktopSidebar = ({ activeTab, onTabChange }: AppNavProps) => {
  const { toggleMode } = useMode();
  return (
    <aside className="desktop-sidebar bg-[#FAFAF9] border-r border-[#E8E6E1]">
      <div className="sidebar-logo">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Portfolio</p>
        <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm cursor-default">
          <ChevronDown size={16} />
          <span>Pranav Shende</span>
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
              <tab.icon size={15} className={isActive ? "text-indigo-600" : "text-zinc-400"} />
              <span
                className="text-[13px] font-semibold"
                style={{ color: isActive ? "#3730A3" : "#52525B" }}
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
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100"
        >
          <span className="text-xs font-semibold text-indigo-900">Mode:</span>
          <div className="flex items-center gap-1.5 text-indigo-700">
            <TerminalSquare size={13} />
            <span className="text-xs font-semibold">Dev</span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs font-semibold text-zinc-600">Open to Work</span>
        </div>
      </div>
    </aside>
  );
};

export const MobileBottomDock = ({ activeTab, onTabChange }: AppNavProps) => {
  const { toggleMode } = useMode();
  return (
    <>
      <div className="flex justify-between items-center p-3 bg-stone-50 border-b border-[#E8E6E1] md:hidden">
        <div className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-[10px] font-bold">PS</div>
          Pranav Shende
        </div>
        <button onClick={toggleMode} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700">
          <TerminalSquare size={12} />
          <span className="text-[10px] font-semibold">Dev Mode</span>
        </button>
      </div>
      <div className="bottom-dock bg-white/80 backdrop-blur-xl border-t border-[#E8E6E1]">
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
                  className={isActive ? "text-indigo-600" : "text-zinc-400"}
                />
              </div>
              <span
                className="text-[9px] font-semibold tracking-wide mt-1"
                style={{ color: isActive ? "#3730A3" : "#71717A" }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
};

export default MobileBottomDock;
