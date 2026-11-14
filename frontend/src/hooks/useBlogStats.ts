import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api';

export interface BlogStatItem {
  views: number;
  impressions: number;
}

const CACHE_KEY = 'pranav_blog_stats_cache';

export const useBlogStats = () => {
  const [stats, setStats] = useState<Record<string, BlogStatItem>>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (_) {}
    return {};
  });

  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // Fetch stats from server
  const fetchStats = useCallback(async () => {
    try {
      const liveStats = await api.getBlogStats();
      if (liveStats && Object.keys(liveStats).length > 0) {
        setStats((prev) => {
          const merged = { ...prev, ...liveStats };
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          } catch (_) {}
          return merged;
        });
      }
    } catch (_) {}
  }, []);

  // Poll for real-time updates every 8 seconds when window is active
  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchStats();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [fetchStats]);

  // Record a unique view per browser session
  const recordView = useCallback(async (slug: string) => {
    if (!slug) return;
    const sessionKey = `viewed_blog_${slug}`;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(sessionKey)) {
      return; // Already counted this session
    }

    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch (_) {}

    // Optimistic increment
    setStats((prev) => {
      const current = prev[slug] || { views: 0, impressions: 0 };
      return {
        ...prev,
        [slug]: {
          ...current,
          views: current.views + 1,
        },
      };
    });

    try {
      const res = await api.recordBlogView(slug);
      if (res) {
        setStats((prev) => ({
          ...prev,
          [slug]: {
            views: res.views,
            impressions: res.impressions || prev[slug]?.impressions || 0,
          },
        }));
      }
    } catch (_) {}
  }, []);

  // Record unique impressions per browser session for visible cards
  const recordImpressions = useCallback(async (slugs: string[]) => {
    if (!Array.isArray(slugs) || slugs.length === 0) return;

    const toRecord: string[] = [];
    for (const slug of slugs) {
      if (!slug) continue;
      const sessionKey = `imp_blog_${slug}`;
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(sessionKey)) {
        continue;
      }
      try {
        sessionStorage.setItem(sessionKey, '1');
      } catch (_) {}
      toRecord.push(slug);
    }

    if (toRecord.length === 0) return;

    // Optimistic increment
    setStats((prev) => {
      const next = { ...prev };
      for (const slug of toRecord) {
        const cur = next[slug] || { views: 0, impressions: 0 };
        next[slug] = { ...cur, impressions: cur.impressions + 1 };
      }
      return next;
    });

    try {
      await api.recordBlogImpressions(toRecord);
    } catch (_) {}
  }, []);

  // Safe accessor with fallback to post's database properties
  const getStats = useCallback(
    (slug: string, defaultViews = 0, defaultImpressions = 0): BlogStatItem => {
      const current = stats[slug];
      if (current) {
        return {
          views: Math.max(current.views, defaultViews),
          impressions: Math.max(current.impressions, defaultImpressions),
        };
      }
      return { views: defaultViews, impressions: defaultImpressions };
    },
    [stats]
  );

  return {
    stats,
    fetchStats,
    recordView,
    recordImpressions,
    getStats,
  };
};

export default useBlogStats;

