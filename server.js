require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();

// Database connection
const connectDB = require('./config/database');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemsRoutes = require('./routes/items');
const ordersRoutes = require('./routes/orders');

// Swagger
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware
app.use(cors());
app.use(express.json());

// Passport JWT
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);
app.use('/orders', ordersRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default root route
app.get('/', (req, res) => {
  res.send('Week 03 / 04 Project API is running');
});

// Environment variable check
const PORT = process.env.PORT || 3000;
if (!process.env.MONGODB_URL || !process.env.DB_NAME || !process.env.JWT_SECRET) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });
