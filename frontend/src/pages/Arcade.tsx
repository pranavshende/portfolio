import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { PageSeo } from '@/components/PageSeo';
import { 
  Gamepad2, Hexagon, Activity, TrainFront, Bird, Folder, Music, Globe, 
  Users, UtensilsCrossed, Circle, Square, ChevronLeft, Smartphone, Tablet, 
  Monitor, ExternalLink, Bot, Camera, Flame, Landmark, PartyPopper, 
  HeartHandshake, Sun, Sprout, Github, CheckCircle2, ArrowUpRight, Stethoscope
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   RETRO OS CONSOLE SIMULATOR (Black & White Paper Theme + App Ecosystem)
───────────────────────────────────────────────────────────────────────────── */
type AppType = string;

// Project Definition Interface
interface ProjectApp {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  gradient: string;
  Icon: any;
  demoUrl?: string;
  githubUrl: string;
  tech: string;
  description: string;
  hasDeployed: boolean;
}

// All projects ordered Recent First (matching latest production deployments)
const PROJECT_APPS: ProjectApp[] = [
  {
    id: 'jarvis',
    name: 'Jarvis AI',
    shortTitle: 'Enterprise MCP AI',
    category: 'Enterprise AI & MCP Architecture',
    gradient: 'from-indigo-600 to-blue-600',
    Icon: Bot,
    demoUrl: 'https://jarvis.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/jarvis-mcp-multipleDBs',
    tech: 'Google Gemini 2.5 Pro • Model Context Protocol • Fastify • pgvector',
    description: 'Autonomous enterprise intelligence platform unifying ERP, WMS, and finance systems via Model Context Protocol (MCP v1.0.4), deterministic star-schema SQL, and hybrid pgvector RAG.',
    hasDeployed: true
  },
  {
    id: 'tastifyy',
    name: 'Tastifyy',
    shortTitle: 'Food Delivery',
    category: 'Distributed Logistics & Mobile',
    gradient: 'from-orange-500 to-amber-600',
    Icon: UtensilsCrossed,
    demoUrl: 'https://tastifyy.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/tastifyy',
    tech: 'Kafka Streams • Redis Geospatial • React 19 • Socket.io',
    description: 'High-throughput on-demand food delivery platform featuring Kafka event-driven dispatch pipelines, Redis geospatial driver proximity caching, and live Socket.io tracking.',
    hasDeployed: true
  },
  {
    id: 'attrition',
    name: 'Attrition AI',
    shortTitle: 'HR Intelligence',
    category: 'Predictive ML & Enterprise HR',
    gradient: 'from-emerald-600 to-teal-600',
    Icon: Users,
    demoUrl: 'https://majorproject.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/EmployeeAttritionSystem',
    tech: 'Flask REST • React 19 • Gemini 2.5 Flash • Chart.js',
    description: 'End-to-end predictive HR workforce intelligence platform with dynamic CSV dataset ingestion, flight-risk modeling, 11 interactive charts, and conversational AI copilot.',
    hasDeployed: true
  },
  {
    id: 'electropathy',
    name: 'Electropathy AI',
    shortTitle: 'Clinical Copilot',
    category: 'Agentic AI & Healthcare',
    gradient: 'from-violet-600 to-indigo-700',
    Icon: Stethoscope,
    demoUrl: 'https://electropathyai.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/Electropathy_AI',
    tech: 'pgvector • Multilingual NLP • Node.js • Supabase',
    description: 'Clinical decision-support system and multilingual RAG copilot grounded in verified medical literature with strict zero-hallucination guardrails.',
    hasDeployed: true
  },
  {
    id: 'citywide',
    name: 'Citywide AI',
    shortTitle: 'Civic Surveillance',
    category: 'Computer Vision & Civic Tech',
    gradient: 'from-slate-700 to-cyan-700',
    Icon: Camera,
    demoUrl: 'https://hacknation.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/citywidecamersur',
    tech: 'OpenCV • React • Node.js • WebSockets',
    description: 'Citywide surveillance & smart traffic monitoring dashboard developed for HackNation with real-time video telemetry and incident tracking.',
    hasDeployed: true
  },
  {
    id: 'demonslayer',
    name: 'Demon Slayer',
    shortTitle: 'Infotsav 2k25',
    category: 'Interactive Web Experience',
    gradient: 'from-rose-600 to-red-800',
    Icon: Flame,
    demoUrl: 'https://infotsav-2k25.vercel.app',
    githubUrl: 'https://github.com/pranavshende/demon-slayer-events',
    tech: 'Next.js • Tailwind CSS • Framer Motion • Vercel',
    description: 'Demon Slayer anime themed technical symposium event registration and interactive showcase portal designed for Infotsav 2k25.',
    hasDeployed: true
  },
  {
    id: 'jansampark',
    name: 'JanSampark',
    shortTitle: 'Civic Governance',
    category: 'Civic-Tech & Mobile',
    gradient: 'from-teal-700 to-emerald-600',
    Icon: Landmark,
    demoUrl: 'https://projectjansampark.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/Jan_Sampark_Deployable-',
    tech: 'React Native • MERN Stack • PostgreSQL • RBAC',
    description: 'Municipal citizen grievance platform bridging citizens and administrative officers across 25+ functional modules with offline geo-tagging.',
    hasDeployed: true
  },
  {
    id: 'demomohotsav',
    name: 'Demo Mohotsav',
    shortTitle: 'Festival Portal',
    category: 'Community & Culture',
    gradient: 'from-fuchsia-600 to-pink-600',
    Icon: PartyPopper,
    demoUrl: 'https://demomohatsav.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/demofrontend',
    tech: 'React • Tailwind CSS • Vite • REST APIs',
    description: 'Cultural festival web showcase and attendee event navigation portal with responsive mobile bottom navigation.',
    hasDeployed: true
  },
  {
    id: 'truliacare',
    name: 'TruliaCare',
    shortTitle: 'Telehealth Portal',
    category: 'Healthcare & Maintenance',
    gradient: 'from-sky-600 to-teal-600',
    Icon: HeartHandshake,
    demoUrl: 'https://frontappathon.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/TruliaCare_Appathon',
    tech: 'React • Express.js • Email Service • Admin Dashboard',
    description: 'Telehealth intake and healthcare facility maintenance dispatch system built for Appathon with automated notification pipelines.',
    hasDeployed: true
  },
  {
    id: 'pashurakshak',
    name: 'PashuRakshak',
    shortTitle: 'Edge AI Diagnostics',
    category: 'Edge AI & Computer Vision',
    gradient: 'from-lime-600 to-emerald-700',
    Icon: Activity,
    demoUrl: 'https://projectpashurakshak.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/PashuRakshak',
    tech: 'Edge AI • INT8 Quantized CNNs • TensorFlow Lite • IEEE',
    description: 'Offline-first edge computing veterinary diagnostics system with on-device INT8 neural networks, published at IEEE OTCON.',
    hasDeployed: true
  },
  {
    id: 'solar',
    name: 'Solar Analytics',
    shortTitle: 'CleanTech GIS',
    category: 'CleanTech Big Data & GIS',
    gradient: 'from-amber-500 to-yellow-600',
    Icon: Sun,
    demoUrl: 'https://projectsolarsalesanalysis.pranavshende.online',
    githubUrl: 'https://github.com/pranavshende/SolarSalesAnalysis',
    tech: 'Python • PostgreSQL • GIS Heatmaps • Polynomial Regression',
    description: 'CleanTech big data intelligence platform analyzing 10+ years of nationwide solar energy generation across 36 Indian states.',
    hasDeployed: true
  },
  {
    id: 'farmercredit',
    name: 'Farmer Credit AI',
    shortTitle: 'Alternative Credit Scoring',
    category: 'AgriTech & FinTech ML',
    gradient: 'from-emerald-800 to-green-900',
    Icon: Sprout,
    githubUrl: 'https://github.com/pranavshende/Farmer-Credit-worthiness-using-alternative-data',
    tech: 'Machine Learning • Alternative Data • Python • Scikit-Learn',
    description: 'Alternative credit-worthiness scoring model for rural farmers using satellite vegetation indexes and agricultural repayment patterns.',
    hasDeployed: false
  }
];

// Custom Tetris Tetromino 4-block Icon
const TetrisIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="10" width="6" height="6" rx="1" />
    <rect x="9" y="10" width="6" height="6" rx="1" />
    <rect x="15" y="10" width="6" height="6" rx="1" />
    <rect x="9" y="4" width="6" height="6" rx="1" />
  </svg>
);

const PaperAppIcon = ({
  Icon,
  alt
}: { 
  Icon: any;
  alt: string;
}) => {
  return (
    <div 
      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0"
      title={alt}
    >
      <Icon size={24} className="text-stone-900 stroke-[1.8]" />
    </div>
  );
};

// Rich Project App Logo Component with Vibrant Gradient and Status Indicator
const ProjectAppLogo = ({
  Icon,
  gradient,
  hasDeployed,
  alt
}: {
  Icon: any;
  gradient: string;
  hasDeployed: boolean;
  alt: string;
}) => {
  return (
    <div 
      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${gradient} border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-white group-hover:scale-105 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0`}
      title={alt}
    >
      <Icon size={24} className="text-white stroke-[2.2] drop-shadow-sm" />
      {/* Small corner badge indicating status */}
      {!hasDeployed && (
        <span className="absolute -bottom-1 -right-1 px-1 py-0.2 text-[8px] font-mono font-bold bg-stone-900 text-amber-300 border border-stone-700 rounded-sm">
          GH
        </span>
      )}
    </div>
  );
};

const RetroOSConsole: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('tablet');
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  type AppItem = {
    id: string;
    name: string;
    icon: JSX.Element;
    isFolder?: boolean;
  };

  const apps: AppItem[] = [
    { 
      id: 'mario', 
      name: 'Mario', 
      icon: <PaperAppIcon Icon={Gamepad2} alt="Super Mario" /> 
    },
    { 
      id: 'hextris', 
      name: 'Hextris', 
      icon: <PaperAppIcon Icon={Hexagon} alt="Hextris" /> 
    },
    { 
      id: 'dino', 
      name: 'Dino Run', 
      icon: <PaperAppIcon Icon={Activity} alt="Dino Run" /> 
    },
    { 
      id: 'tetris', 
      name: 'Tetris', 
      icon: <PaperAppIcon Icon={TetrisIcon} alt="Tetris" /> 
    },
    { 
      id: 'subway', 
      name: 'Surfers', 
      icon: <PaperAppIcon Icon={TrainFront} alt="Subway Surfers" /> 
    },
    { 
      id: 'flappy', 
      name: 'Flappy', 
      icon: <PaperAppIcon Icon={Bird} alt="Flappy Bird" /> 
    },
    { 
      id: 'projects_folder', 
      name: 'Projects', 
      isFolder: true, 
      icon: (
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0">
          <Folder size={24} className="text-stone-900 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8b2323] text-white text-[9px] font-mono font-bold flex items-center justify-center">
            {PROJECT_APPS.length}
          </span>
        </div>
      )
    },
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: <PaperAppIcon Icon={Music} alt="Spotify" /> 
    },
  ];

  // Helper to look up active project
  const selectedProject = PROJECT_APPS.find((p) => p.id === activeApp);

  return (
    <div className="w-full flex flex-col items-center mb-16">
      {/* View Mode Switcher (Clean, standalone pill control) */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-2 border-stone-900 rounded-full p-1 shadow-[2px_2px_0px_#1c1917]">
          {(['mobile', 'tablet', 'desktop'] as const).map((type) => {
            const icons = {
              mobile: Smartphone,
              tablet: Tablet,
              desktop: Monitor,
            };
            const Icon = icons[type];
            const isActive = deviceType === type;

            return (
              <button
                key={type}
                onClick={() => setDeviceType(type)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                <Icon size={14} />
                <span className="capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Device Frame (Standalone, no surrounding outer card box) */}
      <motion.div
        layout
        className={`relative w-full mx-auto bg-stone-950 border-[8px] sm:border-[12px] border-stone-900 shadow-2xl overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] transition-all duration-500 ${
          deviceType === 'mobile'
            ? 'max-w-[340px] aspect-[9/16]'
            : deviceType === 'tablet'
              ? 'max-w-[720px] aspect-[16/11]'
              : 'max-w-full aspect-[16/10]'
        }`}
      >
        {/* Screen Content - Black & White Paper Aesthetic */}
        <div className="relative w-full h-full bg-[#faf7f0] overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {/* HOME SCREEN (Black and White Theme Like Paper) */}
            {activeApp === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col bg-[#faf7f0] bg-[radial-gradient(#e5dfd3_1px,transparent_1px)] [background-size:16px_16px] text-stone-900 select-none overflow-hidden"
              >
                {/* Subtle paper grain & ink texture */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"
                  style={{ backgroundImage: `url('/photo/sumie_website_bg.webp')` }}
                />

                {/* Decorative Japanese Ink Paper Accents */}
                <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
                  <div className="px-1.5 py-0.5 rounded-xs border border-[#8b2323] text-[#8b2323] text-[9px] font-serif font-bold tracking-widest bg-[#8b2323]/5">
                    遊戯
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium tracking-wider">PS-OS v2.6</span>
                </div>

                <div className="relative z-10 flex flex-col h-full pt-8 sm:pt-10 px-4 sm:px-8 pb-14">
                  {/* Digital Clock in Ink Black Serif Typography */}
                  <div className="w-full flex flex-col items-center justify-center mb-6 sm:mb-8 pointer-events-none">
                    <span className="text-stone-900 text-4xl sm:text-6xl font-light tracking-tight font-sans">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-stone-600 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase mt-1">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* App Grid - 4x2 Clean Grid */}
                  <div className="grid grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-5 mx-auto max-w-sm mt-auto mb-4">
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => {
                          if (app.isFolder) {
                            setOpenFolder(app.id);
                          } else {
                            setActiveApp(app.id as AppType);
                          }
                        }}
                      >
                        {app.icon}
                        <span className="text-stone-900 text-[11px] font-mono font-bold text-center truncate w-full px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Folder Popup Overlay (Paper Theme) */}
                <AnimatePresence>
                  {openFolder === 'projects_folder' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-stone-900/50 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6"
                      onClick={() => setOpenFolder(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-[360px] sm:max-w-[460px] max-h-[88%] bg-[#faf6f0] rounded-3xl p-4 sm:p-5 border-2 border-stone-900 shadow-[4px_4px_0px_#1c1917] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Folder Header */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-300 shrink-0">
                          <div className="flex items-center gap-2">
                            <Folder size={18} className="text-stone-900" />
                            <div>
                              <h4 className="text-stone-900 font-bold text-sm tracking-wide font-mono">
                                Projects ({PROJECT_APPS.length})
                              </h4>
                              <p className="text-[10px] text-stone-500 font-mono">Recent First • Tap to simulate</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setOpenFolder(null)}
                            className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Projects Scrollable App Drawer */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3.5 overflow-y-auto max-h-[300px] sm:max-h-[360px] p-1 scrollbar-thin">
                          {PROJECT_APPS.map((pApp) => (
                            <div
                              key={pApp.id}
                              onClick={() => {
                                setActiveApp(pApp.id);
                                setOpenFolder(null);
                              }}
                              className="flex flex-col items-center gap-1 cursor-pointer group p-1 rounded-xl hover:bg-stone-200/50 transition-colors"
                            >
                              <ProjectAppLogo
                                Icon={pApp.Icon}
                                gradient={pApp.gradient}
                                hasDeployed={pApp.hasDeployed}
                                alt={pApp.name}
                              />
                              <span className="text-stone-900 text-[10px] sm:text-[10.5px] font-mono font-bold text-center truncate w-full">
                                {pApp.name}
                              </span>
                              <div className="flex items-center gap-1">
                                {pApp.hasDeployed ? (
                                  <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded-xs border border-emerald-300">
                                    Live
                                  </span>
                                ) : (
                                  <span className="text-[8px] font-mono font-bold text-stone-700 bg-stone-200 px-1 py-0.2 rounded-xs border border-stone-300">
                                    GitHub
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* MARIO */}
            {activeApp === 'mario' && (
              <motion.div key="mario" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://supermariobrosonline.github.io/"
                  className="w-full h-full border-none bg-black"
                  title="Super Mario"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* HEXTRIS */}
            {activeApp === 'hextris' && (
              <motion.div key="hextris" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://hextris.github.io/hextris/"
                  className="w-full h-full border-none bg-black"
                  title="Hextris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* DINO RUN */}
            {activeApp === 'dino' && (
              <motion.div key="dino" className="absolute inset-0 pb-10 bg-white">
                <iframe
                  src="https://wayou.github.io/t-rex-runner/"
                  className="w-full h-full border-none bg-white"
                  title="T-Rex Runner"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* TETRIS */}
            {activeApp === 'tetris' && (
              <motion.div key="tetris" className="absolute inset-0 pb-10 bg-zinc-900">
                <iframe
                  src="https://chvin.github.io/react-tetris/"
                  className="w-full h-full border-none bg-zinc-900"
                  title="Tetris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* SUBWAY SURFERS */}
            {activeApp === 'subway' && (
              <motion.div key="subway" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://subwaysurfers76.github.io/"
                  className="w-full h-full border-none"
                  title="Subway Surfers"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* FLAPPY BIRD */}
            {activeApp === 'flappy' && (
              <motion.div key="flappy" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://flappybird.io/"
                  className="w-full h-full border-none"
                  title="Flappy Bird"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* SPOTIFY */}
            {activeApp === 'spotify' && (
              <motion.div key="spotify" className="absolute inset-0 pb-10 bg-black">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                  className="w-full h-full border-none"
                  title="Spotify"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {/* DYNAMIC PROJECT PREVIEW (Live Deployed or GitHub Showcase) */}
            {selectedProject && (
              <motion.div key={selectedProject.id} className="absolute inset-0 pb-10 bg-white flex flex-col z-20">
                {/* Console App Top Control Bar */}
                <div className="h-10 bg-stone-900 text-stone-100 px-3 sm:px-4 flex items-center justify-between text-xs font-mono select-none border-b border-stone-800 shrink-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-2 h-2 rounded-full ${selectedProject.hasDeployed ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="font-bold truncate text-white">{selectedProject.name}</span>
                    <span className="hidden sm:inline text-stone-400 text-[10px]">• {selectedProject.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedProject.demoUrl && (
                      <a 
                        href={selectedProject.demoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-mono font-bold flex items-center gap-1 transition-colors shadow-xs"
                        title="Open Deployed Website in New Tab"
                      >
                        <span>Open Live</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded text-[11px] font-mono font-bold flex items-center gap-1 transition-colors border border-stone-700"
                      title="View GitHub Repository"
                    >
                      <Github size={12} />
                      <span className="hidden xs:inline">Repo</span>
                    </a>
                  </div>
                </div>

                {/* Content: Live Iframe if Deployed, or High-Caliber GitHub Showcase */}
                {selectedProject.hasDeployed && selectedProject.demoUrl ? (
                  <div className="relative w-full h-full flex-1 bg-white">
                    <iframe
                      src={selectedProject.demoUrl}
                      className="w-full h-full border-none bg-white"
                      title={selectedProject.name}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex-1 bg-stone-950 flex flex-col items-center justify-center p-6 text-center text-white select-none">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} border-2 border-stone-700 flex items-center justify-center mb-4 text-white shadow-xl`}>
                      <selectedProject.Icon size={32} className="stroke-[2.2]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
                      Open Source Repository
                    </span>
                    <h3 className="font-bold text-xl sm:text-2xl mb-1 text-white">{selectedProject.name}</h3>
                    <p className="text-stone-400 text-xs font-mono mb-2">{selectedProject.tech}</p>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-white text-stone-950 hover:bg-stone-200 rounded-xl text-xs font-mono font-bold transition-all inline-flex items-center gap-2 shadow-lg"
                      >
                        <Github size={15} />
                        <span>View Repository on GitHub</span>
                        <ExternalLink size={13} />
                      </a>
                      <button
                        onClick={() => setActiveApp('home')}
                        className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                      >
                        Back to Console
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Android Bottom Navigation Bar (Ink Paper Style) */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-[#f4eee3] flex items-center justify-around z-50 border-t-2 border-stone-900/15 px-6">
            <button
              onClick={() => setActiveApp('home')}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Back"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setActiveApp('home')}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Home"
            >
              <Circle size={14} className="fill-transparent stroke-[2.5]" />
            </button>
            <button
              onClick={() => setOpenFolder(openFolder ? null : 'projects_folder')}
              className="text-stone-800 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              title="Projects Folder"
            >
              <Square size={13} className="fill-transparent stroke-[2.5]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ARCADE PAGE
───────────────────────────────────────────────────────────────────────────── */
export const Arcade: React.FC = () => {
  return (
    <DoodleLayout>
      <PageSeo
        title="Interactive Arcade Console & Mobile Simulator | Pranav Shende"
        description="Play retro games including Tetris, Snake, Flappy Bird, and explore interactive mobile app simulators built by Pranav Shende."
        canonicalPath="/arcade"
        keywords={[
          'Retro Arcade',
          'Interactive Simulator',
          'Tetris React',
          'Flappy Bird Web',
          'Mobile App Simulator',
          'Pranav Shende Games'
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Interactive Arcade Console',
          'operatingSystem': 'Web Browser',
          'applicationCategory': 'GameApplication',
          'url': 'https://pranavshende.online/arcade',
          'author': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/'
          }
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          HEADER ROW
      ────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col sm:flex-row items-start justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug sm:leading-snug">
            Welcome to my arcade! This is where I design and code little games just for fun.
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
            Step right up! Everything here is interactive and made with code & love.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          THE RETRO OS CONSOLE (No outer box, B&W paper theme inside)
      ────────────────────────────────────────────────────────────── */}
      <RetroOSConsole />
    </DoodleLayout>
  );
};

export default Arcade;
