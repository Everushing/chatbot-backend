const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  avatarUrl: { type: String },
  preferences: {
    theme: { type: String, default: 'light', enum: ['light', 'dark'] },
    language: { type: String, default: 'en', enum: ['en', 'fr', 'es'] }
  }
});

// Indexes
userProfileSchema.index({ username: 1 });
userProfileSchema.index({ email: 1 });

// Methods
userProfileSchema.methods.updatePreferences = async function(preferences) {
  this.preferences = preferences;
  await this.save();
};

module.exports = mongoose.model('UserProfile', userProfileSchema);
