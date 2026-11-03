import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // Verify database connectivity
    await prisma.$connect();
    console.log('✅ Connected to Supabase PostgreSQL database via Prisma');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Portfolio API server running on http://localhost:${PORT}/api/v1`);
      console.log(`📡 Environment: ${env.NODE_ENV}`);
      console.log(`🔒 Admin Auth: HTTP-only secure cookie session`);
      console.log(`📧 Email Service: ${env.SMTP_USER ? 'Active (' + env.SMTP_USER + ')' : 'Mock Mode'}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log('🔌 Database disconnected. Process terminated.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
