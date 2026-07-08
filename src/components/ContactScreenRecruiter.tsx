import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Copy, Check, ExternalLink, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  copyable: boolean;
  color: string;
  glow: string;
  bg: string;
  border: string;
}

const contactItems: ContactItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "pranavshende97@gmail.com",
    href: "mailto:pranavshende97@gmail.com",
    copyable: true,
    color: "#171717",
    glow: "rgba(0,0,0,0.05)",
    bg: "rgba(0,0,0,0.02)",
    border: "rgba(0,0,0,0.05)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-8421358609",
    href: "tel:+918421358609",
    copyable: true,
    color: "#404040",
    glow: "rgba(0,0,0,0.05)",
    bg: "rgba(0,0,0,0.02)",
    border: "rgba(0,0,0,0.05)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/PranavShende",
    href: "https://github.com/PranavShende",
    copyable: false,
    color: "#171717",
    glow: "rgba(0,0,0,0.05)",
    bg: "rgba(0,0,0,0.02)",
    border: "rgba(0,0,0,0.05)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/pranavshende",
    href: "https://linkedin.com/in/pranavshende",
    copyable: false,
    color: "#404040",
    glow: "rgba(0,0,0,0.05)",
    bg: "rgba(0,0,0,0.02)",
    border: "rgba(0,0,0,0.05)",
  },
];

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
      style={{
        background: copied ? "rgba(16,185,129,0.1)" : "rgba(0,0,0,0.03)",
        border: copied ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {copied ? (
        <Check size={11} className="text-emerald-600" />
      ) : (
        <Copy size={11} className="text-zinc-500" />
      )}
    </button>
  );
};

const ContactScreen = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", message: "" });
      toast({
        title: "Message sent! 🚀",
        description: "I'll get back to you soon.",
      });
    }, 1000);
  };

  return (
    <div className="app-screen">
      <div className="screen-content space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="screen-header">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xs text-zinc-500 -mt-4 mb-1">Tap to copy · Tap icon to open</p>
        </motion.div>

        {/* Contact cards */}
        <div className="space-y-2.5">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] block"
              style={{ background: item.bg, border: `1px solid ${item.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${item.bg.replace("0.08", "0.15")}`,
                  boxShadow: `0 4px 16px ${item.glow}`,
                }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-xs font-semibold text-zinc-900 truncate mt-0.5">{item.value}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.copyable && <CopyButton value={item.value} />}
                <ExternalLink size={12} className="text-zinc-400" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Quick message form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 space-y-3"
        >
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Quick Message</h3>

          <form onSubmit={handleSend} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 outline-none transition-all"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(0,0,0,0.2)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.06)"}
            />
            <textarea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 outline-none resize-none transition-all"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(0,0,0,0.2)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.06)"}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              disabled={sending || !formData.name || !formData.message}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #27272a 0%, #000000 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              {sending ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <Send size={12} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Fun footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-2"
        >
          <p className="text-[10px] text-zinc-400">Built with ❤️ by Pranav Shende</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">React · TypeScript · Framer Motion</p>
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ContactScreen;
