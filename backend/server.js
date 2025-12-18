const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to ZeroWaste API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me'
      },
      food: {
        getAll: 'GET /api/food',
        create: 'POST /api/food',
        getOne: 'GET /api/food/:id'
      }
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ZeroWaste API',
    uptime: process.uptime()
  });
});

// Connect to MongoDB using centralized config
const connectDB = require('./config/db');
connectDB();

// Start server only when this file is run directly (not when required by tests)
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
  });
}

module.exports = app;