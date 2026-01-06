import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookContext = createContext();

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch all books
  const fetchBooks = useCallback(async () => {
    if (!token) {
      setBooks([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Add a new book
  const addBook = async (title, author) => {
    if (!token) {
      return { success: false, message: 'Please login again' };
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${API_URL}/books`,
        {
          title,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks((prev) => [response.data, ...prev]);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.errors
        ? err.response.data.errors[0].msg
        : err.response?.data?.message || 'Failed to add book';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, token]);

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
