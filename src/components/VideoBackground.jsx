import React, { useEffect, useRef } from "react";
import "./VideoBackground.css";

const VideoBackground = ({ videoSrc }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }
    }, [videoSrc]);

    // If a videoSrc is provided, render the video background (for contact page etc.)
    if (videoSrc) {
        return (
            <div className="video-background-container">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    playsInline
                    key={videoSrc}
                    className="video-background-video"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-background-overlay" />
            </div>
        );
    }

    // Default: CSS-only magical background (no video bandwidth!)
    return (
        <div className="video-background-container">
            {/* Animated starfield */}
            <div className="hp-starfield">
                {[...Array(80)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="hp-star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 4}s`,
                            '--star-size': `${1 + Math.random() * 2}px`,
                        }}
                    />
                ))}
            </div>

            {/* Floating magical orbs / wisps */}
            <div className="hp-orbs-layer">
                {[...Array(10)].map((_, i) => {
                    const colors = [
                        'rgba(241, 196, 15, 0.45)',   // gold (dominant)
                        'rgba(218, 165, 32, 0.4)',    // goldenrod
                        'rgba(255, 215, 0, 0.35)',    // bright gold
                        'rgba(184, 134, 11, 0.3)',    // dark goldenrod
                        'rgba(255, 193, 37, 0.35)',   // warm amber
                    ];
                    const color = colors[i % colors.length];
                    const size = 30 + Math.random() * 80;
                    return (
                        <div
                            key={`orb-${i}`}
                            className="hp-orb"
                            style={{
                                '--orb-color': color,
                                '--orb-size': `${size}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 15}s`,
                                animationDuration: `${15 + Math.random() * 15}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Golden aurora glow bands */}
            <div className="hp-aurora-layer">
                <div className="hp-aurora hp-aurora-1" />
                <div className="hp-aurora hp-aurora-2" />
                <div className="hp-aurora hp-aurora-3" />
            </div>

            {/* Magical mist/fog layers */}
            <div className="hp-mist hp-mist-1" />
            <div className="hp-mist hp-mist-2" />

            {/* Subtle golden dust particles */}
            <div className="hp-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="hp-magic-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${6 + Math.random() * 8}s`,
                            '--particle-color': ['#f1c40f', '#ffd700', '#daa520', '#ffb347', '#c8a000'][Math.floor(Math.random() * 5)],
                        }}
                    />
                ))}
            </div>

            {/* Dark overlay for text readability */}
            <div className="video-background-overlay" />
        </div>
    );
};

export default VideoBackground;
