import React from 'react';
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
  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
      <SectionHeader title="Where I've worked" />
      
      <div className="space-y-3">
        {experiences.map((exp, i) => (
          <div 
            key={i} 
            className="group flex flex-col p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
            onClick={() => setExpanded(expanded === i ? null : i)}
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
            {expanded === i && (
              <ul className="mt-4 space-y-2 ml-[52px]">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-zinc-400 leading-relaxed flex gap-2">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {/* Expand hint */}
            <div className="mt-3 ml-[52px]">
              <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors">
                {expanded === i ? '▲ collapse' : '▼ expand details'}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ExperienceScreen;
