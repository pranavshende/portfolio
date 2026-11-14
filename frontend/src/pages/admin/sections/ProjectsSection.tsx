import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, ExternalLink, Github, Eye, EyeOff, 
  Star, Image as ImageIcon, Upload, X, Loader2, Sparkles, CheckCircle2,
  FolderGit2, Layers, AlertCircle, ArrowUpDown
} from 'lucide-react';
import { api } from '@/lib/api';

interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  subtitle?: string;
  client?: string;
  category?: string;
  year?: string;
  description: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  techStack?: string[];
  highlights?: string[];
  keyFeatures?: string[];
  githubUrl?: string;
  demoUrl?: string;
  liveDemoUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  badge?: string;
  orderIndex?: number;
  displayOrder?: number;
  featured?: boolean;
  isFeatured?: boolean;
  published?: boolean;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
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
    displayOrder: 1,
    isFeatured: true,
    isPublished: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchProjects = () => {
    setLoading(true);
    // Use getAdminProjects so drafts and unpublished entries are accessible
    api.getAdminProjects()
      .then((res: any) => {
        if (res && res.data && Array.isArray(res.data)) {
          setProjects(res.data);
        } else if (Array.isArray(res)) {
          setProjects(res);
        } else {
          // Fallback to public list if admin endpoint unavailable
          return api.getProjects().then((pubRes: any) => {
            if (pubRes && pubRes.data && Array.isArray(pubRes.data)) {
              setProjects(pubRes.data);
            }
          });
        }
      })
      .catch((err) => {
        console.warn('Admin projects fetch failed, trying public endpoint:', err);
        api.getProjects()
          .then((pubRes: any) => {
            if (pubRes && pubRes.data && Array.isArray(pubRes.data)) {
              setProjects(pubRes.data);
            }
          })
          .catch((e) => console.error('Error fetching projects:', e));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if user hasn't explicitly set a custom one or when creating
      slug: !currentProject || !prev.slug ? generateSlug(val) : prev.slug,
    }));
  };

  // Image Upload with client-side canvas compression to WebP (<250KB Base64 data URL)
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1280;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to WebP with 0.84 quality
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.84);
          setFormData((prev) => ({ ...prev, thumbnailUrl: compressedDataUrl }));
        }
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setCurrentProject(null);
    const nextOrder = projects.length > 0 
      ? Math.max(...projects.map(p => p.orderIndex ?? p.displayOrder ?? 0)) + 1 
      : 1;

    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      client: '',
      category: 'Enterprise AI & Architecture',
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
      badge: 'Live Enterprise',
      displayOrder: nextOrder,
      isFeatured: true,
      isPublished: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setCurrentProject(proj);
    const features = proj.highlights || proj.keyFeatures || [];
    const tech = proj.techStack || [];

    setFormData({
      title: proj.title || '',
      slug: proj.slug || generateSlug(proj.title || ''),
      subtitle: proj.subtitle || '',
      client: proj.client || '',
      category: proj.category || '',
      year: proj.year || '2026',
      description: proj.description || '',
      problem: proj.problem || '',
      solution: proj.solution || '',
      architecture: proj.architecture || '',
      techStack: Array.isArray(tech) ? tech.join(', ') : String(tech || ''),
      keyFeatures: Array.isArray(features) ? features.join('\n') : String(features || ''),
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.demoUrl || proj.liveDemoUrl || '',
      thumbnailUrl: proj.bannerUrl || proj.thumbnailUrl || '',
      badge: proj.badge || '',
      displayOrder: proj.orderIndex ?? proj.displayOrder ?? 1,
      isFeatured: proj.featured ?? proj.isFeatured ?? true,
      isPublished: proj.published ?? proj.isPublished ?? true,
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
    const slug = formData.slug.trim() || generateSlug(formData.title);
    const bannerUrl = formData.thumbnailUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    
    const parsedTechStack = formData.techStack
      ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    
    const parsedFeatures = formData.keyFeatures
      ? formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    const orderIndex = Number(formData.displayOrder) || 1;
    const isPub = Boolean(formData.isPublished);
    const isFeat = Boolean(formData.isFeatured);

    // Multi-aliased payload to satisfy both backend schema and database Prisma models
    const payload = {
      title: formData.title.trim(),
      slug,
      subtitle: formData.subtitle.trim() || formData.title.trim(),
      client: formData.client.trim() || 'Engineering Platform',
      category: formData.category.trim() || 'Software Engineering',
      year: formData.year.trim() || '2026',
      description: formData.description.trim() || formData.subtitle.trim() || formData.title.trim(),
      problem: formData.problem.trim() || undefined,
      solution: formData.solution.trim() || undefined,
      architecture: formData.architecture.trim() || undefined,
      techStack: parsedTechStack,
      highlights: parsedFeatures,
      keyFeatures: parsedFeatures,
      githubUrl: formData.githubUrl.trim() || undefined,
      demoUrl: formData.liveDemoUrl.trim() || undefined,
      liveDemoUrl: formData.liveDemoUrl.trim() || undefined,
      bannerUrl,
      thumbnailUrl: bannerUrl,
      badge: formData.badge.trim() || undefined,
      orderIndex,
      displayOrder: orderIndex,
      published: isPub,
      isPublished: isPub,
      featured: isFeat,
      isFeatured: isFeat,
    };

    try {
      if (currentProject) {
        await api.updateProject(currentProject.id, payload);
        showToast('Project updated successfully.');
      } else {
        await api.createProject(payload);
        showToast('New project created and published.');
      }
      setIsEditing(false);
      fetchProjects();
    } catch (err: any) {
      console.error('Failed to save project:', err);
      alert(err.message || 'Failed to save project. Please check all fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project deleted.');
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  // Stats calculation
  const totalProjects = projects.length;
  const publishedCount = projects.filter((p) => (p.published ?? p.isPublished) !== false).length;
  const draftCount = totalProjects - publishedCount;
  const featuredCount = projects.filter((p) => (p.featured ?? p.isFeatured) === true).length;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xl border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
              [プロジェクト]
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Projects CMS</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-mono font-bold">
                {totalProjects} Total
              </span>
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Create, edit, reorder & publish showcase applications directly to your public portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000] transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">All Projects</span>
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {totalProjects}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Live Published</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {publishedCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Featured (Home)</span>
            <Star className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-2">
            {featuredCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Drafts</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-600 dark:text-stone-400 mt-2">
            {draftCount}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading projects from database...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-stone-700 dark:text-stone-300">No Projects Configured</p>
            <p className="text-xs text-stone-400">Click "Add New Project" to create your first portfolio entry.</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View (<640px) */}
            <div className="sm:hidden divide-y divide-stone-100 dark:divide-stone-800">
              {projects.map((proj, idx) => {
                const isPub = (proj.published ?? proj.isPublished) !== false;
                const isFeat = (proj.featured ?? proj.isFeatured) === true;
                const rank = proj.orderIndex ?? proj.displayOrder ?? idx + 1;
                const banner = proj.bannerUrl || proj.thumbnailUrl;

                return (
                  <div key={proj.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      {banner && (
                        <img 
                          src={banner} 
                          alt={proj.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="w-16 aspect-video rounded-lg object-cover bg-stone-100 border border-stone-200 dark:border-stone-700 shrink-0" 
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-stone-400 font-bold">#{rank}</span>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {proj.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-500">
                          {proj.client || 'Engineering Platform'} • {proj.year || '2026'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isPub
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {isPub ? 'Live Published' : 'Draft'}
                      </span>
                      {isFeat && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                      {proj.category && (
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] truncate max-w-[140px]">
                          {proj.category}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-stone-700 dark:text-stone-300 px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 ml-auto">
                        <Eye className="w-2.5 h-2.5 text-[#8b2323] dark:text-rose-400 shrink-0" />
                        <span>{proj.viewCount || 0}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800/60">
                      <div className="flex items-center gap-2">
                        {(proj.demoUrl || proj.liveDemoUrl) && (
                          <a
                            href={proj.demoUrl || proj.liveDemoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Demo</span>
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(proj)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (>=640px) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">Rank</th>
                    <th className="py-3 px-4">Project Title & Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Tech Stack</th>
                    <th className="py-3 px-4 text-center">Views</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  {projects.map((proj, idx) => {
                    const isPub = (proj.published ?? proj.isPublished) !== false;
                    const isFeat = (proj.featured ?? proj.isFeatured) === true;
                    const rank = proj.orderIndex ?? proj.displayOrder ?? idx + 1;
                    const banner = proj.bannerUrl || proj.thumbnailUrl;
                    const tech = Array.isArray(proj.techStack) ? proj.techStack : [];

                    return (
                      <tr key={proj.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-stone-400 text-center">
                          #{rank}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {banner ? (
                              <img 
                                src={banner} 
                                alt={proj.title}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
                                }}
                                className="w-14 aspect-video rounded-md object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0" 
                              />
                            ) : (
                              <div className="w-14 aspect-video rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 shrink-0">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm line-clamp-1">
                                {proj.title}
                              </div>
                              <div className="text-[11px] text-stone-500 line-clamp-1">
                                {proj.client || 'Engineering Platform'} • {proj.year || '2026'} {proj.slug ? `(/${proj.slug})` : ''}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-[11px] whitespace-nowrap">
                            {proj.category || 'Engineering'}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {tech.slice(0, 3).map((t: string) => (
                              <span key={t} className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-600 dark:text-stone-400 font-mono">
                                {t}
                              </span>
                            ))}
                            {tech.length > 3 && (
                              <span className="text-[10px] text-stone-400 font-mono">+{tech.length - 3}</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                            <Eye className="w-3 h-3 text-[#8b2323] dark:text-rose-400 shrink-0" />
                            <span>{proj.viewCount || 0}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPub
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                            }`}>
                              {isPub ? 'Published' : 'Draft'}
                            </span>
                            {isFeat && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-current" /> Featured
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {(proj.demoUrl || proj.liveDemoUrl) && (
                              <a
                                href={proj.demoUrl || proj.liveDemoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                                title="Open live app"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                                title="Open repository"
                              >
                                <Github className="w-4 h-4" />
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
                              onClick={() => handleDelete(proj.id, proj.title)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Project Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs select-auto overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-[#faf7f0] dark:bg-[#16171d] rounded-2xl sm:rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] p-5 sm:p-7 space-y-5 my-auto">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                  [編集]
                </span>
                <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {currentProject ? 'Edit Project' : 'Create New Project'}
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Update project metadata, architecture breakdown, live URLs, and cover image.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Jarvis AI: Enterprise Intelligence Platform"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs sm:text-sm shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    URL Identifier / Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. jarvis-mcp-multipledbs"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Subtitle / Technical Headline
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Autonomous Enterprise Intelligence • MCP Protocol & Deterministic SQL"
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs sm:text-sm shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Row 3: Client, Category, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Client / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Meridian Supply Chain / Client"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
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
                    placeholder="Enterprise AI & MCP Architecture"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Year / Status
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Production 2026"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              {/* Row 4: Thumbnail Image Upload & Preview */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white dark:bg-[#1b1c24] border-2 border-stone-900/80 dark:border-stone-700 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000]">
                <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#8b2323]" />
                    <span>Project Cover / Thumbnail Image</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Supports PNG, JPG, WebP (auto-optimized)</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* File Upload trigger */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>

                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                      placeholder="Or paste direct image URL (https://... or data:image/...)"
                      className="w-full p-2 rounded-xl border-2 border-stone-900/70 dark:border-stone-700 bg-[#faf7f0] dark:bg-[#16171d] text-xs font-mono"
                    />
                  </div>

                  {formData.thumbnailUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnailUrl: '' })}
                      className="p-2 rounded-xl border-2 border-stone-900 text-stone-600 hover:text-red-600 bg-white hover:bg-red-50 shadow-[2px_2px_0px_#1c1917]"
                      title="Clear image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Image Preview Box */}
                {formData.thumbnailUrl && (
                  <div className="mt-2 relative rounded-xl overflow-hidden border-2 border-stone-900 dark:border-stone-700 max-h-48 bg-stone-900/5 flex items-center justify-center">
                    <img
                      src={formData.thumbnailUrl}
                      alt="Thumbnail preview"
                      className="max-h-44 w-auto object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Row 5: Detailed Description */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive technical breakdown of the system, capabilities, architecture, and business impact..."
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Row 6: Key Features */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Key Achievements & Features (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  placeholder="Official Model Context Protocol (MCP v1.0.4) integration supporting Streamable HTTP&#10;Deterministic star-schema SQL calculation engine delivering zero-hallucination metrics&#10;Hybrid pgvector RAG assistant with 749+ verified operational knowledge chunks"
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Row 7: Tech Stack */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Google Gemini 2.5 Pro, Model Context Protocol (MCP), Fastify, pgvector RAG, Deterministic SQL, Supabase, Redis"
                  className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Row 8: URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/pranavshende/jarvis-mcp-multipleDBs"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
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
                    placeholder="https://jarvis.pranavshende.online/"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              {/* Row 9: Badge, Rank, Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Badge Pill
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Live Enterprise"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
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
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-2 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded border-2 border-stone-900 text-[#8b2323] focus:ring-0"
                    />
                    <span>Featured on Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded border-2 border-stone-900 text-[#8b2323] focus:ring-0"
                    />
                    <span>Published to Website</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t-2 border-stone-900/10 dark:border-stone-700 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <span>{currentProject ? 'Save Changes' : 'Create & Publish Project'}</span>
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