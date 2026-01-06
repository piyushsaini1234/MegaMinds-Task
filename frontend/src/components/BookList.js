import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';
import { useBook } from '../context/BookContext';

const BookList = () => {
  const { books, loading, error } = useBook();

  if (loading && books.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="300px"
        gap={2}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#6366f1',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Loading your library...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 2, 
          borderRadius: 2,
          '& .MuiAlert-icon': {
            fontSize: 28,
          }
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {error}
        </Typography>
      </Alert>
    );
  }

  if (books.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: 3,
          border: '2px dashed rgba(99, 102, 241, 0.2)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            p: 3,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            mb: 3,
          }}
        >
          <BookIcon sx={{ fontSize: { xs: 50, sm: 60 }, color: '#6366f1' }} />
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: 'text.primary'
          }}
        >
          Your Library is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}>
          Start building your collection by adding your first book above
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            mr: 2,
          }}
        >
          <BookIcon sx={{ color: 'white', fontSize: 24 }} />
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
          Your Library ({books.length})
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0,
                animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
                '@keyframes fadeInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(99, 102, 241, 0.2)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
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
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <BookIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3,
                      }}
                    >
                      {book.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: '#6366f1',
                      fontWeight: 600,
                      mr: 0.5,
                    }}
                  >
                    by
                  </Box>{' '}
                  {book.author}
                </Typography>
                {book.createdAt && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 1.5,
                      pt: 1.5,
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    Added {new Date(book.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
