const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET is not set in .env file');
  console.warn('⚠️  Please set JWT_SECRET in your .env file for production use');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
