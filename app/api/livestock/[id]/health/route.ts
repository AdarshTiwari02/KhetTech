import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { authenticateToken } from '@/lib/middleware/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';

// Add vaccination
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
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        createErrorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    let updateQuery: any = {};

    if (type === 'vaccination') {
      updateQuery = {
        $push: { 'health.vaccinations': data }
      };
    } else if (type === 'treatment') {
      updateQuery = {
        $push: { 'health.treatments': data },
        $set: { 'health.status': 'under_treatment' }
      };
    } else if (type === 'checkup') {
      updateQuery = {
        $push: { 'health.checkups': data }
      };
    } else if (type === 'status') {
      updateQuery = {
        $set: { 'health.status': data.status }
      };
    } else {
      return NextResponse.json(
        createErrorResponse('Invalid health record type'),
        { status: 400 }
      );
    }

    const livestock = await Livestock.findOneAndUpdate(
      { _id: (await context.params).id, userId: authResult.userId },
      updateQuery,
      { new: true }
    );

    if (!livestock) {
      return NextResponse.json(
        createErrorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse('Health record added successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error adding health record:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to add health record'),
      { status: 500 }
    );
  }
}
