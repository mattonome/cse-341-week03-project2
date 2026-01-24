// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Week 03 Project 2 API',
      version: '1.0.0',
      description: 'API documentation for Items and Orders',
    },
    servers: [
      {
        url: 'https://cse-341-week03-project2-j4fd.onrender.com',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // where Swagger comments live
};

module.exports = swaggerJsdoc(options);
