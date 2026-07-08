import { motion } from "framer-motion";
import { Code, Server, Cpu, Database, Blocks, Zap, BrainCircuit } from "lucide-react";

const focusAreas = [
  { name: "Full Stack Development", icon: Code },
  { name: "AI/ML Systems", icon: BrainCircuit },
  { name: "Agentic AI", icon: Cpu },
  { name: "Research & Innovation", icon: Blocks },
  { name: "Scalable Backend", icon: Server },
  { name: "Real-Time Apps", icon: Zap },
  { name: "Smart Automation", icon: Database },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-zinc-950/50">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-muted-foreground leading-relaxed text-lg"
          >
            <p>
              I am <strong className="text-foreground">Pranav Shende</strong>, a 3rd-year B.Tech IT student at SVPCET Nagpur (2023–2027) with a strong passion for building impactful software systems, AI-powered platforms, and scalable digital products.
            </p>
            <p>
              My expertise spans across full-stack development, intelligent systems, MERN stack engineering, AI/ML, and real-world problem-solving. I enjoy transforming complex ideas into practical and scalable software solutions.
            </p>
            <p>
              I actively contribute to technical communities, research work, hackathons, and student leadership initiatives.
            </p>
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6 font-display">
              Current Focus Areas
            </h3>
            <div className="flex flex-wrap gap-3">
              {focusAreas.map((area, idx) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                >
                  <area.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{area.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
