const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  ssl: { rejectUnauthorized: false }
});

async function check() {
  await c.connect();
  const res = await c.query(`
    SELECT column_name, data_type, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'blog_posts';
  `);
  console.log('Columns in blog_posts:');
  for (const row of res.rows) {
    console.log(`- ${row.column_name} (${row.data_type}) [default: ${row.column_default}]`);
  }
  await c.end();
}

check().catch(console.error);

