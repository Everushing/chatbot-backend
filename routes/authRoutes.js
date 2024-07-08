// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// POST /api/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, name } = req.body;
    const userProfile = await UserProfile.create({ username, name });
    res.status(201).json(userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

// POST /api/login (placeholder)
router.post('/login', (req, res) => {
  // Implement login logic here (authentication)
  // Respond with a token or session
});

module.exports = router;
