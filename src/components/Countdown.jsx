import { useEffect, useState } from "react";
import "./countdown.css";

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
    <section className="glass countdown-section">
      <h2 className="section-title">EVENT COUNTDOWN</h2>

      <div className="countdown-row">
        <TimeBox label="DAYS" value={time.d} />
        <Separator />
        <TimeBox label="HOURS" value={time.h} />
        <Separator />
        <TimeBox label="MINUTES" value={time.m} />
        <Separator />
        <TimeBox label="SECONDS" value={time.s} />
      </div>
    </section>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className="time-box">
      <div className="time-value">{String(value).padStart(2, "0")}</div>
      <div className="time-label">{label}</div>
    </div>
  );
}

function Separator() {
  return <div className="time-separator">:</div>;
}
