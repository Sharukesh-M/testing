import React from 'react';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import '../components/competitions-premium.css';
import { motion } from 'framer-motion';

const arenaData = [
    {
        title: "LOCATION",
        icon: "📍",
        desc: "Prathyusha Engineering College, Thiruvallur, Tamil Nadu. The campus provides a sprawling environment for innovation.",
        link: "https://maps.app.goo.gl/7sQ34qBmPBRtWHXH7"
    },
    {
        title: "VENUE",
        icon: "🏛️",
        desc: "Main Auditorium & Central Library. High-speed connectivity and ergonomic spaces for 24 hours of creation."
    },
    {
        title: "EXPERIENCE",
        icon: "✨",
        desc: "A collaborative 24-hours journey with industry mentors, technical workshops, and national-level competition."
    }
];

const ruleData = [
    { num: "I.", text: "Team size is strictly limited to 2-4 members." },
    { num: "II.", text: "College ID cards are mandatory for all participants on campus." },
    { num: "III.", text: "Problem statements will be revealed at the event commencement." },
    { num: "IV.", text: "Plagiarism or pre-built projects are strictly prohibited." },
    { num: "V.", text: "Judicial decisions of the expert panel are final and binding." },
    { num: "VI.", text: "Participants must maintain campus discipline and decorum." },
    { num: "VII.", text: "Open to multidiciplinary,inter-collegiate teams of all year levels." },
    { num: "VIII.", text: "Teams must maintain at least one representative at thieir alloted place at all times." }
];

const Competitions = () => {
    const playSound = useMagicSound();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="competitions-page-luxury relative min-h-screen">
            <VideoBackground />

            <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">

                {/* MAJESTIC HEADER */}
                <motion.div
                    className="majestic-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="luxury-title">EVENT ARENA</h1>
                    <p className="luxury-subtitle">INNOVATION · COLLABORATION · EXCELLENCE</p>
                </motion.div>

                {/* ARENA CARDS */}
                <div className="arena-grid-premium">
                    {arenaData.map((item, i) => (
                        <motion.div
                            key={i}
                            className="arena-card-luxury"
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => item.link && window.open(item.link, "_blank")}
                            style={{ cursor: 'none' }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={itemVariants}
                        >
                            <span className="arena-icon-box">{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* PRIZE CHAMBER */}
                <motion.div
                    className="prize-chamber"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="prize-title-gold">PRIZE POOL & REWARDS</h2>

                    <motion.div
                        className="prize-podium-container"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* 2nd Place */}
                        <motion.div
                            className="prize-card-glass silver podium-card"
                            variants={itemVariants}
                        >
                            <h1 className="podium-number">2</h1>
                            <span className="rank-label">RUNNERS UP</span>
                            <p>Certificate of Merit & Technical Kits</p>
                        </motion.div>

                        {/* 1st Place */}
                        <motion.div
                            className="prize-card-glass gold podium-card main-winner"
                            variants={itemVariants}
                        >
                            <h1 className="podium-number">1</h1>
                            <span className="rank-label">WINNERS</span>
                            <p>The TechathonX Trophy & Internship Opportunities</p>
                        </motion.div>

                        {/* 3rd Place */}
                        <motion.div
                            className="prize-card-glass bronze podium-card"
                            variants={itemVariants}
                        >
                            <h1 className="podium-number">3</h1>
                            <span className="rank-label">3RD PLACE</span>
                            <p>Certificate of Merit & Goodies</p>
                        </motion.div>
                    </motion.div>

                    <p className="prize-footer-text">30k+ exciting prizes awaits!!!!!</p>
                </motion.div>

                {/* RULES TABLET */}
                <motion.div
                    className="rules-container-glass"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="tablet-header">RULES & GUIDELINES</h2>
                    <ul className="rule-list">
                        {ruleData.map((rule, i) => (
                            <motion.li
                                key={i}
                                className="rule-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="rule-num">{rule.num}</span>
                                <p>{rule.text}</p>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

            </div>
        </div>
    );
};

export default Competitions;
