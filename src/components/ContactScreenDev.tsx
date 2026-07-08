import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Copy, Check, Terminal, Send } from "lucide-react";
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
        background: copied ? "rgba(63,185,80,0.1)" : "#0D1117",
        border: copied ? "1px solid rgba(63,185,80,0.3)" : "1px solid #30363D",
      }}
    >
      {copied ? (
        <Check size={11} className="text-[#3FB950]" />
      ) : (
        <Copy size={11} className="text-[#8B949E] hover:text-[#C9D1D9]" />
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-4">
            Contact
          </h2>
        </motion.div>

        <div className="space-y-2.5">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3 p-3 rounded bg-[#161B22] border border-[#30363D]"
            >
              <div className="w-8 h-8 rounded bg-[#0D1117] border border-[#30363D] flex items-center justify-center flex-shrink-0">
                <item.icon size={14} className="text-[#58A6FF]" />
              </div>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 hover:underline decoration-[#8B949E] underline-offset-4">
                <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-widest">{item.label}</p>
                <p className="text-xs font-mono text-[#C9D1D9] truncate mt-0.5">{item.value}</p>
              </a>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.copyable && <CopyButton value={item.value} />}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card flex flex-col font-mono text-[11px] overflow-hidden p-0"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117]">
            <Terminal size={12} className="text-[#58A6FF]" />
            <span className="text-[#C9D1D9]">send_message.sh</span>
          </div>

          <form onSubmit={handleSend} className="p-4 bg-[#161B22] space-y-3">
            <div>
              <div className="text-[#8B949E] mb-1">{'// Enter your name'}</div>
              <div className="flex items-center">
                <span className="text-[#3FB950] mr-2">➜</span>
                <span className="text-[#58A6FF]">~</span>
                <span className="text-[#C9D1D9] ml-2">$ name="</span>
                <input
                  type="text"
                  placeholder=""
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 bg-transparent text-[#C9D1D9] outline-none border-none p-0"
                />
                <span className="text-[#C9D1D9]">"</span>
              </div>
            </div>

            <div>
              <div className="text-[#8B949E] mb-1">{'// Enter message'}</div>
              <div className="flex items-start">
                <span className="text-[#3FB950] mr-2 mt-0.5">➜</span>
                <span className="text-[#58A6FF] mt-0.5">~</span>
                <span className="text-[#C9D1D9] ml-2 mt-0.5">$ msg="</span>
                <textarea
                  placeholder=""
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="flex-1 bg-transparent text-[#C9D1D9] outline-none border-none p-0 resize-none mt-0.5"
                />
                <span className="text-[#C9D1D9]">"</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={sending || !formData.name || !formData.message}
                className="flex items-center gap-2 text-[#58A6FF] hover:text-[#79C0FF] disabled:opacity-50 disabled:hover:text-[#58A6FF] transition-colors"
              >
                {sending ? (
                  <span className="animate-pulse">Executing script...</span>
                ) : (
                  <>
                    <span className="text-[#3FB950]">➜</span>
                    <span className="text-[#58A6FF]">~</span>
                    <span className="text-[#C9D1D9] ml-2">$ ./send_message.sh --execute</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-4 font-mono"
        >
          <p className="text-[10px] text-[#8B949E]">{'// Built with ❤️ by Pranav Shende'}</p>
          <p className="text-[10px] text-[#8B949E] mt-0.5">{'// React · TypeScript · Tailwind'}</p>
        </motion.div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ContactScreen;
