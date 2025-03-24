require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendThankYouEmail } = require('./services/emailService');
const Booking = require('./models/Booking');
const SurveyResponse = require('./models/SurveyResponse');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || '*';


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || FRONTEND_URL === '*' || FRONTEND_URL.split(',').includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});


app.post('/api/survey-responses', async (req, res) => {
  try {
    const { name, email, answers } = req.body;

    if (!name || !email || !answers) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, or answers' 
      });
    }

    const newResponse = new SurveyResponse({
      name,
      email,
      answers
    });

    await newResponse.save();
    
    res.status(201).json({ 
      message: 'Survey response saved successfully',
      responseId: newResponse._id
    });
  } catch (err) {
    console.error('Survey response error:', err);
    res.status(500).json({ 
      message: 'Failed to save survey response',
      error: err.message
    });
  }
});


app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, email, date, time, company, service } = req.body;

    if (!name || !email || !date || !time || !service) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    const newBooking = new Booking({
      name,
      phone: phone || undefined,
      email,
      date,
      time,
      company: company || undefined,
      service,
    });

    await newBooking.save();

    try {
      await sendThankYouEmail(email, name, date, time, service);
      res.status(201).json({ 
        message: 'Booking saved successfully', 
        emailSent: true,
        bookingId: newBooking._id
      });
    } catch (emailErr) {
      console.error('Email error:', emailErr);
      res.status(201).json({ 
        message: 'Booking saved but email failed', 
        emailSent: false,
        bookingId: newBooking._id
      });
    }
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ 
      message: 'Failed to save booking',
      error: err.message 
    });
  }
});


app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;