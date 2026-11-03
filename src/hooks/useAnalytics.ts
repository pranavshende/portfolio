import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/lib/api';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Respect Do Not Track header if set
    if (navigator.doNotTrack === '1') {
      return;
    }

    try {
      api.recordAnalytics({
        eventType: 'PAGE_VIEW',
        pageUrl: location.pathname,
        referrer: document.referrer || undefined,
        metadata: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        },
      }).catch(() => {
        // Silently catch in case backend is offline
      });
    } catch {
      // Ignore
    }
  }, [location.pathname]);
}

export default useAnalytics;
