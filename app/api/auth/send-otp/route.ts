import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/lib/utils/sms';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';
import { otpStore } from '@/lib/utils/otpStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log('[OTP] Request received for email:', email);

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        createErrorResponse('Please enter a valid email address'),
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP in shared memory store
    otpStore.set(email.toLowerCase(), { otp, expiresAt });
    console.log('[OTP] ✅ Generated and stored OTP:', otp, 'for', email);

    // Send OTP via Email
    await sendOTP(email, otp);

    return NextResponse.json(
      createSuccessResponse('OTP आपके ईमेल पर भेज दिया गया है', {
        expiresIn: '10 minutes'
      })
    );
  } catch (error: any) {
    console.error('❌ Send OTP error:', error?.message || error);
    return NextResponse.json(
      createErrorResponse('OTP भेजने में समस्या: ' + (error?.message || 'Unknown error')),
      { status: 500 }
    );
  }
}