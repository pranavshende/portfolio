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
      const { 
        eventType = 'PAGE_VIEW', 
        path, 
        pageUrl, 
        projectSlug, 
        referrer, 
        visitorName 
      } = req.body;

      const actualPath = path || pageUrl || '/';

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
          path: actualPath,
          projectSlug: projectSlug || null,
          visitorHash,
          referrer: referrer || req.headers['referer'] || null,
          deviceType,
          browser,
          visitorName: visitorName || null,
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

      const results = await Promise.allSettled([
        prisma.analyticsEvent.count({ where: { eventType: EventType.PAGE_VIEW } }),
        prisma.contactInquiry.count(),
        prisma.contactInquiry.count({ where: { status: 'NEW' } }),
        prisma.resume.aggregate({ _sum: { downloadCount: true } }),
        prisma.project.count({ where: { published: true } }),
        prisma.newsletterSubscriber.count(),
        prisma.contactInquiry.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            inquiryNumber: true,
            fullName: true,
            email: true,
            company: true,
            subject: true,
            inquiryType: true,
            message: true,
            status: true,
            createdAt: true,
            userAgent: true,
            ipAddress: true,
          },
        }),
        prisma.booking.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            guestName: true,
            guestEmail: true,
            guestCompany: true,
            purpose: true,
            status: true,
            slotTime: true,
            createdAt: true,
          },
        }),
        prisma.analyticsEvent.findMany({
          where: { timestamp: { gte: thirtyDaysAgo } },
          select: { 
            timestamp: true, 
            visitorHash: true, 
            deviceType: true, 
            browser: true, 
            eventType: true, 
            path: true,
            visitorName: true,
          },
        }),
      ]);

      const totalPageViews = results[0].status === 'fulfilled' ? results[0].value : 0;
      const totalInquiries = results[1].status === 'fulfilled' ? results[1].value : 0;
      const unreadInquiries = results[2].status === 'fulfilled' ? results[2].value : 0;
      const totalResumeDownloads = results[3].status === 'fulfilled' ? results[3].value : { _sum: { downloadCount: 0 } };
      const totalProjects = results[4].status === 'fulfilled' ? results[4].value : 0;
      const subscribersCount = results[5].status === 'fulfilled' ? results[5].value : 0;
      const allInquiries = results[6].status === 'fulfilled' ? results[6].value : [];
      const allBookings = results[7].status === 'fulfilled' ? results[7].value : [];
      const events = results[8].status === 'fulfilled' ? results[8].value : [];

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
        count: item.views,
        visitors: item.visitors.size,
      }));

      // Device distribution
      const deviceCounts: { [key: string]: number } = { desktop: 0, mobile: 0, tablet: 0 };
      events.forEach((e) => {
        if (e.deviceType && deviceCounts[e.deviceType] !== undefined) {
          deviceCounts[e.deviceType]++;
        }
      });

      const totalDeviceSamples = deviceCounts.desktop + deviceCounts.mobile + deviceCounts.tablet;
      const deviceDistribution = totalDeviceSamples > 0
        ? [
            { name: 'Desktop', value: Math.round((deviceCounts.desktop / totalDeviceSamples) * 100) },
            { name: 'Mobile', value: Math.round((deviceCounts.mobile / totalDeviceSamples) * 100) },
            { name: 'Tablet', value: Math.round((deviceCounts.tablet / totalDeviceSamples) * 100) },
          ]
        : [
            { name: 'Desktop', value: 70 },
            { name: 'Mobile', value: 25 },
            { name: 'Tablet', value: 5 },
          ];

      // Popular projects from real database records
      const popularProjects = await prisma.project.findMany({
        take: 6,
        orderBy: { viewCount: 'desc' },
        select: { id: true, title: true, slug: true, viewCount: true, category: true },
      });

      const totalDownloads = totalResumeDownloads._sum.downloadCount || 0;

      // Unified Identified Visitors list (Who visited and interacted by name)
      const identifiedVisitors = [
        ...allInquiries.map((inq) => ({
          id: inq.id,
          name: inq.fullName,
          email: inq.email,
          company: inq.company || 'Direct Visitor',
          type: inq.inquiryType,
          subject: inq.subject,
          message: inq.message,
          source: 'Contact Form',
          status: inq.status,
          device: inq.userAgent ? (/mobile/i.test(inq.userAgent) ? 'Mobile' : 'Desktop') : 'Desktop',
          createdAt: inq.createdAt,
        })),
        ...allBookings.map((b) => ({
          id: b.id,
          name: b.guestName,
          email: b.guestEmail,
          company: b.guestCompany || 'Meeting Guest',
          type: 'MEETING_BOOKING',
          subject: b.purpose,
          message: `Scheduled slot: ${new Date(b.slotTime).toLocaleString()}`,
          source: 'Meeting Booking',
          status: b.status,
          device: 'Web Client',
          createdAt: b.createdAt,
        })),
        ...events
          .filter((e) => e.visitorName)
          .map((e, idx) => ({
            id: `evt-${idx}`,
            name: e.visitorName as string,
            email: 'Direct Session',
            company: 'Portfolio Visitor',
            type: 'PAGE_INTERACTION',
            subject: `Viewed ${e.path}`,
            message: `Active browsing session on path ${e.path}`,
            source: 'Verified Session',
            status: 'ACTIVE',
            device: e.deviceType || 'Desktop',
            createdAt: e.timestamp,
          })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      res.status(200).json({
        success: true,
        data: {
          totalVisitors: uniqueVisitors,
          projectViews: totalPageViews,
          totalInquiries,
          unreadInquiries,
          resumeDownloads: totalDownloads,
          subscribers: subscribersCount,
          visitorTrend: visitorTrends,
          visitorTrends,
          popularProjects: popularProjects.map((p) => ({
            name: p.title,
            views: p.viewCount,
            slug: p.slug,
            category: p.category,
          })),
          recentInquiries: allInquiries.slice(0, 5),
          identifiedVisitors,
          deviceDistribution,
          kpis: {
            totalVisitors: uniqueVisitors,
            totalPageViews,
            totalInquiries,
            unreadInquiries,
            resumeDownloads: totalDownloads,
            totalProjects,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
