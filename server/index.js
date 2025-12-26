import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Verify environment variables are loaded
console.log('Environment variables loaded:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Defined' : 'Undefined');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Defined' : 'Undefined');
console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Defined' : 'Undefined');

const app = express();
app.use(cors());
app.use(express.json());

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
    
    console.log('Received message from:', name);
    console.log('Sender email:', email);
    console.log('Recipient email:', process.env.RECIPIENT_EMAIL);

    // Make sure recipient email is defined
    if (!process.env.RECIPIENT_EMAIL) {
      throw new Error('Recipient email is not defined in environment variables');
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,  // Your email where you want to receive messages
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

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

const server = createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 