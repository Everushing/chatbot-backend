// models/UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  preferences: {
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' }
  }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
