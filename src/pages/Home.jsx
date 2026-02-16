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
import polygonLogo from "../assets/images/Polygon_blockchain_logo.png";
import ethIndiaLogo from "../assets/images/ETHIndia.png";
import sponserImg from "../assets/images/manapaisa.jpeg";


const API_BASE_URL = "https://client.linupadippurakkal.com";

const Home = () => {
    const hasRecordedVisit = React.useRef(false);

    React.useEffect(() => {
        if (hasRecordedVisit.current) return;
        hasRecordedVisit.current = true;

        const recordVisit = async () => {
            try {
                await fetch(`${API_BASE_URL}/visit`, { method: "POST" });
            } catch (e) {
                console.error("Failed to record visit", e);
            }
        };
        recordVisit();
    }, []);

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
                        gap: '40px',
                        flexWrap: 'wrap'
                    }}>
                        {/* Devfolio Logo */}
                        <div className="home-sponsor-card" style={{ cursor: 'pointer', padding: '10px' }}>
                            <a
                                href="https://devfolio.co"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={devfolioLogo}
                                    alt="Devfolio"
                                    style={{ height: '40px', objectFit: 'contain' }}
                                />
                            </a>
                        </div>

                        {/* Polygon Logo */}
                        <div className="home-sponsor-card" style={{ cursor: 'pointer', padding: '10px' }}>
                            <a
                                href="https://polygon.technology"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={polygonLogo}
                                    alt="Polygon"
                                    style={{ height: '40px', objectFit: 'contain' }}
                                />
                            </a>
                        </div>

                        {/* ETHIndia Logo */}
                        <div className="home-sponsor-card" style={{ cursor: 'pointer', padding: '10px' }}>
                            <a
                                href="https://ethindia.co"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={ethIndiaLogo}
                                    alt="ETHIndia"
                                    style={{ height: '40px', objectFit: 'contain' }}
                                />
                            </a>
                        </div>

                        {/* Manapaisa Logo */}
                        <div className="home-sponsor-card" style={{ cursor: 'pointer', padding: '10px' }}>
                            <img
                                src={sponserImg}
                                alt="Manapaisa Sponsor"
                                style={{ height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
