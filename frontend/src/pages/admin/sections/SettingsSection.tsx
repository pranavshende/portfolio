import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Loader2, Globe, Mail, Github, Linkedin, User, Shield } from 'lucide-react';
import { api } from '@/lib/api';

export const SettingsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Admin Profile State
  const [profileData, setProfileData] = useState({
    name: 'Pranav Shende',
    email: 'pranavshende97@gmail.com',
    role: 'SUPER_ADMIN',
  });

  // Website Settings State
  const [formData, setFormData] = useState({
    siteName: 'Pranav Shende Portfolio',
    heroGreeting: "Hi there! I'm Pranav 👋",
    heroBio: 'An aspiring forward deployed engineer dedicated to building scalable backend architectures and AI solutions.',
    contactEmail: 'pranavshende97@gmail.com',
    githubUrl: 'https://github.com/PranavShende',
    linkedinUrl: 'https://linkedin.com/in/pranavshende',
    resumeDriveUrl: 'https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing',
    maintenanceMode: false,
    hideBlogThumbnailsOnHome: false,
  });

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.getSettings().catch(() => null),
      api.getAdminMe().catch(() => null),
    ]).then(([settingsRes, adminRes]) => {
      if (!mounted) return;
      if (settingsRes && (settingsRes.data || settingsRes.siteName)) {
        const s = settingsRes.data || settingsRes;
        setFormData((prev) => ({
          ...prev,
          ...s,
        }));
      }
      if (adminRes && (adminRes.data || adminRes.admin)) {
        const a = adminRes.data || adminRes.admin;
        setProfileData({
          name: a.name || 'Pranav Shende',
          email: a.email || 'pranavshende97@gmail.com',
          role: a.role || 'SUPER_ADMIN',
        });
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setErrorMsg(null);

    try {
      // 1. Update Website Settings
      await api.updateSettings(formData);

      try {
        localStorage.setItem('site_settings', JSON.stringify(formData));
      } catch {}

      // 2. Update Admin Profile
      await api.updateAdminProfile({
        name: profileData.name,
        email: profileData.email,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err: any) {
      console.error('Failed to save settings/profile:', err);
      setErrorMsg(err.message || 'Failed to update website settings and profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
            [全体設定]
          </span>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Website Settings & Profiles
          </h2>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Global configuration for portfolio titles, social destinations, and administrator profile credentials.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center space-y-2">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
          <p className="text-xs text-stone-500">Loading settings and administrator profile...</p>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] max-w-3xl">
          <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
            
            {/* ── Section A: Administrator Profile ── */}
            <div className="space-y-3 pb-4 border-b-2 border-stone-900/10 dark:border-stone-700">
              <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-sm">
                <User className="w-4 h-4 text-[#8b2323]" />
                <span>Administrator Profile</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Admin Account Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>
            </div>

            {/* ── Section B: Public Website Branding & Content ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-sm">
                <Globe className="w-4 h-4 text-[#8b2323]" />
                <span>Public Portfolio Configuration</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Site Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Public Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Hero Heading Greeting
                </label>
                <input
                  type="text"
                  value={formData.heroGreeting}
                  onChange={(e) => setFormData({ ...formData, heroGreeting: e.target.value })}
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Hero Bio Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.heroBio}
                  onChange={(e) => setFormData({ ...formData, heroBio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs leading-relaxed shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t-2 border-stone-900/10 dark:border-stone-700">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Google Drive Resume Folder URL
                </label>
                <input
                  type="url"
                  value={formData.resumeDriveUrl}
                  onChange={(e) => setFormData({ ...formData, resumeDriveUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-2 border-red-800 text-xs shadow-[2px_2px_0px_#8b2323]">
                {errorMsg}
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t-2 border-stone-900/10 dark:border-stone-700">
              {saved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Settings & profile updated live in database
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? 'Saving Changes...' : 'Save Settings & Profile'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;
