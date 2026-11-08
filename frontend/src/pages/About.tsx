import React from 'react';
import { motion } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import profilePhoto from '../photo/IMG_20240323_152847.webp';
import { 
  FileText, ExternalLink, Code2, Database, Cloud, 
  Sparkles, GraduationCap, MapPin, Trophy, Award, Mail
} from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
}

const realTimeline: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started B.Tech IT & Leadership',
    description:
      'Began B.Tech in Information Technology at St. Vincent Pallotti College of Engineering & Technology (SVPCET), Nagpur. Elected Class Representative (CR) and won 2nd Place in Codetronics robotics competition.',
    icon: '🎓',
  },
  {
    year: '2024',
    title: 'Cognizance IIT Roorkee & Full-Stack Deep Dive',
    description:
      'Represented college at Cognizance IIT Roorkee. Mastered MERN stack, Data Structures & Algorithms, joined Computer Society of India (CSI), and architected backend services for the Technex techfest platform.',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'IEEE Research, CSI Technical Head & GSSoC Mentor',
    description:
      'Promoted to Technical Head of CSI, leading hackathons and mentoring 80+ volunteers at IAC 2.0. Selected as GirlScript Summer of Code (GSSoC) Mentor and presented my first IEEE research paper at an international conference.',
    icon: '🏆',
  },
  {
    year: '2026',
    title: 'Shipping JanSampark, Solar Intelligence & PashuRakshak',
    description:
      'Building JanSampark with 25+ React Native modules at NK SkillEdge, conducting nationwide solar analytics covering 81.8+ GW at IT Daksh, and developing edge AI livestock diagnostics published in IEEE.',
    icon: '⚡',
    tag: 'Present',
  },
];

export const About: React.FC = () => {
  const resumeUrl = "https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing";
  const emailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=pranavshende97@gmail.com";

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HERO PROFILE & HEADLINE
      ────────────────────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-12 sm:mb-14">
        {/* Avatar */}
        <div className="relative shrink-0 group">
          {/* Circular Photo */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-zinc-900 dark:border-zinc-700 shadow-sm bg-zinc-100 dark:bg-zinc-800">
            <img
              src={profilePhoto}
              alt="Pranav Shende"
              className="w-full h-full object-cover object-[48%_18%] scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="flex-1 text-center sm:text-left pt-2">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-medium text-zinc-900 dark:text-zinc-100 leading-snug sm:leading-snug">
            Hi again! I'm still the kid who can't stop building things, just with different tools now.
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Based in Nagpur, India • B.Tech in Information Technology @ SVPCET • Full Stack & AI Researcher
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl bg-[#fef08a] dark:bg-amber-400/20 border-2 border-zinc-900 dark:border-amber-400/40 text-xs font-semibold text-zinc-800 dark:text-amber-200 hover:bg-[#fde047] shadow-xs inline-flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Resume (Google Drive)</span>
            </a>
            <a
              href={emailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-xs inline-flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>pranavshende97@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MY STORY SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-8 mb-16">
        <div className="flex items-center gap-2.5 border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-3">
          <span className="text-2xl">⛩️</span>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>My Journey & Story</span>
            <span className="text-[11px] font-serif font-bold text-[#8b2323] dark:text-rose-400 border border-[#8b2323]/30 px-1.5 py-0.5 rounded-xs bg-[#8b2323]/5">
              経歴年表
            </span>
            <span className="hanko-stamp text-[9px] w-3.5 h-3.5 ml-0.5">志</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8">
          {/* Continuous vertical connecting line */}
          <div className="absolute left-[18px] sm:left-[22px] top-4 bottom-4 w-[2px] bg-zinc-900 dark:bg-zinc-700" />

          {realTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative flex items-start gap-4 sm:gap-6"
            >
              {/* Circular node with doodle icon */}
              <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 shadow-xs flex items-center justify-center text-lg shrink-0 -ml-[18px] sm:-ml-[22px]">
                {item.icon}
              </div>

              {/* Story Content */}
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {item.year}: {item.title}
                  </h3>
                  {item.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-[#fef08a] dark:bg-amber-400/20 font-doodle text-xs font-bold text-zinc-900 dark:text-amber-300 border border-zinc-900 dark:border-amber-400/30">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TECH TOOLBOX
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-14 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧰</span>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Technologies & Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Frontend & Mobile */}
          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-2">
            <span className="font-doodle text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Frontend & Mobile
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['React Native', 'React.js', 'TypeScript', 'Expo', 'Tailwind CSS', 'Redux', 'Framer Motion'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Databases */}
          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-2">
            <span className="font-doodle text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Database className="w-4 h-4" /> Backend & Data
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Kafka', 'Redis', 'Node.js', 'Express.js', 'PostgreSQL', 'Python', 'JWT & RBAC', 'Prisma'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Cloud */}
          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-2">
            <span className="font-doodle text-base font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Cloud className="w-4 h-4" /> AI & Cloud
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['RAG Pipelines', 'Google Gemini 2.5', 'TensorFlow Lite', 'CNNs', 'Edge AI', 'Docker', 'GCP'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIENCE CARDS (Direct from previous website)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 mb-10 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💼</span>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Work Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">NK SkillEdge Pvt. Ltd.</h3>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">May 2026 – Present</span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Android Developer Intern (Full Stack)</p>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 font-sans pt-1">
              <li>• Spearheaded core development of JanSampark, building 25+ React Native modules.</li>
              <li>• Architected Node.js backend secured with JWT & RBAC for 4 user roles.</li>
              <li>• Implemented Redis caching and Kafka event dispatching for rapid queries.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">IT Daksh</h3>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">Jan 2026 – Present</span>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Data Analyst Intern (Solar Sales Intelligence)</p>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 font-sans pt-1">
              <li>• Analyzed 10+ years of solar metrics covering 81.8+ GW across 36+ Indian states/UTs.</li>
              <li>• Built automated ETL pipelines in Python & PostgreSQL with Kafka stream ingestion.</li>
              <li>• Built regression forecast models projecting solar adoption through 2030.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-[#151619] shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Technex SVPCET</h3>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">Dec 2024 – Jan 2026</span>
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Backend Developer & Advisor</p>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 font-sans pt-1">
              <li>• Architected scalable cloud infrastructure on GCP handling 3,000+ registrations.</li>
              <li>• Sustained 100,000+ impressions during national events with zero downtime.</li>
              <li>• Integrated secure payment gateways with automated transaction webhooks.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border-2 border-zinc-900 bg-white shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Computer Society of India (CSI)</h3>
              <span className="font-mono text-[10px] text-zinc-500">2024 – 2025</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold">Technical Head</p>
            <ul className="text-xs text-zinc-600 space-y-1 font-sans pt-1">
              <li>• Organized and conducted hands-on coding workshops, hackathons, and seminars.</li>
              <li>• Coordinated 80+ volunteers for the Industry Academia Conclave 2.0.</li>
              <li>• Mentored students in open source and software engineering practices.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SPOTIFY PLAYER
      ────────────────────────────────────────────────────────────── */}
      <section className="pt-4 border-t-2 border-dashed border-zinc-200 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🎧</span>
          <h2 className="font-doodle text-lg font-bold text-zinc-800">
            Recently Listening On Repeat:
          </h2>
        </div>
        <div className="w-full max-w-md rounded-2xl overflow-hidden border-2 border-zinc-900 shadow-xs">
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
