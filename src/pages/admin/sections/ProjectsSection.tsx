import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, ExternalLink, Github, Eye, EyeOff, 
  Star, MoveUp, MoveDown, Check, X, Loader2, Sparkles 
} from 'lucide-react';
import { api } from '@/lib/api';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    client: '',
    category: '',
    year: '2026',
    description: '',
    problem: '',
    solution: '',
    architecture: '',
    techStack: '',
    keyFeatures: '',
    githubUrl: '',
    liveDemoUrl: '',
    thumbnailUrl: '',
    badge: '',
    displayOrder: 0,
    isFeatured: true,
    isPublished: true,
  });

  const fetchProjects = () => {
    setLoading(true);
    api.getProjects()
      .then((res: any) => {
        if (res && res.data) {
          setProjects(res.data);
        } else if (Array.isArray(res)) {
          setProjects(res);
        }
      })
      .catch((err) => console.error('Error fetching projects:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      subtitle: '',
      client: '',
      category: '',
      year: '2026',
      description: '',
      problem: '',
      solution: '',
      architecture: '',
      techStack: '',
      keyFeatures: '',
      githubUrl: '',
      liveDemoUrl: '',
      thumbnailUrl: '',
      badge: '',
      displayOrder: projects.length,
      isFeatured: true,
      isPublished: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (proj: any) => {
    setCurrentProject(proj);
    setFormData({
      title: proj.title || '',
      subtitle: proj.subtitle || '',
      client: proj.client || '',
      category: proj.category || '',
      year: proj.year || '2026',
      description: proj.description || '',
      problem: proj.problem || '',
      solution: proj.solution || '',
      architecture: proj.architecture || '',
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || '',
      keyFeatures: Array.isArray(proj.keyFeatures) ? proj.keyFeatures.join('\n') : proj.keyFeatures || '',
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.liveDemoUrl || '',
      thumbnailUrl: proj.thumbnailUrl || '',
      badge: proj.badge || '',
      displayOrder: proj.displayOrder ?? 0,
      isFeatured: proj.isFeatured ?? true,
      isPublished: proj.isPublished ?? true,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project Title is required.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      techStack: formData.techStack
        ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      keyFeatures: formData.keyFeatures
        ? formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      displayOrder: Number(formData.displayOrder) || 0,
    };

    try {
      if (currentProject) {
        await api.updateProject(currentProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setIsEditing(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Projects CMS
          </h2>
          <p className="text-xs text-stone-500">
            Create, edit, reorder & publish showcase applications directly to the public portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-stone-700 dark:text-stone-300">No Projects Configured</p>
            <p className="text-xs text-stone-400">Click "Add New Project" to create your first portfolio entry.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Project Title & Client</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {projects.map((proj, idx) => (
                  <tr key={proj.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-stone-400">
                      #{proj.displayOrder ?? idx + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div>
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                          {proj.title}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {proj.client} • {proj.year}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-[11px]">
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(proj.techStack) ? proj.techStack : []).slice(0, 3).map((t: string) => (
                          <span key={t} className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-600 dark:text-stone-400 font-mono">
                            {t}
                          </span>
                        ))}
                        {(proj.techStack?.length || 0) > 3 && (
                          <span className="text-[10px] text-stone-400">+{proj.techStack.length - 3}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.isPublished
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-stone-100 text-stone-500'
                        }`}>
                          {proj.isPublished ? 'Published' : 'Draft'}
                        </span>
                        {proj.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {proj.liveDemoUrl && (
                          <a
                            href={proj.liveDemoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                            title="Open live app"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                          title="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-auto">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#16171d] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {currentProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <p className="text-xs text-stone-500">
                Update project metadata, architecture breakdown & showcase URLs.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Electropathy AI"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Subtitle / Headline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Agentic Clinical RAG Copilot"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Client / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Dr. Ashish Wandhare"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Agentic AI & Healthcare"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Year / Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Production 2026"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive technical breakdown of the system..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Key Achievements & Features (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  placeholder="Option A RAG Knowledge Assistant with zero hallucinations&#10;pgvector high-dimensional embeddings"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Agentic RAG, pgvector, Prisma ORM, TypeScript, Node.js"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/pranavshende/..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Badge Pill
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Live Production"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Display Order (Rank)
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="space-y-2 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-[#8b2323]"
                    />
                    <span>Featured on Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded text-[#8b2323]"
                    />
                    <span>Published to Website</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
