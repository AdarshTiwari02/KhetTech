import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        return NextResponse.json({
            status: 'error',
            message: 'MONGODB_URI is not defined in environment variables'
        }, { status: 500 });
    }

    try {
        // Attempt connection
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });

        // Check connection state
        const state = mongoose.connection.readyState;
        const stateMap = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        return NextResponse.json({
            status: 'success',
            message: 'MongoDB connection successful',
            readyState: state,
            stateText: stateMap[state as keyof typeof stateMap] || 'unknown',
            uriPrefix: MONGODB_URI.substring(0, MONGODB_URI.indexOf('://') + 3) + '***'
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'MongoDB connection failed',
            error: error.message,
            uriPrefix: MONGODB_URI.substring(0, MONGODB_URI.indexOf('://') + 3) + '***' // Hide credentials but show protocol
        }, { status: 500 });
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
}
