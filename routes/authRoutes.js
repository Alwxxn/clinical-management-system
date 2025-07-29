const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidators');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Signup route
router.post('/signup', signupValidator, handleValidation, authController.signup);

// Login route
router.post('/login', loginValidator, handleValidation, authController.login);

module.exports = router;
