import { motion } from "framer-motion";
import { Briefcase, Award, Users, Code, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Technical Head",
    organization: "CSI SVPCET",
    description: "Leading technical initiatives, events, and student innovation activities.",
    icon: Code,
  },
  {
    title: "Mentor",
    organization: "GirlScript Summer of Code 2024",
    description: "Mentored students and guided contributors in development.",
    icon: Users,
  },
  {
    title: "Student Coordinator",
    organization: "Industry Academia Conclave 2.0",
    description: "Managed technical and coordination responsibilities.",
    icon: Briefcase,
  },
  {
    title: "Backend Core Team",
    organization: "Technex Website",
    description: "Worked on backend engineering and system functionality.",
    icon: Code,
  },
  {
    title: "Student Partner",
    organization: "Internshala",
    description: "Student outreach and professional engagement.",
    icon: Award,
  },
  {
    title: "Class Representative",
    organization: "SVPCET",
    description: "Represented student concerns and coordination.",
    icon: Users,
  },
  {
    title: "UBA Coordinator",
    organization: "Unnat Bharat Abhiyan",
    description: "Worked on community and technology-driven initiatives.",
    icon: GraduationCap,
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Experience & <span className="text-primary">Leadership</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal group ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center z-10 group-hover:bg-primary transition-colors duration-300">
                  <exp.icon className="w-4 h-4 text-primary group-hover:text-background transition-colors duration-300" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 w-full md:w-[calc(50%-2.5rem)]">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors duration-300 relative">
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white/5 border-t border-r border-white/10 transform rotate-45 ${
                        index % 2 === 0
                          ? "-left-2 border-l-0 border-b-0"
                          : "-right-2 border-t-0 border-r-0 border-b border-l"
                      }`}
                    />
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <h4 className="text-primary font-medium mb-3">{exp.organization}</h4>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
