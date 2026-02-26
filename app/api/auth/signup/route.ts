import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';
import { otpStore } from '@/lib/utils/otpStore';


const JWT_SECRET = process.env.JWT_SECRET || 'smartfarmer_super_secret_key_2024_change_in_production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, otp } = body;

    // Validate inputs
    if (!name || !email || !password || !otp) {
      return NextResponse.json(createErrorResponse('All fields are required'), { status: 400 });
    }
    if (name.trim().length === 0) {
      return NextResponse.json(createErrorResponse('Please enter your name'), { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json(createErrorResponse('Please enter a valid email address'), { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(createErrorResponse('Password must be at least 6 characters'), { status: 400 });
    }

    // ✅ Step 1: Verify OTP from in-memory store
    const emailKey = email.toLowerCase();
    const storedOTP = otpStore.get(emailKey);

    console.log('[SIGNUP] OTP check for:', emailKey, '→ stored:', storedOTP?.otp, '| entered:', otp);

    if (!storedOTP) {
      return NextResponse.json(
        createErrorResponse('OTP नहीं मिला। कृपया पहले OTP भेजें।'),
        { status: 400 }
      );
    }
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(emailKey);
      return NextResponse.json(
        createErrorResponse('OTP expire हो गया है। कृपया नया OTP भेजें।'),
        { status: 400 }
      );
    }
    if (storedOTP.otp !== otp) {
      return NextResponse.json(
        createErrorResponse('गलत OTP है। कृपया सही OTP डालें।'),
        { status: 400 }
      );
    }

    // OTP verified ✅ — clear it
    otpStore.delete(emailKey);
    console.log('[SIGNUP] ✅ OTP verified for:', email);

    // ✅ Step 3: Save to MongoDB
    let userId: string;
    let savedName = name;

    try {
      // Connect to MongoDB Atlas
      const { connectToDatabase } = await import('@/lib/db/mongodb');
      const { User } = await import('@/lib/db/models/User');

      await Promise.race([
        connectToDatabase(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('MongoDB timeout')), 15000))
      ]);

      let user = await User.findOne({ email });
      if (user && user.isVerified) {
        return NextResponse.json(
          createErrorResponse('Email already registered. Please login instead.'),
          { status: 400 }
        );
      }

      if (!user) user = new User({ email });
      user.name = name;
      user.password = password;
      user.isVerified = true;
      user.otp = undefined;
      await user.save();
      userId = user._id.toString();
      console.log('[SIGNUP] ✅ User saved to MongoDB:', email);

    } catch (mongoError: any) {
      console.error('[SIGNUP] MongoDB Error:', mongoError?.message);
      return NextResponse.json(
        createErrorResponse('Database connection failed. Please try again later.'),
        { status: 500 }
      );
    }

    // ✅ Step 4: Generate JWT token
    const token = jwt.sign(
      { userId, email: emailKey },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      createSuccessResponse('Account created successfully! 🎉', {
        token,
        user: {
          id: userId,
          name: savedName,
          email: emailKey,
          isVerified: true
        }
      })
    );

  } catch (error: any) {
    console.error('❌ Signup error:', error?.message || error);
    return NextResponse.json(
      createErrorResponse('Account बनाने में समस्या: ' + (error?.message || 'Unknown error')),
      { status: 500 }
    );
  }
}
