import { Router } from 'express';
import { contentController } from '../controllers/content.controller.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Experiences
router.get('/experiences', contentController.getExperiences);
router.get('/experiences/admin', authenticateAdmin, contentController.adminGetExperiences);
router.post('/experiences', authenticateAdmin, contentController.createExperience);
router.put('/experiences/:id', authenticateAdmin, contentController.updateExperience);
router.delete('/experiences/:id', authenticateAdmin, contentController.deleteExperience);

// Skills
router.get('/skills', contentController.getSkills);
router.post('/skills', authenticateAdmin, contentController.createSkill);
router.put('/skills/:id', authenticateAdmin, contentController.updateSkill);
router.delete('/skills/:id', authenticateAdmin, contentController.deleteSkill);

// Achievements
router.get('/achievements', contentController.getAchievements);
router.get('/achievements/admin', authenticateAdmin, contentController.adminGetAchievements);
router.post('/achievements', authenticateAdmin, contentController.createAchievement);
router.put('/achievements/:id', authenticateAdmin, contentController.updateAchievement);
router.delete('/achievements/:id', authenticateAdmin, contentController.deleteAchievement);

// Education
router.get('/education', contentController.getEducation);
router.post('/education', authenticateAdmin, contentController.createEducation);
router.put('/education/:id', authenticateAdmin, contentController.updateEducation);
router.delete('/education/:id', authenticateAdmin, contentController.deleteEducation);

// Testimonials
router.get('/testimonials', contentController.getApprovedTestimonials);
router.post('/testimonials', contentController.submitTestimonial);
router.get('/testimonials/admin', authenticateAdmin, contentController.adminGetTestimonials);
router.patch('/testimonials/:id/status', authenticateAdmin, contentController.updateTestimonialStatus);
router.delete('/testimonials/:id', authenticateAdmin, contentController.deleteTestimonial);

// Blog
router.get('/blog', contentController.getBlogPosts);
router.get('/blog/:slug', contentController.getBlogPostBySlug);
router.get('/blog/admin/all', authenticateAdmin, contentController.adminGetBlogPosts);
router.post('/blog', authenticateAdmin, contentController.createBlogPost);
router.put('/blog/:id', authenticateAdmin, contentController.updateBlogPost);
router.delete('/blog/:id', authenticateAdmin, contentController.deleteBlogPost);

// Newsletter
router.post('/newsletter/subscribe', contentController.subscribeNewsletter);
router.get('/newsletter/subscribers', authenticateAdmin, contentController.adminGetSubscribers);

// Bookings
router.post('/bookings', contentController.createBooking);
router.get('/bookings', authenticateAdmin, contentController.adminGetBookings);
router.patch('/bookings/:id/status', authenticateAdmin, contentController.updateBookingStatus);

export default router;
