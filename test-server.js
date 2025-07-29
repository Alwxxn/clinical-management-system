const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Clinical Management System API is running!',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI ? 'Configured' : 'Not configured',
    jwtSecret: process.env.JWT_SECRET ? 'Configured' : 'Not configured'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/test`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  
  // Check environment variables
  if (!process.env.MONGO_URI) {
    console.log('⚠️  Warning: MONGO_URI not configured');
  }
  if (!process.env.JWT_SECRET) {
    console.log('⚠️  Warning: JWT_SECRET not configured');
  }
}); 