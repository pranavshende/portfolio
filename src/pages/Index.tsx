import FloatingHeader from "@/components/FloatingHeader";
import FloatingDock from "@/components/FloatingDock";
import HomeScreen from "@/components/HomeScreen";
import ExperienceScreen from "@/components/ExperienceScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import SkillsMarquee from "@/components/SkillsMarquee";
import LiveActivity from "@/components/LiveActivity";
import FloatingCodeBackground from "@/components/FloatingCodeBackground";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-zinc-800/50">
      <FloatingCodeBackground />
      <FloatingHeader />
      
      <main className="flex flex-col items-center w-full overflow-x-hidden pt-24 pb-24 space-y-6">
        <section id="home" className="w-full flex justify-center">
          <HomeScreen />
        </section>

        <section id="experience" className="w-full flex justify-center">
          <ExperienceScreen />
        </section>

        <section id="projects" className="w-full flex justify-center">
          <ProjectsScreen />
        </section>

        <section id="skills" className="w-full flex justify-center">
          <SkillsMarquee />
        </section>

        <section id="activity" className="w-full flex justify-center">
          <LiveActivity />
        </section>
      </main>

      <FloatingDock />
      <Toaster />
    </div>
  );
};

export default Index;
