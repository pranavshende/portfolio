import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorHandler.js';
import { TestimonialStatus } from '@prisma/client';

export const contentController = {
  // ── EXPERIENCES ──
  async getExperiences(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.experience.findMany({
        where: { published: true },
        orderBy: { orderIndex: 'asc' },
      });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async adminGetExperiences(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.experience.findMany({ orderBy: { orderIndex: 'asc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async createExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await prisma.experience.create({ data: req.body });
      res.status(201).json({ success: true, message: 'Experience added', data: item });
    } catch (e) {
      next(e);
    }
  },

  async updateExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const item = await prisma.experience.update({ where: { id }, data: req.body });
      res.status(200).json({ success: true, message: 'Experience updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.experience.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Experience deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── SKILLS ──
  async getSkills(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.skill.findMany({ orderBy: { orderIndex: 'asc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async createSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await prisma.skill.create({ data: req.body });
      res.status(201).json({ success: true, message: 'Skill added', data: item });
    } catch (e) {
      next(e);
    }
  },

  async updateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const item = await prisma.skill.update({ where: { id }, data: req.body });
      res.status(200).json({ success: true, message: 'Skill updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.skill.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Skill deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── ACHIEVEMENTS ──
  async getAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.achievement.findMany({
        where: { published: true },
        orderBy: { orderIndex: 'asc' },
      });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async adminGetAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.achievement.findMany({ orderBy: { orderIndex: 'asc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async createAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await prisma.achievement.create({ data: req.body });
      res.status(201).json({ success: true, message: 'Achievement added', data: item });
    } catch (e) {
      next(e);
    }
  },

  async updateAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const item = await prisma.achievement.update({ where: { id }, data: req.body });
      res.status(200).json({ success: true, message: 'Achievement updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.achievement.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Achievement deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── EDUCATION ──
  async getEducation(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.education.findMany({ orderBy: { orderIndex: 'asc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async createEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await prisma.education.create({ data: req.body });
      res.status(201).json({ success: true, message: 'Education added', data: item });
    } catch (e) {
      next(e);
    }
  },

  async updateEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const item = await prisma.education.update({ where: { id }, data: req.body });
      res.status(200).json({ success: true, message: 'Education updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.education.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Education deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── TESTIMONIALS ──
  async getApprovedTestimonials(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.testimonial.findMany({
        where: { status: TestimonialStatus.APPROVED },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async submitTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, role, company, content, rating, avatarUrl } = req.body;
      const item = await prisma.testimonial.create({
        data: {
          name,
          role,
          company,
          content,
          rating: rating || 5,
          avatarUrl: avatarUrl || null,
          status: TestimonialStatus.PENDING,
        },
      });
      res.status(201).json({
        success: true,
        message: 'Thank you! Your testimonial has been submitted for review.',
        data: item,
      });
    } catch (e) {
      next(e);
    }
  },

  async adminGetTestimonials(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async updateTestimonialStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const { status } = req.body;
      const item = await prisma.testimonial.update({ where: { id }, data: { status } });
      res.status(200).json({ success: true, message: 'Status updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.testimonial.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Testimonial deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── BLOG POSTS ──
  async getBlogPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category, tag, search } = req.query;
      const where: any = { published: true };
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (tag && typeof tag === 'string') {
        where.tags = { has: tag };
      }
      if (search && typeof search === 'string') {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ];
      }

      const items = await prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
      });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (e) {
      next(e);
    }
  },

  async getBlogPostBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = String(req.params.slug);
      const item = await prisma.blogPost.findUnique({ where: { slug } });
      if (!item) throw new AppError('Blog post not found', 404);
      prisma.blogPost.update({ where: { id: item.id }, data: { viewCount: { increment: 1 } } }).catch(console.error);
      res.status(200).json({ success: true, data: item });
    } catch (e) {
      next(e);
    }
  },

  async adminGetBlogPosts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (e) {
      next(e);
    }
  },

  async createBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      const title = (body.title || '').trim();
      let slug = (body.slug || '').trim();
      if (!slug && title) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      let tags: string[] = [];
      if (Array.isArray(body.tags)) {
        tags = body.tags.map(String).map((s: string) => s.trim()).filter(Boolean);
      } else if (typeof body.tags === 'string') {
        tags = body.tags.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      const content = (body.content || '').trim();
      let readingTimeMinutes = Number(body.readingTimeMinutes ?? body.readTime ?? 0);
      if (!readingTimeMinutes || readingTimeMinutes <= 0) {
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      }

      const coverImageUrl = (body.coverImageUrl || body.coverImage || '').trim() || null;
      const published = body.published !== undefined ? Boolean(body.published) : (body.isPublished !== undefined ? Boolean(body.isPublished) : false);

      // Unique slug check
      let finalSlug = slug;
      const existing = await prisma.blogPost.findUnique({ where: { slug: finalSlug } });
      if (existing) {
        finalSlug = `${slug}-${Date.now().toString(36)}`;
      }

      const data: any = {
        title,
        slug: finalSlug,
        excerpt: (body.excerpt || (content.length > 200 ? content.slice(0, 197) + '...' : content)).trim(),
        content,
        coverImageUrl,
        category: (body.category || 'System Design & AI').trim(),
        author: (body.author || 'Pranav Shende').trim(),
        tags,
        readingTimeMinutes,
        published,
        publishedAt: published ? (body.publishedAt ? new Date(body.publishedAt) : new Date()) : null,
        seoTitle: (body.seoTitle || title).trim() || null,
        seoDescription: (body.seoDescription || body.excerpt || '').trim() || null,
        canonicalUrl: (body.canonicalUrl || `https://pranavshende.online/blog/${finalSlug}`).trim() || null,
      };

      const item = await prisma.blogPost.create({ data });
      res.status(201).json({ success: true, message: 'Blog post created', data: item });
    } catch (e) {
      next(e);
    }
  },

  async updateBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const body = req.body;

      const title = (body.title || '').trim();
      let slug = (body.slug || '').trim();
      if (!slug && title) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      let tags: string[] = [];
      if (Array.isArray(body.tags)) {
        tags = body.tags.map(String).map((s: string) => s.trim()).filter(Boolean);
      } else if (typeof body.tags === 'string') {
        tags = body.tags.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      const content = (body.content || '').trim();
      let readingTimeMinutes = Number(body.readingTimeMinutes ?? body.readTime ?? 0);
      if (!readingTimeMinutes || readingTimeMinutes <= 0) {
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      }

      const coverImageUrl = (body.coverImageUrl || body.coverImage || '').trim() || null;
      const published = body.published !== undefined ? Boolean(body.published) : (body.isPublished !== undefined ? Boolean(body.isPublished) : undefined);

      const updateData: any = {};
      if (title) updateData.title = title;
      if (slug) {
        const existing = await prisma.blogPost.findUnique({ where: { slug } });
        if (existing && existing.id !== id) {
          updateData.slug = `${slug}-${Date.now().toString(36)}`;
        } else {
          updateData.slug = slug;
        }
      }
      if (body.excerpt !== undefined) updateData.excerpt = body.excerpt.trim();
      if (content) updateData.content = content;
      if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
      if (body.category !== undefined) updateData.category = body.category.trim();
      if (body.author !== undefined) updateData.author = body.author.trim();
      if (tags.length > 0) updateData.tags = tags;
      if (readingTimeMinutes > 0) updateData.readingTimeMinutes = readingTimeMinutes;
      if (published !== undefined) {
        updateData.published = published;
        if (published) {
          const current = await prisma.blogPost.findUnique({ where: { id } });
          if (!current?.publishedAt) {
            updateData.publishedAt = new Date();
          }
        }
      }
      if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle.trim() || null;
      if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription.trim() || null;
      if (body.canonicalUrl !== undefined) updateData.canonicalUrl = body.canonicalUrl.trim() || null;

      const item = await prisma.blogPost.update({ where: { id }, data: updateData });
      res.status(200).json({ success: true, message: 'Blog post updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  async deleteBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.blogPost.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Blog post deleted' });
    } catch (e) {
      next(e);
    }
  },

  // ── NEWSLETTER ──
  async subscribeNewsletter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
      if (existing) {
        if (existing.status === 'ACTIVE') {
          res.status(200).json({ success: true, message: 'You are already subscribed!' });
          return;
        }
        await prisma.newsletterSubscriber.update({ where: { id: existing.id }, data: { status: 'ACTIVE' } });
        res.status(200).json({ success: true, message: 'Welcome back! Your subscription has been reactivated.' });
        return;
      }
      await prisma.newsletterSubscriber.create({ data: { email } });
      res.status(201).json({ success: true, message: 'Thank you for subscribing to my newsletter!' });
    } catch (e) {
      next(e);
    }
  },

  async adminGetSubscribers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  // ── BOOKINGS ──
  async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await prisma.booking.create({ data: req.body });
      res.status(201).json({
        success: true,
        message: 'Meeting requested successfully! Pranav will confirm your slot.',
        data: item,
      });
    } catch (e) {
      next(e);
    }
  },

  async adminGetBookings(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await prisma.booking.findMany({ orderBy: { slotTime: 'desc' } });
      res.status(200).json({ success: true, data: items });
    } catch (e) {
      next(e);
    }
  },

  async updateBookingStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const item = await prisma.booking.update({ where: { id }, data: { status: req.body.status } });
      res.status(200).json({ success: true, message: 'Booking status updated', data: item });
    } catch (e) {
      next(e);
    }
  },

  // ── WEBSITE SETTINGS & PROFILES ──
  async getSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rows = await prisma.siteSetting.findMany();
      const settings: Record<string, any> = {
        siteName: 'Pranav Shende Portfolio',
        heroGreeting: "Hi there! I'm Pranav 👋",
        heroBio: 'An aspiring forward deployed engineer dedicated to building scalable backend architectures and AI solutions.',
        contactEmail: 'pranavshende97@gmail.com',
        githubUrl: 'https://github.com/PranavShende',
        linkedinUrl: 'https://linkedin.com/in/pranavshende',
        resumeDriveUrl: 'https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing',
        maintenanceMode: false,
      };

      for (const row of rows) {
        try {
          settings[row.key] = JSON.parse(row.value);
        } catch {
          settings[row.key] = row.value;
        }
      }

      res.status(200).json({ success: true, data: settings });
    } catch (e) {
      next(e);
    }
  },

  async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updates = req.body;
      if (!updates || typeof updates !== 'object') {
        throw new AppError('Invalid settings payload', 400);
      }

      for (const [key, val] of Object.entries(updates)) {
        const valString = typeof val === 'string' ? val : JSON.stringify(val);
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: valString },
          create: { key, value: valString },
        });
      }

      res.status(200).json({ success: true, message: 'Website settings saved successfully' });
    } catch (e) {
      next(e);
    }
  },
};
