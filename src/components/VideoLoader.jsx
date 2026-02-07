import React, { useRef, useState, useEffect } from "react";
import { useMagicSound } from "../hooks/useMagicSound";
import "./VideoLoader.css";

const VideoLoader = ({ onComplete }) => {
    const videoRef = useRef(null);
    const [stage, setStage] = useState("ENVELOPE"); // ENVELOPE -> OPENING -> VIDEO
    const [progress, setProgress] = useState(0);
    const playSound = useMagicSound();

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleStartJourney = () => {
        playSound('seal');
        playSound('paper');
        setStage("OPENING");

        // Transition to video after envelope animation
        setTimeout(() => {
            setStage("VIDEO");
        }, 5000);
    };

    useEffect(() => {
        if (stage === "VIDEO" && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Auto-play failed:", error);
            });
        }
    }, [stage]);

    const handleVideoEnd = () => {
        onComplete();
    };

    return (
        <div className="video-loader-overlay">
            {stage !== "VIDEO" ? (
                <div className={`envelope-scene ${stage === "OPENING" ? "is-opening" : ""}`} onClick={stage === "ENVELOPE" ? handleStartJourney : null}>

                    <div className="magic-particles">
                        {[...Array(20)].map((_, i) => <div key={i} className="particle"></div>)}
                    </div>

                    <div className="invitation-wrapper">
                        <div className="envelope">
                            <div className="envelope-top"></div>
                            <div className="envelope-side"></div>
                            <div className="envelope-bottom"></div>
                            <div className="wax-seal">
                                <span className="seal-text">PEC</span>
                            </div>
                        </div>

                        <div className="letter-preview">
                            <div className="letter-header">TECHATHON X 2K26</div>
                            <div className="letter-body">
                                You are cordially invited to attend the National Level
                                Hackathon hosted by Prathyusha Engineering College.
                                The journey to innovation commences shortly.
                            </div>
                            <div className="letter-footer">ACCEPTED</div>
                        </div>
                    </div>

                    <div className="entry-prompt">
                        {stage === "ENVELOPE" ? "Click to Open Your Invitation" : "Preparing Environment..."}
                    </div>
                </div>
            ) : (
                <div className="video-container-fullscreen">
                    <video
                        ref={videoRef}
                        className="intro-video-content-fullscreen"
                        onEnded={handleVideoEnd}
                        onTimeUpdate={handleTimeUpdate}
                        preload="auto"
                        playsInline
                    >
                        <source src="/videos/vid1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* SUPER DESIGN PROGRESS BAR */}
                    <div className="super-loading-container">
                        <div className="wand-line-container">
                            <div className="wand-track"></div>
                            <div
                                className="wand-progress"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="wand-spark"></div>
                            </div>
                        </div>
                        <div className="progress-value-glass">
                            <span className="digit">{Math.round(progress)}</span>
                            <span className="percent">%</span>
                        </div>
                    </div>

                    <button className="skip-intro-btn-minimal" onClick={handleVideoEnd}>SKIP</button>
                </div>
            )}
        </div>
    );
};

export default VideoLoader;
