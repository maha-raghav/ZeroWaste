const express = require('express');
const router = express.Router();
const { register, login, getMe, updateLocation, refreshToken, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/location', protect, updateLocation);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth API is working!' });
});

module.exports = router;