import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import { shortenUrl } from '../services/api';

const ShortenPage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch (err) {
      setError('Invalid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await shortenUrl(url);
      setShortUrl(response.shortLink);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while shortening the URL');
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ 
        minHeight: '80vh',              // full screen height
        display: 'flex',                 // use flexbox
        flexDirection: 'column',
        justifyContent: 'center',        // center vertically
        alignItems: 'center',            // center horizontally
        bgcolor: 'background.default',   // optional background
        px: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 2, minWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter URL to shorten"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Shorten'}
          </Button>
        </form>

        {shortUrl && (
          <Box sx={{ mt: 2, bgcolor: 'background.paper', borderRadius: 1,  }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Shortened URL:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={shortUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={copyToClipboard} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShortenPage;