import pg from 'pg';
const { Client } = pg;

const DB_URL =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
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
      const result = await client.query(`
        SELECT id, slug, title, category, "coverImageUrl", published, "publishedAt", "displayOrder", "viewCount", "impressionCount"
        FROM blog_posts
        WHERE published = true
        ORDER BY "displayOrder" ASC, "publishedAt" DESC NULLS LAST
      `);
      await client.end();

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=2, s-maxage=3, stale-while-revalidate=10');
      return res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      // Validate Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        await client.end();
        return res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication required' });
      }

      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (_) {
          body = {};
        }
      }
      body = body || {};

      const { orderedIds, orders } = body;
      let updates = [];

      if (Array.isArray(orderedIds) && orderedIds.length > 0) {
        updates = orderedIds
          .filter((id) => typeof id === 'string' && id.trim().length > 0)
          .map((id, index) => ({ id: id.trim(), displayOrder: index + 1 }));
      } else if (Array.isArray(orders) && orders.length > 0) {
        updates = orders
          .filter((o) => o && typeof o.id === 'string' && typeof o.displayOrder === 'number')
          .map((o) => ({ id: o.id.trim(), displayOrder: o.displayOrder }));
      }

      if (updates.length === 0) {
        await client.end();
        return res.status(400).json({ success: false, message: 'No valid blog ordering items provided' });
      }

      await client.query('BEGIN');
      for (const u of updates) {
        await client.query('UPDATE blog_posts SET "displayOrder" = $1 WHERE id = $2', [
          u.displayOrder,
          u.id,
        ]);
      }
      await client.query('COMMIT');
      await client.end();

      return res.status(200).json({
        success: true,
        message: 'Blog order successfully saved',
        updatedCount: updates.length,
      });
    }

    await client.end();
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('[blog-order] Error handling request:', error);
    try {
      await client.query('ROLLBACK');
      await client.end();
    } catch (_) {}
    return res.status(500).json({ success: false, error: error.message });
  }
}

