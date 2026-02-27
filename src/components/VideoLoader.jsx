import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cursor from "./Cursor";
import "./VideoLoader.css";

const VideoLoader = ({ onComplete }) => {
    const [stage, setStage] = useState("ENVELOPE"); // ENVELOPE, OPENING, DRAWING, EXPLODING, TITLE, DONE

    const handleStart = () => {
        setStage("OPENING");

        setTimeout(() => {
            setStage("DRAWING");
        }, 3000); // Wait for envelope to open before switching to drawing

        setTimeout(() => {
            setStage("EXPLODING");
        }, 7000); // 3000 + 4000

        setTimeout(() => {
            setStage("TITLE");
        }, 7500); // 3000 + 4500

        setTimeout(() => {
            setStage("DONE");
            setTimeout(onComplete, 1000);
        }, 12000); // 3000 + 9000
    };

    return (
        <div className="hp-loader-overlay">
            <Cursor />
            {/* Fog Overlay */}
            <div className="hp-fog"></div>

            <AnimatePresence mode="wait">
                {(stage === "ENVELOPE" || stage === "OPENING") && (
                    <motion.div
                        key="envelope"
                        className="hp-waiting-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <div className={`envelope-scene ${stage === "OPENING" ? "is-opening" : ""}`} onClick={stage === "ENVELOPE" ? handleStart : null}>
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
                    </motion.div>
                )}

                {stage === "DRAWING" && (
                    <motion.div
                        key="drawing"
                        className="hp-drawing-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg className="hp-hallows-svg" viewBox="0 0 200 200">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {/* Triangle (Cloak) */}
                            <motion.polygon
                                points="100,20 20,180 180,180"
                                className="hp-svg-path"
                                fill="none"
                                stroke="#f1c40f"
                                strokeWidth="3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            {/* Line (Wand) */}
                            <motion.line
                                x1="100" y1="20" x2="100" y2="180"
                                className="hp-svg-path"
                                fill="none"
                                stroke="#f1c40f"
                                strokeWidth="3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                            />
                            {/* Circle (Stone) */}
                            <motion.circle
                                cx="100" cy="126" r="54"
                                className="hp-svg-path"
                                fill="none"
                                stroke="#f1c40f"
                                strokeWidth="3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
                            />
                        </svg>
                        <motion.div
                            className="hp-incantation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <span className="incant-word">Invisibility Cloak...</span>
                            <motion.span className="incant-word" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Elder Wand...</motion.span>
                            <motion.span className="incant-word" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Resurrection Stone...</motion.span>
                        </motion.div>
                    </motion.div>
                )}

                {(stage === "EXPLODING") && (
                    <motion.div key="exploding" className="hp-particles-container">
                        {[...Array(60)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="hp-spark"
                                initial={{ x: "50vw", y: "50vh", scale: 0, opacity: 1 }}
                                animate={{
                                    x: `${50 + (Math.random() - 0.5) * 100}vw`,
                                    y: `${50 + (Math.random() - 0.5) * 100}vh`,
                                    scale: Math.random() * 3,
                                    opacity: 0
                                }}
                                transition={{ duration: 1.5 + Math.random() * 2, ease: "easeOut" }}
                                style={{
                                    backgroundColor: Math.random() > 0.5 ? "#f1c40f" : "#fff",
                                    boxShadow: `0 0 ${Math.random() * 10 + 5}px #f1c40f`
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {stage === "TITLE" && (
                    <motion.div
                        key="title"
                        className="hp-title-screen"
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                    >
                        <motion.div className="hp-stars">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className="hp-bg-star" style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`
                                }}></div>
                            ))}
                        </motion.div>

                        <motion.h3 className="hp-college" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 1 }}>
                            PRATHYUSHA ENGINEERING COLLEGE
                        </motion.h3>

                        <h1 className="hp-main-headline">
                            {'TECHATHON X'.split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, textShadow: "0 0 0px #f1c40f", y: 20 }}
                                    animate={{ opacity: 1, textShadow: "0 0 20px #f1c40f", y: 0 }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                    style={{ display: "inline-block" }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div
                            className="hp-year-badge"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 2, type: "spring" }}
                        >
                            <span className="bolt">⚡</span> 2K26 <span className="bolt">⚡</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button className="hp-skip-btn" onClick={onComplete}>SKIP ⚡</button>
        </div>
    );
};

export default VideoLoader;
