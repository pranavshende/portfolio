import { useEffect, useState } from "react";

const DynamicBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic gradient orbs that follow mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--gray-300)) 0%, transparent 70%)",
          left: `${mousePosition.x - 20}%`,
          top: `${mousePosition.y - 20}%`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-all duration-1500 ease-out"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--gray-400)) 0%, transparent 70%)",
          left: `${100 - mousePosition.x}%`,
          top: `${100 - mousePosition.y}%`,
        }}
      />

      {/* Subtle animated grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DynamicBackground;
