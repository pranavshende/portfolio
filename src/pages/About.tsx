import React from 'react';
import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import FloatingDock from '@/components/FloatingDock';
import FloatingCodeBackground from '@/components/FloatingCodeBackground';
import MyJourneyTimeline from '@/components/MyJourneyTimeline';
import profilePhoto from '../photo/IMG_20240323_152847.jpg';
import { GraduationCap, Code, Server, HeartHandshake, MapPin, Rocket, BrainCircuit, BookOpen, ExternalLink } from 'lucide-react';


const About = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 pb-24">
      <FloatingCodeBackground />
      <FloatingHeader />
      
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Sticky on Desktop */}
          <div className="md:col-span-4 md:sticky md:top-28 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              {/* Outer soft glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              {/* Image Frame */}
              <div className="relative p-1 rounded-full bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                <img 
                  src={profilePhoto} 
                  alt="Pranav Shende" 
                  className="w-48 h-48 md:w-56 md:h-56 object-cover object-[46%_20%] scale-[1.0] rounded-full"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Pranav <span className="text-emerald-400">Shende</span>
              </h1>
              
              <div className="space-y-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Nagpur, India</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-600" />
                  <span>B.Tech IT @ SVPCET</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Scrolling Narrative Content */}
          <div className="md:col-span-8 space-y-6">
            
            {/* The Story */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-5 py-6 sm:p-7 space-y-4 shadow-sm"
            >
              <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">01 / Biography</h2>
                <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Who am I?</h3>
              </div>
              <div className="text-sm sm:text-base text-zinc-400 leading-relaxed space-y-4 pt-2">
                <p className="text-white text-base sm:text-lg leading-relaxed font-serif italic text-zinc-300 border-l-2 border-emerald-500 pl-4 py-1">
                  "I construct robust server-side infrastructures and ship tools that remain stable when production demands it."
                </p>
                <p>
                  I am a B.Tech IT student at SVPCET, Nagpur, specializing in the MERN stack and React Native. 
                  With over 40+ RESTful APIs designed and deployed, I focus on the parts of application architecture that users rarely see but rely on completely.
                </p>
                <p>
                  Beyond standard software building, I run research projects. I am an IEEE-published researcher, with past publications exploring CNN-based lumpy skin disease classification and distributed client-alumni educational platforms. I thrive in developer environments where scalability, reliability, and edge computing are top priorities.
                </p>
              </div>
            </motion.section>

            {/* The Vision */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-5 py-6 sm:p-7 space-y-4 shadow-sm"
            >
              <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">02 / Purpose</h2>
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>What do I want to become?</h3>
              </div>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pt-2">
                My professional target is to develop into a Principal Engineer specializing in high-throughput distributed systems and AI systems integration. I am driven by structural complexity—I want to design the cloud-native systems, API orchestrations, and data pipelines that power modern, global digital platforms.
              </p>
            </motion.section>

            {/* Core Focus */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-5 py-6 sm:p-7 space-y-4 shadow-sm"
            >
              <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">03 / Competence</h2>
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Contributions</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { icon: <Server className="w-4 h-4 text-emerald-400" />, title: 'Scalable Projects', desc: 'Architected platforms like JanSampark (civic management) with robust user systems and access controls.' },
                  { icon: <BrainCircuit className="w-4 h-4 text-emerald-400" />, title: 'AI & ML Research', desc: 'Presented peer-reviewed research on CNN and Edge classification models at international IEEE conferences.' },
                  { icon: <HeartHandshake className="w-4 h-4 text-emerald-400" />, title: 'Project Leadership', desc: 'Managed full-cycle team dynamics for hackathons, engineering software tools from concept to cloud deployment.' },
                  { icon: <GraduationCap className="w-4 h-4 text-emerald-400" />, title: 'Modern Stacks', desc: 'Consistently diving deep into NestJS, PostgreSQL, Redis caches, and Docker containment setups.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-colors shadow-sm space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        {item.icon}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>


            {/* Certifications */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-5 py-6 sm:p-7 space-y-4 shadow-sm"
            >
              <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">04 / Certifications</h2>
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Verified Skills</h3>
              </div>
              
              <div className="space-y-3 pt-2">
                {[
                  { color: 'blue', label: 'Data Structures and Algorithms (DSA) in C++', sub: 'Codetantra — With Lab Practicals', href: 'https://drive.google.com/file/d/12aX9JQ50mf9VfFU4D5Nq7GItDCJ3yjxf/view?usp=sharing' },
                  { color: 'orange', label: 'Java Programming', sub: 'Codetantra — With Lab Practicals', href: 'https://drive.google.com/file/d/1VghN2nvLFVZThKYlk2wJuLCuNmnAz3FX/view?usp=sharing' },
                ].map((c, i) => (
                  <a key={i} href={c.href} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-sm group">
                    <div className={`w-10 h-10 rounded-lg bg-${c.color}-500/10 border border-${c.color}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <BookOpen className={`w-5 h-5 text-${c.color}-500 dark:text-${c.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{c.label}</p>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.section>

            <MyJourneyTimeline />

          </div>
        </div>
      </main>

      <FloatingDock />
    </div>
  );
};

export default About;
