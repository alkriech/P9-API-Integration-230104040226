const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
    method: req.method
  });
};

module.exports = notFoundHandler;   