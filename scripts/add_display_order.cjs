const { Pool } = require('pg');
require('dotenv').config({ path: './server/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('[Migration] Adding displayOrder column to blog_posts...');
  await pool.query(`
    ALTER TABLE "blog_posts" 
    ADD COLUMN IF NOT EXISTS "displayOrder" INTEGER NOT NULL DEFAULT 0;
  `);

  console.log('[Migration] Creating index on displayOrder...');
  await pool.query(`
    CREATE INDEX IF NOT EXISTS "blog_posts_displayOrder_idx" 
    ON "blog_posts" ("displayOrder");
  `);

  console.log('[Migration] Initializing sequential displayOrder for existing posts...');
  const res = await pool.query(`
    SELECT id, title, slug, "publishedAt", "createdAt" 
    FROM "blog_posts" 
    ORDER BY "publishedAt" DESC NULLS LAST, "createdAt" DESC
  `);

  console.log(`[Migration] Found ${res.rows.length} posts to assign initial order.`);
  for (let i = 0; i < res.rows.length; i++) {
    const post = res.rows[i];
    const order = i + 1;
    await pool.query(`UPDATE "blog_posts" SET "displayOrder" = $1 WHERE id = $2`, [order, post.id]);
    console.log(`  [${order}] ${post.slug}`);
  }

  console.log('[Migration] Successfully added and initialized displayOrder.');
  await pool.end();
}

run().catch(err => {
  console.error('[Migration Error]', err);
  pool.end();
  process.exit(1);
});
