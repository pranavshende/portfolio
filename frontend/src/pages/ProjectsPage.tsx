import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Star, GitFork, ArrowUpRight, Search, 
  Layers, Sparkles, Code2, Terminal, Filter, CheckCircle2, Lock, Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DoodleLayout } from '@/components/DoodleLayout';
import { PageSeo } from '@/components/PageSeo';
import useAnalytics from '@/hooks/useAnalytics';
import { api } from '@/lib/api';
import { LoadingThumbnail, resolveCustomPhoto } from '@/components/LoadingThumbnail';


interface RepoMeta {
  title?: string;
  category: string;
  tier: 1 | 2 | 3; // 1 = Flagship / Best, 2 = Core / Specialized, 3 = Educational / Utility
  description: string;
  tech: string[];
  badge?: string;
  demoUrl?: string;
  image?: string;
}

// Curated enrichment dictionary for Pranav's GitHub repositories
const REPO_REGISTRY: Record<string, RepoMeta> = {
  'jarvis-mcp-multipleDBs': {
    title: 'Jarvis 1.0 Enterprise AI Platform',
    category: 'Enterprise AI & MCP Architecture',
    tier: 1,
    description: 'Autonomous enterprise intelligence platform with official Model Context Protocol (MCP v1.0.4) streaming, deterministic star-schema SQL calculations across 35 tables, pgvector hybrid RAG with 749+ chunks, and Google Gemini 2.5 Pro/Flash dynamic model routing.',
    tech: ['Google Gemini 2.5 Pro', 'Model Context Protocol (MCP)', 'Fastify Gateway', 'pgvector RAG', 'Deterministic SQL', 'Supabase', 'BullMQ'],
    badge: 'Live Enterprise',
    demoUrl: 'https://jarvis.pranavshende.online/',
  },
  jarvis: {
    title: 'Jarvis 1.0 Enterprise AI Platform',
    category: 'Enterprise AI & MCP Architecture',
    tier: 1,
    description: 'Autonomous enterprise intelligence platform with official Model Context Protocol (MCP v1.0.4) streaming, deterministic star-schema SQL calculations across 35 tables, pgvector hybrid RAG with 749+ chunks, and Google Gemini 2.5 Pro/Flash dynamic model routing.',
    tech: ['Google Gemini 2.5 Pro', 'Model Context Protocol (MCP)', 'Fastify Gateway', 'pgvector RAG', 'Deterministic SQL', 'Supabase', 'BullMQ'],
    badge: 'Live Enterprise',
    demoUrl: 'https://jarvis.pranavshende.online/',
  },
  Electropathy_AI: {
    title: 'Electropathy AI Clinical Engine',
    category: 'Agentic AI & Healthcare',
    tier: 1,
    description: 'Agentic clinical decision-support & medical knowledge engine with pgvector semantic search and multilingual RAG copilot in English, Hindi & Marathi. Zero hallucination retrieval grounding.',
    tech: ['Agentic RAG', 'pgvector', 'TypeScript', 'Node.js', 'Supabase', 'Prisma ORM'],
    badge: 'Live Production',
    demoUrl: 'https://client-raprax.vercel.app',
  },
  tastifyy: {
    title: 'Tastifyy Delivery Ecosystem',
    category: 'Distributed Logistics',
    tier: 1,
    description: 'On-demand multi-role food delivery platform featuring Kafka event-driven dispatch pipelines, Redis geospatial caching, React 19 web portal, Expo mobile app, and live Socket.io tracking.',
    tech: ['Kafka Streams', 'Redis Geospatial', 'React 19', 'React Native', 'TypeScript', 'Socket.io'],
    badge: 'Production Shipped',
    demoUrl: 'https://www.tastifyy.in',
  },
  EmployeeAttritionSystem: {
    title: 'Employee Attrition AI',
    category: 'Predictive ML & Analytics',
    tier: 1,
    description: 'End-to-end workforce risk intelligence platform with instant dynamic CSV dataset ingestion, 11 interactive Chart.js visualizations, and an intelligent Gemini 2.5 Flash copilot.',
    tech: ['Google Gemini 2.5', 'Predictive ML', 'Python (Flask)', 'React 19', 'Chart.js', 'Redis'],
    badge: 'Gemini 2.5 Flash',
  },
  PashuRakshak: {
    title: 'PashuRakshak Diagnostics',
    category: 'Edge Computing & Computer Vision',
    tier: 1,
    description: 'Offline-first Edge AI veterinary diagnostics system with quantized TensorFlow Lite CNNs (INT8) for sub-120ms livestock disease detection in zero-connectivity rural farms. Published at IEEE.',
    tech: ['Edge Computing', 'TensorFlow Lite INT8', 'Computer Vision', 'React Native', 'IEEE Research'],
    badge: 'IEEE Published',
  },
  'HackNation_SKB-F17_SKB_P2': {
    title: 'PashuRakshak Edge Mobile Pipeline',
    category: 'Edge Computing & IoT',
    tier: 1,
    description: 'Core mobile client and on-device INT8 quantized inference engine for PashuRakshak, featuring offline telemetry queuing, SQLite local storage, and veterinary dispatch routing.',
    tech: ['TensorFlow Lite', 'React Native', 'Offline-First', 'SQLite', 'IEEE OTCON'],
    badge: 'IEEE Published',
  },
  SolarSalesAnalysis: {
    title: 'Solar Intelligence Platform',
    category: 'CleanTech Big Data & GIS',
    tier: 1,
    description: 'CleanTech big data intelligence platform analyzing 10+ years (2014–2024) of solar energy across 36+ states/UTs covering 81.8+ GW with automated ETL pipelines, GIS heatmaps, and polynomial forecasting to 2030.',
    tech: ['CleanTech Big Data', 'Geospatial GIS', 'Python', 'PostgreSQL', 'Polynomial Regression', 'Recharts'],
    badge: 'CleanTech Big Data',
  },
  citywidecamersur: {
    title: 'Citywide Camera Surveillance System',
    category: 'Computer Vision & Smart City',
    tier: 1,
    description: 'Distributed urban video surveillance and camera intelligence network with real-time video stream monitoring, incident alerting, and geo-spatial camera mapping.',
    tech: ['Computer Vision', 'Video Streaming', 'TypeScript', 'Node.js', 'PostgreSQL'],
    badge: 'Smart City Vision',
  },
  TruliaCare_Appathon: {
    title: 'TruliaCare: Telehealth & Automated SLA Escalation Engine',
    category: 'Healthcare & SLA Escalation',
    tier: 1,
    description: 'Telehealth and emergency response platform featuring an automated dual-tier SLA escalation engine. Runs background cron breach jobs, atomic Prisma $transactions with optimistic concurrency guards, multi-channel email/push dispatch, and live SlaTimer countdown widgets.',
    tech: ['Dual-Tier SLA Engine', 'Background Cron Jobs', 'Prisma Transactions', 'React Native (Expo)', 'Node.js', 'Audit Logging'],
    badge: 'Automated Escalation',
  },
  'Credit-Score-Invisibility-Farmer': {
    title: 'Farmer Alternative Credit Scoring',
    category: 'FinTech & Agricultural Inclusion',
    tier: 1,
    description: 'Alternative credit scoring platform evaluating agricultural risk and seasonal yield metrics to overcome credit invisibility for unbanked rural farmers.',
    tech: ['FinTech', 'Predictive Scoring', 'TypeScript', 'Data Science', 'Financial Inclusion'],
    badge: 'FinTech AI',
  },
  jansampark: {
    title: 'JanSampark Civic Governance Platform',
    category: 'Civic Enterprise & Mobile Systems',
    tier: 1,
    description: 'Enterprise civic governance platform bridging citizens and administration with 25+ React Native modules, offline geo-tagging, JWT + RBAC security across 4 administrative roles, and high-concurrency Node.js REST APIs.',
    tech: ['Enterprise Architecture', 'React Native', 'Node.js', 'PostgreSQL', 'RBAC Security', 'JWT'],
    badge: 'Civic Enterprise',
    demoUrl: '/arcade?folder=projects_folder',
  },
  StockMarketIntelligence: {
    title: 'Stock Market Intelligence Engine',
    category: 'Quantitative Finance & Analytics',
    tier: 2,
    description: 'Financial market analytics engine calculating technical indicators, volatility forecasts, and historical price momentum for portfolio risk assessment.',
    tech: ['Financial Analytics', 'Python', 'Time Series', 'Technical Analysis'],
    badge: 'Quant Analytics',
  },
  portfolio: {
    title: 'Full-Stack Portfolio Engine v2',
    category: 'Web Engineering & Architecture',
    tier: 2,
    description: 'High-performance developer portfolio built with React 19, TypeScript, Express API gateway, Prisma ORM, Supabase PostgreSQL, and live analytics telemetry.',
    tech: ['React 19', 'TypeScript', 'Express', 'Prisma', 'Supabase', 'Tailwind CSS'],
    badge: 'Production V2',
  },
  'GHG-Emission': {
    title: 'GHG Emission Analytics Dashboard',
    category: 'Environmental Data Science',
    tier: 2,
    description: 'Greenhouse gas emission analytics dashboard aggregating industrial carbon footprints and regional emissions data with visual compliance benchmarks.',
    tech: ['Data Analytics', 'HTML5', 'CSS3', 'JavaScript', 'Charts'],
    badge: 'Sustainability',
  },
  DSAQUESTIONS: {
    title: 'Data Structures & Algorithms Repository',
    category: 'Algorithms & Problem Solving',
    tier: 2,
    description: 'Comprehensive repository of LeetCode and competitive programming solutions covering trees, dynamic programming, graphs, sliding windows, and bit manipulation.',
    tech: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms'],
    badge: 'Problem Solving',
  },
  Topic_Wise_Java: {
    title: 'Topic-Wise Java Engineering Suite',
    category: 'Core Computer Science',
    tier: 2,
    description: 'Curated Java engineering solutions covering Object-Oriented Design, multi-threading, JVM memory models, generics, collections, and modular design patterns.',
    tech: ['Java', 'OOP', 'Concurrency', 'Design Patterns'],
    badge: 'Core Java',
  },
  Topic_Wise_Python: {
    title: 'Topic-Wise Python Problem Solving',
    category: 'Core Computer Science',
    tier: 2,
    description: 'Topic-wise Python master repository from beginner to advanced: decorators, generators, OOP, complex algorithmic problems, and interview challenges.',
    tech: ['Python', 'OOP', 'Data Structures', 'Functional Programming'],
    badge: 'Core Python',
  },
  LeetCode: {
    title: 'LeetCode Algorithmic Practice',
    category: 'Competitive Programming',
    tier: 2,
    description: 'Collection of solved LeetCode challenges with optimized space and time complexity analyses in Java.',
    tech: ['Java', 'Algorithms', 'Competitive Programming'],
    badge: 'Algorithms',
  },
  demofrontend: {
    title: 'Frontend UI Sandbox Prototype',
    category: 'Experimental Prototype',
    tier: 3,
    description: 'Interactive client prototype experimenting with responsive layout components and modern web user flows.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'UI Prototype'],
    badge: 'Sandbox Prototype',
  },
  pathway: {
    title: 'Pathway (Open-Source Fork)',
    category: 'Stream Processing Fork',
    tier: 3,
    description: 'Python ETL framework for stream processing, real-time analytics, LLM pipelines, and RAG.',
    tech: ['Python', 'ETL', 'Stream Processing', 'Fork'],
    badge: 'Open-Source Fork',
  },
  hyperswitch: {
    title: 'Hyperswitch (Open-Source Fork)',
    category: 'Payment Systems Fork',
    tier: 3,
    description: 'An open source payments switch written in Rust to make payments fast, reliable and affordable.',
    tech: ['Rust', 'FinTech', 'Payments', 'Fork'],
    badge: 'Open-Source Fork',
  },
  'llm-app': {
    title: 'LLM App Templates (Open-Source Fork)',
    category: 'AI Templates Fork',
    tier: 3,
    description: 'Ready-to-run cloud templates for RAG, AI pipelines, and enterprise search with live data.',
    tech: ['Python', 'Docker', 'RAG', 'Fork'],
    badge: 'Open-Source Fork',
  },
  forge: {
    title: 'Forge AI Pair Programmer (Fork)',
    category: 'Developer Tools Fork',
    tier: 3,
    description: 'AI enabled pair programmer for Claude, GPT, Grok, DeepSeek, and Gemini models.',
    tech: ['AI Tools', 'Developer Utilities', 'Fork'],
    badge: 'Open-Source Fork',
  },
};

interface ProjectItem {
  id: string | number;
  name: string;
  title: string;
  category: string;
  tier: 1 | 2 | 3;
  description: string;
  tech: string[];
  badge?: string;
  demoUrl?: string;
  githubUrl: string;
  image?: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  isFork: boolean;
}

export const ProjectsPage: React.FC = () => {
  useAnalytics();
  const [repos, setRepos] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'flagship' | 'ai' | 'algorithms'>('all');

  useEffect(() => {
    const resolveProjectThumbnail = (p: any): string | undefined => {
      const raw = p.thumbnailUrl || p.bannerUrl || p.imageUrl || p.coverImageUrl;
      return resolveCustomPhoto(raw) || undefined;
    };

    Promise.allSettled([
      api.getProjects(),
      fetch('https://api.github.com/users/pranavshende/repos?per_page=100&sort=updated').then(r => r.json())
    ]).then(([dbResult, ghResult]) => {
      const items: ProjectItem[] = [];
      const seenNames = new Set<string>();

      // 1. Process Database / CMS Projects First (Tier 1 Flagships)
      if (dbResult.status === 'fulfilled' && dbResult.value?.data && Array.isArray(dbResult.value.data)) {
        dbResult.value.data.forEach((p: any) => {
          const slugName = (p.slug || p.id).toLowerCase();
          seenNames.add(slugName);
          if (p.githubUrl) {
            const parts = p.githubUrl.split('/');
            const repoSlug = parts[parts.length - 1]?.toLowerCase();
            if (repoSlug) seenNames.add(repoSlug);
          }

          items.push({
            id: p.id,
            name: p.slug || p.title,
            title: p.title,
            category: p.category || 'Software Engineering',
            tier: 1,
            description: p.description || p.subtitle || '',
            tech: Array.isArray(p.techStack) ? p.techStack : [],
            badge: p.badge || (p.featured || p.isFeatured ? 'Featured' : 'Live Production'),
            demoUrl: p.demoUrl || p.liveDemoUrl,
            githubUrl: p.githubUrl || 'https://github.com/pranavshende',
            image: resolveProjectThumbnail(p),
            stars: 1,
            forks: 0,
            language: Array.isArray(p.techStack) && p.techStack[0] ? p.techStack[0] : 'TypeScript',
            updatedAt: p.updatedAt || '2026-11-08',
            isFork: false,
          });
        });
      }

      // 2. Process GitHub Repositories
      if (ghResult.status === 'fulfilled' && Array.isArray(ghResult.value)) {
        ghResult.value
          .filter((r: any) => r.name !== 'pranavshende') // Hide GitHub profile README repo
          .forEach((r: any) => {
            const lowerName = r.name.toLowerCase();
            if (seenNames.has(lowerName)) return; // Already represented by DB project

            const meta: RepoMeta = REPO_REGISTRY[r.name] || {
              title: r.name,
              category: r.fork ? 'Open-Source Fork' : 'Software Repository',
              tier: r.fork ? 3 : 2,
              description: r.description || 'Public software engineering repository on GitHub.',
              tech: [r.language || 'Code'].filter(Boolean),
              badge: r.fork ? 'Forked Repo' : (r.stargazers_count > 0 ? 'Starred' : undefined),
              demoUrl: undefined,
              image: undefined,
            };

            items.push({
              id: r.id,
              name: r.name,
              title: meta.title || r.name,
              category: meta.category,
              tier: meta.tier,
              description: meta.description || r.description || 'Public engineering repository on GitHub.',
              tech: meta.tech && meta.tech.length > 0 ? meta.tech : [r.language || 'Code'],
              badge: meta.badge,
              demoUrl: meta.demoUrl,
              githubUrl: r.html_url,
              image: meta.image,
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              language: r.language || 'TypeScript',
              updatedAt: r.pushed_at,
              isFork: r.fork,
            });
            seenNames.add(lowerName);
          });
      }

      // Sort: Jarvis strictly #1 -> Tier 1 -> Tier 2 -> Tier 3
      items.sort((a, b) => {
        const isJarvisA = a.name.toLowerCase().includes('jarvis') || a.title.toLowerCase().includes('jarvis');
        const isJarvisB = b.name.toLowerCase().includes('jarvis') || b.title.toLowerCase().includes('jarvis');
        if (isJarvisA && !isJarvisB) return -1;
        if (!isJarvisA && isJarvisB) return 1;
        if (a.tier !== b.tier) return a.tier - b.tier;
        return b.stars - a.stars;
      });

      setRepos(items);
    }).finally(() => setLoading(false));
  }, []);

  // Filtered repositories based on search and category tab
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // Search matching
      const matchesSearch =
        repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category filter matching
      if (selectedFilter === 'flagship') {
        return repo.tier === 1;
      }
      if (selectedFilter === 'ai') {
        return (
          repo.category.toLowerCase().includes('ai') ||
          repo.tech.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('rag') || t.toLowerCase().includes('gemini') || t.toLowerCase().includes('vision'))
        );
      }
      if (selectedFilter === 'algorithms') {
        return (
          repo.category.toLowerCase().includes('algorithm') ||
          repo.category.toLowerCase().includes('science') ||
          repo.name.toLowerCase().includes('dsa') ||
          repo.name.toLowerCase().includes('leetcode') ||
          repo.name.toLowerCase().includes('topic')
        );
      }

      return true;
    });
  }, [repos, searchQuery, selectedFilter]);

  // Group by Tiers for clear visual hierarchy
  const tier1Projects = useMemo(() => filteredRepos.filter((r) => r.tier === 1), [filteredRepos]);
  const tier2Projects = useMemo(() => filteredRepos.filter((r) => r.tier === 2), [filteredRepos]);
  const tier3Projects = useMemo(() => filteredRepos.filter((r) => r.tier === 3), [filteredRepos]);

  return (
    <DoodleLayout>
      <PageSeo
        title="All Projects & Engineering Repositories | Pranav Shende"
        description="Explore the complete engineering portfolio of Pranav Shende — featuring autonomous AI platforms, RAG systems, distributed Kafka pipelines, and edge computing architectures."
        canonicalPath="/projects"
        keywords={[
          'All Projects Pranav Shende',
          'Software Engineering Repositories',
          'Autonomous AI Systems',
          'RAG Architecture Projects',
          'Distributed Kafka Pipelines',
          'Model Context Protocol',
          'Full Stack Developer Portfolio'
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': 'All Projects & Engineering Repositories by Pranav Shende',
          'description': 'Curated collection of engineering software architectures, AI systems, and distributed platforms.',
          'url': 'https://pranavshende.online/projects',
          'author': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/'
          }
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-serif font-bold text-[#8b2323] dark:text-rose-400 bg-[#8b2323]/5 border border-[#8b2323] tracking-widest mb-4 shadow-[1.5px_1.5px_0px_#1c1917]">
          <span>[カタログ]</span>
          <span>GitHub Code Catalog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight select-text">
              All <span className="font-serif italic text-[#8b2323] dark:text-rose-400">Projects</span> & Repositories
            </h1>
            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 mt-2.5 font-normal leading-relaxed max-w-2xl">
              Curated catalog of software engineering systems scanned live from GitHub — organized with flagship production architectures at the top.
            </p>
          </div>

          <a
            href="https://github.com/pranavshende?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all self-start md:self-auto shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>View All on GitHub</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, language, architecture..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#181920] border-2 border-stone-900 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'flagship', label: 'Flagship Systems' },
              { id: 'ai', label: 'AI & ML' },
              { id: 'algorithms', label: 'Algorithms & DSA' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-2 border-stone-900 dark:border-stone-700 ${
                  selectedFilter === tab.id
                    ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                    : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1c1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-6">
          <div className="h-6 w-48 bg-stone-200 dark:bg-stone-800 rounded-md animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-stone-100 dark:bg-stone-800/40 border-2 border-stone-900/30 dark:border-stone-800 animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* ─────────────────────────────────────────────────────────────
              TIER 1: FLAGSHIP PRODUCTION ARCHITECTURES (TOP)
          ────────────────────────────────────────────────────────────── */}
          {tier1Projects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between pb-1 border-b-2 border-stone-900/20 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-5 bg-[#8b2323] rounded-full" />
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                    Flagship Systems & Production Architectures
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400">
                  {tier1Projects.length} Flagship {tier1Projects.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tier1Projects.map((p) => (
                  <div
                    key={p.name}
                    className="group rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 p-4 sm:p-5 flex flex-col justify-between shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <div className="space-y-3">
                      {/* Image Thumbnail Banner: only if custom photo exists from Supabase */}
                      {p.image && (
                        <LoadingThumbnail
                          src={p.image}
                          alt={p.title}
                          aspectClass="aspect-video w-full rounded-2xl border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]"
                          badgePosition="top-right"
                          badge={p.badge && (
                            <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#1c1917]">
                              {p.badge}
                            </div>
                          )}
                        />
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-serif font-bold uppercase text-[#8b2323] dark:text-rose-400 tracking-wider px-2 py-0.5 rounded-xs border border-[#8b2323] bg-[#8b2323]/5">
                            {p.category}
                          </span>
                          {!p.image && p.badge && (
                            <span className="bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#8b2323]/20">
                              {p.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors mt-1.5">
                          {p.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-2 line-clamp-3">
                          {p.description}
                        </p>
                      </div>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-[11px] border border-stone-900/40 dark:border-stone-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 mt-4 border-t-2 border-stone-900/15 dark:border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                        {p.stars > 0 && (
                          <span className="flex items-center gap-1 font-mono font-bold">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {p.stars}
                          </span>
                        )}
                        <span className="font-mono text-[11px] font-bold">{p.language}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {(() => {
                          const n = p.name.toLowerCase();
                          const csSlug = n.includes('jarvis') ? 'jarvis-ai' :
                                         n.includes('electropathy') ? 'electropathy-ai' :
                                         n.includes('tastifyy') ? 'tastifyy' :
                                         (n.includes('pashu') || n.includes('skb')) ? 'pashurakshak' :
                                         n.includes('solar') ? 'solar-intelligence' :
                                         n.includes('jansampark') ? 'jan-sampark' :
                                         n.includes('attrition') ? 'employee-attrition-ai' : null;
                          if (!csSlug) return null;
                          return (
                            <Link
                              to={`/projects/${csSlug}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 text-xs font-bold shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                              <span className="hidden sm:inline">Case Study</span>
                            </Link>
                          );
                        })()}
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TIER 2: SPECIALIZED ENGINES & CORE REPOSITORIES (MIDDLE)
          ────────────────────────────────────────────────────────────── */}
          {tier2Projects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between pb-1 border-b-2 border-stone-900/20 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-5 bg-blue-600 rounded-full" />
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                    Specialized Engineering & Algorithmic Solutions
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400">
                  {tier2Projects.length} Repositories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tier2Projects.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 p-4 flex flex-col justify-between shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-serif font-bold uppercase text-blue-700 dark:text-blue-400 tracking-wider px-2 py-0.5 rounded-xs border border-blue-600/40 bg-blue-50 dark:bg-blue-950/30">
                          {p.category}
                        </span>
                        {p.stars > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {p.stars}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                        {p.title}
                      </h3>

                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.tech.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[10px] border border-stone-900/30 dark:border-stone-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t-2 border-stone-900/15 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400">{p.language}</span>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8b2323] dark:text-rose-400 hover:underline"
                      >
                        <span>GitHub Repo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TIER 3: OPEN-SOURCE UTILITIES & FORKS (BOTTOM)
          ────────────────────────────────────────────────────────────── */}
          {tier3Projects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between pb-1 border-b-2 border-stone-900/20 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-5 bg-stone-500 rounded-full" />
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                    Open-Source Contributions & Utilities
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400">
                  {tier3Projects.length} Repositories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {tier3Projects.map((p) => (
                  <div
                    key={p.name}
                    className="p-3.5 rounded-2xl border-2 border-stone-900 dark:border-stone-700 bg-white/95 dark:bg-[#181920]/95 flex flex-col justify-between shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-stone-500 font-bold uppercase">
                          {p.badge || 'Fork / Sandbox'}
                        </span>
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-600 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                        {p.title}
                      </h4>

                      <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t-2 border-stone-900/15 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono font-bold text-stone-500">
                      <span>{p.language}</span>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-stone-800 dark:text-stone-200"
                      >
                        Code →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredRepos.length === 0 && (
            <div className="text-center py-16 space-y-2">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                No repositories matched your search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="text-xs text-[#8b2323] dark:text-rose-400 underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </DoodleLayout>
  );
};

export default ProjectsPage;