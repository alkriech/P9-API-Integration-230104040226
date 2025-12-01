const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

// GET /api/weather?city=NamaKota
router.get('/', weatherController.getWeather);

module.exports = router;