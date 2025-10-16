# 🐧 Linux Server Deployment Guide

## Overview
This guide explains how to deploy the FHE Mystery Box dApp on a Linux server for production use.

---

## ⚠️ Important Notice

**The current warning you're seeing is because you're running the development server in production.**

```
⚠ Cross origin request detected from 202.61.192.99
```

This is **NOT recommended** for production. Follow the steps below for proper deployment.

---

## 🚀 Production Deployment (Recommended)

### Option 1: Build and Run with Node.js (Recommended for VPS)

#### 1. Install Dependencies on Linux Server

```bash
# Navigate to frontend directory
cd /path/to/fhe-mystery-box/frontend

# Install dependencies
npm install
```

#### 2. Build for Production

```bash
# Create optimized production build
npm run build
```

#### 3. Start Production Server

```bash
# Start the production server
npm start
```

The production server will run on port 3000 by default.

#### 4. Configure Firewall

```bash
# Allow port 3000 (or your chosen port)
sudo ufw allow 3000/tcp
sudo ufw reload
```

#### 5. Use PM2 for Process Management (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app with PM2
cd /path/to/fhe-mystery-box/frontend
pm2 start npm --name "mystery-box-frontend" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 to start on system boot
pm2 startup
```

**PM2 Commands:**
```bash
# View logs
pm2 logs mystery-box-frontend

# Restart app
pm2 restart mystery-box-frontend

# Stop app
pm2 stop mystery-box-frontend

# View status
pm2 status
```

---

### Option 2: Use Nginx as Reverse Proxy (Best Practice)

#### 1. Build the Frontend

```bash
cd /path/to/fhe-mystery-box/frontend
npm install
npm run build
npm start
```

#### 2. Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

#### 3. Configure Nginx

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/mystery-box
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/mystery-box /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 5. Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw reload
```

#### 6. (Optional) Add SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Certbot will automatically configure SSL
# Certificate will auto-renew
```

---

### Option 3: Deploy to Vercel (Easiest)

#### 1. Push Your Code to GitHub (Already Done ✅)

Your repository: https://github.com/Dog-Feng/fhe-mystery-box

#### 2. Deploy to Vercel

1. Visit [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `Dog-Feng/fhe-mystery-box`
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click "Deploy"

#### 3. Advantages of Vercel

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Zero configuration
- ✅ Free tier available

---

## 🔧 Configuration Updates

### Update `next.config.ts` for Your Server

If you need to allow specific IPs or domains:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [
      "202.61.192.99",        // Your current IP
      "your-domain.com",      // Your domain
      // Add more as needed
    ],
  },
};

export default nextConfig;
```

### Environment Variables

Create `.env.local` on your server:

```bash
cd /path/to/fhe-mystery-box/frontend
nano .env.local
```

Add any environment variables:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_CHAIN_ID=11155111
```

---

## 🛠️ Troubleshooting

### Issue: Port Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### Issue: Permission Denied

```bash
# Give execute permissions
chmod +x node_modules/.bin/*

# Or run with sudo (not recommended for production)
sudo npm start
```

### Issue: Out of Memory

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

### Issue: Cannot Access from External IP

```bash
# Make sure the app listens on 0.0.0.0, not localhost
# Check your firewall settings
sudo ufw status

# Allow the port
sudo ufw allow 3000/tcp
```

---

## 📊 Performance Optimization

### 1. Enable Compression in Nginx

Add to your Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. Set Proper Caching Headers

```nginx
location /_next/static {
    alias /path/to/fhe-mystery-box/frontend/.next/static;
    expires 365d;
    access_log off;
}
```

### 3. Monitor Performance

```bash
# Install monitoring tools
npm install -g clinic

# Profile your app
clinic doctor -- node server.js
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Configure firewall (UFW)
- [ ] Use environment variables for sensitive data
- [ ] Run app as non-root user
- [ ] Keep Node.js and npm updated
- [ ] Use PM2 or systemd for process management
- [ ] Set up log rotation
- [ ] Configure rate limiting in Nginx
- [ ] Regular security updates

---

## 📈 Recommended Architecture

```
Internet
    ↓
Nginx (Port 80/443)
    ↓
Next.js App (Port 3000)
    ↓
Ethereum Network (Sepolia)
```

**Benefits:**
- ✅ SSL termination at Nginx
- ✅ Static file serving
- ✅ Load balancing (if needed)
- ✅ DDoS protection
- ✅ Caching

---

## 🔄 Deployment Workflow

### Initial Deployment

```bash
# 1. Clone repository on server
git clone https://github.com/Dog-Feng/fhe-mystery-box.git
cd fhe-mystery-box/frontend

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Start with PM2
pm2 start npm --name "mystery-box" -- start

# 5. Save PM2 config
pm2 save
```

### Update Deployment

```bash
# 1. Pull latest changes
cd /path/to/fhe-mystery-box
git pull origin main

# 2. Install new dependencies (if any)
cd frontend
npm install

# 3. Rebuild
npm run build

# 4. Restart with PM2
pm2 restart mystery-box
```

---

## 🎯 Quick Commands Reference

### Development (NOT for production)

```bash
npm run dev  # Run development server
```

### Production

```bash
npm run build  # Build for production
npm start      # Start production server
```

### With PM2

```bash
pm2 start npm --name "app" -- start  # Start
pm2 logs app                          # View logs
pm2 restart app                       # Restart
pm2 stop app                          # Stop
pm2 delete app                        # Remove
```

---

## ✅ Post-Deployment Checklist

- [ ] Application is accessible from external IP
- [ ] SSL certificate is installed (if using domain)
- [ ] MetaMask connects successfully
- [ ] Contract interactions work
- [ ] Language switching works
- [ ] PM2 is configured and running
- [ ] Nginx reverse proxy is set up
- [ ] Firewall is configured
- [ ] Monitoring is in place
- [ ] Backups are configured

---

## 📞 Need Help?

If you encounter issues:

1. Check logs: `pm2 logs mystery-box`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check application logs in the console
4. Review this guide
5. Check GitHub issues

---

## 🎉 You're All Set!

Your FHE Mystery Box dApp should now be running smoothly on your Linux server!

**Remember**: Always use production build (`npm run build` + `npm start`) instead of development server (`npm run dev`) for public-facing deployments.

