const countriesService = require('../services/countries.service');

class CountriesController {
  async getAllCountries(req, res, next) {
    try {
      const { fields } = req.query;
      const data = await countriesService.getAllCountries(fields);
      
      res.status(200).json({
        success: true,
        message: 'Data negara berhasil diambil',
        count: data.length,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountriesByRegion(req, res, next) {
    try {
      const { region } = req.params;
      const { fields } = req.query;
      
      const data = await countriesService.getCountriesByRegion(region, fields);
      
      res.status(200).json({
        success: true,
        message: `Data negara di region ${region} berhasil diambil`,
        count: data.length,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountryByName(req, res, next) {
    try {
      const { name } = req.params;
      const { fields } = req.query;
      
      const data = await countriesService.getCountryByName(name, fields);
      
      res.status(200).json({
        success: true,
        message: `Data negara ${name} berhasil diambil`,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CountriesController();