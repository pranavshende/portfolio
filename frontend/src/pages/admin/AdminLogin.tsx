import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { api, setStoredToken, getStoredToken } from '@/lib/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect straight to /admin
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      api.getAdminMe()
        .then(() => {
          navigate('/admin', { replace: true });
        })
        .catch(() => {
          // Token expired or invalid, stay on login page
        });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.adminLogin({ email: email.trim(), password });
      if (res && res.token) {
        setStoredToken(res.token, rememberMe);
      }
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.status === 429) {
        setError('Too many failed login attempts. Please wait 15 minutes before trying again.');
      } else {
        setError(err.message || 'Invalid administrative credentials. Please verify your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f7f2ea] dark:bg-[#0c0d10] text-stone-900 dark:text-stone-100 select-none relative overflow-hidden font-sans">
      {/* Background Japanese Enso Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] text-stone-900 dark:text-stone-100 stroke-current fill-none stroke-[3]">
          <circle cx="50" cy="50" r="45" strokeDasharray="220 50" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-white/90 dark:bg-[#15161c]/90 backdrop-blur-xl border border-stone-800/15 dark:border-stone-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </button>

        {/* Header */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#8b2323]/10 dark:bg-[#8b2323]/20 border border-[#8b2323]/30 flex items-center justify-center text-[#8b2323] shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Admin Workspace
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Sign in to manage projects, inquiries, analytics & site configuration.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz@gmail.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-stone-50/50 dark:bg-[#1d1f27] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-stone-50/50 dark:bg-[#1d1f27] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 dark:text-stone-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-stone-400 text-[#8b2323] focus:ring-[#8b2323]"
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In as Administrator</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
