import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, X, Star, BookOpen, Lock, CheckCircle2 } from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';
import { Link } from 'react-router-dom';

import jansamparkPhoto from '../photo/jansampark.png';
import solarAnalyticsPhoto from '../photo/solar_analytics.png';
import pashurakshakPhoto from '../photo/pashurakshak.png';
import attritionBanner from '../photo/attrition_banner.png';
import tastifyyBanner from '../photo/tastifyy_banner.png';

interface Project {
  id: string;
  client: string;
  category: string;
  year: string;
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
    id: 'jansampark',
    client: 'NK SkillEdge',
    category: 'Full Stack & Mobile',
    year: 'Shipped 2026',
    title: 'JanSampark: Smart Civic Grievance Platform bridging citizens and administration with 25+ custom modules',
    subtitle: 'Smart Civic Grievance Platform',
    description:
      'Full-stack civic platform bridging citizens and administration. Built 25+ frontend modules in React Native with a secure Node.js backend featuring JWT + RBAC for 4 user roles and 40+ RESTful APIs with PostgreSQL.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'RBAC', 'Express'],
    highlights: [
      '25+ frontend modules built in React Native',
      'JWT + RBAC framework safeguarding citizen data across 4 roles',
      '40+ RESTful APIs optimized for rapid database queries',
      'Offline-capable incident reporting with geo-tagging',
    ],
    github: 'private',
    demo: '/arcade?folder=projects_folder',
    badge: 'Production Shipped',
    image: jansamparkPhoto,
  },
  {
    id: 'attrition',
    client: 'HR AI Analytics',
    category: 'AI & Full Stack',
    year: 'Shipped 2026',
    title: 'Employee Attrition Intelligence System: Predictive flight-risk analytics and Gemini 2.5 Flash conversational workforce copilot',
    subtitle: 'AI Workforce Attrition Intelligence',
    description:
      'An end-to-end, AI-powered workforce attrition analysis platform and conversational copilot built with React 19, Flask, and Google Gemini 2.5 Flash. Features dynamic CSV dataset ingestion, 11 interactive Chart.js visualizations, differential root-cause ranking, and an AttritionAI copilot grounded in cohort metrics for individual employee risk lookups.',
    tech: ['React 19', 'Flask', 'Python', 'Google Gemini 2.5', 'Pandas', 'Chart.js', 'Vite'],
    highlights: [
      'Instant dynamic CSV ingestion with automatic column detection and schema normalization',
      '11 interactive Chart.js visualizations covering departments, tenure curves, and overtime impact',
      'Differential root-cause driver ranking quantifying percentage-point turnover impact',
      'AttritionAI Copilot grounded in dataset metrics with individual employee ID flight-risk lookup',
    ],
    github: 'https://github.com/pranavshende/EmployeeAttritionSystem',
    badge: 'AI Intelligence',
    image: attritionBanner,
  },
  {
    id: 'tastifyy',
    client: 'On-Demand Logistics',
    category: 'Full Stack & Mobile',
    year: 'Shipped 2026',
    title: 'Tastifyy: Premium on-demand food delivery platform with real-time tracking, dual Web/Expo clients, and 4-role portal architecture',
    subtitle: 'Multi-Role Food Delivery Platform',
    description:
      'A scalable food delivery ecosystem for India featuring dual client surfaces (React 19 Web + React Native Expo App), centralized Express + TypeScript backend, Prisma ORM with PostgreSQL (Supabase), real-time order dispatch via Socket.io, and automated delivery partner job assignments across 4 distinct role portals.',
    tech: ['React 19', 'React Native (Expo)', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Socket.io'],
    highlights: [
      'Dual client interfaces: React 19 web portal and cross-platform React Native (Expo) app',
      '4-role portal architecture: Customer ordering, Restaurant management, Delivery partner dispatch, and Admin oversight',
      'Real-time bidirectional event dispatching and live driver tracking powered by Socket.io',
      'Production backend with Prisma ORM, Supabase PostgreSQL, and automated delivery assignment algorithm',
    ],
    github: 'https://github.com/pranavshende/tastifyy',
    demo: 'https://www.tastifyy.in',
    badge: 'Production Shipped',
    image: tastifyyBanner,
  },
  {
    id: 'solar-analytics',
    client: 'IT Daksh',
    category: 'AI & Data Intelligence',
    year: 'Shipped 2026',
    title: 'Solar Intelligence: Letting AI models analyze 10+ years of energy metrics and forecast capacity across 36+ states',
    subtitle: 'AI Sales Analytics Platform',
    description:
      'AI-driven solar sales intelligence platform analyzing 10+ years (2014–2024) of installation metrics across 36+ Indian states/UTs covering 81.8+ GW with geospatial heatmaps and polynomial regression forecasting to 2030.',
    tech: ['Python', 'PostgreSQL', 'ETL Pipelines', 'ML', 'Geospatial', 'Recharts'],
    highlights: [
      '10+ years (2014–2024) of solar data evaluated nationwide',
      '81.8+ GW of installed capacity analyzed across 500+ records',
      'Automated ETL data cleaning pipelines cutting query latency by 45%',
      'Polynomial regression forecast curves projecting capacity to 2030',
    ],
    github: 'https://github.com/pranavshende/SolarSalesAnalysis',
    demo: '/arcade?folder=projects_folder',
    badge: 'AI Analytics',
    image: solarAnalyticsPhoto,
  },
  {
    id: 'pashurakshak',
    client: 'IEEE Conference',
    category: 'Edge AI & Mobile',
    year: 'Published 2026',
    title: 'PashuRakshak: Edge AI livestock disease detection bringing automated offline diagnosis to rural farmers',
    subtitle: 'AI Livestock Disease Detection System',
    description:
      'An AI-powered livestock healthcare platform with 5+ modules using edge computing and TensorFlow Lite for offline disease detection and veterinary assistance. Presented and published at an international IEEE conference.',
    tech: ['React Native (Expo)', 'Node.js', 'PostgreSQL', 'Python', 'CNN', 'TensorFlow Lite'],
    highlights: [
      'Quantized CNN model running on-device with sub-second inference',
      'Offline-first edge architecture designed for rural farming areas',
      '15+ RESTful APIs connecting veterinary assistance services',
      'Presented & published at 2025 IEEE OPJU International Conference',
    ],
    badge: 'IEEE Published',
    github: 'https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2',
    demo: '/arcade?folder=projects_folder',
    image: pashurakshakPhoto,
  },
];

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [gitRepos, setGitRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(true);

  // Fetch real repositories from Pranav's GitHub account
  useEffect(() => {
    fetch('https://api.github.com/users/pranavshende/repos?sort=updated&per_page=100')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const featuredNames = ['SolarSalesAnalysis', 'HackNation_SKB-F17_SKB_P2', 'EmployeeAttritionSystem', 'tastifyy'];
          const filtered = data.filter((repo: any) => !repo.fork && !featuredNames.includes(repo.name));
          setGitRepos(filtered.slice(0, 6));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingRepos(false));
  }, []);

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO STATEMENT (Direct match to Jerry Chen aesthetic)
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-16 pt-2">
        <h1 className="text-2xl sm:text-3xl md:text-[34px] font-medium text-zinc-900 tracking-tight leading-[1.35]">
          Hi there! I'm <span className="font-bold text-zinc-950">Pranav</span>, a full-stack engineer dedicated to building scalable backend architectures, exploring system design, and shipping high-impact solutions. Prev. @{' '}
          <span className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors">NK SkillEdge</span>,{' '}
          <span className="font-semibold text-zinc-900 hover:text-amber-600 transition-colors">IT Daksh</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 mt-3 font-normal leading-relaxed max-w-2xl">
          IT B.Tech student @ SVPCET building backend systems, cross-platform apps (MERN, React Native), and AI/ML integrations.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SELECTED PROJECTS (Direct match to Jerry Chen layout)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6 mb-16">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
          <h2 className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider font-sans">
            Selected Projects
          </h2>
          <span className="font-doodle text-sm text-zinc-400">
            click cards to inspect all details 🔍
          </span>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer flex flex-col space-y-3"
            >
              {/* Image banner with clean aspect ratio */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-xs group-hover:shadow-md group-hover:border-zinc-300 transition-all">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {proj.badge && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-zinc-800 border border-zinc-200/80 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                    {proj.badge}
                  </div>
                )}
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-0.5">
                <span className="font-semibold text-zinc-800">{proj.client}</span>
                <span>
                  {proj.category} • {proj.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                {proj.title}
              </h3>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {proj.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[11px] font-mono border border-zinc-200/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH PUBLICATIONS SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-16 pt-2">
        <div className="border-b border-zinc-200/80 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider font-sans">
              Research Publications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Publication 1 */}
          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white shadow-xs hover:border-zinc-300 transition-all space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase font-mono">
              IEEE Conference
            </span>
            <h3 className="text-base font-bold text-zinc-900 leading-snug">
              CNN Based Classification of Lumpy Skin Disease
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Presented at the 2025 4th OPJU International Conference on Technology and Management (IEEE). Explores quantized lightweight convolutional networks for rural veterinary disease diagnostics.
            </p>
            <a
              href="https://doi.org/10.1109/OTCON65728.2025.11070341"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold pt-1 font-mono"
            >
              <span>doi: 10.1109/OTCON65728.2025.11070341</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Publication 2 */}
          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white shadow-xs hover:border-zinc-300 transition-all space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-bold text-teal-700 uppercase font-mono">
              IJACTE Journal
            </span>
            <h3 className="text-base font-bold text-zinc-900 leading-snug">
              Intelligent Platform to Interconnect Alumni and Student for Educational Institutes
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Published in the International Journal on Advanced Computer Theory and Engineering, 14(1): 193–197, May 2025. Mentorship and career matchmaking platform connecting alumni with undergraduate students.
            </p>
            <a
              href="https://doi.org/10.65521/ijacte.v14i1.388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 font-semibold pt-1 font-mono"
            >
              <span>doi: 10.65521/ijacte.v14i1.388</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DYNAMIC GITHUB REPOSITORIES
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-10 pt-2">
        <div className="border-b border-zinc-200/80 pb-3 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider font-sans">
            Other Noteworthy Repositories
          </h2>
          <a
            href="https://github.com/PranavShende"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View all on GitHub →
          </a>
        </div>

        {loadingRepos ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-zinc-100 border border-zinc-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gitRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 rounded-xl border border-zinc-200/80 hover:border-zinc-300 bg-white transition-all shadow-2xs hover:shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Repo
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 truncate">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {repo.description || 'Public repository on GitHub.'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  {repo.language && (
                    <span className="font-mono text-[11px] font-medium text-zinc-600">
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-mono">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECT DETAIL MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-5 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pr-6">
                <span className="font-mono text-xs font-semibold uppercase text-blue-600 tracking-wider">
                  {selectedProject.client} • {selectedProject.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug">
                  {selectedProject.subtitle}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  {selectedProject.title}
                </p>
              </div>

              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  Key Achievements
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm text-zinc-700">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-mono text-xs border border-zinc-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                {selectedProject.github && selectedProject.github !== 'private' ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 text-zinc-400 text-xs sm:text-sm font-medium border border-zinc-200">
                    <Lock className="w-4 h-4" />
                    <span>Private Repository</span>
                  </div>
                )}
                {selectedProject.demo && (
                  selectedProject.demo.startsWith('http') ? (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fef08a] text-zinc-900 border border-zinc-900/10 text-xs sm:text-sm font-semibold hover:bg-[#fde047] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Live Platform</span>
                    </a>
                  ) : (
                    <Link
                      to={selectedProject.demo}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fef08a] text-zinc-900 border border-zinc-900/10 text-xs sm:text-sm font-semibold hover:bg-[#fde047] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch in Arcade</span>
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DoodleLayout>
  );
};

export default Home;
