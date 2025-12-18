const mongoose = require('mongoose');

const foodPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  quantityUnit: {
    type: String,
    enum: ['kg', 'grams', 'liters', 'plates', 'packets'],
    default: 'kg'
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
    default: 'veg'
  },
  perishable: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  pickupDeadline: {
    type: Date,
    required: true
  },
  location: {
    lat: {
      type: Number,
      default: 12.9716
    },
    lng: {
      type: Number,
      default: 77.5946
    },
    address: {
      type: String,
      default: 'Bangalore, India'
    }
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'picked', 'expired'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodPost', foodPostSchema);