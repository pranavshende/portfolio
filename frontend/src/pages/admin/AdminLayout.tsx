import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, FolderKanban, Briefcase, Cpu, 
  Award, GraduationCap, MessageSquareQuote, BookOpen, Users, 
  Calendar, BarChart3, Globe, Settings, History, Shield, 
  LogOut, ExternalLink, Menu, X, Sun, Moon, Sparkles, ChevronRight 
} from 'lucide-react';
import { api, getStoredToken, removeStoredToken } from '@/lib/api';
import { useMode } from '@/contexts/ModeContext';

// Import all 16 modular sections
import OverviewSection from './sections/OverviewSection';
import MessagesSection from './sections/MessagesSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import AchievementsSection from './sections/AchievementsSection';
import EducationSection from './sections/EducationSection';
import TestimonialsSection from './sections/TestimonialsSection';
import BlogSection from './sections/BlogSection';
import SubscribersSection from './sections/SubscribersSection';
import BookingsSection from './sections/BookingsSection';
import AnalyticsSection from './sections/AnalyticsSection';
import SeoSection from './sections/SeoSection';
import SettingsSection from './sections/SettingsSection';
import LogsSection from './sections/LogsSection';
import SecuritySection from './sections/SecuritySection';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'messages', label: 'Messages & Leads', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects CMS', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" /> },
  { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
  { id: 'blog', label: 'Blog Management', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'subscribers', label: 'Subscribers', icon: <Users className="w-4 h-4" /> },
  { id: 'bookings', label: 'Meeting Bookings', icon: <Calendar className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'seo', label: 'SEO Management', icon: <Globe className="w-4 h-4" /> },
  { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
  { id: 'logs', label: 'Activity Logs', icon: <History className="w-4 h-4" /> },
  { id: 'security', label: 'Security Settings', icon: <Shield className="w-4 h-4" /> },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useMode();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Protected Auth Guard Check
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    api.getAdminMe()
      .then((res: any) => {
        setAdminUser(res.admin || res.data || { name: 'Pranav Shende', email: 'pranavshende97@gmail.com', role: 'SUPER_ADMIN' });
      })
      .catch((err) => {
        console.warn('Admin authentication required:', err.message);
        removeStoredToken();
        navigate('/admin/login', { replace: true });
      })
      .finally(() => setIsVerifying(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.adminLogout();
    } catch {
      // Ignore
    } finally {
      removeStoredToken();
      navigate('/admin/login', { replace: true });
    }
  };

  if (isVerifying || !adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f2ea] dark:bg-[#0c0d10] text-stone-900 dark:text-stone-100 font-sans">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#8b2323] border-t-transparent animate-spin" />
          <p className="text-xs font-semibold text-stone-500">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection onNavigateSection={(s) => setActiveTab(s)} />;
      case 'messages':
        return <MessagesSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'skills':
        return <SkillsSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'education':
        return <EducationSection />;
      case 'testimonials':
        return <TestimonialsSection />;
      case 'blog':
        return <BlogSection />;
      case 'subscribers':
        return <SubscribersSection />;
      case 'bookings':
        return <BookingsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'seo':
        return <SeoSection />;
      case 'settings':
        return <SettingsSection />;
      case 'logs':
        return <LogsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <OverviewSection onNavigateSection={(s) => setActiveTab(s)} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbf8f3] dark:bg-[#0d0e12] text-stone-900 dark:text-stone-100 font-sans antialiased">
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 border-r border-stone-200/80 dark:border-stone-800 bg-white/95 dark:bg-[#13141a]/95 backdrop-blur-md z-40 select-none overflow-y-auto scrollbar-none p-4">
        <div className="space-y-4">
          {/* Brand Header */}
          <div className="px-2 pt-1 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8b2323] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                ⛩
              </div>
              <div>
                <h1 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100 leading-tight">
                  Admin Panel
                </h1>
                <span className="text-[10px] text-stone-500 font-mono">v2026.1 • Live CMS</span>
              </div>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {adminUser?.name || 'Pranav Shende'}
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 font-mono text-[9px] font-bold">
                {adminUser?.role || 'SUPER_ADMIN'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-mono truncate">
              {adminUser?.email || 'pranavshende97@gmail.com'}
            </p>
          </div>

          {/* Nav List */}
          <div className="space-y-0.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3">
              Sections
            </span>
            <nav className="flex flex-col space-y-0.5 pt-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#8b2323] text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-white' : 'text-stone-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">↗</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA & TOP BAR
      ────────────────────────────────────────────────────────────── */}
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-stone-200/80 dark:border-stone-800 bg-white/85 dark:bg-[#13141a]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest hidden sm:inline">
                Dashboard
              </span>
              <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">/</span>
              <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 capitalize">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label || 'Overview'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout Icon */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-16">
          {renderActiveSection()}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE DRAWER SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-white dark:bg-[#13141a] border-r border-stone-200 dark:border-stone-800 p-4 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8b2323] text-white flex items-center justify-center font-bold text-xs">
                    ⛩
                  </div>
                  <span className="font-bold text-sm font-serif">Admin Workspace</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                      activeTab === item.id
                        ? 'bg-[#8b2323] text-white'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
