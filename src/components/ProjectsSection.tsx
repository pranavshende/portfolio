import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Hoppin – Campus Ride Sharing Platform",
    description:
      "A MERN-based peer-to-peer ride-sharing platform for college students, featuring real-time chat, bookings, split payments, wallet, and secure document handling.",
    tags: ["MERN Stack", "WebSockets", "Payments", "MongoDB"],
    image: "gradient-1",
    github: "#", // add link
    live: "#", // add link if deployed
  },
  {
    title: "Railway Management System",
    description:
      "End-to-end railway management including user accounts, reservations, train schedule management, payments, notifications, and reporting.",
    tags: ["Node.js", "Express", "React", "MySQL"],
    image: "gradient-2",
    github: "#",
    live: "#",
  },
  {
    title: "Lumpy Skin Disease Detection & Analytics",
    description:
      "CNN-based feature extraction with traditional ML classifiers for Lumpy Skin Disease detection and climate-driven outbreak prediction.",
    tags: ["Python", "TensorFlow", "Machine Learning", "Data Analytics"],
    image: "gradient-3",
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Driving License Trial System",
    description:
      "AI-assisted driving license trial system with live monitoring, scoring logic, and structured evaluations to modernize the license trial process.",
    tags: ["React", "Node.js", "Computer Vision", "APIs"],
    image: "gradient-4",
    github: "#",
    live: "#",
  },
];

const gradients = [
  "from-gray-300 to-gray-500",
  "from-gray-400 to-gray-600",
  "from-gray-200 to-gray-400",
  "from-gray-500 to-gray-700",
];

const ProjectsSection = () => {
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
    <section id="projects" ref={sectionRef} className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-background rounded-2xl overflow-hidden card-hover transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden">
                <div
                  className={`w-full h-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                >
                  <span className="font-display text-4xl font-bold text-background/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} className="gap-2" target="_blank" rel="noreferrer">
                      <Github size={16} />
                      Code
                    </a>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <a href={project.live} className="gap-2" target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button variant="hero-outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
