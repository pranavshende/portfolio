import { useState, useEffect } from "react";
import { Wifi, Signal } from "lucide-react";

export const StatusBar = () => {
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
    /* Only visible on mobile (CSS hides on md+) */
    <div className="status-bar flex-shrink-0">
      {/* Dynamic island notch */}
      <div className="phone-notch" />

      {/* Time */}
      <span className="mono text-xs font-semibold text-zinc-900 z-30">{time}</span>

      {/* Icons */}
      <div className="flex items-center gap-1.5 z-30">
        <Signal size={12} className="text-zinc-800" />
        <Wifi size={12} className="text-zinc-800" />
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-sm border border-zinc-500 relative flex items-center px-0.5">
            <div className="h-1.5 bg-zinc-800 rounded-sm" style={{ width: "80%" }} />
          </div>
          <div className="w-0.5 h-1 bg-zinc-400 rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
