import pg from 'pg';
const { Client } = pg;

const DB_URL =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();

    if (req.method === 'GET') {
      const result = await client.query(
        'SELECT slug, "viewCount", "impressionCount" FROM blog_posts WHERE published = true'
      );
      await client.end();

      const stats = {};
      for (const row of result.rows || []) {
        stats[row.slug] = {
          views: Number(row.viewCount) || 0,
          impressions: Number(row.impressionCount) || 0,
        };
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=2, s-maxage=3, stale-while-revalidate=10');
      return res.status(200).json({ success: true, stats });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (_) {
          body = {};
        }
      }
      body = body || {};

      const type = body.type; // 'view' | 'impression'
      const slug = body.slug;
      const slugs = body.slugs;

      if (type === 'view' && slug && typeof slug === 'string') {
        const updateRes = await client.query(
          'UPDATE blog_posts SET "viewCount" = "viewCount" + 1 WHERE slug = $1 RETURNING slug, "viewCount", "impressionCount"',
          [slug]
        );
        await client.end();
        const row = updateRes.rows[0];
        return res.status(200).json({
          success: true,
          slug,
          views: row ? Number(row.viewCount) : 0,
          impressions: row ? Number(row.impressionCount) : 0,
        });
      }

      if (type === 'impression') {
        if (Array.isArray(slugs) && slugs.length > 0) {
          const validSlugs = slugs.filter((s) => typeof s === 'string' && s.trim().length > 0);
          if (validSlugs.length > 0) {
            const updateRes = await client.query(
              'UPDATE blog_posts SET "impressionCount" = "impressionCount" + 1 WHERE slug = ANY($1::text[]) RETURNING slug, "viewCount", "impressionCount"',
              [validSlugs]
            );
            await client.end();
            return res.status(200).json({
              success: true,
              updatedCount: updateRes.rowCount,
              updated: updateRes.rows,
            });
          }
        } else if (slug && typeof slug === 'string') {
          const updateRes = await client.query(
            'UPDATE blog_posts SET "impressionCount" = "impressionCount" + 1 WHERE slug = $1 RETURNING slug, "viewCount", "impressionCount"',
            [slug]
          );
          await client.end();
          const row = updateRes.rows[0];
          return res.status(200).json({
            success: true,
            slug,
            views: row ? Number(row.viewCount) : 0,
            impressions: row ? Number(row.impressionCount) : 0,
          });
        }
      }

      await client.end();
      return res.status(400).json({ success: false, error: 'Invalid type or slug parameters' });
    }

    await client.end();
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('[blog-stats] Error handling request:', error);
    try {
      await client.end();
    } catch (_) {}
    return res.status(500).json({ success: false, error: error.message });
  }
}

