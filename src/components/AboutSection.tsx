import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
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
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary"
    >
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="aspect-[4/5] relative">
              {/* Main Image Container */}
              <div className="absolute inset-4 bg-gray-300 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                  <span className="font-display text-6xl md:text-8xl font-bold text-gray-500/50">
                    PS
                  </span>
                </div>
              </div>
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-foreground rounded-2xl" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-8">
              Crafting Practical
              <br />
              <span className="text-gray-500">Tech Solutions</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="font-semibold">Pranav Shende</span>, a
                3rd-year Information Technology undergraduate at{" "}
                <span className="font-semibold">
                  St. Vincent Pallotti College of Engineering & Technology,
                  Nagpur
                </span>{" "}
                and currently the{" "}
                <span className="font-semibold">Technical Head at CSI-SVPCET</span>.
                I love turning real-world problems into working products that
                people actually use.
              </p>
              <p>
                My work revolves around{" "}
                <span className="font-semibold">
                  MERN stack, backend systems, API design, authentication, RBAC,
                  payment integrations, WebSockets, and cloud deployment
                </span>
                . I&apos;ve worked on platforms like{" "}
                <span className="font-semibold">Hoppin (ride-sharing for students)</span>,{" "}
                a <span className="font-semibold">Railway Management System</span>,{" "}
                an <span className="font-semibold">
                  AI-powered driving license trial system
                </span>{" "}
                and ML-based{" "}
                <span className="font-semibold">
                  Lumpy Skin Disease detection & prediction
                </span>{" "}
                using climate data.
              </p>
              <p>
                Beyond code, I’m actively involved in communities and events as a{" "}
                <span className="font-semibold">
                  GirlScript Summer of Code Mentor, Technex website backend core
                  team member, and Student Coordinator for Industry Academia
                  Conclave 2.0
                </span>
                . I enjoy collaborating, mentoring, and building things that
                actually ship and deliver value.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-border text-center md:text-left">
              {[
                { number: "3+", label: "Years Coding" },
                { number: "20+", label: "Projects & Mini-Projects" },
                { number: "3+", label: "Hackathons (Wins & Finals)" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="font-display text-2xl md:text-4xl font-bold text-foreground">
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
