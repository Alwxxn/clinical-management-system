const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { logHelper } = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const {
  authLimiter,
  apiLimiter,
  sanitizeInput,
  requestLogger,
  securityHeaders,
  corsOptions,
  requestSizeLimit,
  validateContentType
} = require('./middleware/security');

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(requestSizeLimit);
app.use(validateContentType);

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined', { stream: require('./utils/logger').logger.stream }));
app.use(requestLogger);

// Input sanitization
app.use(sanitizeInput);

// Rate limiting
app.use('/api/login', authLimiter);
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Clinical Management System API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api', require('./routes/admin/adminRoutes'));
app.use('/api', require('./routes/admin/doctorRoutes'));
app.use('/api', require('./routes/admin/roleRoutes'));
app.use('/api', require('./routes/admin/specializationRoutes'));
app.use('/api', require('./routes/admin/authRoutes'));

app.use('/api', require('./routes/receptionist/receptionistRoutes'));
app.use('/api', require('./routes/receptionist/appointmentRoutes'));
app.use('/api', require('./routes/receptionist/billingRoutes'));
app.use('/api', require('./routes/receptionist/reportingRoutes'));

app.use('/api', require('./routes/doctor/consultationRoutes'));
app.use('/api', require('./routes/doctor/medicinePrescriptionRoutes'));
app.use('/api', require('./routes/doctor/labTestPrescriptionRoutes'));

app.use('/api', require('./routes/pharmacist/medicineRoutes'));
app.use('/api', require('./routes/pharmacist/medicineInventoryRoutes'));

app.use('/api', require('./routes/labtech/labTestResultRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Clinical Management System API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health'
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logHelper.info(`Server started successfully`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logHelper.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logHelper.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logHelper.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logHelper.info('Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logHelper.error('Uncaught Exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logHelper.error('Unhandled Rejection', null, { reason, promise });
  process.exit(1);
});

