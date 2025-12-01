# 🌍 Praktikum 9 - API Integration WSE

**Web Service Engineering - Integrasi API Eksternal dengan Node.js**

---

## 📋 Deskripsi

Aplikasi backend Node.js dengan arsitektur modular yang mengintegrasikan dua API eksternal:
- **REST Countries API** - untuk mendapatkan informasi negara-negara di dunia
- **OpenWeatherMap API** - untuk mendapatkan data cuaca berdasarkan kota

Proyek ini dibangun dengan struktur **routes-controllers-services** yang terorganisir, dilengkapi dengan fitur caching, logging, error handling, dan dokumentasi API interaktif.

---

## ✨ Fitur

- ✅ **Struktur Modular** - Pemisahan routes, controllers, services, middleware, utils, dan docs
- ✅ **Integrasi REST Countries API** - Endpoint untuk semua negara, filter region, dan pencarian nama
- ✅ **Integrasi OpenWeatherMap API** - Endpoint untuk mendapatkan data cuaca real-time
- ✅ **Caching System** - NodeCache untuk mengurangi latensi dan beban API eksternal (TTL 10 menit)
- ✅ **Logging** - Morgan untuk monitoring setiap HTTP request
- ✅ **Error Handling** - Global error handler untuk respons error yang konsisten
- ✅ **Dokumentasi Swagger UI** - Interface interaktif untuk testing dan eksplorasi API

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Node.js | LTS (18.x+) | Runtime JavaScript |
| Express | ^4.18.2 | Web framework untuk routing |
| Axios | ^1.6.0 | HTTP client untuk API eksternal |
| NodeCache | ^5.1.2 | In-memory caching |
| Morgan | ^1.10.0 | HTTP request logger |
| Swagger UI Express | ^5.0.0 | Dokumentasi API interaktif |
| Dotenv | ^16.3.1 | Environment variable management |
| Nodemon | ^3.0.1 | Development auto-reload (dev dependency) |

---

## 📁 Struktur Proyek

```
P9-API-Integration-230104040226/
├── src/
│   ├── controllers/           # Business logic & request handling
│   │   ├── countries.controller.js
│   │   └── weather.controller.js
│   ├── routes/                # Endpoint definitions
│   │   ├── countries.routes.js
│   │   └── weather.routes.js
│   ├── services/              # External API calls
│   │   ├── countries.service.js
│   │   └── weather.service.js
│   ├── middleware/            # Custom middleware
│   │   ├── error.middleware.js
│   │   └── notfound.middleware.js
│   ├── utils/                 # Utilities & helpers
│   │   ├── cache.js
│   │   └── httpClient.js
│   └── docs/                  # API documentation
│       └── openapi.js
├── server.js                  # Entry point aplikasi
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables (JANGAN COMMIT!)
├── .gitignore                 # Git ignore rules
└── README.md                  # Dokumentasi proyek
```

---

## 🚀 Instalasi

### Prasyarat
- Node.js LTS (v18.x atau lebih baru)
- NPM (biasanya sudah terinstall bersama Node.js)
- Git (opsional)
- Internet connection (untuk API eksternal)
- API Key OpenWeatherMap (gratis)

### Langkah Instalasi

1. **Clone atau Download Proyek**
   ```bash
   git clone <repository-url>
   cd P9-API-Integration-230104040226
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   
   Buat file `.env` di root folder:
   ```env
   PORT=3000
   OPENWEATHER_API_KEY=your_api_key_here
   NODE_ENV=development
   ```

4. **Dapatkan API Key OpenWeatherMap**
   - Kunjungi: https://openweathermap.org/api
   - Sign up dan verifikasi email
   - Login dan pergi ke **My API Keys**
   - Copy API key dan paste ke file `.env`

5. **Jalankan Server**
   
   **Mode Production:**
   ```bash
   npm start
   ```
   
   **Mode Development (auto-reload):**
   ```bash
   npm run dev
   ```

6. **Verifikasi Server Berjalan**
   ```
   🚀 Server berjalan di http://localhost:3000
   📚 Dokumentasi API: http://localhost:3000/docs
   ```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. 🏠 Home
**GET** `/`

Menampilkan informasi dasar API dan daftar endpoint.

**Response Example:**
```json
{
  "message": "Selamat datang di API Integration - Praktikum 9 WSE",
  "endpoints": {
    "countries": "/api/countries",
    "weather": "/api/weather",
    "documentation": "/docs"
  }
}
```

---

### 2. 🌍 Countries API

#### 2.1 Mendapatkan Semua Negara
**GET** `/api/countries`

**Query Parameters:**
- `fields` (optional) - Field yang ingin ditampilkan, pisahkan dengan koma
  - Default: `name,capital,region,population,flags`

**Example Request:**
```
GET /api/countries
GET /api/countries?fields=name,capital,population
```

**Response Example:**
```json
{
  "success": true,
  "message": "Data negara berhasil diambil",
  "count": 250,
  "data": [
    {
      "name": {
        "common": "Indonesia",
        "official": "Republic of Indonesia"
      },
      "capital": ["Jakarta"],
      "region": "Asia",
      "population": 273523615,
      "flags": {
        "png": "https://flagcdn.com/w320/id.png",
        "svg": "https://flagcdn.com/id.svg"
      }
    }
    // ... more countries
  ]
}
```

#### 2.2 Mendapatkan Negara Berdasarkan Region
**GET** `/api/countries/region/:region`

**Path Parameters:**
- `region` (required) - Nama region (asia, europe, africa, americas, oceania, antarctic)

**Query Parameters:**
- `fields` (optional) - Field yang ingin ditampilkan

**Example Request:**
```
GET /api/countries/region/asia
GET /api/countries/region/europe?fields=name,capital
```

**Response Example:**
```json
{
  "success": true,
  "message": "Data negara di region asia berhasil diambil",
  "count": 50,
  "data": [
    {
      "name": {
        "common": "Indonesia",
        "official": "Republic of Indonesia"
      },
      "capital": ["Jakarta"],
      "region": "Asia"
    }
    // ... more countries
  ]
}
```

#### 2.3 Mendapatkan Negara Berdasarkan Nama
**GET** `/api/countries/name/:name`

**Path Parameters:**
- `name` (required) - Nama negara (case-insensitive)

**Query Parameters:**
- `fields` (optional) - Field yang ingin ditampilkan

**Example Request:**
```
GET /api/countries/name/indonesia
GET /api/countries/name/malaysia?fields=name,capital,languages
```

**Response Example:**
```json
{
  "success": true,
  "message": "Data negara indonesia berhasil diambil",
  "data": [
    {
      "name": {
        "common": "Indonesia",
        "official": "Republic of Indonesia"
      },
      "capital": ["Jakarta"],
      "region": "Asia",
      "population": 273523615,
      "languages": {
        "ind": "Indonesian"
      }
    }
  ]
}
```

---

### 3. ☁️ Weather API

#### 3.1 Mendapatkan Data Cuaca Berdasarkan Kota
**GET** `/api/weather`

**Query Parameters:**
- `city` (required) - Nama kota

**Example Request:**
```
GET /api/weather?city=Palangkaraya
GET /api/weather?city=Jakarta
GET /api/weather?city=London
```

**Response Example:**
```json
{
  "success": true,
  "message": "Data cuaca kota Palangkaraya berhasil diambil",
  "data": {
    "city": "Palangka Raya",
    "country": "ID",
    "temperature": 28.5,
    "feels_like": 32.1,
    "humidity": 75,
    "weather": "hujan ringan",
    "wind_speed": 3.2
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Parameter city wajib diisi"
}
```

---

### 4. 📚 Documentation
**GET** `/docs`

Membuka Swagger UI untuk dokumentasi interaktif dan testing endpoint.

---

## 🎯 Cara Menggunakan

### Testing dengan Browser

1. **Buka browser** (Chrome, Firefox, Edge)
2. **Akses endpoint** yang diinginkan:
   ```
   http://localhost:3000/api/countries
   http://localhost:3000/api/countries/region/asia
   http://localhost:3000/api/countries/name/indonesia
   http://localhost:3000/api/weather?city=Palangkaraya
   ```

### Testing dengan Postman

1. **Buka Postman**
2. **Buat New Request**
3. **Set Method** (GET)
4. **Masukkan URL** endpoint
5. **Click Send**
6. **Lihat Response** di bagian bawah

### Testing dengan Swagger UI

1. **Buka browser**
2. **Akses:** `http://localhost:3000/docs`
3. **Pilih endpoint** yang ingin ditest
4. **Click "Try it out"**
5. **Isi parameter** jika diperlukan
6. **Click "Execute"**
7. **Lihat response** langsung di browser

### Testing dengan cURL

```bash
# Semua negara
curl http://localhost:3000/api/countries

# Region Asia
curl http://localhost:3000/api/countries/region/asia

# Negara Indonesia
curl http://localhost:3000/api/countries/name/indonesia

# Cuaca Palangkaraya
curl "http://localhost:3000/api/weather?city=Palangkaraya"
```

---

## 💾 Cara Kerja Caching

Sistem caching menggunakan **NodeCache** dengan konfigurasi:
- **TTL (Time To Live)**: 600 detik (10 menit)
- **Check Period**: 120 detik (2 menit)

### Flow Caching:

1. **Request Pertama:**
   - Cek cache → tidak ada data
   - Panggil API eksternal
   - Simpan response ke cache
   - Return data ke client
   - Console log: `🟢 Data dari API`

2. **Request Kedua (dalam 10 menit):**
   - Cek cache → data ditemukan
   - Return data dari cache (lebih cepat!)
   - Console log: `🔵 Data dari cache`

3. **Setelah 10 Menit:**
   - Cache expired/dihapus otomatis
   - Kembali ke flow request pertama

### Keuntungan Caching:
- ⚡ Response lebih cepat (tidak perlu hit API eksternal)
- 💰 Mengurangi biaya API calls
- 🛡️ Mengurangi rate limit dari API eksternal
- 📉 Mengurangi load pada server API eksternal

---

## 📊 Logging

Aplikasi menggunakan **Morgan** dengan format `dev` untuk logging setiap HTTP request.

### Format Log:
```
:method :url :status :response-time ms - :res[content-length]
```

### Contoh Output di Console:
```
GET /api/countries 200 523.456 ms - 125847
GET /api/countries/region/asia 200 45.123 ms - 35678
GET /api/weather?city=Jakarta 200 234.567 ms - 512
```

### Informasi yang Dilog:
- HTTP Method (GET, POST, etc.)
- URL yang diakses
- Status code (200, 404, 500, etc.)
- Response time (dalam milliseconds)
- Content length (ukuran response)

---

## ⚠️ Error Handling

Aplikasi memiliki error handling yang konsisten untuk semua endpoint.

### Format Error Response:

```json
{
  "success": false,
  "message": "Deskripsi error yang user-friendly",
  "error": "Detail error (hanya di development mode)"
}
```

### Tipe Error yang Ditangani:

1. **404 Not Found** - Endpoint tidak ditemukan
   ```json
   {
     "success": false,
     "message": "Route /api/invalid tidak ditemukan",
     "method": "GET"
   }
   ```

2. **400 Bad Request** - Parameter tidak valid
   ```json
   {
     "success": false,
     "message": "Parameter city wajib diisi"
   }
   ```

3. **500 Internal Server Error** - Error dari API eksternal atau server
   ```json
   {
     "success": false,
     "message": "Terjadi kesalahan pada API eksternal",
     "error": "Network Error"
   }
   ```

---

## 🐛 Troubleshooting

### 1. Error: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solusi Windows:**
```bash
# Cari PID yang menggunakan port 3000
netstat -ano | findstr :3000

# Matikan process (ganti 1234 dengan PID yang ditemukan)
taskkill /PID 1234 /F
```

**Solusi Linux/Mac:**
```bash
# Cari PID
lsof -i :3000

# Matikan process
kill -9 PID
```

**Atau gunakan port lain:**
Edit file `.env`:
```env
PORT=3001
```

---

### 2. Error: Cannot Find Module

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solusi:**
```bash
npm install
```

Pastikan semua dependencies terinstall dengan benar.

---

### 3. Error: API Key Not Found

**Error Message:**
```json
{
  "success": false,
  "message": "API Key OpenWeatherMap tidak ditemukan"
}
```

**Solusi:**
1. Pastikan file `.env` ada di root folder
2. Pastikan `OPENWEATHER_API_KEY` terisi dengan benar
3. Tidak ada spasi di sekitar `=`
4. Restart server setelah edit `.env`

**Format yang benar:**
```env
OPENWEATHER_API_KEY=abc123def456ghi789
```

**Format yang salah:**
```env
OPENWEATHER_API_KEY = abc123def456ghi789  ❌ (ada spasi)
OPENWEATHER_API_KEY='abc123def456ghi789' ❌ (ada quotes)
```

---

### 4. Error: httpClient.get is not a function

**Solusi:**
Gunakan `axios` langsung di service files:

```javascript
// Di bagian atas file
const axios = require('axios');

// Ganti httpClient.get() dengan axios.get()
const response = await axios.get(url);
```

---

### 5. Error: Network Error / ENOTFOUND

**Kemungkinan Penyebab:**
- Tidak ada koneksi internet
- API eksternal sedang down
- Firewall/proxy memblokir request

**Solusi:**
1. Cek koneksi internet
2. Test API langsung di browser
3. Cek firewall/antivirus settings
4. Coba lagi beberapa saat kemudian

---

### 6. Cache Tidak Berfungsi

**Cek:**
1. Lihat console log - apakah ada emoji 🔵 (dari cache) atau 🟢 (dari API)?
2. Test dengan request yang sama 2x berturut-turut
3. Perhatikan response time - request kedua harus lebih cepat

**Debug:**
```javascript
// Tambahkan di service file untuk debug
console.log('Cache Key:', cacheKey);
console.log('Cached Data:', cached ? 'ADA' : 'TIDAK ADA');
```

---

## 🔐 Environment Variables

File `.env` berisi konfigurasi sensitive yang **TIDAK BOLEH** di-commit ke Git.

### Template `.env`:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys
OPENWEATHER_API_KEY=your_api_key_here

# Cache Configuration (optional)
CACHE_TTL=600
CACHE_CHECK_PERIOD=120
```

### Security Tips:
- ✅ Tambahkan `.env` ke `.gitignore`
- ✅ Jangan share API key di public
- ✅ Gunakan API key yang berbeda untuk production
- ✅ Rotate API key secara berkala

---

## 📝 Scripts NPM

```bash
# Menjalankan server (production mode)
npm start

# Menjalankan server dengan auto-reload (development mode)
npm run dev

# Install dependencies
npm install

# Update dependencies
npm update
```

---

## 🧪 Testing Checklist

Sebelum submit, pastikan semua checklist ini sudah ✅:

- [ ] Server bisa dijalankan tanpa error (`npm start`)
- [ ] Endpoint `/api/countries` return status 200
- [ ] Endpoint `/api/countries/region/asia` return status 200
- [ ] Endpoint `/api/countries/name/indonesia` return status 200
- [ ] Endpoint `/api/weather?city=Palangkaraya` return status 200
- [ ] Swagger UI bisa diakses di `/docs`
- [ ] Logging morgan tampil di console untuk setiap request
- [ ] Caching berfungsi (console log menunjukkan 🔵 untuk cache hit)
- [ ] Error handling return JSON yang rapi
- [ ] File `.env` tidak ter-commit ke Git
- [ ] README.md lengkap dan informatif

---

## 📚 Referensi

### API Eksternal:
- **REST Countries API**: https://restcountries.com/
- **OpenWeatherMap API**: https://openweathermap.org/api

### Dependencies Documentation:
- **Express**: https://expressjs.com/
- **Axios**: https://axios-http.com/
- **NodeCache**: https://github.com/node-cache/node-cache
- **Morgan**: https://github.com/expressjs/morgan
- **Swagger UI Express**: https://github.com/scottie1984/swagger-ui-express

---

## 👨‍💻 Author

**Nama:** Alya Nur Medina  
**NIM:** 230104040226  
**Kelas:** TI23A  
**Mata Kuliah:** Web Service Engineering  
**Dosen:** Muhayat, M.IT  
**Semester:** 5 (Gasal 2024/2025)

---

## 📄 License

Proyek ini dibuat untuk keperluan akademik - Praktikum 9 Web Service Engineering.

---

## 🙏 Acknowledgments

- Terima kasih kepada **REST Countries API** dan **OpenWeatherMap** untuk menyediakan API gratis
- Terima kasih kepada Pak **Muhayat, M.IT** sebagai dosen pengampu
- Terima kasih kepada komunitas open-source untuk tools dan libraries yang digunakan

---

**© 2025 - Praktikum Web Service Engineering**