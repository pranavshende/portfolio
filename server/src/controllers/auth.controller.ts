import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export const authController = {
  /**
   * Admin Login
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find admin
      const admin = await prisma.admin.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (!admin) {
        throw new AppError('Invalid email or password', 401);
      }

      // Check account lockout
      if (admin.lockUntil && admin.lockUntil > new Date()) {
        const remainingMinutes = Math.ceil((admin.lockUntil.getTime() - Date.now()) / (60 * 1000));
        throw new AppError(
          `Account temporarily locked due to multiple failed attempts. Try again in ${remainingMinutes} minute(s).`,
          423
        );
      }

      // Verify password
      const isValid = await bcrypt.compare(password, admin.passwordHash);

      if (!isValid) {
        const updatedAttempts = admin.loginAttempts + 1;
        const lockUntil = updatedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            loginAttempts: updatedAttempts,
            lockUntil,
          },
        });

        throw new AppError('Invalid email or password', 401);
      }

      // Reset login attempts and record login
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          loginAttempts: 0,
          lockUntil: null,
          lastLogin: new Date(),
        },
      });

      // Sign JWT
      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        env.JWT_SECRET,
        { expiresIn: (env.JWT_EXPIRES_IN || '7d') as any }
      );

      // Set secure HTTP-only cookie
      const isProduction = env.NODE_ENV === 'production';
      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Audit log
      await prisma.activityLog.create({
        data: {
          adminId: admin.id,
          action: 'ADMIN_LOGIN',
          targetEntity: 'Admin',
          entityId: admin.id,
          ipAddress: req.ip || req.socket.remoteAddress,
        },
      });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        data: {
          token,
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Admin Logout
   */
  async logout(_req: Request, res: Response): Promise<void> {
    const isProduction = env.NODE_ENV === 'production';
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  },

  /**
   * Get Current Authenticated Admin
   */
  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.admin) {
        throw new AppError('Not authenticated', 401);
      }

      const admin = await prisma.admin.findUnique({
        where: { id: req.admin.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          lastLogin: true,
          createdAt: true,
        },
      });

      if (!admin) {
        throw new AppError('Admin not found', 404);
      }

      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Password
   */
  async updatePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.admin) {
        throw new AppError('Not authenticated', 401);
      }

      const { currentPassword, newPassword } = req.body;

      const admin = await prisma.admin.findUnique({
        where: { id: req.admin.id },
      });

      if (!admin) {
        throw new AppError('Admin not found', 404);
      }

      const isCurrentValid = await bcrypt.compare(currentPassword, admin.passwordHash);
      if (!isCurrentValid) {
        throw new AppError('Current password is incorrect', 400);
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 12);

      await prisma.admin.update({
        where: { id: admin.id },
        data: { passwordHash: newPasswordHash },
      });

      res.status(200).json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
