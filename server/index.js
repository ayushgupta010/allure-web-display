import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Resend } from 'resend';
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
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Defined' : 'Undefined');
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
      resendApiKey: process.env.RESEND_API_KEY ? 'Defined' : 'Undefined',
      recipientEmail: process.env.RECIPIENT_EMAIL ? 'Defined' : 'Undefined',
      frontendOrigin: process.env.FRONTEND_ORIGIN || 'Not set (using defaults)'
    }
  });
});

// Initialize Resend (only if API key is provided)
let resend = null;
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY is not defined. Email sending will fail.');
} else {
  console.log('✅ Resend API key loaded');
  resend = new Resend(process.env.RESEND_API_KEY);
}

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
    if (!resend) {
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'RESEND_API_KEY is not defined in environment variables. Please add it to your Render environment variables.' 
      });
    }
    if (!process.env.RECIPIENT_EMAIL) {
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'RECIPIENT_EMAIL is not defined in environment variables' 
      });
    }

    console.log('Sending email via Resend...');
    console.log('To:', process.env.RECIPIENT_EMAIL);
    console.log('Subject: New Message from', name);

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Using Resend's test domain
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `.trim()
      });
      
      console.log('✅ Email sent successfully!');
      console.log('Email result:', JSON.stringify(emailResult, null, 2));
      
      const emailId = emailResult?.data?.id || emailResult?.id || 'sent';
      
      res.status(200).json({ 
        message: 'Message sent successfully',
        emailId: emailId 
      });
    } catch (emailError) {
      console.error('❌ ERROR SENDING EMAIL:');
      console.error('Error:', emailError);
      console.error('Error details:', JSON.stringify(emailError, null, 2));
      
      let errorDetails = emailError.message || 'Unknown error occurred';
      if (emailError.name === 'MissingAPIKeyError') {
        errorDetails = 'Resend API key is missing or invalid';
      } else if (emailError.message?.includes('Invalid')) {
        errorDetails = 'Invalid email configuration. Check your RESEND_API_KEY and RECIPIENT_EMAIL';
      }
      
      res.status(500).json({ 
        error: 'Failed to send email', 
        details: errorDetails
      });
    }
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