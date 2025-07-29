const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Admin routes
app.use('/api', require('./routes/admin/adminRoutes'));
app.use('/api', require('./routes/admin/doctorRoutes'));
app.use('/api', require('./routes/admin/roleRoutes'));
app.use('/api', require('./routes/admin/specializationRoutes'));
app.use('/api', require('./routes/admin/authRoutes'));

// Receptionist routes
app.use('/api', require('./routes/receptionist/receptionistRoutes'));
app.use('/api', require('./routes/receptionist/appointmentRoutes'));
app.use('/api', require('./routes/receptionist/billingRoutes'));
app.use('/api', require('./routes/receptionist/reportingRoutes'));

// Doctor routes
app.use('/api', require('./routes/doctor/consultationRoutes'));
app.use('/api', require('./routes/doctor/medicinePrescriptionRoutes'));
app.use('/api', require('./routes/doctor/labTestPrescriptionRoutes'));

// Pharmacist routes
app.use('/api', require('./routes/pharmacist/medicineRoutes'));
app.use('/api', require('./routes/pharmacist/medicineInventoryRoutes'));

// Labtech routes
app.use('/api', require('./routes/labtech/labTestResultRoutes'));

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Clinical Management System API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

