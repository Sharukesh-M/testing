import React, { useEffect, useState } from 'react';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import '../components/events-premium.css';
import { motion } from 'framer-motion';

// Import Domain Images
import arImg from '../assets/images/domains/ar.jpg';
import aiImg from '../assets/images/domains/coremodernai.jpg';
import fintechImg from '../assets/images/domains/cs.jpg';
import healthImg from '../assets/images/domains/hc.jpeg';
import openImg from '../assets/images/domains/oi.jpg';
import susImg from '../assets/images/domains/sus.jpg';

const domainData = [
    {
        id: "ar",
        title: "AR / VR",
        icon: "🔮",
        img: arImg,
        desc: "Immersive augmented and virtual reality solutions. Enabling interactive digital experiences. Revolutionizing user engagement."
    },
    {
        id: "genai",
        title: "AI",
        icon: "⚡",
        img: aiImg,
        desc: "Advanced AI models and next-gen learning. Intelligent automation for complex solutioning. Predictive analytics shaping the future."
    },
    {
        id: "fintech",
        title: "FINTECH",
        icon: "🪙",
        img: fintechImg,
        desc: "Secure blockchain and transaction systems. Automated trading and financial innovation. Fraud detection and digital banking."
    },
    {
        id: "health",
        title: "HEALTHCARE",
        icon: "⚕️",
        img: healthImg,
        desc: "AI-powered diagnostic and monitoring tools. Medical innovation for better patient care. Smart health tracking and analytics."
    },
    {
        id: "oil",
        title: "OPEN INNOVATION",
        icon: "💡",
        img: openImg,
        desc: "Creative problem-solving for real challenges. Cross-disciplinary technical approaches. Collaborative breakthroughs for impact."
    },
    {
        id: "eco",
        title: "SUSTAINABILITY",
        icon: "🌿",
        img: susImg,
        desc: "Green technology and eco-friendly systems. Sustainable resource management solutions. Environmental preservation through tech."
    }
];

const timelineData = {
    day1: [
        { time: "09:30 AM", event: "Grand Inauguration" },
        { time: "11:30 AM", event: "24 Hrs Hackathon Begins" },
        { time: "01:30 PM", event: "Networking Lunch" },
        { time: "04:30 PM", event: "Refreshment" },
        { time: "07:30 PM", event: "Dinner" },

    ],
    day2: [
        { time: "12:00 AM", event: "Refreshment" },
        { time: "04:30 AM", event: "Refreshment" },
        { time: "08:30 PM", event: "Breakfast" },
        { time: "11:30 PM", event: "Hackathon Ends" },
        { time: "12:30 PM", event: "Result Annoucement" },

    ]
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Events = () => {
    const playSound = useMagicSound();
    const [selectedDomain, setSelectedDomain] = useState(null);

    return (
        <div className="events-page-premium relative min-h-screen">
            <VideoBackground />

            {/* DOMAIN MODAL */}
            {selectedDomain && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 100,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setSelectedDomain(null)}
                >
                    <div
                        style={{
                            background: '#0e141e',
                            border: '2px solid #f1c40f',
                            borderRadius: '20px',
                            padding: '40px',
                            maxWidth: '500px',
                            width: '100%',
                            position: 'relative',
                            textAlign: 'center',
                            boxShadow: '0 0 50px rgba(241, 196, 15, 0.3)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedDomain(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: '#f1c40f',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{selectedDomain.icon}</div>
                        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#f1c40f', marginBottom: '15px' }}>{selectedDomain.title}</h3>
                        <p style={{ fontFamily: 'Alice, serif', fontSize: '1.1rem', color: '#fff', lineHeight: '1.6' }}>{selectedDomain.desc}</p>
                    </div>
                </div>
            )}

            <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">

                {/* HERO SECTION */}
                <div className="events-hero mb-20 text-center">
                    <motion.h1
                        className="magic-title-glow"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        TECHATHONX 2K26
                    </motion.h1>
                    <motion.p
                        className="events-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    >
                        6 DOMAINS · 24 HOURS · NATIONAL LEVEL HACKATHON
                    </motion.p>
                </div>

                {/* DOMAINS SECTION */}
                <div className="section-label mb-10 text-center">
                    <span className="label-text">DOMAINS OF INNOVATION</span>
                </div>

                <div className="domains-container">
                    {domainData.map((domain, index) => (
                        <motion.div
                            key={domain.id}
                            className="domain-card-premium"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => {
                                playSound('click');
                                setSelectedDomain(domain);
                            }}
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
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* TIMELINE SECTION */}
                <div className="timeline-section-premium py-20">
                    <div className="section-label mb-16 text-center">
                        <span className="label-text">EVENT TIMELINE</span>
                    </div>

                    <div className="timeline-grid-premium">

                        {/* DAY 1 */}
                        <motion.div
                            className="day-column"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="day-header-premium">
                                <span className="day-badge">DAY 01</span>
                                <span className="day-date-text">March 4th, 2026</span>
                            </div>
                            <div className="timeline-flow">
                                {timelineData.day1.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="timeline-item-premium"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="time-box">
                                            <span className="time-text">{item.time.replace(' ', '\n')}</span>
                                        </div>
                                        <div className="event-details">
                                            <span className="event-desc-name">{item.event}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* DAY 2 */}
                        <motion.div
                            className="day-column"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="day-header-premium">
                                <span className="day-badge">DAY 02</span>
                                <span className="day-date-text">March 5th, 2026</span>
                            </div>
                            <div className="timeline-flow">
                                {timelineData.day2.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="timeline-item-premium"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="time-box">
                                            <span className="time-text">{item.time.replace(' ', '\n')}</span>
                                        </div>
                                        <div className="event-details">
                                            <span className="event-desc-name">{item.event}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Events;
