import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { MarketItem } from '@/lib/db/models/MarketItem';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const deletedItem = await MarketItem.findByIdAndDelete(params.id);

        if (!deletedItem) {
            return NextResponse.json(
                { success: false, error: 'विज्ञापन नहीं मिला' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error('Error deleting market item:', error);
        return NextResponse.json(
            { success: false, error: 'विज्ञापन हटाने में विफल' },
            { status: 500 }
        );
    }
}
