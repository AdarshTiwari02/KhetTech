// Shared in-memory OTP store (persists across API calls in same process)
// Format: email -> { otp: string, expiresAt: timestamp }
export const otpStore = new Map<string, { otp: string; expiresAt: number }>();
