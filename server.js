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

app.get('/', (req, res) => {
  res.send('Week 03 Project API is running');
});

// Start server ONLY after DB connects
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
