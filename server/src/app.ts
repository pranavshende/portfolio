import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, AppError } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration supporting credentials (cookies)
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:8080',
  'http://localhost:5173',
  'https://pranavshende.online',
  'https://www.pranavshende.online',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, or specific origin
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Request parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiter for API
app.use('/api', apiRateLimiter);

// API Routes
app.use('/api/v1', routes);

// 404 handler
app.use('*', (req, _res, next) => {
  next(new AppError(`Endpoint ${req.originalUrl} not found`, 404));
});

// Central Error Handler
app.use(errorHandler);

export default app;
