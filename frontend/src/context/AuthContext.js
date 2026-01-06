import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      // Handle validation errors
      if (error.response?.data?.errors && error.response.data.errors.length > 0) {
        return {
          success: false,
          message: error.response.data.errors[0].msg || 'Validation error',
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      // Handle validation errors
      if (error.response?.data?.errors && error.response.data.errors.length > 0) {
        return {
          success: false,
          message: error.response.data.errors[0].msg || 'Validation error',
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch profile',
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    fetchUserProfile,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
