import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { PropellerHat } from '@/components/PropellerHat';
import profilePhoto from '../photo/IMG_20240323_152847.jpg';
import { 
  FileText, ExternalLink, Code2, Database, Cloud, 
  Sparkles, GraduationCap, MapPin, Trophy, Award, Heart
} from 'lucide-react';

interface TimelineItem {
  age: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

const timelineData: TimelineItem[] = [
  {
    age: 'Age 10',
    title: 'Doing Arts, Crafts & Taking Things Apart',
    description:
      'My imagination stemmed from my childhood. Drawing characters from favorite animated shows, folding origami ninja weapons, taking apart old radios and computer mice to see how the circuits clicked, and acting out stories on my bed with my figurines.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
        <path d="M15 13 9 7l4-4 6 6-4 4Z" />
        <path d="M18 10l-1.5-1.5" />
      </svg>
    ),
  },
  {
    age: 'Age 14',
    title: 'Designing + Coding First Programs & LEGO',
    description:
      'This is where my curiosity for technology truly exploded. I joined middle school robotics competitions, built my first robots, designed custom gear assemblies for missions, and learned visual logic & C programming to bring static hardware to life.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="8" rx="2" />
        <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    age: 'Age 17',
    title: 'Designing Systems & Engineering College',
    description:
      'Stepping into B.Tech Information Technology at St. Vincent Pallotti College of Engineering & Technology (SVPCET). Explored systems design, database normalization, algorithms, and led volunteer tech communities for national symposiums.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 10a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    age: 'Currently Age 20',
    title: 'Engineering Production Products & AI Research',
    description:
      'Now engineering full-stack platforms with 25+ React Native modules, architecting secure Node.js & PostgreSQL APIs, publishing machine learning research with IEEE, and striving to build products that combine engineering rigor with playful human clarity.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="M22 22H2" />
        <path d="m8 22 4-10 4 10" />
      </svg>
    ),
    tag: 'Present',
  },
];

export const About: React.FC = () => {
  const [hatSpinning, setHatSpinning] = useState(false);

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO PROFILE & HEADLINE (Direct match to Screenshot 1)
      ────────────────────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* Avatar with Propeller Hat Doodle */}
        <div 
          className="relative shrink-0 cursor-pointer group"
          onMouseEnter={() => setHatSpinning(true)}
          onMouseLeave={() => setHatSpinning(false)}
          onClick={() => setHatSpinning(!hatSpinning)}
          title="Hover or click to spin the propeller!"
        >
          {/* Propeller Hat perched neatly on top */}
          <div className="absolute -top-7 left-1/2 -translate-x-[50%] z-20">
            <PropellerHat spinning={hatSpinning} />
          </div>

          {/* Circular Photo */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-zinc-900 shadow-sm bg-zinc-100">
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover object-[48%_18%] scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Headline matching Screenshot 1 */}
        <div className="flex-1 text-center sm:text-left pt-2">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-zinc-900 leading-snug sm:leading-tight">
            Hi again! I'm still the kid who can't stop building things, just with different tools now.
          </h1>
          <p className="text-sm text-zinc-500 mt-2 font-medium">
            Based in Nagpur, India • B.Tech in Information Technology • Full Stack & Edge AI
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MY STORY SECTION (Direct match to Screenshot 1)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-8 mb-16">
        <div className="flex items-center gap-2.5 border-b border-zinc-200/80 pb-3">
          <span className="text-xl">📝</span>
          <h2 className="text-lg font-bold text-zinc-900 font-display">
            My Story
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-10">
          {/* Continuous vertical connecting line */}
          <div className="absolute left-[18px] sm:left-[22px] top-4 bottom-4 w-[2px] bg-zinc-800" />

          {timelineData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative flex items-start gap-4 sm:gap-6"
            >
              {/* Circular node with doodle icon */}
              <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-zinc-900 shadow-sm flex items-center justify-center shrink-0 -ml-[18px] sm:-ml-[22px]">
                {item.icon}
              </div>

              {/* Story Content */}
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-display">
                    {item.age}: {item.title}
                  </h3>
                  {item.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-[#fef08a] text-[10px] font-bold text-zinc-900 border border-zinc-900/10">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TECH STACK & TOOLBOX
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-14 pt-4 border-t border-zinc-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧰</span>
          <h2 className="text-lg font-bold text-zinc-900 font-display">
            Things I Love Building With
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Frontend & Mobile */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-500" /> Frontend & Mobile
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Expo', 'Framer Motion', 'Vite'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md text-xs text-zinc-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Databases */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-500" /> Backend & Data
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Node.js', 'Express', 'PostgreSQL', 'Python', 'JWT & RBAC', 'REST APIs', 'Prisma'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md text-xs text-zinc-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Cloud */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-indigo-500" /> AI & Cloud
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['TensorFlow Lite', 'Edge AI', 'CNNs', 'Google Cloud (GCP)', 'Docker', 'Git', 'ETL'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md text-xs text-zinc-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIENCE & HONORS QUICK TILES
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-10 pt-4 border-t border-zinc-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xl">💼</span>
          <h2 className="text-lg font-bold text-zinc-900 font-display">
            Where I've Contributed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900">NK SkillEdge Pvt. Ltd.</h3>
              <span className="text-[11px] text-zinc-400">May 2026 – Present</span>
            </div>
            <p className="text-xs text-blue-600 font-medium">Android Developer Intern (Full Stack)</p>
            <p className="text-xs text-zinc-600 pt-1">
              Built 25+ modules in React Native for JanSampark, architected secure Node.js JWT + RBAC backend with 40+ RESTful APIs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900">IT Daksh</h3>
              <span className="text-[11px] text-zinc-400">Jan 2026 – Present</span>
            </div>
            <p className="text-xs text-amber-600 font-medium">Data Analyst Intern (Solar Intelligence)</p>
            <p className="text-xs text-zinc-600 pt-1">
              Evaluated 10+ years of solar metrics covering 81.8+ GW across 36+ states with polynomial forecasting and geospatial heatmaps.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900">Technex SVPCET</h3>
              <span className="text-[11px] text-zinc-400">2024 – 2026</span>
            </div>
            <p className="text-xs text-purple-600 font-medium">Backend Developer & Advisor</p>
            <p className="text-xs text-zinc-600 pt-1">
              Engineered high-scale GCP backend powering 3,000+ national registrations and 100,000+ impressions with zero downtime.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900">IEEE Research Author</h3>
              <span className="text-[11px] text-emerald-600 font-semibold">Published 2026</span>
            </div>
            <p className="text-xs text-zinc-700 font-medium">PashuRakshak AI Livestock Disease Detection</p>
            <p className="text-xs text-zinc-600 pt-1">
              Authored and presented paper on lightweight CNN edge classification models for offline rural veterinary diagnostics.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SPOTIFY PLAYER
      ────────────────────────────────────────────────────────────── */}
      <section className="pt-4 border-t border-zinc-200/80 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎧</span>
          <h2 className="text-sm font-semibold text-zinc-700 font-sans">
            On repeat while coding:
          </h2>
        </div>
        <div className="w-full max-w-md rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
          <iframe
            src="https://open.spotify.com/embed/track/5y2ijHECwFYWqcAHKTZgzD?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          />
        </div>
      </section>
    </DoodleLayout>
  );
};

export default About;
