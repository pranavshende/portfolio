import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, BookOpen, ExternalLink, Loader2, X, Eye, 
  Upload, Image as ImageIcon, Sparkles, CheckCircle2, Clock, Tag, 
  Search, Filter, FileText, ArrowUpRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '@/lib/api';

import jarvisBanner from '@/photo/jarvis_banner.webp';
import electropathyBanner from '@/photo/electropathy_banner.webp';
import tastifyyBanner from '@/photo/tastifyy_banner.webp';
import attritionBanner from '@/photo/attrition_banner.webp';
import jansamparkBanner from '@/photo/jansampark.webp';
import solarBanner from '@/photo/solar_analytics.webp';
import pashurakshakBanner from '@/photo/pashurakshak.webp';

const resolveBlogCover = (url?: string, slug?: string): string => {
  if (!url && !slug) return jarvisBanner;
  if (url && (url.startsWith('data:image/') || url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  const target = (url || slug || '').toLowerCase();
  if (target.includes('forgerag') || target.includes('electropathy')) return electropathyBanner;
  if (target.includes('attrition') || target.includes('workforce')) return attritionBanner;
  if (target.includes('solar')) return solarBanner;
  if (target.includes('tastifyy') || target.includes('fullstack') || target.includes('scalable')) return tastifyyBanner;
  if (target.includes('jansampark') || target.includes('civic') || target.includes('hackathon')) return jansamparkBanner;
  if (target.includes('pashu') || target.includes('agriculture')) return pashurakshakBanner;
  if (target.includes('jarvis')) return jarvisBanner;

  if (url && url.startsWith('/src/photo/')) {
    return url.replace('/src/photo/', '/photo/');
  }
  return url || jarvisBanner;
};

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  coverImageUrl?: string;
  author?: string;
  readingTimeMinutes?: number;
  published?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  viewCount?: number;
  seoTitle?: string;
  seoDescription?: string;
}

const PRESET_CATEGORIES = [
  'Enterprise AI & Architecture',
  'LLMs & Retrieval-Augmented Generation',
  'Machine Learning & Predictive Analytics',
  'CleanTech & Big Data',
  'Full-Stack & System Design',
  'Civic-Tech & Digital Governance',
  'Edge AI & Computer Vision',
  'Hackathons & Achievements'
];

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPostItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Enterprise AI & Architecture',
    excerpt: '',
    content: '',
    tags: 'AI, Fastify, MCP, Architecture',
    coverImageUrl: '',
    author: 'Pranav Shende',
    readingTimeMinutes: 6,
    published: true,
    seoTitle: '',
    seoDescription: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchPosts = () => {
    setLoading(true);
    // Use getAdminBlogPosts to see drafts and published articles
    api.getAdminBlogPosts()
      .then((res: any) => {
        if (res && res.data && Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (Array.isArray(res)) {
          setPosts(res);
        } else {
          return api.getBlogPosts().then((pub: any) => {
            if (pub && pub.data && Array.isArray(pub.data)) setPosts(pub.data);
          });
        }
      })
      .catch((err) => {
        console.warn('Admin blog fetch failed, falling back to public endpoint:', err);
        api.getBlogPosts()
          .then((pub: any) => {
            if (pub && pub.data && Array.isArray(pub.data)) setPosts(pub.data);
          })
          .catch((e) => console.error('Error fetching blog posts:', e));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
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
      slug: !currentPost || !prev.slug ? generateSlug(val) : prev.slug,
    }));
  };

  // Image Upload with client-side canvas compression to WebP
  const handleCoverImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1280;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/webp', 0.84);
          setFormData((prev) => ({ ...prev, coverImageUrl: compressed }));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setCurrentPost(null);
    setActiveTab('write');
    setFormData({
      title: '',
      slug: '',
      category: 'Enterprise AI & Architecture',
      excerpt: '',
      content: '## Overview\n\nIn this article, I discuss the architectural principles and technical decisions behind...',
      tags: 'AI, Fastify, MCP, Architecture',
      coverImageUrl: '',
      author: 'Pranav Shende',
      readingTimeMinutes: 6,
      published: true,
      seoTitle: '',
      seoDescription: '',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setCurrentPost(post);
    setActiveTab('write');
    setFormData({
      title: post.title || '',
      slug: post.slug || generateSlug(post.title || ''),
      category: post.category || 'Enterprise AI & Architecture',
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      coverImageUrl: post.coverImageUrl || '',
      author: post.author || 'Pranav Shende',
      readingTimeMinutes: post.readingTimeMinutes ?? 6,
      published: post.published ?? post.isPublished ?? true,
      seoTitle: post.seoTitle || post.title || '',
      seoDescription: post.seoDescription || post.excerpt || '',
    });
    setIsEditing(true);
  };

  const insertMarkdown = (syntax: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + syntax,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Article Title and Markdown Content are required.');
      return;
    }

    setSaving(true);
    const slug = formData.slug.trim() || generateSlug(formData.title);
    const parsedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const isPub = Boolean(formData.published);

    const payload = {
      title: formData.title.trim(),
      slug,
      category: formData.category.trim() || 'General Engineering',
      excerpt: formData.excerpt.trim() || formData.content.slice(0, 160).replace(/[#*`_]/g, '').trim(),
      content: formData.content.trim(),
      tags: parsedTags,
      coverImageUrl: formData.coverImageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      coverImage: formData.coverImageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author: formData.author.trim() || 'Pranav Shende',
      readingTimeMinutes: Number(formData.readingTimeMinutes) || 5,
      readTime: Number(formData.readingTimeMinutes) || 5,
      published: isPub,
      isPublished: isPub,
      seoTitle: formData.seoTitle.trim() || `${formData.title.trim()} | Pranav Shende`,
      seoDescription: formData.seoDescription.trim() || formData.excerpt.trim(),
    };

    try {
      if (currentPost) {
        await api.updateBlogPost(currentPost.id, payload);
        showToast('Article updated successfully.');
      } else {
        await api.createBlogPost(payload);
        showToast('Article created and saved.');
      }
      setIsEditing(false);
      fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast('Article deleted.');
    } catch (err: any) {
      alert(err.message || 'Failed to delete blog post.');
    }
  };

  // Stats calculation
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => (p.published ?? p.isPublished) !== false).length;
  const draftCount = totalPosts - publishedCount;
  const totalViews = posts.reduce((sum, p) => sum + (p.viewCount || 0), 0);

  const filteredPosts = posts.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xl border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>Technical Blog & Knowledge Hub</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-mono">
              {totalPosts} Articles
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Publish architectural deep-dives, systems tutorials, project breakdowns, and technical achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Blog</span>
          </a>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium">Total Articles</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {totalPosts}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-medium">Published Live</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {publishedCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium">Drafts</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-600 dark:text-stone-400 mt-2">
            {draftCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-xs font-medium">Total Article Views</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-2">
            {totalViews}
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter articles by title, category, or tags..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#16171d] text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
        />
      </div>

      {/* Articles Table & Cards */}
      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading articles from database...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Articles Found</h4>
            <p className="text-xs text-stone-400">
              {searchFilter ? 'No articles match your search filter.' : 'Click "Write Article" to draft your first technical publication.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredPosts.map((post) => {
              const isPub = (post.published ?? post.isPublished) !== false;
              const readTime = post.readingTimeMinutes ?? 5;
              const cover = post.coverImageUrl;

              return (
                <div 
                  key={post.id} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {cover && (
                      <img
                        src={resolveBlogCover(cover, post.slug)}
                        alt={post.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = jarvisBanner;
                        }}
                        className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0"
                      />
                    )}

                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPub
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                        }`}>
                          {isPub ? 'Published' : 'Draft'}
                        </span>

                        {post.category && (
                          <span className="px-2 py-0.5 rounded-md bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 font-semibold text-[10px]">
                            {post.category}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-stone-400">
                          /{post.slug}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 line-clamp-1">
                        {post.title}
                      </h4>

                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                        {post.excerpt || post.content.slice(0, 150)}...
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{readTime} min read</span>
                        </span>
                        <span>•</span>
                        <span>By {post.author || 'Pranav Shende'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.viewCount || 0} views</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                      title="View live article"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(post)}
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                      title="Edit article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Blog Post Create / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs select-auto overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-white dark:bg-[#16171d] rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-5 sm:p-8 space-y-5 my-auto">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {currentPost ? 'Edit Technical Article' : 'Write New Article'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Authored by {formData.author || 'Pranav Shende'}. Published to the portfolio blog and SEO sitemap.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Jarvis AI: Building an Enterprise Intelligence Platform with Fastify & MCP"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="jarvis-enterprise-intelligence-mcp"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Category, Reading Time, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Estimated Reading Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.readingTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readingTimeMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image Upload */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-stone-50/70 dark:bg-[#1d1f27]/70 border border-stone-200 dark:border-stone-800">
                <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#8b2323]" />
                    <span>Article Cover / Banner Image</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Supports PNG, JPG, WebP</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCoverImageFile(file);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner Image</span>
                  </button>

                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={formData.coverImageUrl}
                      onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                      placeholder="Or paste direct image URL (https://... or data:image/...)"
                      className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#16171d] text-xs font-mono"
                    />
                  </div>

                  {formData.coverImageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImageUrl: '' })}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Clear image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {formData.coverImageUrl && (
                  <div className="mt-2 relative rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 max-h-48 bg-stone-900/5 flex items-center justify-center">
                    <img
                      src={formData.coverImageUrl}
                      alt="Cover preview"
                      className="max-h-44 w-auto object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Row 4: Excerpt */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Short Excerpt / Meta Description (SEO)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise architectural summary that appears on social media shares, Google snippets, and blog index cards..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              {/* Row 5: Content Editor with Write vs Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      Article Content (Markdown) *
                    </label>
                    <div className="flex items-center rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          activeTab === 'write'
                            ? 'bg-white dark:bg-[#16171d] text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          activeTab === 'preview'
                            ? 'bg-white dark:bg-[#16171d] text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>

                  {/* Formatting quick buttons */}
                  {activeTab === 'write' && (
                    <div className="hidden sm:flex items-center gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => insertMarkdown('\n\n## Section Heading\n')}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('\n\n### Subheading\n')}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('**bold text**')}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 font-bold"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('\n```typescript\n// code snippet\n```\n')}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 font-mono"
                      >
                        Code
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('\n> Highlighted callout or quote\n')}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 italic"
                      >
                        Quote
                      </button>
                    </div>
                  )}
                </div>

                {activeTab === 'write' ? (
                  <textarea
                    rows={12}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="## Introduction&#10;&#10;Technical deep-dive into the architectural mechanics..."
                    className="w-full p-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono leading-relaxed"
                  />
                ) : (
                  <div className="w-full max-h-[380px] overflow-y-auto p-4 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-[#1d1f27]/50 prose prose-stone dark:prose-invert max-w-none text-xs sm:text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*No content written yet.*'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Row 6: Tags & Published Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="AI, Fastify, MCP, Architecture, PostgreSQL"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="publishedCheckbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-[#8b2323] focus:ring-[#8b2323] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="publishedCheckbox" className="text-xs font-semibold cursor-pointer select-none">
                    Publish immediately to live portfolio blog
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Article...</span>
                    </>
                  ) : (
                    <span>{currentPost ? 'Save Changes' : 'Publish Article'}</span>
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

export default BlogSection;