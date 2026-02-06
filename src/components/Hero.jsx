import React from "react";
import "./hero.css";
// Importing the actual logo that exists in your assets folder
import collegeLogo from "../assets/images/logo.png";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">

        {/* LEFT: College Logo */}
        <div className="college-seal-container">
          <img src={collegeLogo} alt="Prathyusha Engineering College" className="seal-img" />
        </div>

        {/* RIGHT: Text Content */}
        <div className="hero-text-block">
          <h1 className="college-title">PRATHYUSHA ENGINEERING COLLEGE</h1>
          <p className="college-subtitle">AN AUTONOMOUS INSTITUTION · ESTD 2001</p>
          <p className="college-dept">DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE</p>

          <div className="divider-line"></div>

          <p className="presents-text">PROUDLY PRESENTS</p>

          <h2 className="techathon-title">TECHATHONX 2K26</h2>

          <p className="event-tagline">NATIONAL LEVEL HACKATHON</p>
          <p className="event-date">MARCH 4th & 5th, 2026</p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
