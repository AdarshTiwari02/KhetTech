import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

export async function sendOTP(email: string, otp: string): Promise<boolean> {
  // Always log OTP to console for dev convenience
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║      🔐  OTP VERIFICATION CODE       ║');
  console.log('╠══════════════════════════════════════╣');
  console.log(`║  Email : ${email.padEnd(29)}║`);
  console.log(`║  OTP   : ${otp.padEnd(29)}║`);
  console.log(`║  Valid : 10 minutes                  ║`);
  console.log('╚══════════════════════════════════════╝\n');

  // If email credentials are not set, skip actual sending
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') {
    console.log('[DEV MODE] Email credentials not configured. OTP shown in console above.');
    return true;
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"KhetTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'खेतटेक — OTP सत्यापन कोड',
      html: `
<!DOCTYPE html>
<html lang="hi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0fdf4;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:40px auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(16,185,129,.15);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#059669,#10b981);padding:32px 24px;text-align:center;">
      <div style="width:56px;height:56px;background:rgba(255,255,255,.2);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="font-size:28px;">🌾</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">KhetTech</h1>
      <p style="color:#a7f3d0;margin:6px 0 0;font-size:14px;">खेतटेक</p>
    </div>
    <!-- Body -->
    <div style="background:#fff;padding:40px 32px;">
      <h2 style="color:#111827;margin:0 0 8px;font-size:20px;">आपका OTP कोड</h2>
      <p style="color:#6b7280;margin:0 0 28px;font-size:15px;">नीचे दिया गया कोड रजिस्ट्रेशन पूरा करने के लिए उपयोग करें:</p>

      <!-- OTP Box -->
      <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #10b981;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
        <div style="font-size:42px;font-weight:800;letter-spacing:14px;color:#059669;font-family:'Courier New',monospace;">${otp}</div>
        <p style="color:#065f46;margin:10px 0 0;font-size:13px;font-weight:600;">⏰ 10 मिनट में समाप्त होगा</p>
      </div>

      <div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:6px;padding:14px 16px;margin-bottom:24px;">
        <p style="color:#92400e;margin:0;font-size:13px;">⚠️ यह OTP केवल आपके लिए है। इसे किसी के साथ साझा न करें।</p>
      </div>

      <p style="color:#9ca3af;font-size:13px;margin:0;">अगर आपने यह अनुरोध नहीं किया, तो इस ईमेल को अनदेखा करें।</p>
    </div>
    <!-- Footer -->
    <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">© 2024 KhetTech — किसानों का डिजिटल साथी</p>
    </div>
  </div>
</body>
</html>`,
    });
    console.log(`[EMAIL] OTP sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send OTP:', error);
    console.log(`[FALLBACK] OTP for ${email}: ${otp}`);
    return true; // Don't block signup flow even if email fails
  }
}

export async function sendAlert(email: string, message: string): Promise<boolean> {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') return false;
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"KhetTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'KhetTech Alert',
      html: `<p>${message}</p>`,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function sendMobileOTP(mobile: string, otp: string): Promise<boolean> {
  console.log(`[FREE TIER] OTP for mobile ${mobile}: ${otp}`);
  return true;
}