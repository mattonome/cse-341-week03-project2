require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');
const { initDb } = require('./config/database');

const itemsRoutes = require('./routes/items');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Docs Route ✅
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root test route
app.get('/', (req, res) => {
  res.send('Week 03 Project API is running!');
});

// Routes
app.use('/items', itemsRoutes);
app.use('/orders', ordersRoutes);

// Start server AFTER DB connection
const PORT = process.env.PORT || 3000;

initDb((err) => {
  if (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }

  console.log('MongoDB connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
