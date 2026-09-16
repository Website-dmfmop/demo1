require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
