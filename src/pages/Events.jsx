import React, { useEffect, useState } from 'react';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import '../components/events-premium.css';

const domainData = [
    {
        id: "ar",
        title: "AR / VR",
        icon: "🔮",
        img: "/src/assets/images/domains/ar.jpg",
        desc: "Innovate and build immersive solutions bridging augmented and virtual reality for real-world impact."
    },
    {
        id: "genai",
        title: "GEN AI",
        icon: "⚡",
        img: "/src/assets/images/domains/coremodernai.jpg",
        desc: "Explore the potential of Generative AI to automate, create, and solve complex modern problems."
    },
    {
        id: "fintech",
        title: "FINTECH",
        icon: "🪙",
        img: "/src/assets/images/domains/cs.jpg",
        desc: "Revolutionize digital finance with secure, transparent, and innovative decentralized systems."
    },
    {
        id: "health",
        title: "HEALTHCARE",
        icon: "⚕️",
        img: "/src/assets/images/domains/hc.jpeg",
        desc: "Develop AI-driven healthcare tools for diagnosis, monitoring, and medical data analysis."
    },
    {
        id: "oil",
        title: "OPEN INNOVATION",
        icon: "💡",
        img: "/src/assets/images/domains/oi.jpg",
        desc: "Present your ingenious solutions to any real-world problem using cutting-edge technology."
    },
    {
        id: "eco",
        title: "SUSTAINABILITY",
        icon: "🌿",
        img: "/src/assets/images/domains/sus.jpg",
        desc: "Build green technologies and AI systems focused on ecological preservation and efficient resource use."
    }
];

const timelineData = {
    day1: [
        { time: "09:30 AM", event: "Grand Inauguration" },
        { time: "11:30 AM", event: "Hackathon Commencement" },
        { time: "01:30 PM", event: "Networking Lunch" },
        { time: "02:30 PM", event: "Phase I: Development & Ideation" },
        { time: "06:00 PM", event: "First Mentor Review" },
        { time: "09:00 PM", event: "... Development Continues" }
    ],
    day2: [
        { time: "09:00 AM", event: "Phase II: Polishing & Testing" },
        { time: "11:30 AM", event: "Project Submission Deadline" },
        { time: "01:00 PM", event: "Networking Lunch" },
        { time: "02:00 PM", event: "Final Presentations & Demos" },
        { time: "04:30 PM", event: "Evaluation & Judging" },
        { time: "05:30 PM", event: "Awards & Valedictory Ceremony" }
    ]
};

const Events = () => {
    const playSound = useMagicSound();

    return (
        <div className="events-page-premium relative min-h-screen">
            <VideoBackground />

            <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">

                {/* HERO SECTION */}
                <div className="events-hero mb-20 text-center">
                    <h1 className="magic-title-glow">TECHATHONX 2K26</h1>
                    <p className="events-subtitle">6 DOMAINS · 32 HOURS · NATIONAL LEVEL HACKATHON</p>
                </div>

                {/* DOMAINS SECTION */}
                <div className="section-label mb-10 text-center">
                    <span className="label-text">DOMAINS OF INNOVATION</span>
                </div>

                <div className="domains-container">
                    {domainData.map((domain) => (
                        <div
                            key={domain.id}
                            className="domain-card-premium"
                            onMouseEnter={() => playSound('hover')}
                        >
                            <div className="domain-img-wrapper">
                                <img src={domain.img} alt={domain.title} />
                            </div>
                            <div className="domain-info-overlay">
                                <div className="domain-header">
                                    <span className="domain-icon">{domain.icon}</span>
                                    <h3>{domain.title}</h3>
                                </div>
                                <p className="domain-desc-premium">{domain.desc}</p>
                                <div className="learn-more-link">
                                    LEARN MORE ⚡
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TIMELINE SECTION */}
                <div className="timeline-section-premium py-20">
                    <div className="section-label mb-16 text-center">
                        <span className="label-text">EVENT TIMELINE</span>
                    </div>

                    <div className="timeline-grid-premium">

                        {/* DAY 1 */}
                        <div className="day-column">
                            <div className="day-header-premium">
                                <span className="day-badge">DAY 01</span>
                                <span className="day-date-text">March 4th, 2026</span>
                            </div>
                            <div className="timeline-flow">
                                {timelineData.day1.map((item, i) => (
                                    <div key={i} className="timeline-item-premium">
                                        <div className="time-box">
                                            <span className="time-text">{item.time.replace(' ', '\n')}</span>
                                        </div>
                                        <div className="event-details">
                                            <span className="event-desc-name">{item.event}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DAY 2 */}
                        <div className="day-column">
                            <div className="day-header-premium">
                                <span className="day-badge">DAY 02</span>
                                <span className="day-date-text">March 5th, 2026</span>
                            </div>
                            <div className="timeline-flow">
                                {timelineData.day2.map((item, i) => (
                                    <div key={i} className="timeline-item-premium">
                                        <div className="time-box">
                                            <span className="time-text">{item.time.replace(' ', '\n')}</span>
                                        </div>
                                        <div className="event-details">
                                            <span className="event-desc-name">{item.event}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Events;
