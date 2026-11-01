import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { X, ZoomIn, Award, Sparkles, BookOpen, Layers } from 'lucide-react';

interface CreativeItem {
  id: string;
  category: 'Mobile UI' | 'Research' | 'Branding' | 'Analytics' | 'Badges';
  title: string;
  organization: string;
  description: string;
  preview: React.ReactNode;
}

const creativeItems: CreativeItem[] = [
  {
    id: 'jansampark-ui',
    category: 'Mobile UI',
    title: 'JanSampark 25+ React Native Screens & Design System',
    organization: 'NK SkillEdge',
    description:
      'Complete mobile design system and user interface modules for JanSampark civic platform. Features custom bottom sheets, incident location pins, multilingual forms, and role-based administrative dashboards.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex flex-col items-center justify-center p-4 border border-blue-200">
        <div className="w-44 bg-white border-2 border-zinc-900 rounded-2xl shadow-sm p-3 flex flex-col space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
            <span className="font-doodle text-xs font-bold text-blue-600">JanSampark Mobile</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="w-full h-16 bg-blue-50 rounded-lg border border-blue-200 flex flex-col items-center justify-center p-1 text-center">
            <span className="text-xl">📍🏛️</span>
            <span className="font-doodle text-[10px] text-zinc-600 font-bold">25+ Modules Live</span>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>JWT + RBAC</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'solar-heatmaps',
    category: 'Analytics',
    title: 'Solar Energy Geospatial Heatmaps & Regression Forecasting',
    organization: 'IT Daksh',
    description:
      'Visualized 10+ years (2014–2024) of nationwide solar metrics covering 81.8+ GW across 36+ Indian states/UTs with color-graded choropleth maps and polynomial regression trajectory charts to 2030.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl flex flex-col items-center justify-center p-4 border border-amber-200">
        <div className="w-44 bg-white border-2 border-zinc-900 rounded-2xl shadow-sm p-3 flex flex-col space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
            <span className="font-doodle text-xs font-bold text-amber-600">Solar Intelligence</span>
            <span className="text-xs">☀️</span>
          </div>
          <div className="w-full h-16 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-around p-1">
            <span className="text-2xl">🗺️</span>
            <div className="flex flex-col text-right">
              <span className="font-mono text-xs font-bold text-zinc-900">81.8+ GW</span>
              <span className="font-doodle text-[10px] text-amber-700">36+ States/UTs</span>
            </div>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>2014–2024 Data</span>
            <span>Forecast 2030</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pashurakshak-cnn',
    category: 'Research',
    title: 'PashuRakshak Edge AI Model Architecture & Dataset Visuals',
    organization: 'IEEE International Conference',
    description:
      'Architectural schematics and classification matrices for lightweight CNN models deployed via TensorFlow Lite on low-cost Android hardware for offline livestock healthcare in rural agricultural communities.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl flex flex-col items-center justify-center p-4 border border-emerald-200">
        <div className="w-44 bg-white border-2 border-zinc-900 rounded-2xl shadow-sm p-3 flex flex-col space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
            <span className="font-doodle text-xs font-bold text-emerald-600">Edge AI Research</span>
            <span className="text-xs">🔬</span>
          </div>
          <div className="w-full h-16 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 p-1">
            <span className="text-2xl">🐄</span>
            <div className="text-left font-doodle text-xs font-bold text-emerald-800">
              Offline CNN<br />Classification
            </div>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>TensorFlow Lite</span>
            <span>IEEE Published</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'technex-branding',
    category: 'Branding',
    title: 'Technex National TechFest Identity & Cloud Badges',
    organization: 'Technex SVPCET',
    description:
      'Visual identity, web dashboard UI, certificates, and event badges designed for central India’s premier technical festival, serving 3,000+ registered engineering participants.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-purple-50 to-slate-100 rounded-xl flex flex-col items-center justify-center p-4 border border-purple-200">
        <div className="w-44 bg-zinc-900 border-2 border-zinc-900 rounded-2xl shadow-sm p-3 flex flex-col space-y-2 text-white">
          <div className="flex items-center justify-between border-b border-zinc-700 pb-1">
            <span className="font-doodle text-xs font-bold text-purple-400">TECHNEX 2026</span>
            <span className="text-xs text-amber-400">★</span>
          </div>
          <div className="w-full h-16 bg-zinc-800 rounded-lg border border-zinc-700 flex flex-col items-center justify-center p-1 text-center">
            <span className="text-xl">🏆🌐</span>
            <span className="font-doodle text-[10px] text-zinc-300">3,000+ Participants</span>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-400">
            <span>GCP Backend</span>
            <span>100k+ Impressions</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'csi-workshops',
    category: 'Badges',
    title: 'CSI Coding Workshops & Hackathon Identity Assets',
    organization: 'Computer Society of India',
    description:
      'Badges, workshop slide decks, and competition graphics crafted while serving as Technical Head of CSI, mentoring hundreds of students across coding bootcamps and hackathons.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl flex flex-col items-center justify-center p-4 border border-teal-200">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-16 h-16 bg-white border-2 border-zinc-900 rounded-xl shadow-2xs flex flex-col items-center justify-center text-center p-1">
            <span className="text-lg">💻</span>
            <span className="font-doodle text-[8px] font-bold text-zinc-800">CSI Tech</span>
          </div>
          <div className="w-16 h-16 bg-white border-2 border-zinc-900 rounded-xl shadow-2xs flex flex-col items-center justify-center text-center p-1">
            <span className="text-lg">🥇</span>
            <span className="font-doodle text-[8px] font-bold text-zinc-800">Hackathon</span>
          </div>
          <div className="w-16 h-16 bg-white border-2 border-zinc-900 rounded-xl shadow-2xs flex flex-col items-center justify-center text-center p-1">
            <span className="text-lg">🤖</span>
            <span className="font-doodle text-[8px] font-bold text-zinc-800">Robotics</span>
          </div>
          <div className="w-16 h-16 bg-white border-2 border-zinc-900 rounded-xl shadow-2xs flex flex-col items-center justify-center text-center p-1">
            <span className="text-lg">📜</span>
            <span className="font-doodle text-[8px] font-bold text-zinc-800">GSSoC</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'hackathon-trophies',
    category: 'Badges',
    title: 'Hackathon Honors & Competitive Achievements',
    organization: 'National Tournaments',
    description:
      'Honors from competitive tech tournaments: Technex Hackathon 3rd Prize (2025), Codetronics 2nd Place, Cognizance IIT Roorkee finalist, and GSSoC Open Source Mentor recognition.',
    preview: (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl flex flex-col items-center justify-center p-4 border border-amber-200">
        <div className="w-44 bg-white border-2 border-zinc-900 rounded-2xl shadow-sm p-3 flex flex-col space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
            <span className="font-doodle text-xs font-bold text-amber-600">Honors & Wins</span>
            <span className="text-xs">🎖️</span>
          </div>
          <div className="w-full h-16 bg-[#fef08a] rounded-lg border border-zinc-900 flex items-center justify-around p-1">
            <span className="text-3xl">🏆</span>
            <div className="flex flex-col text-right font-doodle">
              <span className="text-xs font-bold text-zinc-900">Hackathon Winner</span>
              <span className="text-[10px] text-zinc-700">IIT Roorkee & Technex</span>
            </div>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>Codetronics 2nd</span>
            <span>GSSoC Mentor</span>
          </div>
        </div>
      </div>
    ),
  },
];

export const Art: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<CreativeItem | null>(null);

  const filters = ['All', 'Mobile UI', 'Research', 'Analytics', 'Branding', 'Badges'];

  const filteredItems =
    activeFilter === 'All'
      ? creativeItems
      : creativeItems.filter((item) => item.category === activeFilter);

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO HEADLINE
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-10">
        <h1 className="font-doodle text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 leading-snug sm:leading-snug">
          Here are some other things I've designed and built, from mobile UI systems to research posters and hackathon assets~
        </h1>
        <p className="font-doodle text-base sm:text-lg text-zinc-500 mt-2 font-medium">
          A visual showcase of real interface designs, research papers, data graphics, and event identities.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FILTER PILLS
      ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-dashed border-zinc-200 pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full font-doodle text-sm font-bold transition-all ${
              activeFilter === f
                ? 'bg-[#fef08a] text-zinc-900 border-2 border-zinc-900 shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 border border-zinc-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CREATIVE GRID
      ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -3 }}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer flex flex-col space-y-2.5"
          >
            {/* Visual Preview Box */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 border-2 border-zinc-900 shadow-xs flex items-center justify-center">
              {item.preview}

              {/* Hover Zoom pill */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 p-2 rounded-full border border-zinc-900 shadow-sm text-zinc-800">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between font-doodle text-sm text-zinc-500 font-bold pt-1">
              <span className="text-zinc-800">{item.organization}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#fef08a] text-xs font-bold text-zinc-900 border border-zinc-900">
                {item.category}
              </span>
            </div>

            {/* Bold Title */}
            <h3 className="font-doodle text-base sm:text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LIGHTBOX MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-2xl border-2 border-zinc-900 shadow-2xl p-6 space-y-4"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-zinc-900 bg-zinc-50">
                {selectedItem.preview}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between font-doodle text-sm text-zinc-500 font-bold">
                  <span>{selectedItem.organization}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#fef08a] text-xs font-bold text-zinc-900 border border-zinc-900">
                    {selectedItem.category}
                  </span>
                </div>
                <h3 className="font-doodle text-xl font-bold text-zinc-900">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed pt-1">
                  {selectedItem.description}
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
