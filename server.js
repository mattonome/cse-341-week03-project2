// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.DB_NAME || 'w03project2'
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Week 03 Project API',
      version: '1.0.0',
      description: 'CRUD API for Items and Orders',
    },
    servers: [
      { url: 'http://localhost:' + port }
    ],
  },
  apis: ['./routes/*.js'], // Swagger will read JSDoc comments in routes folder
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/items', require('./routes/items'));
app.use('/orders', require('./routes/orders'));

// Start server now
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
