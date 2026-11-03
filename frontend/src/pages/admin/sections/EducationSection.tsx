import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, Calendar, Loader2, X } from 'lucide-react';
import { api } from '@/lib/api';

export const EducationSection: React.FC = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: 2022,
    endYear: 2026,
    grade: '',
    description: '',
    displayOrder: 0,
  });

  const fetchEducation = () => {
    setLoading(true);
    api.getContent('education')
      .then((res: any) => {
        if (res && res.data) setEducations(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenCreate = () => {
    setCurrentEdu(null);
    setFormData({
      institution: 'St. Vincent Pallotti College of Engineering and Technology',
      degree: 'B.Tech',
      field: 'Information Technology',
      startYear: 2022,
      endYear: 2026,
      grade: '',
      description: '',
      displayOrder: educations.length,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (edu: any) => {
    setCurrentEdu(edu);
    setFormData({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field: edu.field || '',
      startYear: edu.startYear ?? 2022,
      endYear: edu.endYear ?? 2026,
      grade: edu.grade || '',
      description: edu.description || '',
      displayOrder: edu.displayOrder ?? 0,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institution.trim() || !formData.degree.trim()) {
      alert('Institution and Degree are required.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      startYear: Number(formData.startYear),
      endYear: formData.endYear ? Number(formData.endYear) : null,
      displayOrder: Number(formData.displayOrder) || 0,
    };

    try {
      if (currentEdu) {
        await api.updateEducation(currentEdu.id, payload);
      } else {
        await api.createEducation(payload);
      }
      setIsEditing(false);
      fetchEducation();
    } catch (err: any) {
      alert(err.message || 'Failed to save education.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await api.deleteEducation(id);
      setEducations((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete education.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Education
          </h2>
          <p className="text-xs text-stone-500">
            Manage academic background, degrees, coursework, and college details.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading academic records...</p>
          </div>
        ) : educations.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <GraduationCap className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Education Entries</h4>
            <p className="text-xs text-stone-400">Add your university degree details.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {educations.map((edu) => (
              <div key={edu.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {edu.degree} in {edu.field}
                    </span>
                    {edu.grade && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        CGPA: {edu.grade}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                    {edu.institution}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{edu.startYear} – {edu.endYear || 'Present'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(edu)}
                    className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(edu.id)}
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

      {/* Education Modal */}
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
              {currentEdu ? 'Edit Education' : 'Add Education'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Institution / University *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="St. Vincent Pallotti College of Engineering"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Degree *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="B.Tech"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    placeholder="Information Technology"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    End Year
                  </label>
                  <input
                    type="number"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    CGPA / Grade
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="8.5 / 10"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
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
                  {saving ? 'Saving...' : 'Save Education'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
