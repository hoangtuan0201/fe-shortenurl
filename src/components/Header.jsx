import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;