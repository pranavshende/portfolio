import React from 'react';
import SectionHeader from './SectionHeader';
import { 
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiC,
  SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiGooglecloud,
  SiVercel, SiPostman, SiSupabase, SiCss, SiHtml5
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

const row1 = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "SQL", icon: FaDatabase, color: "#336791" },
];

const row2 = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
];

const renderMarqueeRow = (items: typeof row1, reverse = false) => {
  const duplicatedItems = [...items, ...items];
  const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  
  return (
    <div className="relative flex overflow-hidden group">
      {/* Fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      
      <div className={`flex shrink-0 ${animationClass} gap-3 pr-3 group-hover:[animation-play-state:paused]`}>
        {duplicatedItems.map((item, j) => {
          const Icon = item.icon;
          return (
            <span 
              key={j} 
              className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-default shadow-sm backdrop-blur-sm"
            >
              <Icon className="w-4 h-4" style={{ color: item.color }} />
              {item.name}
            </span>
          );
        })}
      </div>
      
      <div className={`flex shrink-0 ${animationClass} gap-3 pr-3 group-hover:[animation-play-state:paused]`} aria-hidden="true">
        {duplicatedItems.map((item, j) => {
          const Icon = item.icon;
          return (
            <span 
              key={`dup-${j}`} 
              className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-default shadow-sm backdrop-blur-sm"
            >
              <Icon className="w-4 h-4" style={{ color: item.color }} />
              {item.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const SkillsMarquee = () => {
  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
        <SectionHeader title="Tools that I have used" className="mt-0" />
        <div className="flex flex-col gap-4">
          {renderMarqueeRow(row1, false)}
          {renderMarqueeRow(row2, true)}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
