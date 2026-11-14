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
        'SELECT slug, id, "viewCount" FROM projects WHERE published = true'
      );
      await client.end();

      const stats = {};
      for (const row of result.rows || []) {
        stats[row.slug] = {
          views: Number(row.viewCount) || 0,
        };
        if (row.id) {
          stats[row.id] = {
            views: Number(row.viewCount) || 0,
          };
        }
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

      const type = body.type; // 'view'
      const slug = body.slug || body.id;

      if (type === 'view' && slug && typeof slug === 'string') {
        const updateRes = await client.query(
          'UPDATE projects SET "viewCount" = "viewCount" + 1 WHERE slug = $1 OR id = $1 RETURNING slug, id, "viewCount"',
          [slug]
        );
        await client.end();
        const row = updateRes.rows[0];
        return res.status(200).json({
          success: true,
          slug,
          views: row ? Number(row.viewCount) : 0,
        });
      }

      await client.end();
      return res.status(400).json({ success: false, error: 'Invalid type or slug parameter' });
    }

    await client.end();
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('[project-stats] Error handling request:', error);
    try {
      await client.end();
    } catch (_) {}
    return res.status(500).json({ success: false, error: error.message });
  }
}

