import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "PashuRakshak",
    subtitle: "AI-Powered Livestock Disease Detection System",
    description: "A smart livestock healthcare platform that uses CNN-based feature extraction and machine learning models to detect animal diseases with improved accuracy.",
    highlight: "Research-backed AI healthcare platform for livestock disease detection.",
    features: [
      "CNN feature extraction",
      "Disease prediction",
      "Environmental data integration",
      "Multi-classifier architecture",
      "Offline-first support",
      "Edge AI optimization",
      "Geolocation-based veterinary services"
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "FastAPI", "TensorFlow Lite", "CNN", "ML Models"],
    github: "#",
    demo: "/playgames?folder=projects_folder",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "JanSampark",
    subtitle: "Digital Governance & Citizen Service Platform",
    description: "A full-stack governance platform designed to bridge the gap between citizens and administration through transparency, complaint management, visitor tracking, and civic engagement.",
    highlight: "Built for transparent and efficient digital governance.",
    features: [
      "Citizen grievance system",
      "Public works monitoring",
      "Visitor management",
      "Status tracking",
      "Admin dashboard",
      "Mobile-first interface"
    ],
    tech: ["MERN Stack", "APIs", "Authentication", "Database Systems"],
    github: "#",
    demo: "/playgames?folder=projects_folder",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "Solar Sales Analysis",
    subtitle: "Smart Predictive Analytics & Decision Support Platform",
    description: "A predictive analytics platform developed to analyze region-wise solar installation trends and forecast future solar capacity growth in India using structured datasets and machine learning.",
    highlight: "Research-driven predictive analytics platform for India's renewable energy ecosystem.",
    features: [
      "Solar trend forecasting",
      "Predictive analytics",
      "Regional insights",
      "Interactive dashboard",
      "Data visualization",
      "Capacity prediction"
    ],
    tech: ["Python", "Machine Learning", "Analytics", "Data Visualization"],
    github: "#",
    demo: "/playgames?folder=projects_folder",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "AgriScore",
    subtitle: "Unified Farm Intelligence & Smart Agriculture Platform",
    description: "An AI-powered agriculture ecosystem integrating crop intelligence, risk prediction, smart recommendations, and farmer support systems for modern farming.",
    highlight: "Building intelligent agriculture ecosystems using AI and analytics.",
    features: [
      "AI risk assessment",
      "Crop recommendation",
      "Disease prediction",
      "Farmer dashboard",
      "Loan intelligence",
      "Smart agriculture analytics"
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "FastAPI", "AI/ML"],
    github: "#",
    demo: "/playgames?folder=projects_folder",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 z-50 text-center w-full px-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            <motion.div 
              className="mt-6 text-muted-foreground text-sm flex flex-col items-center justify-center gap-2"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
            >
              <span>Scroll down to unveil</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-5 h-5 rounded-full border border-muted-foreground/50 flex items-center justify-center"
              >
                <span className="text-[10px]">↓</span>
              </motion.div>
            </motion.div>
        </div>

        <div className="relative w-full h-[75vh] md:h-[65vh] max-w-[100vw] flex items-center justify-center mt-20 md:mt-12">
          {projects.map((project, idx) => {
            
            // At 0: Cards are stacked slightly offset
            // At 0.2: Cards have un-slided from left to right (spread out horizontally)
            // At 1.0: The entire track has scrolled fully to the left
            const x = useTransform(
              scrollYProgress,
              [0, 0.2, 1],
              [
                `${idx * 15}px`, 
                `${idx * 105}%`, 
                `${idx * 105 - 105 * (projects.length - 1)}%` 
              ]
            );

            const zIndex = projects.length - idx;

            const rotate = useTransform(
              scrollYProgress,
              [0, 0.1],
              [idx * -2, 0] // subtle fan out when stacked
            );

            const scale = useTransform(
              scrollYProgress,
              [0, 0.1],
              [1 - idx * 0.05, 1]
            );

            const opacity = useTransform(
              scrollYProgress,
              [0, 0.1],
              [1 - idx * 0.1, 1]
            );

            return (
              <motion.div
                key={project.title}
                style={{ x, zIndex, rotate, scale, opacity }}
                className="absolute left-0 right-0 mx-auto w-[90vw] md:w-[70vw] lg:w-[60vw] max-w-5xl h-[70vh] md:h-[60vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/95 backdrop-blur-xl flex flex-col md:flex-row"
              >
                {/* Image Half */}
                <div className="w-full h-48 md:h-full md:w-2/5 relative shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
                  <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-10">
                    <span className="font-display text-3xl md:text-4xl font-bold text-white/70 tracking-wider drop-shadow-lg">
                      {project.title}
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center space-y-4 md:space-y-6 overflow-y-auto no-scrollbar relative z-20">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 font-display">{project.title}</h3>
                    <h4 className="text-primary font-medium text-sm md:text-lg">{project.subtitle}</h4>
                  </div>

                  <div className="p-3 md:p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary-foreground/90 font-medium text-xs md:text-sm">
                    {project.highlight}
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="hidden sm:block">
                    <h5 className="font-semibold text-foreground mb-3 text-sm">Key Features:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map(feature => (
                        <li key={feature} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-white/5 border border-white/10 text-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="default" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                        <Github className="w-4 h-4" /> Code
                      </Button>
                    </a>
                    <Link to={project.demo}>
                      <Button size="sm" variant="outline" className="border-border hover:bg-secondary gap-2 border-white/20">
                        <ExternalLink className="w-4 h-4" /> Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
