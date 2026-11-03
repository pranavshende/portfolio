# Pranav Shende — Full-Stack Portfolio & Admin Platform

Production URL: [https://pranavshende.online/](https://pranavshende.online/)

A full-stack developer portfolio and content management system featuring a Japanese Sumi-e aesthetic, secure Admin Workspace at `/admin`, dynamic CMS, dual-dispatch SMTP email notifications, privacy-conscious analytics, dynamic resume tracking, and an AI portfolio assistant with RAG.

---

## 📁 Repository Structure

```
portfolio/
├── frontend/                     # React + Vite + Tailwind CSS + Framer Motion
│   ├── src/                      # UI Pages, Components, Hooks & API client
│   │   ├── components/           # Sumi-e Layout, Loader, Chatbot & Contact modal
│   │   ├── pages/                # Home, About, Art, Arcade, PlayGames
│   │   │   └── admin/            # Secure Admin Workspace & 16 section dashboards
│   │   ├── hooks/                # Privacy Analytics tracking hook
│   │   └── lib/api.ts            # Client API Service layer
│   ├── public/                   # Static assets, wallpapers, favicon
│   ├── .env                      # Frontend environment file (API base URL)
│   ├── .env.example              # Frontend environment template
│   ├── package.json              # Frontend dependencies
│   └── vite.config.ts            # Vite configuration
│
├── server/                       # Node.js + Express + Prisma + PostgreSQL
│   ├── src/                      # Controllers, Services, Middleware & Routes
│   │   ├── controllers/          # Auth, Contact, Projects, Content, Analytics, AI
│   │   ├── services/             # Gmail SMTP Dual-Dispatch email engine
│   │   ├── middleware/           # JWT Auth, Rate limiting & Validation
│   │   └── routes/               # Express REST API routes
│   ├── prisma/                   # Prisma ORM Schema (15 models) & Seed script
│   ├── .env                      # Server environment file (Database & SMTP)
│   ├── .env.example              # Server environment template
│   ├── package.json              # Backend dependencies
│   └── tsconfig.json             # TypeScript configuration
│
├── vercel.json                   # Vercel deployment configuration
├── package.json                  # Root monorepo workspace orchestration
└── README.md
```

---

## 🔐 Environment Variables

### 1. Frontend (`frontend/.env`)
```env
# Frontend API Gateway
VITE_API_BASE_URL="http://localhost:5000/api/v1"
```

### 2. Server (`server/.env`)
```env
# Server Port & Environment
PORT=5000
NODE_ENV=development

# PostgreSQL Connection Strings (Supabase Pooler)
DATABASE_URL="postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.bfmdeoypaelpupvcfohy:2241%40PROnity@aws-1-eu-central-1.pooler.supabase.com:5432/postgres"

# Frontend Origin for CORS & Secure Cookies
CLIENT_URL="http://localhost:8080"

# JWT Authentication
JWT_SECRET="pranav_portfolio_super_secure_jwt_secret_2026_change_in_production"
JWT_EXPIRES_IN="7d"

# Initial Super Admin Seed Credentials
ADMIN_EMAIL="pranavshende97@gmail.com"
ADMIN_INITIAL_PASSWORD="Admin@Pranav2026!"

# Email Service Configuration (Gmail SMTP)
EMAIL_SERVICE_TYPE="smtp"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="pranavshende97@gmail.com"
SMTP_PASS="uqpb iduk bkvh crxj"
NOTIFICATION_EMAIL="pranavshende97@gmail.com"

# Supabase Storage Bucket
SUPABASE_URL="https://bfmdeoypaelpupvcfohy.supabase.co"
SUPABASE_STORAGE_BUCKET="images"
```

---

## 🚀 Quick Start

### 1. Run from the Root Directory (Recommended):
```bash
# Start frontend dev server:
npm run dev

# Start backend server:
npm run server

# Build both:
npm run build          # Builds frontend to frontend/dist
npm run server:build   # Builds server to server/dist
```

### 2. Run Independently:

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```

#### Server:
```bash
cd server
npm install
npm run prisma:generate
npm run dev
```

---

## ⛩ Admin Workspace

The protected administrative panel is located at:
- **URL**: `http://localhost:8080/admin` (or `/admin/login`)
- **Super Admin Accounts**: `pranavshende25@gmail.com` or `pranavshende97@gmail.com`
- **Features**: Overview KPIs, Messages & Leads with CSV export, Projects CMS, Experience, Skills, Achievements, Education, Testimonials Moderation, Technical Blog, Newsletter Subscribers, Meeting Bookings, Privacy Analytics, SEO Meta Tags, Site Settings, Audit Logs, and Security Credentials.
