import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="section-padding container-narrow relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          {/* Greeting */}
          <p className="text-muted-foreground font-medium mb-4 opacity-0 animate-fade-up">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 opacity-0 animate-fade-up animation-delay-100">
            Pranav Shende
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-display font-medium mb-8 opacity-0 animate-fade-up animation-delay-200">
            Full-Stack Developer &amp;{" "}
            <span className="text-foreground">Tech Community Builder</span>
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-12 leading-relaxed opacity-0 animate-fade-up animation-delay-300">
            I&apos;m a 3rd-year B.Tech IT student at SVPCET, Nagpur and Technical
            Head at CSI-SVPCET. I love building real-world solutions with the
            MERN stack, backend systems, and AI/ML experiments — from campus
            platforms and management systems to research-driven projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 opacity-0 animate-fade-up animation-delay-400">
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
