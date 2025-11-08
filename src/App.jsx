import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenPage from './pages/ShortenPage';
import RedirectPage from './pages/RedirectPage';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
