/**
 * Global Error Handling Middleware
 * Provides centralized error handling for the application
 */

const ApiResponse = require('../utils/apiResponse');
const { logHelper } = require('../utils/logger');

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logHelper.error('Unhandled Error', err, {
    url: req.url,
    method: req.method,
    userId: req.user?.userId || 'anonymous',
    ip: req.ip || req.connection.remoteAddress
  });

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    return ApiResponse.validationError(res, errors);
  }

  if (err.name === 'CastError') {
    // Mongoose cast error (invalid ObjectId, etc.)
    return ApiResponse.error(res, 'Invalid ID format', 400);
  }

  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    // MongoDB errors
    if (err.code === 11000) {
      // Duplicate key error
      const field = Object.keys(err.keyPattern)[0];
      return ApiResponse.error(res, `${field} already exists`, 409);
    }
    return ApiResponse.serverError(res, 'Database error', err);
  }

  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Token expired');
  }

  if (err.name === 'SyntaxError' && err.status === 400) {
    return ApiResponse.error(res, 'Invalid JSON format', 400);
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  return ApiResponse.error(res, message, statusCode, 
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};

/**
 * 404 handler for undefined routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFoundHandler = (req, res) => {
  logHelper.warn('Route not found', {
    url: req.url,
    method: req.method,
    ip: req.ip || req.connection.remoteAddress
  });
  
  return ApiResponse.notFound(res, `Route ${req.method} ${req.url} not found`);
};

/**
 * Async error wrapper
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
}; 