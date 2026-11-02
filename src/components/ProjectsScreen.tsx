import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

import jansamparkPhoto from '../photo/jansampark.png';
import solarAnalyticsPhoto from '../photo/solar_analytics.png';
import pashurakshakPhoto from '../photo/pashurakshak.png';
import attritionBanner from '../photo/attrition_banner.png';
import tastifyyBanner from '../photo/tastifyy_banner.png';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  badge?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "JanSampark",
    subtitle: "Civic Grievance Platform (Redis & Kafka Dispatch)",
    description: "Full-stack civic platform bridging citizens and administration. Built 25+ frontend modules in React Native with Kafka event queues, Redis caching, and a secure Node.js backend featuring JWT + RBAC for 4 user roles.",
    tech: ["Redis", "Kafka", "React Native", "Node.js", "PostgreSQL", "JWT", "RBAC"],
    highlights: [
      "25+ frontend modules in React Native",
      "Kafka event queues & Redis state caching",
      "JWT + RBAC for 4 user roles & 40+ RESTful APIs",
    ],
    github: "private",
    demo: "/arcade?folder=projects_folder",
    image: jansamparkPhoto
  },
  {
    title: "Employee Attrition AI",
    subtitle: "RAG-Grounded Workforce Analytics & Predictive Copilot",
    description: "End-to-end RAG-grounded AI workforce attrition analysis dashboard and conversational copilot with instant dynamic CSV dataset ingestion, Redis caching, 11 interactive visualizations, and Gemini 2.5 Flash copilot.",
    tech: ["RAG AI", "Google Gemini 2.5", "Redis Cache", "React 19", "Flask", "Python", "Pandas", "Chart.js"],
    highlights: [
      "Instant dynamic CSV ingestion with automatic column detection",
      "11 interactive Chart.js visualizations & root-cause driver ranking",
      "High-risk employee watchlist table with composite flight risk scores",
      "RAG AI Copilot grounded in dataset metrics with Redis query caching",
    ],
    badge: "RAG AI Intelligence",
    github: "https://github.com/pranavshende/EmployeeAttritionSystem",
    image: attritionBanner
  },
  {
    title: "Tastifyy",
    subtitle: "Scalable Food Logistics with Kafka Event Bus & Redis Caching",
    description: "On-demand food delivery platform featuring dual client surfaces (React 19 Web + Expo App), Kafka event-driven dispatch pipelines, Redis geospatial caching, Express + TypeScript backend, Prisma ORM with Supabase PostgreSQL, and live Socket.io tracking.",
    tech: ["Kafka", "Redis", "AI Dispatch", "React 19", "React Native", "TypeScript", "Node.js", "Express", "Prisma", "Socket.io"],
    highlights: [
      "Dual client interfaces: React 19 web portal & React Native (Expo) app",
      "Kafka event queue & Redis geospatial cache for delivery logistics",
      "4-role architecture: Customer, Restaurant, Delivery Driver, Admin",
      "Real-time event dispatching & live driver tracking with Socket.io",
    ],
    badge: "Production Shipped",
    github: "https://github.com/pranavshende/tastifyy",
    demo: "https://www.tastifyy.in",
    image: tastifyyBanner
  },
  {
    title: "Solar Intelligence",
    subtitle: "AI Time-Series Analytics & Kafka Stream Ingestion",
    description: "AI-driven solar sales intelligence platform analyzing 10+ years of data across 36+ Indian states with Kafka stream ingestion, geospatial heatmaps, and polynomial regression forecasting (2025–2030).",
    tech: ["AI & ML", "Kafka Streams", "Python", "PostgreSQL", "ETL", "ML", "Geospatial", "Recharts"],
    highlights: [
      "10+ years (2014–2024) of solar data & Kafka stream ingestion",
      "81.8+ GW of installed capacity evaluated",
      "36+ states/UTs analyzed across 500+ records",
    ],
    github: "https://github.com/pranavshende/SolarSalesAnalysis",
    demo: "/playgames?folder=projects_folder",
    image: solarAnalyticsPhoto
  },
  {
    title: "PashuRakshak",
    subtitle: "Edge AI Livestock Disease Detection & Redis Sync",
    description: "An Edge AI livestock healthcare platform with 5+ modules using TensorFlow Lite and CNNs for offline disease detection with real-time Redis sync.",
    tech: ["Edge AI", "TensorFlow Lite", "CNN", "Redis Sync", "React Native (Expo)", "Node.js", "PostgreSQL"],
    highlights: [
      "5+ modules with offline-first edge computing",
      "CNN-based disease classification model via TensorFlow Lite",
      "Real-time Redis data synchronization",
      "IEEE Conference presentation & publication",
    ],
      "15+ RESTful APIs connected",
      "IEEE Conference presentation & publication",
    ],
    badge: "IEEE Published",
    github: "https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2",
    demo: "/playgames?folder=projects_folder",
    image: pashurakshakPhoto
  }
];

export const ProjectsScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
        <SectionHeader title="Featured Projects" />
        
        {/* Desktop View (Standard vertical list with split row cards) */}
        <div className="hidden sm:block space-y-4 mt-6">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="group flex flex-col sm:flex-row rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden"
            >
              {/* Image Banner Left Side */}
              <div className="relative w-full sm:w-48 overflow-hidden bg-zinc-950 border-b sm:border-b-0 sm:border-r border-zinc-800/80 flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy" 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    project.title === 'JanSampark' ? 'object-left' : 'object-center'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent pointer-events-none" />
              </div>

              <div className="flex-grow p-5">
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
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-medium text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  {project.github && project.github !== "private" && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-medium transition-colors border border-zinc-700"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub Source
                    </a>
                  )}
                  {project.github === "private" && (
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-500 text-[11px] font-medium border border-zinc-800 cursor-not-allowed"
                      title="Currently this repo is private"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Private Repository
                    </div>
                  )}
                  {project.demo && (
                    <Link 
                      to={project.demo} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-medium transition-colors border border-emerald-500/30"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      View in Arcade
                      <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View (Sliding Overlapping Cards with Top Banners) */}
        <div className="sm:hidden">
          <div 
            className="relative w-full overflow-x-auto no-scrollbar py-8 -my-4 px-2 -mx-2"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onTouchStart={() => setIsExpanded(true)}
          >
            <div className="flex items-stretch min-w-max px-2 py-4">
              {projects.map((project, i) => (
                <motion.div 
                  key={i} 
                  animate={{
                    marginLeft: isExpanded ? (i === 0 ? 0 : 16) : (i === 0 ? 0 : -220),
                    rotate: isExpanded ? 0 : (i * 3),
                    y: isExpanded ? 0 : (i * 8),
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 25, 
                    delay: isExpanded ? i * 0.05 : (projects.length - i) * 0.05 
                  }}
                  className="flex-shrink-0 w-[280px] flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] transition-colors min-h-[460px]"
                  style={{ 
                    zIndex: projects.length - i,
                  }}
                >
                  {/* Image Banner */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy" 
                      className={`w-full h-full object-cover ${
                        project.title === 'JanSampark' ? 'object-left' : 'object-center'
                      }`}
                    />
                  </div>

                  <div className="flex-grow p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                          {project.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-medium text-emerald-400">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{project.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>

                    <ul className="mt-2 space-y-1">
                      {project.highlights.map((h, j) => (
                        <li key={j} className="text-[10px] text-zinc-500 flex gap-1.5">
                          <span className="text-emerald-500 flex-shrink-0">•</span>
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[9px] font-medium text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2 pt-4">
                      {project.github && project.github !== "private" && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-medium transition-colors border border-zinc-700"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                      {project.github === "private" && (
                        <div 
                          className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/50 text-zinc-500 text-[11px] font-medium border border-zinc-800 cursor-not-allowed"
                          title="Currently this repo is private"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Private
                        </div>
                      )}
                      {project.demo && (
                        <Link 
                          to={project.demo} 
                          className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-medium transition-colors border border-emerald-500/30"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          Arcade
                          <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70" />
                        </Link>
                      )}
                    </div>
                  </div>
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

export default ProjectsScreen;
