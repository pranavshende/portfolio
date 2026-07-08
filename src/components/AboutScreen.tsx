import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Zap } from "lucide-react";

const achievements = [
  {
    icon: Award,
    title: "Best Research Paper Award",
    org: "International Conference on Tech & Trends",
    sub: "Suryodaya College — IEEE Published",
    color: "#a78bfa",
    bg: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.2)",
    emoji: "🥇",
  },
  {
    icon: Trophy,
    title: "3rd Prize — Hackathon",
    org: "Technex 2025 National Hackathon",
    sub: "Inter-college national level competition",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    emoji: "🏆",
  },
];

const focusAreas = [
  "Full Stack Development",
  "MERN Stack",
  "React Native",
  "AI/ML Systems",
  "Edge Computing",
  "Research & Innovation",
  "Scalable Backends",
  "REST API Design",
];

const AboutScreen = () => {
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
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Profile summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-violet p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-violet-600/15 rounded-full blur-2xl" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">
                PS
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Pranav Shende</h3>
                <p className="text-[11px] text-white/50">Full Stack Developer · AI Builder</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Full Stack Developer specializing in the MERN stack and React Native, with experience building scalable web and mobile applications, AI-powered solutions, and 40+ REST APIs. IEEE-published researcher with expertise in AI/ML, edge computing, and modern software engineering.
            </p>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <GraduationCap size={11} /> Education
          </h3>
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(6,182,212,0.06)",
              border: "1px solid rgba(6,182,212,0.15)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-base flex-shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-white/90 leading-tight">
                  B.Tech in Information Technology
                </h4>
                <p className="text-[11px] font-semibold text-cyan-400 mt-0.5">SVPCET, Nagpur</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-white/35">2023 – 2027</span>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-lg"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#6ee7b7",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    CGPA: 8.3 / 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <Trophy size={11} /> Achievements
          </h3>
          <div className="space-y-2">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-2xl"
                style={{ background: a.bg, border: `1px solid ${a.border}` }}
              >
                <span className="text-xl">{a.emoji}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: a.color }}>{a.title}</p>
                  <p className="text-[11px] text-white/70 mt-0.5">{a.org}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{a.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <Zap size={11} /> Focus Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area, i) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.04, type: "spring", stiffness: 350 }}
                className="chip chip-violet text-[10px] hover:scale-105 transition-transform cursor-default"
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default AboutScreen;
