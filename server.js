import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Check for required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'COLLEGE_DOMAIN'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName] || process.env[varName].includes('your_'));

if (missingVars.length > 0) {
  console.error('❌ Missing or invalid environment variables:', missingVars);
  console.error('Please run: node setup-config.js to configure your email settings');
  console.warn('⚠️ Email notifications will be disabled until configuration is complete.');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
}

// Email transporter configuration
const createTransporter = () => {
  if (missingVars.length > 0) {
    console.warn('⚠️ Email transporter not created due to missing configuration');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use app password for Gmail
    }
  });
};

// Function to get college email list (you can customize this based on your needs)
const getCollegeEmailList = () => {
  // For demo purposes, you can:
  // 1. Use a mailing list service
  // 2. Store emails in a database
  // 3. Use LDAP/Active Directory integration
  // 4. Use Google Workspace API
  
  // Example: Return a list of college domain emails
  const collegeDomain = process.env.COLLEGE_DOMAIN || 'college.edu';
  
  // You can expand this to include actual email addresses
  return [
    `students@${collegeDomain}`,
    `faculty@${collegeDomain}`,
    `staff@${collegeDomain}`,
    // Add more email addresses as needed
  ];
};

// Email templates
const createLostItemEmail = (itemData) => {
  const imageHtml = itemData.imageUrl 
    ? `<img src="${itemData.imageUrl}" alt="Lost Item" style="max-width: 300px; border-radius: 8px; margin: 10px 0;" />`
    : '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🔍 Lost Item Alert</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Campus Lost & Found System</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">${itemData.title}</h2>
        
        ${imageHtml}
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #555; margin-top: 0;">Item Details:</h3>
          <p><strong>Category:</strong> ${itemData.category}</p>
          <p><strong>Description:</strong> ${itemData.description}</p>
          <p><strong>Location Lost:</strong> ${itemData.location}</p>
          <p><strong>Date Lost:</strong> ${itemData.dateLost}</p>
          ${itemData.timeLost ? `<p><strong>Time Lost:</strong> ${itemData.timeLost}</p>` : ''}
          ${itemData.reward ? `<p><strong>Reward:</strong> ${itemData.reward}</p>` : ''}
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #1976d2; margin-top: 0;">Contact Information:</h3>
          <p><strong>Email:</strong> ${itemData.contactEmail}</p>
          ${itemData.contactPhone ? `<p><strong>Phone:</strong> ${itemData.contactPhone}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/view-items" 
             style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View All Items
          </a>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>This email was sent by the Campus Lost & Found System.</p>
          <p>If you found this item, please contact the person directly or reply to this email.</p>
        </div>
      </div>
    </div>
  `;
};

const createFoundItemEmail = (itemData) => {
  const imageHtml = itemData.imageUrl 
    ? `<img src="${itemData.imageUrl}" alt="Found Item" style="max-width: 300px; border-radius: 8px; margin: 10px 0;" />`
    : '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎉 Found Item Alert</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Campus Lost & Found System</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">${itemData.title}</h2>
        
        ${imageHtml}
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #555; margin-top: 0;">Item Details:</h3>
          <p><strong>Category:</strong> ${itemData.category}</p>
          <p><strong>Description:</strong> ${itemData.description}</p>
          <p><strong>Location Found:</strong> ${itemData.location}</p>
          <p><strong>Date Found:</strong> ${itemData.dateFound}</p>
          ${itemData.timeFound ? `<p><strong>Time Found:</strong> ${itemData.timeFound}</p>` : ''}
        </div>
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #2e7d32; margin-top: 0;">Contact Information:</h3>
          <p><strong>Email:</strong> ${itemData.contactEmail}</p>
          ${itemData.contactPhone ? `<p><strong>Phone:</strong> ${itemData.contactPhone}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/view-items" 
             style="background: #2196F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View All Items
          </a>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>This email was sent by the Campus Lost & Found System.</p>
          <p>If this is your item, please contact the finder directly or reply to this email.</p>
        </div>
      </div>
    </div>
  `;
};

// API Routes
app.post('/api/send-email', async (req, res) => {
  try {
    const { itemData, type } = req.body;
    
    if (!itemData || !type) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const transporter = createTransporter();
    
    // If email is not configured, return success but with a warning
    if (!transporter) {
      console.log(`Email notification skipped for ${type} item: ${itemData.title} (email not configured)`);
      return res.json({ 
        success: true, 
        message: 'Item saved successfully. Email notification skipped (email not configured).',
        warning: 'Email notifications are disabled. Run node setup-config.js to configure email settings.'
      });
    }
    
    const emailList = getCollegeEmailList();
    
    // Create email content based on type
    const emailHtml = type === 'lost' 
      ? createLostItemEmail(itemData)
      : createFoundItemEmail(itemData);
    
    const subject = type === 'lost' 
      ? `🔍 Lost Item: ${itemData.title}`
      : `🎉 Found Item: ${itemData.title}`;

    // Send email to all college domain users
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailList.join(', '),
      subject: subject,
      html: emailHtml,
      replyTo: itemData.contactEmail // Allow replies to go directly to the reporter
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`Email notification sent for ${type} item: ${itemData.title}`);
    res.json({ success: true, message: 'Email notification sent successfully' });
    
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email notification' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Lost & Found API is running',
    mode: process.env.NODE_ENV || 'development',
    emailConfigured: missingVars.length === 0
  });
});

// Serve React app for all other routes (only in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email notifications will be sent from: ${process.env.EMAIL_USER}`);
}); 