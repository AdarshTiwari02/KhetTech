import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { MarketItem } from '@/lib/db/models/MarketItem';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();
        // Sort by createdAt descending to show newest first
        const items = await MarketItem.find({}).sort({ createdAt: -1 });

        // Map _id to id to match frontend interface
        const formattedItems = items.map(item => ({
            ...item.toObject(),
            id: item._id.toString(),
        }));

        return NextResponse.json({ success: true, count: items.length, data: formattedItems });
    } catch (error) {
        console.error('Error fetching market items:', error);
        return NextResponse.json(
            { success: false, error: 'बाजार के आइटम लाने में विफल' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await connectToDatabase();

        // Default postedDate if not provided
        if (!data.postedDate) {
            data.postedDate = new Date().toLocaleDateString('hi-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }

        const newItem = await MarketItem.create(data);

        return NextResponse.json({
            success: true,
            data: {
                ...newItem.toObject(),
                id: newItem._id.toString(),
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating market item:', error);
        return NextResponse.json(
            { success: false, error: 'विज्ञापन जोड़ने में विफल' },
            { status: 500 }
        );
    }
}
