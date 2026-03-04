# Deployment Guide - Royal Business Machine

This guide provides step-by-step instructions for deploying the Royal Business Machine application to production.

## 📋 Prerequisites

Before deploying, ensure you have:

- [ ] MongoDB Atlas account (or production MongoDB instance)
- [ ] Vercel account (for frontend)
- [ ] Railway/Render account (for backend) or Docker hosting
- [ ] Domain name (optional)
- [ ] Gmail account with app password (for emails)
- [ ] Razorpay account with production keys

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Shared" (free tier) or "Dedicated"
   - Select your preferred region (choose closest to your users)
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and strong password
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for production
   - Or add specific IPs of your hosting platform

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `royal_business`

## 🚀 Backend Deployment

### Option 1: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd backend
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URI="your-mongodb-atlas-connection-string"
   railway variables set JWT_SECRET="your-strong-secret-key"
   railway variables set JWT_REFRESH_SECRET="your-refresh-secret-key"
   railway variables set EMAIL_USER="your-email@gmail.com"
   railway variables set EMAIL_PASSWORD="your-gmail-app-password"
   railway variables set RAZORPAY_KEY_ID="your-razorpay-key-id"
   railway variables set RAZORPAY_KEY_SECRET="your-razorpay-secret"
   railway variables set FRONTEND_URL="https://your-frontend-domain.com"
   railway variables set NODE_ENV="production"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Backend URL**
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. **Create Account**
   - Visit [Render](https://render.com)
   - Sign up and connect your GitHub repository

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Set root directory to `backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Use MongoDB Atlas connection string
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Option 3: Docker (Any Platform)

1. **Build Docker Image**
   ```bash
   cd backend
   docker build -t royal-business-backend .
   ```

2. **Push to Registry**
   ```bash
   docker tag royal-business-backend your-registry/royal-business-backend
   docker push your-registry/royal-business-backend
   ```

3. **Deploy to your platform**
   - Use the pushed image
   - Set environment variables
   - Expose port 5000

## 🎨 Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Frontend Directory**
   ```bash
   cd frontend
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://your-backend.railway.app/api`)
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = Your Razorpay key ID
     - `NEXT_PUBLIC_SITE_NAME` = Royal Business Machine
     - `NEXT_PUBLIC_SITE_URL` = Your Vercel domain

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 📧 Email Configuration (Gmail)

1. **Enable 2-Factor Authentication**
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - Enable it

2. **Generate App Password**
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this as `EMAIL_PASSWORD` in backend environment

## 💳 Razorpay Configuration

1. **Create Razorpay Account**
   - Visit [Razorpay](https://razorpay.com)
   - Complete KYC verification

2. **Get API Keys**
   - Dashboard → Settings → API Keys
   - Generate keys for production mode
   - Copy Key ID and Key Secret

3. **Configure Webhooks** (Optional)
   - Settings → Webhooks
   - Add webhook URL: `https://your-backend-url.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`

## 🌐 Domain Configuration

### For Frontend (Vercel)

1. **Add Custom Domain**
   - Vercel Dashboard → Your Project → Settings → Domains
   - Add your domain (e.g., `royalbusiness.com`)

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers

### For Backend

1. **Add Custom Domain** (Railway/Render)
   - Add domain in platform settings
   - Configure DNS A record or CNAME

2. **Update Frontend Environment**
   - Update `NEXT_PUBLIC_API_URL` to use custom domain
   - Redeploy frontend

## 🔒 SSL/HTTPS

- **Vercel**: Automatic SSL (Let's Encrypt)
- **Railway**: Automatic SSL
- **Render**: Automatic SSL
- **Custom**: Use Cloudflare or Let's Encrypt

## 📊 Monitoring & Logging

### Backend Monitoring

1. **Railway/Render**
   - Built-in logs and metrics
   - Set up log drains if needed

2. **External Services** (Optional)
   - [Sentry](https://sentry.io) for error tracking
   - [LogRocket](https://logrocket.com) for session replay
   - [New Relic](https://newrelic.com) for APM

### Frontend Monitoring

1. **Vercel Analytics**
   - Enable in Vercel Dashboard
   - Automatic performance monitoring

2. **Google Analytics** (Optional)
   - Add GA tracking ID to environment variables
   - Implement in frontend

## 🔐 Security Checklist

- [ ] All environment variables set correctly
- [ ] Strong JWT secrets (minimum 32 characters)
- [ ] MongoDB network access restricted
- [ ] CORS configured for production domain only
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers active
- [ ] HTTPS enabled on all domains
- [ ] Email credentials secured
- [ ] Razorpay production keys (not test keys)

## 🧪 Post-Deployment Testing

1. **Test Authentication**
   - Register new user
   - Verify OTP email received
   - Login successfully

2. **Test Lead Submission**
   - Submit lead from public form
   - Verify email notification
   - Check admin dashboard

3. **Test Payment Flow**
   - Create payment order
   - Complete Razorpay checkout
   - Verify payment in dashboard
   - Check invoice generation

4. **Test Admin Features**
   - Login as admin
   - View dashboard statistics
   - Manage services and portfolio
   - User management

## 🔄 Continuous Deployment

### GitHub Actions (Already Configured)

1. **Set GitHub Secrets**
   - Repository → Settings → Secrets and variables → Actions
   - Add:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`
     - `DOCKER_USERNAME` (if using Docker)
     - `DOCKER_PASSWORD`

2. **Automatic Deployment**
   - Push to `main` branch triggers deployment
   - Tests run automatically
   - Deploys on success

## 📱 Mobile Testing

- Test on real devices (iOS and Android)
- Verify responsive design
- Test payment flow on mobile
- Check email notifications

## 🆘 Troubleshooting

### Backend Won't Start
- Check MongoDB connection string
- Verify all environment variables are set
- Check logs for specific errors

### Frontend Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

### Emails Not Sending
- Verify Gmail app password is correct
- Check 2FA is enabled
- Test with different email provider if needed

### Payment Issues
- Verify Razorpay keys are production keys
- Check webhook configuration
- Test in Razorpay test mode first

## 📞 Support

For issues or questions:
- Check logs in hosting platform
- Review error messages
- Contact hosting support if platform-specific

---

**Congratulations!** Your Royal Business Machine is now deployed to production! 🎉
