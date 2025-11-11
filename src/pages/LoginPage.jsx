import React, { useEffect, useState } from 'react';
import { Container, Box, Paper, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password);
      const token = res?.token || res?.Token || res;
      if (!token) {
        setError('Login response missing token');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', token);
      navigate('/admin');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          Sign In
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access admin features with your account
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            size="large"
            disabled={loading}
            sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, textTransform: 'none', fontSize: '1.1rem' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;