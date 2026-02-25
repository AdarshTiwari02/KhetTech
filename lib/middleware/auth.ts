import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { User } from '../db/models/User';

export interface AuthUser {
  userId: string;
  user: any;
}

export async function authenticateToken(req: NextRequest): Promise<AuthUser | null> {
  try {
    // Get token from header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Check if user exists
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return null;
    }

    return {
      userId: decoded.userId,
      user
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );
}