import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Github, ExternalLink } from "lucide-react";

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
    demoLink: "/playgames?folder=projects_folder",
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
    demoLink: "/playgames?folder=projects_folder",
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
    demoLink: "/playgames?folder=projects_folder",
  },
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-50 flex items-end"
    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-h-[80%] overflow-y-auto no-scrollbar rounded-t-3xl"
      style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 -10px 40px rgba(0,0,0,0.05)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 bg-black/20 rounded-full" />
      </div>

      <div className="px-5 pb-8 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl`}
              style={{ boxShadow: `0 4px 16px ${project.glow}` }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">{project.title}</h3>
              <p className="text-xs text-zinc-500">{project.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center"
          >
            <X size={14} className="text-zinc-600" />
          </button>
        </div>

        {/* Badge */}
        {project.badge && (
          <div className="flex items-center gap-1.5">
            <Award size={12} className="text-zinc-400" />
            <span className={`chip ${project.badgeColor} text-[10px]`}>{project.badge}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-zinc-600 leading-relaxed">{project.description}</p>

        {/* Highlights */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Highlights</h4>
          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-600">
                <span className="timeline-dot mt-1.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip chip-cyan text-[10px]">{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-900 transition-all hover:scale-95"
              style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <Github size={14} />
              GitHub Repo
            </a>
          )}
          {project.demoLink && (
            <Link
              to={project.demoLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-95"
              style={{ background: "linear-gradient(135deg, #27272a 0%, #000000 100%)" }}
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="screen-header">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xs text-zinc-500 -mt-4 mb-2">Tap any card for details</p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 200 }}
              className="project-card"
              onClick={() => setSelected(project)}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl flex-shrink-0`}
                  style={{ boxShadow: `0 4px 16px ${project.glow}` }}
                >
                  {project.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">{project.title}</h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{project.subtitle}</p>
                    </div>
                    {project.badge && (
                      <span className={`chip ${project.badgeColor} text-[9px] flex-shrink-0`}>
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Tech preview */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="chip text-[9px]">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="chip text-[9px]">+{project.tech.length - 3}</span>
                    )}
                  </div>
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
