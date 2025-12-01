const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Error dari Axios (API eksternal)
  if (err.response) {
    return res.status(err.response.status || 500).json({
      success: false,
      message: err.response.data.message || 'Terjadi kesalahan pada API eksternal',
      error: err.message
    });
  }

  // Error umum
  res.status(500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

module.exports = errorHandler;