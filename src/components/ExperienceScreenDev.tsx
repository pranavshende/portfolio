import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, FileCode } from "lucide-react";

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="project-card flex flex-col overflow-hidden p-0 font-mono text-[11px]"
    >
      {/* File tab */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117] cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <FileCode size={12} className="text-[#58A6FF]" />
        <span className="text-[#C9D1D9]">{exp.company.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_')}.ts</span>
        <div className="flex-1" />
        <span className={exp.type.includes('Active') ? "text-[#3FB950]" : "text-[#8B949E]"}>
          {exp.type.includes('Active') ? '● Active' : '○ Closed'}
        </span>
      </div>

      {/* Editor content */}
      <div className="p-4 bg-[#161B22] space-y-3">
        <div>
          <span className="text-[#D2A8FF]">const </span>
          <span className="text-[#58A6FF]">role </span>
          <span className="text-[#C9D1D9]">= </span>
          <span className="text-[#3FB950]">"{exp.title}"</span>
          <span className="text-[#C9D1D9]">;</span>
        </div>
        <div>
          <span className="text-[#D2A8FF]">const </span>
          <span className="text-[#58A6FF]">period </span>
          <span className="text-[#C9D1D9]">= </span>
          <span className="text-[#3FB950]">"{exp.period}"</span>
          <span className="text-[#C9D1D9]">;</span>
        </div>
        <div>
          <span className="text-[#D2A8FF]">const </span>
          <span className="text-[#58A6FF]">stack </span>
          <span className="text-[#C9D1D9]">= [</span>
          <span className="text-[#3FB950]">"{exp.tags.slice(0, 3).join('", "')}"{exp.tags.length > 3 ? ', ...' : ''}</span>
          <span className="text-[#C9D1D9]">];</span>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "// collapse details" : "// expand details"}
        </button>

        {/* Bullets */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pt-2"
            >
              <div>
                <span className="text-[#D2A8FF]">const </span>
                <span className="text-[#58A6FF]">achievements </span>
                <span className="text-[#C9D1D9]">= [</span>
                <div className="pl-4 space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <div key={i}>
                      <span className="text-[#3FB950]">"{bullet}"</span>
                      <span className="text-[#C9D1D9]">{i < exp.bullets.length - 1 ? ',' : ''}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[#C9D1D9]">];</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ExperienceScreen = () => {
  return (
    <div className="app-screen">
      <div className="screen-content space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-4">
            Experience
          </h2>
        </motion.div>

        {/* Active indicator bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 p-3 rounded-md bg-[#0D1117] border border-[#30363D]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />
          <span className="text-[11px] font-mono text-[#C9D1D9]">2 Active Internships</span>
          <span className="text-[10px] font-mono text-[#8B949E] ml-1">· NK SkillEdge & IT Daksh</span>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.1 }}
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
