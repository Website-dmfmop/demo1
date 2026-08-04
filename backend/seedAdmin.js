require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dmfmop';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ loginId: 'admin' });
    if (adminExists) {
        console.log('Super Admin already exists.');
        mongoose.connection.close();
        return;
    }

    const hashedPassword = await bcrypt.hash('Dmfmop@123', 10);
    const superAdmin = new User({
        loginId: 'admin',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isSystemAccount: true
    });

    await superAdmin.save();
    console.log('Super Admin created successfully. (loginId: admin, password: Dmfmop@123)');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
