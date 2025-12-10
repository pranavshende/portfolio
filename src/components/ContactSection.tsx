import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hooks/use-toast";


const contactInfo = [
  { icon: Mail, label: "Email", value: "pranavshende97@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8421358609" },
  { icon: MapPin, label: "Location", value: "Nagpur, Maharashtra, India" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" }, // add your real GitHub link
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/prnvvv" },
  { icon: Twitter, label: "Twitter", href: "#" }, // add if you use X/Twitter
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Let&apos;s Build Something
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether it&apos;s a project idea, collaboration, hackathon, or just
              a tech chat, feel free to reach out. I’m always open to working on
              meaningful and challenging problems.
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center">
                    <item.icon size={20} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                    aria-label={link.label}
                    target={link.href === "#" ? "_self" : "_blank"}
                    rel={link.href === "#" ? undefined : "noreferrer"}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="bg-background border-border h-12"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="bg-background border-border h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Project inquiry, collaboration..."
                  className="bg-background border-border h-12"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your idea or project..."
                  className="bg-background border-border min-h-[160px] resize-none"
                  required
                />
              </div>

              <Button variant="hero" size="lg" className="w-full gap-2">
                <Send size={18} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
