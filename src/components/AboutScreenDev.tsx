import { motion } from "framer-motion";
import { FileText, Trophy, Award } from "lucide-react";

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
    title: "Technex 2025 — National Hackathon 3rd Prize",
    org: "Inter-college national-level hackathon",
    sub: "Nagpur, India",
    color: "#171717",
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-4">
            About Me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card flex flex-col font-mono text-[11px] overflow-hidden p-0"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117]">
            <FileText size={12} className="text-[#58A6FF]" />
            <span className="text-[#C9D1D9]">about.md</span>
          </div>

          <div className="p-4 bg-[#161B22] space-y-5 text-[#C9D1D9] leading-relaxed">
            
            {/* Header */}
            <div>
              <span className="text-[#58A6FF] font-bold"># Pranav Shende</span><br/>
              <span className="text-[#8B949E] italic">Full Stack Developer · AI Builder</span>
            </div>

            {/* Bio */}
            <div>
              Full Stack Developer specializing in the MERN stack and React Native, with experience building scalable web and mobile applications, AI-powered solutions, and 40+ REST APIs. IEEE-published researcher with expertise in AI/ML, edge computing, and modern software engineering.
            </div>

            {/* Education */}
            <div>
              <span className="text-[#58A6FF] font-bold">## Education</span><br/>
              <span className="text-[#3FB950]">- B.Tech in Information Technology</span><br/>
              <a href="https://www.stvincentngp.edu.in/" target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-[#58A6FF] hover:underline cursor-pointer transition-colors whitespace-pre">  SVPCET, Nagpur (2023 – 2027)</a><br/>
              <span className="text-[#D2A8FF]">  CGPA: 8.3 / 10</span>
            </div>

            {/* Achievements */}
            <div>
              <span className="text-[#58A6FF] font-bold">## Achievements</span><br/>
              {achievements.map((a, i) => (
                <div key={i} className="mb-2">
                  <span className="text-[#3FB950]">- {a.title}</span><br/>
                  <span className="text-[#8B949E]">  {a.org}</span><br/>
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-[#58A6FF] hover:underline cursor-pointer transition-colors whitespace-pre">  {a.sub}</a>
                  ) : (
                    <span className="text-[#8B949E]">  {a.sub}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Focus Areas */}
            <div>
              <span className="text-[#58A6FF] font-bold">## Focus Areas</span><br/>
              <div className="flex flex-wrap gap-1 mt-1">
                {focusAreas.map((area, i) => (
                  <span key={i} className="text-[#C9D1D9] bg-[#0D1117] border border-[#30363D] px-1.5 py-0.5 rounded">
                    `{area}`
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default AboutScreen;
