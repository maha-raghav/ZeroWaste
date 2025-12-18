const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
    foodPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPost',
        required: true
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    },
    pickupTime: Date,
    estimatedArrival: Date,
    actualPickupTime: Date,
    distance: Number, // in kilometers
    duration: Number, // in minutes
    routePolyline: String,
    feedback: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        images: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);