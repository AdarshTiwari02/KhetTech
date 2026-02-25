# Vercel Deployment Guide - KhetTech

## Prerequisites
- GitHub account with repository: https://github.com/adarsh0119/smartFarmerProject.git
- Vercel account (free tier available)
- MongoDB Atlas account (for production database)

## Step 1: Prepare Your Repository

✅ Already done! Your code is pushed to GitHub.

## Step 2: Sign Up / Login to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

## Step 3: Import Your Project

1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Find and select: `adarsh0119/smartFarmerProject`
4. Click "Import"

## Step 4: Configure Project Settings

### Framework Preset
- Vercel will auto-detect: **Next.js**
- Keep default settings

### Root Directory
- Leave as: `./` (root)

### Build Command
- Default: `npm run build` ✅

### Output Directory
- Default: `.next` ✅

### Install Command
- Default: `npm install` ✅

## Step 5: Environment Variables

Click "Environment Variables" and add these:

### Required Variables:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/smart-farmer?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

WEATHER_API_KEY=750027b9e882357eb383a8c4f892a058

NEXT_PUBLIC_WEATHER_API_KEY=750027b9e882357eb383a8c4f892a058

NODE_ENV=production

NEXTAUTH_URL=https://your-app-name.vercel.app

NEXTAUTH_SECRET=your-nextauth-secret-key-change-this
```

### Optional (Email - if you want OTP):
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@smartfarmer.com
```

## Step 6: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://smart-farmer-project.vercel.app`

## Step 7: Setup MongoDB Atlas (Production Database)

### Create MongoDB Atlas Account:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster (M0 Free tier)
4. Wait 3-5 minutes for cluster creation

### Get Connection String:
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Add this to Vercel environment variables as `MONGODB_URI`

### Whitelist Vercel IPs:
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 8: Redeploy with Environment Variables

1. Go to Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Environment Variables"
4. Add all variables from Step 5
5. Go to "Deployments" tab
6. Click "..." on latest deployment
7. Click "Redeploy"

## Step 9: Test Your Deployment

1. Visit your Vercel URL
2. Test all features:
   - ✅ Homepage loads
   - ✅ Weather API works
   - ✅ Marketplace works
   - ✅ Hindi keyboard works
   - ✅ All pages accessible

## Step 10: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors

### Database Connection Error
- Verify MongoDB connection string
- Check if IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

### API Routes Not Working
- Check environment variables are set
- Verify API routes are in `app/api/` directory
- Check Vercel function logs

### Weather API Not Working
- Verify `WEATHER_API_KEY` is set
- Check if API key is valid
- Ensure `NEXT_PUBLIC_WEATHER_API_KEY` is also set

## Automatic Deployments

✅ Vercel automatically deploys when you push to GitHub!

Every time you:
```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy to production
4. Update your live URL

## Monitoring

### View Logs:
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Deployments"
4. Click on any deployment
5. View "Build Logs" or "Function Logs"

### Analytics:
1. Go to "Analytics" tab
2. View visitor stats, performance metrics

## Cost

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Serverless functions

### Paid Plans:
- Pro: $20/month (more bandwidth, team features)
- Enterprise: Custom pricing

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

## Quick Deploy Button

You can also use this one-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adarsh0119/smartFarmerProject)

---

**Note:** Make sure to set all environment variables before deploying!

Good luck with your deployment! 🚀
