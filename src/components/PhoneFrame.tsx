import { useState, useEffect } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bar">
      {/* Notch */}
      <div className="phone-notch" />

      {/* Time */}
      <span className="mono text-xs font-semibold text-white/90 z-30">{time}</span>

      {/* Icons */}
      <div className="flex items-center gap-1.5 z-30">
        <Signal size={12} className="text-white/80" />
        <Wifi size={12} className="text-white/80" />
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-sm border border-white/60 relative flex items-center px-0.5">
            <div className="h-1.5 bg-emerald-400 rounded-sm" style={{ width: "80%" }} />
          </div>
          <div className="w-0.5 h-1 bg-white/40 rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="desktop-wrapper">
      {/* Ambient glow blobs on desktop */}
      <div className="hidden md:block fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="phone-outer relative">
        {/* Side buttons decoration */}
        <div className="hidden md:block absolute -left-2 top-32 w-1 h-12 bg-white/10 rounded-l-lg" />
        <div className="hidden md:block absolute -left-2 top-48 w-1 h-8 bg-white/10 rounded-l-lg" />
        <div className="hidden md:block absolute -left-2 top-60 w-1 h-8 bg-white/10 rounded-l-lg" />
        <div className="hidden md:block absolute -right-2 top-40 w-1 h-16 bg-white/10 rounded-r-lg" />

        <div className="phone-screen">
          <StatusBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
