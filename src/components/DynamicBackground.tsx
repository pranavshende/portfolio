import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const DynamicBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#10b981" },
            links: {
              color: "#10b981",
              distance: 150,
              enable: true,
              opacity: 0.08,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              random: true,
              outModes: { default: "bounce" },
            },
            number: { value: 60, density: { enable: true } },
            opacity: { value: { min: 0.05, max: 0.2 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export default DynamicBackground;
