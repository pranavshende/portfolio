import { PrismaClient, AdminRole, ExperienceType, SkillCategory, AchievementCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive portfolio database seeding...');

  // 1. SEED SUPER ADMIN
  const adminEmail = process.env.ADMIN_EMAIL || 'pranavshende97@gmail.com';
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || '2241@PROnity';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: 'Pranav Shende',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });
  console.log(`✅ Admin seeded: ${admin.email}`);

  // 2. SEED SHOWCASE PROJECTS
  const projectsData = [
    {
      slug: 'jarvis',
      title: 'Jarvis AI: Enterprise Intelligence Platform, Official Model Context Protocol (MCP) & Google Gemini 2.5 Pro Engine',
      subtitle: 'Autonomous Enterprise Intelligence • MCP Protocol & Deterministic SQL',
      client: 'Meridian Supply Chain',
      category: 'Enterprise AI & MCP Architecture',
      year: 'Production 2026',
      description:
        'Autonomous enterprise intelligence platform unifying fragmented operations across ERP, WMS, and finance systems into a centralized intelligence layer. Features official Model Context Protocol (MCP v1.0.4) streamable HTTP and stdio transports, zero-hallucination deterministic SQL analytics across a 35-table PostgreSQL star schema, hybrid pgvector RAG with 749+ operational knowledge chunks, dynamic Google Gemini 2.5 Pro/Flash model routing, BullMQ dead-letter queues, and RBAC-controlled action workflows with human-in-the-loop approvals.',
      problemStatement:
        'Operations, inventory, and financial data were scattered across disconnected ERP, WMS, and seller platforms, causing hours of manual data reconciliation, hidden credit breaches, and inaccurate decision-making.',
      solution:
        'Built an enterprise intelligence layer with zero production write risks, deterministic SQL calculations, official Model Context Protocol (MCP) streaming, pgvector knowledge retrieval, and dual-tier Gemini 2.5 Pro/Flash orchestration.',
      architecture:
        'React 18 Vite Client -> Fastify Gateway (Port 4000, MCP, Semantic Cache, DLQ) -> Flask Analytics & RAG Engine -> Supabase PostgreSQL (Star Schema + pgvector) -> Redis / BullMQ -> Google Gemini 2.5 Pro / Flash',
      techStack: [
        'Google Gemini 2.5 Pro',
        'Model Context Protocol (MCP)',
        'Fastify Gateway',
        'pgvector RAG',
        'Deterministic SQL',
        'Supabase',
        'Redis (BullMQ)',
        'TypeScript',
        'React 18',
      ],
      highlights: [
        'Official Model Context Protocol (MCP v1.0.4) integration supporting Streamable HTTP (/mcp/stream) and stdio transports',
        'Deterministic star-schema SQL calculation engine delivering zero-hallucination metrics on inventory, revenue, and credit exposure',
        'Hybrid pgvector RAG knowledge assistant with 749+ verified operational chunks and strict document citations',
        'Dynamic dual-tier LLM routing (Gemini 2.5 Pro for deep reasoning & Flash for rapid execution) with token budget governance',
        'Enterprise resilience with 0.07ms authorization-aware semantic cache, BullMQ Dead-Letter Queues (DLQ), and 100% prompt injection red-team defense',
      ],
      githubUrl: 'https://github.com/pranavshende/jarvis-mcp-multipleDBs',
      demoUrl: 'https://jarvis.pranavshende.online/',
      bannerUrl: '/src/photo/jarvis_banner.png',
      badge: 'Live Enterprise',
      featured: true,
      orderIndex: 1,
    },
    {
      slug: 'electropathy',
      title: 'Electropathy AI: Agentic Clinical RAG Copilot & Multilingual Knowledge Engine with pgvector Semantic Search',
      subtitle: 'Agentic RAG Copilot • pgvector & Multilingual Clinical Engine',
      client: 'Dr. Ashish Wandhare',
      category: 'Agentic AI & Healthcare',
      year: 'Production 2026',
      description:
        'AI-powered clinical decision-support and medical knowledge platform built for Dr. Ashish Wandhare. Integrates an Option A RAG assistant grounded in verified Electropathy literature with zero-hallucination guardrails, pgvector semantic embeddings on Supabase PostgreSQL, multilingual consultation (English, Hindi, Marathi), multi-step patient history intake wizards, and mobile OTP authentication via BlackSMS gateway.',
      problemStatement:
        'Alternative medicine practitioners lacked verified, hallucination-free decision-support systems and structured multilingual digital patient records.',
      solution:
        'Architected a high-dimensional pgvector RAG pipeline with verified clinical datasets, constitutional intake wizards, and SMS-verified authentication.',
      architecture:
        'React 18 Vite Client -> Node.js Express API -> Supabase pgvector Semantic Retrieval & PostgreSQL -> Prisma ORM -> BlackSMS Gateway',
      techStack: [
        'Agentic RAG',
        'Multilingual NLP',
        'pgvector',
        'Prisma ORM',
        'TypeScript',
        'Node.js',
        'Supabase',
        'Tailwind CSS',
      ],
      highlights: [
        'Option A RAG Knowledge Assistant grounded in verified Electropathy datasets with strict zero-hallucination guardrails',
        'High-dimensional pgvector semantic embeddings enabling context-aware multilingual inquiry in English, Hindi & Marathi',
        'Comprehensive clinical patient intake wizard capturing demographics, chief complaints, lifestyle, and constitutional mapping',
        'Full-stack architecture with React Vite client, Node.js Express server, Prisma ORM, and Supabase PostgreSQL',
      ],
      githubUrl: 'https://github.com/pranavshende/Electropathy_AI',
      demoUrl: 'https://client-raprax.vercel.app',
      bannerUrl: '/src/photo/electropathy_banner.png',
      badge: 'Live Production',
      featured: true,
      orderIndex: 2,
    },
    {
      slug: 'tastifyy',
      title: 'Tastifyy: Distributed On-Demand Food Logistics Engine with Kafka Streaming & Redis Geospatial',
      subtitle: 'Kafka Event Pipeline • Redis Geospatial & Multi-Role Mobile Platform',
      client: 'On-Demand Logistics',
      category: 'Distributed Systems & Mobile',
      year: 'Shipped 2026',
      description:
        'Full-scale multi-role food delivery and logistics platform featuring dual client surfaces (React 19 Web Portal + React Native Mobile App), Kafka event streaming for real-time order dispatching, Redis geospatial indexing for delivery radius optimization, Node.js Express API, and live Socket.io driver tracking.',
      problemStatement:
        'High order volume dispatching in urban environments causes bottlenecks without distributed message queues and spatial caching.',
      solution:
        'Deployed Apache Kafka for decoupled dispatch events and Redis geospatial queries for instant driver proximity matching within a 5km radius.',
      architecture:
        'Dual Client (React 19 + Expo React Native) -> API Gateway -> Kafka Order Stream -> Redis Geospatial -> Socket.io Broadcast -> PostgreSQL',
      techStack: [
        'Kafka Streams',
        'Redis Geospatial',
        'WebSockets (Socket.io)',
        'Distributed Systems',
        'React 19',
        'React Native',
        'TypeScript',
        'Prisma',
      ],
      highlights: [
        'Multi-role synchronized ecosystem: Customer Portal, Restaurant Partner Dashboard, Delivery Driver App, and Admin Hub',
        'Event-driven order pipeline using Apache Kafka message streaming for asynchronous dispatch and payment settlement',
        'High-throughput Redis geospatial caching calculating driver-to-restaurant proximity in sub-10ms intervals',
        'Real-time bi-directional live GPS tracking over Socket.io with push notifications and automated delivery status transitions',
      ],
      githubUrl: 'https://github.com/pranavshende/tastifyy',
      demoUrl: null,
      bannerUrl: '/src/photo/tastifyy_banner.png',
      badge: 'Production Shipped',
      featured: true,
      orderIndex: 3,
    },
    {
      slug: 'attrition',
      title: 'Cognitive Employee Attrition & Retention Intelligence System with SHAP Analytics',
      subtitle: 'Predictive HR Analytics • SHAP Explainability & Cost Risk Mitigation',
      client: 'Enterprise HR Tech',
      category: 'Predictive Analytics & Enterprise ML',
      year: 'Production 2026',
      description:
        'Enterprise predictive HR analytics dashboard with cognitive attrition modeling, SHAP explainable AI attribution, salary-hike simulations, and turnover replacement cost calculations for data-driven employee retention.',
      problemStatement:
        'Unanticipated employee departures cost enterprises thousands in recruitment and knowledge drain without actionable warning indicators.',
      solution:
        'Integrated supervised machine learning models with SHAP feature attribution to explain key flight-risk drivers and suggest customized retention packages.',
      architecture:
        'Python FastAPI / Express Server -> Scikit-Learn Predictive Model -> SHAP Explainability Pipeline -> Interactive React Dashboard',
      techStack: [
        'Predictive Analytics',
        'SHAP Explainable AI',
        'Scikit-Learn',
        'PostgreSQL',
        'React.js',
        'Tailwind CSS',
        'Recharts',
        'FastAPI',
      ],
      highlights: [
        'Supervised cognitive attrition prediction model trained on enterprise demographic, compensation, and performance datasets',
        'SHAP (SHapley Additive exPlanations) visual breakdown revealing exact individual attrition risk factors per department',
        'Interactive financial risk calculator computing replacement costs and ROI of preventative salary or role adjustments',
        'Enterprise-grade filtering by department, tenure, performance rating, work-life balance, and satisfaction indices',
      ],
      githubUrl: 'https://github.com/PranavShende/EmployeeAttritionSystem',
      demoUrl: null,
      bannerUrl: '/src/photo/attrition_banner.png',
      badge: 'Live Production',
      featured: true,
      orderIndex: 4,
    },
    {
      slug: 'jansampark',
      title: 'JanSampark: Municipal Citizen Grievance Redressal & Civic CRM Platform',
      subtitle: 'Smart Governance • React Native & Scalable Geo-Tagged Civic CRM',
      client: 'NK SkillEdge',
      category: 'Civic-Tech & Mobile',
      year: '2026',
      description:
        'Cross-platform civic governance application built for municipal administration. Features 25+ React Native screens, geo-tagged photo grievance reporting, real-time ticket escalation workflows, multilingual support, and ward-level resolution analytics.',
      problemStatement:
        'Citizen complaints were tracked manually with spreadsheets, leading to delayed municipal resolutions and low accountability.',
      solution:
        'Engineered a mobile-first civic CRM with automatic GPS coordinates, image attachments, ward-level assignment, and automated SLA timers.',
      architecture:
        'React Native (Expo) -> Express API -> PostgreSQL / Prisma -> Cloudinary Storage -> Ward Officer Portal',
      techStack: [
        'React Native',
        'MERN Stack',
        'PostgreSQL',
        'Expo',
        'GPS Geo-tagging',
        'Express.js',
        'Node.js',
        'Prisma',
      ],
      highlights: [
        'Over 25 production-ready mobile screens developed from scratch with custom UI components and offline storage',
        'GPS geo-tagged photo grievance reporting automatically assigning tickets to local municipal ward supervisors',
        'Multi-stage administrative escalation lifecycle with automated SLA countdowns and citizen SMS status alerts',
        'High-density dashboard allowing city commissioners to monitor department-wise closure rates and citizen satisfaction',
      ],
      githubUrl: 'https://github.com/PranavShende/JanSampark',
      demoUrl: null,
      bannerUrl: '/src/photo/jansampark.png',
      badge: 'Civic Platform',
      featured: true,
      orderIndex: 5,
    },
    {
      slug: 'solar',
      title: 'Solar Intelligence: Nationwide Renewable Energy Analytics Engine & Generation Predictor',
      subtitle: 'Renewable Energy • 81.8+ GW Fleet Geospatial Predictive Modeling',
      client: 'IT Daksh',
      category: 'Data Analytics & ML',
      year: '2026',
      description:
        'Data engineering pipeline and interactive geospatial dashboard analyzing 81.8+ GW of solar installations across India. Models weather degradation, predictive yield anomalies, tariff trends, and regional solar irradiance using Python and PostgreSQL.',
      problemStatement:
        'Fragmented state-level renewable data hindered nationwide yield forecasting and maintenance scheduling for solar assets.',
      solution:
        'Consolidated nationwide generation datasets with weather cross-correlation to detect sub-optimal inverter strings.',
      architecture:
        'Python Data Pipeline (Pandas / NumPy) -> PostgreSQL DB -> Express API -> Recharts Geospatial Visualization Client',
      techStack: [
        'Python',
        'Data Analytics',
        'PostgreSQL',
        'Predictive Modeling',
        'Geospatial Mapping',
        'Express.js',
        'Recharts',
        'Pandas',
      ],
      highlights: [
        'ETL pipeline processing generation data from 81.8+ GW of operational solar photovoltaic plants across Indian states',
        'Predictive degradation modeling cross-correlating solar irradiance, ambient temperature, and inverter performance',
        'Interactive geospatial state-wise heatmaps displaying tariff rate fluctuations and estimated renewable ROI',
        'Executive reporting tools calculating nationwide carbon offset metrics and forecasting seasonal peak generation',
      ],
      githubUrl: 'https://github.com/PranavShende/SolarSalesAnalysis',
      demoUrl: null,
      bannerUrl: '/src/photo/solar_analytics.png',
      badge: 'Renewable Analytics',
      featured: true,
      orderIndex: 6,
    },
    {
      slug: 'pashurakshak',
      title: 'PashuRakshak: Edge-Quantized Mobile Livestock Health Diagnostics & Veterinary Copilot',
      subtitle: 'Veterinary AI • Edge-Quantized CNNs & Offline Rural Diagnostics',
      client: 'IEEE Research Publication',
      category: 'Edge AI & Agri-Tech',
      year: '2025 – 2026',
      description:
        'Edge AI veterinary diagnosis application designed for rural farmers with zero internet connectivity. Employs lightweight quantized convolutional neural networks (CNNs) for instant visual detection of livestock skin diseases, accompanied by offline first-aid guides.',
      problemStatement:
        'Rural farmers suffer catastrophic livestock losses due to lack of veterinary doctors and delayed diagnosis of contagious diseases like Lumpy Skin Disease.',
      solution:
        'Quantized deep convolutional neural network running entirely on-device on low-cost smartphones without requiring cellular connectivity.',
      architecture:
        'TensorFlow Lite Mobile Inference -> React Native Mobile App -> SQLite Offline Storage -> Peer-reviewed IEEE CNN Architecture',
      techStack: [
        'TensorFlow Lite',
        'Edge AI',
        'CNNs',
        'React Native',
        'Computer Vision',
        'Offline-First',
        'Quantization',
        'Python',
      ],
      highlights: [
        'Quantized convolutional neural network optimized for offline inference on low-cost Android hardware with sub-200ms latency',
        'Recognizes signs of Lumpy Skin Disease and common bovine dermatological infections with high validation accuracy',
        'Published in IEEE proceedings: "CNN Based Classification of Lumpy Skin Disease" (OTCON 2025)',
        'Bilingual vernacular user interface providing actionable isolation steps and veterinary emergency helplines',
      ],
      githubUrl: 'https://github.com/PranavShende/HackNation_SKB-F17_SKB_P2',
      demoUrl: null,
      bannerUrl: '/src/photo/pashurakshak.png',
      badge: 'IEEE Published',
      featured: true,
      orderIndex: 7,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log(`✅ Seeded ${projectsData.length} projects`);

  // 3. SEED EXPERIENCES
  const experiences = [
    {
      company: 'NK SkillEdge',
      role: 'Full Stack & Mobile Developer Intern',
      location: 'Nagpur, India',
      type: ExperienceType.INTERNSHIP,
      startDate: new Date('2025-10-01'),
      endDate: null,
      current: true,
      description:
        'Leading the development of JanSampark, an enterprise civic complaint resolution ecosystem spanning 25+ React Native mobile screens and scalable Express.js backend services.',
      responsibilities: [
        'Architected 25+ modular React Native screens featuring geo-tagged grievance submission, bottom sheets, and multi-ward routing',
        'Integrated PostgreSQL database schema with Prisma ORM for municipal ticket escalation management and SLA monitoring',
        'Optimized client bundle size and implemented offline caching for users in low-bandwidth rural municipal regions',
      ],
      achievements: [
        'Reduced incident submission drop-off rate by 34% through step-by-step intake wizard redesign',
        'Successfully completed pilot testing covering multiple civic zones',
      ],
      technologies: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Expo'],
      orderIndex: 1,
    },
    {
      company: 'IT Daksh',
      role: 'Data Engineering & Analytics Intern',
      location: 'Nagpur, India',
      type: ExperienceType.INTERNSHIP,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-09-30'),
      current: false,
      description:
        'Built automated analytics engines and geospatial data dashboards analyzing solar power generation across 81.8+ GW of photovoltaic capacity across India.',
      responsibilities: [
        'Created data pipelines in Python (Pandas, NumPy) to cleanse, normalize, and aggregate multi-state power generation data',
        'Implemented predictive yield models analyzing regional solar irradiance and panel temperature coefficients',
        'Designed interactive data visualizations in React with Recharts for executive tariff analysis',
      ],
      achievements: [
        'Automated monthly generation anomaly reporting saving 20+ hours of manual data consolidation',
      ],
      technologies: ['Python', 'Pandas', 'PostgreSQL', 'Data Analytics', 'React', 'Recharts'],
      orderIndex: 2,
    },
    {
      company: 'Computer Society of India (CSI)',
      role: 'Technical Head',
      location: 'SVPCET, Nagpur',
      type: ExperienceType.CONTRACT,
      startDate: new Date('2024-08-01'),
      endDate: null,
      current: true,
      description:
        'Directing all technical initiatives, hackathons, coding workshops, and internal platforms for the student chapter.',
      responsibilities: [
        'Architected web platforms for inter-college techfests and hackathon registration portals',
        'Mentored 80+ junior student developers in modern web development, Git workflows, and API architectures',
      ],
      achievements: [
        'Spearheaded IAC 2.0 hackathon technical operations with 400+ participants and zero platform downtime',
      ],
      technologies: ['Full Stack', 'Mentorship', 'Leadership', 'Hackathons', 'Event Systems'],
      orderIndex: 3,
    },
  ];

  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: exp.company, role: exp.role },
    });
    if (existing) {
      await prisma.experience.update({ where: { id: existing.id }, data: exp });
    } else {
      await prisma.experience.create({ data: exp });
    }
  }
  console.log(`✅ Seeded ${experiences.length} career experiences`);

  // 4. SEED ACHIEVEMENTS & RESEARCH PUBLICATIONS
  const achievements = [
    {
      title: 'CNN Based Classification of Lumpy Skin Disease (IEEE OTCON 2025)',
      organization: 'IEEE 4th International Conference on Technology and Management',
      date: 'May 2025',
      category: AchievementCategory.PUBLICATION,
      description:
        'Primary author of peer-reviewed research on quantized deep convolutional networks for automated dermatological bovine infection diagnostics in rural environments with edge inference.',
      badge: 'IEEE Conference',
      certificateUrl: 'https://doi.org/10.1109/OTCON65728.2025.11070341',
      orderIndex: 1,
    },
    {
      title: 'Intelligent Platform to Interconnect Alumni and Student for Educational Institutes',
      organization: 'International Journal on Advanced Computer Theory and Engineering (IJACTE)',
      date: 'May 2025',
      category: AchievementCategory.PUBLICATION,
      description:
        'Published in IJACTE 14(1): 193–197. Researched mentorship networks, automated career matchmaking algorithms, and verified alumni institutional networks.',
      badge: 'IJACTE Journal',
      certificateUrl: 'https://doi.org/10.65521/ijacte.v14i1.388',
      orderIndex: 2,
    },
    {
      title: 'Codetronics Robotics Competition - 2nd Place',
      organization: 'SVPCET Techfest',
      date: 'March 2024',
      category: AchievementCategory.HACKATHON,
      description:
        'Designed autonomous line-following and obstacle-avoidance robotic vehicle using embedded C++ and microcontrollers.',
      badge: 'Runner Up',
      orderIndex: 3,
    },
  ];

  for (const ach of achievements) {
    const existing = await prisma.achievement.findFirst({
      where: { title: ach.title },
    });
    if (existing) {
      await prisma.achievement.update({ where: { id: existing.id }, data: ach });
    } else {
      await prisma.achievement.create({ data: ach });
    }
  }
  console.log(`✅ Seeded ${achievements.length} achievements`);

  // 5. SEED EDUCATION
  const education = {
    institution: 'St. Vincent Pallotti College of Engineering & Technology (SVPCET)',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Information Technology',
    grade: '8.4 CGPA',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2027-06-30'),
    activities: [
      'Technical Head at Computer Society of India (CSI)',
      'Elected Class Representative (CR)',
      'Active Open Source Contributor & GSSoC Mentor',
    ],
    orderIndex: 1,
  };

  const existingEdu = await prisma.education.findFirst({
    where: { institution: education.institution },
  });
  if (existingEdu) {
    await prisma.education.update({ where: { id: existingEdu.id }, data: education });
  } else {
    await prisma.education.create({ data: education });
  }
  console.log(`✅ Seeded education`);

  // 6. SEED CORE SKILLS
  const skills = [
    { name: 'TypeScript', category: SkillCategory.LANGUAGES, proficiency: 92, isFeatured: true, orderIndex: 1 },
    { name: 'JavaScript (ES6+)', category: SkillCategory.LANGUAGES, proficiency: 95, isFeatured: true, orderIndex: 2 },
    { name: 'Node.js', category: SkillCategory.BACKEND, proficiency: 94, isFeatured: true, orderIndex: 3 },
    { name: 'Express.js', category: SkillCategory.BACKEND, proficiency: 94, isFeatured: true, orderIndex: 4 },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, proficiency: 90, isFeatured: true, orderIndex: 5 },
    { name: 'Prisma ORM', category: SkillCategory.DATABASE, proficiency: 92, isFeatured: true, orderIndex: 6 },
    { name: 'React 18 / 19', category: SkillCategory.FRONTEND, proficiency: 90, isFeatured: true, orderIndex: 7 },
    { name: 'React Native (Expo)', category: SkillCategory.FRONTEND, proficiency: 88, isFeatured: true, orderIndex: 8 },
    { name: 'Apache Kafka', category: SkillCategory.BACKEND, proficiency: 82, isFeatured: true, orderIndex: 9 },
    { name: 'Redis Geospatial', category: SkillCategory.DATABASE, proficiency: 86, isFeatured: true, orderIndex: 10 },
    { name: 'Agentic RAG & pgvector', category: SkillCategory.AI_ML, proficiency: 88, isFeatured: true, orderIndex: 11 },
    { name: 'TensorFlow Lite', category: SkillCategory.AI_ML, proficiency: 84, isFeatured: true, orderIndex: 12 },
    { name: 'Docker', category: SkillCategory.DEVOPS_CLOUD, proficiency: 80, isFeatured: false, orderIndex: 13 },
    { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, proficiency: 95, isFeatured: true, orderIndex: 14 },
    { name: 'Supabase', category: SkillCategory.DEVOPS_CLOUD, proficiency: 90, isFeatured: true, orderIndex: 15 },
  ];

  for (const sk of skills) {
    await prisma.skill.upsert({
      where: { name: sk.name },
      update: sk,
      create: sk,
    });
  }
  console.log(`✅ Seeded ${skills.length} technical skills`);

  // 7. SEED ACTIVE RESUME
  const activeResume = await prisma.resume.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {
      version: '2026.1',
      fileName: 'Pranav_Shende_Resume_2026.pdf',
      fileUrl: '/resume.pdf',
      isActive: true,
    },
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      version: '2026.1',
      fileName: 'Pranav_Shende_Resume_2026.pdf',
      fileUrl: '/resume.pdf',
      downloadCount: 42,
      isActive: true,
    },
  });
  console.log(`✅ Seeded active resume: ${activeResume.fileName}`);

  console.log('\n✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
