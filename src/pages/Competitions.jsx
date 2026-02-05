import React from 'react';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import '../components/competitions-premium.css';

const arenaData = [
    {
        title: "LOCATION",
        icon: "📍",
        desc: "Prathyusha Engineering College, Thiruvallur, Tamil Nadu. The campus provides a sprawling environment for innovation."
    },
    {
        title: "VENUE",
        icon: "🏛️",
        desc: "Main Auditorium & Central Library. High-speed connectivity and ergonomic spaces for 32 hours of creation."
    },
    {
        title: "EXPERIENCE",
        icon: "✨",
        desc: "A collaborative 32-hour journey with industry mentors, technical workshops, and national-level competition."
    }
];

const ruleData = [
    { num: "I.", text: "Team size is strictly limited to 2-4 members." },
    { num: "II.", text: "College ID cards are mandatory for all participants on campus." },
    { num: "III.", text: "Problem statements will be revealed at the event commencement." },
    { num: "IV.", text: "Plagiarism or pre-built projects are strictly prohibited." },
    { num: "V.", text: "Judicial decisions of the expert panel are final and binding." },
    { num: "VI.", text: "Participants must maintain campus discipline and decorum." }
];

const Competitions = () => {
    const playSound = useMagicSound();

    return (
        <div className="competitions-page-luxury relative min-h-screen">
            <VideoBackground />

            <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">

                {/* MAJESTIC HEADER */}
                <div className="majestic-header">
                    <h1 className="luxury-title">EVENT ARENA</h1>
                    <p className="luxury-subtitle">INNOVATION · COLLABORATION · EXCELLENCE</p>
                </div>

                {/* ARENA CARDS */}
                <div className="arena-grid-premium">
                    {arenaData.map((item, i) => (
                        <div
                            key={i}
                            className="arena-card-luxury"
                            onMouseEnter={() => playSound('hover')}
                        >
                            <span className="arena-icon-box">{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* PRIZE CHAMBER */}
                <div className="prize-chamber">
                    <h2 className="prize-title-gold">PRIZE POOL & REWARDS</h2>
                    <div className="prize-cards-container">
                        <div className="prize-card-glass silver">
                            <span className="rank-label">RUNNERS UP</span>
                            <span className="amount-text">₹ 5,000</span>
                            <p>Certificate of Merit & Technical Kits</p>
                        </div>
                        <div className="prize-card-glass gold">
                            <span className="rank-label">WINNERS</span>
                            <span className="amount-text">₹ 10,000</span>
                            <p>The TechathonX Trophy & Internship Opportunities</p>
                        </div>
                        <div className="prize-card-glass bronze">
                            <span className="rank-label">3RD PLACE</span>
                            <span className="amount-text">₹ 2,000</span>
                            <p>Certificate of Merit & Goodies</p>
                        </div>
                    </div>
                </div>

                {/* RULES TABLET */}
                <div className="rules-tablet">
                    <h2 className="tablet-header">RULES & GUIDELINES</h2>
                    <ul className="rule-list">
                        {ruleData.map((rule, i) => (
                            <li key={i} className="rule-item">
                                <span className="rule-num">{rule.num}</span>
                                <p>{rule.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Competitions;
