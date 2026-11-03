import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorHandler.js';
import { EventType } from '@prisma/client';

export const resumeController = {
  /**
   * Public: Get active resume
   */
  async getActive(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resume = await prisma.resume.findFirst({
        where: { isActive: true },
        orderBy: { updatedAt: 'desc' },
      });

      if (!resume) {
        // Fallback default
        res.status(200).json({
          success: true,
          data: {
            fileName: 'Pranav_Shende_Resume_2026.pdf',
            fileUrl: '/resume.pdf',
            version: '2026.1',
            downloadCount: 0,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Public: Track download count
   */
  async trackDownload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const active = await prisma.resume.findFirst({
        where: { isActive: true },
      });

      if (active) {
        await prisma.resume.update({
          where: { id: active.id },
          data: { downloadCount: { increment: 1 } },
        });

        // Log analytics event
        const visitorHash = req.ip || 'visitor';
        await prisma.analyticsEvent.create({
          data: {
            eventType: EventType.RESUME_DOWNLOAD,
            path: '/resume.pdf',
            visitorHash,
          },
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: List all resume versions
   */
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumes = await prisma.resume.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: resumes,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Add new resume version
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { version, fileName, fileUrl, fileSizeBytes, makeActive } = req.body;

      if (makeActive) {
        await prisma.resume.updateMany({
          data: { isActive: false },
        });
      }

      const newResume = await prisma.resume.create({
        data: {
          version,
          fileName,
          fileUrl,
          fileSizeBytes: fileSizeBytes || null,
          isActive: Boolean(makeActive),
        },
      });

      res.status(201).json({
        success: true,
        message: 'Resume version uploaded successfully',
        data: newResume,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Set active resume
   */
  async setActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);

      await prisma.$transaction([
        prisma.resume.updateMany({ data: { isActive: false } }),
        prisma.resume.update({ where: { id }, data: { isActive: true } }),
      ]);

      res.status(200).json({
        success: true,
        message: 'Active resume updated',
      });
    } catch (error) {
      next(error);
    }
  },
};
