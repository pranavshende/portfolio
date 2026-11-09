import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Circle, Square,
  Hexagon, Activity, Gamepad2, TrainFront, Bird, Globe, Music, Folder,
  Smartphone, Tablet, Monitor, ExternalLink, Bot, Camera, Flame, 
  Landmark, PartyPopper, HeartHandshake, Sun, Sprout, Github, Stethoscope, 
  UtensilsCrossed, Users
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FloatingHeader from '../components/FloatingHeader';
import { PageSeo } from '@/components/PageSeo';

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
      {!hasDeployed && (
        <span className="absolute -bottom-1 -right-1 px-1 py-0.2 text-[8px] font-mono font-bold bg-stone-900 text-amber-300 border border-stone-700 rounded-sm">
          GH
        </span>
      )}
    </div>
  );
};

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

// Auto-detect optimal device mode based on viewport
const getDeviceTypeFromWindow = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

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

const PlayGames = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [hasManuallySelected, setHasManuallySelected] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(() => getDeviceTypeFromWindow());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!hasManuallySelected) {
        setDeviceType(getDeviceTypeFromWindow());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasManuallySelected]);

  const navigate = useNavigate();
  const location = useLocation();
  const [openFolder, setOpenFolder] = useState<string | null>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('folder');
  });

  type AppItem = {
    id: string;
    name: string;
    icon: JSX.Element;
    isFolder?: boolean;
  };

  const apps: AppItem[] = [
    { id: 'mario', name: 'Mario', icon: <PaperAppIcon Icon={Gamepad2} alt="Super Mario" /> },
    { id: 'hextris', name: 'Hextris', icon: <PaperAppIcon Icon={Hexagon} alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <PaperAppIcon Icon={Activity} alt="Dino Run" /> },
    { id: 'tetris', name: 'Tetris', icon: <PaperAppIcon Icon={TetrisIcon} alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <PaperAppIcon Icon={TrainFront} alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <PaperAppIcon Icon={Bird} alt="Flappy Bird" /> },
    { id: 'projects_folder', name: 'Projects', isFolder: true, 
      icon: (
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-stone-900 group-hover:bg-stone-50 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_#1c1917] transition-all shrink-0">
          <Folder size={24} className="text-stone-900 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8b2323] text-white text-[9px] font-mono font-bold flex items-center justify-center">
            {PROJECT_APPS.length}
          </span>
        </div>
      )
    },
    { id: 'spotify', name: 'Spotify', icon: <PaperAppIcon Icon={Music} alt="Spotify" /> },
  ];

  // Helper to look up active project
  const selectedProject = PROJECT_APPS.find((p) => p.id === activeApp);

  return (
    <div className="h-[100dvh] sm:h-screen bg-zinc-50 dark:bg-black flex flex-col p-0 sm:p-6 md:p-8 font-sans overflow-hidden">
      <PageSeo
        title="Gaming Station & Interactive Retro Console | Pranav Shende"
        description="Play classic arcade titles including Mario, Hextris, Dino Runner, Tetris, Flappy Bird, and Subway Surfers directly in the browser."
        canonicalPath="/playgames"
        keywords={[
          'Web Games',
          'Retro Gaming Station',
          'Browser Arcade',
          'React Games',
          'Mario Web',
          'Tetris Online',
          'Pranav Shende'
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Interactive Gaming Station',
          'operatingSystem': 'Web Browser',
          'applicationCategory': 'GameApplication',
          'url': 'https://pranavshende.online/playgames',
          'author': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/'
          }
        }}
      />
      
      <div className="hidden lg:block">
        <FloatingHeader />
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex w-full justify-between items-center z-[60] mb-4 shrink-0 pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors bg-black/5 hover:bg-black/10 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 dark:border-white/10"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Portfolio</span>
        </Link>

        <div className="pointer-events-auto flex bg-black/5 dark:bg-black/40 backdrop-blur-md rounded-full p-1 border border-black/10 dark:border-white/10 relative">
          {(['mobile', 'tablet', 'desktop'] as const).map((type) => {
            const icons = {
              mobile: Smartphone,
              tablet: Tablet,
              desktop: Monitor
            };
            const Icon = icons[type];
            const isActive = deviceType === type;
            
            return (
              <button
                key={type}
                onClick={() => {
                  setHasManuallySelected(true);
                  setDeviceType(type);
                }}
                className={`relative p-2 rounded-full transition-colors z-10 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-device-mode"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-fuchsia-500/40 to-purple-500/30 rounded-full z-0 overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[200%]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
                        ease: "linear",
                        repeatDelay: 0.5 
                      }}
                    />
                  </motion.div>
                )}
                <Icon size={20} className="relative z-10 drop-shadow-sm" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Absolute Back Button */}
      <Link 
        to="/" 
        className="sm:hidden absolute top-6 left-6 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors z-[60] bg-black/10 dark:bg-black/40 backdrop-blur-xl p-3 rounded-full border border-black/10 dark:border-white/10 shadow-lg"
      >
        <ChevronLeft size={22} className="drop-shadow-sm" />
      </Link>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 relative">
        {/* Background ambient glow */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Device Frame */}
      <motion.div 
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={`relative w-full h-full sm:max-h-full bg-[#09090b] sm:border-[10px] sm:border-[#27272a] shadow-2xl overflow-hidden sm:shadow-purple-900/20 transition-all duration-500 ${
          deviceType === 'mobile' 
            ? 'sm:h-[812px] sm:w-auto sm:aspect-[375/812] sm:rounded-[3rem]' 
            : deviceType === 'tablet'
              ? 'sm:h-[820px] sm:w-auto sm:aspect-[1180/820] sm:rounded-[2rem]'
              : 'sm:w-full sm:h-auto sm:max-w-[1200px] sm:aspect-[16/9] sm:rounded-[1rem]'
        }`}
      >
        {/* Hardware Buttons */}
        {deviceType !== 'desktop' && (
          <>
            <div className="hidden sm:block absolute -left-[14px] top-32 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -left-[14px] top-48 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -right-[14px] top-40 w-1 h-16 bg-[#3f3f46] rounded-r-md" />
          </>
        )}

        {/* Screen Content */}
        <div className="relative w-full h-full bg-[#18181b] overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* HOME SCREEN */}
            {activeApp === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col bg-[#faf7f0] bg-[radial-gradient(#e5dfd3_1px,transparent_1px)] [background-size:16px_16px] text-stone-900 select-none overflow-hidden"
              >
                {/* Subtle paper grain & ink texture */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"
                  style={{ backgroundImage: `url('/photo/sumie_website_bg.webp')` }}
                />

                {/* Decorative Japanese Ink Paper Accents */}
                <div className="absolute top-4 right-5 flex items-center gap-2 pointer-events-none">
                  <div className="px-1.5 py-0.5 rounded-xs border border-[#8b2323] text-[#8b2323] text-[9px] font-serif font-bold tracking-widest bg-[#8b2323]/5">
                    遊戯
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium tracking-wider">PS-OS v2.6</span>
                </div>
                
                <div className="relative z-10 flex flex-col h-full pt-16 px-6 pb-20 sm:pb-16">
                  {/* Aesthetic Clock Widget in Ink Black */}
                  <div className="w-full flex flex-col items-center justify-center mb-10 mt-2 sm:mb-12 sm:mt-4 pointer-events-none">
                    <span className="text-stone-900 text-5xl sm:text-7xl font-light tracking-tight font-sans">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-stone-600 text-[11px] sm:text-sm font-mono font-bold tracking-widest uppercase mt-2">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Apps Grid */}
                  <div className={`grid gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 mx-auto mt-auto mb-6 sm:mb-10 w-full px-2 sm:px-0 ${
                    deviceType === 'desktop' 
                      ? 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 max-w-4xl' 
                      : 'grid-cols-4 max-w-sm'
                  }`}>
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
                        <span className="text-stone-900 text-[11px] font-mono font-bold tracking-tight w-full text-center truncate px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Folder Overlay (Paper Theme) */}
                <AnimatePresence>
                  {openFolder && (
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

            {/* DYNAMIC PROJECT PREVIEW SCREEN */}
            {selectedProject && (
              <motion.div 
                key={selectedProject.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-white flex flex-col z-20"
              >
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
            {activeApp === 'mario' && (
              <motion.div 
                key="mario"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://supermariobrosonline.github.io/" 
                  className="w-full h-full border-none pointer-events-auto bg-black"
                  title="Super Mario"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'hextris' && (
              <motion.div 
                key="hextris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://hextris.github.io/hextris/" 
                  className="w-full h-full border-none pointer-events-auto bg-black"
                  title="Hextris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'dino' && (
              <motion.div 
                key="dino"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://wayou.github.io/t-rex-runner/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="T-Rex Runner"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'tetris' && (
              <motion.div 
                key="tetris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://chvin.github.io/react-tetris/" 
                  className="w-full h-full border-none pointer-events-auto bg-zinc-900"
                  title="Tetris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'subway' && (
              <motion.div 
                key="subway"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://subwaysurfers76.github.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Subway Surfers"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'flappy' && (
              <motion.div 
                key="flappy"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://flappybird.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Flappy Bird"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}



            {activeApp === 'spotify' && (
              <motion.div 
                key="spotify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Spotify"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-12 bg-black/90 backdrop-blur-xl flex items-center justify-around z-50 border-t border-white/10 pb-2 sm:pb-0 px-2 sm:px-0">
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Back"
          >
            <ChevronLeft size={24} className="sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Home"
          >
            <Circle size={18} className="fill-transparent stroke-2 sm:w-4 sm:h-4" />
          </button>

          <Link 
            to="/"
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Portfolio"
          >
            <Square size={16} className="fill-transparent stroke-2 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </motion.div>
      
      </div>
    </div>
  );
};

export default PlayGames;
