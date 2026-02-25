# Vercel Environment Variables

Copy and paste these in Vercel Dashboard → Settings → Environment Variables

---

## 🔴 REQUIRED VARIABLES (Must Add)

### 1. Database Configuration
```
Name: MONGODB_URI
Value: mongodb+srv://khettechofficial_db_user:QlylldeOf23FLdBA@cluster0.mbpohro.mongodb.net/khettech?retryWrites=true&w=majority
```
**Note:** For production, use MongoDB Atlas (free tier available at https://www.mongodb.com/cloud/atlas)
- Replace `your-username` with your MongoDB username
- Replace `your-password` with your MongoDB password
- Replace `cluster` with your cluster name

---

### 2. JWT Secret
```
Name: JWT_SECRET
Value: smartfarmer_super_secret_key_2024_change_in_production
```
**Note:** Change this to a random secure string for production

---

### 3. Weather API Key
```
Name: WEATHER_API_KEY
Value: 750027b9e882357eb383a8c4f892a058
```

---

### 4. Weather API Key (Public)
```
Name: NEXT_PUBLIC_WEATHER_API_KEY
Value: 750027b9e882357eb383a8c4f892a058
```

---

### 5. Node Environment
```
Name: NODE_ENV
Value: production
```

---

### 6. NextAuth URL
```
Name: NEXTAUTH_URL
Value: https://your-app-name.vercel.app
```
**Note:** Replace `your-app-name` with your actual Vercel app URL after deployment

---

### 7. NextAuth Secret
```
Name: NEXTAUTH_SECRET
Value: smartfarmer_nextauth_secret_2024_change_this
```
**Note:** Change this to a random secure string for production

---

## 🟡 OPTIONAL VARIABLES (Email/OTP Features)

### 8. Email Host
```
Name: EMAIL_HOST
Value: smtp.gmail.com
```

---

### 9. Email Port
```
Name: EMAIL_PORT
Value: 587
```

---

### 10. Email User
```
Name: EMAIL_USER
Value: khettechofficial@gmail.com
```
**Note:** Replace with your Gmail address

---

### 11. Email Password (App Password)
```
Name: EMAIL_PASS
Value: ovsyraxmkmdcwdqk
```
**Note:** This is Gmail App Password. Generate new one at: https://myaccount.google.com/apppasswords

---

### 12. Email From
```
Name: EMAIL_FROM
Value: KhetTech <khettechofficial@gmail.com>
```

---

## 📋 Quick Copy-Paste Format

For easy copy-paste in Vercel:

```
MONGODB_URI=mongodb+srv://khettechofficial_db_user:QlylldeOf23FLdBA@cluster0.mbpohro.mongodb.net/khettech?retryWrites=true&w=majority
JWT_SECRET=smartfarmer_super_secret_key_2024_change_in_production
WEATHER_API_KEY=750027b9e882357eb383a8c4f892a058
NEXT_PUBLIC_WEATHER_API_KEY=750027b9e882357eb383a8c4f892a058
NODE_ENV=production
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=smartfarmer_nextauth_secret_2024_change_this
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=khettechofficial@gmail.com
EMAIL_PASS=ovsyraxmkmdcwdqk
EMAIL_FROM=KhetTech <khettechofficial@gmail.com>
```

---

## 🔒 Security Notes

1. **Change JWT_SECRET** to a random 32+ character string
2. **Change NEXTAUTH_SECRET** to a random 32+ character string
3. **Use MongoDB Atlas** for production (not localhost)
4. **Generate new Gmail App Password** if needed
5. **Never commit** these values to GitHub

---

## 🎯 How to Add in Vercel

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - Enter **Name** (e.g., `MONGODB_URI`)
   - Enter **Value** (e.g., your MongoDB connection string)
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**
4. After adding all variables, go to **Deployments**
5. Click **Redeploy** to apply changes

---

## ✅ Verification

After deployment, check:
- [ ] Homepage loads
- [ ] Weather API works
- [ ] Login/Signup works (if using email)
- [ ] Database connection works
- [ ] All features functional

---

**Need help?** Check DEPLOYMENT_GUIDE.md for detailed instructions!
