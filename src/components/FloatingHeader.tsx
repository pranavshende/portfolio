import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cloud, CloudRain, Zap, CloudSnow, Wind } from 'lucide-react';
import { useMode } from '../contexts/ModeContext';

// Nagpur coordinates
const NAGPUR_LAT = 21.1458;
const NAGPUR_LON = 79.0882;

// WMO Weather code to description + icon
function getWeatherInfo(code: number): { label: string; icon: React.ReactNode } {
  if (code === 0) return { label: 'Clear', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> };
  if (code <= 2) return { label: 'Partly cloudy', icon: <Cloud className="w-3.5 h-3.5 text-zinc-400" /> };
  if (code <= 3) return { label: 'Overcast', icon: <Cloud className="w-3.5 h-3.5 text-zinc-500" /> };
  if (code <= 48) return { label: 'Foggy', icon: <Wind className="w-3.5 h-3.5 text-zinc-400" /> };
  if (code <= 67) return { label: 'Rain', icon: <CloudRain className="w-3.5 h-3.5 text-blue-400" /> };
  if (code <= 77) return { label: 'Snow', icon: <CloudSnow className="w-3.5 h-3.5 text-blue-200" /> };
  if (code <= 82) return { label: 'Showers', icon: <CloudRain className="w-3.5 h-3.5 text-blue-400" /> };
  if (code <= 99) return { label: 'Thunderstorm', icon: <Zap className="w-3.5 h-3.5 text-yellow-400" /> };
  return { label: 'Cloudy', icon: <Cloud className="w-3.5 h-3.5 text-zinc-400" /> };
}

function useTime() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    };
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function useWeather() {
  const [temp, setTemp] = useState<number | null>(null);
  const [code, setCode] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${NAGPUR_LAT}&longitude=${NAGPUR_LON}&current=temperature_2m,weathercode&temperature_unit=celsius&timezone=Asia%2FKolkata`;
    
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setTemp(Math.round(data.current.temperature_2m));
        setCode(data.current.weathercode);
        setLoading(false);
      })
      .catch(() => {
        setTemp(null);
        setLoading(false);
      });
  }, []);

  return { temp, code, loading };
}

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/pranavshende/portfolio/up')
      .then(r => r.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  return count;
}

const FloatingHeader = () => {
  const time = useTime();
  const { temp, code, loading } = useWeather();
  const views = useVisitorCount();
  const { mode, toggleMode } = useMode();
  const isDark = mode === 'developer';
  const weather = getWeatherInfo(code);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/80 shadow-2xl py-2.5 px-5 flex items-center gap-6 text-zinc-300 w-auto">
      {/* Live clock & Views */}
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-500">
        <div>{time}</div>
        <div className="w-[1px] h-2.5 bg-zinc-800" />
        <div className="flex items-center gap-1.5">
          <span>VIEWS</span>
          <span className="text-zinc-300">{views !== null ? views : '...'}</span>
        </div>
      </div>

      <div className="w-[1px] h-3 bg-zinc-800" />

      {/* Weather — Nagpur */}
      <div className="flex items-center gap-2 text-[11px] font-medium text-white">
        <span className="text-zinc-400">Nagpur</span>
        {loading ? (
          <span className="text-zinc-500 text-[10px]">...</span>
        ) : (
          <>
            {weather.icon}
            <span>{temp !== null ? `${temp}°C` : '--'}</span>
          </>
        )}
      </div>

      <div className="w-[1px] h-3 bg-zinc-800" />

      {/* Dark / Light mode toggle */}
      <button
        onClick={toggleMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`
          relative w-11 h-6 rounded-full flex items-center transition-colors duration-300 px-0.5
          ${isDark ? 'bg-zinc-700 justify-start' : 'bg-amber-400 justify-end'}
        `}
      >
        {/* Sliding dot */}
        <span
          className={`
            w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-300
            ${isDark ? 'bg-zinc-300 translate-x-0' : 'bg-white translate-x-0'}
          `}
        >
          {isDark
            ? <Moon className="w-3 h-3 text-zinc-700" />
            : <Sun className="w-3 h-3 text-amber-500" />
          }
        </span>
      </button>
    </header>
  );
};

export default FloatingHeader;
