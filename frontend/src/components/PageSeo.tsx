import React, { useEffect } from 'react';

export interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const DEFAULT_KEYWORDS = [
  'Pranav Shende',
  'pranav',
  'shende',
  'pranav shende',
  'shende pranav',
  'Shende Pranav',
  'pranavshende',
  'pranav shende portfolio',
  'Pranav Shende developer',
  'shende developer',
  'Full Stack Developer Nagpur',
  'Backend Developer India',
  'Forward Deployed Engineer',
  'AI Engineer Portfolio',
  'React Node.js Developer',
  'RAG Application Developer',
  'Backend Architecture Projects',
  'Model Context Protocol',
  'pgvector',
  'PostgreSQL',
  'Kafka',
  'Redis',
  'Distributed Systems',
  'SVPCET Nagpur'
];

const DEFAULT_OG_IMAGE = 'https://pranavshende.online/og-image.png';

/**
 * Universal SEO Metadata Component & DOM Injector
 * Dynamically updates document.title, canonical link, meta tags (SEO, Open Graph, Twitter Card, Robots),
 * and JSON-LD structured schema on every route transition in React SPA.
 */
export const PageSeo: React.FC<PageSeoProps> = ({
  title,
  description,
  canonicalPath,
  keywords,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  jsonLd,
  noindex = false,
  publishedTime,
  modifiedTime,
  author = 'Pranav Shende'
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Page Title
    document.title = title;

    // Helper: upsert <meta name="...">
    const setMetaByName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Helper: upsert <meta property="...">
    const setMetaByProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // 2. Standard Meta Tags
    setMetaByName('title', title);
    setMetaByName('description', description);
    const kwList = keywords && keywords.length > 0 ? keywords : DEFAULT_KEYWORDS;
    setMetaByName('keywords', kwList.join(', '));

    // Robots directive
    const robotsDirective = noindex 
      ? 'noindex, nofollow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaByName('robots', robotsDirective);
    setMetaByName('googlebot', robotsDirective);
    setMetaByName('bingbot', robotsDirective);

    // 3. Canonical URL
    const canonicalUrl = canonicalPath !== undefined
      ? `https://pranavshende.online${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`
      : (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://pranavshende.online/');

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // 4. Open Graph Tags
    setMetaByProperty('og:site_name', 'Pranav Shende Portfolio');
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:type', ogType);
    setMetaByProperty('og:image', ogImage);
    setMetaByProperty('og:image:alt', ogImageAlt || title);
    setMetaByProperty('og:locale', 'en_IN');

    if (ogType === 'article') {
      if (publishedTime) setMetaByProperty('article:published_time', publishedTime);
      if (modifiedTime) setMetaByProperty('article:modified_time', modifiedTime);
      if (author) setMetaByProperty('article:author', author);
    }

    // 5. Twitter Card Tags
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:site', '@pranavshende');
    setMetaByName('twitter:creator', '@pranavshende');
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', ogImage);
    setMetaByName('twitter:image:alt', ogImageAlt || title);

    // 6. JSON-LD Structured Data Schema
    const scriptId = 'page-seo-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up dynamic schema when navigating away
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [
    title,
    description,
    canonicalPath,
    keywords,
    ogType,
    ogImage,
    ogImageAlt,
    jsonLd,
    noindex,
    publishedTime,
    modifiedTime,
    author
  ]);

  return null;
};

export default PageSeo;

