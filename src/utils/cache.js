const NodeCache = require('node-cache');

// Cache dengan TTL 10 menit (600 detik)
const cache = new NodeCache({ 
  stdTTL: 600,
  checkperiod: 120 
});

module.exports = cache;