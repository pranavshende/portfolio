import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import FloatingDock from '@/components/FloatingDock';
import FloatingCodeBackground from '@/components/FloatingCodeBackground';
import { Github, Smartphone, ArrowUpRight, Star, GitFork } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactSection from '@/components/ContactSection';

import jansamparkPhoto from '../photo/jansampark.png';
import solarAnalyticsPhoto from '../photo/solar_analytics.png';
import pashurakshakPhoto from '../photo/pashurakshak.png';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  badge?: string;
  gradient: string;
  image: string;
}

const projects: Project[] = [
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
    github: "private",
    demo: "/playgames?folder=projects_folder",
    gradient: "from-blue-500 to-indigo-600",
    image: jansamparkPhoto
  },
  {
    title: "Solar Intelligence",
    subtitle: "AI Sales Analytics Platform",
    description: "AI-driven solar sales intelligence platform analyzing 10+ years of data across 36+ Indian states with geospatial heatmaps and polynomial regression forecasting.",
    tech: ["Python", "PostgreSQL", "ETL", "ML", "Geospatial", "Recharts"],
    highlights: [
      "10+ years (2014–2024) of solar data",
      "81.8+ GW of installed capacity evaluated",
      "36+ states/UTs analyzed across 500+ records",
    ],
    github: "https://github.com/pranavshende/SolarSalesAnalysis",
    demo: "/playgames?folder=projects_folder",
    gradient: "from-amber-400 to-orange-500",
    image: solarAnalyticsPhoto
  },
  {
    title: "PashuRakshak",
    subtitle: "AI Livestock Disease Detection System",
    description: "An AI-powered livestock healthcare platform with 5+ modules using edge computing and TensorFlow Lite for offline disease detection and veterinary assistance.",
    tech: ["React Native (Expo)", "Node.js", "PostgreSQL", "Python", "CNN", "Tensor Lite"],
    highlights: [
      "5+ modules with offline-first edge computing",
      "CNN-based disease classification model",
      "15+ RESTful APIs connected",
      "IEEE Conference presentation & publication",
    ],
    badge: "IEEE Published",
    github: "https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2",
    demo: "/playgames?folder=projects_folder",
    gradient: "from-emerald-400 to-teal-600",
    image: pashurakshakPhoto
  }
];

const ProjectsPage = () => {
  const [gitRepos, setGitRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/pranavshende/repos?sort=updated&per_page=100")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out forks and the repos that are already featured
          const featuredNames = ["SolarSalesAnalysis", "HackNation_SKB-F17_SKB_P2"];
          const filtered = data.filter((repo: any) => !repo.fork && !featuredNames.includes(repo.name));
          setGitRepos(filtered);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 pb-24">
      <FloatingCodeBackground />
      <FloatingHeader />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 space-y-16">
        <section className="text-center space-y-4 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-[56px] leading-[1.1] font-bold tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            My <span className="text-custom-primary">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-custom-muted max-w-2xl mx-auto text-[16px] sm:text-[18px] font-medium"
          >
            A collection of my work, ranging from scalable backend architectures and AI-driven applications to comprehensive full-stack platforms.
          </motion.p>
        </section>

        {/* Featured Projects List */}
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Featured Work
            </h2>
          </div>
          
          {/* Desktop View */}
          <div className="hidden sm:block space-y-4">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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

                <div className="flex-grow p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{project.title}</h3>
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
                        <li key={j} className="text-[11px] text-zinc-500 flex gap-1.5 items-start">
                          <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-medium text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-800">
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
                          View Demo
                          <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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

                    <div className="flex-grow p-4 flex flex-col justify-between">
                      <div>
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
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[9px] font-medium text-zinc-400">
                          {t}
                        </span>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-zinc-800">
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

        {/* Dynamic GitHub Repositories Grid */}
        <section className="space-y-6 pt-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Other Noteworthy Repositories
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Dynamically loaded public repositories from my GitHub.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gitRepos.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                  className="group flex flex-col p-4 rounded-xl bg-zinc-950 border border-white/[0.06] hover:border-zinc-800 transition-all shadow-sm"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Repository</span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-emerald-400 transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {repo.name}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                    <div className="flex items-center gap-2">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-zinc-600" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-zinc-600" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <FloatingDock />
    </div>
  );
};

export default ProjectsPage;
