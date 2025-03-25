require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendThankYouEmail } = require('./services/emailService');
const Booking = require('./models/Booking');
const SurveyResponse = require('./models/SurveyResponse');
const Admin = require('./models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. Input validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // 2. Find admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { id: admin._id }, 
      process.env.JWT_SECRET || 'your_fallback_secret_key',
      { expiresIn: '1h' }
    );

    // 5. Send successful response
    res.json({ 
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during authentication' });
  }
});

// Protected admin routes
app.get('/api/admin/stats', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET);
    
    // Get survey stats
    const stats = await SurveyResponse.aggregate([
      // Your aggregation pipeline for stats
    ]);
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointments
app.get('/api/admin/appointments', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const appointments = await Booking.find({
      $or: [
        { 
          date: { 
            $gt: today.toISOString() // Future dates
          } 
        },
        { 
          date: today.toISOString(), // Today's date
          time: { $gte: new Date().toLocaleTimeString('en-US', { hour12: false }) } // Current time or later
        }
      ]
    })
    .sort({ date: 1, time: 1 }) // Sort by date then time
    .lean();
    
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;