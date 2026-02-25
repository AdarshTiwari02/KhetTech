import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';
import { sendOTP } from '@/lib/utils/sms';
import { otpStore } from '@/lib/utils/otpStore';
import { findUserByEmail, verifyLocalPassword } from '@/lib/db/localDb';

const JWT_SECRET = process.env.JWT_SECRET || 'smartfarmer_super_secret_key_2024_change_in_production';

// Helper to try MongoDB with timeout
async function tryMongoUser(email: string) {
  try {
    const { connectToDatabase } = await import('@/lib/db/mongodb');
    const { User } = await import('@/lib/db/models/User');
    await Promise.race([
      connectToDatabase(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);
    return await User.findOne({ email });
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, action, password } = body;

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        createErrorResponse('कृपया एक वैध ईमेल पता दर्ज करें'),
        { status: 400 }
      );
    }

    // ── STEP 1: Send OTP / start login ──────────────────────
    if (action === 'send-otp') {
      // Check local users first (fast, no network)
      const localUser = findUserByEmail(email);

      if (!localUser) {
        // Try MongoDB
        const mongoUser = await tryMongoUser(email);
        if (!mongoUser || !mongoUser.isVerified) {
          return NextResponse.json(
            createErrorResponse('यह ईमेल रजिस्टर नहीं है। पहले साइन अप करें।'),
            { status: 404 }
          );
        }
      }

      // Generate OTP and store in memory
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000;
      otpStore.set(email.toLowerCase(), { otp: generatedOtp, expiresAt });

      await sendOTP(email, generatedOtp);

      return NextResponse.json(
        createSuccessResponse('OTP आपके ईमेल पर भेज दिया गया है', { expiresIn: '10 minutes' })
      );
    }

    // ── STEP 2: Login with password (if app uses password login) ──
    if (action === 'login' || (!action && password)) {
      // Check local users first
      const localUser = await verifyLocalPassword(email, password);
      if (localUser) {
        const token = jwt.sign({ userId: localUser.id, email: localUser.email }, JWT_SECRET, { expiresIn: '7d' });
        return NextResponse.json(
          createSuccessResponse('लॉगिन सफल', {
            token,
            user: { id: localUser.id, name: localUser.name, email: localUser.email, isVerified: localUser.isVerified }
          })
        );
      }

      // Try MongoDB
      const mongoUser = await tryMongoUser(email);
      if (!mongoUser) {
        return NextResponse.json(createErrorResponse('ईमेल या पासवर्ड गलत है'), { status: 401 });
      }
      const isPasswordValid = await mongoUser.comparePassword(password);
      if (!isPasswordValid) {
        return NextResponse.json(createErrorResponse('ईमेल या पासवर्ड गलत है'), { status: 401 });
      }
      const token = jwt.sign({ userId: mongoUser._id, email: mongoUser.email }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json(
        createSuccessResponse('लॉगिन सफल', {
          token,
          user: { id: mongoUser._id, name: mongoUser.name, email: mongoUser.email, isVerified: mongoUser.isVerified }
        })
      );
    }

    // ── STEP 3: Verify OTP for login ────────────────────────
    if (action === 'verify-otp') {
      if (!otp || otp.length !== 6) {
        return NextResponse.json(createErrorResponse('कृपया 6 अंकों का OTP दर्ज करें'), { status: 400 });
      }

      const emailKey = email.toLowerCase();
      const storedOTP = otpStore.get(emailKey);

      if (!storedOTP || Date.now() > storedOTP.expiresAt) {
        otpStore.delete(emailKey);
        return NextResponse.json(createErrorResponse('OTP expire हो गया है'), { status: 400 });
      }
      if (storedOTP.otp !== otp) {
        return NextResponse.json(createErrorResponse('OTP गलत है'), { status: 400 });
      }

      otpStore.delete(emailKey);

      // Find user (local or mongo)
      const localUser = findUserByEmail(email);
      if (localUser) {
        const token = jwt.sign({ userId: localUser.id, email: localUser.email }, JWT_SECRET, { expiresIn: '7d' });
        return NextResponse.json(
          createSuccessResponse('लॉगिन सफल', {
            token,
            user: { id: localUser.id, name: localUser.name, email: localUser.email, isVerified: true }
          })
        );
      }

      const mongoUser = await tryMongoUser(email);
      if (!mongoUser) {
        return NextResponse.json(createErrorResponse('उपयोगकर्ता नहीं मिला'), { status: 404 });
      }
      const token = jwt.sign({ userId: mongoUser._id, email: mongoUser.email }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json(
        createSuccessResponse('लॉगिन सफल', {
          token,
          user: { id: mongoUser._id, name: mongoUser.name, email: mongoUser.email, isVerified: mongoUser.isVerified }
        })
      );
    }

    return NextResponse.json(createErrorResponse('अमान्य अनुरोध'), { status: 400 });

  } catch (error: any) {
    console.error('Login error:', error?.message || error);
    return NextResponse.json(
      createErrorResponse('सर्वर त्रुटि। कृपया पुनः प्रयास करें।'),
      { status: 500 }
    );
  }
}
