import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { generateToken } from '@/lib/middleware/auth';
import { validateEmail, validateOTP } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, otp } = body;

    // Validate inputs
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        createErrorResponse('Please enter a valid email address'),
        { status: 400 }
      );
    }

    if (!otp || !validateOTP(otp)) {
      return NextResponse.json(
        createErrorResponse('Please enter a valid 6-digit OTP'),
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        createErrorResponse('User not found'),
        { status: 404 }
      );
    }

    // Verify OTP
    const isValidOTP = user.verifyOTP(otp);
    if (!isValidOTP) {
      return NextResponse.json(
        createErrorResponse('Invalid or expired OTP'),
        { status: 400 }
      );
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id.toString());

    return NextResponse.json(
      createSuccessResponse('OTP verified successfully', {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          state: user.state,
          isVerified: user.isVerified,
          profile: user.profile
        }
      })
    );
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      createErrorResponse('Failed to verify OTP'),
      { status: 500 }
    );
  }
}