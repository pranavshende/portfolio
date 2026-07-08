import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneFrame from "@/components/PhoneFrame";
import MobileNavDock, { type TabId } from "@/components/MobileNavDock";
import HomeScreen from "@/components/HomeScreen";
import ExperienceScreen from "@/components/ExperienceScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import SkillsScreen from "@/components/SkillsScreen";
import AboutScreen from "@/components/AboutScreen";
import ContactScreen from "@/components/ContactScreen";

const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const tabOrder: TabId[] = ["home", "experience", "projects", "skills", "about", "contact"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: TabId) => {
    const currentIdx = tabOrder.indexOf(activeTab);
    const nextIdx = tabOrder.indexOf(tab);
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
    <PhoneFrame>
      {/* Screen Area */}
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
              stiffness: 320,
              damping: 35,
            }}
            className="absolute inset-0"
          >
            {screenMap[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Dock */}
      <MobileNavDock activeTab={activeTab} onTabChange={handleTabChange} />
    </PhoneFrame>
  );
};

export default Index;
