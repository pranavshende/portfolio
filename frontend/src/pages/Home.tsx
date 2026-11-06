import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Linkedin, ArrowUpRight, ArrowRight, X, Star, BookOpen, 
  Lock, CheckCircle2, Download, Mail, GraduationCap, Layers, Target 
} from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import useAnalytics from '@/hooks/useAnalytics';
import ContactModal from '@/components/ContactModal';

import jansamparkPhoto from '../photo/jansampark.webp';
import solarAnalyticsPhoto from '../photo/solar_analytics.webp';
import pashurakshakPhoto from '../photo/pashurakshak.webp';
import attritionBanner from '../photo/attrition_banner.webp';
import tastifyyBanner from '../photo/tastifyy_banner.webp';
import electropathyBanner from '../photo/electropathy_banner.webp';

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
    id: 'electropathy',
    client: 'Dr. Ashish Wandhare',
    category: 'Agentic AI & Healthcare',
    year: 'Production 2026',
    title: 'Electropathy AI: Agentic Clinical RAG Copilot & Multilingual Knowledge Engine with pgvector Semantic Search',
    subtitle: 'Agentic RAG Copilot • pgvector & Multilingual Clinical Engine',
    description:
      'AI-powered clinical decision-support and medical knowledge platform built for Dr. Ashish Wandhare. Integrates an Option A RAG assistant grounded in verified Electropathy literature with zero-hallucination guardrails, pgvector semantic embeddings on Supabase PostgreSQL, multilingual consultation (English, Hindi, Marathi), multi-step patient history intake wizards, and mobile OTP authentication via BlackSMS gateway.',
    tech: ['Agentic RAG', 'Multilingual NLP', 'pgvector', 'Prisma ORM', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind CSS'],
    highlights: [
      'Option A RAG Knowledge Assistant grounded in verified Electropathy datasets with strict zero-hallucination guardrails',
      'High-dimensional pgvector semantic embeddings enabling context-aware multilingual inquiry in English, Hindi & Marathi',
      'Comprehensive clinical patient intake wizard capturing demographics, chief complaints, lifestyle, and constitutional mapping',
      'Full-stack architecture with React Vite client, Node.js Express server, Prisma ORM, and Supabase PostgreSQL',
    ],
    github: 'https://github.com/pranavshende/Electropathy_AI',
    demo: 'https://client-raprax.vercel.app',
    badge: 'Live Production',
    image: electropathyBanner,
  },
  {
    id: 'tastifyy',
    client: 'On-Demand Logistics',
    category: 'Distributed Systems & Mobile',
    year: 'Shipped 2026',
    title: 'Tastifyy: Distributed On-Demand Food Logistics Engine with Kafka Streaming, Redis Geospatial & Dynamic Dispatch',
    subtitle: 'Distributed Logistics • Kafka Streaming & Redis Geospatial Engine',
    description:
      'High-throughput food delivery ecosystem featuring dual client surfaces (React 19 Web + React Native Expo App), centralized Express + TypeScript backend, Prisma ORM with Supabase PostgreSQL, Kafka-powered order event buses, Redis geospatial indexes for driver proximity, and AI-assisted batch dispatch algorithms.',
    tech: ['Kafka Streams', 'Redis Geospatial', 'WebSockets (Socket.io)', 'Distributed Systems', 'React 19', 'React Native (Expo)', 'Express', 'Prisma'],
    highlights: [
      'Kafka event pipeline orchestrating asynchronous order state transitions and notifications',
      'Redis geospatial caching tracking live delivery partner coordinates for instant proximity dispatch',
      'AI dispatch algorithm optimizing order batching and shortest delivery routes',
      'Dual client interfaces: React 19 web portal and cross-platform React Native (Expo) app',
    ],
    github: 'https://github.com/pranavshende/tastifyy',
    demo: 'https://www.tastifyy.in',
    badge: 'Production Shipped',
    image: tastifyyBanner,
  },
  {
    id: 'attrition',
    client: 'HR AI Analytics',
    category: 'Generative AI & Predictive ML',
    year: 'Shipped 2026',
    title: 'Employee Attrition AI: Predictive HR Intelligence Platform, Gemini 2.5 Copilot & Real-Time Flight-Risk Scoring',
    subtitle: 'Predictive ML • Gemini 2.5 Copilot & Real-Time Flight-Risk Scoring',
    description:
      'An end-to-end AI-powered workforce attrition analysis platform and conversational copilot built with React 19, Flask, and Google Gemini 2.5 Flash. Features dynamic CSV dataset ingestion, Redis-cached cohort metrics, 11 interactive Chart.js visualizations, differential root-cause ranking, and an AttritionAI copilot grounded in cohort metrics for individual employee risk lookups.',
    tech: ['Google Gemini 2.5', 'Predictive ML', 'Dynamic ETL', 'Python (Pandas)', 'Flask REST APIs', 'React 19', 'Chart.js'],
    highlights: [
      'Conversational AI copilot (Gemini 2.5 Flash) querying real-time workforce metrics with zero hallucinations',
      'Predictive flight-risk classification engine evaluating 11 critical turnover drivers and root causes',
      'In-memory caching for accelerated cohort queries and individual employee ID lookups',
      'Instant dynamic CSV dataset ingestion with automatic schema normalization',
    ],
    github: 'https://github.com/pranavshende/EmployeeAttritionSystem',
    badge: 'Gemini 2.5 Flash',
    image: attritionBanner,
  },
  {
    id: 'jansampark',
    client: 'NK SkillEdge',
    category: 'Enterprise Full Stack & Mobile',
    year: 'Shipped 2026',
    title: 'JanSampark: Enterprise Civic Governance Platform with 25+ React Native Modules, Role-Based Access & High-Concurrency APIs',
    subtitle: 'Enterprise Governance • 25+ React Native Modules & RBAC Architecture',
    description:
      'Enterprise civic governance platform bridging citizens and administrative departments. Features 25+ frontend modules in React Native with offline geo-tagging, JWT + RBAC security for 4 administrative roles, and high-concurrency Node.js RESTful APIs connected to PostgreSQL.',
    tech: ['Enterprise Architecture', 'React Native', 'RBAC Security', 'Node.js', 'PostgreSQL', 'High-Concurrency APIs', 'JWT'],
    highlights: [
      '25+ frontend modules built in React Native with offline geo-tagging and intuitive mobile workflows',
      'JWT + RBAC framework safeguarding citizen records across 4 administrative roles',
      '40+ RESTful micro-endpoints handling high-concurrency civic complaint submissions',
      'Sub-15ms database query execution with indexed PostgreSQL schemas',
    ],
    github: 'private',
    demo: '/arcade?folder=projects_folder',
    badge: 'Civic Enterprise',
    image: jansamparkPhoto,
  },
  {
    id: 'solar-analytics',
    client: 'IT Daksh',
    category: 'Big Data & Geospatial Analytics',
    year: 'Shipped 2026',
    title: 'Solar Intelligence: CleanTech Big Data Pipeline, Geospatial GIS Heatmaps & Multi-Decadal Time-Series Forecasting',
    subtitle: 'CleanTech Big Data • Geospatial GIS Heatmaps & Multi-Decadal Time-Series',
    description:
      'CleanTech big data intelligence platform analyzing 10+ years (2014–2024) of nationwide solar energy metrics across 36+ Indian states/UTs covering 81.8+ GW. Features automated ETL pipelines, interactive geospatial GIS heatmaps, and polynomial regression trajectory forecasting to 2030.',
    tech: ['CleanTech Big Data', 'Time-Series Forecasting', 'Geospatial GIS', 'Python', 'PostgreSQL', 'Polynomial Regression', 'Recharts'],
    highlights: [
      '10+ years (2014–2024) of nationwide solar energy metrics evaluated across 81.8+ GW',
      'Multi-decadal polynomial regression models projecting state-by-state solar capacity to 2030',
      'Automated Python & PostgreSQL ETL data pipelines cutting analytical query latency by 45%',
      'Interactive GIS choropleth heatmaps mapping regional solar adoption across 36+ states/UTs',
    ],
    github: 'https://github.com/pranavshende/SolarSalesAnalysis',
    demo: '/arcade?folder=projects_folder',
    badge: 'CleanTech Big Data',
    image: solarAnalyticsPhoto,
  },
  {
    id: 'pashurakshak',
    client: 'IEEE Conference',
    category: 'Edge AI & Computer Vision',
    year: 'Published 2026',
    title: 'PashuRakshak: Edge Computing Livestock Pathology Classifier with Quantized TensorFlow Lite CNNs & Offline-First IoT',
    subtitle: 'Edge Computing • Quantized CNNs & Offline-First Computer Vision',
    description:
      'Edge computing veterinary diagnostics system with 5+ modules using quantized convolutional neural networks (TensorFlow Lite INT8) for sub-second offline livestock disease classification. Features offline-first local storage and sync queuing for zero-connectivity rural farms. Presented and published at IEEE OPJU conference.',
    tech: ['Edge Computing', 'Quantized CNNs', 'TensorFlow Lite', 'Offline-First IoT', 'Computer Vision', 'React Native', 'IEEE Research'],
    highlights: [
      'On-device quantized CNN model running sub-120ms inference with 94%+ diagnostic accuracy',
      'Offline-first IoT architecture designed for zero-connectivity rural agricultural communities',
      'Local caching queue automatically synchronizing veterinary records upon network reconnect',
      'Presented & published at 2025 IEEE OPJU International Conference (OTCON)',
    ],
    badge: 'IEEE Published',
    github: 'https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2',
    demo: '/arcade?folder=projects_folder',
    image: pashurakshakPhoto,
  },
];

export const Home: React.FC = () => {
  useAnalytics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [gitRepos, setGitRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(true);

  // Global listener to open contact modal from sidebar, header, or CTA buttons
  useEffect(() => {
    const handleOpen = () => setContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  // Fetch dynamic projects from backend database with fallback to verified offline data
  useEffect(() => {
    const projectImages: Record<string, string> = {
      electropathy: electropathyBanner,
      tastifyy: tastifyyBanner,
      attrition: attritionBanner,
      jansampark: jansamparkPhoto,
      solar: solarAnalyticsPhoto,
      pashurakshak: pashurakshakPhoto,
    };

    api.getProjects()
      .then((res: any) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: Project[] = res.data.map((p: any) => ({
            id: p.slug || p.id,
            client: p.client || 'Engineering Platform',
            category: p.category || 'Software Engineering',
            year: p.year || '2026',
            title: p.title,
            subtitle: p.subtitle || p.title,
            description: p.description,
            tech: Array.isArray(p.techStack) ? p.techStack : [],
            highlights: Array.isArray(p.keyFeatures) ? p.keyFeatures : [],
            github: p.githubUrl,
            demo: p.liveDemoUrl,
            badge: p.badge || (p.isFeatured ? 'Featured' : undefined),
            image: p.thumbnailUrl || projectImages[p.slug] || electropathyBanner,
          }));
          setProjectList(mapped);
        }
      })
      .catch(() => {
        // Silently preserve offline static projects
      });
  }, []);

  const handleResumeDownload = () => {
    api.trackResumeDownload().catch(() => {});
  };

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
          HERO STATEMENT (Mockup match)
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#8b2323] bg-[#8b2323]/10 border border-[#8b2323]/25 mb-4">
          <span>&lt;//&gt;</span>
          <span>Welcome to my portfolio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight select-text">
          Hi there! I'm <span className="font-serif italic text-[#8b2323] dark:text-white">Pranav</span> 👋
        </h1>

        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 mt-3 font-normal leading-relaxed max-w-3xl">
          An aspiring forward deployed engineer dedicated to building scalable backend architectures and AI solutions.
        </p>

        {/* Hero Tag Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/70 dark:bg-[#14161d]/70 border border-stone-300/80 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 shadow-2xs backdrop-blur-xs">
            <GraduationCap className="w-4 h-4 text-[#8b2323]" />
            <span>B.Tech IT @ SVPCET</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/70 dark:bg-[#14161d]/70 border border-stone-300/80 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 shadow-2xs backdrop-blur-xs">
            <Layers className="w-4 h-4 text-[#8b2323]" />
            <span>Backend & AI</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/70 dark:bg-[#14161d]/70 border border-stone-300/80 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 shadow-2xs backdrop-blur-xs">
            <Target className="w-4 h-4 text-[#8b2323]" />
            <span>Building for Impact</span>
          </span>
        </div>

        {/* ── Slim Contact & Opportunity Card below 'Hi there I'm Pranav' ── */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/85 dark:bg-[#14161d]/85 border border-[#8b2323]/30 dark:border-[#8b2323]/40 shadow-xs backdrop-blur-md relative overflow-hidden transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b2323] via-[#b91c1c] to-[#8b2323]" />
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 font-mono">
                Available for Opportunities & Projects
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-0.5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                  Let's connect & build something impactful.
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                  Open to full-time SWE roles, freelance software architecture, and technical collaborations.
                </p>
              </div>

              {/* All 4 action buttons strictly in the SAME line */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 shrink-0 flex-nowrap">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold shadow-xs transition-all active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get In Touch</span>
                </button>
                <a
                  href="https://linkedin.com/in/pranavshende"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all active:scale-95 shrink-0 whitespace-nowrap"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/PranavShende"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all active:scale-95 shrink-0 whitespace-nowrap"
                  title="View GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all active:scale-95 shrink-0 whitespace-nowrap"
                  title="Direct Gmail"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ea4335]" />
                  <span>Gmail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SELECTED PROJECTS (Mockup match: Red Accent Bar & Cards)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6 mb-16">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-[#8b2323] rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
              Selected Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#8b2323] hover:text-[#721c1c] transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {projectList.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer rounded-2xl border border-black dark:border-stone-700 bg-white/85 dark:bg-[#14161d]/85 backdrop-blur-md shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col p-3.5 sm:p-4"
            >
              {/* Banner with badge */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-black/35 dark:border-stone-800 shadow-2xs">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                {proj.badge && (
                  <div className="absolute top-2.5 right-2.5 bg-white/95 dark:bg-stone-900/90 backdrop-blur-xs text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    {proj.badge}
                  </div>
                )}
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between gap-3 pt-3.5">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] transition-colors truncate">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                    {proj.client} • {proj.category} • {proj.year}
                  </p>
                </div>

                {/* Circular arrow button */}
                <div className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:border-[#8b2323] group-hover:text-[#8b2323] group-hover:bg-[#8b2323]/10 transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel pagination indicator matching mockup */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          <span className="w-2 h-2 rounded-full bg-[#8b2323]" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH PUBLICATIONS SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-16 pt-2">
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs sm:text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-sans">
              Research Publications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Publication 1 */}
          <div className="p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#151619] shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
              IEEE Conference
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              CNN Based Classification of Lumpy Skin Disease
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Presented at the 2025 4th OPJU International Conference on Technology and Management (IEEE). Explores quantized lightweight convolutional networks for rural veterinary disease diagnostics.
            </p>
            <a
              href="https://doi.org/10.1109/OTCON65728.2025.11070341"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold pt-1 font-mono"
            >
              <span>doi: 10.1109/OTCON65728.2025.11070341</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Publication 2 */}
          <div className="p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#151619] shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase font-mono">
              IJACTE Journal
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              Intelligent Platform to Interconnect Alumni and Student for Educational Institutes
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Published in the International Journal on Advanced Computer Theory and Engineering, 14(1): 193–197, May 2025. Mentorship and career matchmaking platform connecting alumni with undergraduate students.
            </p>
            <a
              href="https://doi.org/10.65521/ijacte.v14i1.388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-semibold pt-1 font-mono"
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
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-sans">
            Other Noteworthy Repositories
          </h2>
          <a
            href="https://github.com/PranavShende"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all on GitHub →
          </a>
        </div>

        {loadingRepos ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
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
                className="group flex flex-col justify-between p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-[#151619] transition-all shadow-2xs hover:shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Repo
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {repo.description || 'Public repository on GitHub.'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  {repo.language && (
                    <span className="font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
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
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#16171b] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pr-6">
                <span className="font-mono text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  {selectedProject.client} • {selectedProject.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {selectedProject.subtitle}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  {selectedProject.title}
                </p>
              </div>

              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                  Key Achievements
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs border border-zinc-200/80 dark:border-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                {selectedProject.github && selectedProject.github !== 'private' ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-700">
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

      {/* Direct Contact Modal with Instant Automated Confirmation Email */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </DoodleLayout>
  );
};

export default Home;
