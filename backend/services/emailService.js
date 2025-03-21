// services/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variables
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

/**
 * Sends a thank-you email to the user after booking an appointment.
 * @param {string} email - The recipient's email address.
 * @param {string} name - The recipient's name.
 * @param {string} date - The appointment date.
 * @param {string} time - The appointment time.
 * @param {string} service - The service booked.
 * @returns {Promise<void>}
 */
const sendThankYouEmail = async (email, name, date, time, service) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Booking an Appointment',
    text: `Dear ${name},\n\nThank you for booking an appointment with us. We have received your booking details and will get back to you shortly.\n\nAppointment Details:\nDate: ${date}\nTime: ${time}\nService: ${service}\n\nBest regards,\nYour Company Name`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendThankYouEmail };