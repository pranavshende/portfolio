import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Calendar, ExternalLink } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  color: string;
  glow: string;
  initials: string;
  bullets: string[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    title: "Android Application Developer Intern",
    company: "NK SkillEdge Pvt. Ltd.",
    location: "Nagpur, India",
    period: "May 2026 – Present",
    type: "Full Stack · Active",
    color: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    initials: "NK",
    bullets: [
      "Spearheaded development of JanSampark — a smart civic grievance platform — engineering 25+ frontend modules using React Native.",
      "Architected a robust Node.js backend secured by JWT and RBAC framework for 4 user roles, safeguarding sensitive citizen data.",
      "Authored and optimized 40+ RESTful APIs with PostgreSQL, mitigating endpoint vulnerabilities and reducing query response times.",
    ],
    tags: ["React Native", "Node.js", "PostgreSQL", "JWT", "RBAC"],
  },
  {
    title: "Data Analyst Intern",
    company: "IT Daksh",
    location: "Solar Sales Intelligence",
    period: "Jan 2026 – Present",
    type: "Analytics · Active",
    color: "from-zinc-600 to-zinc-800",
    glow: "rgba(255,255,255,0.1)",
    initials: "ITD",
    bullets: [
      "Analyzed 10+ years (2014–2024) of solar installation metrics across 36+ Indian states/UTs using Python and PostgreSQL.",
      "Optimized data pipelines via advanced ETL and data cleaning procedures, reducing dashboard latency.",
      "Built an AI-driven sales intelligence platform with geospatial heatmaps and 2025–2030 polynomial regression forecasting — evaluating 81.8+ GW across 500+ records.",
    ],
    tags: ["Python", "PostgreSQL", "ETL", "ML Forecasting", "Geospatial"],
  },
  {
    title: "Backend Developer & Advisor",
    company: "Technex SVPCET",
    location: "Nagpur, India",
    period: "Dec 2024 – Jan 2026",
    type: "Backend · Completed",
    color: "from-zinc-500 to-zinc-700",
    glow: "rgba(255,255,255,0.1)",
    initials: "TX",
    bullets: [
      "Architected scalable backend on Google Cloud Platform (GCP) handling 3,000+ registrations and 100,000+ impressions.",
      "Streamlined financial infrastructure by integrating secure payment gateways and configuring RBAC for 3 user tiers.",
      "Maintained production uptime during national techfest by identifying and debugging 20+ critical live-production issues.",
    ],
    tags: ["GCP", "Node.js", "Payment Gateway", "RBAC", "Production"],
  },
];

const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="exp-card"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Company avatar */}
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}
          style={{ boxShadow: `0 4px 16px ${exp.glow}` }}
        >
          {exp.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-zinc-900 leading-tight">{exp.title}</h3>
          <p className="text-xs font-semibold text-zinc-400 mt-0.5">{exp.company}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <MapPin size={9} className="text-zinc-400" />
              <span className="text-[10px] text-zinc-500">{exp.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={9} className="text-zinc-400" />
              <span className="text-[10px] text-zinc-500">{exp.period}</span>
            </div>
          </div>
        </div>
        <span className="chip chip-violet text-[9px] flex-shrink-0">
          {exp.type.split(" · ")[1]}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {exp.tags.map((tag) => (
          <span key={tag} className="chip text-[9px]">{tag}</span>
        ))}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400/80 hover:text-zinc-400 transition-colors"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? "Hide details" : "Show details"}
      </button>

      {/* Bullets */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-zinc-600 leading-relaxed">
                  <span className="timeline-dot mt-1.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ExperienceScreen = () => {
  return (
    <div className="app-screen">
      <div className="screen-content space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="screen-header">
            <span className="gradient-text">Work</span> Experience
          </h2>
          <p className="text-xs text-zinc-500 -mt-4 mb-2">Tap cards to expand details</p>
        </motion.div>

        {/* Active indicator bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 p-3 rounded-xl"
          style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <span className="pulse-dot flex-shrink-0" />
          <span className="text-[11px] font-semibold text-zinc-900">2 Active Internships</span>
          <span className="text-[10px] text-zinc-500 ml-1">· NK SkillEdge & IT Daksh</span>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 200 }}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ExperienceScreen;
