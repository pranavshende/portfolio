import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Linkedin, ArrowUpRight, ArrowRight, X, Star, BookOpen, 
  Lock, CheckCircle2, Download, Mail, GraduationCap, Layers, Target,
  ChevronLeft, ChevronRight, GitFork, Sparkles, Eye, TrendingUp
} from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import useAnalytics from '@/hooks/useAnalytics';
import useBlogStats from '@/hooks/useBlogStats';
import useProjectStats from '@/hooks/useProjectStats';
import ContactModal from '@/components/ContactModal';
import { PageSeo } from '@/components/PageSeo';
import { GitHubCalendar } from 'react-github-calendar';
import { useMode } from '@/contexts/ModeContext';
import { LoadingThumbnail, resolveCustomPhoto } from '@/components/LoadingThumbnail';

const ghDarkTheme = {
  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};
const ghLightTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
};

import jansamparkPhoto from '../photo/jansampark.webp';
import solarAnalyticsPhoto from '../photo/solar_analytics.webp';
import pashurakshakPhoto from '../photo/pashurakshak.webp';
import attritionBanner from '../photo/attrition_banner.webp';
import tastifyyBanner from '../photo/tastifyy_banner.webp';
import electropathyBanner from '../photo/electropathy_banner.webp';
import jarvisBanner from '../photo/jarvis_banner.webp';

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
  viewCount?: number;
}

const projects: Project[] = [
  {
    id: 'jarvis',
    client: 'Meridian Supply Chain',
    category: 'Enterprise AI & MCP Architecture',
    year: 'Production 2026',
    title: 'Jarvis AI: Enterprise Intelligence Platform, Official Model Context Protocol (MCP) & Google Gemini 2.5 Pro Engine',
    subtitle: 'Autonomous Enterprise Intelligence • MCP Protocol & Deterministic SQL',
    description:
      'Autonomous enterprise intelligence platform unifying fragmented operations across ERP, WMS, and finance systems into a centralized intelligence layer. Features official Model Context Protocol (MCP v1.0.4) streamable HTTP and stdio transports, zero-hallucination deterministic SQL analytics across a 35-table PostgreSQL star schema, hybrid pgvector RAG with 749+ operational knowledge chunks, dynamic Google Gemini 2.5 Pro/Flash model routing, BullMQ dead-letter queues, and RBAC-controlled action workflows with human-in-the-loop approvals.',
    tech: ['Google Gemini 2.5 Pro', 'Model Context Protocol (MCP)', 'Fastify Gateway', 'pgvector RAG', 'Deterministic SQL', 'Supabase', 'Redis (BullMQ)', 'TypeScript', 'React 18'],
    highlights: [
      'Official Model Context Protocol (MCP v1.0.4) integration supporting Streamable HTTP (/mcp/stream) and stdio transports',
      'Deterministic star-schema SQL calculation engine delivering zero-hallucination metrics on inventory, revenue, and credit exposure',
      'Hybrid pgvector RAG knowledge assistant with 749+ verified operational chunks and strict document citations',
      'Dynamic dual-tier LLM routing (Gemini 2.5 Pro for deep reasoning & Flash for rapid execution) with token budget governance',
      'Enterprise resilience with 0.07ms authorization-aware semantic cache, BullMQ Dead-Letter Queues (DLQ), and 100% prompt injection red-team defense',
    ],
    github: 'https://github.com/pranavshende/jarvis-mcp-multipleDBs',
    demo: 'https://jarvis.pranavshende.online/',
    badge: 'Live Enterprise',
  },
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
  },
];

const defaultBlogs = [
  {
    slug: 'jarvis-enterprise-ai-platform',
    title: 'Jarvis AI: Building an Autonomous Enterprise Intelligence Platform',
    excerpt: 'How I engineered Jarvis AI — a centralized enterprise intelligence platform connecting ERP, warehouse management, and finance systems into an operational command center.',
    category: 'System Design & AI',
    readingTimeMinutes: 8,
  },
  {
    slug: 'forgerag-vector-embeddings-production-pipelines',
    title: 'ForgeRAG: Exploring LLMs, Vector Embeddings & Production-Grade RAG Pipelines',
    excerpt: 'A comprehensive technical deep-dive into how Large Language Models work internally, context window constraints, high-dimensional vector search, and hybrid retrieval.',
    category: 'AI & Machine Learning',
    readingTimeMinutes: 7,
  },
  {
    slug: 'ai-workforce-intelligence-attrition-prediction',
    title: 'AI-Powered Workforce Intelligence: Predicting Employee Attrition with Scikit-Learn & Gemini',
    excerpt: 'Developing a predictive HR workforce intelligence platform with dynamic CSV dataset ingestion, SHAP explainable AI attribution, and interactive telemetry charts.',
    category: 'Data Science & ML',
    readingTimeMinutes: 6,
  },
  {
    slug: 'solar-energy-analytics-forecasting',
    title: 'Solar Intelligence: Analyzing 10+ Years of Indian Renewable Big Data & Forecasting to 2030',
    excerpt: 'Evaluating 10+ years (2014–2024) of nationwide solar time-series data across 36+ Indian states/UTs covering 81.8+ GW with polynomial regression forecasting.',
    category: 'Data Science & Big Data',
    readingTimeMinutes: 7,
  },
  {
    slug: 'context-aware-natural-language-database-assistant',
    title: 'Building a Context-Aware Natural Language Database Assistant with Live Execution Workflows',
    excerpt: 'Architecting an AI database copilot that translates natural language inquiries into verified read-only SQL queries, explains multi-table joins, and displays live metrics.',
    category: 'System Design & AI',
    readingTimeMinutes: 6,
  },
  {
    slug: 'scalable-fullstack-engineering-fastify-nodejs-react',
    title: 'Scalable Full-Stack Engineering: Fastify, Node.js, Express, PostgreSQL & React Architecture',
    excerpt: 'Real-world lessons from designing high-concurrency Node.js and Fastify backend architectures, Prisma connection pooling, Redis caching, and reactive React UIs.',
    category: 'Web Engineering',
    readingTimeMinutes: 8,
  },
];

const resolveBlogCover = (url?: string, slug?: string): string | null => {
  return resolveCustomPhoto(url);
};

const defaultRepos = [
  {
    id: 1,
    name: 'Jarvis-MCP-Multipledbs',
    html_url: 'https://github.com/PranavShende/Jarvis-MCP-Multipledbs',
    description: 'Enterprise Intelligence Platform with Model Context Protocol (MCP) streamable HTTP transports and zero-hallucination deterministic SQL analytics.',
    language: 'TypeScript',
    stargazers_count: 5,
    forks_count: 2,
  },
  {
    id: 2,
    name: 'SolarSalesAnalysis',
    html_url: 'https://github.com/PranavShende/SolarSalesAnalysis',
    description: '10+ years of Indian renewable energy production big-data analytics and polynomial regression forecasting to 2030.',
    language: 'Python',
    stargazers_count: 4,
    forks_count: 1,
  },
  {
    id: 3,
    name: 'HackNation_SKB-F17_SKB_P2',
    html_url: 'https://github.com/PranavShende/HackNation_SKB-F17_SKB_P2',
    description: 'Offline-first, edge-AI civic issue reporting and municipal dispatch application built for HackNation 2024.',
    language: 'TypeScript',
    stargazers_count: 6,
    forks_count: 3,
  },
  {
    id: 4,
    name: 'EmployeeAttritionSystem',
    html_url: 'https://github.com/PranavShende/EmployeeAttritionSystem',
    description: 'Workforce attrition risk intelligence engine with dynamic CSV ingestion and SHAP explainable AI attribution.',
    language: 'Python',
    stargazers_count: 3,
    forks_count: 1,
  },
  {
    id: 5,
    name: 'tastifyy',
    html_url: 'https://github.com/PranavShende/tastifyy',
    description: 'Zero-commission restaurant POS and diner ordering platform with offline sync and low-latency menu distribution.',
    language: 'TypeScript',
    stargazers_count: 4,
    forks_count: 2,
  },
  {
    id: 6,
    name: 'pashurakshak',
    html_url: 'https://github.com/PranavShende/pashurakshak',
    description: 'Lightweight quantized convolutional neural network system for veterinary disease detection on edge devices.',
    language: 'Python',
    stargazers_count: 4,
    forks_count: 1,
  },
];

// Reusable hook for responsive, touch-friendly horizontal card sliders
const useHorizontalSlider = (itemCount: number) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const firstChild = el.firstElementChild as HTMLElement | null;
    const childWidth = firstChild ? firstChild.offsetWidth + 16 : 320;
    const index = Math.round(el.scrollLeft / childWidth);
    setActiveIndex(Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0)));
  }, [itemCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, itemCount]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    } else {
      const firstChild = el.firstElementChild as HTMLElement | null;
      const childWidth = firstChild ? firstChild.offsetWidth + 16 : 320;
      el.scrollTo({
        left: index * childWidth,
        behavior: 'smooth',
      });
    }
  };

  return { scrollRef, canScrollLeft, canScrollRight, activeIndex, scroll, scrollToIndex };
};

export const Home: React.FC = () => {
  useAnalytics();
  const navigate = useNavigate();
  const { isDark } = useMode();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [gitRepos, setGitRepos] = useState<any[]>(defaultRepos);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
  const [recentBlogs, setRecentBlogs] = useState<any[]>(defaultBlogs);
  const { getStats: getBlogStatsItem, recordImpressions: recordBlogImpressionsBatch } = useBlogStats();
  const { getProjectViews, recordView: recordProjectView } = useProjectStats();

  const projectSlider = useHorizontalSlider(projectList.length);
  const blogSlider = useHorizontalSlider(recentBlogs.length);
  const repoSlider = useHorizontalSlider(gitRepos.length);

  // Lock body scroll and close on Escape key when project modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  // Dynamic Site Settings (Hero Greeting, Bio, Social destinations)
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('site_settings');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {}
    return {
      siteName: 'Pranav Shende Portfolio',
      heroGreeting: "Hi there! I'm Pranav 👋",
      heroBio: 'An aspiring forward deployed engineer dedicated to building scalable backend architectures and AI solutions.',
      contactEmail: 'pranavshende97@gmail.com',
      githubUrl: 'https://github.com/PranavShende',
      linkedinUrl: 'https://linkedin.com/in/pranavshende',
    };
  });

  // Fetch dynamic settings from database
  useEffect(() => {
    api.getSettings()
      .then((res: any) => {
        const s = res?.data || res;
        if (s && typeof s === 'object') {
          setSiteSettings((prev: any) => {
            const nextSettings = {
              ...prev,
              heroGreeting: s.heroGreeting ?? prev.heroGreeting,
              heroBio: s.heroBio ?? prev.heroBio,
              contactEmail: s.contactEmail ?? prev.contactEmail,
              githubUrl: s.githubUrl ?? prev.githubUrl,
              linkedinUrl: s.linkedinUrl ?? prev.linkedinUrl,
            };
            try {
              localStorage.setItem('site_settings', JSON.stringify(nextSettings));
            } catch {}
            return nextSettings;
          });
        }
      })
      .catch(() => {});
  }, []);

  const renderHeroGreeting = (greeting: string) => {
    if (!greeting) return null;
    if (greeting.includes('Pranav')) {
      const parts = greeting.split('Pranav');
      return (
        <>
          {parts[0]}
          <span className="font-serif italic text-[#8b2323] dark:text-white">Pranav</span>
          {parts.slice(1).join('Pranav')}
        </>
      );
    }
    return greeting;
  };

  // Global listener to open contact modal from sidebar, header, or CTA buttons
  useEffect(() => {
    const handleOpen = () => setContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  // Fetch dynamic projects from backend database with fallback to verified offline data
  useEffect(() => {
    const resolveProjectThumbnail = (p: any): string | undefined => {
      const raw = p.thumbnailUrl || p.bannerUrl || p.imageUrl || p.coverImageUrl;
      return resolveCustomPhoto(raw) || undefined;
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
            highlights: Array.isArray(p.highlights) && p.highlights.length > 0 
              ? p.highlights 
              : (Array.isArray(p.keyFeatures) ? p.keyFeatures : []),
            github: p.githubUrl,
            demo: p.demoUrl || p.liveDemoUrl,
            badge: p.badge || (p.featured || p.isFeatured ? 'Featured' : undefined),
            image: resolveProjectThumbnail(p),
            viewCount: typeof p.viewCount === 'number' ? p.viewCount : (Number(p.viewCount) || 0),
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

  // Fetch recent blog posts for homepage showcase
  useEffect(() => {
    // 1. Instant local hydration from manifest
    fetch('/blogs-manifest.json')
      .then((r) => r.json())
      .then((manifest: any[]) => {
        if (Array.isArray(manifest) && manifest.length > 0) {
          const sorted = [...manifest].sort((a, b) => {
            const orderA = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 9999;
            const orderB = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 9999;
            if (orderA !== orderB) return orderA - orderB;
            return (new Date(b.publishedAt || 0).getTime()) - (new Date(a.publishedAt || 0).getTime());
          });
          setRecentBlogs(sorted.slice(0, 10));
        }
      })
      .catch(() => {});

    // 2. Fetch fresh posts from API
    api.getBlogPosts()
      .then((res: any) => {
        const raw = res?.data || (Array.isArray(res) ? res : []);
        if (Array.isArray(raw) && raw.length > 0) {
          const sorted = [...raw].sort((a, b) => {
            const orderA = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 9999;
            const orderB = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 9999;
            if (orderA !== orderB) return orderA - orderB;
            return (new Date(b.publishedAt || 0).getTime()) - (new Date(a.publishedAt || 0).getTime());
          });
          setRecentBlogs(sorted.slice(0, 10));
        }
      })
      .catch(() => {});
  }, []);

  // Track impressions for blog cards shown in the home page slider
  useEffect(() => {
    if (recentBlogs && recentBlogs.length > 0) {
      const slugs = recentBlogs.map((b: any) => b.slug).filter(Boolean);
      recordBlogImpressionsBatch(slugs);
    }
  }, [recentBlogs, recordBlogImpressionsBatch]);

  // Fetch real repositories from Pranav's GitHub account
  useEffect(() => {
    fetch('https://api.github.com/users/pranavshende/repos?sort=updated&per_page=100')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featuredNames = ['SolarSalesAnalysis', 'HackNation_SKB-F17_SKB_P2', 'EmployeeAttritionSystem', 'tastifyy'];
          const filtered = data.filter((repo: any) => !repo.fork && !featuredNames.includes(repo.name));
          if (filtered.length > 0) {
            setGitRepos(filtered.slice(0, 10));
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingRepos(false));
  }, []);

  return (
    <DoodleLayout>
      <PageSeo
        title="Pranav Shende | Full Stack Developer & AI Engineer"
        description="Explore the portfolio of Pranav Shende, a Full Stack Developer and Forward Deployed Engineer building scalable backend systems, AI-powered applications, RAG solutions and production-ready software."
        canonicalPath="/"
        keywords={[
          'Pranav Shende',
          'Pranav Shende developer',
          'Full Stack Developer Nagpur',
          'Backend Developer India',
          'Forward Deployed Engineer',
          'AI Engineer Portfolio',
          'React Node.js Developer',
          'RAG Application Developer',
          'Backend Architecture Projects',
          'Model Context Protocol',
          'pgvector',
          'PostgreSQL',
          'Kafka',
          'Redis',
          'Distributed Systems',
          'SVPCET Nagpur'
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/',
            'jobTitle': 'Full Stack Developer & Forward Deployed Engineer',
            'description': 'Software engineer building scalable backend architectures, enterprise systems, and AI-powered applications.',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Nagpur',
              'addressRegion': 'Maharashtra',
              'addressCountry': 'IN'
            },
            'sameAs': [
              'https://linkedin.com/in/pranavshende',
              'https://github.com/PranavShende',
              'https://medium.com/@pranavshende97'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'Pranav Shende Portfolio',
            'url': 'https://pranavshende.online/',
            'description': 'Engineering portfolio and technical case studies by Pranav Shende.'
          }
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────
          HERO STATEMENT (Mockup match)
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]">
            <span>&lt;//&gt;</span>
            <span>Welcome to my portfolio</span>
          </div>
          <div className="px-1.5 py-0.5 rounded-xs border border-[#8b2323] text-[#8b2323] text-[10px] font-serif font-bold tracking-widest bg-[#8b2323]/5">
            開発者
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight select-text">
          {renderHeroGreeting(siteSettings.heroGreeting)}
        </h1>

        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 mt-3 font-normal leading-relaxed max-w-3xl">
          {siteSettings.heroBio}
        </p>

        {/* Hero Tag Pills - Paper Theme */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917]">
            <GraduationCap className="w-4 h-4 text-[#8b2323]" />
            <span>B.Tech IT @ SVPCET</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917]">
            <Layers className="w-4 h-4 text-[#8b2323]" />
            <span>Backend & AI</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917]">
            <Target className="w-4 h-4 text-[#8b2323]" />
            <span>Building for Impact</span>
          </span>
        </div>

        {/* ── Slim Contact & Opportunity Card (Paper Block) ── */}
        <div className="mt-5 p-4 sm:p-5 lg:p-6 rounded-2xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000] relative overflow-hidden transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b2323] via-[#b91c1c] to-[#8b2323]" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 font-mono">
                  Available for Opportunities & Projects
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                Let's connect & build something impactful.
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                Open to full-time SWE roles, freelance software architecture, and technical collaborations.
              </p>
            </div>

            {/* All action buttons with generous breathing room and natural wrap */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 pt-1 lg:pt-0">
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </button>
              <a
                href={siteSettings.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:scale-95 shrink-0 whitespace-nowrap"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteSettings.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:scale-95 shrink-0 whitespace-nowrap"
                title="View GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://medium.com/@pranavshende97"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:scale-95 shrink-0 whitespace-nowrap"
                title="Read on Medium"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100">
                  <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                <span>Medium</span>
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteSettings.contactEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:scale-95 shrink-0 whitespace-nowrap"
                title="Direct Gmail"
              >
                <Mail className="w-3.5 h-3.5 text-[#ea4335]" />
                <span>Gmail</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FEATURED PROJECTS (Sliding Mode)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-[#8b2323] rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
              Featured Projects
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-stone-900/20 dark:border-stone-700 bg-white/60 dark:bg-stone-800/60 text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400">
              <Sparkles className="w-2.5 h-2.5 text-[#8b2323]" />
              <span>Slide to explore</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slider Navigation Chevrons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => projectSlider.scroll('left')}
                disabled={!projectSlider.canScrollLeft}
                className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#000000] hover:shadow-[0.5px_0.5px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Previous project slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => projectSlider.scroll('right')}
                disabled={!projectSlider.canScrollRight}
                className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#000000] hover:shadow-[0.5px_0.5px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Next project slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#8b2323] hover:text-[#721c1c] transition-colors pl-2"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sliding Track */}
        <div
          ref={projectSlider.scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-2 px-2"
        >
          {projectList.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                recordProjectView(proj.id);
                setSelectedProject(proj);
              }}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start group cursor-pointer rounded-2xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all overflow-hidden flex flex-col justify-between p-2.5 sm:p-3"
            >
              {/* Banner with badge: only rendered if custom photo from Supabase exists */}
              {proj.image && (
                <div className="mb-2">
                  <LoadingThumbnail
                    src={proj.image}
                    alt={proj.title}
                    aspectClass="aspect-video w-full rounded-xl border-2 border-stone-900 dark:border-stone-700 shadow-[1.5px_1.5px_0px_#1c1917]"
                    badge={proj.badge && (
                      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-2 border-stone-900 font-mono font-bold text-[9px] px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#1c1917]">
                        {proj.badge}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Footer row */}
              <div className="flex items-center justify-between gap-2.5 pt-1">
                <div className="min-w-0 flex-1">
                  {!proj.image && proj.badge && (
                    <span className="inline-block mb-1.5 bg-[#8b2323]/10 dark:bg-stone-800 text-[#8b2323] dark:text-rose-400 border border-[#8b2323]/30 dark:border-stone-700 font-mono font-bold text-[9px] px-2 py-0.5 rounded-full">
                      {proj.badge}
                    </span>
                  )}
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] transition-colors truncate">
                    {proj.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {proj.client} • {proj.category} • {proj.year}
                    </p>
                    {(() => {
                      const pViews = getProjectViews(proj.id, proj.viewCount || 0);
                      return (
                        <span 
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 font-mono text-[9px] font-semibold text-stone-700 dark:text-stone-300 shrink-0"
                          title={`${pViews} project views`}
                        >
                          <Eye className="w-2.5 h-2.5 text-[#8b2323] dark:text-rose-400 shrink-0" />
                          <span>{pViews}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Circular arrow button */}
                <div className="w-7 h-7 rounded-full border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100 shadow-[1px_1px_0px_#1c1917] group-hover:bg-[#8b2323] group-hover:text-white transition-all shrink-0">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Pagination Pill Dots */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          {projectList.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => projectSlider.scrollToIndex(i)}
              aria-label={`Go to project slide ${i + 1}`}
              className={`transition-all duration-200 rounded-full cursor-pointer ${
                projectSlider.activeIndex === i
                  ? 'w-6 h-2 bg-[#8b2323]'
                  : 'w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TECHNICAL BLOG & SYSTEMS INSIGHTS (Sliding Mode)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-[#8b2323] rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
              Technical Blog & Systems Insights
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-stone-900/20 dark:border-stone-700 bg-white/60 dark:bg-stone-800/60 text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400">
              <BookOpen className="w-2.5 h-2.5 text-[#8b2323]" />
              <span>Slide to explore</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slider Navigation Chevrons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => blogSlider.scroll('left')}
                disabled={!blogSlider.canScrollLeft}
                className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#000000] hover:shadow-[0.5px_0.5px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Previous blog slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => blogSlider.scroll('right')}
                disabled={!blogSlider.canScrollRight}
                className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#000000] hover:shadow-[0.5px_0.5px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Next blog slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer ml-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sliding Track */}
        <div
          ref={blogSlider.scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-2 px-2"
        >
          {recentBlogs.map((post) => {
            const stats = getBlogStatsItem(post.slug, post.viewCount || 0, post.impressionCount || 0);

            return (
              <Link
                key={post.id || post.slug}
                to={`/blog/${post.slug}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start group p-4 sm:p-5 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Small compact thumbnail: only rendered if custom photo from Supabase bucket exists */}
                  {resolveCustomPhoto(post.coverImageUrl) ? (
                    <LoadingThumbnail
                      src={resolveCustomPhoto(post.coverImageUrl)}
                      alt={post.title}
                      aspectClass="w-full h-28 sm:h-32 rounded-2xl border border-stone-900/15 dark:border-stone-700 shadow-xs"
                      badge={(
                        <span className="px-2 py-0.5 rounded-md border border-stone-900/30 dark:border-stone-700 bg-white/95 dark:bg-stone-900/90 text-[#8b2323] dark:text-rose-400 font-serif font-bold text-[10px] tracking-wider shadow-xs backdrop-blur-xs">
                          {post.category || (post.tags && post.tags[0]) || 'Architecture'}
                        </span>
                      )}
                    />
                  ) : (
                    <div>
                      <span className="px-2 py-0.5 rounded-xs border border-[#8b2323] bg-[#8b2323]/5 text-[#8b2323] dark:text-rose-400 font-serif font-bold text-[10px] tracking-wider inline-block">
                        {post.category || (post.tags && post.tags[0]) || 'Architecture'}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    {/* Live Real-time Views Badge */}
                    <span 
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 font-semibold text-stone-700 dark:text-stone-300"
                      title={`${stats.views} total views`}
                    >
                      <Eye className="w-3 h-3 text-[#8b2323] dark:text-rose-400 shrink-0" />
                      <span>{stats.views}</span>
                      <span className="text-[9px] text-stone-400 font-normal">views</span>
                    </span>

                    <span className="text-stone-500 text-[11px]">{post.readingTimeMinutes || 5} min read</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Article'}
                    </span>
                    <span className="text-[#8b2323] dark:text-rose-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dynamic Pagination Pill Dots */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          {recentBlogs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => blogSlider.scrollToIndex(i)}
              aria-label={`Go to blog slide ${i + 1}`}
              className={`transition-all duration-200 rounded-full cursor-pointer ${
                blogSlider.activeIndex === i
                  ? 'w-6 h-2 bg-[#8b2323]'
                  : 'w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH PUBLICATIONS SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-16 pt-2">
        <div className="border-b-2 border-stone-900/20 dark:border-stone-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8b2323] dark:text-rose-400" />
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-sans">
              Research Publications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Research Paper 1 – Alumni–Student Networking Ecosystem */}
          <div
            onClick={() => navigate('/blog/beyond-alumni-directories-building-an-intelligent-ai-powered-alumni-student-networking-ecosystem')}
            className="group relative p-5 sm:p-6 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-xs border border-teal-800 text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 text-[10px] font-bold uppercase font-mono tracking-wider">
                  IJACTE Journal • Peer-Reviewed
                </span>
                <span className="text-[10px] font-mono text-stone-400">May 2025</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors leading-snug">
                <Link
                  to="/blog/beyond-alumni-directories-building-an-intelligent-ai-powered-alumni-student-networking-ecosystem"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  Beyond Alumni Directories: Building an Intelligent AI-Powered Alumni–Student Networking Ecosystem
                </Link>
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Published in the International Journal on Advanced Computer Theory and Engineering, 14(1): 193–197, May 2025. Mentorship and career matchmaking platform connecting alumni with undergraduate students.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-y-2.5 gap-x-3 text-xs">
              <a
                href="https://doi.org/10.65521/ijacte.v14i1.388"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#8b2323] dark:hover:text-rose-400 hover:underline font-mono whitespace-nowrap min-w-0"
                title="View original publication on IJACTE: 10.65521/ijacte.v14i1.388"
              >
                <span>doi: 10.65521/ijacte.v14i1.388</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>

              <Link
                to="/blog/beyond-alumni-directories-building-an-intelligent-ai-powered-alumni-student-networking-ecosystem"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#1c1917] group-hover:translate-x-0.5 transition-all shrink-0 ml-auto"
              >
                <span>Read Publication</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Research Paper 2 – Lumpy Skin Disease Detection */}
          <div
            onClick={() => navigate('/blog/ai-veterinary-healthcare-lumpy-skin-disease-detection')}
            className="group relative p-5 sm:p-6 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-xs border border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-[10px] font-bold uppercase font-mono tracking-wider">
                  IEEE Conference • OTCON 2025
                </span>
                <span className="text-[10px] font-mono text-stone-400">Feb 2025</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors leading-snug">
                <Link
                  to="/blog/ai-veterinary-healthcare-lumpy-skin-disease-detection"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  How AI Can Transform Veterinary Healthcare: Detecting Lumpy Skin Disease
                </Link>
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Presented at the 2025 4th OPJU International Conference on Technology and Management (IEEE). Explores quantized lightweight convolutional networks for rural veterinary disease diagnostics.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-y-2.5 gap-x-3 text-xs">
              <a
                href="https://doi.org/10.1109/OTCON65728.2025.11070341"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#8b2323] dark:hover:text-rose-400 hover:underline font-mono whitespace-nowrap min-w-0"
                title="View original publication on IEEE Xplore: 10.1109/OTCON65728.2025.11070341"
              >
                <span>doi: 10.1109/OTCON65728.2025.11070341</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>

              <Link
                to="/blog/ai-veterinary-healthcare-lumpy-skin-disease-detection"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#1c1917] group-hover:translate-x-0.5 transition-all shrink-0 ml-auto"
              >
                <span>Read Publication</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          OTHER NOTEWORTHY REPOSITORIES (Sliding Mode)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-10 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-900/20 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Github className="w-4 h-4 text-[#8b2323] dark:text-rose-400" />
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-sans">
              Other Noteworthy Repositories
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-stone-900/20 dark:border-stone-700 bg-white/60 dark:bg-stone-800/60 text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400">
              <span>Slide to explore</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Slider Navigation Chevrons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => repoSlider.scroll('left')}
                disabled={!repoSlider.canScrollLeft}
                className="w-7 h-7 rounded-lg border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1px_1px_0px_#1c1917] dark:shadow-[1px_1px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Previous repository slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => repoSlider.scroll('right')}
                disabled={!repoSlider.canScrollRight}
                className="w-7 h-7 rounded-lg border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center shadow-[1px_1px_0px_#1c1917] dark:shadow-[1px_1px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Next repository slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={siteSettings.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#8b2323] dark:text-rose-400 hover:underline"
            >
              View all on GitHub →
            </a>
          </div>
        </div>

        {/* Sliding Track */}
        <div
          ref={repoSlider.scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-2 px-2"
        >
          {gitRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[260px] sm:w-[290px] md:w-[320px] shrink-0 snap-start group flex flex-col justify-between p-4 sm:p-5 rounded-2xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all min-h-[160px]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
                    Repo
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 dark:group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {repo.description || 'Public repository on GitHub.'}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                {repo.language && (
                  <span className="font-mono text-[11px] font-bold text-stone-700 dark:text-stone-300">
                    {repo.language}
                  </span>
                )}
                <div className="flex items-center gap-2.5">
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-stone-700 dark:text-stone-300">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Dynamic Pagination Pill Dots */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          {gitRepos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => repoSlider.scrollToIndex(i)}
              aria-label={`Go to repository slide ${i + 1}`}
              className={`transition-all duration-200 rounded-full cursor-pointer ${
                repoSlider.activeIndex === i
                  ? 'w-6 h-2 bg-[#8b2323]'
                  : 'w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          GITHUB CONTRIBUTION CALENDAR
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-12 pt-2">
        <div className="border-b-2 border-stone-900/20 dark:border-stone-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-[#8b2323] dark:text-rose-400" />
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-sans">
              GitHub Contribution Heatmap
            </h2>
          </div>
          <a
            href={siteSettings.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#8b2323] dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>@{siteSettings.githubUrl?.split('/').filter(Boolean).pop() || 'PranavShende'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 p-4 sm:p-6 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Live Open-Source & Personal Commits
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Continuous integration & build contributions across repositories
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-stone-600 dark:text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live GitHub Sync</span>
            </div>
          </div>

          <div
            className="w-full overflow-x-auto pb-2 pt-2 flex justify-center no-scrollbar rounded-2xl p-3 sm:p-4 bg-stone-50/70 dark:bg-[#0d1117] border-2 border-stone-900/40 dark:border-stone-800"
          >
            <GitHubCalendar
              username={siteSettings.githubUrl?.split('/').filter(Boolean).pop() || 'PranavShende'}
              theme={isDark ? ghDarkTheme : ghLightTheme}
              colorScheme={isDark ? 'dark' : 'light'}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              style={{
                color: isDark ? '#c9d1d9' : '#24292f',
              }}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECT DETAIL MODAL (Portal to document.body, z-[99999])
      ────────────────────────────────────────────────────────────── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-auto">
              {/* Fullscreen Backdrop Click to Close */}
              <div
                className="absolute inset-0 bg-transparent"
                onClick={() => setSelectedProject(null)}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-xl max-h-[85dvh] sm:max-h-[88dvh] flex flex-col bg-[#faf7f0] dark:bg-[#16171b] rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] overflow-hidden"
              >
                {/* Pinned Modal Header */}
                <div className="p-4 sm:p-6 pb-3 sm:pb-3 flex items-start justify-between border-b-2 border-stone-900/15 dark:border-stone-800 shrink-0 bg-[#faf7f0]/95 dark:bg-[#16171b]/95 backdrop-blur-xs">
                  <div className="space-y-0.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold uppercase text-[#8b2323] dark:text-rose-400 tracking-wider">
                        {selectedProject.client} • {selectedProject.category}
                      </span>
                      {(() => {
                        const mViews = getProjectViews(selectedProject.id, selectedProject.viewCount || 0);
                        return (
                          <span 
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 font-mono text-[10px] font-semibold text-stone-700 dark:text-stone-300"
                            title={`${mViews} project views`}
                          >
                            <Eye className="w-2.5 h-2.5 text-[#8b2323] dark:text-rose-400 shrink-0" />
                            <span>{mViews} views</span>
                          </span>
                        );
                      })()}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                      {selectedProject.subtitle}
                    </h2>
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                      {selectedProject.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 sm:p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Modal Content */}
                <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 overscroll-contain">
                  {/* Image banner: only if custom photo exists from Supabase */}
                  {selectedProject.image && (
                    <LoadingThumbnail
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      aspectClass="w-full aspect-video rounded-2xl border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917]"
                    />
                  )}

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-stone-900 dark:text-stone-100 tracking-wider">
                      Key Achievements
                    </h4>
                    <div className="space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      {selectedProject.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase text-stone-900 dark:text-stone-100 tracking-wider">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs border-2 border-stone-900 dark:border-stone-700 shadow-[1.5px_1.5px_0px_#1c1917]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions (Full width stacked on mobile, row on tablet/desktop) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 border-t-2 border-stone-900/20 dark:border-stone-800">
                    {selectedProject.github && selectedProject.github !== 'private' ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>View GitHub Repo</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-medium border-2 border-stone-400 dark:border-stone-700">
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
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Live Platform</span>
                        </a>
                      ) : (
                        <Link
                          to={selectedProject.demo}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Launch in Arcade</span>
                        </Link>
                      )
                    )}

                    <Link
                      to={`/projects/${selectedProject.id === 'jarvis' ? 'jarvis-ai' : selectedProject.id === 'electropathy' ? 'electropathy-ai' : selectedProject.id === 'jansampark' ? 'jan-sampark' : selectedProject.id === 'solar-analytics' ? 'solar-intelligence' : selectedProject.id === 'attrition' ? 'employee-attrition-ai' : selectedProject.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>Case Study</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Direct Contact Modal with Instant Automated Confirmation Email */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </DoodleLayout>
  );
};

export default Home;
