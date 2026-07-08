import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: string[];
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  help          — Show this help message",
    "  whoami        — About Pranav",
    "  projects      — List all projects",
    "  skills        — Show tech stack",
    "  contact       — Get contact info",
    "  achievements  — View awards & wins",
    "  research      — Published papers",
    "  clear         — Clear the terminal",
    "  sudo give-me-job  — 👀",
  ],
  whoami: () => [
    "Pranav Shende",
    "├── 3rd Year B.Tech IT @ SVPCET Nagpur (2023-2027)",
    "├── Technical Head @ CSI-SVPCET",
    "├── GirlScript SoC 2024 Mentor",
    "├── Hackathon Winner (Technex 2K25, Navonmesh)",
    "└── Research Author @ OTCON 2025",
  ],
  projects: () => [
    "Deployed Projects:",
    "  [1] PashuRakshak   — AI livestock disease detection (React Native + FastAPI + CNN)",
    "  [2] JanSampark     — Digital governance platform (MERN Stack)",
    "  [3] Solar Analysis  — Predictive analytics for solar energy (Python + ML)",
    "  [4] AgriScore       — Smart agriculture AI ecosystem (React Native + FastAPI)",
    "",
    "Run 'open <number>' to visit project.",
  ],
  skills: () => [
    "Tech Stack:",
    "  Languages   : Java, JavaScript, Python, C++, SQL",
    "  Frontend    : React, React Native, HTML, CSS, Tailwind",
    "  Backend     : Node.js, Express, FastAPI, REST APIs, WebSockets",
    "  Databases   : MongoDB, MySQL, PostgreSQL",
    "  AI / ML     : CNN, ML Models, TensorFlow Lite, Predictive Analytics",
    "  Tools       : Git, Firebase, Google Cloud, Postman, VS Code",
  ],
  contact: () => [
    "Contact Information:",
    "  Email    : pranavshende97@gmail.com",
    "  LinkedIn : linkedin.com/in/prnvvv",
    "  GitHub   : github.com/pranavshende",
    "  Location : Nagpur, Maharashtra, India",
    "",
    "Currently Open To: Internships, Research Roles, Freelance",
  ],
  achievements: () => [
    "Awards & Recognition:",
    "  🏆 Technex Hackathon 2K25 — Winner",
    "  🥈 Codetronics Hackathon  — 2nd Prize",
    "  🏆 Navonmesh Hackathon   — Winner",
    "  🎤 OTCON 2025 Conference — Research Presenter",
    "  👨‍💼 Technical Head        — CSI SVPCET",
    "  👨‍🏫 Mentor                — GirlScript SoC 2024",
  ],
  research: () => [
    "Published Research:",
    "",
    "  Title : Enhancing Lumpy Skin Disease Detection Accuracy",
    "          through CNN-Based Feature Extraction and",
    "          Multi-Classifier Systems",
    "",
    "  Venue : 2025 4th OPJU International Technology",
    "          Conference (OTCON 2025)",
    "",
    "  Tech  : CNN, Random Forest, SVM, ANN, Environmental Data",
  ],
  "sudo give-me-job": () => [
    "",
    "  ██╗  ██╗██╗██████╗ ███████╗██████╗     ██╗",
    "  ██║  ██║██║██╔══██╗██╔════╝██╔══██╗    ██║",
    "  ███████║██║██████╔╝█████╗  ██║  ██║    ██║",
    "  ██╔══██║██║██╔══██╗██╔══╝  ██║  ██║    ╚═╝",
    "  ██║  ██║██║██║  ██║███████╗██████╔╝    ██╗",
    "",
    "  [sudo] Initiating offer_letter.pdf download...",
    "  ✅  All checks passed.",
    "  📨  Offer letter sent to: pranavshende97@gmail.com",
    "  🎉  Welcome to the team, Pranav! (jk, but seriously, reach out!)",
  ],
  clear: () => [],
};

const TerminalSection = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: "", output: ["Welcome to Pranav's terminal. Type 'help' to get started.", ""] },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistIdx, setCmdHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory(prev => [trimmed, ...prev]);
    setCmdHistIdx(-1);

    if (trimmed === "clear") {
      setHistory([{ command: "", output: ["Terminal cleared. Type 'help' to get started.", ""] }]);
      return;
    }

    const outputFn = COMMANDS[trimmed];
    const output = outputFn
      ? outputFn()
      : [`Command not found: '${trimmed}'. Type 'help' for available commands.`];

    setHistory(prev => [...prev, { command: trimmed, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(cmdHistIdx + 1, cmdHistory.length - 1);
      setCmdHistIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(cmdHistIdx - 1, -1);
      setCmdHistIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
  };

  return (
    <section id="terminal" className="section-padding relative bg-zinc-950/60">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Interactive <span className="text-primary">Terminal</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">Explore my profile through a real terminal. Try typing <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">help</code></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> pranav@portfolio — zsh — 80×24
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-zinc-950/95 p-6 h-96 overflow-y-auto font-mono text-sm cursor-text">
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.command && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-zinc-500">pranav@portfolio</span>
                    <span className="text-zinc-600">~</span>
                    <span className="text-white">$</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                {entry.output.map((line, j) => (
                  <div key={j} className={`${line.startsWith("  ") ? "text-zinc-300" : line.startsWith("Available") || line.startsWith("Contact") || line.startsWith("Tech") || line.startsWith("Deployed") || line.startsWith("Awards") || line.startsWith("Published") || line.startsWith("Welcome") ? "text-emerald-400" : "text-zinc-400"} whitespace-pre-wrap`}>
                    {line || "\u00A0"}
                  </div>
                ))}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-zinc-500">pranav@portfolio</span>
              <span className="text-zinc-600">~</span>
              <span className="text-white">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-emerald-400"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
