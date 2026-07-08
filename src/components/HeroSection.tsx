import { ArrowDown, Github, Linkedin, Mail, FileText, Code2, Hammer } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import HeroTerminal from "./HeroTerminal";

const floatingBadges = [
  "MERN",
  "AI/ML",
  "React Native",
  "Node.js",
  "MongoDB",
  "MySQL",
  "FastAPI",
  "WebSockets",
];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Glowing Blob Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="section-padding container-narrow relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium mb-4 tracking-wider uppercase text-sm"
          >
            Hi, I'm
          </motion.p>

          {/* Open to Work + Currently Building badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"/>
              </span>
              Open to Internships &amp; Research Roles
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium">
              <Hammer className="w-3 h-3 text-amber-400" />
              Building: AgriScore v2.0 | Exploring: Agentic AI
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
          >
            Pranav Shende
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-display font-medium mb-6 flex flex-wrap gap-x-2 gap-y-1 justify-center lg:justify-start"
          >
            <span>Full Stack Developer</span>
            <span className="text-primary hidden sm:inline">|</span>
            <span>AI Builder</span>
            <span className="text-primary hidden sm:inline">|</span>
            <span>MERN Developer</span>
            <span className="text-primary hidden md:inline">|</span>
            <span>Research Enthusiast</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="min-h-[3rem] sm:min-h-0 sm:h-8 md:h-10 mb-8 text-lg sm:text-xl md:text-2xl font-bold text-foreground"
          >
            <TypeAnimation
              sequence={[
                'Building Intelligent Systems',
                2000,
                'Developing Scalable Applications',
                2000,
                'Solving Real-World Problems',
                2000,
                'Creating AI-Powered Solutions',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Passionate software developer specializing in full-stack engineering, AI-driven systems, research innovation, and scalable digital solutions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mb-12"
          >
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-border hover:bg-secondary" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            {[
              { icon: Github, href: "https://github.com/pranavshende" },
              { icon: Linkedin, href: "https://linkedin.com/in/pranavshende" },
              { icon: Mail, href: "mailto:pranav@example.com" },
              { icon: Code2, href: "https://leetcode.com/pranavshende" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Content — Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block w-full"
        >
          <HeroTerminal />
          {/* Floating Badges below terminal */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {floatingBadges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.07 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-primary cursor-default"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
