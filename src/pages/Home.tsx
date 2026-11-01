import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, X, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';

import jansamparkImg from '../photo/jansampark.png';
import solarImg from '../photo/solar_analytics.png';
import pashuImg from '../photo/pashurakshak.png';

interface Project {
  id: string;
  client: string;
  category: string;
  year: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  imageBg?: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  badge?: string;
}

const projects: Project[] = [
  {
    id: 'jansampark',
    client: 'NK SkillEdge',
    category: 'Full Stack & Mobile',
    year: 'Shipped 2026',
    title: 'Helping citizens and city administrators find, track, and resolve civic grievances',
    headline: 'JanSampark: Smart Civic Grievance Platform',
    description:
      'Engineered a comprehensive citizen engagement ecosystem with 25+ frontend modules in React Native and a hardened Node.js backend. Implemented JWT + Role-Based Access Control (RBAC) across 4 administrative tiers and created 40+ RESTful APIs with PostgreSQL.',
    image: jansamparkImg,
    imageBg: 'from-blue-600 to-indigo-800',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'RBAC', 'Express'],
    highlights: [
      '25+ custom UI screens designed & built in React Native',
      'Architected 40+ RESTful APIs with sub-100ms response times',
      'JWT authentication with multi-level role-based access control',
      'Real-time status updates and geo-tagged incident reporting',
    ],
    github: 'https://github.com/PranavShende',
    demo: 'https://pranavshende.online',
    badge: 'Production Shipped',
  },
  {
    id: 'solar-analytics',
    client: 'IT Daksh',
    category: 'AI & Data Intelligence',
    year: 'Shipped 2026',
    title: 'Letting solar leaders forecast capacity and analyze 10+ years of energy metrics',
    headline: 'Solar Intelligence & Sales Optimization Platform',
    description:
      'Built an AI-driven solar sales intelligence and forecasting system covering 81.8+ GW of installed capacity. Analyzed 10+ years (2014–2024) of solar installations across 36+ Indian states/UTs with polynomial regression and interactive geospatial heatmaps.',
    image: solarImg,
    imageBg: 'from-amber-500 to-orange-600',
    tech: ['Python', 'PostgreSQL', 'ETL Pipelines', 'Scikit-Learn', 'Recharts', 'Geospatial'],
    highlights: [
      'Evaluated 81.8+ GW of nationwide solar capacity data',
      'Analyzed 36+ states/UTs across 500+ granular records',
      'Optimized data cleaning pipelines reducing query latency by 45%',
      'Predictive polynomial modeling forecasting growth to 2030',
    ],
    github: 'https://github.com/pranavshende/SolarSalesAnalysis',
    demo: 'https://pranavshende.online',
    badge: 'AI Analytics',
  },
  {
    id: 'pashurakshak',
    client: 'IEEE Research Publication',
    category: 'Edge AI & IoT',
    year: 'Published 2026',
    title: 'Empowering rural farmers with instant offline livestock disease diagnosis via edge AI',
    headline: 'PashuRakshak: AI Livestock Disease Detection System',
    description:
      'Developed an offline-first Edge AI application that classifies livestock ailments directly on-device using quantized CNN models and TensorFlow Lite. Authored and presented an IEEE research paper on the classification architecture.',
    image: pashuImg,
    imageBg: 'from-emerald-600 to-teal-800',
    tech: ['TensorFlow Lite', 'CNN', 'React Native (Expo)', 'Python', 'Node.js', 'Edge AI'],
    highlights: [
      'Quantized CNN model running smoothly on resource-constrained mobile hardware',
      'Offline-first architecture tailored for rural agricultural regions',
      'Presented and published at an international IEEE conference',
      'Integrated veterinary consultation directory and preventive alerts',
    ],
    github: 'https://github.com/pranavshende/HackNation_SKB-F17_SKB_P2',
    demo: 'https://pranavshende.online',
    badge: 'IEEE Published',
  },
  {
    id: 'technex',
    client: 'Technex SVPCET',
    category: 'Cloud & Infrastructure',
    year: 'Delivered 2026',
    title: 'Scaling high-concurrency event infrastructure on GCP for 3,000+ engineers',
    headline: 'National TechFest Cloud Backend & Financial Engine',
    description:
      'Architected highly scalable cloud infrastructure on Google Cloud Platform for central India’s flagship techfest. Handled 3,000+ registrations, automated payment gateway reconciliations, and sustained 100,000+ impressions during live competition spikes.',
    image: jansamparkImg,
    imageBg: 'from-purple-600 to-slate-900',
    tech: ['GCP', 'Node.js', 'PostgreSQL', 'Payment Gateways', 'Redis', 'Docker'],
    highlights: [
      '100% uptime sustained during peak national tournament registrations',
      'Payment gateway integrations with automated webhook verification',
      'Custom admin dashboard with real-time analytics for 20+ event coordinators',
      'Zero latency degradation under 100k+ impressions',
    ],
    github: 'https://github.com/PranavShende',
    demo: 'https://pranavshende.online',
    badge: 'National Scale',
  },
];

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO STATEMENT (Direct match to Screenshot 4)
      ────────────────────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-zinc-900 tracking-tight leading-snug sm:leading-tight">
          Hi there! I'm <span className="underline decoration-[#fde047] decoration-wavy decoration-2">Pranav</span>, a product designer & full-stack engineer who brings color and clarity to complicated products and systems. Prev. @{' '}
          <span className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors">NK SkillEdge</span>,{' '}
          <span className="font-semibold text-zinc-900 hover:text-amber-600 transition-colors">IT Daksh</span>
        </h1>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SELECTED PROJECTS (Direct match to Screenshot 4)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
          <h2 className="text-sm sm:text-base font-medium text-zinc-500 font-sans">
            Selected Projects
          </h2>
          <span className="text-xs text-zinc-400 font-doodle text-sm">
            click cards to inspect details 🔍
          </span>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer flex flex-col space-y-3"
            >
              {/* Project Visual Container */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-sm group-hover:shadow-md group-hover:border-zinc-300 transition-all">
                <img
                  src={proj.image}
                  alt={proj.headline}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Optional floating badge */}
                {proj.badge && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-zinc-800 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-zinc-200/60 shadow-sm">
                    {proj.badge}
                  </div>
                )}
              </div>

              {/* Metadata Row */}
              <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-0.5">
                <span className="font-semibold text-zinc-800">{proj.client}</span>
                <span>
                  {proj.category} • {proj.year}
                </span>
              </div>

              {/* Bold Title */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                {proj.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECT DETAIL MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  <span>{selectedProject.client}</span>
                  <span>•</span>
                  <span>{selectedProject.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 font-display">
                  {selectedProject.headline}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500">
                  {selectedProject.title}
                </p>
              </div>

              {/* Large Image Banner */}
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.headline}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Narrative Description */}
              <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                <p>{selectedProject.description}</p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  Key Achievements
                </h4>
                <div className="space-y-1.5">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fef08a] text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-[#fde047] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DoodleLayout>
  );
};

export default Home;
