import pg from 'pg';
const { Client } = pg;

const DB_URL =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const CORE_PAGES = [
  { loc: 'https://pranavshende.online/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://pranavshende.online/about', priority: '0.9', changefreq: 'monthly' },
  { loc: 'https://pranavshende.online/projects', priority: '0.95', changefreq: 'weekly' },
  { loc: 'https://pranavshende.online/blog', priority: '0.95', changefreq: 'daily' },
  { loc: 'https://pranavshende.online/arcade', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://pranavshende.online/playgames', priority: '0.7', changefreq: 'monthly' },
];

const CASE_STUDY_SLUGS = [
  'jarvis-ai',
  'electropathy-ai',
  'tastifyy',
  'pashurakshak',
  'solar-intelligence',
  'jan-sampark',
  'employee-attrition-ai',
];

export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0];

  try {
    const client = new Client({
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });

    await client.connect();

    // Query all published blog posts directly from Supabase
    const blogRes = await client.query(
      'SELECT slug, "publishedAt", "updatedAt" FROM blog_posts WHERE published = true ORDER BY "displayOrder" ASC, "publishedAt" DESC NULLS LAST'
    );

    // Query all published projects
    let projectRows = [];
    try {
      const projRes = await client.query(
        'SELECT slug, "updatedAt" FROM projects WHERE published = true'
      );
      projectRows = projRes.rows || [];
    } catch (_) {}

    await client.end();

    const blogRows = blogRes.rows || [];

    // Construct dynamic XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

    // 1. Core Pages
    xml += `  <!-- Core Navigation Pages -->\n`;
    for (const p of CORE_PAGES) {
      xml += `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    }
    xml += `\n`;

    // 2. Project Case Studies
    xml += `  <!-- Engineering Project Case Studies -->\n`;
    for (const slug of CASE_STUDY_SLUGS) {
      xml += `  <url>\n    <loc>https://pranavshende.online/projects/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    }
    xml += `\n`;

    // 3. Dynamic Blog Posts (live from Supabase database)
    xml += `  <!-- Published Technical Articles (Live from Supabase) -->\n`;
    for (const b of blogRows) {
      const postDate = b.updatedAt
        ? new Date(b.updatedAt).toISOString().split('T')[0]
        : b.publishedAt
        ? new Date(b.publishedAt).toISOString().split('T')[0]
        : today;

      xml += `  <url>\n    <loc>https://pranavshende.online/blog/${b.slug}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }
    xml += `\n</urlset>\n`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    // Cache on Vercel CDN for 5 minutes (s-maxage=300), serve stale up to 1 day while revalidating
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('[sitemap] Failed to generate dynamic sitemap:', err);

    // Fallback: minimal valid sitemap so search engines never get an error
    let fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    fallbackXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const p of CORE_PAGES) {
      fallbackXml += `  <url><loc>${p.loc}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>\n`;
    }
    for (const slug of CASE_STUDY_SLUGS) {
      fallbackXml += `  <url><loc>https://pranavshende.online/projects/${slug}</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>\n`;
    }
    fallbackXml += `</urlset>\n`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');
    return res.status(200).send(fallbackXml);
  }
}

