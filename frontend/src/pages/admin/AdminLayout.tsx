import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, FolderKanban, 
  Award, GraduationCap, BookOpen, 
  BarChart3, Globe, Settings, Shield, 
  LogOut, ExternalLink, Menu, X, Sun, Moon, ChevronRight 
} from 'lucide-react';
import { api, getStoredToken, removeStoredToken } from '@/lib/api';
import { useMode } from '@/contexts/ModeContext';
import { PageSeo } from '@/components/PageSeo';

// Import modular sections (6 pruned as requested: experience, skills, testimonials, subscribers, bookings, logs)
import OverviewSection from './sections/OverviewSection';
import MessagesSection from './sections/MessagesSection';
import ProjectsSection from './sections/ProjectsSection';
import AchievementsSection from './sections/AchievementsSection';
import EducationSection from './sections/EducationSection';
import BlogSection from './sections/BlogSection';
import AnalyticsSection from './sections/AnalyticsSection';
import SeoSection from './sections/SeoSection';
import SettingsSection from './sections/SettingsSection';
import SecuritySection from './sections/SecuritySection';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'messages', label: 'Messages & Leads', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects CMS', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'blog', label: 'Blog Management', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'seo', label: 'SEO Management', icon: <Globe className="w-4 h-4" /> },
  { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
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
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 font-sans bg-[radial-gradient(#d6cec0_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#2b2e38_1.25px,transparent_1.25px)] [background-size:18px_18px]">
        <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white dark:bg-[#15161c] border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000]">
          <div className="w-8 h-8 rounded-full border-2 border-[#8b2323] border-t-transparent animate-spin" />
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">[管理]</span>
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300">Verifying administrator credentials...</p>
          </div>
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
      case 'blog':
        return <BlogSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'education':
        return <EducationSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'seo':
        return <SeoSection />;
      case 'settings':
        return <SettingsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <OverviewSection onNavigateSection={(s) => setActiveTab(s)} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#faf7f0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 font-sans antialiased bg-[radial-gradient(#d6cec0_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#2b2e38_1.25px,transparent_1.25px)] [background-size:18px_18px]">
      <PageSeo
        title="Admin Portal Dashboard | Pranav Shende"
        description="Secure portfolio content management system and administration dashboard."
        noindex={true}
      />
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 border-r-2 border-stone-900 dark:border-stone-700 bg-[#faf7f0]/95 dark:bg-[#15161c]/95 backdrop-blur-md z-40 select-none overflow-y-auto scrollbar-none p-4 shadow-[4px_0px_0px_#1c1917] dark:shadow-[4px_0px_0px_#000000]">
        <div className="space-y-4">
          {/* Brand Header */}
          <div className="px-2 pt-1 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8b2323] text-white border-2 border-stone-900 dark:border-stone-700 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]">
                ⛩
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100 leading-tight">
                    PS-OS Admin
                  </h1>
                  <span className="px-1 py-0.2 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[9px] font-bold">
                    管理
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">v2026.1 • Live CMS</span>
              </div>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#1b1c24] border-2 border-stone-900 dark:border-stone-700 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {adminUser?.name || 'Pranav Shende'}
              </span>
              <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[9px] font-bold">
                {adminUser?.role || 'SUPER_ADMIN'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-mono truncate">
              {adminUser?.email || 'pranavshende97@gmail.com'}
            </p>
          </div>

          {/* Nav List */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Navigation
              </span>
              <span className="text-[10px] font-mono text-stone-400">{NAV_ITEMS.length} Tabs</span>
            </div>
            <nav className="flex flex-col space-y-1.5 pt-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#8b2323] text-white border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000]'
                        : 'bg-transparent text-stone-700 dark:text-stone-300 border-2 border-transparent hover:border-stone-900/40 dark:hover:border-stone-600 hover:bg-white dark:hover:bg-stone-800/80 active:translate-x-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/90" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t-2 border-stone-900/10 dark:border-stone-700/60 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-[#1b1c24] border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] font-mono text-[#8b2323] dark:text-rose-400 font-bold">↗</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50/70 dark:bg-red-950/20 border-2 border-red-800/30 hover:border-red-800 shadow-[2px_2px_0px_#8b2323] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA & TOP BAR
      ────────────────────────────────────────────────────────────── */}
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-14 sm:h-16 border-b-2 border-stone-900 dark:border-stone-700 bg-[#faf7f0]/90 dark:bg-[#15161c]/90 backdrop-blur-md px-3 sm:px-6 md:px-8 flex items-center justify-between shadow-[0_2px_0px_#1c1917] dark:shadow-[0_2px_0px_#000000]">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              aria-label="Open menu drawer"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold hidden sm:inline">
                管理
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest hidden sm:inline font-mono">
                Admin
              </span>
              <span className="text-stone-400 hidden sm:inline">/</span>
              <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label || 'Overview'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-xs font-bold hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout Icon */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 hover:text-red-600 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── Mobile Horizontal Quick Tab Switcher ── */}
        <div className="lg:hidden sticky top-14 sm:top-16 z-20 bg-[#faf7f0]/95 dark:bg-[#121316]/95 backdrop-blur-md border-b-2 border-stone-900 dark:border-stone-700 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8b2323] text-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-2 border-stone-900/60 dark:border-stone-700 shadow-[1.5px_1.5px_0px_#1c1917]'
                }`}
              >
                <span className="scale-90">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-20 sm:pb-16 min-w-0">
          {renderActiveSection()}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE DRAWER SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-[#faf7f0] dark:bg-[#15161c] border-r-2 border-stone-900 dark:border-stone-700 p-4 flex flex-col justify-between overflow-y-auto z-10 shadow-[5px_0px_0px_#1c1917] dark:shadow-[5px_0px_0px_#000000] animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-stone-900/15 dark:border-stone-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#8b2323] text-white border-2 border-stone-900 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_#1c1917]">
                    ⛩
                  </div>
                  <div>
                    <span className="font-bold text-sm font-serif block text-stone-900 dark:text-stone-100">PS-OS Admin</span>
                    <span className="text-[10px] text-stone-500 font-mono">v2026.1 • Live CMS</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-[2px_2px_0px_#1c1917] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User badge */}
              <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {adminUser?.name || 'Pranav Shende'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] font-mono text-[9px] font-bold">
                    {adminUser?.role || 'SUPER_ADMIN'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
                  {adminUser?.email || 'pranavshende97@gmail.com'}
                </p>
              </div>

              <nav className="flex flex-col space-y-1.5 pt-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#8b2323] text-white border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]'
                          : 'bg-white dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-2 border-stone-900/40 dark:border-stone-700/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'text-stone-400'}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/90" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t-2 border-stone-900/15 dark:border-stone-700 space-y-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public Portfolio</span>
                </div>
                <span className="text-[10px] font-mono text-[#8b2323] font-bold">↗</span>
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8b2323] hover:bg-[#721c1c] border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
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
