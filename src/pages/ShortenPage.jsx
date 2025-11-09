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
  Container,
  Stack
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import { shortenUrl } from '../services/api';

const ShortenPage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');          // ← add QR url state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) { setError('Please enter a URL'); return; }

    // Validate URL
    try { new URL(url); } 
    catch { setError('Invalid URL'); return; }

    setLoading(true);
    setError('');
    setShortUrl('');
    setQrUrl('');

    try {
      const response = await shortenUrl(url);
      const link = response.shortLink;                 // e.g. https://be-shortenurl-az8u.onrender.com/abc123
      setShortUrl(link);

      const code = link.split('/').pop();              // abc123
      setQrUrl(`https://be-shortenurl-az8u.onrender.com/qr/${code}`);
    } catch {
      setError('An error occurred while shortening the URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).catch(() => {});
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

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
                backgroundColor: 'grey.50'
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

            <Stack direction="row" spacing={1} alignItems="center">
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
                aria-label="Copy short URL"
              >
                <ContentCopyIcon />
              </IconButton>
            </Stack>

            {/* QR preview + download */}
            {qrUrl && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  QR Code:
                </Typography>
                <Box
                  component="img"
                  src={qrUrl}
                  alt="QR Code"
                  loading="eager"
                  sx={{
                    width: 200,
                    height: 200,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    p: 1,
                  }}
                />
                <Box sx={{ mt: 1 }}>
                  <Button
                    component="a"
                    href={qrUrl}
                    download={`qr-${shortUrl.split('/').pop()}.png`}
                    startIcon={<DownloadIcon />}
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
