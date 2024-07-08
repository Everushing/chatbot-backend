// server.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options here
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes or other application logic below
// Example: app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
