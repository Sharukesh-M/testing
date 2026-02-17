import React from 'react';
import './footer-majestic.css';
const devfolioLogo = "/Devfolio_Logo-Colored.png";

const Footer = () => {



  return (
    <footer className="footer-section">
      <div className="footer-divider"></div>

      <h3 className="footer-majestic-title">TECHATHONX 2K26</h3>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          className="apply-button"
          data-hackathon-slug="techathonx2K26"
          data-button-theme="light"
          style={{ height: '44px', width: '312px' }}
        ></div>
      </div>

      <div className="footer-social-row">
        <a href="https://www.instagram.com/techathonx_2k26?igsh=MjM2c29yN3RyenY0" target="_blank" rel="noopener noreferrer" className="footer-social-link">INSTAGRAM</a>
        <a href="https://www.linkedin.com/in/techathonx2k26" target="_blank" rel="noopener noreferrer" className="footer-social-link">LINKEDIN</a>
        <a href="https://chat.whatsapp.com/Di7I0bbjYG19VU3nfvQFNq" target="_blank" rel="noopener noreferrer" className="footer-social-link">WHATSAPP</a>
      </div>

      <div className="footer-copyright">
        <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '10px' }}>
          <img src={devfolioLogo} alt="Devfolio" style={{ height: '30px' }} />
        </a>
        <p>PRATHYUSHA ENGINEERING COLLEGE</p>
        <p>DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE</p>
        <p>© 2026 ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
