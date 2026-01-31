// swagger.js
// Swagger configuration for Week 03 Project 2 + Week 04 Authentication

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE 341 Week 03 Project 2 API',
      version: '1.0.0',
      description: 'Items and Orders API with Authentication'
    },
    servers: [
      {
        url: 'https://cse-341-week03-project2-j4fd.onrender.com',
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],

    // 🔐 WEEK 04 ADDITION (OAuth / JWT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  // Scan routes for Swagger comments
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
