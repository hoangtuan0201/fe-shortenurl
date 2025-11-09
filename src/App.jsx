import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenPage from './pages/ShortenPage';
import RedirectPage from './pages/RedirectPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/admin" element={<div>Admin Dashboard</div>} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
