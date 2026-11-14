import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { emailService } from '../services/email.service.js';
import { AppError } from '../middleware/errorHandler.js';
import { InquiryType, InquiryStatus } from '@prisma/client';

const normalizeInquiryType = (val: any): InquiryType => {
  if (!val) return InquiryType.GENERAL;
  const s = String(val).toUpperCase().replace(/[^A-Z]/g, '_');
  if (s.includes('JOB')) return InquiryType.JOB_OPPORTUNITY;
  if (s.includes('INTERN')) return InquiryType.INTERNSHIP;
  if (s.includes('FREELANCE')) return InquiryType.FREELANCE;
  if (s.includes('COLLAB')) return InquiryType.COLLABORATION;
  if (s.includes('TECH')) return InquiryType.TECH_DISCUSSION;
  if (s.includes('GENERAL')) return InquiryType.GENERAL;
  if (Object.values(InquiryType).includes(val as InquiryType)) return val as InquiryType;
  return InquiryType.OTHER;
};

export const createInquirySchema = z.object({
  fullName: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().nullable().or(z.literal('')),
  phoneNumber: z.string().optional().nullable().or(z.literal('')),
  callTiming: z.string().optional().nullable().or(z.literal('')),
  preferredTiming: z.string().optional().nullable().or(z.literal('')),
  company: z.string().optional().nullable(),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  inquiryType: z.any().optional(),
  message: z.string().min(3, 'Message must be at least 3 characters'),
  attachmentUrl: z.string().optional().nullable().or(z.literal('')),
}).refine((data) => Boolean((data.fullName && data.fullName.trim().length > 0) || (data.name && data.name.trim().length > 0)), {
  message: 'Full Name is required',
  path: ['fullName'],
});

export const updateStatusSchema = z.object({
  status: z.nativeEnum(InquiryStatus),
  adminNotes: z.string().optional(),
});

export const contactController = {
  /**
   * Public: Submit contact form
   */
  async submit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const resolvedFullName = (data.fullName || data.name || '').trim();
      const resolvedInquiryType = normalizeInquiryType(data.inquiryType);
      
      let resolvedMessage = (data.message || '').trim();
      const phone = (data.phone || data.phoneNumber || '').trim();
      const callTiming = (data.callTiming || data.preferredTiming || '').trim();

      if ((phone || callTiming) && !resolvedMessage.includes('📞 Phone Number') && !resolvedMessage.includes('⏰ Preferred Call Timing')) {
        const meta = [
          phone ? `📞 Phone Number: ${phone}` : '',
          callTiming ? `⏰ Preferred Call Timing: ${callTiming}` : ''
        ].filter(Boolean).join('\n');
        resolvedMessage = `${meta}\n\n---\n\n${resolvedMessage}`;
      }

      // Generate human-friendly inquiry ticket number e.g. INQ-2026-0042
      const year = new Date().getFullYear();
      const count = await prisma.contactInquiry.count();
      const inquiryNumber = `INQ-${year}-${String(count + 1).padStart(4, '0')}`;

      const inquiry = await prisma.contactInquiry.create({
        data: {
          inquiryNumber,
          fullName: resolvedFullName,
          email: data.email.toLowerCase().trim(),
          company: data.company || null,
          subject: data.subject,
          inquiryType: resolvedInquiryType,
          message: resolvedMessage,
          attachmentUrl: data.attachmentUrl ? String(data.attachmentUrl).trim() : null,
          ipAddress: req.ip || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'] || null,
        },
      });

      // Send inbound email notification and confirmation in background
      Promise.allSettled([
        emailService.sendContactNotification(inquiry),
        emailService.sendContactAcknowledgment(inquiry.email, inquiry.fullName, inquiry.inquiryNumber, inquiry.subject),
      ]).then((results) => {
        results.forEach((r, idx) => {
          if (r.status === 'rejected') {
            console.error(`[Email Error - ${idx === 0 ? 'Admin Alert' : 'User Acknowledgment'}]:`, r.reason);
          } else {
            console.log(`[Email Sent - ${idx === 0 ? 'Admin Alert' : 'User Acknowledgment'}]`);
          }
        });
      });

      res.status(201).json({
        success: true,
        message: 'Your inquiry has been submitted successfully. I will get back to you shortly.',
        data: {
          inquiryNumber: inquiry.inquiryNumber,
          createdAt: inquiry.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: List all inquiries with filtering & search
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, type, search, page = '1', limit = '20' } = req.query;

      const pageNum = parseInt(page as string, 10) || 1;
      const limitNum = parseInt(limit as string, 10) || 20;
      const skip = (pageNum - 1) * limitNum;

      const where: any = {};

      if (status && typeof status === 'string' && status !== 'ALL') {
        where.status = status as InquiryStatus;
      }

      if (type && typeof type === 'string' && type !== 'ALL') {
        where.inquiryType = type as InquiryType;
      }

      if (search && typeof search === 'string') {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
          { inquiryNumber: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [inquiries, total] = await Promise.all([
        prisma.contactInquiry.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.contactInquiry.count({ where }),
      ]);

      res.status(200).json({
        success: true,
        data: inquiries,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Get single inquiry details
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);

      const inquiry = await prisma.contactInquiry.findUnique({
        where: { id },
      });

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      res.status(200).json({
        success: true,
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Update inquiry status and private notes
   */
  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const { status, adminNotes } = req.body;

      const updated = await prisma.contactInquiry.update({
        where: { id },
        data: {
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {}),
        },
      });

      res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Delete inquiry
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);

      await prisma.contactInquiry.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Export all inquiries as CSV
   */
  async exportCsv(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiries = await prisma.contactInquiry.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const header = 'Inquiry Number,Full Name,Email,Company,Inquiry Type,Subject,Status,Created At\n';
      const rows = inquiries
        .map((i) =>
          [
            `"${i.inquiryNumber}"`,
            `"${i.fullName.replace(/"/g, '""')}"`,
            `"${i.email}"`,
            `"${(i.company || '').replace(/"/g, '""')}"`,
            `"${i.inquiryType}"`,
            `"${i.subject.replace(/"/g, '""')}"`,
            `"${i.status}"`,
            `"${i.createdAt.toISOString()}"`,
          ].join(',')
        )
        .join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="inquiries_export.csv"');
      res.status(200).send(header + rows);
    } catch (error) {
      next(error);
    }
  },
};
