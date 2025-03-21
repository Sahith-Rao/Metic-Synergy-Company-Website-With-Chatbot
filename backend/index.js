require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendThankYouEmail } = require('./services/emailService'); // Import the email service
const Booking = require('./models/Booking'); // Import the Booking model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://xwebweavex:gwvAwMijwtHRLf4S@metic-synergy.0qsk5.mongodb.net/?retryWrites=true&w=majority&appName=Metic-Synergy';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/bookings', async (req, res) => {
  const { name, phone, email, date, time, company, service } = req.body;

  console.log('Received booking data:', { name, phone, email, date, time, company, service });

  const newBooking = new Booking({
    name,
    phone,
    email,
    date,
    time,
    company,
    service,
  });

  try {
    await newBooking.save();
    console.log('Booking saved successfully:', newBooking);

    // Send thank-you email
    await sendThankYouEmail(email, name, date, time, service);

    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (err) {
    console.error('Failed to save booking:', err);
    res.status(500).json({ message: 'Failed to save booking', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});