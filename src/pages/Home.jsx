import React from 'react';
import LandingHero from '../components/LandingHero';
import About from '../components/About';
import Countdown from '../components/Countdown';
import VideoBackground from '../components/VideoBackground'; // Moving video here
import '../components/about.css';
import '../components/countdown.css';

const Home = () => {
    return (
        <div className="home-page relative">
            {/* Background Video ONLY on Home Page */}
            <VideoBackground />

            <div className="relative z-10">
                <LandingHero />
                <About />
                <Countdown />
            </div>
        </div>
    );
};

export default Home;
