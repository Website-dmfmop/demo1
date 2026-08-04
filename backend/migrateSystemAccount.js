require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dmfmop';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const result = await User.updateMany(
      { role: 'SUPER_ADMIN' },
      { $set: { isSystemAccount: true } }
    );

    console.log(`Migration complete. Updated ${result.modifiedCount} accounts.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
