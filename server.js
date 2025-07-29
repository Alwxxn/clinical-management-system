// server.js

const express = require('express');
require('dotenv').config();

const app = express();

// Database connection
const connectDB = require('./config/db');

// Middleware imports
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const role = require('./middleware/role');
const errorHandler = require('./middleware/errorHandler');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const receptionistRoutes = require('./routes/receptionistRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const labtechRoutes = require('./routes/labtechRoutes');
const pharmacistRoutes = require('./routes/pharmacistRoutes');

// Connect to MongoDB
connectDB();

// Middleware stack
app.use(express.json());
app.use(logger);

// Public routes — no auth needed
app.use('/api/auth', authRoutes);

// Protected routes — enable auth & role as needed
app.use('/api/receptionist', auth, role('receptionist', 'admin'), receptionistRoutes);
app.use('/api/doctor', auth, role('doctor', 'admin'), doctorRoutes);
app.use('/api/admin', auth, role('admin'), adminRoutes);
//app.use('/api/labtech', auth, role('labtech', 'admin'), labtechRoutes);
//app.use('/api/pharmacist', auth, role('pharmacist', 'admin'), pharmacistRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('Clinical Management System Backend Running!');
});

// Error handling middleware (last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
