import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { prisma } from '../config/prisma.js';
import { EventType } from '@prisma/client';

export const analyticsController = {
  /**
   * Public: Log privacy-conscious analytics event
   */
  async recordEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventType = 'PAGE_VIEW', path = '/', projectSlug, referrer } = req.body;

      // Generate a non-reversible, privacy-safe hash from IP + User Agent + Daily Salt
      const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'unknown';
      const today = new Date().toISOString().slice(0, 10);
      const visitorHash = crypto
        .createHash('sha256')
        .update(`${ip}-${userAgent}-${today}`)
        .digest('hex')
        .slice(0, 16);

      // Determine simple device type
      let deviceType = 'desktop';
      if (/mobile/i.test(userAgent)) deviceType = 'mobile';
      else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet';

      // Determine browser
      let browser = 'Other';
      if (/chrome|crios/i.test(userAgent) && !/edge|edg/i.test(userAgent)) browser = 'Chrome';
      else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
      else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
      else if (/edge|edg/i.test(userAgent)) browser = 'Edge';

      await prisma.analyticsEvent.create({
        data: {
          eventType: (eventType as EventType) || EventType.PAGE_VIEW,
          path,
          projectSlug: projectSlug || null,
          visitorHash,
          referrer: referrer || req.headers['referer'] || null,
          deviceType,
          browser,
        },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin: Overview analytics & metrics
   */
  async getOverview(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [
        totalPageViews,
        totalInquiries,
        unreadInquiries,
        totalResumeDownloads,
        totalProjects,
        recentInquiries,
        events,
      ] = await Promise.all([
        prisma.analyticsEvent.count({ where: { eventType: EventType.PAGE_VIEW } }),
        prisma.contactInquiry.count(),
        prisma.contactInquiry.count({ where: { status: 'NEW' } }),
        prisma.resume.aggregate({ _sum: { downloadCount: true } }),
        prisma.project.count({ where: { published: true } }),
        prisma.contactInquiry.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { id: true, inquiryNumber: true, fullName: true, subject: true, status: true, createdAt: true },
        }),
        prisma.analyticsEvent.findMany({
          where: { timestamp: { gte: thirtyDaysAgo } },
          select: { timestamp: true, visitorHash: true, deviceType: true, browser: true, eventType: true, path: true },
        }),
      ]);

      // Calculate unique visitors
      const uniqueVisitors = new Set(events.map((e) => e.visitorHash)).size;

      // Group views by day (last 14 days)
      const dailyMap: { [key: string]: { date: string; views: number; visitors: Set<string> } } = {};
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        dailyMap[key] = { date: key.slice(5), views: 0, visitors: new Set() };
      }

      events.forEach((ev) => {
        const key = ev.timestamp.toISOString().slice(0, 10);
        if (dailyMap[key]) {
          dailyMap[key].views++;
          dailyMap[key].visitors.add(ev.visitorHash);
        }
      });

      const visitorTrends = Object.values(dailyMap).map((item) => ({
        date: item.date,
        views: item.views,
        visitors: item.visitors.size,
      }));

      // Device distribution
      const deviceCounts: { [key: string]: number } = { desktop: 0, mobile: 0, tablet: 0 };
      events.forEach((e) => {
        if (e.deviceType && deviceCounts[e.deviceType] !== undefined) {
          deviceCounts[e.deviceType]++;
        }
      });

      // Popular projects
      const popularProjects = await prisma.project.findMany({
        take: 5,
        orderBy: { viewCount: 'desc' },
        select: { id: true, title: true, slug: true, viewCount: true, category: true },
      });

      res.status(200).json({
        success: true,
        data: {
          kpis: {
            totalVisitors: uniqueVisitors,
            totalPageViews,
            totalInquiries,
            unreadInquiries,
            resumeDownloads: totalResumeDownloads._sum.downloadCount || 0,
            totalProjects,
          },
          visitorTrends,
          deviceDistribution: [
            { name: 'Desktop', value: deviceCounts.desktop },
            { name: 'Mobile', value: deviceCounts.mobile },
            { name: 'Tablet', value: deviceCounts.tablet },
          ],
          popularProjects,
          recentInquiries,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
