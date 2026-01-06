import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory (ES modules compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory (root of project)
dotenv.config({ path: join(__dirname, '..', '.env') });

// Verify environment variables are loaded
console.log('Environment variables loaded:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Defined' : 'Undefined');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Defined' : 'Undefined');
console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Defined' : 'Undefined');
console.log('FRONTEND_ORIGIN:', process.env.FRONTEND_ORIGIN || 'Not set (using defaults)');

// Allow multiple origins for local development and production
const localOrigins = ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000'];
const allowedOrigins = process.env.FRONTEND_ORIGIN 
  ? [...localOrigins, process.env.FRONTEND_ORIGIN] // Include both local and production origins
  : localOrigins; // Default to local origins only

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.get('origin') || 'none'}`);
  next();
});

// CORS configuration - allow multiple origins for local dev
app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('Request with no origin - allowing');
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}. Allowed origins:`, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    env: {
      emailUser: process.env.EMAIL_USER ? 'Defined' : 'Undefined',
      emailPassword: process.env.EMAIL_PASSWORD ? 'Defined' : 'Undefined',
      recipientEmail: process.env.RECIPIENT_EMAIL ? 'Defined' : 'Undefined',
      frontendOrigin: process.env.FRONTEND_ORIGIN || 'Not set (using defaults)'
    }
  });
});

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or your email service
  auth: {
    user: process.env.EMAIL_USER,     // Your email
    pass: process.env.EMAIL_PASSWORD  // Your email password or app-specific password
  }
});

// POST endpoint to receive messages
app.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        details: 'Name, email, and message are required' 
      });
    }
    
    console.log('Received message from:', name);
    console.log('Sender email:', email);
    console.log('Recipient email:', process.env.RECIPIENT_EMAIL);

    // Validate environment variables
    if (!process.env.EMAIL_USER) {
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'EMAIL_USER is not defined in environment variables' 
      });
    }
    if (!process.env.EMAIL_PASSWORD) {
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'EMAIL_PASSWORD is not defined in environment variables' 
      });
    }
    if (!process.env.RECIPIENT_EMAIL) {
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'RECIPIENT_EMAIL is not defined in environment variables' 
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    console.log('Sending email with options:', JSON.stringify({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    }));

    // Respond immediately to client, then send email in background
    res.status(200).json({ message: 'Message received and will be sent shortly' });

    // Send email asynchronously (don't await - let it run in background)
    transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email (background):', error);
        // Email sending failed, but client already got success response
        // In production, you might want to log this to a service like Sentry
      });
  } catch (error) {
    console.error('Error processing message:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    res.status(500).json({ 
      error: 'Failed to process message', 
      details: errorMessage 
    });
  }
});

const server = createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 