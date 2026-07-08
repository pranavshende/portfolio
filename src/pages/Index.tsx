import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StatusBar } from "@/components/PhoneFrame";
import { DesktopSidebar, MobileBottomDock, type TabId } from "@/components/MobileNavDock";
import HomeScreen from "@/components/HomeScreen";
import ExperienceScreen from "@/components/ExperienceScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import SkillsScreen from "@/components/SkillsScreen";
import AboutScreen from "@/components/AboutScreen";
import ContactScreen from "@/components/ContactScreen";
import { Toaster } from "@/components/ui/toaster";

/* ── Screen slide animation ── */
const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "8%" : "-8%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "8%" : "-8%",
    opacity: 0,
    scale: 0.98,
  }),
};

const tabOrder: TabId[] = ["home", "experience", "projects", "skills", "about", "contact"];

const tabTitles: Record<TabId, string> = {
  home: "Pranav Shende",
  experience: "Work Experience",
  projects: "Featured Projects",
  skills: "Technical Skills",
  about: "About Me",
  contact: "Get in Touch",
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: TabId) => {
    const currentIdx = tabOrder.indexOf(activeTab);
    const nextIdx = tabOrder.indexOf(tab);
    if (tab === activeTab) return;
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setActiveTab(tab);
  };

  const screenMap: Record<TabId, React.ReactNode> = {
    home: <HomeScreen onNavigate={handleTabChange} />,
    experience: <ExperienceScreen />,
    projects: <ProjectsScreen />,
    skills: <SkillsScreen />,
    about: <AboutScreen />,
    contact: <ContactScreen />,
  };

  return (
    <div className="app-layout">
      {/* ── Desktop Left Sidebar (hidden on mobile) ── */}
      <DesktopSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* ── Main Content Column ── */}
      <div className="desktop-content">

        {/* Desktop top bar (hidden on mobile) */}
        <div className="desktop-topbar">
          <div>
            <h1 className="text-lg font-mono font-bold text-[#C9D1D9] tracking-normal">~/{tabTitles[activeTab].toLowerCase().replace(/ /g, '-')}</h1>
            <p className="text-[11px] font-mono text-[#8B949E] mt-1">
              {activeTab === "home" ? "Full Stack Developer · IEEE Researcher" : "Pranav Shende"}
            </p>
          </div>
          {/* Right side — status pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={{ border: "1px solid #30363D" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#3FB950] flex-shrink-0" />
            <span className="text-xs font-mono text-[#3FB950]">Open to Internships</span>
          </div>
        </div>

        {/* Mobile status bar (visible on mobile only) */}
        <StatusBar />

        {/* Animated screen area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 36,
                mass: 0.9,
              }}
              className="absolute inset-0"
            >
              {screenMap[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile bottom dock (hidden on desktop) */}
        <MobileBottomDock activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <Toaster />
    </div>
  );
};

export default Index;
