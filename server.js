const express = require('express');
const app = express();
const connectDB = require('./config/db');
const pharmacistRoutes = require('./routes/pharmacistRoutes');

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/pharmacist', pharmacistRoutes);

// Hello World Root (for basic testing)
app.get('/', (req, res) => {
  res.send('Clinical Management System Backend Running!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));