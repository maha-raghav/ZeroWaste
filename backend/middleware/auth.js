const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        // Optionally allow a demo fallback if configured for development convenience
        if (process.env.ALLOW_DEMO_USER === 'true' && process.env.NODE_ENV !== 'production') {
          req.user = {
            _id: '657f7a8b9c8d4e001f8e7a1b',
            name: 'Demo User',
            email: 'demo@zerowaste.com',
            role: 'donor'
          };
          return next();
        }
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      // If token invalid, allow demo fallback in non-production when explicitly enabled
      if (process.env.ALLOW_DEMO_USER === 'true' && process.env.NODE_ENV !== 'production') {
        req.user = {
          _id: '657f7a8b9c8d4e001f8e7a1b',
          name: 'Demo User',
          email: 'demo@zerowaste.com',
          role: 'donor'
        };
        return next();
      }
      console.error('Auth middleware token error:', error.message || error);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    next();
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    next();
  };
};

module.exports = { protect, authorize };