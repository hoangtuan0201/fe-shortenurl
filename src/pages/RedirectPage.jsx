// RedirectPage.jsx
import { useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, CircularProgress, Typography, Link } from '@mui/material';

const BASE_REDIRECT = 'https://shortenurl-35ch.onrender.com';

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    if (!code) return;
    const target = `${BASE_REDIRECT}/${code}`;
    // Use replace to avoid keeping the redirect page in history
    window.location.replace(target);
  }, [code]);

  if (!code) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Invalid code</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Please go back to Home.</Typography>
        <Link component={RouterLink} to="/" underline="hover">Go to Home</Link>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography>Redirecting...</Typography>
    </Box>
  );
}
