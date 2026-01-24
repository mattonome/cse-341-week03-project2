// config/database.js
// Connect to MongoDB using Mongoose

const mongoose = require('mongoose');

const initDb = (callback) => {
  const mongoUrl = process.env.MONGODB_URL; // e.g., mongodb+srv://username:password@cluster0.mongodb.net
  const dbName = process.env.DB_NAME || 'testDB';

  if (!mongoUrl) {
    return callback(new Error('MONGODB_URL not defined in .env'));
  }

  // Connect to MongoDB (options removed for latest Mongoose)
  mongoose.connect(`${mongoUrl}/${dbName}`);

  const connection = mongoose.connection;

  connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    callback(err);
  });

  connection.once('open', () => {
    console.log('MongoDB connected for database:', dbName);
    callback(null);
  });
};

module.exports = { initDb };
