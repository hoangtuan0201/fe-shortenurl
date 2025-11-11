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
  InputAdornment,
  Container
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import { shortenUrl, buildQrUrlFromShortLink } from '../services/api';

const ShortenPage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
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
    } catch {
      setError('Invalid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await shortenUrl(url);
      setShortUrl(response.shortLink);
      const built = buildQrUrlFromShortLink(response.shortLink);
      setQrUrl(built);
      setQrLoading(!!built);
      setLoading(false);
    } catch {
      setError('An error occurred while shortening the URL');
      setQrUrl('');
      setQrLoading(false);
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
    <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          ShortURL
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Simple & fast URL shortener
        </Typography>
      </Box>
      
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Paste your long URL here"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'grey.50'
              },
              '& input::placeholder': {
                color: 'text.secondary',
                opacity: 1
              }
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            size="large"
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Shorten URL'}
          </Button>
        </form>

        {shortUrl && (
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Shortened URL:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={shortUrl}
                size="small"
                InputProps={{
                  readOnly: true,
                  sx: { borderRadius: 2, fontFamily: 'monospace' }
                }}
              />
              <IconButton 
                onClick={copyToClipboard} 
                color="primary"
                sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: 2 }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>

            {/* QR preview + download */}
            {qrUrl && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  QR Code:
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Box
                    component="img"
                    src={qrUrl}
                    alt="QR Code"
                    loading="eager"
                    onLoad={() => setQrLoading(false)}
                    onError={() => setQrLoading(false)}
                    sx={{
                      width: 200,
                      height: 200,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      backgroundColor: '#fff',
                      p: 1,
                      display: 'block'
                    }}
                  />
                  {qrLoading && (
                    <Box sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                      borderRadius: 2
                    }}>
                      <CircularProgress size={32} />
                    </Box>
                  )}
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Button
                    component="a"
                    href={qrUrl}
                    download={`qr-${shortUrl.split('/').pop()}.png`}
                    startIcon={<DownloadIcon />}
                    disabled={qrLoading}
                    sx={{ textTransform: 'none' }}
                  >
                    Download QR (PNG)
                  </Button>
                </Box>
              </Box>
            )}
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
    </Container>
  );
};

export default ShortenPage;