import pg from 'pg';
const { Client } = pg;

const DB_URL =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, OPTIONS');
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
        SELECT id, slug, title, subtitle, client, category, year, "bannerUrl", "featuredThumbnailUrl", "projectPageThumbnailUrl", badge, featured, published, "orderIndex", "viewCount"
        FROM projects
        ORDER BY "orderIndex" ASC, "createdAt" DESC
      `);
      await client.end();

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=2, s-maxage=3, stale-while-revalidate=10');
      return res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
    }

    if (req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH') {
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

      const { orderedIds, items, orders } = body;
      let updates = [];

      if (Array.isArray(orderedIds) && orderedIds.length > 0) {
        updates = orderedIds
          .filter((id) => typeof id === 'string' && id.trim().length > 0)
          .map((id, index) => ({ id: id.trim(), orderIndex: index + 1 }));
      } else if (Array.isArray(items) && items.length > 0) {
        updates = items
          .filter((o) => o && typeof o.id === 'string' && typeof o.orderIndex === 'number')
          .map((o) => ({ id: o.id.trim(), orderIndex: o.orderIndex }));
      } else if (Array.isArray(orders) && orders.length > 0) {
        updates = orders
          .filter((o) => o && typeof o.id === 'string' && typeof o.orderIndex === 'number')
          .map((o) => ({ id: o.id.trim(), orderIndex: o.orderIndex }));
      }

      if (updates.length === 0) {
        await client.end();
        return res.status(400).json({ success: false, message: 'No valid project ordering items provided' });
      }

      await client.query('BEGIN');
      for (const u of updates) {
        await client.query('UPDATE projects SET "orderIndex" = $1 WHERE id = $2 OR slug = $2', [
          u.orderIndex,
          u.id,
        ]);
      }
      await client.query('COMMIT');
      await client.end();

      return res.status(200).json({
        success: true,
        message: 'Project order successfully saved',
        updatedCount: updates.length,
      });
    }

    await client.end();
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (_) {}
    try {
      await client.end();
    } catch (_) {}
    console.error('Project order API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while saving project order',
      error: error.message,
    });
  }
}
