import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Github, Linkedin, Mail, FileText, Code2, ChevronRight } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: string;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navItems: CommandItem[] = [
    { id: "nav-about", label: "Go to About", description: "Learn about Pranav", icon: ChevronRight, action: () => scrollTo("about"), category: "Navigation" },
    { id: "nav-skills", label: "Go to Skills", description: "View tech stack", icon: ChevronRight, action: () => scrollTo("skills"), category: "Navigation" },
    { id: "nav-projects", label: "Go to Projects", description: "Featured projects", icon: ChevronRight, action: () => scrollTo("projects"), category: "Navigation" },
    { id: "nav-github", label: "Go to GitHub Dashboard", description: "Live GitHub stats", icon: ChevronRight, action: () => scrollTo("github"), category: "Navigation" },
    { id: "nav-terminal", label: "Go to Terminal", description: "Interactive terminal", icon: ChevronRight, action: () => scrollTo("terminal"), category: "Navigation" },
    { id: "nav-research", label: "Go to Research", description: "Published papers", icon: ChevronRight, action: () => scrollTo("research"), category: "Navigation" },
    { id: "nav-experience", label: "Go to Experience", description: "Leadership timeline", icon: ChevronRight, action: () => scrollTo("experience"), category: "Navigation" },
    { id: "nav-contact", label: "Go to Contact", description: "Get in touch", icon: ChevronRight, action: () => scrollTo("contact"), category: "Navigation" },
    { id: "link-github", label: "Open GitHub", description: "github.com/pranavshende", icon: Github, action: () => { window.open("https://github.com/pranavshende", "_blank"); setOpen(false); }, category: "Links" },
    { id: "link-linkedin", label: "Open LinkedIn", description: "linkedin.com/in/prnvvv", icon: Linkedin, action: () => { window.open("https://linkedin.com/in/prnvvv", "_blank"); setOpen(false); }, category: "Links" },
    { id: "link-email", label: "Send Email", description: "pranavshende97@gmail.com", icon: Mail, action: () => { window.open("mailto:pranavshende97@gmail.com"); setOpen(false); }, category: "Links" },
    { id: "link-resume", label: "Download Resume", description: "Get Pranav's resume", icon: FileText, action: () => { window.open("/resume.pdf", "_blank"); setOpen(false); }, category: "Links" },
    { id: "link-leetcode", label: "Open LeetCode", description: "leetcode.com/pranavshende", icon: Code2, action: () => { window.open("https://leetcode.com/pranavshende", "_blank"); setOpen(false); }, category: "Links" },
  ];

  const filtered = navItems.filter(
    item =>
      !query ||
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) { filtered[selected].action(); }
  };

  const categories = [...new Set(filtered.map(i => i.category))];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-2xl rounded-2xl bg-zinc-900/95 border border-white/10 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search sections, links, actions..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
                />
                <button onClick={() => setOpen(false)}>
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No results found.</div>
                )}
                {categories.map(cat => (
                  <div key={cat}>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{cat}</div>
                    {filtered.filter(i => i.category === cat).map(item => {
                      const globalIdx = filtered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${globalIdx === selected ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                          onMouseEnter={() => setSelected(globalIdx)}
                          onClick={item.action}
                        >
                          <item.icon className={`w-4 h-4 shrink-0 ${globalIdx === selected ? "text-primary" : ""}`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.label}</div>
                            {item.description && <div className="text-xs truncate opacity-60">{item.description}</div>}
                          </div>
                          {globalIdx === selected && <span className="text-xs text-primary">↵</span>}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-3 border-t border-white/10 text-xs text-muted-foreground">
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↵</kbd> select</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">esc</kbd> close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hint */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9980] hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-xl backdrop-blur-sm"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Command Palette</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">⌘K</kbd>
      </motion.button>
    </>
  );
};

export default CommandPalette;
