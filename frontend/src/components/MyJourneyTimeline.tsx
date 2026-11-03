import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Users, Bot, Trophy, Swords, Code, Database, 
  Layout, Building, Server, Rocket, BadgeCheck, Wrench, 
  Terminal, FileText, HeartHandshake, Briefcase, Crown, 
  Lightbulb, Sun, Sprout, Shield, Target, Globe, BrainCircuit, Cpu
} from 'lucide-react';
import { useMode } from '../contexts/ModeContext';

const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = [2023, 2024, 2025, 2026];

// --- DATA ---
const timelineData = [
  // 2023
  { year: 2023, months: [7], title: 'Started B.Tech', description: 'Began B.Tech in Information Technology at St. Vincent Pallotti College of Engineering & Technology.', icon: <GraduationCap className="w-5 h-5" /> },
  { year: 2023, months: [7], title: 'Class Representative', description: 'Became Class Representative (CR), developing leadership and communication skills.', icon: <Users className="w-5 h-5" /> },
  { year: 2023, months: [8], title: 'Tech Community Builder', description: 'Built a passionate tech community with friends and began participating in technical events.', icon: <HeartHandshake className="w-5 h-5" /> },
  { year: 2023, months: [9], title: 'Codetronics Runner-up', description: 'Won 2nd Place in Codetronics, gaining hands-on robotics experience.', icon: <Bot className="w-5 h-5" /> },
  { year: 2023, months: [10], title: 'Coastal Clash', description: 'Participated in Coastal Clash and multiple technical competitions.', icon: <Swords className="w-5 h-5" /> },
  { year: 2023, months: [11], title: 'Hello World', description: 'Started my software development journey with C, Java, HTML, CSS, and JavaScript.', icon: <Code className="w-5 h-5" /> },
  
  // 2024
  { year: 2024, months: [0], title: 'DSA Practice', description: 'Started practicing Data Structures & Algorithms to build a strong foundation.', icon: <Database className="w-5 h-5" /> },
  { year: 2024, months: [1], title: 'Frontend Development', description: 'Built my first frontend projects, bringing UI concepts to life.', icon: <Layout className="w-5 h-5" /> },
  { year: 2024, months: [2], title: 'Cognizance IIT Roorkee', description: 'Represented my college at Cognizance IIT Roorkee, participating in Nano Navigator and Snap Syntax.', icon: <Building className="w-5 h-5" /> },
  { year: 2024, months: [3], title: 'MERN Stack & Backend', description: 'Started learning the MERN Stack and diving deep into backend architecture.', icon: <Server className="w-5 h-5" /> },
  { year: 2024, months: [4, 5, 6], title: 'Full-Stack Hackathons', description: 'Built full-stack applications and aggressively participated in hackathons.', icon: <Rocket className="w-5 h-5" /> },
  { year: 2024, months: [7], title: 'DSA Certification', description: 'Successfully completed Internshala Data Structures & Algorithms Training.', icon: <BadgeCheck className="w-5 h-5" /> },
  { year: 2024, months: [8], title: 'Joined CSI', description: 'Joined the Computer Society of India (CSI) as a technical member.', icon: <Users className="w-5 h-5" /> },
  { year: 2024, months: [9, 10], title: 'CSI Contributions', description: 'Contributed heavily to CSI technical events while strengthening my core development skills.', icon: <Wrench className="w-5 h-5" /> },
  { year: 2024, months: [11], title: 'Technex Backend Developer', description: 'Joined the Technex Team as a Backend Developer, developing services for the official Technex platform.', icon: <Terminal className="w-5 h-5" /> },
  
  // 2025
  { year: 2025, months: [0], title: 'API Design & Architecture', description: 'Dived deep into advanced RESTful API design, database normalization, and microservices concepts.', icon: <Server className="w-5 h-5" /> },
  { year: 2025, months: [1], title: 'Technex Hackathon Winner', description: 'Secured 3rd Prize at the highly competitive Technex Hackathon 2025.', icon: <Trophy className="w-5 h-5" /> },
  { year: 2025, months: [2], title: 'Research Refinement', description: 'Finalized and optimized machine learning models for my upcoming research publication.', icon: <BrainCircuit className="w-5 h-5" /> },
  { year: 2025, months: [3], title: 'First IEEE Research Paper', description: 'Presented my first research paper at an international conference, exploring advanced classification models.', icon: <FileText className="w-5 h-5" /> },
  { year: 2025, months: [4], title: 'Advanced Cloud Deployments', description: 'Learned Docker, CI/CD pipelines, and deployed scalable applications on AWS.', icon: <Globe className="w-5 h-5" /> },
  { year: 2025, months: [5], title: 'GSSoC Mentor', description: 'Selected as a GirlScript Summer of Code (GSSoC) Mentor, guiding aspiring developers in open source.', icon: <HeartHandshake className="w-5 h-5" /> },
  { year: 2025, months: [6], title: 'Student Coordinator – IAC 2.0', description: 'Managed 80+ volunteers for Industry Academia Conclave 2.0 and contributed to the official website and IDEA³.', icon: <Briefcase className="w-5 h-5" /> },
  { year: 2025, months: [7], title: 'Technical Head – CSI', description: 'Promoted to Technical Head of CSI, leading workshops, hackathons, technical events, and mentoring students.', icon: <Crown className="w-5 h-5" /> },
  { year: 2025, months: [8], title: 'University Tech Initiative', description: 'Helped launch a university-wide tech initiative to foster coding culture among juniors.', icon: <Building className="w-5 h-5" /> },
  { year: 2025, months: [9], title: 'Hackathon Mentoring', description: 'Started actively mentoring junior developers and guiding their first competitive hackathon projects.', icon: <Users className="w-5 h-5" /> },
  { year: 2025, months: [10, 11], title: 'Adviser – Technex 2026', description: 'Served as Adviser for Technex 2026, mentoring the organizing team and providing crucial technical guidance.', icon: <Lightbulb className="w-5 h-5" /> },
  
  // 2026
  { year: 2026, months: [0], title: 'Data Analytics Internship', description: 'Worked on the Solar Intelligence & Sales Optimization Platform during my Data Analytics internship.', icon: <Sun className="w-5 h-5" /> },
  { year: 2026, months: [1], title: 'Data Pipeline Deployment', description: 'Deployed robust data pipelines and analytics dashboards for the Solar Analytics platform.', icon: <Database className="w-5 h-5" /> },
  { year: 2026, months: [2], title: 'System Design for JanSampark', description: 'Architected the core system design, database schema, and scaling strategy for the civic platform.', icon: <Layout className="w-5 h-5" /> },
  { year: 2026, months: [3], title: 'JanSampark', description: 'Started building JanSampark, an innovative citizen engagement platform mapping public administration.', icon: <Rocket className="w-5 h-5" /> },
  { year: 2026, months: [4], title: 'KrishiMitra Prototypes', description: 'Built the initial AI prototypes and trained predictive crop models for the smart farming platform.', icon: <Bot className="w-5 h-5" /> },
  { year: 2026, months: [5], title: 'KrishiMitra 360', description: 'Developed KrishiMitra 360, a comprehensive AI-powered smart farming platform.', icon: <Sprout className="w-5 h-5" /> },
  { year: 2026, months: [6], title: 'PashuRakshak & AI Research', description: 'Built PashuRakshak and continued deep research in AI, IoT, and intelligent distributed systems.', icon: <Shield className="w-5 h-5" /> },
  { year: 2026, months: [6], title: 'The Journey Continues', description: 'Full-Stack Developer • Backend Engineer • AI Researcher • Technical Leader • Mentor • Hackathon Winner.', icon: <Target className="w-5 h-5" />, isPresent: true },
];

interface TimelineProps {
  autoPlay?: boolean;
}

const MyJourneyTimeline = ({ autoPlay = true }: TimelineProps = {}) => {
  const [activeYear, setActiveYear] = useState<number>(2024);
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoPlay);
  const { mode } = useMode();
  const isLight = mode === 'recruiter';

  const activeMonthsWithDeeds = useMemo(() => {
    return ALL_MONTHS.map((_, i) => i).filter(m => timelineData.some(d => d.year === activeYear && d.months.includes(m)));
  }, [activeYear]);

  useEffect(() => {
    if (!isAutoPlaying || activeMonthsWithDeeds.length === 0) return;
    
    // Auto-select the first active month if none is selected
    if (activeMonth === null) {
      setActiveMonth(activeMonthsWithDeeds[0]);
      return;
    }

    const interval = setInterval(() => {
      const currentIndex = activeMonthsWithDeeds.indexOf(activeMonth);
      
      // If we are at the last month of this year, switch to the next year
      if (currentIndex === activeMonthsWithDeeds.length - 1) {
        const currentYearIndex = YEARS.indexOf(activeYear);
        const nextYearIndex = (currentYearIndex + 1) % YEARS.length;
        setActiveYear(YEARS[nextYearIndex]);
        setActiveMonth(null); 
      } else {
        setActiveMonth(activeMonthsWithDeeds[currentIndex + 1]);
      }
    }, 3500);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeYear, activeMonthsWithDeeds, activeMonth]);

  const handleYearChange = (year: number) => {
    setActiveYear(year);
    setActiveMonth(null);
    setIsAutoPlaying(true);
  };

  const handleMonthClick = (monthIdx: number, hasDeeds: boolean) => {
    if (hasDeeds) {
      setIsAutoPlaying(false);
      setActiveMonth(activeMonth === monthIdx ? null : monthIdx);
    }
  };

  // Get all deeds for the selected month and year
  const activeDeeds = timelineData.filter(d => d.year === activeYear && d.months.includes(activeMonth ?? -1));

  return (
    <section className="relative w-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.06] p-4 sm:p-5 space-y-5 shadow-sm overflow-hidden mt-6">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="space-y-1 border-b border-zinc-200 dark:border-white/[0.06] pb-3 relative z-10">
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">04 / The Journey</h2>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>My Timeline Calendar</h3>
      </div>

      <div className="relative z-10 space-y-5">
        
        {/* Year Tabs */}
        <div className="flex flex-wrap gap-2">
          {YEARS.map(year => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-mono transition-all duration-300 ${
                activeYear === year 
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105'
                  : 'bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent dark:border-white/5'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
          {ALL_MONTHS.map((monthStr, monthIdx) => {
            const hasDeeds = timelineData.some(d => d.year === activeYear && d.months.includes(monthIdx));
            const isActive = activeMonth === monthIdx;
            
            return (
              <button
                key={`${activeYear}-${monthIdx}`}
                onClick={() => handleMonthClick(monthIdx, hasDeeds)}
                disabled={!hasDeeds}
                className={`relative flex items-center justify-center py-1.5 px-2 rounded border transition-colors duration-200 ${
                  hasDeeds 
                    ? isActive 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 text-zinc-700 dark:text-zinc-300 cursor-pointer'
                    : 'bg-zinc-50 dark:bg-zinc-950/50 border-transparent text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                {hasDeeds && !isActive && (
                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-emerald-500 opacity-60" />
                )}
                
                <span className="text-[11px] font-medium">
                  {monthStr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deeds Panel (Expandable) */}
        <AnimatePresence mode="wait">
          {activeMonth !== null && activeDeeds.length > 0 && (
            <motion.div
              key={`deeds-${activeYear}-${activeMonth}`}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-1 pb-2">
                <div className="relative p-4 rounded-xl bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl border-l-[3px] border-l-emerald-500 border-y border-r border-zinc-200 dark:border-white/10 shadow-sm">
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjE1KSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />

                  <div className="relative z-10 flex flex-col gap-4">
                    {activeDeeds.map((deed, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col sm:flex-row gap-3 items-start"
                      >
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 shadow-inner">
                          {React.cloneElement(deed.icon as React.ReactElement, { className: 'w-4 h-4' })}
                        </div>
                        <div className="space-y-1 flex-1 mt-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                              {deed.title}
                            </h4>
                            {deed.isPresent && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-zinc-950 uppercase tracking-widest">NOW</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                            {deed.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default MyJourneyTimeline;
