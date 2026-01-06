import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Book as BookIcon,
  AccountCircle,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    logout();
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        backgroundImage: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 2,
              p: 1,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <BookIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Book Management
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <Chip
              icon={<AccountCircle sx={{ color: 'white !important' }} />}
              label={user?.email}
              onClick={() => navigate('/profile')}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                height: { xs: 32, sm: 36 },
                cursor: 'pointer',
                '& .MuiChip-icon': {
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            />
            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
              aria-label="profile"
              sx={{
                display: { xs: 'flex', sm: 'none' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
                p: { xs: 0.75, sm: 1 },
              }}
            >
              <PersonIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogoutClick}
              aria-label="logout"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
                p: { xs: 0.75, sm: 1 },
              }}
            >
              <LogoutIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          pt: { xs: '64px', sm: '70px' },
          minHeight: '100vh',
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 3, sm: 4, md: 5 },
            px: { xs: 2, sm: 3 }
          }}
        >
        <Fade in timeout={600}>
          <Box>
            <BookForm />
            <BookList />
          </Box>
        </Fade>
        </Container>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: { xs: '280px', sm: '350px' },
          },
        }}
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{
            fontWeight: 600,
            pb: 1,
          }}
        >
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="logout-dialog-description"
            sx={{ fontSize: '0.9375rem' }}
          >
            Are you sure you want to logout? You will need to login again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={handleLogoutCancel}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              borderColor: '#6366f1',
              color: '#6366f1',
              '&:hover': {
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            autoFocus
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
              },
            }}
          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
