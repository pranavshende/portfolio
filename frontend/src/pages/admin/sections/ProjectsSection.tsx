import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Plus, Edit2, Trash2, ExternalLink, Github, Eye, EyeOff, 
  Star, Image as ImageIcon, Upload, X, Loader2, Sparkles, CheckCircle2,
  FolderGit2, Layers, AlertCircle, ArrowUpDown,
  GripVertical, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, RotateCcw, Save
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
  featuredThumbnailUrl?: string;
  projectPageThumbnailUrl?: string;
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
  const [viewTab, setViewTab] = useState<'all' | 'featured' | 'published' | 'drafts' | 'order'>('all');

  // Custom Featured Projects Ordering state
  const [orderedProjects, setOrderedProjects] = useState<ProjectItem[]>([]);
  const [initialOrderedIds, setInitialOrderedIds] = useState<string[]>([]);
  const [savingOrder, setSavingOrder] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const featuredFileInputRef = useRef<HTMLInputElement>(null);
  const projectPageFileInputRef = useRef<HTMLInputElement>(null);

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
    featuredThumbnailUrl: '',
    projectPageThumbnailUrl: '',
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

  // Synchronize orderedProjects when projects are loaded
  useEffect(() => {
    const featured = projects.filter((p) => (p.featured ?? p.isFeatured) === true);
    const sorted = [...featured].sort((a, b) => {
      const orderA = a.orderIndex ?? a.displayOrder ?? 999;
      const orderB = b.orderIndex ?? b.displayOrder ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    setOrderedProjects(sorted);
    setInitialOrderedIds(sorted.map((p) => p.id));
  }, [projects]);

  const hasUnsavedOrderChanges = useMemo(() => {
    if (orderedProjects.length === 0 && initialOrderedIds.length === 0) return false;
    if (orderedProjects.length !== initialOrderedIds.length) return true;
    return JSON.stringify(orderedProjects.map((p) => p.id)) !== JSON.stringify(initialOrderedIds);
  }, [orderedProjects, initialOrderedIds]);

  // Warn if navigating away with unsaved order changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedOrderChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedOrderChanges]);

  const moveOrderItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= orderedProjects.length) return;
    setOrderedProjects((prev) => {
      const list = [...prev];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return list;
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    moveOrderItem(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSaveOrder = async () => {
    setSavingOrder(true);
    try {
      const ids = orderedProjects.map((p) => p.id);
      const res = await api.reorderProjects(ids);
      if (res && (res.success || res.status === 200 || res.count !== undefined)) {
        setInitialOrderedIds(ids);
        showToast('Featured project display order saved successfully!');
        // Update projects in memory to reflect new orderIndex
        setProjects((prev) => {
          const orderMap = new Map(ids.map((id, idx) => [id, idx + 1]));
          return [...prev].map((p) => ({
            ...p,
            orderIndex: orderMap.has(p.id) ? orderMap.get(p.id) : (p.orderIndex ?? p.displayOrder),
            displayOrder: orderMap.has(p.id) ? orderMap.get(p.id) : p.displayOrder,
          }));
        });
      } else {
        throw new Error(res?.message || 'Failed to save project order');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving project order.');
    } finally {
      setSavingOrder(false);
    }
  };

  const handleResetOrder = () => {
    if (window.confirm('Are you sure you want to discard unsaved order changes?')) {
      const initialMap = new Map(initialOrderedIds.map((id, idx) => [id, idx]));
      const restored = [...orderedProjects].sort((a, b) => {
        const idxA = initialMap.get(a.id) ?? 999;
        const idxB = initialMap.get(b.id) ?? 999;
        return idxA - idxB;
      });
      setOrderedProjects(restored);
    }
  };

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
  const handleImageFile = (file: File, target: 'featured' | 'projectPage' | 'general' = 'general') => {
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
          if (target === 'featured') {
            setFormData((prev) => ({ 
              ...prev, 
              featuredThumbnailUrl: compressedDataUrl,
              thumbnailUrl: prev.thumbnailUrl || compressedDataUrl,
            }));
          } else if (target === 'projectPage') {
            setFormData((prev) => ({ 
              ...prev, 
              projectPageThumbnailUrl: compressedDataUrl,
              thumbnailUrl: prev.thumbnailUrl || compressedDataUrl,
            }));
          } else {
            setFormData((prev) => ({ 
              ...prev, 
              thumbnailUrl: compressedDataUrl,
              featuredThumbnailUrl: prev.featuredThumbnailUrl || compressedDataUrl,
              projectPageThumbnailUrl: prev.projectPageThumbnailUrl || compressedDataUrl,
            }));
          }
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
      featuredThumbnailUrl: '',
      projectPageThumbnailUrl: '',
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
    const generalThumb = proj.bannerUrl || proj.thumbnailUrl || '';

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
      thumbnailUrl: generalThumb,
      featuredThumbnailUrl: proj.featuredThumbnailUrl || generalThumb,
      projectPageThumbnailUrl: proj.projectPageThumbnailUrl || generalThumb,
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
    const featuredThumbnailUrl = formData.featuredThumbnailUrl.trim() || undefined;
    const projectPageThumbnailUrl = formData.projectPageThumbnailUrl.trim() || undefined;
    const bannerUrl = formData.thumbnailUrl.trim() || projectPageThumbnailUrl || featuredThumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    
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
      featuredThumbnailUrl,
      projectPageThumbnailUrl,
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

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const isPub = (p.published ?? p.isPublished) !== false;
      const isFeat = (p.featured ?? p.isFeatured) === true;
      if (viewTab === 'featured') return isFeat;
      if (viewTab === 'published') return isPub;
      if (viewTab === 'drafts') return !isPub;
      return true;
    });
  }, [projects, viewTab]);

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

      {/* Tabs Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewTab === 'all'
                ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700'
            }`}
          >
            <span>All Projects</span>
            <span className="ml-1.5 text-[10px] opacity-80 font-mono">({totalProjects})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('featured')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewTab === 'featured'
                ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700'
            }`}
          >
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-amber-400" />
              <span>Featured (Home)</span>
            </span>
            <span className="ml-1.5 text-[10px] opacity-80 font-mono">({featuredCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('published')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewTab === 'published'
                ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700'
            }`}
          >
            <span>Live Published</span>
            <span className="ml-1.5 text-[10px] opacity-80 font-mono">({publishedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('drafts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewTab === 'drafts'
                ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700'
            }`}
          >
            <span>Drafts</span>
            <span className="ml-1.5 text-[10px] opacity-80 font-mono">({draftCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('order')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewTab === 'order'
                ? 'bg-[#8b2323] text-white shadow-[2px_2px_0px_#1c1917]'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Manage Order</span>
            <span className="text-[10px] opacity-80 font-mono">({orderedProjects.length})</span>
            {hasUnsavedOrderChanges && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" title="Unsaved order changes" />
            )}
          </button>
        </div>
      </div>

      {viewTab === 'order' ? (
        /* ════════════════════════════════════════════════════════════════
           MANAGE FEATURED PROJECTS ORDER INTERFACE
        ════════════════════════════════════════════════════════════════ */
        <div className="space-y-4">
          {/* Header Bar with Action Buttons */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-[#8b2323] dark:text-rose-400" />
                  <span>Homepage Featured Projects Ordering</span>
                </h3>
                {hasUnsavedOrderChanges && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    ● Unsaved Changes
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Drag cards or use position arrows. The project at <strong>Position #1</strong> appears first in the Featured Projects carousel on the homepage.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={handleResetOrder}
                disabled={!hasUnsavedOrderChanges || savingOrder}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 shadow-[1.5px_1.5px_0px_#1c1917] text-stone-700 dark:text-stone-300 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer"
                title="Discard unsaved changes and reset to current database order"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Order</span>
              </button>

              <button
                type="button"
                onClick={handleSaveOrder}
                disabled={!hasUnsavedOrderChanges || savingOrder}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {savingOrder ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Order...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Order</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sortable List */}
          {orderedProjects.length === 0 ? (
            <div className="py-16 text-center space-y-2 rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 p-6">
              <Star className="w-8 h-8 mx-auto text-amber-500 opacity-60" />
              <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Featured Projects</h4>
              <p className="text-xs text-stone-400">Mark projects as "Featured on Homepage" in their edit modal to manage their display order.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {orderedProjects.map((proj, index) => {
                const isFirst = index === 0;
                const isLast = index === orderedProjects.length - 1;
                const isDragging = draggedIndex === index;
                const isDragOver = dragOverIndex === index;
                const thumb = proj.featuredThumbnailUrl || proj.bannerUrl || proj.thumbnailUrl;

                return (
                  <div
                    key={proj.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDragging
                        ? 'opacity-40 border-dashed border-[#8b2323] bg-stone-100 dark:bg-stone-800'
                        : isDragOver
                        ? 'border-[#8b2323] bg-rose-50/50 dark:bg-rose-950/20 translate-y-0.5'
                        : 'border-stone-900 dark:border-stone-700 bg-white dark:bg-[#16171d] shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000]'
                    }`}
                  >
                    {/* Left: Drag Handle, Position Badge, Thumbnail & Details */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Drag Handle */}
                      <div
                        className="cursor-grab active:cursor-grabbing text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 shrink-0 select-none"
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Position Badge */}
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                        index === 0
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                      }`}>
                        #{index + 1}
                      </span>

                      {/* Thumbnail */}
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={proj.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="w-16 h-11 sm:w-20 sm:h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-11 sm:w-20 sm:h-12 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-400 shrink-0">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}

                      {/* Meta */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                            {proj.title}
                          </h4>
                          {index === 0 && (
                            <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[9px] font-bold uppercase tracking-wider border border-amber-300">
                              First on Carousel
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-stone-500 font-mono">
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" /> Featured
                          </span>
                          {proj.category && (
                            <span className="hidden sm:inline-block text-stone-400">
                              • {proj.category}
                            </span>
                          )}
                          {proj.featuredThumbnailUrl && (
                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                              • Custom Home Thumb
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Positioning Buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100 dark:border-stone-800">
                      <button
                        type="button"
                        onClick={() => moveOrderItem(index, 0)}
                        disabled={isFirst}
                        className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move to Top (#1)"
                      >
                        <ChevronsUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveOrderItem(index, index - 1)}
                        disabled={isFirst}
                        className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveOrderItem(index, index + 1)}
                        disabled={isLast}
                        className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveOrderItem(index, orderedProjects.length - 1)}
                        disabled={isLast}
                        className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move to Bottom"
                      >
                        <ChevronsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Projects Table */
        <div className="rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] overflow-hidden">
          {loading ? (
            <div className="py-16 text-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
              <p className="text-xs text-stone-500">Loading projects from database...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                {viewTab === 'featured' ? 'No Featured Projects' : viewTab === 'published' ? 'No Published Projects' : viewTab === 'drafts' ? 'No Drafts' : 'No Projects Configured'}
              </p>
              <p className="text-xs text-stone-400">
                {viewTab === 'all' ? 'Click "Add New Project" to create your first portfolio entry.' : 'No entries found matching this tab filter.'}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (<640px) */}
              <div className="sm:hidden divide-y divide-stone-100 dark:divide-stone-800">
                {filteredProjects.map((proj, idx) => {
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
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {proj.featuredThumbnailUrl && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300">
                              Home Thumb
                            </span>
                          )}
                          {proj.projectPageThumbnailUrl && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300">
                              Page Thumb
                            </span>
                          )}
                        </div>
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
                  {filteredProjects.map((proj, idx) => {
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
                              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 line-clamp-1">
                                <span>{proj.client || 'Engineering Platform'} • {proj.year || '2026'} {proj.slug ? `(/${proj.slug})` : ''}</span>
                                {proj.featuredThumbnailUrl && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 shrink-0" title="Has dedicated homepage featured thumbnail">
                                    Home Thumb
                                  </span>
                                )}
                                {proj.projectPageThumbnailUrl && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 shrink-0" title="Has dedicated project page thumbnail">
                                    Page Thumb
                                  </span>
                                )}
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
      )}

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

              {/* Row 4: Dual Project Thumbnails (Homepage Featured vs Project Page) */}
              <div className="space-y-4 p-4 rounded-2xl bg-white dark:bg-[#1b1c24] border-2 border-stone-900/80 dark:border-stone-700 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 border-stone-200 dark:border-stone-800">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#8b2323]" />
                      <span>Project Thumbnails & Cover Images</span>
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Configure separate thumbnails for homepage featured cards and the dedicated projects page.
                    </p>
                  </div>
                  {/* Quick Sync Action */}
                  {(formData.featuredThumbnailUrl || formData.projectPageThumbnailUrl) && (
                    <button
                      type="button"
                      onClick={() => {
                        const source = formData.featuredThumbnailUrl || formData.projectPageThumbnailUrl || formData.thumbnailUrl;
                        if (!source) return;
                        setFormData((prev) => ({
                          ...prev,
                          featuredThumbnailUrl: source,
                          projectPageThumbnailUrl: source,
                          thumbnailUrl: source,
                        }));
                        showToast('Applied same thumbnail to both homepage and project page.');
                      }}
                      className="text-[10px] font-bold text-[#8b2323] dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-center"
                    >
                      <span>Use Same Thumbnail for Both</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Homepage Featured Projects Thumbnail */}
                  <div className="space-y-2.5 p-3 rounded-xl border-2 border-stone-900/40 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/40">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>1. Featured Projects Thumbnail</span>
                      </label>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                        Homepage Showcase
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-snug">
                      Displayed specifically on the homepage Featured Projects showcase.
                    </p>

                    <div className="space-y-2">
                      <input
                        ref={featuredFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFile(file, 'featured');
                        }}
                      />

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => featuredFileInputRef.current?.click()}
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                        </button>
                        <input
                          type="text"
                          value={formData.featuredThumbnailUrl}
                          onChange={(e) => setFormData({ ...formData, featuredThumbnailUrl: e.target.value })}
                          placeholder="Or paste image URL (https://...)"
                          className="w-full p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#16171d] text-xs font-mono"
                        />
                        {formData.featuredThumbnailUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, featuredThumbnailUrl: '' })}
                            className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-500 hover:text-red-600 bg-white dark:bg-stone-800 cursor-pointer shrink-0"
                            title="Clear image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Image Preview */}
                      {formData.featuredThumbnailUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700 max-h-36 bg-stone-900/5 dark:bg-stone-800 flex items-center justify-center p-1">
                          <img
                            src={formData.featuredThumbnailUrl}
                            alt="Featured thumbnail preview"
                            className="max-h-32 w-auto object-contain rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-20 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center text-stone-400 text-[10px] gap-1">
                          <ImageIcon className="w-4 h-4 opacity-50" />
                          <span>No homepage thumbnail set (falls back to default)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Option 2: Project Page Thumbnail */}
                  <div className="space-y-2.5 p-3 rounded-xl border-2 border-stone-900/40 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/40">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>2. Project Page Thumbnail</span>
                      </label>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                        /projects Catalog
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-snug">
                      Displayed on the dedicated /projects catalog, case study page, and modal.
                    </p>

                    <div className="space-y-2">
                      <input
                        ref={projectPageFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFile(file, 'projectPage');
                        }}
                      />

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => projectPageFileInputRef.current?.click()}
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                        </button>
                        <input
                          type="text"
                          value={formData.projectPageThumbnailUrl}
                          onChange={(e) => setFormData({ ...formData, projectPageThumbnailUrl: e.target.value })}
                          placeholder="Or paste image URL (https://...)"
                          className="w-full p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#16171d] text-xs font-mono"
                        />
                        {formData.projectPageThumbnailUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, projectPageThumbnailUrl: '' })}
                            className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-500 hover:text-red-600 bg-white dark:bg-stone-800 cursor-pointer shrink-0"
                            title="Clear image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Image Preview */}
                      {formData.projectPageThumbnailUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700 max-h-36 bg-stone-900/5 dark:bg-stone-800 flex items-center justify-center p-1">
                          <img
                            src={formData.projectPageThumbnailUrl}
                            alt="Project page thumbnail preview"
                            className="max-h-32 w-auto object-contain rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-20 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center text-stone-400 text-[10px] gap-1">
                          <ImageIcon className="w-4 h-4 opacity-50" />
                          <span>No project page thumbnail set (falls back to default)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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