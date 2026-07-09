import React from 'react';
import SectionHeader from './SectionHeader';

const skillGroups = [
  {
    label: "Languages",
    skills: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "C", "C++"]
  },
  {
    label: "Development",
    skills: ["Node.js", "React", "React Native", "Express.js", "MongoDB", "REST APIs", "Vite"]
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Docker", "Kubernetes", "GCP", "Vercel", "Postman", "Supabase", "VS Code"]
  }
];

const SkillsMarquee = () => {
  const allSkills = skillGroups.flatMap(g => g.skills);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <SectionHeader title="Tools that I have used" />
      
      <div className="space-y-6">
        {skillGroups.map((group, i) => (
          <div key={i} className="space-y-2">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">{group.label}</span>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, j) => (
                <span 
                  key={j} 
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;
