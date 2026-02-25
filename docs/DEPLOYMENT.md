# Deployment Guide

## Prerequisites

### 1. Server Requirements
- Node.js 18+ and npm/yarn
- MongoDB 5.0+ (or MongoDB Atlas)
- 1GB RAM minimum (2GB recommended)
- 10GB storage

### 2. Domain & SSL
- Domain name (e.g., smartfarmer.com)
- SSL certificate (Let's Encrypt recommended)

## Deployment Options

### Option 1: Vercel (Recommended)

#### Steps:
1. Push code to GitHub/GitLab/Bitbucket
2. Sign up at [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `WEATHER_API_KEY`
   - `TWILIO_*` (optional)
5. Deploy

#### Vercel Configuration:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Option 2: Self-Hosting with PM2

#### Steps:
1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

2. **Application Setup**
```bash
# Clone repository
git clone <your-repo-url>
cd smart-farmer-next

# Install dependencies
npm install --production

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Build application
npm run build
```

3. **PM2 Configuration**
```bash
# Create ecosystem file
pm2 init

# Edit ecosystem.config.js
module.exports = {
  apps: [{
    name: 'smart-farmer',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

4. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

5. **SSL with Let's Encrypt**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Option 3: Docker Deployment

#### Dockerfile:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/smart-farmer
      - NODE_ENV=production
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

## Environment Variables

### Required Variables
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Optional Variables
```env
# Weather API
WEATHER_API_KEY=your_openweathermap_key

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create a new cluster (Free tier available)
3. Create database user
4. Whitelist your IP address
5. Get connection string

### Local MongoDB
```bash
# Start MongoDB
sudo systemctl start mongod

# Create database
mongo
> use smart-farmer
> db.createUser({
    user: "farmer_admin",
    pwd: "secure_password",
    roles: [{ role: "readWrite", db: "smart-farmer" }]
  })
```

## Monitoring & Maintenance

### 1. Logs
```bash
# View logs
pm2 logs smart-farmer

# View specific logs
pm2 logs smart-farmer --lines 100

# Error logs
pm2 logs smart-farmer --err
```

### 2. Performance Monitoring
```bash
# Monitor resources
pm2 monit

# List processes
pm2 list

# Show process info
pm2 show smart-farmer
```

### 3. Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/smart-farmer" --out=/backup/

# Restore
mongorestore --uri="mongodb://localhost:27017/smart-farmer" /backup/smart-farmer/
```

### 4. Updates
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart
pm2 restart smart-farmer
```

## Security Checklist

- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up firewall (UFW)
- [ ] Regular security updates
- [ ] Database backup schedule
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] XSS protection headers
- [ ] CSRF protection
- [ ] SQL injection prevention

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   pm2 logs smart-farmer
   
   # Check port
   netstat -tulpn | grep :3000
   
   # Check Node.js version
   node --version
   ```

2. **Database connection failed**
   ```bash
   # Test MongoDB connection
   mongo "mongodb://localhost:27017/smart-farmer"
   
   # Check MongoDB status
   sudo systemctl status mongod
   ```

3. **Memory issues**
   ```bash
   # Monitor memory
   free -h
   
   # Increase swap
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

## Scaling

### Horizontal Scaling
1. Load balancer (Nginx/Haproxy)
2. Multiple application instances
3. Session storage (Redis)
4. Database replication

### Vertical Scaling
1. Increase server RAM
2. Upgrade CPU
3. SSD storage
4. Database optimization

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connection
4. Check server resources
5. Review firewall settings

Contact: support@smartfarmer.com