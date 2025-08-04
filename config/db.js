const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { logHelper } = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/clinical_management_system';
    
    if (!process.env.MONGO_URI) {
      logHelper.warn('Using default MongoDB URI. Set MONGO_URI in .env for production.');
    }
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
    });
    
    logHelper.info('MongoDB connected successfully', { uri: mongoURI });
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logHelper.error('MongoDB connection error', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      logHelper.warn('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      logHelper.info('MongoDB reconnected');
    });
    
  } catch (err) {
    logHelper.error('MongoDB connection failed', err, {
      message: 'Database connection failed. Please check your MongoDB instance.'
    });
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1); // Exit on connection failure in production
    } else {
      logHelper.warn('Continuing without database connection in development mode');
    }
  }
};

module.exports = connectDB;
