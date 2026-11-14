import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export const createProjectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  subtitle: z.string().optional().default(''),
  slug: z.string().optional(),
  client: z.string().optional().default('Independent'),
  category: z.string().optional().default('Full Stack & AI'),
  year: z.string().optional().default('2026'),
  description: z.string().min(2, 'Description is required'),
  problemStatement: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  architecture: z.string().optional().nullable(),
  techStack: z.union([z.array(z.string()), z.string()]).optional().default([]),
  highlights: z.union([z.array(z.string()), z.string()]).optional().default([]),
  keyFeatures: z.union([z.array(z.string()), z.string()]).optional().default([]),
  githubUrl: z.string().optional().or(z.literal('')).nullable(),
  demoUrl: z.string().optional().or(z.literal('')).nullable(),
  liveDemoUrl: z.string().optional().or(z.literal('')).nullable(),
  bannerUrl: z.string().optional().nullable(),
  thumbnailUrl: z.string().optional().nullable(),
  featuredThumbnailUrl: z.string().optional().nullable().or(z.literal('')),
  projectPageThumbnailUrl: z.string().optional().nullable().or(z.literal('')),
  badge: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.union([z.number(), z.string()]).optional(),
  displayOrder: z.union([z.number(), z.string()]).optional(),
  published: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

function normalizeProjectData(body: any) {
  const title = (body.title || '').trim();
  let slug = (body.slug || '').trim();
  if (!slug && title) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  // Parse arrays
  let techStack: string[] = [];
  if (Array.isArray(body.techStack)) {
    techStack = body.techStack.map(String).map((s: string) => s.trim()).filter(Boolean);
  } else if (typeof body.techStack === 'string') {
    techStack = body.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  let highlights: string[] = [];
  const rawHighlights = body.highlights || body.keyFeatures;
  if (Array.isArray(rawHighlights)) {
    highlights = rawHighlights.map(String).map((s: string) => s.trim()).filter(Boolean);
  } else if (typeof rawHighlights === 'string') {
    highlights = rawHighlights.split('\n').map((s: string) => s.trim()).filter(Boolean);
  }

  const featuredThumbnailUrl = (body.featuredThumbnailUrl || '').trim() || null;
  const projectPageThumbnailUrl = (body.projectPageThumbnailUrl || '').trim() || null;
  const bannerUrl = (body.bannerUrl || body.thumbnailUrl || projectPageThumbnailUrl || featuredThumbnailUrl || '/src/photo/jarvis_banner.webp').trim();
  const demoUrl = (body.demoUrl || body.liveDemoUrl || '').trim() || null;
  const githubUrl = (body.githubUrl || '').trim() || null;
  const problemStatement = (body.problemStatement || body.problem || '').trim() || null;
  const solution = (body.solution || '').trim() || null;
  const architecture = (body.architecture || '').trim() || null;
  const badge = (body.badge || '').trim() || null;
  const orderIndex = Number(body.orderIndex ?? body.displayOrder ?? 0) || 0;
  const featured = body.featured !== undefined ? Boolean(body.featured) : (body.isFeatured !== undefined ? Boolean(body.isFeatured) : true);
  const published = body.published !== undefined ? Boolean(body.published) : (body.isPublished !== undefined ? Boolean(body.isPublished) : true);

  return {
    title,
    subtitle: (body.subtitle || title).trim(),
    slug,
    client: (body.client || 'Independent').trim(),
    category: (body.category || 'Full Stack & AI').trim(),
    year: (body.year || '2026').trim(),
    description: (body.description || '').trim(),
    problemStatement,
    solution,
    architecture,
    techStack,
    highlights,
    githubUrl,
    demoUrl,
    bannerUrl,
    featuredThumbnailUrl,
    projectPageThumbnailUrl,
    badge,
    featured,
    orderIndex,
    published,
  };
}

export const projectController = {
  /**
   * Public: Get all published projects
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { featured, category } = req.query;

      const where: any = { published: true };
      if (featured === 'true') where.featured = true;
      if (category && typeof category === 'string') where.category = category;

      const projects = await prisma.project.findMany({
        where,
        orderBy: { orderIndex: 'asc' },
        include: { screenshots: { orderBy: { orderIndex: 'asc' } } },
      });

      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Public: Get project stats
   */
  async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.project.findMany({
        where: { published: true },
        select: { slug: true, id: true, viewCount: true },
      });
      const stats: Record<string, { views: number }> = {};
      for (const item of items) {
        stats[item.slug] = { views: item.viewCount || 0 };
        if (item.id) {
          stats[item.id] = { views: item.viewCount || 0 };
        }
      }
      res.status(200).json({ success: true, stats });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Public: Record project view
   */
  async recordStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug, id, type } = req.body;
      const target = slug || id;
      if (type === 'view' && target) {
        const item = await prisma.project.findFirst({
          where: { OR: [{ slug: target }, { id: target }] },
        });
        if (item) {
          const updated = await prisma.project.update({
            where: { id: item.id },
            data: { viewCount: { increment: 1 } },
            select: { slug: true, id: true, viewCount: true },
          });
          res.status(200).json({ success: true, slug: updated.slug, views: updated.viewCount });
          return;
        }
      }
      res.status(400).json({ success: false, message: 'Invalid payload' });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Public: Get single project by slug
   */
  async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = String(req.params.slug);

      const project = await prisma.project.findUnique({
        where: { slug },
        include: { screenshots: { orderBy: { orderIndex: 'asc' } } },
      });

      if (!project) {
        throw new AppError('Project not found', 404);
      }

      // Increment view count asynchronously
      prisma.project.update({
        where: { id: project.id },
        data: { viewCount: { increment: 1 } },
      }).catch(console.error);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Get all projects (including drafts/unpublished)
   */
  async adminGetAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { orderIndex: 'asc' },
        include: { screenshots: true },
      });

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Create project
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = normalizeProjectData(req.body);

      // Check for unique slug, append suffix if exists
      let finalSlug = data.slug;
      const existing = await prisma.project.findUnique({
        where: { slug: finalSlug },
      });

      if (existing) {
        finalSlug = `${data.slug}-${Date.now().toString(36)}`;
        data.slug = finalSlug;
      }

      const project = await prisma.project.create({
        data,
      });

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Update project
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const data = normalizeProjectData(req.body);

      // Check if updating to an existing slug of another project
      if (data.slug) {
        const existing = await prisma.project.findUnique({
          where: { slug: data.slug },
        });
        if (existing && existing.id !== id) {
          data.slug = `${data.slug}-${Date.now().toString(36)}`;
        }
      }

      const project = await prisma.project.update({
        where: { id },
        data,
      });

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Delete project
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);

      await prisma.project.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Reorder projects
   */
  async reorder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { items } = req.body as { items: { id: string; orderIndex: number }[] };

      if (!Array.isArray(items)) {
        throw new AppError('Invalid items array', 400);
      }

      await prisma.$transaction(
        items.map((item) =>
          prisma.project.update({
            where: { id: item.id },
            data: { orderIndex: item.orderIndex },
          })
        )
      );

      res.status(200).json({
        success: true,
        message: 'Project order updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
