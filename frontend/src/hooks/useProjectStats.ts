import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api';

export interface ProjectStatItem {
  views: number;
}

const CACHE_KEY = 'pranav_project_stats_cache';

export const useProjectStats = () => {
  const [stats, setStats] = useState<Record<string, ProjectStatItem>>(() => {
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
      const liveStats = await api.getProjectStats();
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

  // Poll for real-time updates every 10 seconds when window is active
  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchStats();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchStats]);

  // Record a unique view per browser session
  const recordView = useCallback(async (slug: string) => {
    if (!slug) return;
    const sessionKey = `viewed_project_${slug}`;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(sessionKey)) {
      return; // Already counted this session
    }

    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch (_) {}

    // Optimistic local update
    setStats((prev) => {
      const current = prev[slug]?.views || 0;
      const updated = {
        ...prev,
        [slug]: { views: current + 1 },
      };
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      const res = await api.recordProjectView(slug);
      if (res && typeof res.views === 'number') {
        setStats((prev) => {
          const updated = {
            ...prev,
            [slug]: { views: res.views },
          };
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
          } catch (_) {}
          return updated;
        });
      }
    } catch (_) {}
  }, []);

  const getProjectViews = useCallback(
    (slug: string, fallbackViews: number = 0): number => {
      const live = stats[slug];
      if (live && typeof live.views === 'number') {
        return Math.max(live.views, fallbackViews);
      }
      return fallbackViews;
    },
    [stats]
  );

  return {
    stats,
    recordView,
    getProjectViews,
    refreshStats: fetchStats,
  };
};

export default useProjectStats;
