const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  async getWeatherByCity(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('API Key OpenWeatherMap tidak ditemukan');
    }

    const cacheKey = `weather_${city}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      console.log('🔵 Data cuaca dari cache');
      return cached;
    }

    const url = `${BASE_URL}/weather`;
    const response = await httpClient.get(url, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'id'
      }
    });

    cache.set(cacheKey, response.data);
    
    console.log('🟢 Data cuaca dari API');
    return response.data;
  }
}

module.exports = new WeatherService();