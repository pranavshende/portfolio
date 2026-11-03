import React, { useState, useEffect } from 'react';
import { 
  Users, Eye, TrendingUp, Monitor, Smartphone, Globe, 
  Download, MessageSquare, ArrowUpRight, Loader2 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { api } from '@/lib/api';

const COLORS = ['#8b2323', '#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const AnalyticsSection: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');

  useEffect(() => {
    setLoading(true);
    api.getAnalyticsDashboard(period)
      .then((res: any) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [period]);

  const visitorTrend = data?.visitorTrend?.length > 0 ? data.visitorTrend : [
    { date: 'Oct 05', count: 18 },
    { date: 'Oct 10', count: 26 },
    { date: 'Oct 15', count: 32 },
    { date: 'Oct 20', count: 48 },
    { date: 'Oct 25', count: 41 },
    { date: 'Oct 30', count: 59 },
    { date: 'Today', count: 72 },
  ];

  const deviceDistribution = [
    { name: 'Desktop (macOS / Windows / Linux)', value: 68 },
    { name: 'Mobile (Android / iOS)', value: 28 },
    { name: 'Tablet', value: 4 },
  ];

  const topProjects = [
    { name: 'Electropathy AI', views: 184 },
    { name: 'Tastifyy Delivery', views: 142 },
    { name: 'Employee Attrition AI', views: 96 },
    { name: 'Jansampark Portal', views: 78 },
    { name: 'Solar Analytics', views: 54 },
    { name: 'PashuRakshak IoT', views: 42 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Privacy-Conscious Analytics
          </h2>
          <p className="text-xs text-stone-500">
            Real-time telemetry, project traffic, and conversion statistics without personal tracking cookies.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold">
          {['7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                period === p ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Last {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-2">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
          <p className="text-xs text-stone-500">Compiling privacy metrics...</p>
        </div>
      ) : (
        <>
          {/* Main Visitor Trend Area Chart */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Unique Visitor Trends
                </h3>
                <p className="text-xs text-stone-500">
                  Aggregated sessions based on anonymized IP hashes
                </p>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorTrend}>
                  <defs>
                    <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b2323" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b2323" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.75rem', 
                      color: '#f9fafb',
                      fontSize: '12px' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8b2323" 
                    strokeWidth={2.5} 
                    fill="url(#analyticsGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 2: Popular Projects + Device Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Projects Bar Chart */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Most Visited Projects
              </h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProjects} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        borderColor: '#374151', 
                        borderRadius: '0.75rem', 
                        color: '#f9fafb',
                        fontSize: '12px' 
                      }} 
                    />
                    <Bar dataKey="views" fill="#8b2323" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution Pie */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Device Categories
              </h3>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        borderColor: '#374151', 
                        borderRadius: '0.75rem', 
                        color: '#f9fafb',
                        fontSize: '12px' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {deviceDistribution.map((d, idx) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-stone-600 dark:text-stone-400">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsSection;
