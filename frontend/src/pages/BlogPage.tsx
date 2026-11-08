import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, ArrowUpRight, 
  Sparkles, Tag, Layers, User, ChevronRight, Filter
} from 'lucide-react';
import { DoodleLayout } from '@/components/DoodleLayout';
import { api } from '@/lib/api';
import useAnalytics from '@/hooks/useAnalytics';

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
}

const CATEGORIES = [
  'All',
  'Enterprise AI & Architecture',
  'LLMs & Retrieval-Augmented Generation',
  'Machine Learning & Predictive Analytics',
  'CleanTech & Big Data',
  'Full-Stack & System Design',
  'Civic-Tech & Digital Governance',
  'Hackathons & Achievements'
];

export const BlogPage: React.FC = () => {
  useAnalytics();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.title = 'Technical Blog & Architectural Insights | Pranav Shende';
    
    // Update or insert canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://pranavshende.online/blog';

    // Fetch blog posts
    api.getBlogPosts()
      .then((res: any) => {
        if (res && res.data && Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (Array.isArray(res)) {
          setPosts(res);
        }
      })
      .catch((err) => {
        console.warn('Failed to load blog posts:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = 
        selectedCategory === 'All' || 
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q)) ||
        post.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <DoodleLayout>
      <div className="max-w-6xl mx-auto space-y-10 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 dark:text-stone-100 font-semibold">
            Technical Blog
          </span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 text-xs font-semibold shadow-2xs">
            <span>⛩️</span>
            <span>技術日誌 • Architecture & Systems Engineering Journal</span>
            <span className="hanko-stamp text-[9px] w-3.5 h-3.5 ml-1">論</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
            Technical Blog & Insights
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Architectural breakdowns, LLM pipelines, distributed system benchmarks, and engineering lessons 
            by <strong className="font-semibold text-stone-900 dark:text-stone-100">Pranav Shende</strong>.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, architecture, keyword (e.g., Fastify, RAG, Kafka, Gemini)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#16171d] text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8b2323]/30 transition-all shadow-xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#8b2323] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#8b2323] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500 font-mono">Fetching published engineering articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-24 text-center space-y-3 rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200 dark:border-stone-800 p-8">
            <BookOpen className="w-10 h-10 mx-auto text-stone-400 opacity-60" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">No Articles Match Your Search</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search query or selecting "All" to browse all published articles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => {
              const readTime = post.readingTimeMinutes || 5;
              const dateStr = post.publishedAt || post.createdAt
                ? new Date(post.publishedAt || post.createdAt!).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent';

              return (
                <motion.article
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="group rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/90 dark:border-stone-800/90 hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 overflow-hidden flex flex-col shadow-xs hover:shadow-lg"
                >
                  {/* Cover Image */}
                  <Link to={`/blog/${post.slug}`} className="block relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <img
                      src={resolveBlogCover(post.coverImageUrl, post.slug)}
                      alt={post.title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = jarvisBanner;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-wide">
                        {post.category || (post.tags && post.tags[0]) || 'Engineering'}
                      </span>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{dateStr}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{readTime} min read</span>
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-[#8b2323] dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium">
                        <User className="w-3.5 h-3.5 text-[#8b2323]" />
                        <span>{post.author || 'Pranav Shende'}</span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8b2323] dark:text-rose-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </DoodleLayout>
  );
};

export default BlogPage;