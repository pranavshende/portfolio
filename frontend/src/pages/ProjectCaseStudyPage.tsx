import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Github, ExternalLink, Sparkles, CheckCircle2, 
  Layers, Terminal, Calendar, User, Share2, Copy, Check, ArrowUpRight, BookOpen, Eye,
  Server, Database, Smartphone, Cpu, ShieldCheck, List, ChevronRight
} from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';
import { PageSeo } from '@/components/PageSeo';
import useAnalytics from '@/hooks/useAnalytics';
import useProjectStats from '@/hooks/useProjectStats';
import { api } from '@/lib/api';
import { LoadingThumbnail, resolveCustomPhoto } from '@/components/LoadingThumbnail';

export interface ArchitectureTier {
  client: string;
  gateway: string;
  compute: string;
  data: string;
}

export const CASE_STUDY_SLUGS = [
  'jarvis-ai',
  'electropathy-ai',
  'tastifyy',
  'pashurakshak',
  'solar-intelligence',
  'jan-sampark',
  'employee-attrition-ai'
];

export const ARCH_DIAGRAMS: Record<string, ArchitectureTier> = {
  'jarvis-ai': {
    client: 'Web App & Claude Desktop (MCP stdio + Streamable HTTP)',
    gateway: 'Fastify Micro-Gateway (Token Rate-Limiting, Zod & RBAC)',
    compute: 'Dynamic Router: Gemini 2.5 Pro (Reasoning) + Gemini 2.5 Flash (Classify)',
    data: 'PostgreSQL 35-Table Star Schema + Supabase pgvector + Redis BullMQ DLQ'
  },
  'electropathy-ai': {
    client: 'React 19 Vite Web App + 5-Step Multilingual Clinical Intake Wizard',
    gateway: 'Express.js REST API + Request Validation + BlackSMS OTP Rate-Limiter',
    compute: 'Agentic RAG Engine with Multilingual NLP (English, Hindi, Marathi)',
    data: 'Supabase pgvector (1536-dim HNSW Index) + PostgreSQL Clinical History'
  },
  'tastifyy': {
    client: 'React 19 Admin Dispatch Web App + React Native Expo Mobile Driver App',
    gateway: 'High-Concurrency Express Gateway + Socket.io Bi-Directional Order Channels',
    compute: 'Apache Kafka Event Streams (Event-Driven Order State Transition Pipeline)',
    data: 'Redis Geospatial (Live Courier Proximity Geohashing) + PostgreSQL Storage'
  },
  'pashurakshak': {
    client: 'React Native Mobile Diagnostics Client (Zero-Connectivity Rural Farms)',
    gateway: 'Local Caching Queue with Auto-Sync on Network Reconnect',
    compute: 'Edge Computing: On-Device Quantized TensorFlow Lite INT8 CNN (Sub-120ms)',
    data: 'Local SQLite / WatermelonDB Cache + Supabase PostgreSQL Central Store'
  },
  'solar-intelligence': {
    client: 'Interactive CleanTech Analytics Dashboard with GIS Heatmaps & Plotly Charts',
    gateway: 'Automated Python ETL Ingestion Pipelines with Multi-Stage Validation',
    compute: 'Polynomial Regression Forecasting Engine + 10-Year Trend Decomposition',
    data: '10+ Years (2014-2024) 81.8+ GW National Renewable Big Data Repository'
  },
  'jan-sampark': {
    client: 'Cross-Platform React Native App with Offline Geo-Tagging & Media Capture',
    gateway: 'High-Concurrency Node.js Express REST API + JWT & RBAC (4 Admin Roles)',
    compute: 'Automated Civic Ticket Classification & Municipal Ward Routing Engine',
    data: 'PostgreSQL Relational DB + Scalable Object Storage Media Bucket'
  },
  'employee-attrition-ai': {
    client: 'Interactive HR Analytics Portal with 11 Chart.js Visualizations & CSV Ingest',
    gateway: 'Python Flask Microservice with Dynamic Vector Feature Normalization',
    compute: 'Scikit-Learn Classifier (88.4% Accuracy) + Google Gemini 2.5 Flash Copilot',
    data: 'Dynamic In-Memory Feature Matrix + Employee Retention Risk Metrics'
  }
};

export interface CaseStudyData {
  slug: string;
  aliases: string[];
  title: string;
  headline: string;
  client: string;
  category: string;
  year: string;
  badge: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  relatedBlogSlug?: string;
  summary: string;
  problemStatement: string;
  architectureDesign: string[];
  techStack: string[];
  backendImplementation: string[];
  aiWorkflow?: string[];
  challengesAndSolutions: { challenge: string; solution: string }[];
  keyResults: string[];
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  'jarvis-ai': {
    slug: 'jarvis-ai',
    aliases: ['jarvis', 'jarvis-mcp-multipledbs'],
    title: 'Jarvis 1.0: Autonomous Enterprise Intelligence Platform',
    headline: 'Centralized Enterprise Intelligence Layer with Official Model Context Protocol (MCP v1.0.4) & Google Gemini 2.5 Pro Engine',
    client: 'Meridian Supply Chain',
    category: 'Enterprise AI & MCP Architecture',
    year: '2026',
    badge: 'Live Enterprise',
    demoUrl: 'https://jarvis.pranavshende.online/',
    githubUrl: 'https://github.com/pranavshende/jarvis-mcp-multipleDBs',
    relatedBlogSlug: 'jarvis-ai-enterprise-intelligence-platform',
    summary: 'Autonomous enterprise intelligence platform unifying fragmented operations across ERP, warehouse management (WMS), and finance systems into a deterministic intelligence layer. Features official Model Context Protocol (MCP v1.0.4) streamable HTTP and stdio transports, zero-hallucination deterministic SQL calculations across a 35-table PostgreSQL star schema, hybrid pgvector RAG with 749+ operational knowledge chunks, dynamic Google Gemini 2.5 Pro/Flash model routing, BullMQ dead-letter queues, and RBAC-controlled action workflows with human-in-the-loop approvals.',
    problemStatement: 'Enterprise supply chains generate terabytes of fragmented data across legacy ERPs, warehouse databases, and finance tracking sheets. Executives and operators face delayed decision-making, fragile handoffs, and LLM hallucination risks when querying critical operational metrics like inventory valuation, days-of-supply, and supplier credit risk.',
    architectureDesign: [
      'Dual Transport Layer: Implemented official Anthropic Model Context Protocol (MCP v1.0.4) supporting both streamable HTTP (/mcp/stream) for web clients and stdio pipes for local AI desktop agents.',
      'Deterministic Calculation Engine: Bypasses LLM math by routing quantitative analytical queries to parameterized star-schema SQL aggregations across 35 indexed relational tables in PostgreSQL.',
      'Hybrid Retrieval-Augmented Generation (RAG): Ingests 749+ verified Standard Operating Procedures (SOPs), supply contracts, and supplier SLAs into pgvector with 1536-dimensional embeddings and strict cosine-similarity thresholds.',
      'Dual-Tier Model Governance: Dynamic router utilizing Google Gemini 2.5 Pro for multi-step reasoning and audit synthesis, while delegating low-latency classification and summary jobs to Gemini 2.5 Flash under strict token budget constraints.',
      'Operational Reliability & Security: Redis BullMQ dead-letter queues (DLQ), 0.07ms authorization-aware semantic cache, and 100% prompt injection red-team defense.'
    ],
    techStack: [
      'Google Gemini 2.5 Pro', 'Model Context Protocol (MCP v1.0.4)', 'pgvector', 
      'PostgreSQL', 'Fastify Gateway', 'Node.js', 'TypeScript', 'Supabase', 
      'BullMQ', 'Redis', 'React 18', 'Tailwind CSS'
    ],
    backendImplementation: [
      'Architected high-throughput Fastify micro-gateway maintaining sub-15ms base latency.',
      'Configured Prisma connection pooling with Supabase PgBouncer to sustain concurrent analytical spikes.',
      'Built audit logging pipeline tracking every AI tool invocation, SQL execution plan, and token cost metric.',
      'Implemented role-based human-in-the-loop approval gates for automated inventory purchase order creation.'
    ],
    aiWorkflow: [
      '1. Query Classification: Identifies whether the prompt is quantitative (SQL query), qualitative (SOP documentation lookup), or transactional (dispatch action).',
      '2. Guardrail Interception: Semantic validation against prompt injection, unauthorized cross-tenant data access, and out-of-scope enterprise queries.',
      '3. MCP Tool Orchestration: Fastify server calls registered MCP tools to execute deterministic database calculations or vector similarity retrieval.',
      '4. Citation Synthesis: Gemini 2.5 Pro constructs an executive response strictly referencing verified source rows and SOP document IDs.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'LLM math hallucinations on multi-million dollar inventory and receivables aggregations.',
        solution: 'Engineered a deterministic SQL generation pipeline with validated star-schema joins. The LLM only translates intent into structured parameters, while PostgreSQL computes exact sums and ratios.'
      },
      {
        challenge: 'Context window saturation during multi-hop supply chain investigations.',
        solution: 'Introduced two-tier semantic chunk retrieval and hierarchical summarization, caching repetitive intermediate states in Redis for 0.07ms lookups.'
      }
    ],
    keyResults: [
      'Zero-hallucination quantitative reporting across 35 production database tables.',
      'Official MCP v1.0.4 compliant streamable HTTP and stdio transports in production.',
      'Sub-15ms API response latency on cached operational intelligence queries.',
      'Live deployment accessible at jarvis.pranavshende.online.'
    ]
  },
  'electropathy-ai': {
    slug: 'electropathy-ai',
    aliases: ['electropathy'],
    title: 'Electropathy AI: Agentic Clinical Decision-Support & Multilingual Knowledge Engine',
    headline: 'Agentic Clinical Decision-Support with Multilingual RAG, pgvector Semantic Search & Zero-Hallucination Medical Guardrails',
    client: 'Dr. Ashish Wandhare',
    category: 'Agentic AI & Healthcare Systems',
    year: '2026',
    badge: 'Live Production',
    demoUrl: 'https://client-raprax.vercel.app',
    githubUrl: 'https://github.com/pranavshende/Electropathy_AI',
    relatedBlogSlug: 'forgerag-exploring-llms-and-retrieval-augmented-generation',
    summary: 'AI-powered clinical decision-support and medical knowledge platform built for Dr. Ashish Wandhare. Integrates an Option A RAG assistant grounded in verified Electropathy medical literature with strict zero-hallucination guardrails, pgvector semantic embeddings on Supabase PostgreSQL, multilingual clinical consultation in English, Hindi & Marathi, multi-step patient history intake wizards, and mobile OTP authentication via BlackSMS gateway.',
    problemStatement: 'Electropathy practitioners and patients lack modernized digital knowledge bases. Existing medical AI tools frequently hallucinate treatment regimens, lack grounding in specialized pharmacopeia literature, and fail to support vernacular languages (Hindi and Marathi) spoken by rural Indian patients.',
    architectureDesign: [
      'Grounded RAG Engine: Option A strict grounding pipeline enforcing that every clinical recommendation is derived exclusively from verified Electropathy pharmacopeia and clinical trial texts.',
      'pgvector Semantic Vector Store: Chunked botanical formulations and symptom repertories embedded with multilingual text embeddings in PostgreSQL.',
      'Vernacular NLP Pipeline: Dynamic language detection and bidirectional translation supporting English, Hindi, and Marathi clinical dialogues.',
      'Clinical Intake Wizard: 5-step intake capturing chief complaints, medical history, vital signs, constitutional mapping, and lifestyle factors.'
    ],
    techStack: [
      'Agentic RAG', 'Multilingual NLP', 'pgvector', 'PostgreSQL', 'Supabase', 
      'Prisma ORM', 'Node.js', 'Express', 'TypeScript', 'BlackSMS Gateway', 'React Vite'
    ],
    backendImplementation: [
      'Express REST API with strict Zod validation schemas for all clinical data inputs.',
      'End-to-end patient record encryption with JWT-based session security.',
      'Mobile number verification using BlackSMS OTP gateway with rate-limiting.',
      'Optimized pgvector HNSW indexing ensuring sub-50ms vector query execution.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing dangerous clinical hallucinations and unverified medication claims.',
        solution: 'Implemented multi-layer negative-prompt guardrails and fallback triggers. If cosine similarity of retrieved chunks falls below 0.82, the assistant explicitly states lack of verified literature and prompts doctor escalation.'
      },
      {
        challenge: 'Dialect differences in Hindi and Marathi symptom reporting.',
        solution: 'Built a specialized vernacular synonym mapping table aligning colloquial patient phrases (e.g. chronic joint stiffness) with canonical Electropathy diagnostic repertory entries.'
      }
    ],
    keyResults: [
      'Zero-hallucination verified botanical knowledge retrieval.',
      'Native multilingual support across English, Hindi, and Marathi.',
      'Shipped to live production for Dr. Ashish Wandhare at client-raprax.vercel.app.'
    ]
  },
  'tastifyy': {
    slug: 'tastifyy',
    aliases: ['tastifyy-delivery'],
    title: 'Tastifyy: Distributed On-Demand Food Logistics Ecosystem',
    headline: 'High-Throughput Multi-Role Food Delivery Platform with Apache Kafka Event Streams, Redis Geospatial & Live Dynamic Dispatch',
    client: 'On-Demand Logistics',
    category: 'Distributed Systems & Mobile Architecture',
    year: '2026',
    badge: 'Production Shipped',
    demoUrl: 'https://www.tastifyy.in',
    githubUrl: 'https://github.com/pranavshende/tastifyy',
    relatedBlogSlug: 'tastifyy-distributed-logistics-kafka-redis-geospatial',
    summary: 'High-throughput food delivery ecosystem featuring dual client surfaces (React 19 Web Portal + React Native Expo Mobile App), centralized Express + TypeScript backend, Prisma ORM with Supabase PostgreSQL, Kafka-powered order event buses, Redis geospatial indexes for driver proximity, and AI-assisted batch dispatch algorithms.',
    problemStatement: 'Real-time on-demand delivery requires synchronizing customers, restaurants, and gig-economy drivers simultaneously under peak traffic spikes. Monolithic HTTP architectures collapse during lunch/dinner rushes due to blocking socket calls and unindexed location queries.',
    architectureDesign: [
      'Event-Driven Microservices: Apache Kafka message broker handling asynchronous order life-cycle events (placed, restaurant accepted, cooking, driver assigned, picked up, delivered).',
      'Geospatial Proximity Dispatch: Redis GEORADIUS indexes caching real-time delivery partner coordinates with sub-2ms query times.',
      'Live Bidirectional WebSockets: Socket.io rooms broadcasting driver telemetry to customer tracking screens.',
      'Dual Surface Client: React 19 SSR/SPA responsive web client paired with React Native (Expo) driver & consumer mobile applications.'
    ],
    techStack: [
      'Apache Kafka', 'Redis Geospatial', 'WebSockets (Socket.io)', 'React 19', 
      'React Native (Expo)', 'Express.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL'
    ],
    backendImplementation: [
      'Configured fault-tolerant Kafka consumers with idempotency keys to eliminate duplicate order charges.',
      'Designed PostgreSQL schema with connection pooling capable of handling burst order surges.',
      'Automated batch routing algorithm clustering neighboring delivery destinations to maximize driver earnings.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'High database write latency caused by thousands of drivers pinging GPS coordinates every 5 seconds.',
        solution: 'Offloaded real-time driver coordinates entirely to in-memory Redis Geospatial keys with 10-second TTLs, only persisting finalized route trips to PostgreSQL upon delivery completion.'
      }
    ],
    keyResults: [
      'Sub-2ms driver proximity lookup via Redis GEORADIUS.',
      'Idempotent event-driven dispatch pipeline eliminating duplicate orders.',
      'Shipped to production across web and mobile at tastifyy.in.'
    ]
  },
  'pashurakshak': {
    slug: 'pashurakshak',
    aliases: ['pashu-rakshak', 'hacknation_skb-f17_skb_p2'],
    title: 'PashuRakshak: Edge AI Livestock Diagnostics & Quantized CNN Inference',
    headline: 'Offline-First Edge Veterinary Diagnostics System with Quantized TensorFlow Lite INT8 CNNs & IEEE Publication',
    client: 'IEEE Conference (OTCON 2025)',
    category: 'Edge Computing & Computer Vision',
    year: '2026',
    badge: 'IEEE Published',
    demoUrl: '/arcade?folder=projects_folder',
    githubUrl: 'https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2',
    relatedBlogSlug: 'ai-in-agriculture-pashurakshak-edge-cnn-ieee',
    summary: 'Offline-first Edge AI veterinary diagnostics system with quantized convolutional neural networks (TensorFlow Lite INT8) for sub-120ms livestock disease detection in zero-connectivity rural farms. Published at IEEE.',
    problemStatement: 'In rural Indian agricultural regions, livestock epidemic outbreaks (such as Lumpy Skin Disease) devastate farming livelihoods before veterinarians can physically arrive. Rural farms have zero internet connectivity, rendering cloud-dependent AI vision APIs completely useless.',
    architectureDesign: [
      'Edge Quantized CNNs: Model post-training quantization to INT8 precision, reducing model weight size from 48MB to under 4.2MB without loss of classification accuracy.',
      'Zero-Connectivity Mobile Inference: On-device TensorFlow Lite runtime embedded in React Native mobile client executing sub-120ms inferences on budget smartphones.',
      'Offline-First Sync Engine: Local SQLite caching queue recording timestamped diagnostic photos, GPS tags, and symptom severity, syncing to central veterinary registries when signal is detected.',
      'Veterinary Telemetry Dashboard: Web portal for government agricultural officers to monitor geographical clusters of disease reports.'
    ],
    techStack: [
      'Edge Computing', 'TensorFlow Lite (INT8)', 'Computer Vision', 'React Native', 
      'SQLite Local Storage', 'Python (PyTorch)', 'IEEE Research'
    ],
    backendImplementation: [
      'Curated and preprocessed multi-class veterinary lesion image datasets with augmentation.',
      'Engineered offline-first SQLite database schema supporting bidirectional conflict resolution.',
      'Integrated camera hardware abstraction in React Native for rapid burst capture.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Executing convolutional neural network inference on ultra-low-cost Android phones with under 2GB RAM.',
        solution: 'Applied INT8 post-training quantization and pruned redundant convolutional channels, reducing RAM footprint by 78% and achieving steady 30 FPS camera preview inference.'
      }
    ],
    keyResults: [
      'Sub-120ms on-device inference speed on standard mobile hardware.',
      '94%+ diagnostic accuracy on livestock pathology classification.',
      'Peer-reviewed and published in IEEE conference proceedings (DOI: 10.1109/OTCON65728.2025.11070341).'
    ]
  },
  'solar-intelligence': {
    slug: 'solar-intelligence',
    aliases: ['solar-analytics', 'solarsalesanalysis'],
    title: 'Solar Intelligence: CleanTech Big Data Pipeline & GIS Energy Forecasting',
    headline: 'Analyzing 10+ Years (2014–2024) of Indian Renewable Big Data Across 36+ States/UTs with Polynomial Regression Trajectory to 2030',
    client: 'IT Daksh',
    category: 'CleanTech Big Data & GIS Analytics',
    year: '2026',
    badge: 'CleanTech Big Data',
    demoUrl: '/arcade?folder=projects_folder',
    githubUrl: 'https://github.com/pranavshende/SolarSalesAnalysis',
    relatedBlogSlug: 'solar-intelligence-renewable-energy-big-data-forecasting',
    summary: 'CleanTech big data intelligence platform analyzing 10+ years (2014–2024) of nationwide solar energy metrics across 36+ Indian states/UTs covering 81.8+ GW. Features automated ETL pipelines, interactive geospatial GIS heatmaps, and polynomial regression trajectory forecasting to 2030.',
    problemStatement: 'India\'s solar capacity expanded from sub-3 GW in 2014 to over 81.8 GW in 2024. However, government and energy planners lacked an integrated big data interface to compare state-level grid absorption, seasonal irradiation variations, and forecast future infrastructure requirements toward 2030 renewable goals.',
    architectureDesign: [
      'Automated ETL Pipeline: Multi-source extraction scripts ingesting multi-decadal CSV/JSON datasets from central and state power ministries with schema normalization.',
      'Relational Big Data Store: PostgreSQL database with time-series indexing and aggregated materialized views cutting query latency by 45%.',
      'Polynomial Regression Forecasting: Statistical time-series regression models forecasting installed capacity and state-by-state adoption rates through 2030.',
      'Interactive GIS Heatmaps: Choropleth visual interfaces categorizing states by capacity tiers (<1 GW, 1-5 GW, 5-10 GW, 10+ GW).'
    ],
    techStack: [
      'CleanTech Big Data', 'Python (Pandas & NumPy)', 'PostgreSQL', 
      'Polynomial Regression', 'Geospatial GIS', 'React 19', 'Recharts'
    ],
    backendImplementation: [
      'Engineered automated validation scripts detecting missing telemetry records and anomalous outliers.',
      'Implemented indexed materialized views refreshing periodically for sub-20ms dashboard queries.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Inconsistent data formatting across different state electricity boards over 10 years.',
        solution: 'Developed an automated Python normalization pipeline mapping disparate regional schema columns to a unified ISO standard.'
      }
    ],
    keyResults: [
      'Processed 10+ years of clean energy time-series covering 81.8+ GW.',
      'Automated ETL pipelines cutting query processing latency by 45%.',
      'Polynomial forecasting models projecting regional targets toward 2030.'
    ]
  },
  'jan-sampark': {
    slug: 'jan-sampark',
    aliases: ['jansampark'],
    title: 'JanSampark: Enterprise Civic Governance & Citizen Grievance Redressal',
    headline: 'Enterprise Civic Governance Platform with 25+ React Native Modules, Role-Based Access & High-Concurrency APIs',
    client: 'NK SkillEdge',
    category: 'Civic Enterprise & Mobile Systems',
    year: '2026',
    badge: 'Civic Enterprise',
    demoUrl: '/arcade?folder=projects_folder',
    githubUrl: 'private',
    relatedBlogSlug: 'jansampark-civic-governance-platform-react-native',
    summary: 'Enterprise civic governance platform bridging citizens and administrative departments. Features 25+ frontend modules in React Native with offline geo-tagging, JWT + RBAC security for 4 administrative roles, and high-concurrency Node.js RESTful APIs connected to PostgreSQL.',
    problemStatement: 'Municipal grievance handling is historically hindered by manual paperwork, lost petitions, lack of location verification, and zero transparency for citizens tracking complaint status.',
    architectureDesign: [
      '25+ Modular Mobile Workflows: Built in React Native featuring photo capture, GPS geo-tagging, category selection, and instant petition filing.',
      'Multi-Tier RBAC Architecture: Role-Based Access Control securing endpoints across 4 user tiers: Citizen, Ward Officer, Department Head, and Municipal Commissioner.',
      'High-Concurrency REST API Gateway: Node.js Express server with 40+ endpoints designed to handle municipal filing surges without service degradation.',
      'Audit Trail Database: PostgreSQL relational schema recording immutable status changes and escalation timestamps.'
    ],
    techStack: [
      'Enterprise Architecture', 'React Native', 'Node.js', 'Express.js', 
      'PostgreSQL', 'RBAC Security', 'JWT Authentication', 'REST APIs'
    ],
    backendImplementation: [
      'Architected 40+ RESTful micro-endpoints handling complaint lifecycles.',
      'Implemented JWT session tokens with refresh rotation and permission verification middleware.',
      'Optimized indexed queries ensuring sub-15ms response times on high-volume grievance lists.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing fraudulent or duplicate complaint submissions from the same geographic area.',
        solution: 'Implemented spatial geo-clustering in PostgreSQL. Submissions with matching category within 100 meters within 24 hours are automatically linked into a unified civic ticket.'
      }
    ],
    keyResults: [
      '25+ production React Native mobile modules shipped.',
      '4-tier RBAC framework securing municipal citizen records.',
      'Sub-15ms database query execution on production PostgreSQL clusters.'
    ]
  },
  'employee-attrition-ai': {
    slug: 'employee-attrition-ai',
    aliases: ['attrition', 'employeeattritionsystem'],
    title: 'Employee Attrition AI: Predictive HR Workforce Risk Intelligence',
    headline: 'Predictive HR Intelligence Platform, Google Gemini 2.5 Copilot & Real-Time Flight-Risk Scoring',
    client: 'HR AI Analytics',
    category: 'Predictive ML & Analytics',
    year: '2026',
    badge: 'Gemini 2.5 Flash',
    demoUrl: undefined,
    githubUrl: 'https://github.com/pranavshende/EmployeeAttritionSystem',
    relatedBlogSlug: 'ai-powered-employee-attrition-analysis',
    summary: 'An end-to-end AI-powered workforce attrition analysis platform and conversational copilot built with React 19, Flask, and Google Gemini 2.5 Flash. Features dynamic CSV dataset ingestion, Redis-cached cohort metrics, 11 interactive Chart.js visualizations, differential root-cause ranking, and an AttritionAI copilot grounded in cohort metrics for individual employee risk lookups.',
    problemStatement: 'Organizations lose top engineering and management talent unpredictably, incurring heavy re-hiring and project disruption costs. Standard HR reporting is backward-looking and fails to uncover multivariate risk correlations.',
    architectureDesign: [
      'Dynamic Dataset Ingestion: Ingests unstructured employee CSV files, dynamically detecting column datatypes and normalizing schemas on the fly.',
      'Predictive Risk Engine: Machine learning models scoring flight risk based on 11 turnover drivers (overtime, compensation ratio, manager tenure, promotion velocity).',
      'Conversational AI Copilot: Google Gemini 2.5 Flash grounded in computed cohort statistics allowing HR leaders to query retention trends in natural language.',
      '11 Interactive Visualizations: High-fidelity charts breaking down attrition by department, tenure bands, and performance ratings.'
    ],
    techStack: [
      'Google Gemini 2.5 Flash', 'Predictive ML', 'Python (Flask)', 'Pandas', 
      'React 19', 'Chart.js', 'Redis Caching', 'Tailwind CSS'
    ],
    backendImplementation: [
      'Flask REST API executing real-time statistical distributions using Pandas and NumPy.',
      'Redis cache storing computed correlation matrices for sub-10ms dashboard loads.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Handling arbitrary CSV column header names from different HRIS exports.',
        solution: 'Built an AI-assisted heuristic header mapping layer that normalizes varied column titles (e.g. "sal", "compensation", "annual_ctc") into standard internal attributes.'
      }
    ],
    keyResults: [
      'Dynamic CSV ingestion handling diverse organizational formats without manual schema migration.',
      'Gemini 2.5 Flash conversational assistant querying real-time workforce cohorts.',
      '11 interactive data visualizations mapping corporate retention risk.'
    ]
  }
};

export const ProjectCaseStudyPage: React.FC = () => {
  useAnalytics();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProjectViews, recordView } = useProjectStats();
  const [copied, setCopied] = React.useState(false);
  const [customCover, setCustomCover] = React.useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      recordView(slug);
    }
  }, [slug, recordView]);

  // Fetch dynamic CMS thumbnail if updated in admin
  useEffect(() => {
    if (!slug) return;
    api.getProject(slug)
      .then((res: any) => {
        const p = res?.data;
        if (p) {
          const raw = p.bannerUrl || p.thumbnailUrl || p.imageUrl;
          if (raw && typeof raw === 'string' && raw.trim() !== '' && !raw.includes('photo-1555066931-4365d14bab8c')) {
            setCustomCover(raw.trim());
          }
        }
      })
      .catch(() => {});
  }, [slug]);

  // Match by slug or alias
  const project = useMemo(() => {
    if (!slug) return null;
    const clean = slug.toLowerCase();
    if (CASE_STUDIES[clean]) return CASE_STUDIES[clean];
    for (const key of Object.keys(CASE_STUDIES)) {
      const item = CASE_STUDIES[key];
      if (item.aliases && item.aliases.includes(clean)) return item;
    }
    return null;
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSlug = project?.slug || '';
  const currentIdx = CASE_STUDY_SLUGS.indexOf(currentSlug);
  const prevSlug = currentIdx > 0 ? CASE_STUDY_SLUGS[currentIdx - 1] : null;
  const nextSlug = currentIdx >= 0 && currentIdx < CASE_STUDY_SLUGS.length - 1 ? CASE_STUDY_SLUGS[currentIdx + 1] : null;
  const prevProj = prevSlug ? CASE_STUDIES[prevSlug] : null;
  const nextProj = nextSlug ? CASE_STUDIES[nextSlug] : null;
  const archTier = ARCH_DIAGRAMS[currentSlug] || null;

  if (!project) {
    return (
      <DoodleLayout>
        <PageSeo
          title="Project Case Study Not Found | Pranav Shende"
          description="The requested engineering project case study could not be found."
        />
        <div className="py-20 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-900 flex items-center justify-center text-2xl shadow-[3px_3px_0px_#1c1917]">
            🔍
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Project Case Study Not Found</h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
            The project case study you are looking for might have been moved or does not exist.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8b2323] text-white text-sm font-bold border-2 border-stone-900 shadow-[3px_3px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1c1917] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All Engineering Projects</span>
          </Link>
        </div>
      </DoodleLayout>
    );
  }

  return (
    <DoodleLayout>
      <PageSeo
        title={`${project.title} | Case Study by Pranav Shende`}
        description={project.summary.slice(0, 160) + '...'}
        canonicalPath={`/projects/${project.slug}`}
        keywords={[project.title, project.category, ...project.techStack, 'Pranav Shende', 'Case Study']}
        ogType="article"
        ogImage={customCover || project.image}
        ogImageAlt={project.title}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          'name': project.title,
          'headline': project.headline,
          'description': project.summary,
          'url': `https://pranavshende.online/projects/${project.slug}`,
          'creator': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'jobTitle': 'Full Stack Developer & Forward Deployed Engineer',
            'url': 'https://pranavshende.online/'
          },
          'author': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/'
          },
          'dateCreated': project.year,
          'keywords': project.techStack.join(', '),
          'genre': project.category
        }}
      />
      <article className="max-w-4xl mx-auto pb-16">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-[#8b2323] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200 shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Case Study'}</span>
          </button>
        </div>

        {/* Hero Header */}
        <header className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/95 border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-black tracking-wider uppercase text-[#8b2323] bg-red-50 dark:bg-red-950/30 px-2.5 py-0.5 rounded-md border border-[#8b2323]/30">
              {project.badge}
            </span>
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
              {project.client} • {project.category} • {project.year}
            </span>
            {(() => {
              const v = getProjectViews(slug || project.slug, 0);
              return (
                <span 
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 font-mono text-[10px] font-semibold text-stone-700 dark:text-stone-300 ml-auto"
                  title={`${v} project views`}
                >
                  <Eye className="w-3 h-3 text-[#8b2323] dark:text-rose-400 shrink-0" />
                  <span>{v} views</span>
                </span>
              );
            })()}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-medium leading-relaxed mb-6">
            {project.headline}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-200 dark:border-stone-700/80">
            {project.demoUrl && (
              project.demoUrl.startsWith('http') ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:bg-[#721c1c] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Platform</span>
                </a>
              ) : (
                <Link
                  to={project.demoUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:bg-[#721c1c] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Interactive Arcade Demo</span>
                </Link>
              )
            )}

            {project.githubUrl && project.githubUrl !== 'private' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-bold border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source on GitHub</span>
              </a>
            )}

            {project.relatedBlogSlug && (
              <Link
                to={`/blog/${project.relatedBlogSlug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs font-bold border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Read Architectural Deep-Dive</span>
              </Link>
            )}
          </div>
        </header>

        {/* Cover Image: only rendered if custom photo exists from Supabase bucket */}
        {resolveCustomPhoto(customCover) && (
          <div className="mb-8">
            <LoadingThumbnail
              src={resolveCustomPhoto(customCover)}
              alt={project.title}
              aspectClass="aspect-video w-full rounded-2xl border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917]"
            />
          </div>
        )}

        {/* Executive Summary */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8b2323]" />
            <span>Executive Summary</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
            {project.summary}
          </p>
        </section>

        {/* Problem Statement */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            The Problem Statement
          </h2>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
            {project.problemStatement}
          </p>
        </section>

        {/* Architecture & System Design */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8b2323]" />
            <span>System Architecture & Engineering Design</span>
          </h2>
          <div className="space-y-3">
            {project.architectureDesign.map((arch, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-700">
                <div className="w-6 h-6 rounded-full bg-[#8b2323] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {arch}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Architecture Pipeline Flow Diagram */}
        {archTier && (
          <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#8b2323]" />
                <span>System Architecture Flow Diagram</span>
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-800/30">
                Production Topology
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Tier 1: Client */}
              <div className="p-4 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 shadow-[2px_2px_0px_#1c1917] flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500">Tier 1 • Client</span>
                  <Smartphone className="w-4 h-4 text-[#8b2323]" />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  Interface Layer
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 font-mono leading-relaxed">
                  {archTier.client}
                </p>
              </div>

              {/* Tier 2: Gateway */}
              <div className="p-4 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 shadow-[2px_2px_0px_#1c1917] flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500">Tier 2 • Gateway</span>
                  <Server className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  API &amp; Ingestion Layer
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 font-mono leading-relaxed">
                  {archTier.gateway}
                </p>
              </div>

              {/* Tier 3: Compute */}
              <div className="p-4 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 shadow-[2px_2px_0px_#1c1917] flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500">Tier 3 • Intelligence</span>
                  <Cpu className="w-4 h-4 text-rose-600" />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  AI &amp; Compute Engine
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 font-mono leading-relaxed">
                  {archTier.compute}
                </p>
              </div>

              {/* Tier 4: Storage */}
              <div className="p-4 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 shadow-[2px_2px_0px_#1c1917] flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500">Tier 4 • Storage</span>
                  <Database className="w-4 h-4 text-teal-600" />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  Data &amp; Persistence Store
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 font-mono leading-relaxed">
                  {archTier.data}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* AI & RAG Workflow (if present) */}
        {project.aiWorkflow && project.aiWorkflow.length > 0 && (
          <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#8b2323]" />
              <span>AI & RAG Execution Pipeline</span>
            </h2>
            <div className="space-y-2.5">
              {project.aiWorkflow.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs border border-stone-800">
                  {step}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-700/60 border border-stone-300 dark:border-stone-600 text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Engineering Challenges & Solutions
          </h2>
          <div className="space-y-4">
            {project.challengesAndSolutions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900/40">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-1">
                  Challenge
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-medium mb-3">
                  {item.challenge}
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                  Engineered Solution
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Measurable Results */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Key Measurable Results</span>
          </h2>
          <ul className="space-y-2.5">
            {project.keyResults.map((res, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-stone-700 dark:text-stone-300">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Previous & Next Case Study Navigation */}
        {(prevProj || nextProj) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {prevProj ? (
              <Link
                to={`/projects/${prevProj.slug}`}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all space-y-1 block group"
              >
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                  <ArrowLeft className="w-3 h-3 text-[#8b2323] group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Case Study</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                  {prevProj.title}
                </h4>
                <p className="text-[11px] text-stone-500 font-mono truncate">
                  {prevProj.category}
                </p>
              </Link>
            ) : <div />}

            {nextProj ? (
              <Link
                to={`/projects/${nextProj.slug}`}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-800/90 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all space-y-1 block text-right group sm:ml-auto w-full"
              >
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center justify-end gap-1 font-bold">
                  <span>Next Case Study</span>
                  <ArrowRight className="w-3 h-3 text-[#8b2323] group-hover:translate-x-0.5 transition-transform" />
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                  {nextProj.title}
                </h4>
                <p className="text-[11px] text-stone-500 font-mono truncate">
                  {nextProj.category}
                </p>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-700">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8b2323] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:bg-[#721c1c] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <span>Read Technical Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DoodleLayout>
  );
};

export default ProjectCaseStudyPage;

