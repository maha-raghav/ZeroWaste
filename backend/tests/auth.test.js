const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

// These tests require a running MongoDB and proper env vars (MONGODB_URI, JWT_SECRET)
// They are integration tests; run them locally with a test DB.

describe('Auth endpoints', () => {
  let server;
  beforeAll(async () => {
    // ensure DB connected
    if (mongoose.connection.readyState === 0) {
      const connectDB = require('../config/db');
      await connectDB();
    }
  });

  afterAll(async () => {
    // close mongoose connection
    await mongoose.connection.close();
  });

  test('register -> login -> me flow', async () => {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'testpass123';

    // Register
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email, password });

    expect(regRes.statusCode).toBe(201);
    expect(regRes.body.success).toBe(true);
    expect(regRes.body.token).toBeDefined();
    expect(regRes.body.refreshToken).toBeDefined();

    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.token).toBeDefined();

    const token = loginRes.body.token;

    // Me
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.success).toBe(true);
    expect(meRes.body.user.email).toBe(email);

    // Cleanup: remove the test user
    await User.deleteOne({ email });
  }, 20000);
});
