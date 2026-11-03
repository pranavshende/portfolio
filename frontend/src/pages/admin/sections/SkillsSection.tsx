import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Cpu, Loader2, X } from 'lucide-react';
import { api } from '@/lib/api';

const SKILL_CATEGORIES = ['Backend', 'AI & Machine Learning', 'Frontend', 'Database & Caching', 'Cloud & DevOps', 'Tools & Protocols'];

export const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Backend',
    proficiency: 'ADVANCED',
    icon: '',
    displayOrder: 0,
  });

  const fetchSkills = () => {
    setLoading(true);
    api.getContent('skills')
      .then((res: any) => {
        if (res && res.data) setSkills(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreate = () => {
    setCurrentSkill(null);
    setFormData({
      name: '',
      category: 'Backend',
      proficiency: 'ADVANCED',
      icon: '',
      displayOrder: skills.length,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (skill: any) => {
    setCurrentSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Backend',
      proficiency: skill.proficiency || 'ADVANCED',
      icon: skill.icon || '',
      displayOrder: skill.displayOrder ?? 0,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Skill name is required.');
      return;
    }

    setSaving(true);
    try {
      if (currentSkill) {
        await api.updateSkill(currentSkill.id, formData);
      } else {
        await api.createSkill(formData);
      }
      setIsEditing(false);
      fetchSkills();
    } catch (err: any) {
      alert(err.message || 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete skill.');
    }
  };

  // Group skills by category
  const groupedSkills = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Skills Management
          </h2>
          <p className="text-xs text-stone-500">
            Organize engineering proficiencies, languages, frameworks, and architecture toolkits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center space-y-2">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
          <p className="text-xs text-stone-500">Loading skills...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groupedSkills.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {group.category} ({group.items.length})
                </h3>
                <div className="flex flex-wrap gap-2 pt-3">
                  {group.items.length === 0 ? (
                    <span className="text-xs text-stone-400 italic">No skills in this category</span>
                  ) : (
                    group.items.map((skill) => (
                      <div
                        key={skill.id}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200/80 dark:border-stone-700/60"
                      >
                        <span>{skill.name}</span>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-1 transition-opacity ml-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(skill)}
                            className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(skill.id)}
                            className="text-stone-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skill Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-auto">
          <div className="relative w-full max-w-md bg-white dark:bg-[#16171d] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-4">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
              {currentSkill ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Skill / Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apache Kafka"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-medium"
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Proficiency Level
                </label>
                <select
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-medium"
                >
                  <option value="EXPERT">EXPERT</option>
                  <option value="ADVANCED">ADVANCED</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="FAMILIAR">FAMILIAR</option>
                </select>
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
                  {saving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
