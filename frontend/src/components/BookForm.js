import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useBook } from '../context/BookContext';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { addBook, loading } = useBook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!title.trim() || !author.trim()) {
      setSubmitError('Please fill in all fields');
      return;
    }

    const result = await addBook(title.trim(), author.trim());

    if (result.success) {
      setTitle('');
      setAuthor('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } else {
      setSubmitError(result.message || 'Failed to add book');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 3,
        background: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            mr: 2,
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
          }}
        >
          <AddIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Add New Book
        </Typography>
      </Box>

      {submitError && (
        <Alert
          severity="error"
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            animation: 'slideIn 0.3s ease',
            '& .MuiAlert-icon': {
              fontSize: 28,
            }
          }}
          onClose={() => setSubmitError('')}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {submitError}
          </Typography>
        </Alert>
      )}

      {submitSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            animation: 'slideIn 0.3s ease',
            '& .MuiAlert-icon': {
              fontSize: 28,
            }
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Book added successfully! 🎉
          </Typography>
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Book Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          disabled={loading}
          sx={{
            mb: 2.5,
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
          label="Author Name"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
          required
          disabled={loading}
          sx={{
            mb: 3,
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
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
          disabled={loading || !title.trim() || !author.trim()}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: '#e2e8f0',
              color: '#94a3b8',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Adding...' : 'Add Book'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BookForm;
