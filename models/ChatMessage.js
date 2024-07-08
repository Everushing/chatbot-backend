// models/ChatMessage.js
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['text', 'image'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
