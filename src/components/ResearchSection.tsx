import { motion } from "framer-motion";
import { BookOpen, Trophy, Medal, Star, Presentation, Code2, Users } from "lucide-react";

const achievements = [
  { text: "Technex Hackathon 2K25 Winner", icon: Trophy, color: "text-yellow-500" },
  { text: "Codetronics Hackathon — 2nd Prize", icon: Medal, color: "text-zinc-400" },
  { text: "Navonmesh Hackathon Participant", icon: Star, color: "text-amber-600" },
  { text: "Research Conference Presenter", icon: Presentation, color: "text-blue-500" },
  { text: "Multiple Full-Stack Systems Built", icon: Code2, color: "text-primary" },
  { text: "Leadership Roles in Technical Communities", icon: Users, color: "text-emerald-500" },
];

const ResearchSection = () => {
  return (
    <section id="research" className="section-padding relative bg-zinc-950/80">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Research & <span className="text-primary">Achievements</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Research Paper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen className="w-32 h-32 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <BookOpen className="w-4 h-4" /> Published Research
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-snug">
                  Enhancing Lumpy Skin Disease Detection Accuracy through CNN-Based Feature Extraction and Multi-Classifier Systems
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  Presented at: <strong className="text-foreground">2025 4th OPJU International Technology Conference (OTCON)</strong>
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Highlights:</h4>
                  <ul className="space-y-2">
                    {["CNN-based feature extraction", "Environmental data integration", "Random Forest, SVM & ANN", "Improved disease prediction accuracy"].map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className={`p-4 rounded-full bg-black/40 ${achievement.color}`}>
                  <achievement.icon className="w-8 h-8" />
                </div>
                <span className="font-medium text-foreground">{achievement.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
