require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

// Import routes
const countriesRoutes = require('./src/routes/countries.routes');
const weatherRoutes = require('./src/routes/weather.routes');

// Import middleware
const notFoundHandler = require('./src/middleware/notfound.middleware');
const errorHandler = require('./src/middleware/error.middleware');

// Import docs
const swaggerDefinition = require('./src/docs/openapi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API Integration - Praktikum 9 WSE',
    endpoints: {
      countries: '/api/countries',
      weather: '/api/weather',
      documentation: '/docs'
    }
  });
});

app.use('/api/countries', countriesRoutes);
app.use('/api/weather', weatherRoutes);

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 Dokumentasi API: http://localhost:${PORT}/docs`);
});