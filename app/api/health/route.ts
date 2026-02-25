import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { createSuccessResponse } from '@/lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    let dbStatus = 'disconnected';

    try {
      await connectToDatabase();
      dbStatus = 'connected';
    } catch (error) {
      console.warn('Database connection failed:', error);
      dbStatus = 'disconnected';
    }

    return NextResponse.json(
      createSuccessResponse('KhetTech Backend is running!', {
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: dbStatus,
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}