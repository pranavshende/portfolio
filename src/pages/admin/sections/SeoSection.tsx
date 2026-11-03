import React, { useState, useEffect } from 'react';
import { Globe, Search, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export const SeoSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    metaTitle: 'Pranav Shende | Full Stack Developer & AI Engineer',
    metaDescription: 'Aspiring Forward Deployed Engineer building distributed backend architectures and agentic AI systems. B.Tech IT at SVPCET.',
    keywords: 'Pranav Shende, Full Stack Developer, AI Engineer, Node.js, Express, PostgreSQL, Prisma, Kafka, Redis, Electropathy AI, Nagpur',
    ogImage: 'https://pranavshende.online/og-image.png',
    canonicalUrl: 'https://pranavshende.online',
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await api.updateSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update SEO settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
          SEO & Meta Tags Management
        </h2>
        <p className="text-xs text-stone-500">
          Configure search engine optimization, Google search appearance, and OpenGraph social previews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Page Title Tag (Recommended &lt; 60 chars)
              </label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-medium"
              />
              <span className="text-[10px] text-stone-400 font-mono">
                {formData.metaTitle.length} / 60 characters
              </span>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Meta Description (Recommended &lt; 160 chars)
              </label>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs leading-relaxed"
              />
              <span className="text-[10px] text-stone-400 font-mono">
                {formData.metaDescription.length} / 160 characters
              </span>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                SEO Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Open Graph Image URL
                </label>
                <input
                  type="url"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {saved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> SEO updated successfully
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? 'Saving...' : 'Save Meta Settings'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Live Google Search Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-blue-500" /> Google Search Preview
          </h3>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1d1f27] border border-stone-200 dark:border-stone-800 space-y-1.5">
            <div className="text-[11px] text-stone-500 font-mono truncate">
              {formData.canonicalUrl}
            </div>
            <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug">
              {formData.metaTitle}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
              {formData.metaDescription}
            </p>
          </div>

          <div className="text-[11px] text-stone-400 leading-relaxed pt-2">
            Tip: Keep your meta description under 160 characters so search engines do not truncate it in search results.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSection;
