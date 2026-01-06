import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
        overflow: 'auto',
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '400px' },
          my: 'auto',
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: '100%',
            borderRadius: { xs: 2, sm: 3 },
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Box
              sx={{
                display: 'inline-flex',
                p: 1.5,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                mb: 1.5,
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
              }}
            >
              <LoginIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 700, 
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                mb: 0.5,
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              Sign in to manage your book collection
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
              size="small"
              sx={{
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6366f1',
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
              size="small"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6366f1',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              disabled={loading}
              sx={{
                mt: 1,
                mb: 1.5,
                py: 1,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1.5 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.8125rem' }}
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: '#6366f1',
                  fontWeight: 600,
                }}
              >
                Create one here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
