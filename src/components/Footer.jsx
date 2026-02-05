import React from 'react';
import './footer-majestic.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-divider"></div>

      <h3 className="footer-majestic-title">TECHATHONX 2K26</h3>

      <div className="footer-social-row">
        <a href="#" className="footer-social-link">INSTAGRAM</a>
        <a href="#" className="footer-social-link">LINKEDIN</a>
        <a href="#" className="footer-social-link">WHATSAPP</a>
      </div>

      <div className="footer-copyright">
        <p>PRATHYUSHA ENGINEERING COLLEGE</p>
        <p>DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE</p>
        <p>© 2026 ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
