import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 600,
            letterSpacing: '-0.5px'
          }}
        >
          ShortURL
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            component={Link}
            to="/"
            color="inherit"
            sx={{ 
              minWidth: 'auto',
              px: 2,
              borderRadius: 2,
              bgcolor: location.pathname === '/' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            Home
          </Button>
          {isAuthenticated && (
            <Button 
              component={Link}
              to="/admin"
              color="inherit"
              sx={{ 
                minWidth: 'auto',
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/admin' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              Admin
            </Button>
          )}
          {isAuthenticated ? (
            <Button 
              onClick={handleSignOut}
              color="inherit"
              sx={{ 
                minWidth: 'auto',
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/login' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              component={Link}
              to="/login"
              color="inherit"
              sx={{ 
                minWidth: 'auto',
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/login' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;