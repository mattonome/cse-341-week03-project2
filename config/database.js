// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    const dbName = process.env.DB_NAME;

    if (!url || !dbName) {
      throw new Error('❌ MONGODB_URL or DB_NAME is missing in .env');
    }

    // Connect to MongoDB with the correct database
    await mongoose.connect(url, {
      dbName: dbName, // ⚡ Important: ensures correct DB is used
      // Mongoose 7+ no longer needs useNewUrlParser/useUnifiedTopology
    });

    console.log(`✅ MongoDB connected to database: ${dbName}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

module.exports = connectDB;
