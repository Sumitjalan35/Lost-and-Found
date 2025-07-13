# 🎒 Campus Lost & Found Website

A full-stack web application for managing lost and found items on college campuses. Users can report lost items, upload images, and receive email notifications through college email domains.

## 🚀 Features

- **Lost Item Reports**: Upload images and detailed information about lost items
- **Found Item Reports**: Report found items with photos and descriptions
- **Email Notifications**: Two-way email communication through college domains
- **Image Upload**: Firebase Storage integration for item photos
- **Real-time Updates**: Live updates when items are reported or claimed
- **College Email Validation**: Only allows emails from specified college domains
- **Responsive Design**: Modern UI with Tailwind CSS

## 📋 Prerequisites

Before running this application, you need to set up the following:

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable the following services:
   - **Firestore Database** (for storing item data)
   - **Storage** (for image uploads)
   - **Authentication** (optional, for future user accounts)

### 2. Gmail Account Setup
1. Use a Gmail account (recommended: create a dedicated one for this project)
2. Enable 2-step verification on your Google account
3. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Save this password (you'll need it for the .env file)

## 🛠️ Installation & Setup

### Option 1: Quick Setup (Recommended)
Run the interactive setup script:
```bash
node setup-config.js
```
This will guide you through entering all required configuration values.

### Option 2: Manual Setup
1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your configuration values (see Configuration section below)

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Firebase Security Rules

#### Firestore Rules
Go to Firebase Console → Firestore Database → Rules and set:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development - change for production
    }
  }
}
```

#### Storage Rules
Go to Firebase Console → Storage → Rules and set:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // For development - change for production
    }
  }
}
```

### 5. Start the Application

#### Start the Backend Server
```bash
node server.js
```
The server will run on port 3001.

#### Start the Frontend Development Server
```bash
npm run dev
```
The frontend will run on port 5173 (or another available port).

### 6. Open the Application
Open your browser and navigate to the URL shown by Vite (usually `http://localhost:5173`).

## ⚙️ Configuration

You need to provide the following information in your `.env` file:

### Firebase Configuration
- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Your Firebase app ID

### Email Configuration
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password (not your regular password)
- `COLLEGE_DOMAIN`: Your college email domain (e.g., `college.edu`)
- `FRONTEND_URL`: Frontend URL (default: `http://localhost:5173`)

### Server Configuration
- `PORT`: Backend server port (default: `3001`)

## 📁 Project Structure

```
lost-and-found-campus/
├── src/
│   ├── components/          # React components
│   │   ├── FoundItemForm.jsx
│   │   ├── Header.jsx
│   │   ├── ItemList.jsx
│   │   └── LostItemForm.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── ReportFound.jsx
│   │   ├── ReportLost.jsx
│   │   └── ViewItems.jsx
│   ├── firebase/           # Firebase configuration
│   │   └── config.js
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
├── server.js               # Express backend server
├── setup-config.js         # Interactive setup script
├── .env                    # Environment variables
└── package.json            # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build
- `node server.js`: Start the backend server
- `node setup-config.js`: Run the interactive setup

## 📧 Email Features

The application sends email notifications for:
- New lost item reports (to users with matching found items)
- New found item reports (to users who reported similar lost items)
- Item claim notifications

Emails are only sent to addresses matching the configured college domain.

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Deploy `server.js` to a Node.js hosting service (Heroku, Railway, etc.)
2. Update the `FRONTEND_URL` in your environment variables
3. Set up environment variables on your hosting platform

## 🔒 Security Notes

- Change Firebase security rules for production use
- Use environment variables for all sensitive configuration
- Consider implementing user authentication for production
- Regularly update dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check that all environment variables are correctly set
2. Verify Firebase services are enabled
3. Ensure your Gmail app password is correct
4. Check the browser console and server logs for errors