import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { api, setStoredToken, getStoredToken } from '@/lib/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

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
      const authToken = res?.token || res?.data?.token;
      if (authToken) {
        setStoredToken(authToken, rememberMe);
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#faf7f0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 select-none relative overflow-hidden font-sans bg-[radial-gradient(#d6cec0_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#2b2e38_1.25px,transparent_1.25px)] [background-size:18px_18px]">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] space-y-6"
      >
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#8b2323] text-white border-2 border-stone-900 flex items-center justify-center shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                [管理]
              </span>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50">
                Admin Workspace
              </h1>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Sign in to manage projects, technical articles, leads & system settings.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border-2 border-red-800/40 text-red-700 dark:text-red-300 text-xs shadow-[2px_2px_0px_#8b2323]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <p className="leading-relaxed font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pranavshende97@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-[#faf7f0]/60 dark:bg-[#1a1b24] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-[#8b2323] shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-sm font-medium"
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
              <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-[#faf7f0]/60 dark:bg-[#1a1b24] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-[#8b2323] shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-600 dark:text-stone-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-2 border-stone-900 text-[#8b2323] focus:ring-0"
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold transition-all border-2 border-stone-900 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
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
