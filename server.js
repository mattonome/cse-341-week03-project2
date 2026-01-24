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

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/items', itemsRoutes);
app.use('/orders', ordersRoutes);

app.get('/', (req, res) => {
  res.send('Week 03 Project API is running!');
});

// Start server AFTER DB connection
const PORT = process.env.PORT || 10000;

initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  console.log('MongoDB connected!');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
