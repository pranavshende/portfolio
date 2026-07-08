import { motion } from "framer-motion";
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
    demo: "#",
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
    demo: "#",
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
    demo: "#",
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
    demo: "#",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Project Image/Banner */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-10">
                    <span className="font-display text-2xl md:text-4xl font-bold text-white/50 tracking-wider">
                      {project.title}
                    </span>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-primary/50" />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2 font-display">{project.title}</h3>
                  <h4 className="text-primary font-medium text-lg">{project.subtitle}</h4>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary-foreground/90 font-medium">
                  {project.highlight}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div>
                  <h5 className="font-semibold text-foreground mb-3">Key Features:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                    <Github className="w-4 h-4" /> View Source
                  </Button>
                  <Button variant="outline" className="border-border hover:bg-secondary gap-2">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
