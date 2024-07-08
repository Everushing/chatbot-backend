// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { sender, message, type } = req.body;
    const newMessage = await ChatMessage.create({ sender, message, type });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating chat message:', error);
    res.status(500).json({ error: 'Failed to create chat message' });
  }
});

module.exports = router;
