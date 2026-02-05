import React from "react";
import "./landing-hero.css";
import collegeLogo from "../assets/images/logo.png";

const LandingHero = () => {
    return (
        <section className="landing-hero-section">

            {/* Majestic Backdrop Elements */}
            <div className="floating-elements">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="candle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 15}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="landing-content-wrapper">

                {/* TOP: COLLEGE IDENTITY */}
                <div className="landing-logo-container">
                    <img src={collegeLogo} alt="PEC Seal" className="landing-seal-img" />
                </div>

                <div className="landing-college-group">
                    <h1 className="landing-college-name">PRATHYUSHA ENGINEERING COLLEGE</h1>
                    <p className="landing-college-sub">AN AUTONOMOUS INSTITUTION · DEPARTMENT OF AI & DS</p>
                </div>

                {/* MIDDLE: THE BIG MOMENT */}
                <div className="landing-techathon-container">
                    <p className="landing-presents-text">PROUDLY PRESENTS</p>
                    <h2 className="landing-main-title">TECHATHONX 2K26</h2>
                    <p className="landing-tagline-text">National Level Hackathon</p>
                </div>

                {/* BOTTOM: THE DEPARTURE */}
                <div className="landing-date-badge">
                    MARCH 4 & 5, 2026
                </div>

            </div>
        </section>
    );
};

export default LandingHero;
