// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const UserProfile = require('./models/UserProfile'); // Import the UserProfile model

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Body parser middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options here
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes for user profiles
// GET all user profiles
app.get('/api/userprofiles', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single user profile by ID
app.get('/api/userprofiles/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);

    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new user profile
app.post('/api/userprofiles', async (req, res) => {
  const { username, name, preferences } = req.body;

  try {
    const newUserProfile = new UserProfile({
      username,
      name,
      preferences,
    });

    await newUserProfile.save();
    res.json(newUserProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update user profile preferences by ID
app.put('/api/userprofiles/:id/preferences', async (req, res) => {
  const { theme, language } = req.body;

  try {
    const userProfile = await UserProfile.findById(req.params.id);

    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    userProfile.preferences = { theme, language };
    await userProfile.save();

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a user profile by ID
app.delete('/api/userprofiles/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);

    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    await userProfile.remove();
    res.json({ msg: 'User profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
