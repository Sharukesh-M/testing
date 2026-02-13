import React from 'react';
import LandingHero from '../components/LandingHero';
import ScrollVideo from '../components/ScrollVideo';
import About from '../components/About';
import Countdown from '../components/Countdown';
import Resources from '../components/Resources';
import VideoBackground from '../components/VideoBackground';
import '../components/about.css';
import '../components/countdown.css';

import devfolioLogo from "../assets/images/_Light.png";
import sponserImg from "../assets/images/manapaisa.jpeg";

const Home = () => {
    return (
        <div className="home-page relative">
            {/* Background Video ONLY on Home Page */}
            <VideoBackground />

            <div className="relative z-10">
                <LandingHero />
                <ScrollVideo />
                <About />
                <Countdown />
                <Resources />

                {/* SPONSORS SECTION */}
                <div
                    className="home-sponsors-section"
                    style={{ textAlign: 'center', padding: '60px 20px 80px', background: 'rgba(0,0,0,0.6)' }}
                >
                    <div style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '1.5rem',
                        color: '#f1c40f',
                        letterSpacing: '3px',
                        marginBottom: '40px',
                        textTransform: 'uppercase'
                    }}>
                        OUR SPONSORS
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '60px',
                        flexWrap: 'wrap'
                    }}>
                        {/* Devfolio Logo */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '20px 30px',
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(241, 196, 15, 0.2)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            className="home-sponsor-card"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.borderColor = '#f1c40f';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(241, 196, 15, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.borderColor = 'rgba(241, 196, 15, 0.2)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <a
                                href="https://devfolio.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Devfolio"
                                style={{ display: 'block' }}
                            >
                                <img
                                    src={devfolioLogo}
                                    alt="DEVFOLIO LOGO"
                                    style={{ height: '60px', objectFit: 'contain', display: 'block' }}
                                />
                            </a>
                        </div>

                        {/* Manapaisa Logo */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '20px 30px',
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(241, 196, 15, 0.2)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            className="home-sponsor-card"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.borderColor = '#f1c40f';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(241, 196, 15, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.borderColor = 'rgba(241, 196, 15, 0.2)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <img
                                src={sponserImg}
                                alt="Manapaisa Sponsor"
                                style={{ height: '60px', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
