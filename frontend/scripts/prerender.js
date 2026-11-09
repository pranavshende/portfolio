/**
 * Static Pre-Rendering & SEO Engine for Pranav Shende Portfolio
 * Generates route-specific static HTML files in dist/ so search engine crawlers
 * (Googlebot, Bingbot, Baiduspider) and AI systems (GPTBot, Perplexity, ClaudeBot)
 * receive 100% complete HTML, metadata, and JSON-LD structured data on every route.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('[Prerender] Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');

// Case Study Data for static route generation
const CASE_STUDIES = [
  {
    slug: 'jarvis-ai',
    title: 'Jarvis 1.0 Enterprise AI Platform | Case Study by Pranav Shende',
    description: 'Autonomous enterprise intelligence platform with official Model Context Protocol (MCP v1.0.4) streaming, deterministic SQL across 35 tables, and pgvector RAG with Google Gemini 2.5 Pro.',
    headline: 'Jarvis 1.0 Enterprise AI: Autonomous Intelligence, Model Context Protocol & Google Gemini 2.5 Pro',
    category: 'Enterprise AI & MCP Architecture',
    tech: 'Google Gemini 2.5 Pro, MCP v1.0.4, Fastify, pgvector, PostgreSQL, Supabase, BullMQ',
    summary: 'Autonomous enterprise intelligence platform unifying fragmented operations across ERP, warehouse management, and finance systems into a centralized intelligence layer with zero-hallucination deterministic SQL.'
  },
  {
    slug: 'electropathy-ai',
    title: 'Electropathy AI Clinical Engine | Case Study by Pranav Shende',
    description: 'Agentic clinical decision-support and multilingual knowledge engine with pgvector semantic search in English, Hindi, and Marathi with zero-hallucination medical literature grounding.',
    headline: 'Electropathy AI: Agentic Clinical Decision-Support & Multilingual Knowledge Engine',
    category: 'Agentic AI & Healthcare',
    tech: 'Agentic RAG, pgvector, Multilingual NLP, Node.js, Express, Supabase, Prisma ORM',
    summary: 'AI-powered clinical decision-support platform built for Dr. Ashish Wandhare with strict Option A RAG grounding and multilingual patient intake.'
  },
  {
    slug: 'tastifyy',
    title: 'Tastifyy Delivery Ecosystem | Case Study by Pranav Shende',
    description: 'High-throughput on-demand food delivery platform featuring Apache Kafka event streams, Redis geospatial caching, React 19 web portal, and Expo mobile app.',
    headline: 'Tastifyy: Distributed On-Demand Food Logistics Engine with Kafka & Redis Geospatial',
    category: 'Distributed Systems & Logistics',
    tech: 'Apache Kafka, Redis Geospatial, Socket.io, React 19, React Native, Express, Prisma',
    summary: 'On-demand delivery platform with event-driven state transitions, live geospatial courier proximity dispatch, and dual web/mobile clients.'
  },
  {
    slug: 'pashurakshak',
    title: 'PashuRakshak Edge AI Livestock Diagnostics | Case Study by Pranav Shende',
    description: 'Offline-first Edge AI veterinary diagnostics system with quantized TensorFlow Lite INT8 CNNs for sub-120ms livestock disease detection. Published at IEEE OTCON.',
    headline: 'PashuRakshak: Edge Computing Livestock Pathology Classifier (IEEE Published)',
    category: 'Edge Computing & Computer Vision',
    tech: 'Edge Computing, Quantized CNNs (INT8), TensorFlow Lite, React Native, IEEE Research',
    summary: 'Edge computing veterinary diagnostics system designed for zero-connectivity rural farms with on-device INT8 neural networks.'
  },
  {
    slug: 'solar-intelligence',
    title: 'Solar Big Data Intelligence Platform | Case Study by Pranav Shende',
    description: 'CleanTech big data intelligence platform analyzing 10+ years (2014-2024) of nationwide solar energy across 36+ Indian states/UTs covering 81.8+ GW with forecasting to 2030.',
    headline: 'Solar Intelligence: CleanTech Big Data Pipeline & GIS Energy Forecasting to 2030',
    category: 'CleanTech Big Data & GIS',
    tech: 'CleanTech Big Data, Python, PostgreSQL, Geospatial GIS, Polynomial Regression, Recharts',
    summary: 'Nationwide solar energy intelligence platform with automated ETL pipelines, GIS heatmaps, and polynomial regression trajectory forecasting.'
  },
  {
    slug: 'jan-sampark',
    title: 'JanSampark Civic Governance Platform | Case Study by Pranav Shende',
    description: 'Enterprise civic governance platform bridging citizens and administrative departments with 25+ React Native modules, offline geo-tagging, and 4-tier RBAC security.',
    headline: 'JanSampark: Enterprise Civic Governance Platform with 25+ React Native Modules',
    category: 'Civic Enterprise & Mobile Systems',
    tech: 'React Native, Node.js, Express, PostgreSQL, RBAC Security, JWT, High-Concurrency APIs',
    summary: 'Citizen grievance redressal platform with spatial clustering, municipal dispatch workflows, and sub-15ms PostgreSQL queries.'
  },
  {
    slug: 'employee-attrition-ai',
    title: 'Employee Attrition AI | Case Study by Pranav Shende',
    description: 'End-to-end workforce risk intelligence platform with instant dynamic CSV dataset ingestion, 11 interactive visualizations, and Google Gemini 2.5 Flash copilot.',
    headline: 'Employee Attrition AI: Predictive HR Workforce Risk Intelligence & Gemini Copilot',
    category: 'Predictive ML & Analytics',
    tech: 'Google Gemini 2.5 Flash, Predictive ML, Flask, Python, Pandas, React 19, Chart.js',
    summary: 'Workforce risk intelligence engine classifying retention risk across 11 key drivers with conversational AI querying.'
  }
];

// Blog Posts Data for static route generation
const BLOG_POSTS = [
  {
    slug: 'jarvis-ai-enterprise-intelligence-platform',
    title: 'Jarvis AI: Building an Autonomous Enterprise Intelligence Platform with Model Context Protocol',
    description: 'How I engineered Jarvis AI — connecting ERP, warehouse management, and finance systems into an operational command center using official MCP v1.0.4 and Gemini 2.5 Pro.',
    category: 'System Design & AI'
  },
  {
    slug: 'forgerag-exploring-llms-and-retrieval-augmented-generation',
    title: 'ForgeRAG: Exploring LLMs, Vector Embeddings & Production-Grade RAG Pipelines',
    description: 'A comprehensive technical deep-dive into context window constraints, high-dimensional vector search, chunking strategies, and pgvector retrieval grounding.',
    category: 'AI & Machine Learning'
  },
  {
    slug: 'ai-powered-employee-attrition-analysis',
    title: 'AI-Powered Workforce Intelligence: Predicting Employee Attrition with Scikit-Learn & Gemini 2.5 Flash',
    description: 'Developing a predictive HR workforce intelligence platform with dynamic CSV dataset ingestion, SHAP explainable AI attribution, and interactive Chart.js visualizations.',
    category: 'Data Science & ML'
  },
  {
    slug: 'solar-intelligence-renewable-energy-big-data-forecasting',
    title: 'Solar Intelligence: Analyzing 10+ Years of Indian Renewable Big Data & Forecasting to 2030',
    description: 'Evaluating 10+ years (2014-2024) of nationwide solar time-series data across 36+ Indian states/UTs covering 81.8+ GW with polynomial regression forecasting.',
    category: 'Data Science & Big Data'
  },
  {
    slug: 'natural-language-rag-database-assistant',
    title: 'Building a Context-Aware Natural Language Database Assistant with Live Execution Workflows',
    description: 'Architecting an AI database copilot translating natural language inquiries into verified read-only SQL queries with deterministic star-schema validation.',
    category: 'System Design & AI'
  },
  {
    slug: 'scalable-fullstack-architecture-system-design',
    title: 'Scalable Full-Stack Engineering: Fastify, Node.js, Express, PostgreSQL & React Architecture',
    description: 'Real-world lessons from designing high-concurrency Node.js and Fastify backend architectures, Prisma connection pooling, Redis caching, and reactive React portals.',
    category: 'Web Engineering'
  },
  {
    slug: 'jansampark-civic-governance-platform-react-native',
    title: 'JanSampark: Architecting an Enterprise Civic Governance Mobile Platform with React Native',
    description: 'Technical walkthrough of building 25+ production React Native modules, offline-first GPS geo-tagging, and 4-tier Role-Based Access Control.',
    category: 'Mobile & Enterprise'
  },
  {
    slug: 'tastifyy-distributed-logistics-kafka-redis-geospatial',
    title: 'Distributed Logistics: Powering On-Demand Delivery with Kafka Streams & Redis Geospatial',
    description: 'Engineering high-throughput order pipelines, sub-2ms driver proximity queries with Redis GEORADIUS, and resilient event-driven state transitions.',
    category: 'Distributed Systems'
  },
  {
    slug: 'ai-in-agriculture-pashurakshak-edge-cnn-ieee',
    title: 'Edge AI in Agriculture: Quantized TensorFlow Lite CNNs for Rural Livestock Diagnostics (IEEE OTCON)',
    description: 'How we engineered sub-120ms offline convolutional neural network inference on budget Android smartphones for livestock disease detection, published at IEEE.',
    category: 'Edge Computing & Research'
  }
];

// Helper to replace metadata in HTML template
function injectMetadata(html, { title, description, canonicalUrl, ogType = 'website', ogImage = 'https://pranavshende.online/og-image.png', keywords, robots, jsonLd, bodyContent }) {
  let modified = html;

  // Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="title" content="${title}" />`);

  // Description
  modified = modified.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${description}" />`);

  // Keywords
  if (keywords) {
    modified = modified.replace(/<meta\s+name=["']keywords["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="keywords" content="${keywords}" />`);
  }

  // Robots
  if (robots) {
    modified = modified.replace(/<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="robots" content="${robots}" />`);
    modified = modified.replace(/<meta\s+name=["']googlebot["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="googlebot" content="${robots}" />`);
    modified = modified.replace(/<meta\s+name=["']bingbot["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="bingbot" content="${robots}" />`);
  }

  // Canonical
  modified = modified.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Open Graph
  modified = modified.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  modified = modified.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`);
  if (ogImage) {
    modified = modified.replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:image" content="${ogImage}" />`);
    modified = modified.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${ogImage}" />`);
  }

  // Twitter
  modified = modified.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);

  // Inject additional JSON-LD schema if provided
  if (jsonLd) {
    const scriptTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n</head>`;
    modified = modified.replace('</head>', scriptTag);
  }

  // Inject page-specific semantic body content into #root
  if (bodyContent) {
    const startMarker = '<!-- APP_ROOT_CONTENT -->';
    const endMarker = '<!-- /APP_ROOT_CONTENT -->';
    if (modified.includes(startMarker) && modified.includes(endMarker)) {
      const startIndex = modified.indexOf(startMarker) + startMarker.length;
      const endIndex = modified.indexOf(endMarker);
      modified = modified.slice(0, startIndex) + '\n' + bodyContent + '\n' + modified.slice(endIndex);
    }
  }

  return modified;
}

// Generate static file
function writeStaticPage(subPath, htmlContent) {
  const targetDir = path.join(DIST_DIR, subPath);
  fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, htmlContent, 'utf-8');
  console.log(`[Prerender] Generated: dist/${subPath}/index.html`);
}

// ─────────────────────────────────────────────────────────────
// 1. /about
// ─────────────────────────────────────────────────────────────
const aboutHtml = injectMetadata(baseHtml, {
  title: 'About Pranav Shende | Full Stack Developer & AI Engineer',
  description: 'Pranav Shende is a Full Stack Developer and Forward Deployed Engineer based in Nagpur, India specializing in backend engineering, AI systems, RAG, and scalable system architecture.',
  canonicalUrl: 'https://pranavshende.online/about',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'name': 'About Pranav Shende',
    'url': 'https://pranavshende.online/about',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Pranav Shende',
      'jobTitle': 'Full Stack Developer & Forward Deployed Engineer',
      'url': 'https://pranavshende.online/',
      'sameAs': [
        'https://github.com/PranavShende',
        'https://linkedin.com/in/pranavshende',
        'https://medium.com/@pranavshende97'
      ]
    }
  },
  bodyContent: `
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #8b2323;">← Back to Home</a></nav>
      <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917;">About Pranav Shende</h1>
      <p style="font-size: 1.1rem; color: #57534e; margin-bottom: 2rem;">Full Stack Developer &amp; Forward Deployed Engineer • Nagpur, India</p>
      <section style="line-height: 1.7; color: #44403c; font-size: 1rem;">
        <p>Pranav Shende is a Full Stack Developer and Forward Deployed Engineer based in Nagpur, India. He specializes in backend engineering, AI-powered applications, enterprise software, Retrieval-Augmented Generation (RAG), and scalable system architecture.</p>
        <p>Currently pursuing B.Tech in Information Technology at St. Vincent Pallotti College of Engineering &amp; Technology (SVPCET), Nagpur (2023–2027). He has served as Technical Head of Computer Society of India (CSI), GirlScript Summer of Code (GSSoC) Mentor, and is an IEEE-published researcher in Edge AI.</p>
        <p>His engineering achievements include shipping JanSampark (civic governance platform with 25+ React Native modules), Jarvis 1.0 (enterprise intelligence with official MCP v1.0.4 protocol), Tastifyy (distributed food delivery with Kafka and Redis Geospatial), and PashuRakshak (offline-first edge CNN diagnostics).</p>
      </section>
      <div style="margin-top: 2rem; border-top: 2px solid #1c1917; padding-top: 1rem;">
        <a href="https://github.com/PranavShende" style="color: #8b2323; font-weight: 700; margin-right: 1.5rem;">GitHub Profile</a>
        <a href="https://linkedin.com/in/pranavshende" style="color: #8b2323; font-weight: 700; margin-right: 1.5rem;">LinkedIn</a>
        <a href="https://medium.com/@pranavshende97" style="color: #8b2323; font-weight: 700;">Medium Publications</a>
      </div>
    </div>
  `
});
writeStaticPage('about', aboutHtml);

// ─────────────────────────────────────────────────────────────
// 2. /projects
// ─────────────────────────────────────────────────────────────
const projectsHtml = injectMetadata(baseHtml, {
  title: 'All Projects & Engineering Repositories | Pranav Shende',
  description: 'Explore the complete engineering portfolio of Pranav Shende — featuring autonomous AI platforms, RAG systems, distributed Kafka pipelines, and edge computing architectures.',
  canonicalUrl: 'https://pranavshende.online/projects',
  bodyContent: `
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #8b2323;">← Back to Home</a></nav>
      <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917;">Engineering Projects &amp; Repositories</h1>
      <p style="font-size: 1.1rem; color: #57534e; margin-bottom: 2rem;">Curated catalog of software systems, AI pipelines, and open-source architectures.</p>
      <div style="display: grid; gap: 1.5rem;">
        ${CASE_STUDIES.map(cs => `
          <article style="padding: 1.5rem; border: 2px solid #1c1917; border-radius: 12px; background: #ffffff;">
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: #8b2323;">${cs.category}</span>
            <h2 style="font-size: 1.3rem; margin: 0.25rem 0 0.5rem 0;"><a href="/projects/${cs.slug}" style="color: #1c1917; text-decoration: none;">${cs.headline}</a></h2>
            <p style="font-size: 0.95rem; line-height: 1.6; color: #44403c;">${cs.summary}</p>
            <p style="font-size: 0.85rem; font-family: monospace; color: #78716c;">Tech: ${cs.tech}</p>
            <a href="/projects/${cs.slug}" style="font-weight: 700; color: #8b2323;">View Full Case Study →</a>
          </article>
        `).join('')}
      </div>
    </div>
  `
});
writeStaticPage('projects', projectsHtml);

// ─────────────────────────────────────────────────────────────
// 3. /blog
// ─────────────────────────────────────────────────────────────
const blogHtml = injectMetadata(baseHtml, {
  title: 'Technical Blog & Architectural Insights | Pranav Shende',
  description: 'In-depth engineering deep-dives, system design breakdowns, LLM architectures, and backend case studies by Pranav Shende.',
  canonicalUrl: 'https://pranavshende.online/blog',
  bodyContent: `
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #8b2323;">← Back to Home</a></nav>
      <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917;">Technical Blog &amp; Architectural Insights</h1>
      <p style="font-size: 1.1rem; color: #57534e; margin-bottom: 2rem;">Deep-dives into LLMs, RAG, distributed architectures, and real-world system design.</p>
      <div style="display: grid; gap: 1.5rem;">
        ${BLOG_POSTS.map(bp => `
          <article style="padding: 1.5rem; border: 2px solid #1c1917; border-radius: 12px; background: #ffffff;">
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: #8b2323;">${bp.category}</span>
            <h2 style="font-size: 1.3rem; margin: 0.25rem 0 0.5rem 0;"><a href="/blog/${bp.slug}" style="color: #1c1917; text-decoration: none;">${bp.title}</a></h2>
            <p style="font-size: 0.95rem; line-height: 1.6; color: #44403c;">${bp.description}</p>
            <a href="/blog/${bp.slug}" style="font-weight: 700; color: #8b2323;">Read Article →</a>
          </article>
        `).join('')}
      </div>
    </div>
  `
});
writeStaticPage('blog', blogHtml);

// ─────────────────────────────────────────────────────────────
// 4. /arcade
// ─────────────────────────────────────────────────────────────
const arcadeHtml = injectMetadata(baseHtml, {
  title: 'Interactive Arcade Console & Mobile Simulator | Pranav Shende',
  description: 'Play retro arcade games including Tetris, Snake, Flappy Bird, and explore interactive mobile app simulators built by Pranav Shende.',
  canonicalUrl: 'https://pranavshende.online/arcade',
  keywords: 'Retro Arcade, Interactive Simulator, Tetris React, Flappy Bird Web, Mobile App Simulator, Pranav Shende Games',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Interactive Arcade Console',
    'operatingSystem': 'Web Browser',
    'applicationCategory': 'GameApplication',
    'url': 'https://pranavshende.online/arcade',
    'author': {
      '@type': 'Person',
      'name': 'Pranav Shende',
      'url': 'https://pranavshende.online/'
    }
  },
  bodyContent: `
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #8b2323;">← Back to Home</a></nav>
      <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917;">Interactive Arcade Console</h1>
      <p style="font-size: 1.1rem; color: #57534e; margin-bottom: 2rem;">Handcrafted interactive simulators and retro arcade titles.</p>
    </div>
  `
});
writeStaticPage('arcade', arcadeHtml);

// ─────────────────────────────────────────────────────────────
// 5. /playgames
// ─────────────────────────────────────────────────────────────
const playGamesHtml = injectMetadata(baseHtml, {
  title: 'Gaming Station & Interactive Retro Console | Pranav Shende',
  description: 'Play classic arcade titles including Mario, Hextris, Dino Runner, Tetris, Flappy Bird, and Subway Surfers directly in the browser.',
  canonicalUrl: 'https://pranavshende.online/playgames',
  keywords: 'Web Games, Retro Gaming Station, Browser Arcade, React Games, Mario Web, Tetris Online, Pranav Shende',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Interactive Gaming Station',
    'operatingSystem': 'Web Browser',
    'applicationCategory': 'GameApplication',
    'url': 'https://pranavshende.online/playgames',
    'author': {
      '@type': 'Person',
      'name': 'Pranav Shende',
      'url': 'https://pranavshende.online/'
    }
  },
  bodyContent: `
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #8b2323;">← Back to Home</a></nav>
      <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917;">Gaming Station &amp; Interactive Console</h1>
      <p style="font-size: 1.1rem; color: #57534e; margin-bottom: 2rem;">Classic retro arcade games playable directly in the browser.</p>
    </div>
  `
});
writeStaticPage('playgames', playGamesHtml);

// ─────────────────────────────────────────────────────────────
// 6. Individual Case Studies (/projects/:slug)
// ─────────────────────────────────────────────────────────────
for (const cs of CASE_STUDIES) {
  const caseStudyHtml = injectMetadata(baseHtml, {
    title: cs.title,
    description: cs.description,
    canonicalUrl: `https://pranavshende.online/projects/${cs.slug}`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': cs.headline,
      'headline': cs.headline,
      'description': cs.summary,
      'url': `https://pranavshende.online/projects/${cs.slug}`,
      'author': {
        '@type': 'Person',
        'name': 'Pranav Shende',
        'url': 'https://pranavshende.online/'
      },
      'creator': {
        '@type': 'Person',
        'name': 'Pranav Shende',
        'url': 'https://pranavshende.online/'
      },
      'keywords': cs.tech
    },
    bodyContent: `
      <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
        <nav style="margin-bottom: 1.5rem;"><a href="/projects" style="color: #8b2323;">← Back to All Projects</a></nav>
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #8b2323; background: #fff0f0; padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid #ffcccc;">${cs.category}</span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917; margin: 0.75rem 0 1rem 0;">${cs.headline}</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #44403c; margin-bottom: 2rem;">${cs.summary}</p>
        <section style="margin-bottom: 2rem; padding: 1.5rem; border: 2px solid #1c1917; border-radius: 12px; background: #ffffff;">
          <h2 style="font-size: 1.3rem; margin-top: 0; color: #1c1917;">Problem Statement &amp; Architecture</h2>
          <p style="font-size: 1rem; line-height: 1.7; color: #44403c;">${cs.description}</p>
          <p style="font-size: 0.9rem; font-family: monospace; color: #78716c;">Technologies: ${cs.tech}</p>
        </section>
        <div style="margin-top: 2rem; border-top: 2px solid #1c1917; padding-top: 1rem;">
          <a href="/projects" style="color: #8b2323; font-weight: 700; margin-right: 1.5rem;">← All Projects</a>
          <a href="/blog" style="color: #8b2323; font-weight: 700;">Read Technical Blogs →</a>
        </div>
      </div>
    `
  });
  writeStaticPage(`projects/${cs.slug}`, caseStudyHtml);
}

// ─────────────────────────────────────────────────────────────
// 6. Individual Blog Posts (/blog/:slug)
// ─────────────────────────────────────────────────────────────
for (const bp of BLOG_POSTS) {
  const postHtml = injectMetadata(baseHtml, {
    title: `${bp.title} | Pranav Shende`,
    description: bp.description,
    canonicalUrl: `https://pranavshende.online/blog/${bp.slug}`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': bp.title,
      'description': bp.description,
      'url': `https://pranavshende.online/blog/${bp.slug}`,
      'author': {
        '@type': 'Person',
        'name': 'Pranav Shende',
        'url': 'https://pranavshende.online/'
      },
      'publisher': {
        '@type': 'Person',
        'name': 'Pranav Shende',
        'url': 'https://pranavshende.online/'
      },
      'articleSection': bp.category
    },
    bodyContent: `
      <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: system-ui, -apple-system, sans-serif;">
        <nav style="margin-bottom: 1.5rem;"><a href="/blog" style="color: #8b2323;">← Back to Technical Blog</a></nav>
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #8b2323; background: #fff0f0; padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid #ffcccc;">${bp.category}</span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #1c1917; margin: 0.75rem 0 1rem 0;">${bp.title}</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #44403c; margin-bottom: 2rem;">${bp.description}</p>
        <div style="margin-top: 2rem; border-top: 2px solid #1c1917; padding-top: 1rem;">
          <a href="/blog" style="color: #8b2323; font-weight: 700; margin-right: 1.5rem;">← All Articles</a>
          <a href="/projects" style="color: #8b2323; font-weight: 700;">Explore Projects →</a>
        </div>
      </div>
    `
  });
  writeStaticPage(`blog/${bp.slug}`, postHtml);
}

// ─────────────────────────────────────────────────────────────
// 7. 404 Not Found (dist/404.html)
// ─────────────────────────────────────────────────────────────
const notFoundHtml = injectMetadata(baseHtml, {
  title: '404 - Page Not Found | Pranav Shende',
  description: 'The requested page could not be found on Pranav Shende portfolio.',
  canonicalUrl: 'https://pranavshende.online/404',
  robots: 'noindex, nofollow',
  bodyContent: `
    <div style="max-width: 600px; margin: 5rem auto; text-align: center; font-family: system-ui, sans-serif;">
      <h1 style="font-size: 3rem; color: #8b2323;">404</h1>
      <h2>Page Not Found</h2>
      <p style="color: #57534e;">The page you are looking for does not exist or has been moved.</p>
      <a href="/" style="display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #8b2323; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Return to Home</a>
    </div>
  `
});
fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
console.log('[Prerender] Generated: dist/404.html');

console.log('[Prerender] All static SEO routes successfully generated in dist/!');

