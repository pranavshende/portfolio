import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Loader2, Globe, Mail, Github, Linkedin, FileText } from 'lucide-react';
import { api } from '@/lib/api';

export const SettingsSection: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    siteName: 'Pranav Shende Portfolio',
    heroGreeting: "Hi there! I'm Pranav 👋",
    heroBio: 'An aspiring forward deployed engineer dedicated to building scalable backend architectures and AI solutions.',
    contactEmail: 'pranavshende97@gmail.com',
    githubUrl: 'https://github.com/PranavShende',
    linkedinUrl: 'https://linkedin.com/in/pranavshende',
    resumeDriveUrl: 'https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing',
    maintenanceMode: false,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await api.updateSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update website settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
          Website Settings & Profiles
        </h2>
        <p className="text-xs text-stone-500">
          Global configuration for portfolio titles, social destinations, and contact routing.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs max-w-3xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Site Brand Name
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              Hero Heading
            </label>
            <input
              type="text"
              value={formData.heroGreeting}
              onChange={(e) => setFormData({ ...formData, heroGreeting: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
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
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-stone-200 dark:border-stone-800">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
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
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
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
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
            />
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
            {saved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Settings updated
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? 'Updating...' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;
