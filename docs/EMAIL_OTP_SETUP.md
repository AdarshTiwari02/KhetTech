qw  # Email OTP Authentication Setup

This project uses **Email OTP** for user verification during signup and **Email + Password** for login.

## Authentication Flow

### Signup Flow
1. User enters: Name, Email, Password, Confirm Password
2. System sends 6-digit OTP to email
3. User enters OTP to verify email
4. Account is created with password
5. User is logged in automatically

### Login Flow
1. User enters: Email + Password
2. System verifies credentials
3. User is logged in

## Development Mode

In development mode (`NODE_ENV=development`):
- **OTP is logged to console** (no email sent)
- Check your terminal/console for the OTP code
- This allows testing without email configuration

## Production Mode

For production, configure email service in `.env.local`:

### Option 1: Gmail (Free - 500 emails/day)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password  # Generate from Google Account settings
EMAIL_FROM=noreply@smartfarmer.com
```

**Setup Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password for "Mail"
4. Use that password in `EMAIL_PASS`

### Option 2: SendGrid (Free - 100 emails/day)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@smartfarmer.com
```

### Option 3: Resend (Free - 100 emails/day)
```env
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASS=your-resend-api-key
EMAIL_FROM=noreply@smartfarmer.com
```

## Testing in Development

1. Start the development server:
```bash
npm run dev
```

2. Go to signup page: `http://localhost:3000/auth/signup`

3. Fill in the form and click "Send OTP"

4. Check your **terminal/console** for output like:
```
========================================
🔐 OTP VERIFICATION CODE
========================================
Email: test@example.com
OTP: 123456
Valid for: 10 minutes
========================================
```

5. Enter the OTP and complete signup

6. For login, use your email and password (no OTP needed)

## Security Features

- Passwords are hashed using bcrypt
- OTP expires after 10 minutes
- JWT tokens for session management (7 days expiry)
- Email verification required during signup
- Rate limiting on API endpoints

## API Endpoints

### POST /api/auth/send-otp
Send OTP to email for signup verification
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/signup
Create account with OTP verification
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "otp": "123456"
}
```

### POST /api/auth/login
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Troubleshooting

### OTP not showing in console
- Make sure `NODE_ENV=development` in `.env.local`
- Check terminal where you ran `npm run dev`
- Look for the boxed OTP output

### Email not sending in production
- Verify email credentials in `.env.local`
- Check if email service is enabled
- Review server logs for errors
- Test with a different email provider

### Login fails after signup
- Make sure you completed OTP verification
- Check if password meets minimum requirements (6 characters)
- Verify MongoDB is running

## Free Email Service Comparison

| Service | Free Tier | Setup Difficulty | Recommended For |
|---------|-----------|------------------|-----------------|
| Gmail | 500/day | Easy | Development & Small Apps |
| SendGrid | 100/day | Medium | Production Apps |
| Resend | 100/day | Easy | Modern Apps |
| Ethereal | Unlimited | Very Easy | Testing Only |

## Notes

- Development mode uses console logging (no email configuration needed)
- Production requires email service configuration
- OTP is valid for 10 minutes
- All free tiers support 10+ OTPs per day easily
- Signup requires OTP verification
- Login uses email + password (no OTP)
