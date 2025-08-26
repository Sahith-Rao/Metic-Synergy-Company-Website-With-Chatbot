const nodemailer = require('nodemailer');

async function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendSupportEmail(userData, query, chatHistory) {
  const transporter = await getTransporter();
  const to = process.env.SUPPORT_EMAIL || process.env.EMAIL_USER;

  const historyHtml = (chatHistory || [])
    .map(m => `<p><strong>${m.sender}</strong>: ${m.text}</p>`) 
    .join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Support request from ${userData?.name || 'Unknown'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px">
        <h2>New Chatbot Support Request</h2>
        <h3>User</h3>
        <ul>
          <li>Name: ${userData?.name || 'N/A'}</li>
          <li>Email: ${userData?.email || 'N/A'}</li>
          <li>Phone: ${userData?.phone || 'N/A'}</li>
          <li>Business niche: ${userData?.businessNiche || 'N/A'}</li>
        </ul>
        <h3>Query</h3>
        <p>${query || ''}</p>
        <h3>Chat History</h3>
        <div>${historyHtml}</div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { ok: true, response: info.response };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

module.exports = { sendSupportEmail };


