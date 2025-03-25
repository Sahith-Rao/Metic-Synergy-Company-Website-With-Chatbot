require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = new Admin({
      username: 'admin',
      password: 'yourSecurePassword'
    });
    
    await admin.save();
    console.log('Admin user created');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });