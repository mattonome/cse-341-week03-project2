// server.js
// Main entry point for the Week 03 Project 2 API

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/database'); // Your MongoDB connection setup

const itemsRoutes = require('./routes/items');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB and start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Stop the app if DB connection fails
  }

  console.log('MongoDB connected!');

  // Routes
  app.use('/items', itemsRoutes);    // CRUD operations for Items
  app.use('/orders', ordersRoutes);  // CRUD operations for Orders

  // Default route for testing
  app.get('/', (req, res) => {
    res.send('Week 03 Project API is running!');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
