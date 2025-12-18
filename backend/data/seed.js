const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const FoodPost = require('../models/FoodPost');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zerowaste';

const users = [
  { name: 'Alice Donor', email: 'alice@donor.com', password: 'password1', role: 'donor', userType: 'restaurant', phone: '+15551230001' },
  { name: 'Bob Receiver', email: 'bob@receiver.com', password: 'password2', role: 'receiver', userType: 'ngo', phone: '+15551230002' }
];

const foodPosts = [
  {
    title: 'Surplus Sandwiches',
    description: 'Leftover sandwiches from event',
    quantity: 30,
    quantityUnit: 'packets',
    foodType: 'veg',
    perishable: true,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 6),
    pickupDeadline: new Date(Date.now() + 1000 * 60 * 60 * 12),
    location: { lat: 12.9716, lng: 77.5946, address: 'Event Center' }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await FoodPost.deleteMany({});

    // Insert users using save() so pre-save hooks (password hashing) run
    const createdUsers = [];
    for (const u of users) {
      const user = new User(u);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`Inserted ${createdUsers.length} users (with hashed passwords)`);

    // Associate first user as donor for food posts and save posts
    const donor = createdUsers[0];
    const createdPosts = [];
    for (const fp of foodPosts) {
      fp.donor = donor._id;
      const post = new FoodPost(fp);
      await post.save();
      createdPosts.push(post);
    }
    console.log(`Inserted ${createdPosts.length} food posts`);

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
