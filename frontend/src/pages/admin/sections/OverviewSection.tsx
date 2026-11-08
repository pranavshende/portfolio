import React, { useEffect, useState } from 'react';
import { 
  Users, Eye, Mail, MessageSquare, Download, TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { api } from '@/lib/api';

interface OverviewSectionProps {
  onNavigateSection: (section: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigateSection }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getAnalyticsDashboard('30d')
      .then((res: any) => {
        setData(res?.data || res);
      })
      .catch((err) => {
        console.error('Failed to load overview data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalVisitors = data?.totalVisitors ?? data?.kpis?.totalVisitors ?? 0;
  const projectViews = data?.projectViews ?? data?.kpis?.totalPageViews ?? 0;
  const totalInquiries = data?.totalInquiries ?? data?.kpis?.totalInquiries ?? 0;
  const unreadInquiries = data?.unreadInquiries ?? data?.kpis?.unreadInquiries ?? 0;
  const resumeDownloads = data?.resumeDownloads ?? data?.kpis?.resumeDownloads ?? 0;

  // Real visitor trend data
  const rawTrends = data?.visitorTrend || data?.visitorTrends || [];
  const visitorTrend = rawTrends.length > 0 
    ? rawTrends.map((t: any) => ({
        date: t.date,
        count: t.count ?? t.views ?? 0,
      }))
    : [
        { date: 'Past', count: 0 },
        { date: 'Today', count: projectViews },
      ];

  const identifiedVisitors = data?.identifiedVisitors || data?.recentInquiries || [];

  return (
    <div className="space-y-6">
      {/* ── KPI Grid (5 Cards: Subscribers removed) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Visitors */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Total Visitors</span>
            <Users className="w-4 h-4 text-blue-500 shrink-0" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-stone-50 leading-tight">
              {totalVisitors}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5 truncate">
              <TrendingUp className="w-3 h-3 shrink-0" /> Privacy-conscious
            </span>
          </div>
        </div>

        {/* Project Views */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Project Views</span>
            <Eye className="w-4 h-4 text-purple-500 shrink-0" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-stone-50 leading-tight">
              {projectViews}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium mt-0.5 block truncate">
              Across flagship apps
            </span>
          </div>
        </div>

        {/* Total Inquiries */}
        <div 
          onClick={() => onNavigateSection('messages')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between cursor-pointer hover:border-[#8b2323] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Inquiries</span>
            <MessageSquare className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-stone-50 leading-tight">
              {totalInquiries}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5 block truncate">
              {unreadInquiries} pending review
            </span>
          </div>
        </div>

        {/* Unread Messages */}
        <div 
          onClick={() => onNavigateSection('messages')}
          className="p-3.5 sm:p-4 rounded-2xl bg-[#faf7f0] dark:bg-[#1e1515] border-2 border-[#8b2323] shadow-[3px_3px_0px_#8b2323] flex flex-col justify-between cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between text-[#8b2323] dark:text-rose-400">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Unread</span>
            <Mail className="w-4 h-4 shrink-0" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#8b2323] dark:text-rose-400 leading-tight">
              {unreadInquiries}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-stone-600 dark:text-stone-300 font-medium mt-0.5 block truncate">
              Instant email active
            </span>
          </div>
        </div>

        {/* Resume Downloads */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Downloads</span>
            <Download className="w-4 h-4 text-emerald-500 shrink-0" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-stone-50 leading-tight">
              {resumeDownloads}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 block truncate">
              Resume v2026.1
            </span>
          </div>
        </div>
      </div>

      {/* ── Middle Row: Visitor Trends Chart + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Trends Chart */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                  [トラフィック]
                </span>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Visitor Traffic (Last 30 Days)
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Unique visitor sessions recorded on production portfolio
              </p>
            </div>
            <button
              onClick={() => onNavigateSection('analytics')}
              className="text-xs font-bold text-[#8b2323] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Detailed Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorTrend}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b2323" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b2323" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1c1917', 
                    borderColor: '#44403c', 
                    borderRadius: '0.75rem', 
                    color: '#faf7f0',
                    fontSize: '12px',
                    borderWidth: '2px',
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8b2323" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#visitorGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                [ショートカット]
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Quick Shortcuts
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              Direct access to essential portfolio controls
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => onNavigateSection('projects')}
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-2 border-stone-900/60 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-xs font-bold flex items-center justify-between transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>Manage Projects & Showcases</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateSection('blog')}
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-2 border-stone-900/60 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-xs font-bold flex items-center justify-between transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>Manage Technical Blogs & Articles</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateSection('messages')}
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-2 border-stone-900/60 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-xs font-bold flex items-center justify-between transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>Review Inquiries ({unreadInquiries} new)</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateSection('settings')}
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-2 border-stone-900/60 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-xs font-bold flex items-center justify-between transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>Website Configuration & SEO</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          <div className="pt-2 border-t-2 border-stone-900/10 dark:border-stone-700/60 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Server Status</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational • Supabase DB
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Identified Visitors & Leads by Name ── */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                [訪問者]
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8b2323]" />
                <span>Who Visited My Website (Identified Leads & Visitors)</span>
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time records of individuals, recruiters, and collaborators who explored and contacted your portfolio
            </p>
          </div>
          <button
            onClick={() => onNavigateSection('messages')}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Manage All Messages & Leads
          </button>
        </div>

        {identifiedVisitors.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-xs">
            No identified visitors yet. When recruiters, peers, or clients interact with the contact system, their identity will be listed here.
          </div>
        ) : (
          <>
            {/* Mobile Cards (Phones < 640px) */}
            <div className="sm:hidden space-y-2.5">
              {identifiedVisitors.slice(0, 8).map((inq: any) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateSection('messages')}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border-2 border-stone-900/60 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] space-y-1.5 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 dark:text-stone-100 block">
                        {inq.name || inq.fullName}
                      </span>
                      {inq.company && inq.company !== 'Direct Visitor' && (
                        <span className="text-[10px] text-stone-500 font-mono">
                          {inq.company}
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      inq.status === 'NEW'
                        ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                    }`}>
                      {inq.status || 'LOGGED'}
                    </span>
                  </div>
                  <div className="text-xs text-stone-700 dark:text-stone-300 font-medium line-clamp-1">
                    {inq.subject || inq.message}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono pt-0.5">
                    <span className="truncate max-w-[170px]">{inq.email}</span>
                    <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table (Tablet/Desktop >= 640px) */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-stone-900/40 dark:border-stone-700">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-900/90 border-b-2 border-stone-900/30 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-bold">
                    <th className="py-2.5 px-3">Visitor Name</th>
                    <th className="py-2.5 px-3">Organization / Company</th>
                    <th className="py-2.5 px-3">Interaction Type</th>
                    <th className="py-2.5 px-3">Subject / Note</th>
                    <th className="py-2.5 px-3">Device</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800">
                  {identifiedVisitors.slice(0, 8).map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-stone-900 dark:text-stone-100">
                        <div className="font-bold">{inq.name || inq.fullName}</div>
                        <div className="text-[11px] text-stone-500 font-mono">{inq.email}</div>
                      </td>
                      <td className="py-2.5 px-3 text-stone-600 dark:text-stone-400">
                        {inq.company || '—'}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-[11px] border border-stone-300 dark:border-stone-700">
                          {inq.type || inq.inquiryType || 'Direct Inquiry'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-stone-800 dark:text-stone-200 max-w-xs truncate" title={inq.message}>
                        {inq.subject || inq.message}
                      </td>
                      <td className="py-2.5 px-3 text-stone-500 font-mono text-[11px]">
                        {inq.device || 'Desktop'}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          inq.status === 'NEW' 
                            ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' 
                            : 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                        }`}>
                          {inq.status || 'RECORDED'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-stone-500 font-mono text-[11px]">
                        {new Date(inq.createdAt).toLocaleDateString()} {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;
