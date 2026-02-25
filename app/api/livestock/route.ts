import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { authenticateToken } from '@/lib/middleware/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult || !authResult.userId) {
      return NextResponse.json(
        createErrorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const animalType = searchParams.get('type');

    const query: any = { userId: authResult.userId, status };
    if (animalType) {
      query.animalType = animalType;
    }

    const livestock = await Livestock.find(query).sort({ createdAt: -1 });

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

export async function POST(request: NextRequest) {
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
    const {
      animalType,
      breed,
      tagNumber,
      name,
      gender,
      dateOfBirth,
      purchaseDate,
      purchasePrice,
      currentValue,
      notes
    } = body;

    // Validate required fields
    if (!animalType || !breed || !tagNumber || !gender || !purchaseDate || !purchasePrice) {
      return NextResponse.json(
        createErrorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    // Check if tag number already exists
    const existingAnimal = await Livestock.findOne({ tagNumber });
    if (existingAnimal) {
      return NextResponse.json(
        createErrorResponse('Tag number already exists'),
        { status: 400 }
      );
    }

    const livestock = await Livestock.create({
      userId: authResult.userId,
      animalType,
      breed,
      tagNumber,
      name,
      gender,
      dateOfBirth,
      purchaseDate,
      purchasePrice,
      currentValue: currentValue || purchasePrice,
      notes,
      health: {
        status: 'healthy',
        vaccinations: [],
        treatments: [],
        checkups: []
      },
      weight: {
        history: []
      },
      milkProduction: {
        records: []
      }
    });

    return NextResponse.json(
      createSuccessResponse('Livestock added successfully', livestock),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding livestock:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to add livestock'),
      { status: 500 }
    );
  }
}
