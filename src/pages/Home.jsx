import React from 'react';
import LandingHero from '../components/LandingHero';
import ScrollVideo from '../components/ScrollVideo';
import About from '../components/About';
import Countdown from '../components/Countdown';
import Resources from '../components/Resources';
import VideoBackground from '../components/VideoBackground';
import '../components/about.css';
import '../components/countdown.css';

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
            </div>
        </div>
    );
};

export default Home;
