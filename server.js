// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const itemsRoutes = require('./routes/items');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', itemsRoutes);
app.use('/orders', ordersRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Week 03 Project API is running');
});

// Check environment variables before starting
const PORT = process.env.PORT || 3000;
if (!process.env.MONGODB_URL || !process.env.DB_NAME) {
  console.error('❌ MONGODB_URL or DB_NAME is missing in .env');
  process.exit(1);
}

// Start server only after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server failed to start due to DB connection error:', err);
    process.exit(1);
  });
