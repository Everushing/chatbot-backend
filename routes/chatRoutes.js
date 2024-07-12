const express = require('express');
const router = express.Router();
const axios = require('axios');
const ChatMessage = require('../models/ChatMessage');

// Function to call Google Cloud Natural Language API
const callGoogleLanguageAPI = async (message) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your Google API Key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    // Make POST request to Google Cloud Natural Language API
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: message }] }]
    });

    return response.data; // Return the response from API
  } catch (error) {
    console.error('Error calling Google Cloud Natural Language API:', error);
    throw error; // Throw error for handling in route function
  }
};

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Call Google Cloud Natural Language API to generate response
    const googleResponse = await callGoogleLanguageAPI(message);

    // Save the user's message and the generated response to the database
    const newMessage = await ChatMessage.create({
      sender: 'user',
      message,
      type: 'text',
    });

    const botResponse = googleResponse.contents[0].parts[0].text; // Extract the response text from API

    // Save the bot's response to the database
    const botMessage = await ChatMessage.create({
      sender: 'bot',
      message: botResponse,
      type: 'text',
    });

    // Respond with the created chat messages
    res.status(201).json({ userMessage: newMessage, botMessage });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Failed to handle chat message' });
  }
});

module.exports = router;
