const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

// Get all books - Protected route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
});

// Add a new book - Protected route
router.post(
  '/',
  authMiddleware,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    body('author')
      .trim()
      .notEmpty()
      .withMessage('Author is required')
      .isLength({ max: 100 })
      .withMessage('Author name cannot exceed 100 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, author } = req.body;

      const newBook = new Book({
        user: req.user._id,
        title,
        author,
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ message: 'Server error while adding book' });
    }
  }
);

module.exports = router;
