import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "MERN Stack (MongoDB, Express, React, Node)", level: 90 },
  { name: "JavaScript / TypeScript", level: 88 },
  { name: "Backend APIs & RBAC", level: 86 },
  { name: "Databases (MongoDB / MySQL)", level: 84 },
  { name: "AI / ML (CNNs, Prediction Models)", level: 78 },
  { name: "IoT & ESP32 Integrations", level: 75 },
];

const tools = [
  "VS Code",
  "Git & GitHub",
  "Postman",
  "MongoDB Compass",
  "MySQL Workbench",
  "Google Cloud Console",
  "Figma",
  "Linux / WSL",
  "Notion",
  "Vercel",
  "npm / pnpm",
  "Swagger / API Docs",
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="container-narrow">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Skills &amp; Technologies
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill Bars */}
          <div className="space-y-8">
            <h3
              className={`font-display text-xl font-semibold text-foreground mb-8 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              Core Skills
            </h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${(index + 2) * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools Grid */}
          <div>
            <h3
              className={`font-display text-xl font-semibold text-foreground mb-8 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              Tools &amp; Technologies
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className={`p-4 bg-secondary rounded-xl text-center hover:bg-gray-200 transition-all duration-300 hover:scale-105 cursor-default ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{
                    transitionDelay: `${(index + 4) * 50}ms`,
                    transitionDuration: "500ms",
                  }}
                >
                  <span className="text-sm font-medium text-foreground">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
