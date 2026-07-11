import { useEffect, useRef, useMemo } from "react";

const CODE_TOKENS = [
  "const", "let", "async", "await", "return", "import", "export",
  "function", "class", "extends", "interface", "type", "enum",
  "if", "else", "for", "while", "try", "catch", "new", "void",
  "=>", "===", "!==", "&&", "||", "??", "?.", "...", "::",
  "{}", "[]", "()", "</>", "<div>", "<App />",
  "true", "false", "null", "undefined",
  "useState()", "useEffect()", "fetch()", ".then()", ".catch()",
  "console.log", "Array.map", "Promise.all", "Object.keys",
  "npm run dev", "git push", "docker run",
  "0x1A3F", "PORT=3000", "200 OK", "404", "500",
  "SELECT *", "WHERE id=", "ORDER BY",
  "// TODO", "/* fix */", "@decorator", "{ ...props }",
];

interface Token {
  id: number;
  text: string;
  x: number;
  startPct: number;
  size: number;
  duration: number;
  opacity: number;
  drift: number;
  color: string;
  glow: string;
}

const COLOR_PALETTE = [
  { color: "#34d399", glow: "rgba(52,211,153,0.65)"  }, // emerald green
  { color: "#fb923c", glow: "rgba(251,146,60,0.65)"  }, // orange
  { color: "#f87171", glow: "rgba(248,113,113,0.65)" }, // red
  { color: "#fbbf24", glow: "rgba(251,191,36,0.65)"  }, // yellow
  { color: "#f1f5f9", glow: "rgba(241,245,249,0.50)" }, // white
  { color: "#60a5fa", glow: "rgba(96,165,250,0.65)"  }, // blue (bonus)
];

function makeTokens(count: number): Token[] {
  return Array.from({ length: count }, (_, i) => {
    const palette = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    return {
      id: i,
      text: CODE_TOKENS[i % CODE_TOKENS.length],
      x: Math.random() * 95,
      startPct: Math.random(),
      size: Math.random() * 5 + 10,
      duration: Math.random() * 25 + 20,
      opacity: Math.random() * 0.25 + 0.40,
      drift: (Math.random() - 0.5) * 8,
      color: palette.color,
      glow: palette.glow,
    };
  });
}

// Generated once at module level — stable across re-renders
const TOKENS = makeTokens(60);

const FloatingCodeBackground = () => {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Build all keyframe CSS once
  const keyframeCSS = useMemo(() =>
    TOKENS.map((t) =>
      `@keyframes fcb${t.id}{
        0%   { transform: translateY(110vh) translateX(0)            ; opacity: 0;          }
        8%   { opacity: ${t.opacity};                                                        }
        92%  { opacity: ${t.opacity};                                                        }
        100% { transform: translateY(-10vh)  translateX(${t.drift}vw); opacity: 0;          }
      }`
    ).join("\n"),
  []);

  useEffect(() => {
    const el = document.createElement("style");
    el.id = "fcb-styles";
    el.textContent = keyframeCSS;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => el.remove();
  }, [keyframeCSS]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {TOKENS.map((t) => (
        <span
          key={t.id}
          style={{
            position: "absolute",
            left: `${t.x}vw`,
            // Offset the starting position so each token is at a different
            // point in its loop at mount time (simulates negative delay without
            // starting them all below the viewport).
            bottom: `${t.startPct * 110 - 10}vh`,
            fontSize: `${t.size}px`,
            fontFamily: "'JetBrains Mono', 'Fira Mono', 'Courier New', monospace",
            fontWeight: 500,
            whiteSpace: "nowrap",
            lineHeight: 1,
            // Readable on both dark and light backgrounds
            color: t.color,
            textShadow: `0 0 16px ${t.glow}`,
            animation: `fcb${t.id} ${t.duration}s ${-(t.startPct * t.duration)}s linear infinite`,
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
