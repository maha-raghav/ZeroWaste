const FoodPost = require('../models/FoodPost');
const User = require('../models/User');

// Create new food post
exports.createFoodPost = async (req, res) => {
  try {
    const {
      title,
      description,
      quantity,
      quantityUnit,
      foodType,
      perishable,
      expiryDate,
      pickupDeadline,
      lat,
      lng,
      address
    } = req.body;

    // Find or create demo donor
    let donor = await User.findOne({ email: 'demo@zerowaste.com' });
    
    if (!donor) {
      donor = await User.create({
        name: 'Demo Donor',
        email: 'demo@zerowaste.com',
        password: 'demo123456',
        role: 'donor',
        userType: 'restaurant'
      });
    }

    const foodPost = await FoodPost.create({
      title,
      description,
      donor: donor._id,
      quantity: quantity || 5,
      quantityUnit: quantityUnit || 'kg',
      foodType: foodType || 'veg',
      perishable: perishable !== false,
      expiryDate: expiryDate ? new Date(expiryDate) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      pickupDeadline: pickupDeadline ? new Date(pickupDeadline) : new Date(Date.now() + 12 * 60 * 60 * 1000),
      location: {
        lat: lat || 12.9716,
        lng: lng || 77.5946,
        address: address || 'Bangalore, India'
      }
    });

    res.status(201).json({
      success: true,
      data: foodPost
    });
  } catch (error) {
    console.error('Create food post error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Get all food posts
exports.getFoodPosts = async (req, res) => {
  try {
    const foodPosts = await FoodPost.find()
      .populate('donor', 'name userType')
      .sort({ createdAt: -1 })
      .limit(20);

    // If no posts, create some demo posts
    if (foodPosts.length === 0) {
      const demoPosts = [
        {
          title: 'Fresh Vegetable Curry',
          description: 'Freshly cooked vegetable curry from restaurant',
          quantity: 10,
          quantityUnit: 'kg',
          foodType: 'veg',
          perishable: true,
          status: 'available'
        },
        {
          title: 'Bread and Pastries',
          description: 'Fresh bread and pastries from bakery',
          quantity: 5,
          quantityUnit: 'packets',
          foodType: 'veg',
          perishable: true,
          status: 'available'
        },
        {
          title: 'Rice Packets',
          description: 'Cooked rice packets',
          quantity: 20,
          quantityUnit: 'plates',
          foodType: 'veg',
          perishable: true,
          status: 'available'
        }
      ];

      for (const post of demoPosts) {
        await FoodPost.create({
          ...post,
          donor: null,
          expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          pickupDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
          location: {
            lat: 12.9716 + (Math.random() - 0.5) * 0.1,
            lng: 77.5946 + (Math.random() - 0.5) * 0.1,
            address: 'Bangalore, India'
          }
        });
      }

      const newFoodPosts = await FoodPost.find()
        .populate('donor', 'name userType')
        .sort({ createdAt: -1 })
        .limit(20);

      return res.json({
        success: true,
        count: newFoodPosts.length,
        data: newFoodPosts
      });
    }

    res.json({
      success: true,
      count: foodPosts.length,
      data: foodPosts
    });
  } catch (error) {
    console.error('Get food posts error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Get single food post
exports.getFoodPost = async (req, res) => {
  try {
    const foodPost = await FoodPost.findById(req.params.id)
      .populate('donor', 'name userType phone');

    if (!foodPost) {
      return res.status(404).json({ 
        success: false,
        message: 'Food post not found' 
      });
    }

    res.json({
      success: true,
      data: foodPost
    });
  } catch (error) {
    console.error('Get food post error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Update food post
exports.updateFoodPost = async (req, res) => {
  try {
    const foodPost = await FoodPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!foodPost) {
      return res.status(404).json({ 
        success: false,
        message: 'Food post not found' 
      });
    }

    res.json({
      success: true,
      data: foodPost
    });
  } catch (error) {
    console.error('Update food post error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Delete food post
exports.deleteFoodPost = async (req, res) => {
  try {
    const foodPost = await FoodPost.findByIdAndDelete(req.params.id);

    if (!foodPost) {
      return res.status(404).json({ 
        success: false,
        message: 'Food post not found' 
      });
    }

    res.json({
      success: true,
      message: 'Food post deleted'
    });
  } catch (error) {
    console.error('Delete food post error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Reserve food post
exports.reserveFoodPost = async (req, res) => {
  try {
    const foodPost = await FoodPost.findById(req.params.id);

    if (!foodPost) {
      return res.status(404).json({ 
        success: false,
        message: 'Food post not found' 
      });
    }

    foodPost.status = 'reserved';
    await foodPost.save();

    res.json({
      success: true,
      data: foodPost
    });
  } catch (error) {
    console.error('Reserve food post error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Get directions
exports.getDirections = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        routes: [{
          overview_polyline: {
            points: "demo_polyline_points"
          }
        }]
      }
    });
  } catch (error) {
    console.error('Get directions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};