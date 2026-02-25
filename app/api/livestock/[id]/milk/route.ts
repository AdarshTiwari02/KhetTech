import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { authenticateToken } from '@/lib/middleware/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult || !authResult.userId) {
      return NextResponse.json(
        createErrorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { date, morning, evening, fat, notes } = body;

    if (!date || morning === undefined || evening === undefined) {
      return NextResponse.json(
        createErrorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    const total = morning + evening;

    const livestock = await Livestock.findOneAndUpdate(
      { _id: (await context.params).id, userId: authResult.userId },
      {
        $push: {
          'milkProduction.records': {
            date: new Date(date),
            morning,
            evening,
            total,
            fat,
            notes
          }
        }
      },
      { new: true }
    );

    if (!livestock) {
      return NextResponse.json(
        createErrorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    // Calculate average
    const records = livestock.milkProduction?.records || [];
    const last7Days = records.slice(-7);
    const avgPerDay = last7Days.reduce((sum: number, r: any) => sum + r.total, 0) / last7Days.length;

    await Livestock.findByIdAndUpdate((await context.params).id, {
      'milkProduction.averagePerDay': avgPerDay
    });

    return NextResponse.json(
      createSuccessResponse('Milk production recorded successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error recording milk production:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to record milk production'),
      { status: 500 }
    );
  }
}
