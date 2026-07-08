import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  All: "⚡",
  Languages: "💻",
  Frontend: "🎨",
  Backend: "⚙️",
  Databases: "🗄️",
  "AI/ML": "🧠",
  Tools: "🔧",
};

const SkillsScreen = () => {
  const [active, setActive] = useState<Category>("All");

  const skills = skillData[active];

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
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Category filter pills — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                active === cat
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80"
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-white/30"
        >
          {skills.length} skills {active !== "All" ? `in ${active}` : "total"}
        </motion.p>

        {/* Skills cloud */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {skills.map((skill, i) => (
              <motion.span
                key={`${active}-${skill.name}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.025,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className={`chip ${skill.color} cursor-default hover:scale-105 transition-transform`}
                style={{ fontSize: "11px", padding: "5px 13px" }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 space-y-2"
        >
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Certifications</h3>
          {[
            { name: "Data Structures & Algorithms in C++", org: "Codetantra · With Lab Practicals", emoji: "📜" },
            { name: "Java Programming", org: "Codetantra · With Lab Practicals", emoji: "☕" },
          ].map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-lg">{cert.emoji}</span>
              <div>
                <p className="text-xs font-semibold text-white/85">{cert.name}</p>
                <p className="text-[10px] text-white/35">{cert.org}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default SkillsScreen;
