/**
 * Client API Service for Pranav Shende Portfolio
 * Connects Frontend to Node.js / Express / Prisma / PostgreSQL Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-m96a.onrender.com/api/v1';

// Token storage key
const TOKEN_KEY = 'pranav_portfolio_admin_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string, remember = true): void => {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

interface RequestOptions extends RequestInit {
  data?: any;
}

export async function apiRequest<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const token = getStoredToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Include HTTP-only cookies if present
  };

  if (options.data) {
    config.body = JSON.stringify(options.data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMessage = result.message || `Request failed with status ${response.status}`;
      if (Array.isArray(result.errors) && result.errors.length > 0) {
        errorMessage = result.errors.map((e: any) => e.message).join('. ');
      }
      const error = new Error(errorMessage) as any;
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result as T;
  } catch (err: any) {
    // If backend is not running, log gracefully
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      console.warn(`[API] Unable to reach backend server at ${API_BASE_URL}. Ensure backend is running.`);
    }
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ─────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  fullName?: string;
  email: string;
  company?: string;
  subject: string;
  inquiryType: string;
  message: string;
  attachmentUrl?: string;
}

const normalizeInquiryType = (val: string): string => {
  const s = String(val || '').toUpperCase().replace(/[^A-Z]/g, '_');
  if (s.includes('JOB')) return 'JOB_OPPORTUNITY';
  if (s.includes('INTERN')) return 'INTERNSHIP';
  if (s.includes('FREELANCE')) return 'FREELANCE';
  if (s.includes('COLLAB')) return 'COLLABORATION';
  if (s.includes('TECH')) return 'TECH_DISCUSSION';
  if (s.includes('GENERAL')) return 'GENERAL';
  const valid = ['JOB_OPPORTUNITY', 'INTERNSHIP', 'FREELANCE', 'COLLABORATION', 'TECH_DISCUSSION', 'GENERAL', 'OTHER'];
  if (valid.includes(val)) return val;
  return 'OTHER';
};

export const api = {
  // Public
  getProjects: (category?: string) => 
    apiRequest(`/projects${category ? `?category=${category}` : ''}`),
  
  getProject: (idOrSlug: string) => 
    apiRequest(`/projects/${idOrSlug}`),

  getBlogPosts: (params: { category?: string; tag?: string; search?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'ALL') query.set('category', params.category);
    if (params.tag) query.set('tag', params.tag);
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    return apiRequest(`/content/blog${qs ? `?${qs}` : ''}`);
  },

  getBlogPostBySlug: (slug: string) => 
    apiRequest(`/content/blog/${slug}`),

  getBlogStats: async (): Promise<Record<string, { views: number; impressions: number }>> => {
    try {
      const serverlessUrl = typeof window !== 'undefined' && window.location.origin.includes('pranavshende.online')
        ? '/api/blog-stats'
        : 'https://pranavshende.online/api/blog-stats';
      const res = await fetch(serverlessUrl, { cache: 'no-cache' });
      if (res.ok) {
        const json = await res.json();
        if (json.stats) return json.stats;
      }
    } catch (_) {}

    try {
      const res = await apiRequest('/content/blog/stats');
      if (res?.stats) return res.stats;
    } catch (_) {}

    return {};
  },

  recordBlogView: async (slug: string): Promise<{ views: number; impressions: number } | null> => {
    try {
      const serverlessUrl = typeof window !== 'undefined' && window.location.origin.includes('pranavshende.online')
        ? '/api/blog-stats'
        : 'https://pranavshende.online/api/blog-stats';
      const res = await fetch(serverlessUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'view' }),
      });
      if (res.ok) {
        const json = await res.json();
        return { views: json.views, impressions: json.impressions };
      }
    } catch (_) {}

    try {
      const res = await apiRequest('/content/blog/stats', {
        method: 'POST',
        data: { slug, type: 'view' },
      });
      return { views: res.views, impressions: res.impressions };
    } catch (_) {}

    return null;
  },

  recordBlogImpressions: async (slugs: string[]): Promise<void> => {
    if (!slugs || slugs.length === 0) return;
    try {
      const serverlessUrl = typeof window !== 'undefined' && window.location.origin.includes('pranavshende.online')
        ? '/api/blog-stats'
        : 'https://pranavshende.online/api/blog-stats';
      await fetch(serverlessUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs, type: 'impression' }),
      });
      return;
    } catch (_) {}

    try {
      await apiRequest('/content/blog/stats', {
        method: 'POST',
        data: { slugs, type: 'impression' },
      });
    } catch (_) {}
  },

  submitContact: (payload: ContactPayload) => {
    const data = {
      ...payload,
      fullName: (payload.fullName || payload.name || '').trim(),
      name: (payload.name || payload.fullName || '').trim(),
      inquiryType: normalizeInquiryType(payload.inquiryType),
      attachmentUrl: payload.attachmentUrl && payload.attachmentUrl.trim().length > 0 ? payload.attachmentUrl.trim() : undefined,
    };
    return apiRequest('/contact', { method: 'POST', data });
  },

  trackResumeDownload: (version?: string) => 
    apiRequest('/resume/track-download', { method: 'POST', data: { version } }),

  getResume: () => 
    apiRequest('/resume'),

  recordAnalytics: (data: { eventType: string; pageUrl?: string; path?: string; projectSlug?: string; referrer?: string; visitorName?: string; metadata?: any }) => {
    const visitorName = data.visitorName || (typeof localStorage !== 'undefined' ? localStorage.getItem('portfolio_visitor_name') || undefined : undefined);
    return apiRequest('/analytics/event', { 
      method: 'POST', 
      data: {
        ...data,
        path: data.path || data.pageUrl || '/',
        visitorName,
      } 
    });
  },

  chatAI: (message: string, history?: Array<{ role: string; content: string }>) => 
    apiRequest('/ai/chat', { method: 'POST', data: { message, history } }),

  subscribeNewsletter: (email: string, name?: string) => 
    apiRequest('/content/newsletter/subscribe', { method: 'POST', data: { email, name } }),

  getContent: (type: 'experience' | 'skills' | 'achievements' | 'education' | 'testimonials' | 'blog' | 'settings') => 
    apiRequest(`/content/${type}`),

  submitTestimonial: (data: any) => 
    apiRequest('/content/testimonials', { method: 'POST', data }),

  requestBooking: (data: any) => 
    apiRequest('/content/bookings', { method: 'POST', data }),

  // ─────────────────────────────────────────────────────────────
  // AUTH ENDPOINTS
  // ─────────────────────────────────────────────────────────────
  adminLogin: (data: { email: string; password: string }) => 
    apiRequest('/auth/login', { method: 'POST', data }),

  adminLogout: () => 
    apiRequest('/auth/logout', { method: 'POST' }),

  getAdminMe: () => 
    apiRequest('/auth/me'),

  updateAdminProfile: (data: { name: string; email: string }) => 
    apiRequest('/auth/profile', { method: 'PUT', data }),

  changePassword: (data: { currentPassword: string; newPassword: string }) => 
    apiRequest('/auth/change-password', { method: 'PUT', data }),

  // ─────────────────────────────────────────────────────────────
  // ADMIN DASHBOARD & CRUD ENDPOINTS
  // ─────────────────────────────────────────────────────────────
  getAnalyticsDashboard: (period = '30d') => 
    apiRequest(`/analytics/dashboard?period=${period}`),

  // Messages / Inquiries
  getInquiries: (params: { page?: number; limit?: number; status?: string; inquiryType?: string; search?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.status && params.status !== 'ALL') query.set('status', params.status);
    if (params.inquiryType && params.inquiryType !== 'ALL') query.set('inquiryType', params.inquiryType);
    if (params.search) query.set('search', params.search);
    return apiRequest(`/contact?${query.toString()}`);
  },

  updateInquiry: (id: string, data: { status?: string; adminNotes?: string; isRead?: boolean }) => 
    apiRequest(`/contact/${id}`, { method: 'PATCH', data }),

  deleteInquiry: (id: string) => 
    apiRequest(`/contact/${id}`, { method: 'DELETE' }),

  exportInquiriesCSV: () => 
    apiRequest('/contact/export/csv'),

  // Projects CMS
  getAdminProjects: () =>
    apiRequest('/projects/admin/all'),

  createProject: (data: any) => 
    apiRequest('/projects', { method: 'POST', data }),

  updateProject: (id: string, data: any) => 
    apiRequest(`/projects/${id}`, { method: 'PUT', data }),

  deleteProject: (id: string) => 
    apiRequest(`/projects/${id}`, { method: 'DELETE' }),

  // Experiences
  createExperience: (data: any) => 
    apiRequest('/content/experience', { method: 'POST', data }),

  updateExperience: (id: string, data: any) => 
    apiRequest(`/content/experience/${id}`, { method: 'PUT', data }),

  deleteExperience: (id: string) => 
    apiRequest(`/content/experience/${id}`, { method: 'DELETE' }),

  // Skills
  createSkill: (data: any) => 
    apiRequest('/content/skills', { method: 'POST', data }),

  updateSkill: (id: string, data: any) => 
    apiRequest(`/content/skills/${id}`, { method: 'PUT', data }),

  deleteSkill: (id: string) => 
    apiRequest(`/content/skills/${id}`, { method: 'DELETE' }),

  // Achievements
  createAchievement: (data: any) => 
    apiRequest('/content/achievements', { method: 'POST', data }),

  updateAchievement: (id: string, data: any) => 
    apiRequest(`/content/achievements/${id}`, { method: 'PUT', data }),

  deleteAchievement: (id: string) => 
    apiRequest(`/content/achievements/${id}`, { method: 'DELETE' }),

  // Education
  createEducation: (data: any) => 
    apiRequest('/content/education', { method: 'POST', data }),

  updateEducation: (id: string, data: any) => 
    apiRequest(`/content/education/${id}`, { method: 'PUT', data }),

  deleteEducation: (id: string) => 
    apiRequest(`/content/education/${id}`, { method: 'DELETE' }),

  // Testimonials moderation
  moderateTestimonial: (id: string, data: { isApproved?: boolean; isFeatured?: boolean }) => 
    apiRequest(`/content/testimonials/${id}`, { method: 'PATCH', data }),

  deleteTestimonial: (id: string) => 
    apiRequest(`/content/testimonials/${id}`, { method: 'DELETE' }),

  // Blog CMS
  getAdminBlogPosts: () =>
    apiRequest('/content/blog/admin/all'),

  createBlogPost: (data: any) => 
    apiRequest('/content/blog', { method: 'POST', data }),

  updateBlogPost: (id: string, data: any) => 
    apiRequest(`/content/blog/${id}`, { method: 'PUT', data }),

  deleteBlogPost: (id: string) => 
    apiRequest(`/content/blog/${id}`, { method: 'DELETE' }),

  // Newsletter
  getSubscribers: () => 
    apiRequest('/content/newsletter/subscribers'),

  deleteSubscriber: (id: string) => 
    apiRequest(`/content/newsletter/subscribers/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: () => 
    apiRequest('/content/bookings'),

  updateBooking: (id: string, data: any) => 
    apiRequest(`/content/bookings/${id}`, { method: 'PATCH', data }),

  deleteBooking: (id: string) => 
    apiRequest(`/content/bookings/${id}`, { method: 'DELETE' }),

  // Resume Management
  uploadResume: (data: { title: string; fileUrl: string; version?: string; isCurrent?: boolean }) => 
    apiRequest('/resume', { method: 'POST', data }),

  // Site Settings & SEO
  getSettings: () => 
    apiRequest('/content/settings'),

  updateSettings: (data: any) => 
    apiRequest('/content/settings', { method: 'PUT', data }),

  // Logs & Security
  getActivityLogs: () => 
    apiRequest('/analytics/logs'),
};

export default api;
