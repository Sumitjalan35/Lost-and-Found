# Deployment Guide

This guide will help you deploy the Campus Lost & Found System to various platforms.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Add all the environment variables from your `.env` file

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Set environment variables** in Netlify dashboard

### Option 3: Heroku (Full Stack)

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set VITE_FIREBASE_API_KEY=your_key
   heroku config:set EMAIL_USER=your_email
   # ... set all other variables
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## 🔧 Backend Deployment

### Railway (Recommended)

1. **Connect your GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on push

### Render

1. **Create a new Web Service** in Render
2. **Connect your GitHub repository**
3. **Set build command**: `npm install && npm run build`
4. **Set start command**: `node server.js`
5. **Set environment variables**

### DigitalOcean App Platform

1. **Create a new app** in DigitalOcean
2. **Connect your GitHub repository**
3. **Set build command**: `npm install && npm run build`
4. **Set run command**: `node server.js`
5. **Set environment variables**

## 📋 Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
COLLEGE_DOMAIN=your_college.edu
FRONTEND_URL=https://your-domain.com

# Server Configuration
PORT=3001
NODE_ENV=production
```

## 🔒 Security Considerations

### Firebase Security Rules

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lostItems/{document} {
      allow read: if true;
      allow write: if request.auth != null || request.time < timestamp.date(2025, 1, 1);
    }
    match /foundItems/{document} {
      allow read: if true;
      allow write: if request.auth != null || request.time < timestamp.date(2025, 1, 1);
    }
  }
}
```

Update your Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null || request.time < timestamp.date(2025, 1, 1);
    }
  }
}
```

### Email Security

1. **Use App Passwords**: Never use your main Gmail password
2. **Enable 2FA**: Always enable two-factor authentication
3. **Restrict Access**: Consider using a dedicated email account for the application

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Purchase a domain** (e.g., from Namecheap, GoDaddy, etc.)
2. **Configure DNS**:
   - Add CNAME record pointing to your hosting platform
   - Add A record if required by your hosting platform

3. **SSL Certificate**: Most platforms provide automatic SSL certificates

### Subdomain Setup

For a subdomain like `lostandfound.college.edu`:

1. **Add CNAME record** in your college's DNS:
   ```
   lostandfound CNAME your-app.vercel.app
   ```

2. **Configure in hosting platform**:
   - Add custom domain in your hosting platform
   - Verify domain ownership

## 📊 Monitoring and Analytics

### Error Tracking

Consider adding error tracking services:

1. **Sentry**:
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **LogRocket**:
   ```bash
   npm install logrocket
   ```

### Analytics

Add analytics to track usage:

1. **Google Analytics**:
   ```bash
   npm install react-ga
   ```

2. **Mixpanel**:
   ```bash
   npm install mixpanel-browser
   ```

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all variables are set correctly
   - Check for typos in variable names
   - Verify Firebase configuration

3. **Email Notifications**:
   - Verify Gmail app password is correct
   - Check email sending limits
   - Test email configuration locally

4. **Image Upload Issues**:
   - Verify Firebase Storage rules
   - Check file size limits
   - Ensure proper CORS configuration

### Support

If you encounter issues:

1. Check the browser console for errors
2. Review server logs
3. Verify all environment variables are set
4. Test locally before deploying
5. Check hosting platform documentation

## 📈 Performance Optimization

### Frontend Optimization

1. **Code Splitting**:
   ```javascript
   const ReportLost = lazy(() => import('./pages/ReportLost'));
   ```

2. **Image Optimization**:
   - Use WebP format
   - Implement lazy loading
   - Compress images before upload

3. **Bundle Analysis**:
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   ```

### Backend Optimization

1. **Caching**:
   - Implement Redis for session storage
   - Cache frequently accessed data

2. **Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   ```

3. **Compression**:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ``` 