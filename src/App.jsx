import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

import "./styles/global.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (hasPlayed) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <VideoLoader onComplete={handleIntroComplete} />
      ) : (
        <Router>
          <ScrollToTop />
          <div className="app-content relative z-10 w-full min-h-screen text-white overflow-x-hidden">
            <Navbar />
            <TopMarquee />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
};

const App = () => {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
};

export default App;
