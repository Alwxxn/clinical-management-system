const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    // Use environment variable or default to local MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/clinical_management_system';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to:', mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('💡 Make sure MongoDB is running or set MONGO_URI environment variable');
    // Don't exit process, let the app continue without DB for testing
    console.log('⚠️  Continuing without database connection...');
  }
};

module.exports = connectDB;
