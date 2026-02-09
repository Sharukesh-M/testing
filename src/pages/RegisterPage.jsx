import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/register-premium.css';
import IDCard from '../components/IDCard';

// CONFIGURATION: PASTE YOUR GOOGLE WEB APP URL HERE
const GSHEET_URL = "https://script.google.com/macros/s/AKfycby9V3j0NK20A6oWAabArQKDLqPVkFu41aTOoyhxCbfiScNG91VHpw3hH7tfIwhB4Aue/exec";

// GOOGLE FORM LINK (Provided by User) - Use proper viewform link
const GFORM_LINK = "https://docs.google.com/forms/d/1IhmX0u-JzCqll6O3R42LgAeTVWWoJGNrDN7SAZJXGSQ/viewform";

const RegisterPage = () => {
    const playSound = useMagicSound();
    const location = useLocation();
    const [showOptions, setShowOptions] = useState(false);
    const [downloadMode, setDownloadMode] = useState(false);
    const [searchEmail, setSearchEmail] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [retrievedData, setRetrievedData] = useState(null);
    const [generatedTeamId, setGeneratedTeamId] = useState(null);

    // Auto-detect URL params for direct Deep Linking
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        const modeParam = params.get('mode');

        if (emailParam) {
            setDownloadMode(true);
            setSearchEmail(emailParam);
            fetchTicketInternal(emailParam);
        } else if (modeParam === 'download') {
            setDownloadMode(true);
        }
    }, [location]);

    const fetchTicketInternal = async (email) => {
        setIsSearching(true);
        try {
            const response = await fetch(`${GSHEET_URL}?action=search_email&email=${encodeURIComponent(email)}`);
            const result = await response.json();

            // Check for success status
            if (result.status === "success" && result.data) {
                setRetrievedData(result.data);
                setGeneratedTeamId(result.data.teamId);
                playSound('assemble');
            } else {
                // Show specific error from backend if available
                const msg = result.message || "No registration found for this email. Please check the email or register first.";
                alert(msg);
                console.log("Search failed:", msg);
            }
        } catch (error) {
            console.error("Search Error:", error);
            alert("An error occurred while connecting to the server. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    // Manual Search Handler
    const handleFetchTicket = (e) => {
        e.preventDefault();
        if (!searchEmail) {
            alert("Please enter your registered email.");
            return;
        }
        playSound('click');
        fetchTicketInternal(searchEmail);
    };

    const handleExternalRedirect = () => {
        playSound('click');
        window.open(GFORM_LINK, '_blank');
    };

    return (
        <div className="register-page-mindblowing relative min-h-screen">
            <VideoBackground />

            {/* ID Card Display */}
            {retrievedData && (
                <IDCard
                    data={retrievedData}
                    teamId={generatedTeamId}
                    onClose={() => { setRetrievedData(null); setSearchEmail(""); }}
                />
            )}

            <div className="register-premium-wrapper">
                <div className="enrollment-header">
                    <motion.h1
                        className="mind-blowing-title"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        EVENT REGISTRATION
                    </motion.h1>
                    <motion.p
                        className="luxury-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        SECURE YOUR SPOT IN TECHATHONX 2K26
                    </motion.p>
                </div>

                <div className="parchment-container">
                    {!downloadMode ? (
                        <>
                            {/* Main CTAs */}
                            <motion.div
                                className="assemble-wrapper text-center mb-10 flex flex-col gap-6 items-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <button
                                    className="assemble-btn-majestic"
                                    onClick={() => {
                                        playSound('click');
                                        setShowOptions(!showOptions);
                                    }}
                                    onMouseEnter={() => playSound('hover')}
                                >
                                    {showOptions ? "CLOSE OPTIONS" : "REGISTER NOW"}
                                </button>

                                <button
                                    onClick={() => { playSound('click'); setDownloadMode(true); }}
                                    className="text-[#D4AF37] underline text-sm tracking-widest hover:text-[#f1c40f] transition-colors"
                                    style={{ cursor: 'pointer', zIndex: 10 }}
                                >
                                    ALREADY REGISTERED? GET ENTRY PASS
                                </button>
                            </motion.div>

                            <AnimatePresence>
                                {showOptions && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="registration-options-container overflow-hidden"
                                    >
                                        <div className="registration-cards-flex">
                                            {/* INTERNAL */}
                                            <div className="registration-card-parchment">
                                                <h3 className="card-ink-title">INTERNAL PARTICIPATION</h3>
                                                <div className="ink-divider"></div>
                                                <p className="fee-ink">₹ 300 PER TEAM</p>
                                                <button
                                                    className="ink-register-btn"
                                                    onClick={handleExternalRedirect}
                                                >
                                                    PROCEED TO FORM
                                                </button>
                                            </div>

                                            {/* EXTERNAL */}
                                            <div className="registration-card-parchment">
                                                <h3 className="card-ink-title">EXTERNAL PARTICIPATION</h3>
                                                <div className="ink-divider"></div>
                                                <p className="fee-ink">₹ 400 PER TEAM</p>
                                                <button
                                                    className="ink-register-btn"
                                                    onClick={handleExternalRedirect}
                                                >
                                                    PROCEED TO FORM
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="ink-form-container"
                            style={{ maxWidth: '500px', margin: '0 auto' }}
                        >
                            <div className="form-header-row mb-6">
                                <button className="back-ink-btn" onClick={() => setDownloadMode(false)}>← BACK</button>
                                <h2 className="ink-form-title">GET ENTRY PASS</h2>
                            </div>

                            <form onSubmit={handleFetchTicket} className="ink-form">
                                <div className="ink-input-group full-width">
                                    <label>REGISTERED EMAIL ID</label>
                                    <input
                                        type="email"
                                        value={searchEmail}
                                        onChange={(e) => setSearchEmail(e.target.value)}
                                        required
                                        placeholder="Enter the email used in Google Form"
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>

                                <div className="submit-ink-wrapper mt-8">
                                    <button
                                        type="submit"
                                        className="seal-submission-btn"
                                        disabled={isSearching}
                                    >
                                        {isSearching ? "SEARCHING..." : "GENERATE PASS"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>

                <div className="registration-footer-note mt-12 text-center">
                    <p className="text-white/40 font-serif italic max-w-lg">
                        After filling the Google Form, come back here and use "Get Entry Pass" to download your ID Card.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
