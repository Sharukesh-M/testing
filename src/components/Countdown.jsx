import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./home-majestic.css";

const EVENT_DATE = new Date("March 4, 2026 09:00:00").getTime();

export default function Countdown() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getRemaining());

  function getRemaining() {
    const now = new Date().getTime();
    const diff = EVENT_DATE - now;

    if (diff <= 0) {
      return { d: 0, h: 0, m: 0, s: 0 };
    }

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="home-section-container">
      <motion.div
        className="majestic-card-glass"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        <div className="majestic-heading-group">
          <motion.h2
            className="majestic-section-title"
            variants={itemVariants}
          >
            THE FINAL HOUR
          </motion.h2>
          <motion.p
            className="majestic-section-subtitle"
            variants={itemVariants}
          >
            COUNTDOWN TO TECHATHONX 2K26
          </motion.p>
        </div>

        <div className="countdown-majestic-row">
          <TimeBlock label="DAYS" value={time.d} delay={0} />
          <motion.div className="time-sep-majestic" variants={itemVariants}>:</motion.div>
          <TimeBlock label="HOURS" value={time.h} delay={0.1} />
          <motion.div className="time-sep-majestic" variants={itemVariants}>:</motion.div>
          <TimeBlock label="MINUTES" value={time.m} delay={0.2} />
          <motion.div className="time-sep-majestic" variants={itemVariants}>:</motion.div>
          <TimeBlock label="SECONDS" value={time.s} delay={0.3} />
        </div>

        <motion.div
          style={{ marginTop: '40px', textAlign: 'center', position: 'relative', zIndex: 100 }}
          variants={itemVariants}
        >
          <button
            onClick={() => navigate('/register')}
            className="majestic-button"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#000',
              backgroundColor: '#f1c40f',
              padding: '15px 40px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              letterSpacing: '2px',
              boxShadow: '0 0 15px rgba(241, 196, 15, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(241, 196, 15, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(241, 196, 15, 0.4)';
            }}
          >
            REGISTER NOW
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}

function TimeBlock({ label, value, delay }) {
  return (
    <motion.div
      className="time-unit-majestic"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
      }}
    >
      <div className="time-val-majestic">{String(value).padStart(2, "0")}</div>
      <div className="time-lab-majestic">{label}</div>
    </motion.div>
  );
}
