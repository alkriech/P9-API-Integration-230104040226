const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries.controller');

// GET /api/countries - Semua negara
router.get('/', countriesController.getAllCountries);

// GET /api/countries/region/:region - Negara berdasarkan region
router.get('/region/:region', countriesController.getCountriesByRegion);

// GET /api/countries/name/:name - Negara berdasarkan nama
router.get('/name/:name', countriesController.getCountryByName);

module.exports = router;