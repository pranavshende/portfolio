import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { AppError } from './errorHandler.js';

export interface AuthenticatedRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Prefer explicit Authorization: Bearer header from frontend client
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      throw new AppError('Unauthorized access. Please login first.', 401);
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as {
        id: string;
        email: string;
        role: string;
      };
    } catch (jwtErr: any) {
      // If primary token failed, test cookie fallback if available
      if (req.cookies?.admin_token && token !== req.cookies.admin_token) {
        decoded = jwt.verify(req.cookies.admin_token, env.JWT_SECRET) as {
          id: string;
          email: string;
          role: string;
        };
      } else {
        throw jwtErr;
      }
    }

    // Verify admin is still active in database
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!admin) {
      throw new AppError('Admin account not found or deactivated.', 401);
    }

    req.admin = admin;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(new AppError('Invalid or expired authentication token. Please login again.', 401));
      return;
    }
    next(error);
  }
};
