import React, { useState } from 'react';
import './hp-chatbot.css';

const HarryPotterChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);

        // Toggle Botpress webchat
        if (window.botpress) {
            if (!isOpen) {
                window.botpress.open();
            } else {
                window.botpress.close();
            }
        }
    };

    return (
        <div className="hp-chatbot-container" id="hp-chatbot">
            {/* Golden Snitch Launcher Button */}
            <button
                className={`hp-snitch-btn ${isOpen ? 'hp-snitch-open' : ''}`}
                onClick={toggleChat}
                aria-label="Open chat assistant"
                title="Chat with us ⚡"
            >
                <div className="hp-snitch-body">
                    {/* Golden Snitch SVG */}
                    <svg className="hp-snitch-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        {/* Left Wing */}
                        <g className="hp-wing hp-wing-left">
                            <path
                                d="M42 50 C35 35, 15 25, 5 30 C10 35, 20 42, 30 45 C20 40, 8 38, 2 42 C10 45, 25 47, 38 48"
                                fill="none"
                                stroke="rgba(255,255,255,0.85)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M40 48 C30 38, 12 30, 3 35 C12 40, 28 45, 38 48"
                                fill="rgba(255,255,255,0.15)"
                            />
                        </g>
                        {/* Right Wing */}
                        <g className="hp-wing hp-wing-right">
                            <path
                                d="M58 50 C65 35, 85 25, 95 30 C90 35, 80 42, 70 45 C80 40, 92 38, 98 42 C90 45, 75 47, 62 48"
                                fill="none"
                                stroke="rgba(255,255,255,0.85)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M60 48 C70 38, 88 30, 97 35 C88 40, 72 45, 62 48"
                                fill="rgba(255,255,255,0.15)"
                            />
                        </g>
                        {/* Golden Ball */}
                        <circle cx="50" cy="50" r="14" fill="url(#snitchGold)" />
                        <circle cx="50" cy="50" r="14" fill="url(#snitchShine)" />
                        {/* Equator line */}
                        <ellipse cx="50" cy="50" rx="14" ry="2" fill="rgba(139,90,0,0.4)" />
                        {/* Lightning bolt */}
                        <path
                            d="M48 44 L51 48 L49 48 L52 56 L49 51 L51 51 L48 44"
                            fill="rgba(255,255,255,0.9)"
                        />
                        {/* Gradients */}
                        <defs>
                            <radialGradient id="snitchGold" cx="40%" cy="40%">
                                <stop offset="0%" stopColor="#FFE066" />
                                <stop offset="50%" stopColor="#FFD700" />
                                <stop offset="100%" stopColor="#B8860B" />
                            </radialGradient>
                            <radialGradient id="snitchShine" cx="35%" cy="35%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>

                {/* Close icon when open */}
                {isOpen && (
                    <div className="hp-close-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </div>
                )}
            </button>
        </div>
    );
};

export default HarryPotterChatbot;

