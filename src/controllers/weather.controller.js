const weatherService = require('../services/weather.service');

class WeatherController {
  async getWeather(req, res, next) {
    try {
      const { city } = req.query;
      
      if (!city) {
        return res.status(400).json({
          success: false,
          message: 'Parameter city wajib diisi'
        });
      }

      const data = await weatherService.getWeatherByCity(city);
      
      res.status(200).json({
        success: true,
        message: `Data cuaca kota ${city} berhasil diambil`,
        data: {
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          weather: data.weather[0].description,
          wind_speed: data.wind.speed
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WeatherController();