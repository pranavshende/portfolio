const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  await c.connect();
  console.log('Adding impressionCount column to blog_posts...');
  await c.query(`
    ALTER TABLE blog_posts 
    ADD COLUMN IF NOT EXISTS "impressionCount" INTEGER NOT NULL DEFAULT 0;
  `);
  console.log('Migration successful!');
  
  // Verify columns again
  const res = await c.query(`
    SELECT column_name, data_type, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name IN ('viewCount', 'impressionCount');
  `);
  console.log('Verified columns:');
  console.log(res.rows);
  await c.end();
}

migrate().catch(console.error);

