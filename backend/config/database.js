const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connection successful'))
        .catch((err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
};

module.exports = connectDB;
