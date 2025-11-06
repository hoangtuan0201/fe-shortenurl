import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShortenPage from './pages/ShortenPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shorten" element={<ShortenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
