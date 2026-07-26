import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { 
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiC,
  SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiGooglecloud,
  SiVercel, SiPostman, SiSupabase, SiCss, SiHtml5
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Sparkles, X, Info } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  usedIn: string;
  details: string;
  orbit: 'inner' | 'outer';
}

const ALL_TECH_ITEMS: TechItem[] = [
  // ── INNER ORBIT (Core Stack) ──
  {
    id: 'react',
    name: 'React',
    category: 'Frontend Library',
    icon: SiReact,
    color: '#61DAFB',
    usedIn: 'Jansampark Platform & Solar Analytics Dashboard',
    details: 'Built dynamic component-driven web interfaces, state hooks, and custom layouts for Jansampark and Solar Analytics.',
    orbit: 'inner'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Environment',
    icon: SiNodedotjs,
    color: '#339933',
    usedIn: '40+ REST APIs & Microservices',
    details: 'Architected scalable server runtimes, event-driven I/O pipelines, and microservice APIs.',
    orbit: 'inner'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Type Safety',
    icon: SiTypescript,
    color: '#3178C6',
    usedIn: 'NkSkillEdge Full-Stack Apps & Portfolio',
    details: 'Enforced type safety, modular data models, and strict API interfaces across client and server codebases.',
    orbit: 'inner'
  },
  {
    id: 'python',
    name: 'Python (AI / ML)',
    category: 'Machine Learning',
    icon: SiPython,
    color: '#3776AB',
    usedIn: 'IEEE Lumpy Skin Disease CNN & Solar Analytics',
    details: 'Trained Convolutional Neural Networks (CNN) for image classification and implemented polynomial regression models for 10-year forecasting.',
    orbit: 'inner'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'NoSQL Database',
    icon: SiMongodb,
    color: '#47A248',
    usedIn: 'Jansampark Platform & Web Backends',
    details: 'Designed document schemas, indexing strategies, and aggregation pipelines for high-throughput applications.',
    orbit: 'inner'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Containers',
    icon: SiDocker,
    color: '#2496ED',
    usedIn: 'Microservices & Local Dev Isolation',
    details: 'Containerized web applications with multi-stage Dockerfiles and environment isolation.',
    orbit: 'inner'
  },

  // ── OUTER ORBIT (Extended Stack) ──
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Mobile App Framework',
    icon: SiReact,
    color: '#38BDF8',
    usedIn: 'PashuRakshak Mobile App',
    details: 'Engineered cross-platform mobile application interface for real-time livestock health tracking.',
    orbit: 'outer'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Framework',
    icon: SiExpress,
    color: '#ffffff',
    usedIn: 'Jansampark REST API & Backend Services',
    details: 'Built middleware routing, JWT authentication controllers, and rate-limiting handlers.',
    orbit: 'outer'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Programming Language',
    icon: SiJavascript,
    color: '#F7DF1E',
    usedIn: 'Web Apps, Arcade Games & Scripts',
    details: 'Mastered async/await promises, DOM manipulation, ES6 modules, and interactive web games.',
    orbit: 'outer'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Data Structures & Algorithms',
    icon: SiCplusplus,
    color: '#00599C',
    usedIn: 'Codetantra Practical Labs & SVPCET Coursework',
    details: 'Implemented data structures, pointers, memory allocation, and algorithmic problem solving.',
    orbit: 'outer'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Object-Oriented Programming',
    icon: FaJava,
    color: '#E76F51',
    usedIn: 'Codetantra DSA Certification',
    details: 'Mastered OOP design patterns, exception handling, multithreading, and Java Collections Framework.',
    orbit: 'outer'
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Systems Fundamentals',
    icon: SiC,
    color: '#A8B9CC',
    usedIn: 'Low-level Memory & Systems Coursework',
    details: 'Wrote memory-safe pointers, struct layouts, and procedural system scripts.',
    orbit: 'outer'
  },
  {
    id: 'sql',
    name: 'SQL Databases',
    category: 'Relational Database',
    icon: FaDatabase,
    color: '#336791',
    usedIn: 'Academic Projects & Data Modeling',
    details: 'Designed relational schemas, normalized tables, complex JOIN queries, and database constraints.',
    orbit: 'outer'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Container Orchestration',
    icon: SiKubernetes,
    color: '#326CE5',
    usedIn: 'DevOps & Cluster Management Concepts',
    details: 'Studied cluster deployments, pod scaling, ingress rules, and service orchestration.',
    orbit: 'outer'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Version Control',
    icon: SiGit,
    color: '#F05032',
    usedIn: '40+ Code Repositories',
    details: 'Managed branch workflows, code reviews, PRs, and collaborative version control.',
    orbit: 'outer'
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'CI/CD Automation',
    icon: SiGithubactions,
    color: '#2088FF',
    usedIn: 'Automated Build & Test Workflows',
    details: 'Configured automated CI/CD pipelines for linting, building, and deploying releases.',
    orbit: 'outer'
  },
  {
    id: 'gcp',
    name: 'Google Cloud (GCP)',
    category: 'Cloud Infrastructure',
    icon: SiGooglecloud,
    color: '#4285F4',
    usedIn: 'Cloud Hosting & Domain Routing',
    details: 'Configured Cloud Storage buckets, DNS domain routes, and server deployments.',
    orbit: 'outer'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Frontend Deployment',
    icon: SiVercel,
    color: '#ffffff',
    usedIn: 'pranavshende.online Hosting',
    details: 'Configured automated Git deployments, edge network caching, and domain SSL.',
    orbit: 'outer'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Backend as a Service',
    icon: SiSupabase,
    color: '#3ECF8E',
    usedIn: 'Realtime Apps & PostgreSQL Backend',
    details: 'Utilized Postgres database, Row Level Security policies, and realtime subscriptions.',
    orbit: 'outer'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'API Development',
    icon: SiPostman,
    color: '#FF6C37',
    usedIn: '40+ REST API Testing & Docs',
    details: 'Designed API request suites, environment variables, and endpoint documentation.',
    orbit: 'outer'
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'Web Standards & Styling',
    icon: SiHtml5,
    color: '#E34F26',
    usedIn: 'Web Apps & Responsive Interfaces',
    details: 'Created semantic layouts, micro-animations, glassmorphism styles, and responsive CSS token systems.',
    orbit: 'outer'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Developer Environment',
    icon: VscVscode,
    color: '#007ACC',
    usedIn: 'Primary Development IDE',
    details: 'Configured custom extension pipelines, debugger integrations, and workspace settings.',
    orbit: 'outer'
  }
];

const SkillsMarquee = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setSelectedTech(prev => {
        if (!prev) return ALL_TECH_ITEMS[0];
        const nextIndex = (ALL_TECH_ITEMS.findIndex(t => t.id === prev.id) + 1) % ALL_TECH_ITEMS.length;
        return ALL_TECH_ITEMS[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  useEffect(() => {
    if (isAutoCycling && !selectedTech) {
      setSelectedTech(ALL_TECH_ITEMS[0]);
    }
  }, []);

  const handleTechClick = (item: TechItem) => {
    setIsAutoCycling(false);
    setSelectedTech(prev => (prev?.id === item.id ? null : item));
  };

  const innerItems = ALL_TECH_ITEMS.filter(item => item.orbit === 'inner');
  const outerItems = ALL_TECH_ITEMS.filter(item => item.orbit === 'outer');

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.06] px-4 py-5 sm:px-6 sm:py-6 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <SectionHeader title="Tech Stack Orbit" className="my-0" />
          <span className="text-[10px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Click any icon ({ALL_TECH_ITEMS.length})
          </span>
        </div>

        {/* ── Compact Dual Orbit Container ── */}
        <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[380px] mx-auto my-3 flex items-center justify-center">
          {/* Outer Orbit Ring Line (88% diameter, 44% radius) */}
          <div 
            className="absolute rounded-full border border-dashed border-emerald-500/30 dark:border-emerald-500/20 animate-[spin_100s_linear_infinite] pointer-events-none" 
            style={{ width: '88%', height: '88%' }}
          />
          {/* Inner Orbit Ring Line (55% diameter, 27.5% radius) */}
          <div 
            className="absolute rounded-full border border-zinc-300 dark:border-zinc-700/80 pointer-events-none" 
            style={{ width: '55%', height: '55%' }}
          />

          {/* Central Interactive Hub (30% diameter, 15% radius) */}
          <div className="relative z-10 w-[30%] h-[30%] rounded-full bg-zinc-100 dark:bg-zinc-900/95 border-2 border-emerald-500/40 flex flex-col items-center justify-center p-1.5 text-center shadow-xl backdrop-blur-md transition-all duration-300">
            {selectedTech ? (
              <div className="flex flex-col items-center animate-fadeIn space-y-0.5 max-w-full px-1">
                {React.createElement(selectedTech.icon, {
                  className: "w-5 h-5 sm:w-7 sm:h-7 mb-0.5 transition-transform duration-300 scale-110 shrink-0",
                  style: { color: selectedTech.color === '#ffffff' ? '#e4e4e7' : selectedTech.color }
                })}
                <span className="font-bold text-[10px] sm:text-xs text-zinc-900 dark:text-white leading-tight truncate max-w-full">
                  {selectedTech.name}
                </span>
                <span className="text-[8px] sm:text-[9px] text-emerald-600 dark:text-emerald-400 font-mono leading-tight truncate max-w-full">
                  {selectedTech.category}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-0.5 px-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                  Tech Stack
                </p>
                <p className="text-[8px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  Tap icons
                </p>
              </div>
            )}
          </div>

          {/* ── INNER ORBIT ICONS (Radius 27.5%) ── */}
          {innerItems.map((item, index) => {
            const count = innerItems.length;
            const angle = (index * 360) / count - 90;
            const rad = (angle * Math.PI) / 180;
            const radiusPercent = 27.5;
            const x = 50 + radiusPercent * Math.cos(rad);
            const y = 50 + radiusPercent * Math.sin(rad);

            const isSelected = selectedTech?.id === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleTechClick(item)}
                aria-label={`View details for ${item.name}`}
                className={`absolute w-7 h-7 sm:w-8 sm:h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 group z-20 ${
                  isSelected 
                    ? 'bg-emerald-500 text-black ring-4 ring-emerald-500/40 scale-125 z-30 shadow-lg' 
                    : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:scale-110 shadow-sm'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
              >
                <Icon 
                  className="w-3.5 h-3.5 sm:w-4 h-4 transition-transform group-hover:scale-110" 
                  style={{ color: isSelected ? '#000000' : (item.color === '#ffffff' ? '#a1a1aa' : item.color) }}
                />

                {/* Tooltip on Hover */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-zinc-900 text-white text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-40 border border-zinc-700">
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* ── OUTER ORBIT ICONS (Radius 44%) ── */}
          {outerItems.map((item, index) => {
            const count = outerItems.length;
            const angle = (index * 360) / count - 90;
            const rad = (angle * Math.PI) / 180;
            const radiusPercent = 44;
            const x = 50 + radiusPercent * Math.cos(rad);
            const y = 50 + radiusPercent * Math.sin(rad);

            const isSelected = selectedTech?.id === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleTechClick(item)}
                aria-label={`View details for ${item.name}`}
                className={`absolute w-6 h-6 sm:w-7 sm:h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 group z-20 ${
                  isSelected 
                    ? 'bg-emerald-500 text-black ring-4 ring-emerald-500/40 scale-125 z-30 shadow-lg' 
                    : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/70 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:scale-110 shadow-sm'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
              >
                <Icon 
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:scale-110" 
                  style={{ color: isSelected ? '#000000' : (item.color === '#ffffff' ? '#a1a1aa' : item.color) }}
                />

                {/* Tooltip on Hover */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-zinc-900 text-white text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-40 border border-zinc-700">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Tech Usage Card (Detailed View below Orbit) ── */}
        {selectedTech ? (
          <div className="mt-2 sm:mt-3 p-3 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-emerald-500/30 transition-all animate-fadeIn">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  {React.createElement(selectedTech.icon, {
                    className: "w-4 h-4",
                    style: { color: selectedTech.color === '#ffffff' ? '#a1a1aa' : selectedTech.color }
                  })}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {selectedTech.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-mono truncate">
                    Used in: {selectedTech.usedIn}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsAutoCycling(false);
                  setSelectedTech(null);
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-0.5 shrink-0"
                aria-label="Close details"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pl-9">
              {selectedTech.details}
            </p>
          </div>
        ) : (
          <div className="mt-2 text-center">
            <p className="text-[11px] text-zinc-500 italic">
              Click any of the 22 tech icons in the inner or outer orbit to explore where Pranav used them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsMarquee;
