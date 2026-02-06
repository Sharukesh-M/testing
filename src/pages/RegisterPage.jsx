import React, { useState } from 'react';
import { useMagicSound } from '../hooks/useMagicSound';
import VideoBackground from '../components/VideoBackground';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/register-premium.css';

// -------------------------------------------------------------------------
// CONFIGURATION: PASTE YOUR GOOGLE WEB APP URL HERE
// -------------------------------------------------------------------------
const GSHEET_URL = "https://script.google.com/macros/s/AKfycbysH-LhqqNmi39QqYnqtKvSv5fmn9WwT-hFnCw9xZIduOu7egZX_hweEcMzX7FSOzTp/exec";

const RegisterPage = () => {
    const playSound = useMagicSound();
    const [showOptions, setShowOptions] = useState(false);
    const [regType, setRegType] = useState(null); // 'INTERNAL' or 'EXTERNAL'
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        department: '',
        mobile: '',
        email: '',
        teamName: '',
        members: [] // Array of member objects: { name, year, department, mobile, email }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addMember = () => {
        if (formData.members.length < 3) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, { name: '', year: '', department: '', mobile: '', email: '' }]
            }));
            playSound('hover');
        } else {
            alert("Maximum 4 members allowed per team.");
        }
    };

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...formData.members];
        newMembers[index][field] = value;
        setFormData(prev => ({ ...prev, members: newMembers }));
    };

    const removeMember = (index) => {
        const newMembers = formData.members.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, members: newMembers }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        playSound('click');

        if (GSHEET_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
            alert("Connection error: The Google Sheet URL has not been configured yet.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for the sheet
            const payload = {
                ...formData,
                type: regType,
                timestamp: new Date().toLocaleString(),
                // Format members as a string for easier sheet viewing
                membersSummary: formData.members.map((m, i) =>
                    `M${i + 2}: ${m.name} (${m.year}yr, ${m.department}, ${m.mobile})`
                ).join(" | ")
            };

            const response = await fetch(GSHEET_URL, {
                method: "POST",
                mode: "no-cors", // Required for Google Apps Script
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Since no-cors doesn't return a readable response, we assume success if no error is thrown
            alert("MAJESTIC SUCCESS! Your team has been enrolled. See you at TechathonX!");
            resetForm();

        } catch (error) {
            console.error("Submission Error:", error);
            alert("The seals failed to close. Please check your internet connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRegType(null);
        setFormData({
            name: '',
            year: '',
            department: '',
            mobile: '',
            email: '',
            teamName: '',
            members: []
        });
    };

    return (
        <div className="register-page-mindblowing relative min-h-screen">
            <VideoBackground />

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

                    {!regType ? (
                        <>
                            <motion.div
                                className="assemble-wrapper text-center mb-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <button
                                    className="assemble-btn-majestic"
                                    onClick={() => {
                                        setShowOptions(!showOptions);
                                        playSound('hover');
                                    }}
                                >
                                    {showOptions ? "CLOSE ENROLLMENT" : "ASSEMBLE HERE"}
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
                                                <a
                                                    href="https://docs.google.com/forms/d/e/1FAIpQLSctYMzZwv1yuQcq4cSXgfCudY6rEBAjn-5kCsTz7uW8bvCAew/viewform"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ink-register-btn"
                                                    onClick={() => playSound('click')}
                                                    style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                                                >
                                                    REGISTER HERE
                                                </a>
                                            </div>

                                            {/* EXTERNAL */}
                                            <div className="registration-card-parchment">
                                                <h3 className="card-ink-title">EXTERNAL PARTICIPATION</h3>
                                                <div className="ink-divider"></div>
                                                <p className="fee-ink">₹ 400 PER TEAM</p>
                                                <a
                                                    href="https://docs.google.com/forms/d/e/1FAIpQLSctYMzZwv1yuQcq4cSXgfCudY6rEBAjn-5kCsTz7uW8bvCAew/viewform"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ink-register-btn"
                                                    onClick={() => playSound('click')}
                                                    style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                                                >
                                                    REGISTER HERE
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="ink-form-container"
                        >
                            <div className="form-header-row mb-6">
                                <button className="back-ink-btn" onClick={resetForm}>← BACK</button>
                                <h2 className="ink-form-title">{regType} REGISTRATION</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="ink-form">
                                <motion.div
                                    className="ink-section-header"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    TEAM LEAD DETAILS
                                </motion.div>
                                <div className="ink-grid">
                                    <div className="ink-input-group">
                                        <label>FULL NAME</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter Lead Name" />
                                    </div>
                                    <div className="ink-input-group">
                                        <label>YEAR</label>
                                        <select name="year" value={formData.year} onChange={handleInputChange} required>
                                            <option value="">Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                    <div className="ink-input-group">
                                        <label>DEPARTMENT</label>
                                        <input type="text" name="department" value={formData.department} onChange={handleInputChange} required placeholder="e.g. AI & DS" />
                                    </div>
                                    <div className="ink-input-group">
                                        <label>MOBILE NUMBER</label>
                                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required placeholder="10 Digit Number" />
                                    </div>
                                    <div className="ink-input-group">
                                        <label>EMAIL ID</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="example@gmail.com" />
                                    </div>
                                    <div className="ink-input-group">
                                        <label>TEAM NAME</label>
                                        <input type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} required placeholder="Enter a cool team name" />
                                    </div>
                                </div>

                                <div className="ink-members-section mt-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <label className="section-ink-label">TEAM MEMBERS ({formData.members.length + 1}/4)</label>
                                        <button type="button" className="add-member-ink" onClick={addMember}>
                                            <span className="plus-icon">+</span> ADD MEMBER
                                        </button>
                                    </div>

                                    <div className="members-stack-ink">
                                        {formData.members.map((member, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                className="member-detail-card-ink"
                                            >
                                                <div className="member-card-header">
                                                    <span>MEMBER {idx + 2}</span>
                                                    <button type="button" className="remove-member-link" onClick={() => removeMember(idx)}>REMOVE MEMBER</button>
                                                </div>
                                                <div className="ink-grid-compact">
                                                    <div className="ink-input-group">
                                                        <label>NAME</label>
                                                        <input type="text" value={member.name} onChange={(e) => handleMemberChange(idx, 'name', e.target.value)} required placeholder="Name" />
                                                    </div>
                                                    <div className="ink-input-group">
                                                        <label>YEAR</label>
                                                        <select value={member.year} onChange={(e) => handleMemberChange(idx, 'year', e.target.value)} required>
                                                            <option value="">Year</option>
                                                            <option value="1">1st</option>
                                                            <option value="2">2nd</option>
                                                            <option value="3">3rd</option>
                                                            <option value="4">4th</option>
                                                        </select>
                                                    </div>
                                                    <div className="ink-input-group">
                                                        <label>DEPT</label>
                                                        <input type="text" value={member.department} onChange={(e) => handleMemberChange(idx, 'department', e.target.value)} required placeholder="Dept" />
                                                    </div>
                                                    <div className="ink-input-group">
                                                        <label>MOBILE</label>
                                                        <input type="tel" value={member.mobile} onChange={(e) => handleMemberChange(idx, 'mobile', e.target.value)} required placeholder="Mobile" />
                                                    </div>
                                                    <div className="ink-input-group full-width">
                                                        <label>EMAIL</label>
                                                        <input type="email" value={member.email} onChange={(e) => handleMemberChange(idx, 'email', e.target.value)} required placeholder="Email ID" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="submit-ink-wrapper mt-12">
                                    <button
                                        type="submit"
                                        className="seal-submission-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "SEALING..." : "SEAL REGISTRATION"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>

                <div className="registration-footer-note mt-12 text-center">
                    <p className="text-white/40 font-serif italic max-w-lg">
                        Final registration depends on payment confirmation.
                        Please ensure all details are correct before sealing your entry.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
