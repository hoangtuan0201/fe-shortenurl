import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenPage from './pages/ShortenPage';
import RedirectPage from './pages/RedirectPage';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
function App() {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = useMemo(() => createTheme({
    palette: { mode },
  }), [mode]);

  const handleToggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header mode={mode} onToggleTheme={handleToggleTheme} />
        <Routes>
          <Route path="/" element={<ShortenPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:code" element={<RedirectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
