import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { authenticateToken } from '@/lib/middleware/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';

export async function GET(
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

    const livestock = await Livestock.findOne({
      _id: (await context.params).id,
      userId: authResult.userId
    });

    if (!livestock) {
      return NextResponse.json(
        createErrorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse('Livestock fetched successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error fetching livestock:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to fetch livestock'),
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const livestock = await Livestock.findOneAndUpdate(
      { _id: (await context.params).id, userId: authResult.userId },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!livestock) {
      return NextResponse.json(
        createErrorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse('Livestock updated successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error updating livestock:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to update livestock'),
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const livestock = await Livestock.findOneAndDelete({
      _id: (await context.params).id,
      userId: authResult.userId
    });

    if (!livestock) {
      return NextResponse.json(
        createErrorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse('Livestock deleted successfully')
    );
  } catch (error: any) {
    console.error('Error deleting livestock:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to delete livestock'),
      { status: 500 }
    );
  }
}
