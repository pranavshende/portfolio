import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';

export const aiController = {
  /**
   * Public: Query AI Assistant with RAG context retrieval
   */
  async chat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ success: false, message: 'Query string is required' });
        return;
      }

      const q = query.toLowerCase();

      // Fetch verified portfolio knowledge base from PostgreSQL
      const [projects, experiences, skills, achievements, education] = await Promise.all([
        prisma.project.findMany({ where: { published: true } }),
        prisma.experience.findMany({ where: { published: true } }),
        prisma.skill.findMany({}),
        prisma.achievement.findMany({ where: { published: true } }),
        prisma.education.findFirst({}),
      ]);

      // Check contact intent
      if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach out') || q.includes('call')) {
        res.status(200).json({
          success: true,
          data: {
            reply: `You can reach Pranav directly via the [Contact Form](#contact) on this portfolio or email him at [pranavshende97@gmail.com](mailto:pranavshende97@gmail.com). You can also connect with him on [LinkedIn](https://linkedin.com/in/pranavshende).`,
            suggestions: ['Show your best project', 'What tech stack do you use?', 'Download Resume'],
          },
        });
        return;
      }

      // Check resume intent
      if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
        res.status(200).json({
          success: true,
          data: {
            reply: `You can view or download Pranav's latest verified resume right here: [Download Resume (PDF)](/resume.pdf). It covers his full-stack backend architectures, IEEE publications, and engineering internships.`,
            suggestions: ['Tell me about your projects', 'Where did you intern?'],
          },
        });
        return;
      }

      // Check project intent
      if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('electropathy') || q.includes('tastifyy') || q.includes('jansampark') || q.includes('solar') || q.includes('pashu')) {
        let matching = projects.filter((p) =>
          q.includes(p.slug) ||
          p.title.toLowerCase().includes(q) ||
          p.techStack.some((t) => q.includes(t.toLowerCase()))
        );

        if (matching.length === 0) matching = projects.slice(0, 3);

        const projectList = matching
          .map(
            (p) =>
              `- **[${p.title}](https://github.com/pranavshende/${p.slug})**: ${p.subtitle}. Built with *${p.techStack.slice(0, 4).join(', ')}*.`
          )
          .join('\n');

        res.status(200).json({
          success: true,
          data: {
            reply: `Here are the key production systems Pranav has built:\n\n${projectList}\n\nYou can click any card on the [Projects Page](/projects) to inspect detailed architecture and metrics.`,
            suggestions: ['Tell me about Electropathy AI', 'Tell me about Tastifyy', 'What tech stack do you use?'],
          },
        });
        return;
      }

      // Check skills / stack intent
      if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('tools')) {
        const topSkills = skills.slice(0, 12).map((s) => `\`${s.name}\``).join(', ');
        res.status(200).json({
          success: true,
          data: {
            reply: `Pranav specializes in scalable backend architectures and AI integrations. His core tech stack includes:\n\n${topSkills}.\n\nHe has production experience with Node.js, Express, PostgreSQL, Prisma, React, React Native, Kafka streaming, Redis geospatial caching, and pgvector embeddings.`,
            suggestions: ['Show your best project', 'What internships have you done?', 'Download Resume'],
          },
        });
        return;
      }

      // Check experience / internships intent
      if (q.includes('intern') || q.includes('experience') || q.includes('company') || q.includes('job') || q.includes('leadership')) {
        const expList = experiences
          .map(
            (e) =>
              `- **${e.role} @ ${e.company}** (${e.startDate.getFullYear()}): ${e.description}`
          )
          .join('\n');

        res.status(200).json({
          success: true,
          data: {
            reply: `Pranav's professional experience includes:\n\n${expList}`,
            suggestions: ['What is JanSampark?', 'Tell me about your research', 'Contact Pranav'],
          },
        });
        return;
      }

      // Check research / publication intent
      if (q.includes('research') || q.includes('paper') || q.includes('ieee') || q.includes('publication') || q.includes('lumpy')) {
        const pubList = achievements
          .filter((a) => a.category === 'PUBLICATION')
          .map((a) => `- **${a.title}** (${a.organization}): ${a.description}`)
          .join('\n\n');

        res.status(200).json({
          success: true,
          data: {
            reply: `Pranav is an active researcher in Edge AI and Intelligent Systems:\n\n${pubList}`,
            suggestions: ['Tell me about PashuRakshak', 'Download Resume', 'Show your best project'],
          },
        });
        return;
      }

      // Default introduction
      res.status(200).json({
        success: true,
        data: {
          reply: `Hi! I'm Pranav Shende's Portfolio AI Assistant. Pranav is an aspiring forward deployed engineer and B.Tech IT student at SVPCET Nagpur dedicated to building scalable backend systems (Kafka, Redis, Node.js, PostgreSQL) and AI solutions (Agentic RAG, pgvector, Edge CNNs).\n\nHow can I help you today?`,
          suggestions: [
            '🚀 Show your best project',
            '💻 What tech stack do you use?',
            '📄 Download Resume',
            '📬 Contact Pranav',
          ],
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
