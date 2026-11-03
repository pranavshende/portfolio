import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, Loader2, X } from 'lucide-react';
import { api } from '@/lib/api';

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    employmentType: 'Full-time',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    responsibilities: '',
    displayOrder: 0,
  });

  const fetchExperience = () => {
    setLoading(true);
    api.getContent('experience')
      .then((res: any) => {
        if (res && res.data) setExperiences(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleOpenCreate = () => {
    setCurrentExp(null);
    setFormData({
      company: '',
      role: '',
      employmentType: 'Full-time',
      location: 'Nagpur, India',
      startDate: '2025-01',
      endDate: '',
      isCurrent: true,
      description: '',
      responsibilities: '',
      displayOrder: experiences.length,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (exp: any) => {
    setCurrentExp(exp);
    setFormData({
      company: exp.company || '',
      role: exp.role || '',
      employmentType: exp.employmentType || 'Full-time',
      location: exp.location || '',
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().slice(0, 7) : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 7) : '',
      isCurrent: exp.isCurrent ?? false,
      description: exp.description || '',
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : '',
      displayOrder: exp.displayOrder ?? 0,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      alert('Company and Role are required.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      responsibilities: formData.responsibilities
        ? formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
      endDate: formData.isCurrent ? null : formData.endDate ? new Date(formData.endDate) : null,
      displayOrder: Number(formData.displayOrder) || 0,
    };

    try {
      if (currentExp) {
        await api.updateExperience(currentExp.id, payload);
      } else {
        await api.createExperience(payload);
      }
      setIsEditing(false);
      fetchExperience();
    } catch (err: any) {
      alert(err.message || 'Failed to save experience.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await api.deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete experience.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Work Experience & Internships
          </h2>
          <p className="text-xs text-stone-500">
            Manage your employment history, engineering internships, and key responsibilities.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading experience history...</p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Experience Records</h4>
            <p className="text-xs text-stone-400">Add your internships or full-time roles.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {exp.role}
                    </span>
                    <span className="text-xs font-semibold text-[#8b2323] dark:text-rose-400">
                      @ {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Present
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} –{' '}
                      {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(exp)}
                    className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(exp.id)}
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

      {/* Experience Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#16171d] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {currentExp ? 'Edit Experience' : 'Add Experience'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. NK SkillEdge"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Full Stack Engineering Intern"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nagpur, India"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    placeholder="Internship / Full-time"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Start Month (YYYY-MM)
                  </label>
                  <input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    End Month (or Current)
                  </label>
                  <input
                    type="month"
                    disabled={formData.isCurrent}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrent"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="rounded text-[#8b2323]"
                />
                <label htmlFor="isCurrent" className="text-xs font-medium cursor-pointer">
                  Currently working in this role
                </label>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Key Responsibilities & Impact (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Engineered high-throughput REST APIs using Express and TypeScript&#10;Integrated Kafka streaming pipeline"
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
                  {saving ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
