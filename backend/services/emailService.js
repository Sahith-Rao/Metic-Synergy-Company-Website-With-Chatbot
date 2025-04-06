const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
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
    subject: `Your Appointment with Metic Synergy is Confirmed - ${date} at ${time}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e8e8e8; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #2c3e50; margin-bottom: 5px; font-weight: 600;">Metic Synergy</h1>
        </div>
        
        <h2 style="color: #2c3e50; font-weight: 500; border-bottom: 2px solid #f1c40f; padding-bottom: 8px; display: inline-block;">
          Your Appointment is Confirmed
        </h2>
        
        <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
          Dear ${name},<br><br>
          Thank you for choosing Metic Synergy. We're pleased to confirm your appointment as scheduled below.
        </p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f1c40f;">
          <h3 style="color: #2c3e50; margin-top: 0; font-weight: 500;">Appointment Details</h3>
          <table style="width: 100%; color: #34495e; font-size: 15px;">
            <tr>
              <td style="width: 30%; padding: 8px 0; font-weight: 600;">Date:</td>
              <td style="padding: 8px 0;">${date}</td>
            </tr>
            <tr>
              <td style="width: 30%; padding: 8px 0; font-weight: 600;">Time:</td>
              <td style="padding: 8px 0;">${time}</td>
            </tr>
            <tr>
              <td style="width: 30%; padding: 8px 0; font-weight: 600;">Service:</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
          We look forward to serving you!<br><br>
          <strong>The Metic Synergy Team</strong>
        </p>
      </div>
    `,
    text: `
Dear ${name},

Thank you for choosing Metic Synergy. We're pleased to confirm your appointment as scheduled below.

APPOINTMENT DETAILS:
Date: ${date}
Time: ${time}
Service: ${service}

We look forward to serving you!

The Metic Synergy Team
    `
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