import React, { useState, useEffect } from 'react';
import { Download, Trash2, Mail, Users, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export const SubscribersSection: React.FC = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = () => {
    setLoading(true);
    api.getSubscribers()
      .then((res: any) => {
        if (res && res.data) setSubscribers(res.data);
        else if (Array.isArray(res)) setSubscribers(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this subscriber?')) return;
    try {
      await api.deleteSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to remove subscriber.');
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert('No subscribers to export.');
      return;
    }
    const headers = ['Email', 'Name', 'Subscribed Date', 'Active Status'];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${new Date(s.createdAt).toISOString()}"`,
      `"${s.isActive ? 'Active' : 'Unsubscribed'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Newsletter Subscribers
          </h2>
          <p className="text-xs text-stone-500">
            Manage your audience for new technical articles and portfolio releases.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Subscribers CSV</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading subscribers...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Users className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Subscribers Yet</h4>
            <p className="text-xs text-stone-400">Visitors who subscribe to your technical digest will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-stone-900 dark:text-stone-100">
                      {s.email}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                      {s.name || '—'}
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.isActive
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {s.isActive ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribersSection;
