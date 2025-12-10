import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Technical Head - CSI SVPCET",
    company: "Computer Society of India, SVPCET",
    period: "Aug 2025 - Present",
    description:
      "Leading the technical initiatives, mentoring juniors, and helping organize and execute tech events and activities on campus.",
  },
  {
    type: "work",
    title: "Technex Website Core Team (Backend Developer)",
    company: "Technex SVPCET",
    period: "Dec 2024 - Jan 2025",
    description:
      "Designed and implemented scalable Node.js & Express APIs, RBAC for roles, payment integration, WebSocket notifications, dashboards and deployment on Google Cloud.",
  },
  {
    type: "work",
    title: "Mentor - GirlScript Summer of Code 2024 (Extended)",
    company: "GirlScript Summer of Code",
    period: "Sep 2024 - Jan 2025",
    description:
      "Guided contributors, reviewed PRs, and helped beginners navigate open source, good coding practices and project structure.",
  },
  {
    type: "work",
    title: "Internshala Student Partner",
    company: "Internshala",
    period: "Jun 2024 - Aug 2024",
    description:
      "Campus ambassador representing Internshala at SVPCET, promoting opportunities, managing communication, and coordinating student engagement.",
  },
  {
    type: "work",
    title: "Class Representative & UBA Coordinator",
    company: "SVPCET & Unnat Bharat Abhiyan",
    period: "2023 - 2024",
    description:
      "Acted as a bridge between students and faculty, and contributed to rural development initiatives under Unnat Bharat Abhiyan.",
  },
  {
    type: "education",
    title: "B.Tech in Information Technology",
    company: "St. Vincent Pallotti College of Engineering & Technology",
    period: "2023 - 2027",
    description:
      "Pursuing Bachelor of Technology in IT with focus on software development, full-stack engineering, data structures and emerging technologies.",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="container-narrow">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Experience & Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-background border-2 border-foreground rounded-full flex items-center justify-center z-10">
                  {item.type === "work" ? (
                    <Briefcase size={20} className="text-foreground" />
                  ) : (
                    <GraduationCap size={20} className="text-foreground" />
                  )}
                </div>

                {/* Content - alternating sides on desktop */}
                <div
                  className={`ml-20 md:ml-0 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-16"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-3">
                    {item.period}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-3">
                    {item.company}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
