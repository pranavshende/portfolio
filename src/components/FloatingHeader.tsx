import React from 'react';
import { VolumeX, Cloud } from 'lucide-react';

const FloatingHeader = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-2xl py-2.5 px-6 flex justify-between items-center text-zinc-300 w-auto gap-12">
      <div className="flex items-center">
        <div className="text-[10px] font-mono tracking-widest text-zinc-500">
          21:14 GMT+5:30
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 text-[11px] font-medium text-white">
          <span>Mumbai</span>
          <Cloud className="w-3.5 h-3.5 text-zinc-400" />
          <span>29°C</span>
        </div>
        
        <div className="w-[1px] h-3 bg-zinc-800"></div>
        
        <button className="text-zinc-500 hover:text-white transition-colors">
          <VolumeX className="w-3.5 h-3.5" />
        </button>
        
        <div className="w-[1px] h-3 bg-zinc-800"></div>
        
        <div className="w-10 h-5 rounded-full bg-zinc-800 flex items-center p-0.5 cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center transform translate-x-0">
            {/* Toggle dot (light mode side) */}
          </div>
          <span className="text-[8px] ml-1.5 opacity-50">☀️</span>
        </div>
      </div>
    </header>
  );
};

export default FloatingHeader;
