import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Award, ExternalLink, Loader2, X, FileCheck } from 'lucide-react';
import { api } from '@/lib/api';

const ACHIEVEMENT_TYPES = ['PUBLICATION', 'HACKATHON', 'CERTIFICATION', 'AWARD', 'OTHER'];

export const AchievementsSection: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAch, setCurrentAch] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    type: 'PUBLICATION',
    description: '',
    url: '',
    displayOrder: 0,
  });

  const fetchAchievements = () => {
    setLoading(true);
    api.getContent('achievements')
      .then((res: any) => {
        if (res && res.data) setAchievements(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenCreate = () => {
    setCurrentAch(null);
    setFormData({
      title: '',
      issuer: 'IEEE',
      date: '2025-05',
      type: 'PUBLICATION',
      description: '',
      url: '',
      displayOrder: achievements.length,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (ach: any) => {
    setCurrentAch(ach);
    setFormData({
      title: ach.title || '',
      issuer: ach.issuer || '',
      date: ach.date ? new Date(ach.date).toISOString().slice(0, 7) : '',
      type: ach.type || 'PUBLICATION',
      description: ach.description || '',
      url: ach.url || '',
      displayOrder: ach.displayOrder ?? 0,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Achievement title is required.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      date: formData.date ? new Date(formData.date) : new Date(),
      displayOrder: Number(formData.displayOrder) || 0,
    };

    try {
      if (currentAch) {
        await api.updateAchievement(currentAch.id, payload);
      } else {
        await api.createAchievement(payload);
      }
      setIsEditing(false);
      fetchAchievements();
    } catch (err: any) {
      alert(err.message || 'Failed to save achievement.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await api.deleteAchievement(id);
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete achievement.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Achievements & Publications
          </h2>
          <p className="text-xs text-stone-500">
            Showcase IEEE conference research papers, hackathon wins, honors, and certifications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading achievements...</p>
          </div>
        ) : achievements.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Award className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Achievements Recorded</h4>
            <p className="text-xs text-stone-400">Add IEEE papers or competition awards.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 font-mono text-[10px] font-bold">
                      {ach.type}
                    </span>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {ach.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                    <span>{ach.issuer}</span>
                    <span>•</span>
                    <span>{new Date(ach.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                  </div>
                  {ach.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {ach.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {ach.url && (
                    <a
                      href={ach.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                      title="Verify publication / certificate link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(ach)}
                    className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(ach.id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievement Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#16171d] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {currentAch ? 'Edit Achievement' : 'Add Achievement'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. CNN Based Classification of Lumpy Skin Disease"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Issuer / Conference / Journal
                  </label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="IEEE 4th OPJU Conference"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-medium"
                  >
                    {ACHIEVEMENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Date (YYYY-MM)
                  </label>
                  <input
                    type="month"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Verification / DOI URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://doi.org/10.1109/..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Description / Synopsis
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of research contribution or award context..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#8b2323] text-white text-xs font-semibold hover:bg-[#721c1c] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;
