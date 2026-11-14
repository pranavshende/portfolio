const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const serverRequire = createRequire(path.join(__dirname, '../server/package.json'));

require('dotenv').config({ path: path.join(__dirname, '../server/.env') });
const { PrismaClient } = serverRequire('@prisma/client');

const fallbackDbUrl = "postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:5432/postgres";
const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || fallbackDbUrl;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl
    }
  }
});

function cleanExcerpt(excerpt, content, maxLength = 175) {
  if (
    excerpt &&
    typeof excerpt === 'string' &&
    excerpt.trim().length > 0 &&
    excerpt.trim().toLowerCase() !== 'undefined' &&
    excerpt.trim().toLowerCase() !== 'null'
  ) {
    const trimmed = excerpt.trim();
    if (trimmed.length <= maxLength) return trimmed;
    const truncated = trimmed.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated).trim() + '...';
  }

  if (!content || typeof content !== 'string') {
    return 'Technical engineering deep-dive, system architecture breakdown, and implementation insights by Pranav Shende.';
  }

  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^(?:---|\*\*\*|___)\s*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) {
    return 'Technical engineering deep-dive, system architecture breakdown, and implementation insights by Pranav Shende.';
  }

  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).trim() + '...';
}

async function main() {
  console.log('[Sync] Connecting to Supabase database...');
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [
      { displayOrder: 'asc' },
      { publishedAt: 'desc' }
    ]
  });
  console.log(`[Sync] Retrieved ${blogs.length} published blog posts.`);

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
  console.log(`[Sync] Retrieved ${projects.length} projects.`);

  // Write blogs manifest for frontend instant hydration
  const manifestData = blogs.map(b => {
    const postExcerpt = cleanExcerpt(b.excerpt || b.summary, b.content, 180);
    return {
      id: b.id,
      slug: b.slug,
      title: b.title,
      subtitle: b.subtitle || '',
      category: b.category || 'Engineering',
      excerpt: postExcerpt,
      description: postExcerpt,
      content: b.content,
      author: b.author || 'Pranav Shende',
      readingTimeMinutes: b.readingTimeMinutes || 5,
      coverImageUrl: b.coverImageUrl || b.bannerUrl || null,
      tags: Array.isArray(b.tags) ? b.tags : [],
      viewCount: b.viewCount || 0,
      impressionCount: b.impressionCount || 0,
      displayOrder: b.displayOrder || 0,
      publishedAt: b.publishedAt ? b.publishedAt.toISOString() : b.createdAt.toISOString(),
      updatedAt: b.updatedAt ? b.updatedAt.toISOString() : b.createdAt.toISOString(),
      seoTitle: b.seoTitle || `${b.title} | Technical Blog by Pranav Shende`,
      seoDescription: b.seoDescription || postExcerpt
    };
  });

  const publicManifestPath = path.join(__dirname, '../frontend/public/blogs-manifest.json');
  fs.writeFileSync(publicManifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`[Sync] Wrote ${publicManifestPath}`);

  // Generate dynamic sitemap.xml
  const today = new Date().toISOString().split('T')[0];

  const caseStudySlugs = [
    'jarvis-ai',
    'electropathy-ai',
    'tastifyy',
    'pashurakshak',
    'solar-intelligence',
    'jan-sampark',
    'employee-attrition-ai'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  // Core Pages
  const corePages = [
    { loc: 'https://pranavshende.online/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://pranavshende.online/about', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://pranavshende.online/projects', priority: '0.95', changefreq: 'weekly' },
    { loc: 'https://pranavshende.online/blog', priority: '0.95', changefreq: 'daily' },
    { loc: 'https://pranavshende.online/arcade', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://pranavshende.online/playgames', priority: '0.7', changefreq: 'monthly' }
  ];

  xml += `  <!-- Core Navigation Pages -->\n`;
  for (const p of corePages) {
    xml += `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
  }
  xml += `\n`;

  // Project Case Studies
  xml += `  <!-- Engineering Project Case Studies -->\n`;
  for (const slug of caseStudySlugs) {
    xml += `  <url>\n    <loc>https://pranavshende.online/projects/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }
  xml += `\n`;

  // Dynamic Blog Posts
  xml += `  <!-- Published Technical Articles & Deep-Dives -->\n`;
  for (const b of manifestData) {
    const postDate = b.updatedAt ? b.updatedAt.split('T')[0] : (b.publishedAt ? b.publishedAt.split('T')[0] : today);
    xml += `  <url>\n    <loc>https://pranavshende.online/blog/${b.slug}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  }
  xml += `\n</urlset>\n`;

  const sitemapPath = path.join(__dirname, '../frontend/public/sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`[Sync] Wrote updated sitemap with ${manifestData.length} articles to ${sitemapPath}`);
}

main()
  .catch((err) => {
    console.error('[Sync] Error syncing from Supabase:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
