import { useEffect, useRef, useState } from "react";

interface Line {
  text: string;
  type: "command" | "output" | "blank";
}

const SCRIPT: Line[] = [
  { text: "$ whoami", type: "command" },
  { text: "> pranav-shende", type: "output" },
  { text: "", type: "blank" },
  { text: "$ cat focus.txt", type: "command" },
  { text: "> AI Builder | Full Stack Dev | Researcher", type: "output" },
  { text: "", type: "blank" },
  { text: "$ git log --oneline -3", type: "command" },
  { text: "> a3f91c2 Won Technex Hackathon 2K25 🏆", type: "output" },
  { text: "> b7e204a Published paper at OTCON 2025 📄", type: "output" },
  { text: "> c91ab13 Shipped JanSampark v2.0 🚀", type: "output" },
  { text: "", type: "blank" },
  { text: "$ echo $STATUS", type: "command" },
  { text: "> Open to Internships & Research Roles ✅", type: "output" },
];

const HeroTerminal = () => {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIdx >= SCRIPT.length) return;

    const line = SCRIPT[lineIdx];

    if (line.type === "blank") {
      setVisibleLines(prev => [...prev, line]);
      setLineIdx(i => i + 1);
      return;
    }

    if (line.type === "output") {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setLineIdx(i => i + 1);
        setCurrentCharIdx(0);
      }, 80);
      return () => clearTimeout(timer);
    }

    // Typing effect for commands
    if (currentCharIdx <= line.text.length) {
      const timer = setTimeout(() => {
        setCurrentCharIdx(i => i + 1);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setLineIdx(i => i + 1);
        setCurrentCharIdx(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [lineIdx, currentCharIdx]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [visibleLines, currentCharIdx]);

  const currentLine = lineIdx < SCRIPT.length ? SCRIPT[lineIdx] : null;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/90 backdrop-blur-xl font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-xs text-zinc-500">pranav@portfolio ~ zsh</span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="p-4 h-56 overflow-y-auto scrollbar-hide space-y-0.5"
        style={{ scrollbarWidth: "none" }}
      >
        {visibleLines.map((line, i) => (
          <div key={i} className={line.type === "command" ? "text-emerald-400" : "text-zinc-300"}>
            {line.text}
          </div>
        ))}
        {/* Currently typing line */}
        {currentLine && currentLine.type === "command" && (
          <div className="text-emerald-400">
            {currentLine.text.slice(0, currentCharIdx)}
            <span className="animate-pulse border-r-2 border-emerald-400 ml-0.5">&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroTerminal;
