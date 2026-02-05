import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">

      <div className="footer-glass">

        <p className="footer-title">
          TECHATHON 2K26 · PRATHYUSHA ENGINEERING COLLEGE
        </p>

        <div className="social-icons">
          <a href="#" className="social-btn" aria-label="Instagram">
            <span>📷</span>
          </a>
          <a href="#" className="social-btn" aria-label="LinkedIn">
            <span>💼</span>
          </a>
          <a href="#" className="social-btn" aria-label="WhatsApp">
            <span>💬</span>
          </a>
        </div>

        <p className="footer-copy">
          © 2026 Department of Artificial Intelligence & Data Science  
          <br />
          All Rights Reserved
        </p>

      </div>

    </footer>
  );
}
