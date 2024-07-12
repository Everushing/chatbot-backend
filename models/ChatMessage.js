const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['text', 'image'], required: true },
  intent: { type: String }, // Optional field to store the intent or purpose of the message
  language: { type: String }, // Optional field to store language information
  confidence: { type: Number }, // Optional field to store confidence score (if applicable)
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
