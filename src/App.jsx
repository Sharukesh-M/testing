import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoLoader from "./components/VideoLoader";
import TopMarquee from "./components/TopMarquee";
import { SoundProvider } from "./hooks/useMagicSound"; // Import Provider

// Import Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Competitions from "./pages/Competitions";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import SponsorsPage from "./pages/SponsorsPage";

import "./styles/global.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import Cursor from "./components/Cursor";

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    if (path.includes("admin-scan") || path.includes("sponsors")) return false;
    return !(params.has('email') || params.get('mode') === 'download');
  });
  const navigate = useNavigate(); // Now valid because Router is upstream

  useEffect(() => {
    if (showIntro) {
      navigate("/");
      sessionStorage.removeItem("introPlayed");
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  return (
    <>
      <Cursor />
      {showIntro ? (
        <VideoLoader onComplete={handleIntroComplete} />
      ) : (
        <div className="app-content relative z-10 w-full min-h-screen text-white overflow-x-hidden">
          <ScrollToTop />
          <Navbar />
          <TopMarquee />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin-scan" element={<AdminPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <SoundProvider>
      <Router>
        <AppContent />
      </Router>
    </SoundProvider>
  );
};

export default App;
