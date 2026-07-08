import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, FolderOpen, Code2, User, Phone } from "lucide-react";

type TabId = "home" | "experience" | "projects" | "skills" | "about" | "contact";

interface MobileNavDockProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as TabId, label: "Home", icon: Home },
  { id: "experience" as TabId, label: "Work", icon: Briefcase },
  { id: "projects" as TabId, label: "Projects", icon: FolderOpen },
  { id: "skills" as TabId, label: "Skills", icon: Code2 },
  { id: "about" as TabId, label: "About", icon: User },
  { id: "contact" as TabId, label: "Contact", icon: Phone },
];

const MobileNavDock = ({ activeTab, onTabChange }: MobileNavDockProps) => {
  return (
    <div className="bottom-dock">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            className={`dock-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            whileTap={{ scale: 0.85 }}
          >
            <div className="dock-icon-wrap relative">
              <tab.icon
                size={16}
                className={isActive ? "text-white" : "text-white/40"}
              />
              {isActive && (
                <motion.div
                  layoutId="dock-active-indicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </div>
            <span
              className="text-[9px] font-semibold tracking-wide"
              style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.3)" }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export type { TabId };
export default MobileNavDock;
