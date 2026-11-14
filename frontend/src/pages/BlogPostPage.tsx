import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, 
  Copy, Check, BookOpen, Sparkles, ExternalLink, ChevronRight, Tag, Eye, TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DoodleLayout } from '@/components/DoodleLayout';
import { PageSeo } from '@/components/PageSeo';
import { api } from '@/lib/api';
import useAnalytics from '@/hooks/useAnalytics';
import useBlogStats from '@/hooks/useBlogStats';
import profilePhoto from '@/photo/profile_photo_wide.webp';

import { LoadingThumbnail, resolveCustomPhoto } from '@/components/LoadingThumbnail';

const resolveBlogCover = (url?: string): string | null => {
  return resolveCustomPhoto(url);
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  coverImageUrl?: string;
  author?: string;
  readingTimeMinutes?: number;
  publishedAt?: string;
  createdAt?: string;
  viewCount?: number;
  impressionCount?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export const BlogPostPage: React.FC = () => {
  useAnalytics();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getStats: getBlogStatsItem, recordView: recordBlogViewAction } = useBlogStats();

  useEffect(() => {
    if (slug) {
      recordBlogViewAction(slug);
    }
  }, [slug, recordBlogViewAction]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    // 1. Fast local hydration: Attempt to load from /blogs-manifest.json immediately
    fetch('/blogs-manifest.json')
      .then((r) => r.json())
      .then((manifest: BlogPost[]) => {
        if (Array.isArray(manifest)) {
          const found = manifest.find((b) => b.slug === slug);
          if (found) {
            setPost(found);
            setLoading(false);
          }
        }
      })
      .catch(() => {});

    // 2. Fetch fresh dynamic data from backend API
    api.getBlogPostBySlug(slug)
      .then((res: any) => {
        if (res && res.data) {
          setPost(res.data);
          setError(null);
        } else if (!post) {
          setError('Article not found.');
        }
      })
      .catch((err) => {
        console.error('Error fetching blog post:', err);
        setPost((current) => {
          if (!current) {
            setError('Article not found or could not be loaded.');
          }
          return current;
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnTwitter = () => {
    if (!post) return;
    const text = encodeURIComponent(`"${post.title}" by @pranavshende`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (loading) {
    return (
      <DoodleLayout>
        <div className="max-w-3xl mx-auto py-24 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#8b2323] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500 font-mono">Loading technical publication...</p>
        </div>
      </DoodleLayout>
    );
  }

  if (error || !post) {
    return (
      <DoodleLayout>
        <PageSeo
          title="Article Not Found | Pranav Shende"
          description="The requested technical article does not exist or has been archived."
        />
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-stone-400 opacity-60" />
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Article Not Found
          </h2>
          <p className="text-xs text-stone-500">
            The requested technical article does not exist or has been archived.
          </p>
          <div className="pt-2">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>
      </DoodleLayout>
    );
  }

  const dateStr = post.publishedAt || post.createdAt
    ? new Date(post.publishedAt || post.createdAt!).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent Publication';

  return (
    <DoodleLayout>
      <PageSeo
        title={post.seoTitle || `${post.title} | Pranav Shende`}
        description={post.seoDescription || post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        keywords={post.tags && post.tags.length > 0 ? post.tags : [post.category || 'Engineering', 'System Design', 'Pranav Shende']}
        ogType="article"
        ogImage={resolveBlogCover(post.coverImageUrl, post.slug)}
        publishedTime={post.publishedAt || post.createdAt}
        author={post.author || 'Pranav Shende'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': post.title,
          'description': post.seoDescription || post.excerpt,
          'image': resolveBlogCover(post.coverImageUrl, post.slug),
          'author': {
            '@type': 'Person',
            'name': post.author || 'Pranav Shende',
            'url': 'https://pranavshende.online/',
          },
          'publisher': {
            '@type': 'Person',
            'name': 'Pranav Shende',
            'url': 'https://pranavshende.online/',
          },
          'datePublished': post.publishedAt || post.createdAt || new Date().toISOString(),
          'dateModified': post.publishedAt || post.createdAt || new Date().toISOString(),
          'mainEntityOfPage': `https://pranavshende.online/blog/${post.slug}`,
          'articleSection': post.category || 'Software Engineering',
          'keywords': (post.tags || []).join(', '),
        }}
      />
      <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link to="/blog" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 dark:text-stone-100 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {post.category || 'Article'}
          </span>
        </nav>

        {/* Header Block */}
        <header className="space-y-4">
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-xs border border-[#8b2323] text-[#8b2323] dark:text-rose-400 bg-[#8b2323]/5 font-serif font-bold text-xs tracking-wider shadow-[1.5px_1.5px_0px_#1c1917]">
              {post.category}
            </span>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed italic">
            {post.excerpt}
          </p>

          {/* Meta & Share bar */}
          <div className="pt-2 pb-4 border-b-2 border-stone-900/15 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
                <User className="w-3.5 h-3.5 text-[#8b2323]" />
                <span>{post.author || 'Pranav Shende'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{dateStr}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{post.readingTimeMinutes || 5} min read</span>
              </div>

              {/* Real-time Live Views & Impressions */}
              {(() => {
                const stats = getBlogStatsItem(post.slug, post.viewCount || 0, post.impressionCount || 0);
                return (
                  <>
                    <div 
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 font-semibold text-stone-800 dark:text-stone-200"
                      title={`${stats.views} total reads`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8b2323] dark:text-rose-400" />
                      <span>{stats.views}</span>
                      <span className="text-[10px] text-stone-400 font-normal">views</span>
                    </div>

                    <div 
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 font-semibold text-stone-800 dark:text-stone-200"
                      title={`${stats.impressions} card impressions`}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{stats.impressions}</span>
                      <span className="text-[10px] text-stone-400 font-normal">imp</span>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Social Share Pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={shareOnTwitter}
                className="p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                title="Share on X / Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={shareOnLinkedIn}
                className="p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                title="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Cover Banner: only rendered if custom photo from Supabase exists */}
        {resolveCustomPhoto(post.coverImageUrl) && (
          <div className="mb-8">
            <LoadingThumbnail
              src={resolveCustomPhoto(post.coverImageUrl)}
              alt={post.title}
              aspectClass="aspect-video w-full rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000]"
            />
          </div>
        )}

        {/* Article Body Container */}
        <div className="rounded-3xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000] p-6 sm:p-10">
          <main className="prose prose-stone dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed py-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-8 mb-4 text-stone-900 dark:text-stone-100" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-serif font-bold mt-7 mb-3 text-stone-900 dark:text-stone-100 border-b-2 border-stone-900/15 dark:border-stone-800 pb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg sm:text-xl font-serif font-bold mt-6 mb-2 text-stone-900 dark:text-stone-100" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 text-stone-700 dark:text-stone-300 leading-relaxed font-sans" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-4 text-stone-700 dark:text-stone-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-stone-700 dark:text-stone-300" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-[#8b2323] pl-4 italic my-4 text-stone-800 dark:text-stone-300 bg-[#8b2323]/5 p-3 rounded-r-xl border-2 border-stone-900/20" {...props} />
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-900/30 font-mono text-xs text-[#8b2323] dark:text-rose-400 font-bold" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 dark:bg-[#121318] border-2 border-stone-900 dark:border-stone-700 overflow-x-auto text-xs font-mono my-4 shadow-[2px_2px_0px_#1c1917]">
                      <code {...props}>{children}</code>
                    </pre>
                  );
                },
                a: ({ node, ...props }) => (
                  <a className="text-[#8b2323] dark:text-rose-400 font-bold underline underline-offset-2 hover:opacity-80" target="_blank" rel="noreferrer" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </main>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 mt-6 border-t-2 border-stone-900/15 dark:border-stone-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-700 dark:text-stone-300 font-bold flex items-center gap-1 font-mono">
                <Tag className="w-3.5 h-3.5" />
                <span>Tags:</span>
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono border border-stone-900/30 dark:border-stone-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Author Attribution Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000] flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={profilePhoto}
            alt="Pranav Shende"
            className="w-16 h-16 rounded-full object-cover border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className="font-bold text-base font-serif text-stone-900 dark:text-stone-100">
                Pranav Shende
              </h3>
              <span className="text-xs text-stone-600 dark:text-stone-400 font-mono font-bold">
                Full-Stack Software Engineer & IEEE Researcher
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              Specializing in scalable backend architectures, Model Context Protocol (MCP), agentic RAG engines, 
              and distributed systems. Building real-world intelligence solutions from Nagpur, India.
            </p>
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3 text-xs font-bold text-[#8b2323] dark:text-rose-400">
              <a href="https://github.com/pranavshende" target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/pranavshende" target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://medium.com/@pranavshende97" target="_blank" rel="noreferrer" className="hover:underline">
                Medium
              </a>
              <span>•</span>
              <Link to="/projects" className="hover:underline">
                Featured Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects Showcase */}
        <div className="pt-6 border-t-2 border-stone-900/15 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm font-serif text-stone-900 dark:text-stone-100">
              Related Engineering Projects
            </h3>
            <Link to="/projects" className="text-xs font-bold text-[#8b2323] dark:text-rose-400 flex items-center gap-1 hover:underline">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border-2 border-stone-900 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-[1px_1px_0px_#1c1917]">
                  Rank #1 Flagship
                </span>
                <a href="https://jarvis.pranavshende.online/" target="_blank" rel="noreferrer" className="text-stone-600 hover:text-stone-900 dark:hover:text-white">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                Jarvis 1.0 Enterprise AI Platform
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">
                Autonomous enterprise intelligence with Model Context Protocol (MCP), pgvector RAG, and deterministic SQL calculations.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[1.5px_1.5px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border-2 border-stone-900 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-[1px_1px_0px_#1c1917]">
                  Live Production
                </span>
                <a href="https://client-raprax.vercel.app" target="_blank" rel="noreferrer" className="text-stone-600 hover:text-stone-900 dark:hover:text-white">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                Electropathy AI Clinical Copilot
              </h4>
              <p className="text-[11px] text-stone-500 line-clamp-2">
                Clinical decision-support & medical knowledge engine with zero-hallucination pgvector multilingual semantic search.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 flex justify-between items-center text-xs">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-stone-600 dark:text-stone-300 hover:text-[#8b2323] dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Technical Blog</span>
          </Link>

          <Link
            to="/"
            className="font-semibold text-stone-600 dark:text-stone-300 hover:text-[#8b2323] dark:hover:text-rose-400 transition-colors"
          >
            Portfolio Home
          </Link>
        </div>
      </div>
    </DoodleLayout>
  );
};

export default BlogPostPage;
