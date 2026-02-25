import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CropData } from '@/lib/db/models/CropData';
import { authenticateToken } from '@/lib/middleware/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season');
    const soilType = searchParams.get('soilType');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (season) filter.season = season;
    if (category) filter.category = category;
    if (soilType) filter.soilTypes = soilType;
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { hindiName: { $regex: search, $options: 'i' } }
      ];
    }

    const crops = await CropData.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .lean();

    const total = await CropData.countDocuments(filter);

    return NextResponse.json(
      createSuccessResponse('Crops fetched successfully', {
        crops,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      })
    );
  } catch (error) {
    console.error('Get crops error:', error);
    return NextResponse.json(
      createErrorResponse('Failed to fetch crops'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateToken(request);
    if (!auth) {
      return NextResponse.json(
        createErrorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();
    
    const crop = new CropData(data);
    await crop.save();

    return NextResponse.json(
      createSuccessResponse('Crop added successfully', crop)
    );
  } catch (error) {
    console.error('Create crop error:', error);
    return NextResponse.json(
      createErrorResponse('Failed to create crop'),
      { status: 500 }
    );
  }
}