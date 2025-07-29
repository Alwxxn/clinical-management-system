// config/db.js

const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clinical_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;