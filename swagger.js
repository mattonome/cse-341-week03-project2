const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CSE 341 Week 03 Project 2 API',
    version: '1.0.0',
    description: 'API documentation for Items and Orders'
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production'
        ? 'https://cse-341-week03-project2-j4fd.onrender.com'
        : 'http://localhost:10000'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] 
};

module.exports = swaggerJSDoc(options);
