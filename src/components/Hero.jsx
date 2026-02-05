import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";
import "../styles/global.css";

const TypewriterText = ({ text, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setComplete(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        style={{
          borderRight: "3px solid #a855f7",
          marginLeft: "4px",
          display: complete ? 'none' : 'inline-block',
          height: '1em',
          verticalAlign: 'middle'
        }}
      />
    </div>
  );
};

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* LOGO + COLLEGE NAME */}
        <div className="college-row">
          <motion.img
            src={logo}
            alt="College Logo"
            className="hero-logo"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.h1
            className="college-name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            PRATHYUSHA ENGINEERING COLLEGE
          </motion.h1>
        </div>

        <motion.p
          className="sub-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          AN AUTONOMOUS INSTITUTION · ESTD 2001
        </motion.p>

        <motion.p
          className="dept"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE
        </motion.p>

        <p className="presents">PROUDLY PRESENTS</p>

        <TypewriterText
          text="TECHATHONX 2K26"
          className="event-title"
          delay={1.5}
        />

        <p className="event-type">NATIONAL LEVEL HACKATHON</p>

        <p className="event-date">MARCH 4 & 5, 2026</p>

        {/* Call to action removed as requested */}

      </motion.div>
    </section>
  );
}
