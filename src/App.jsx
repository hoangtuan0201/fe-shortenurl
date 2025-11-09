import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShortenPage from "./pages/ShortenPage";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Top navigation */}
        <Header />

        {/* Main route container */}
        <main className="flex-1 flex flex-col items-center justify-start p-6">
          <Routes>
            {/* Home page with URL shortener */}
            <Route path="/" element={<ShortenPage />} />

            {/* Simple admin placeholder */}
            <Route path="/admin" element={<div>Admin Dashboard</div>} />

            {/* Redirect handler for short codes */}
            <Route path="/:code" element={<RedirectPage />} />

            {/* Fallback 404 route */}
            <Route
              path="*"
              element={
                <div className="text-center mt-20 text-gray-600">
                  <h2 className="text-2xl font-semibold mb-2">
                    Page Not Found
                  </h2>
                  <p>
                    The page you’re looking for doesn’t exist.{" "}
                    <a href="/" className="text-blue-600 hover:underline">
                      Go Home
                    </a>
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
