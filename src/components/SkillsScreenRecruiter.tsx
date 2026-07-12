import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileJson } from "lucide-react";

type Category = "All" | "Languages" | "Frontend" | "Backend" | "Databases" | "AI/ML" | "Tools";

const skillData: Record<Category, { name: string; color: string }[]> = {
  All: [],
  Languages: [
    { name: "Java", color: "chip-violet" },
    { name: "TypeScript", color: "chip-cyan" },
    { name: "JavaScript", color: "chip-cyan" },
    { name: "Python", color: "chip-emerald" },
    { name: "SQL", color: "chip-violet" },
    { name: "C", color: "chip" },
    { name: "C++", color: "chip" },
  ],
  Frontend: [
    { name: "React", color: "chip-cyan" },
    { name: "React Native (Expo)", color: "chip-cyan" },
    { name: "Vite", color: "chip-violet" },
    { name: "HTML", color: "chip" },
    { name: "CSS", color: "chip" },
    { name: "Tailwind CSS", color: "chip" },
  ],
  Backend: [
    { name: "Node.js", color: "chip-emerald" },
    { name: "Express.js", color: "chip-emerald" },
    { name: "REST API", color: "chip-violet" },
    { name: "JWT", color: "chip-violet" },
    { name: "RBAC", color: "chip-violet" },
    { name: "WebSockets", color: "chip-cyan" },
  ],
  Databases: [
    { name: "MongoDB", color: "chip-emerald" },
    { name: "PostgreSQL", color: "chip-cyan" },
    { name: "MySQL", color: "chip-cyan" },
    { name: "Supabase", color: "chip-emerald" },
  ],
  "AI/ML": [
    { name: "CNN", color: "chip-violet" },
    { name: "TensorFlow Lite", color: "chip-violet" },
    { name: "Machine Learning", color: "chip-violet" },
    { name: "ETL Pipelines", color: "chip-cyan" },
    { name: "Polynomial Regression", color: "chip-cyan" },
    { name: "Geospatial Analysis", color: "chip-emerald" },
    { name: "Edge Computing", color: "chip-emerald" },
  ],
  Tools: [
    { name: "Git", color: "chip" },
    { name: "GitHub", color: "chip" },
    { name: "Postman", color: "chip-emerald" },
    { name: "VS Code", color: "chip-cyan" },
    { name: "GCP", color: "chip-cyan" },
    { name: "Vercel", color: "chip" },
    { name: "Docker", color: "chip-cyan" },
    { name: "Kubernetes", color: "chip-cyan" },
  ],
};

// Merge all for "All" tab
skillData["All"] = Object.entries(skillData)
  .filter(([k]) => k !== "All")
  .flatMap(([, v]) => v);

const categories: Category[] = ["All", "Languages", "Frontend", "Backend", "Databases", "AI/ML", "Tools"];

const categoryIcons: Record<Category, string> = {
  All: "*",
  Languages: "{ }",
  Frontend: "< >",
  Backend: "{}",
  Databases: "[]",
  "AI/ML": "()",
  Tools: "$",
};

const SkillsScreen = () => {
  const [active, setActive] = useState<Category>("All");

  const skills = skillData[active];

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
            Skills
          </h2>
        </motion.div>

        {/* Category filter pills — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors border ${
                active === cat
                  ? "bg-[#161B22] border-[#58A6FF] text-[#C9D1D9]"
                  : "bg-[#0D1117] border-[#30363D] text-[#8B949E] hover:border-[#8B949E]"
              }`}
            >
              <span className="text-[#3FB950]">{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] font-mono text-[#8B949E]"
        >
          {'//'} {skills.length} skills {active !== "All" ? `in ${active}` : "total"}
        </motion.p>

        {/* Skills cloud */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-card flex flex-col font-mono text-[11px] overflow-hidden p-0"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117]">
              <FileJson size={12} className="text-[#58A6FF]" />
              <span className="text-[#C9D1D9]">skills.json</span>
            </div>
            
            <div className="p-4 bg-[#161B22] leading-relaxed">
              <span className="text-[#C9D1D9]">{'{'}</span>
              <div className="pl-4">
                <span className="text-[#58A6FF]">"{active.toLowerCase()}"</span>
                <span className="text-[#C9D1D9]">: [</span>
                <div className="pl-4 flex flex-col">
                  {skills.map((skill, i) => (
                    <div key={`${active}-${skill.name}`}>
                      <span className="text-[#3FB950]">"{skill.name}"</span>
                      <span className="text-[#C9D1D9]">{i < skills.length - 1 ? ',' : ''}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[#C9D1D9]">]</span>
              </div>
              <span className="text-[#C9D1D9]">{'}'}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 space-y-2"
        >
          <h3 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest">Certifications</h3>
          {[
            { name: "Data Structures & Algorithms in C++", org: "Codetantra", type: "lab_practicals", href: 'https://drive.google.com/file/d/12aX9JQ50mf9VfFU4D5Nq7GItDCJ3yjxf/view?usp=sharing' },
            { name: "Java Programming", org: "Codetantra", type: "lab_practicals", href: 'https://drive.google.com/file/d/1VghN2nvLFVZThKYlk2wJuLCuNmnAz3FX/view?usp=sharing' },
          ].map((cert) => (
            <a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-md bg-[#0D1117] border border-[#30363D] hover:bg-[#161B22] transition-colors group"
            >
              <div className="text-[#D2A8FF] font-mono text-[10px]">CERT</div>
              <div>
                <p className="text-xs font-mono text-[#C9D1D9] group-hover:text-[#58A6FF] transition-colors">{cert.name}</p>
                <p className="text-[10px] font-mono text-[#8B949E] mt-0.5">{cert.org} · {cert.type}</p>
              </div>
            </a>
          ))}
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default SkillsScreen;
