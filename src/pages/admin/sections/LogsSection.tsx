import React, { useState, useEffect } from 'react';
import { History, Shield, Clock, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export const LogsSection: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getActivityLogs()
      .then((res: any) => {
        if (res && res.data) setLogs(res.data);
        else if (Array.isArray(res)) setLogs(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
          Activity & Audit Logs
        </h2>
        <p className="text-xs text-stone-500">
          Immutable audit trail recording administrative logins, project updates, and system operations.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Fetching audit log...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <History className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Historical Logs Yet</h4>
            <p className="text-xs text-stone-400">Actions taken inside the admin panel will be logged here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Resource Target</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-mono">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/50">
                    <td className="py-3 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100 font-sans">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400 font-sans">
                      {log.resource} {log.resourceId ? `(#${log.resourceId.slice(0, 8)})` : ''}
                    </td>
                    <td className="py-3 px-4 text-stone-500 text-[11px]">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-sans">
                        SUCCESS
                      </span>
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

export default LogsSection;
