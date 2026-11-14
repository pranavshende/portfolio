import React, { useState } from 'react';

export interface LoadingThumbnailProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectClass?: string;
  badge?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right';
}

/**
 * LoadingThumbnail
 * Renders photos from Supabase bucket / custom upload with a loading gradient.
 * If photo is not loaded yet, displays an animated loading gradient shimmer.
 * If photo fails or does not exist, renders null (keeping only the text).
 */
export const LoadingThumbnail: React.FC<LoadingThumbnailProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectClass = 'aspect-video w-full',
  badge,
  badgePosition = 'top-left',
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

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

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${containerClassName}`}
    >
      {/* Loading Gradient Shimmer while photo is loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-700/80 dark:to-stone-800 animate-pulse pointer-events-none" />
      )}

      {/* Actual photo */}
      <img
        src={src!}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        className={`${className} transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
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
    trimmed.startsWith('data:image/')
  ) {
    return trimmed;
  }
  return null;
};

export default LoadingThumbnail;
