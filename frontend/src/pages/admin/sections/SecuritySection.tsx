import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export const SecuritySection: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await api.changePassword({ currentPassword, newPassword });
      setMessage({ type: 'success', text: 'Admin password updated securely.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
            [セキュリティ]
          </span>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Security Settings & Credentials
          </h2>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Manage admin access credentials, password policies, and rate-limiting guardrails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Change Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#8b2323]" />
              <span>Update Admin Password</span>
            </h3>
            <p className="text-xs text-stone-500">
              Ensure you use a strong password with at least 8 characters.
            </p>
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-600 shadow-[2px_2px_0px_#059669]' 
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-600 shadow-[2px_2px_0px_#dc2626]'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span className="font-bold">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>{loading ? 'Updating Credentials...' : 'Save New Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Security Overview & Policies */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Security Safeguards</span>
            </h3>
            <p className="text-xs text-stone-500">
              Overview of protection mechanisms active on the portfolio backend
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#faf7f0] dark:bg-[#1d1f27] border-2 border-stone-900/40 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] space-y-1">
              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                <span>Brute-Force Rate Limiting</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-500">ACTIVE</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                Auth endpoints are strictly rate limited to 5 attempts per 15 minutes per IP address.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf7f0] dark:bg-[#1d1f27] border-2 border-stone-900/40 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] space-y-1">
              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                <span>HTTP-Only Secure Cookies</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-500">ACTIVE</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                Tokens are stored in SameSite=Strict HTTP-only cookies to prevent XSS credential exfiltration.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf7f0] dark:bg-[#1d1f27] border-2 border-stone-900/40 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] space-y-1">
              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                <span>Contact Honeypot & Spam Prevention</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-500">ACTIVE</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                Automated bots are filtered before triggering dual email dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
