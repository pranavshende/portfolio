import { useEffect, useRef } from "react";

const CODE_TOKENS = [
  // Keywords
  "const", "let", "async", "await", "return", "import", "export",
  "function", "class", "extends", "interface", "type", "enum",
  "if", "else", "for", "while", "try", "catch", "new", "void",
  // Symbols / operators
  "=>", "===", "!==", "&&", "||", "??", "?.","...", "::", "->",
  // Brackets / punctuation
  "{}", "[]", "()", "</>", "</>" , "<div>", "</>",
  // Common values
  "true", "false", "null", "undefined", "NaN",
  // Snippets
  "npm run", "git push", "docker run", "useState()", "useEffect()",
  "fetch()", ".then()", ".catch()", "async/await", "REST API",
  "console.log", "Object.keys", "Array.map", "Promise.all",
  // Generic code
  "0x1A3F", "#10b981", "PORT=3000", "200 OK", "404", "500",
  "SELECT *", "FROM db", "WHERE id", "ORDER BY",
  "{ ... }", "// TODO", "/* fix */", "@decorator",
];

interface Token {
  id: number;
  text: string;
  x: number;       // vw
  startY: number;  // vh (start below viewport)
  size: number;    // px
  duration: number;// s
  delay: number;   // s
  opacity: number;
  drift: number;   // horizontal drift in vw
}

function generateTokens(count: number): Token[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
    x: Math.random() * 98,
    startY: Math.random() * 120 + 100, // start well below viewport
    size: Math.random() * 6 + 9,       // 9–15 px
    duration: Math.random() * 40 + 30, // 30–70 s
    delay: -(Math.random() * 70),      // already mid-flight at mount
    opacity: Math.random() * 0.045 + 0.015, // 0.015–0.06 — very subtle
    drift: (Math.random() - 0.5) * 6,  // gentle side drift
  }));
}

const TOKENS = generateTokens(55);

const FloatingCodeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject keyframes once into <head>
  useEffect(() => {
    const id = "fcb-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = TOKENS.map((t) => `
      @keyframes fcb-float-${t.id} {
        0%   { transform: translateY(0)      translateX(0)          rotate(0deg); opacity: 0; }
        5%   { opacity: ${t.opacity}; }
        95%  { opacity: ${t.opacity}; }
        100% { transform: translateY(-${t.startY}vh) translateX(${t.drift}vw) rotate(${(Math.random()-0.5)*6}deg); opacity: 0; }
      }
    `).join("\n");
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {TOKENS.map((t) => (
        <span
          key={t.id}
          style={{
            position: "absolute",
            left: `${t.x}vw`,
            top: `${t.startY}vh`,
            fontSize: `${t.size}px`,
            fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
            color: "#10b981",
            whiteSpace: "nowrap",
            animation: `fcb-float-${t.id} ${t.duration}s ${t.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
        >
          {t.text}
        </span>
      ))}
    </div>
  );
};

export default FloatingCodeBackground;
