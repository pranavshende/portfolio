import React, { useState, useRef, useEffect } from 'react';

export interface LoadingThumbnailProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectClass?: string;
  badge?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right';
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  hideUntilLoaded?: boolean;
  onLoadStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}

/**
 * LoadingThumbnail
 * High-performance image component with intelligent LCP prioritization,
 * native lazy loading, explicit layout dimensions, and memory-safe caching.
 */
export const LoadingThumbnail: React.FC<LoadingThumbnailProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectClass = 'aspect-video w-full',
  badge,
  badgePosition = 'top-left',
  priority = false,
  width = 640,
  height = 360,
  sizes,
  hideUntilLoaded = false,
  onLoadStatusChange,
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(() => {
    // If priority is true or image is data URI, treat as immediately ready
    if (priority || (src && src.startsWith('data:'))) return 'loaded';
    return 'loading';
  });
  const imgRef = useRef<HTMLImageElement>(null);

  // Notify parent of status changes
  useEffect(() => {
    onLoadStatusChange?.(status);
  }, [status, onLoadStatusChange]);

  // Check if image is already cached synchronously in browser
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setStatus('loaded');
    }
  }, [src]);

  // Verify that src is a valid custom photo (e.g. from Supabase bucket or uploaded URL)
  // and NOT a generic placeholder or missing
  const isValidPhoto = Boolean(
    src &&
    typeof src === 'string' &&
    src.trim() !== '' &&
    !src.includes('photo-1555066931-4365d14bab8c')
  );

  if (!isValidPhoto || status === 'error') {
    return null;
  }

  // If hideUntilLoaded is requested, stay hidden until image completes loading
  if (hideUntilLoaded && status !== 'loaded') {
    return (
      <img
        ref={imgRef}
        src={src!}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className="hidden"
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${containerClassName} bg-stone-100 dark:bg-stone-800/60`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Loading Gradient Shimmer - only for non-priority images while pending */}
      {!priority && status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-700/80 dark:to-stone-800 animate-pulse pointer-events-none" />
      )}

      {/* Actual photo with prioritized LCP attributes */}
      <img
        ref={imgRef}
        src={src!}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'auto' : 'async'}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`${className} transition-opacity duration-200 ${
          priority || status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Optional Badge overlay */}
      {badge && (
        <div
          className={`absolute z-10 pointer-events-none ${
            badgePosition === 'top-right' ? 'top-2.5 right-2.5' : 'top-2 left-2'
          }`}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

/**
 * Validates whether an image URL is a real custom uploaded image (e.g. Supabase bucket)
 * Returns the valid URL string, or null if no custom photo exists.
 */
export const resolveCustomPhoto = (url?: string | null): string | null => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed.includes('photo-1555066931-4365d14bab8c')
  ) {
    return null;
  }
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./')
  ) {
    return trimmed;
  }
  return null;
};

export default LoadingThumbnail;
