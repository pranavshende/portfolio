import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export const createProjectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  subtitle: z.string().min(2, 'Subtitle is required'),
  slug: z.string().min(2, 'Slug is required'),
  client: z.string().default('Independent'),
  category: z.string().default('Full Stack & AI'),
  year: z.string().default('2026'),
  description: z.string().min(10, 'Description is required'),
  problemStatement: z.string().optional(),
  solution: z.string().optional(),
  architecture: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal('')).nullable(),
  demoUrl: z.string().url().optional().or(z.literal('')).nullable(),
  bannerUrl: z.string().min(1, 'Banner URL is required'),
  badge: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  orderIndex: z.number().default(0),
  published: z.boolean().default(true),
});

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
      const existing = await prisma.project.findUnique({
        where: { slug: req.body.slug },
      });

      if (existing) {
        throw new AppError('A project with this slug already exists', 400);
      }

      const project = await prisma.project.create({
        data: req.body,
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

      const project = await prisma.project.update({
        where: { id },
        data: req.body,
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
