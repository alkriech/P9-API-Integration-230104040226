const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

const BASE_URL = 'https://restcountries.com/v3.1';

class CountriesService {
  async getAllCountries(fields) {
    const cacheKey = `countries_all_${fields || 'default'}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      console.log('🔵 Data dari cache');
      return cached;
    }

    const fieldsParam = fields || 'name,capital,region,population,flags';
    const url = `${BASE_URL}/all?fields=${fieldsParam}`;
    
    const response = await httpClient.get(url);
    cache.set(cacheKey, response.data);
    
    console.log('🟢 Data dari API');
    return response.data;
  }

  async getCountriesByRegion(region, fields) {
    const cacheKey = `countries_region_${region}_${fields || 'default'}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      console.log('🔵 Data dari cache');
      return cached;
    }

    const fieldsParam = fields || 'name,capital,region,population,flags';
    const url = `${BASE_URL}/region/${region}?fields=${fieldsParam}`;
    
    const response = await httpClient.get(url);
    cache.set(cacheKey, response.data);
    
    console.log('🟢 Data dari API');
    return response.data;
  }

  async getCountryByName(name, fields) {
    const cacheKey = `countries_name_${name}_${fields || 'default'}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      console.log('🔵 Data dari cache');
      return cached;
    }

    const fieldsParam = fields || 'name,capital,region,population,flags,languages';
    const url = `${BASE_URL}/name/${name}?fields=${fieldsParam}`;
    
    const response = await httpClient.get(url);
    cache.set(cacheKey, response.data);
    
    console.log('🟢 Data dari API');
    return response.data;
  }
}

module.exports = new CountriesService();