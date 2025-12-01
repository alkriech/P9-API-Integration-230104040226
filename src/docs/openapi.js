const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Integration - Praktikum 9 WSE',
    version: '1.0.0',
    description: 'Dokumentasi API untuk integrasi REST Countries dan OpenWeatherMap',
    contact: {
      name: '230104040226',
      email: '230104040226@mhs.uin-antasari.ac.id'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development Server'
    }
  ],
  paths: {
    '/api/countries': {
      get: {
        tags: ['Countries'],
        summary: 'Mendapatkan semua negara',
        parameters: [
          {
            name: 'fields',
            in: 'query',
            description: 'Field yang ingin ditampilkan (pisahkan dengan koma)',
            required: false,
            schema: { type: 'string', example: 'name,capital,region' }
          }
        ],
        responses: {
          200: { description: 'Berhasil mendapatkan data negara' },
          500: { description: 'Kesalahan server' }
        }
      }
    },
    '/api/countries/region/{region}': {
      get: {
        tags: ['Countries'],
        summary: 'Mendapatkan negara berdasarkan region',
        parameters: [
          {
            name: 'region',
            in: 'path',
            description: 'Nama region (asia, europe, africa, dll)',
            required: true,
            schema: { type: 'string', example: 'asia' }
          },
          {
            name: 'fields',
            in: 'query',
            description: 'Field yang ingin ditampilkan',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Berhasil mendapatkan data negara' },
          500: { description: 'Kesalahan server' }
        }
      }
    },
    '/api/countries/name/{name}': {
      get: {
        tags: ['Countries'],
        summary: 'Mendapatkan negara berdasarkan nama',
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'Nama negara',
            required: true,
            schema: { type: 'string', example: 'indonesia' }
          },
          {
            name: 'fields',
            in: 'query',
            description: 'Field yang ingin ditampilkan',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Berhasil mendapatkan data negara' },
          404: { description: 'Negara tidak ditemukan' },
          500: { description: 'Kesalahan server' }
        }
      }
    },
    '/api/weather': {
      get: {
        tags: ['Weather'],
        summary: 'Mendapatkan data cuaca berdasarkan kota',
        parameters: [
          {
            name: 'city',
            in: 'query',
            description: 'Nama kota',
            required: true,
            schema: { type: 'string', example: 'Palangkaraya' }
          }
        ],
        responses: {
          200: { description: 'Berhasil mendapatkan data cuaca' },
          400: { description: 'Parameter city wajib diisi' },
          500: { description: 'Kesalahan server' }
        }
      }
    }
  }
};

module.exports = swaggerDefinition;