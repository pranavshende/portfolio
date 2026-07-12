import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Zap } from "lucide-react";

const achievements = [
  {
    icon: Award,
    title: "Best Research Paper Award",
    org: "International Conference on Tech & Trends",
    sub: "Suryodaya College — IEEE Published",
    color: "#171717",
    bg: "rgba(0,0,0,0.03)",
    border: "rgba(0,0,0,0.06)",
    emoji: "🥇",
    link: "https://drive.google.com/file/d/1abiQVWd72J9scEi2OrO6oI5UyBcKa9fX/view?usp=sharing",
  },
  {
    icon: Trophy,
    title: "3rd Prize — Hackathon",
    org: "Technex 2025 National Hackathon",
    sub: "Inter-college national level competition",
    color: "#404040",
    bg: "rgba(0,0,0,0.03)",
    border: "rgba(0,0,0,0.06)",
    emoji: "🏆",
    link: "https://drive.google.com/file/d/16YkeHOFIaYoUiic2LQWVwMAHAMjkR_SN/view?usp=sharing",
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
          <div className="absolute top-0 right-0 w-28 h-28 bg-black/5 rounded-full blur-2xl" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-lg font-bold text-zinc-900">
                PS
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Pranav Shende</h3>
                <p className="text-[11px] text-zinc-500">Full Stack Developer · AI Builder</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
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
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <GraduationCap size={11} /> Education
          </h3>
          <a
            href="https://www.stvincentngp.edu.in/"
            target="_blank"
            rel="noreferrer"
            className="block p-4 rounded-[12px] hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 transition-all group cursor-pointer"
            style={{
              backgroundColor: "rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center text-base flex-shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-zinc-900 leading-tight group-hover:text-blue-600 transition-colors">
                  B.Tech in Information Technology
                </h4>
                <p className="text-[11px] font-semibold text-zinc-600 mt-0.5 group-hover:text-zinc-800 transition-colors">SVPCET, Nagpur</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-zinc-500">2023 – 2027</span>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-lg"
                    style={{
                      background: "rgba(0,0,0,0.05)",
                      color: "#171717",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    CGPA: 8.3 / 10
                  </span>
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <Trophy size={11} /> Achievements
          </h3>
          <div className="space-y-2">
            {achievements.map((a, i) => {
              const content = (
                <>
                  <span className="text-xl">{a.emoji}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold transition-colors" style={{ color: a.color }}>{a.title}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">{a.org}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{a.sub}</p>
                  </div>
                </>
              );

              return a.link ? (
                <motion.a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  key={a.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-[12px] hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 transition-all cursor-pointer block"
                  style={{ backgroundColor: a.bg, border: `1px solid ${a.border}` }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-[12px]"
                  style={{ backgroundColor: a.bg, border: `1px solid ${a.border}` }}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
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
