import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hooks/use-toast";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/pranavshende" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/pranavshende" },
  { icon: Mail, label: "Email", href: "mailto:pranav@example.com" },
];

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-zinc-950">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Let's Build Something <br/>
              <span className="text-primary">Meaningful Together.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
              Whether you're a recruiter looking for a passionate engineer, a founder with a vision, or a fellow builder, I'd love to connect.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  aria-label={link.label}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      className="bg-black/40 border-white/10 focus-visible:ring-primary h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="bg-black/40 border-white/10 focus-visible:ring-primary h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    id="subject"
                    placeholder="Project inquiry, job opportunity..."
                    className="bg-black/40 border-white/10 focus-visible:ring-primary h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your idea or role..."
                    className="bg-black/40 border-white/10 focus-visible:ring-primary min-h-[160px] resize-none rounded-xl"
                    required
                  />
                </div>

                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl font-medium text-base group">
                  Send Message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
