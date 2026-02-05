import { useEffect, useState } from "react";
import "./home-majestic.css";

const EVENT_DATE = new Date("March 4, 2026 09:00:00").getTime();

export default function Countdown() {
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

  return (
    <section className="home-section-container">
      <div className="majestic-card-glass">

        <div className="majestic-heading-group">
          <h2 className="majestic-section-title">THE FINAL HOUR</h2>
          <p className="majestic-section-subtitle">COUNTDOWN TO TECHATHONX 2K26</p>
        </div>

        <div className="countdown-majestic-row">
          <TimeBlock label="DAYS" value={time.d} />
          <div className="time-sep-majestic">:</div>
          <TimeBlock label="HOURS" value={time.h} />
          <div className="time-sep-majestic">:</div>
          <TimeBlock label="MINUTES" value={time.m} />
          <div className="time-sep-majestic">:</div>
          <TimeBlock label="SECONDS" value={time.s} />
        </div>

      </div>
    </section>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="time-unit-majestic">
      <div className="time-val-majestic">{String(value).padStart(2, "0")}</div>
      <div className="time-lab-majestic">{label}</div>
    </div>
  );
}
