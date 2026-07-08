import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCode } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  gradient: string;
  glow: string;
  badge?: string;
  badgeColor?: string;
  emoji: string;
  githubLink?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    title: "PashuRakshak",
    subtitle: "AI Livestock Disease Detection",
    description:
      "An AI-powered livestock healthcare platform with 5+ modules using edge computing and TensorFlow Lite for offline disease detection. Trained a CNN-based classification model, connected 15+ RESTful APIs. Research presented at an international IEEE conference.",
    tech: ["React Native (Expo)", "Node.js", "PostgreSQL", "Python", "CNN", "TensorFlow Lite"],
    highlights: [
      "5+ modules with offline-first edge computing",
      "CNN disease classification model",
      "15+ RESTful APIs connected",
      "IEEE Conference presentation",
      "Veterinary assistance system",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    badge: "IEEE Published",
    badgeColor: "chip-violet",
    emoji: "🐄",
    githubLink: "#",
    demoLink: "#",
  },
  {
    title: "JanSampark",
    subtitle: "Smart Civic Grievance Platform",
    description:
      "Full-stack civic platform bridging citizens and administration. Built 25+ frontend modules in React Native with a secure Node.js backend featuring JWT + RBAC for 4 user roles and 40+ RESTful APIs backed by PostgreSQL.",
    tech: ["React Native", "Node.js", "PostgreSQL", "JWT", "RBAC"],
    highlights: [
      "25+ frontend modules in React Native",
      "JWT + RBAC for 4 user roles",
      "40+ RESTful APIs with PostgreSQL",
      "Citizen grievance & tracking system",
      "Admin dashboard & visitor management",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    emoji: "🏛️",
    githubLink: "#",
    demoLink: "#",
  },
  {
    title: "Solar Intelligence",
    subtitle: "AI Sales Analytics Platform",
    description:
      "AI-driven solar sales intelligence platform analyzing 10+ years of data across 36+ Indian states. Features geospatial heatmaps and polynomial regression forecasting (2025–2030) covering 81.8+ GW of installed capacity.",
    tech: ["Python", "PostgreSQL", "ETL", "ML", "Geospatial", "Recharts"],
    highlights: [
      "10+ years (2014–2024) of solar data",
      "36+ states/UTs analyzed",
      "81.8+ GW capacity evaluated",
      "2025–2030 forecasting model",
      "Geospatial heatmaps",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    emoji: "☀️",
    githubLink: "#",
    demoLink: "#",
  },
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-50 flex items-end bg-[#0D1117]/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-[85%] flex flex-col rounded-t-lg bg-[#161B22] border border-[#30363D]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Editor Tab Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#30363D] bg-[#0D1117] rounded-t-lg">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-[#58A6FF]" />
          <span className="text-xs font-mono text-[#C9D1D9]">{project.title.toLowerCase().replace(/ /g, '_')}.tsx</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-[#30363D] rounded transition-colors">
          <X size={14} className="text-[#C9D1D9]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 font-mono text-xs">
        
        {/* Description as a docstring */}
        <div>
          <span className="text-[#8B949E]">/**</span><br/>
          <span className="text-[#8B949E]"> * {project.subtitle}</span><br/>
          <span className="text-[#8B949E]"> *</span><br/>
          <span className="text-[#8B949E]"> * {project.description}</span><br/>
          <span className="text-[#8B949E]"> */</span>
        </div>

        {/* Highlights as an array */}
        <div>
          <span className="text-[#D2A8FF]">const </span>
          <span className="text-[#58A6FF]">features </span>
          <span className="text-[#C9D1D9]">= [</span>
          <div className="pl-4">
            {project.highlights.map((h, i) => (
              <div key={i}>
                <span className="text-[#3FB950]">"{h}"</span>
                <span className="text-[#C9D1D9]">{i < project.highlights.length - 1 ? ',' : ''}</span>
              </div>
            ))}
          </div>
          <span className="text-[#C9D1D9]">];</span>
        </div>

        {/* Commands instead of standard buttons */}
        <div className="pt-2 space-y-2">
          <div className="text-[#8B949E]">{'// Execute commands'}</div>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block p-3 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF] transition-colors">
              <span className="text-[#3FB950] mr-2">➜</span>
              <span className="text-[#58A6FF]">~</span>
              <span className="text-[#C9D1D9] ml-2">$ git clone {project.githubLink === '#' ? 'repo.git' : project.githubLink}</span>
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="block p-3 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF] transition-colors">
              <span className="text-[#3FB950] mr-2">➜</span>
              <span className="text-[#58A6FF]">~</span>
              <span className="text-[#C9D1D9] ml-2">$ npm run demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsScreen = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="app-screen relative">
      <div className="screen-content space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-4">
            Projects
          </h2>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="project-card flex flex-col overflow-hidden p-0"
              onClick={() => setSelected(project)}
            >
              {/* File tab */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117]">
                <FileCode size={12} className="text-[#58A6FF]" />
                <span className="font-mono text-[11px] text-[#C9D1D9]">{project.title.toLowerCase().replace(/ /g, '_')}.tsx</span>
              </div>
              {/* Editor content */}
              <div className="p-4 bg-[#161B22] font-mono text-[11px] leading-relaxed">
                <div>
                  <span className="text-[#D2A8FF]">import</span>
                  <span className="text-[#C9D1D9]"> {'{ '}</span>
                  <span className="text-[#8B949E]">{project.tech.slice(0, 3).join(", ")}{project.tech.length > 3 ? ', ...' : ''}</span>
                  <span className="text-[#C9D1D9]">{' }'}</span>
                  <span className="text-[#D2A8FF]"> from </span>
                  <span className="text-[#3FB950]">'tech-stack'</span>
                  <span className="text-[#C9D1D9]">;</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#8B949E]">{'// '} {project.subtitle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-4" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsScreen;
