import React from 'react';
import { Github, Trophy, Award, BookOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';

export const LiveActivity = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mb-24">

      {/* Achievements */}
      <SectionHeader title="Achievements" />
      <div className="space-y-3 mb-16">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Best Research Paper Award</p>
            <p className="text-xs text-zinc-400 mt-0.5">International Conference on Tech &amp; Trends, Suryodaya College — Recognized for high-impact research and strong technical depth.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Technex 2025 Hackathon — 3rd Prize</p>
            <p className="text-xs text-zinc-400 mt-0.5">Won 3rd prize at an inter-college national-level hackathon.</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <SectionHeader title="Certifications" />
      <div className="space-y-3 mb-16">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Data Structures and Algorithms (DSA) in C++</p>
            <p className="text-xs text-zinc-400 mt-0.5">Codetantra — With Lab Practicals</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Java Programming</p>
            <p className="text-xs text-zinc-400 mt-0.5">Codetantra — With Lab Practicals</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <SectionHeader title="Education" />
      <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors mb-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-white">St. Vincent Pallotti College of Engineering & Technology</p>
            <p className="text-xs text-zinc-400 mt-1">B.Tech in Information Technology · CGPA: <span className="text-emerald-400 font-medium">8.3/10</span></p>
            <p className="text-xs text-zinc-500 mt-0.5">Nagpur, India</p>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono tracking-wider flex-shrink-0">2023 – 2027</span>
        </div>
      </div>

      {/* GitHub Activity */}
      <SectionHeader title="Live Activity" />
      <p className="text-sm text-zinc-500 mb-6">No recent public contributions.</p>
      
      <div className="w-full rounded-xl bg-zinc-900/30 border border-zinc-800/50 p-6 hover:bg-zinc-900/50 transition-colors">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-medium text-white">My GitHub Activity</h3>
            <p className="text-xs text-zinc-500 mt-1">Proof I actually code (sometimes)</p>
          </div>
          <Github className="w-6 h-6 text-zinc-400" />
        </div>
        
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[600px] flex flex-col gap-1">
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {[...Array(40)].map((_, colIndex) => {
                  const seed = (rowIndex * 40 + colIndex) * 7919;
                  const isActive = (seed % 10) > 3;
                  const intensity = seed % 3;
                  
                  let bgColor = 'bg-zinc-800/40';
                  if (isActive) {
                    if (intensity === 0) bgColor = 'bg-emerald-900/60';
                    else if (intensity === 1) bgColor = 'bg-emerald-600/70';
                    else bgColor = 'bg-emerald-400';
                  }

                  return (
                    <div 
                      key={colIndex} 
                      className={`w-3 h-3 rounded-[2px] ${bgColor}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] text-zinc-500 font-medium">187 contributions in 2026</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-500 font-medium mr-1">Less</span>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-800/40"></div>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-900/60"></div>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-600/70"></div>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-400"></div>
              <span className="text-[10px] text-zinc-500 font-medium ml-1">More</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium">2026</button>
          <button className="px-3 py-1 rounded-full text-zinc-500 hover:text-white text-xs font-medium transition-colors">2025</button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-zinc-500 italic">I code daily, share openly, and ship relentlessly — turning ideas into reality.</p>
    </div>
  );
};

export default LiveActivity;
