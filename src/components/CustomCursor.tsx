import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<Trail[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    let ringX = -100, ringY = -100;
    let animFrame: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, pos.x, 0.12);
      ringY = lerp(ringY, pos.y, 0.12);
      setRing({ x: ringX, y: ringY });
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Trail
      const id = ++trailId.current;
      setTrail(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);

      // Label detection
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const tag = el?.tagName?.toLowerCase();
      const section = el?.closest("section")?.id;

      if (tag === "a" || tag === "button" || (el as HTMLElement)?.closest("button") || (el as HTMLElement)?.closest("a")) {
        setIsPointer(true);
        setCursorLabel("click");
      } else if (section === "projects") {
        setIsPointer(false);
        setCursorLabel("</>");
      } else if (section === "research" || section === "skills") {
        setIsPointer(false);
        setCursorLabel("🧠");
      } else {
        setIsPointer(false);
        setCursorLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animFrame);
    };
  }, [pos.x, pos.y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block">
      {/* Trail particles */}
      {trail.map((t, i) => (
        <span
          key={t.id}
          className="absolute rounded-full bg-emerald-400"
          style={{
            left: t.x,
            top: t.y,
            width: `${(i / trail.length) * 6 + 1}px`,
            height: `${(i / trail.length) * 6 + 1}px`,
            opacity: (i / trail.length) * 0.4,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s",
          }}
        />
      ))}

      {/* Ring (lagging) */}
      <motion.div
        className={`absolute rounded-full border-2 transition-all duration-150 ${isPointer ? "border-white scale-150" : "border-emerald-400"}`}
        style={{
          left: ring.x,
          top: ring.y,
          width: 36,
          height: 36,
          transform: "translate(-50%, -50%)",
          opacity: 0.6,
        }}
      />

      {/* Dot (precise) */}
      <div
        className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,1)]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Label */}
      <AnimatePresence>
        {cursorLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 bg-black/70 px-2 py-1 rounded-lg pointer-events-none"
            style={{ left: pos.x + 24, top: pos.y - 24 }}
          >
            {cursorLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
