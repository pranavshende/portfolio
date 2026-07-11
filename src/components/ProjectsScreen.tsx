import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  link?: string;
  badge?: string;
}

const projects: Project[] = [
  {
    title: "PashuRakshak",
    subtitle: "AI Livestock Disease Detection System",
    description: "An AI-powered livestock healthcare platform with 5+ modules using edge computing and TensorFlow Lite for offline disease detection and veterinary assistance.",
    tech: ["React Native (Expo)", "Node.js", "PostgreSQL", "Python", "CNN", "TensorFlow Lite"],
    highlights: [
      "5+ modules with offline-first edge computing",
      "CNN-based disease classification model",
      "15+ RESTful APIs connected",
      "IEEE Conference presentation & publication",
    ],
    badge: "IEEE Published",
    link: "#"
  },
  {
    title: "JanSampark",
    subtitle: "Smart Civic Grievance Platform",
    description: "Full-stack civic platform bridging citizens and administration. Built 25+ frontend modules in React Native with a secure Node.js backend featuring JWT + RBAC for 4 user roles.",
    tech: ["React Native", "Node.js", "PostgreSQL", "JWT", "RBAC"],
    highlights: [
      "25+ frontend modules in React Native",
      "JWT + RBAC for 4 user roles",
      "40+ RESTful APIs with PostgreSQL",
    ],
    link: "#"
  },
  {
    title: "Solar Intelligence",
    subtitle: "AI Sales Analytics Platform",
    description: "AI-driven solar sales intelligence platform analyzing 10+ years of data across 36+ Indian states with geospatial heatmaps and polynomial regression forecasting (2025–2030).",
    tech: ["Python", "PostgreSQL", "ETL", "ML", "Geospatial", "Recharts"],
    highlights: [
      "10+ years (2014–2024) of solar data",
      "81.8+ GW of installed capacity evaluated",
      "36+ states/UTs analyzed across 500+ records",
    ],
    link: "#"
  }
];

export const ProjectsScreen = () => {
  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
      <SectionHeader title="Featured Projects" />
      
      <div className="space-y-4">
        {projects.map((project, i) => (
          <a 
            key={i} 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">{project.title}</h3>
                  {project.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-medium text-emerald-400">
                      {project.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{project.subtitle}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5" />
            </div>
            
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            <ul className="mt-3 space-y-1">
              {project.highlights.map((h, j) => (
                <li key={j} className="text-[11px] text-zinc-500 flex gap-1.5">
                  <span className="text-emerald-500 flex-shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-400">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
