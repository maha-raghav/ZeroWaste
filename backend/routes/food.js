const express = require('express');
const router = express.Router();
const {
  createFoodPost,
  getFoodPosts,
  getFoodPost,
  updateFoodPost,
  deleteFoodPost,
  reserveFoodPost,
  getDirections
} = require('../controllers/foodController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getFoodPosts);
router.get('/:id', getFoodPost);

// Protected routes
router.use(protect);

router.post('/', authorize('donor', 'admin'), createFoodPost);
router.put('/:id', authorize('donor', 'admin'), updateFoodPost);
router.delete('/:id', authorize('donor', 'admin'), deleteFoodPost);
router.post('/:id/reserve', authorize('receiver', 'volunteer', 'admin'), reserveFoodPost);
router.get('/directions/directions', getDirections);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Food API is working!' });
});

module.exports = router;