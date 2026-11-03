import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    company: "NK SkillEdge Pvt. Ltd.",
    role: "Android Application Developer Intern (Full Stack)",
    period: "May 2026 – Present",
    location: "Nagpur, India",
    bullets: [
      "Spearheaded core development of JanSampark, a smart civic grievance platform, engineering 25+ frontend modules using React Native.",
      "Architected a robust Node.js backend secured by a JWT and RBAC framework for 4 user roles, effectively safeguarding sensitive citizen data.",
      "Authored and optimized 40+ RESTful APIs with PostgreSQL, mitigating endpoint vulnerabilities and reducing database query response times.",
    ]
  },
  {
    company: "IT Daksh",
    role: "Data Analyst Intern (Solar Sales Intelligence)",
    period: "Jan 2026 – Present",
    location: "PI: Ms. Pooja Arora",
    bullets: [
      "Analyzed 10+ years (2014–2024) of solar installation metrics across 36+ Indian states/UTs using Python and PostgreSQL.",
      "Optimized data pipelines via advanced ETL and data cleaning, reducing dashboard latency and maximizing runtime query efficiency.",
      "Built an AI-driven sales intelligence platform with geospatial heatmaps and 2025–2030 polynomial regression forecasting covering 81.8+ GW.",
    ]
  },
  {
    company: "Technex SVPCET",
    role: "Backend Developer & Advisor",
    period: "Dec 2024 – Jan 2026",
    location: "Nagpur, India",
    bullets: [
      "Architected highly scalable backend infrastructure on GCP handling 3,000+ registrations and 100,000+ impressions with minimal overhead.",
      "Streamlined financial infrastructure by integrating secure payment gateways and configuring RBAC for 3 user tiers.",
      "Maintained production uptime during the national techfest by identifying and debugging 20+ critical live-production issues.",
    ]
  }
];

export const ExperienceScreen = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isExpandedSlider, setIsExpandedSlider] = useState(false);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
        <SectionHeader title="Where I've worked" />
        
        {/* Desktop View (Standard vertical accordion list) */}
        <div className="hidden sm:block space-y-3 mt-6">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="group flex flex-col p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-zinc-300 font-semibold text-sm">{exp.company.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white">{exp.company}</span>
                    <span className="text-xs text-zinc-400">{exp.role}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start sm:items-end gap-0.5 ml-[52px] sm:ml-0 flex-shrink-0">
                  <span className="text-[11px] text-zinc-400 font-mono tracking-wider">{exp.period}</span>
                  <span className="text-[10px] text-zinc-600">{exp.location}</span>
                </div>
              </div>
              
              {/* Expandable bullet points */}
              <ul className="mt-4 space-y-2 ml-[52px]">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-zinc-400 leading-relaxed flex gap-2">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile View (Sliding Overlapping Cards) */}
        <div className="sm:hidden mt-2">
          <div 
            className="relative w-full overflow-x-auto no-scrollbar py-8 -my-4 px-2 -mx-2"
            onMouseEnter={() => setIsExpandedSlider(true)}
            onMouseLeave={() => setIsExpandedSlider(false)}
            onTouchStart={() => setIsExpandedSlider(true)}
          >
            <div className="flex items-stretch min-w-max px-2 py-4">
              {experiences.map((exp, i) => (
                <motion.div 
                  key={i} 
                  animate={{
                    marginLeft: isExpandedSlider ? (i === 0 ? 0 : 16) : (i === 0 ? 0 : -220),
                    rotate: isExpandedSlider ? 0 : (i * 3),
                    y: isExpandedSlider ? 0 : (i * 8),
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 25, 
                    delay: isExpandedSlider ? i * 0.05 : (experiences.length - i) * 0.05 
                  }}
                  className="flex-shrink-0 w-[280px] flex flex-col p-5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] transition-colors min-h-[220px]"
                  style={{ 
                    zIndex: experiences.length - i,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-zinc-300 font-semibold text-sm">{exp.company.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white">{exp.company}</span>
                      <span className="text-[10px] text-zinc-400 font-mono tracking-wider">{exp.period}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-emerald-400 font-medium leading-relaxed">{exp.role}</div>
                    <div className="text-[10px] text-zinc-600 mt-1">{exp.location}</div>
                  </div>
                  
                  <ul className="mt-2 mb-4 space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-[11px] text-zinc-400 leading-relaxed flex gap-2">
                        <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <p className="text-[10px] text-zinc-500 flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <span>Swipe to expand cards horizontally</span>
              <ArrowUpRight className="w-3 h-3 ml-1 opacity-70" />
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExperienceScreen;
