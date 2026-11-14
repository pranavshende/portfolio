import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, User, Share2, Twitter, Linkedin, 
  Copy, Check, BookOpen, Sparkles, ExternalLink, ChevronRight, Tag, Eye, TrendingUp,
  GraduationCap, List, Bookmark, FileText
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
import { getCleanExcerpt } from '@/lib/excerpt';

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
  displayOrder?: number;
}

const CodeBlock: React.FC<{ language?: string; value: string }> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-5 rounded-2xl bg-stone-900 dark:bg-[#121318] border-2 border-stone-900 dark:border-stone-700 overflow-hidden shadow-[2px_2px_0px_#1c1917]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-stone-950/70 text-xs font-mono text-stone-400">
        <span className="uppercase font-bold tracking-wider text-[11px] text-stone-300">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono transition-colors cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-stone-300" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono text-stone-100 leading-relaxed scrollbar-thin">
        <code>{value}</code>
      </pre>
    </div>
  );
};

export const BlogPostPage: React.FC = () => {
  useAnalytics();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getStats: getBlogStatsItem, recordView: recordBlogViewAction } = useBlogStats();

  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [citationCopied, setCitationCopied] = useState(false);

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
          setAllPosts(manifest);
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

  const currentIndex = useMemo(() => {
    return allPosts.findIndex((p) => p.slug === slug);
  }, [allPosts, slug]);

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Extract Table of Contents
  const tocItems = useMemo(() => {
    if (!post?.content) return [];
    const lines = post.content.split('\n');
    const items: { id: string; text: string; level: number }[] = [];
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].replace(/[*`_]/g, '').trim();
        const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, text: rawText, level });
      }
    }
    return items;
  }, [post?.content]);

  const copyCitation = (citation: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(citation);
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2500);
    }
  };

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

  const cleanDescription = getCleanExcerpt(post.seoDescription || post.excerpt, post.content, 160);
  const isResearchAlumni = post.slug === 'beyond-alumni-directories-building-an-intelligent-ai-powered-alumni-student-networking-ecosystem';
  const isResearchLumpy = post.slug === 'ai-veterinary-healthcare-lumpy-skin-disease-detection';

  return (
    <DoodleLayout>
      <PageSeo
        title={post.seoTitle || `${post.title} | Pranav Shende`}
        description={cleanDescription}
        canonicalPath={`/blog/${post.slug}`}
        keywords={post.tags && post.tags.length > 0 ? post.tags : [post.category || 'Engineering', 'System Design', 'Pranav Shende']}
        ogType="article"
        ogImage={resolveBlogCover(post.coverImageUrl, post.slug)}
        publishedTime={post.publishedAt || post.createdAt}
        author={post.author || 'Pranav Shende'}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            'headline': post.title,
            'description': cleanDescription,
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
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://pranavshende.online/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': 'https://pranavshende.online/blog'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': post.title,
                'item': `https://pranavshende.online/blog/${post.slug}`
              }
            ]
          }
        ]}
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

          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed italic border-l-3 border-[#8b2323] pl-3 py-0.5">
            {getCleanExcerpt(post.excerpt, post.content, 220)}
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

        {/* Academic Research Citation Callout */}
        {isResearchAlumni && (
          <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/90 dark:bg-teal-950/40 border-2 border-teal-800 dark:border-teal-700 shadow-[3.5px_3.5px_0px_#0f766e] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-800 dark:text-teal-300" />
                <span className="font-bold text-xs uppercase font-mono tracking-wider text-teal-900 dark:text-teal-200">
                  Peer-Reviewed Academic Publication
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 border border-teal-800/30">
                IJACTE Journal • Vol. 14, Issue 1
              </span>
            </div>
            <p className="text-xs text-teal-950 dark:text-teal-100 leading-relaxed font-sans">
              <strong>Paper Title:</strong> Intelligent Platform to Interconnect Alumni and Student for Educational Institutes<br />
              <strong>Authors:</strong> Pranav Shende, Dr. Ashish Wandhare<br />
              <strong>Journal:</strong> International Journal on Advanced Computer Theory and Engineering (IJACTE), May 2025
            </p>
            <div className="p-3 rounded-xl bg-white/95 dark:bg-stone-900/95 border border-teal-800/30 text-xs font-mono text-stone-700 dark:text-stone-300">
              <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Official IEEE Citation:</div>
              <div className="text-[11px] leading-relaxed">
                P. Shende and A. Wandhare, &ldquo;Intelligent Platform to Interconnect Alumni and Student for Educational Institutes,&rdquo; <em>International Journal on Advanced Computer Theory and Engineering (IJACTE)</em>, vol. 14, no. 1, pp. 193&ndash;197, May 2025, doi: 10.65521/ijacte.v14i1.388.
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <a
                  href="https://doi.org/10.65521/ijacte.v14i1.388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <span>View Official DOI (10.65521/ijacte.v14i1.388)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => copyCitation('P. Shende and A. Wandhare, "Intelligent Platform to Interconnect Alumni and Student for Educational Institutes," International Journal on Advanced Computer Theory and Engineering (IJACTE), vol. 14, no. 1, pp. 193-197, May 2025, doi: 10.65521/ijacte.v14i1.388.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                >
                  {citationCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{citationCopied ? 'Citation Copied!' : 'Copy Citation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {isResearchLumpy && (
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-800 dark:border-emerald-700 shadow-[3.5px_3.5px_0px_#047857] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />
                <span className="font-bold text-xs uppercase font-mono tracking-wider text-emerald-900 dark:text-emerald-200">
                  IEEE Conference Research Paper
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-800/30">
                IEEE • OTCON 2025
              </span>
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-sans">
              <strong>Paper Title:</strong> Enhancing Lumpy Skin Disease Detection Accuracy through CNN-Based Feature Extraction and Multi-Classifier Systems<br />
              <strong>Presented At:</strong> 2025 4th OPJU International Technology Conference (OTCON), IEEE, Feb 2025<br />
              <strong>Authors:</strong> Pranav Shende, et al.
            </p>
            <div className="p-3 rounded-xl bg-white/95 dark:bg-stone-900/95 border border-emerald-800/30 text-xs font-mono text-stone-700 dark:text-stone-300">
              <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Official IEEE Citation:</div>
              <div className="text-[11px] leading-relaxed">
                P. Shende et al., &ldquo;Enhancing Lumpy Skin Disease Detection Accuracy through CNN-Based Feature Extraction and Multi-Classifier Systems,&rdquo; in <em>Proc. 2025 4th OPJU International Technology Conference (OTCON)</em>, IEEE, Feb. 2025, doi: 10.1109/OTCON65728.2025.11070341.
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <a
                  href="https://doi.org/10.1109/OTCON65728.2025.11070341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <span>View on IEEE Xplore (10.1109/OTCON65728.2025.11070341)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => copyCitation('P. Shende et al., "Enhancing Lumpy Skin Disease Detection Accuracy through CNN-Based Feature Extraction and Multi-Classifier Systems," in Proc. 2025 4th OPJU International Technology Conference (OTCON), IEEE, Feb. 2025, doi: 10.1109/OTCON65728.2025.11070341.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                >
                  {citationCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{citationCopied ? 'Citation Copied!' : 'Copy Citation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents Box */}
        {tocItems.length >= 3 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border-2 border-stone-900/20 dark:border-stone-700 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-stone-800 dark:text-stone-200">
              <List className="w-4 h-4 text-[#8b2323]" />
              <span>Table of Contents</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-sans">
              {tocItems.map((item, idx) => (
                <li key={idx} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[#8b2323] dark:hover:text-rose-400 hover:underline transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#8b2323] dark:text-rose-400 font-mono text-[10px]">•</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Container */}
        <div className="rounded-3xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[4px_4px_0px_#1c1917] dark:shadow-[4px_4px_0px_#000000] p-6 sm:p-10">
          <main className="prose prose-stone dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed py-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-8 mb-4 text-stone-900 dark:text-stone-100" {...props} />,
                h2: ({ node, children, ...props }: any) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h2 id={id} className="text-xl sm:text-2xl font-serif font-bold mt-8 mb-3 text-stone-900 dark:text-stone-100 border-b-2 border-stone-900/15 dark:border-stone-800 pb-2 scroll-mt-20" {...props}>{children}</h2>;
                },
                h3: ({ node, children, ...props }: any) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h3 id={id} className="text-lg sm:text-xl font-serif font-bold mt-6 mb-2 text-stone-900 dark:text-stone-100 scroll-mt-20" {...props}>{children}</h3>;
                },
                p: ({ node, ...props }) => <p className="mb-4 text-stone-700 dark:text-stone-300 leading-relaxed font-sans" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-4 text-stone-700 dark:text-stone-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-stone-700 dark:text-stone-300" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-[#8b2323] pl-4 italic my-4 text-stone-800 dark:text-stone-300 bg-[#8b2323]/5 p-3 rounded-r-xl border-2 border-stone-900/20" {...props} />
                ),
                pre: ({ children }: any) => <>{children}</>,
                code: ({ node, className, children, ...props }: any) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-900/30 font-mono text-xs text-[#8b2323] dark:text-rose-400 font-bold" {...props}>
                        {children}
                      </code>
                    );
                  }
                  const match = /language-(\w+)/.exec(className || '');
                  const lang = match ? match[1] : '';
                  const textContent = String(children).replace(/\n$/, '');
                  return <CodeBlock language={lang} value={textContent} />;
                },
                table: ({ node, ...props }) => (
                  <div className="my-6 overflow-x-auto rounded-xl border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917]">
                    <table className="w-full text-left text-xs sm:text-sm font-sans" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold border-b-2 border-stone-900 dark:border-stone-700" {...props} />,
                th: ({ node, ...props }) => <th className="p-3 text-xs uppercase tracking-wider font-mono border-r border-stone-200 dark:border-stone-700 last:border-r-0" {...props} />,
                td: ({ node, ...props }) => <td className="p-3 border-b border-stone-200 dark:border-stone-800 border-r dark:border-stone-800 last:border-r-0 text-stone-700 dark:text-stone-300" {...props} />,
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

        {/* Previous & Next Article Navigation Bar */}
        {(prevPost || nextPost) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-4 rounded-2xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all space-y-1 block group"
              >
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                  <ArrowLeft className="w-3 h-3 text-[#8b2323] group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Article</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                  {prevPost.title}
                </h4>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-4 rounded-2xl bg-white/95 dark:bg-[#181920]/95 border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all space-y-1 block text-right group sm:ml-auto w-full"
              >
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center justify-end gap-1 font-bold">
                  <span>Next Article</span>
                  <ArrowRight className="w-3 h-3 text-[#8b2323] group-hover:translate-x-0.5 transition-transform" />
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </h4>
              </Link>
            ) : <div />}
          </div>
        )}

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
