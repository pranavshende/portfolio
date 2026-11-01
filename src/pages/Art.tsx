import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { X, ZoomIn, Sparkles, Heart } from 'lucide-react';

interface ArtItem {
  id: string;
  club: string;
  type: 'Merch' | 'Sticker' | 'Poster' | 'Sketch' | 'Pixel Art';
  title: string;
  description: string;
  component: React.ReactNode;
}

const artItems: ArtItem[] = [
  {
    id: 'sustainabytes-sweatshirt',
    club: 'Sustainabytes',
    type: 'Merch',
    title: 'Showcasing love for sustainable tech',
    description:
      'Custom forest green crewneck sweatshirt designed for the Sustainabytes community, featuring hand-drawn white line art of nature, flowers, and code characters.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-[#1a3826] rounded-xl flex items-center justify-center p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        {/* Subtle cloth texture overlay */}
        <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />
        
        {/* Crewneck Sweatshirt vector representation */}
        <div className="relative flex flex-col items-center">
          {/* Collar */}
          <div className="w-20 h-6 border-b-2 border-white/60 rounded-b-full mb-3" />
          
          {/* Brand & Doodle Illustration on chest */}
          <div className="flex flex-col items-center space-y-2 border border-dashed border-white/30 p-4 rounded-xl bg-black/10 backdrop-blur-xs">
            <span className="font-doodle text-white tracking-widest text-base font-bold">
              SUSTAINABYTES
            </span>
            <div className="flex items-center gap-2 text-white/90">
              <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-white fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round">
                {/* Cute sitting plant creature with speech bubble */}
                <circle cx="50" cy="25" r="14" fill="#ffffff" fillOpacity="0.1" />
                <path d="M 45 22 Q 50 18 55 22" />
                <circle cx="45" cy="20" r="1.5" fill="white" />
                <circle cx="55" cy="20" r="1.5" fill="white" />
                {/* Sprout atop head */}
                <path d="M 50 11 Q 48 4 42 6 Q 48 9 50 11" fill="white" />
                <path d="M 50 11 Q 52 4 58 6 Q 52 9 50 11" fill="white" />
                {/* Flowers on sides */}
                <circle cx="26" cy="32" r="5" stroke="white" />
                <path d="M 26 37 L 26 48" />
                <circle cx="74" cy="32" r="5" stroke="white" />
                <path d="M 74 37 L 74 48" />
              </svg>
            </div>
            <span className="text-[10px] text-white/70 font-mono">EST. 2024</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sustainabytes-sprout-sticker',
    club: 'Sustainabytes',
    type: 'Sticker',
    title: 'Growing as a club and as people.',
    description:
      'Die-cut vinyl sticker design of a friendly ghost-sprout character popping over lush hand-lettered green doodle typography.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-[#fbfbfa] rounded-xl flex items-center justify-center p-6 border border-zinc-200/80 group-hover:scale-105 transition-transform duration-500">
        {/* Die-cut sticker with shadow */}
        <div className="relative bg-white p-5 rounded-full border-2 border-zinc-900 shadow-md flex flex-col items-center justify-center hover:rotate-3 transition-transform">
          {/* Sprout character */}
          <div className="relative flex flex-col items-center">
            {/* Tiny sprout */}
            <div className="flex gap-1 -mb-1">
              <span className="text-emerald-500 text-xs">🌱</span>
            </div>
            {/* Cute ghost body */}
            <div className="w-14 h-12 bg-white border-2 border-zinc-900 rounded-t-full flex items-center justify-center gap-2 pt-1 shadow-xs">
              <div className="w-1.5 h-2 bg-zinc-900 rounded-full" />
              <div className="w-2.5 h-1 border-b-2 border-zinc-900 rounded-full" />
              <div className="w-1.5 h-2 bg-zinc-900 rounded-full" />
            </div>
          </div>

          {/* Graffiti bubble font SUSB */}
          <div className="font-display font-extrabold text-2xl tracking-tight text-emerald-600 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm -mt-2">
            SUSB
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-doodle pt-0.5">
            <span>🌸</span>
            <span>Grow Together</span>
            <span>🌿</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sustainabytes-earth-sticker',
    club: 'Sustainabytes',
    type: 'Sticker',
    title: 'Making a difference',
    description:
      'Circular vinyl emblem showcasing a playful character gently holding planet Earth, encircled by blooming pink blossoms and green vines.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-[#faf5ff] rounded-xl flex items-center justify-center p-6 border border-purple-100 group-hover:scale-105 transition-transform duration-500">
        {/* Circular Sticker Badge */}
        <div className="relative w-36 h-36 rounded-full bg-white border-2 border-zinc-900 shadow-md p-3 flex flex-col items-center justify-center hover:-rotate-3 transition-transform">
          {/* Earth ball */}
          <div className="relative w-16 h-16 rounded-full bg-blue-400 border border-zinc-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-300" />
            <div className="absolute top-1 left-2 w-8 h-6 bg-emerald-400 rounded-full opacity-80" />
            <div className="absolute bottom-2 right-2 w-6 h-5 bg-emerald-500 rounded-full opacity-80" />
            <span className="relative z-10 font-bold font-display text-white text-xs tracking-wider drop-shadow-md">
              SUSB
            </span>
          </div>

          {/* Surrounding doodles */}
          <div className="absolute -top-1 right-3 text-sm">🌺</div>
          <div className="absolute bottom-2 left-3 text-sm">🌿</div>
          <div className="absolute -bottom-1 right-6 text-sm">🌸</div>

          <span className="text-[10px] font-doodle text-zinc-600 font-bold mt-1">
            Care for Planet 🌍
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'birthday-cards',
    club: 'Handmade Doodles',
    type: 'Sketch',
    title: 'Birthday cards & character portraits',
    description:
      'Collection of customized handmade greeting cards, colored pencil sketches, and caricatures made for close friends celebrating milestone birthdays.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-[#fefce8] rounded-xl flex items-center justify-center p-4 border border-amber-200 group-hover:scale-105 transition-transform duration-500">
        {/* Paper card illustration */}
        <div className="relative w-44 bg-white p-3 rounded-lg border-2 border-zinc-900 shadow-sm rotate-1 flex flex-col space-y-2">
          <div className="flex items-center justify-between border-b border-dashed border-zinc-300 pb-1">
            <span className="font-doodle text-amber-600 font-bold text-xs">HAPPY BIRTHDAY!</span>
            <span className="text-xs">🎂</span>
          </div>

          {/* Hand sketched pigeon & buddy caricature */}
          <div className="w-full h-20 bg-amber-50/50 rounded border border-zinc-200 flex items-center justify-center relative overflow-hidden">
            <span className="text-3xl">🐦🎉</span>
            <div className="absolute bottom-1 right-1 font-doodle text-[9px] text-zinc-500">
              #party-time
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-600 font-hand">
            <span>Keep soaring higher!</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'technex-poster',
    club: 'Technex SVPCET',
    type: 'Poster',
    title: 'National TechFest visual identity',
    description:
      'Dynamic high-contrast posters and digital banners created for Technex, featuring futuristic cyberpunk typography, circuit motifs, and competition guides.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-zinc-900 rounded-xl flex items-center justify-center p-4 border border-zinc-800 group-hover:scale-105 transition-transform duration-500">
        {/* Mini poster preview */}
        <div className="w-40 bg-zinc-950 p-3 rounded-lg border border-cyan-500/40 shadow-lg text-white space-y-2 -rotate-1">
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
            <span>ANNUAL FEST</span>
            <span>2026</span>
          </div>
          <div className="font-display font-extrabold text-xl tracking-wider text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
            TECHNEX
          </div>
          <p className="text-[10px] text-zinc-400 font-mono leading-tight">
            INNOVATE • COMPETE • CONQUER
          </p>
          <div className="pt-1 flex items-center gap-1 text-[9px] text-amber-400 font-mono">
            <span>★</span>
            <span>3,000+ Innovators</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pixel-badges',
    club: 'Creative Lab',
    type: 'Pixel Art',
    title: 'Retro pixel badges & game icons',
    description:
      'Handmade 16-bit pixel icons and achievement badges crafted for hackathon platforms and game development jams.',
    component: (
      <div className="w-full h-full min-h-[220px] bg-[#f0fdf4] rounded-xl flex items-center justify-center p-6 border border-emerald-200 group-hover:scale-105 transition-transform duration-500">
        <div className="grid grid-cols-2 gap-3">
          <div className="w-14 h-14 bg-white border-2 border-zinc-900 rounded-xl shadow-xs flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            👾
          </div>
          <div className="w-14 h-14 bg-white border-2 border-zinc-900 rounded-xl shadow-xs flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            🏆
          </div>
          <div className="w-14 h-14 bg-white border-2 border-zinc-900 rounded-xl shadow-xs flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            🎮
          </div>
          <div className="w-14 h-14 bg-white border-2 border-zinc-900 rounded-xl shadow-xs flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            ⚡
          </div>
        </div>
      </div>
    ),
  },
];

export const Art: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedArt, setSelectedArt] = useState<ArtItem | null>(null);

  const filters = ['All', 'Merch', 'Sticker', 'Poster', 'Sketch', 'Pixel Art'];

  const filteredItems =
    activeFilter === 'All'
      ? artItems
      : artItems.filter((item) => item.type === activeFilter);

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO HEADLINE (Direct match to Screenshot 2)
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-zinc-900 leading-snug sm:leading-tight">
          Here are some other things I've made and designed, from birthday cards to club posters, stickers~
        </h1>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FILTER PILLS
      ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-200/80 pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === f
                ? 'bg-[#fef08a] text-zinc-900 border border-zinc-900/10 shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ARTWORK GRID (Direct match to Screenshot 2)
      ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -3 }}
            onClick={() => setSelectedArt(item)}
            className="group cursor-pointer flex flex-col space-y-2.5"
          >
            {/* Visual Preview Box */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-xs flex items-center justify-center">
              {item.component}

              {/* Hover Zoom pill */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs p-2 rounded-full shadow-sm text-zinc-700">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Metadata matching Screenshot 2 */}
            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-1">
              <span className="font-semibold text-zinc-800">{item.club}</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-600 border border-zinc-200/60">
                {item.type}
              </span>
            </div>

            {/* Bold Title */}
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LIGHTBOX MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 space-y-4"
            >
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200">
                {selectedArt.component}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold">
                  <span>{selectedArt.club}</span>
                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-600">
                    {selectedArt.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 font-display">
                  {selectedArt.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-1">
                  {selectedArt.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DoodleLayout>
  );
};

export default Art;
