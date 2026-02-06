import React from "react";
import "./landing-hero.css";
import collegeLogo from "../assets/images/logo.png";
import { motion } from "framer-motion";

// Import Reward Logos
import auResearch from "../assets/images/logo(reward)/au_research.png";
import autonomous from "../assets/images/logo(reward)/AUTONOMOUS.png";
import naac from "../assets/images/logo(reward)/NAAC_LOGO.png";
import prasie from "../assets/images/logo(reward)/prasie_deepai_new.png";
import aicte from "../assets/images/logo(reward)/aicte.jpeg";
import anna from "../assets/images/logo(reward)/annaunvirtsy.png";
import gdg from "../assets/images/logo(reward)/gdg.png";
import idealab from "../assets/images/logo(reward)/idealab.png";
import ieee from "../assets/images/logo(reward)/ieee-logo.png";
import iic from "../assets/images/logo(reward)/iic.png";
import nba from "../assets/images/logo(reward)/nba.jpg";
import nss from "../assets/images/logo(reward)/nss.jpeg";
import yrc from "../assets/images/logo(reward)/yrc22.jpg";
import partner from "../assets/images/logo(reward)/partner_generic.png";

const rewardLogos = [
    autonomous, anna, aicte, nba, naac,
    auResearch, prasie, gdg, idealab,
    ieee, iic, nss, yrc, partner
];

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
                <motion.div
                    className="landing-logo-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={collegeLogo} alt="PEC Seal" className="landing-seal-img" />
                </motion.div>

                <div className="landing-college-group">
                    <motion.h1
                        className="landing-college-name"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        PRATHYUSHA ENGINEERING COLLEGE
                    </motion.h1>
                    <motion.p
                        className="landing-college-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        AN AUTONOMOUS INSTITUTION
                    </motion.p>

                    {/* LOGO TICKER */}
                    <motion.div
                        className="logo-ticker-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    >
                        <div className="logo-ticker-track">
                            {/* Double the logos for seamless scroll */}
                            {[...rewardLogos, ...rewardLogos].map((logo, idx) => (
                                <img key={idx} src={logo} alt="Partner Logo" className="ticker-logo" />
                            ))}
                        </div>
                    </motion.div>

                    <motion.p
                        className="landing-college-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        DEPARTMENT OF
                    </motion.p>
                    <motion.h1
                        className="landing-college-name"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        ARTIFICIAL INTELLIGENCE & DATA SCIENCE
                    </motion.h1>
                </div>

                {/* MIDDLE: THE BIG MOMENT */}
                <div className="landing-techathon-container">
                    <motion.p
                        className="landing-presents-text"
                        initial={{ opacity: 0, letterSpacing: '2px' }}
                        animate={{ opacity: 1, letterSpacing: '4px' }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                    >
                        PROUDLY PRESENTS
                    </motion.p>
                    {/* Keep typing anim class but wrap in motion if fade is needed, 
                        though typing-anim css handles typewriter effect usually. 
                        Let's add a scale effect. */}
                    <motion.h2
                        className="landing-main-title typing-anim"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        TECHATHONX 2K26
                    </motion.h2>
                    <motion.p
                        className="landing-tagline-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        24HRS NATIONAL LEVEL HACKATHON
                    </motion.p>
                </div>

                {/* BOTTOM: THE DEPARTURE */}
                <motion.div
                    className="landing-date-badge"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8, type: "spring" }}
                >
                    MARCH 4th & 5th, 2026
                </motion.div>

            </div>
        </section>
    );
};

export default LandingHero;
