import React from 'react';
import '../styles/global.css';

const sponserImg = "/manapaisa.jpeg";

const SponsorsPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-[#f1c40f] tracking-widest font-cinzel text-center">
                OUR SPONSORS
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-12 max-w-6xl w-full">
                {/* Manapaisa Logo */}
                <div className="sponsor-card p-4">
                    <img
                        src={sponserImg}
                        alt="Manapaisa Sponsor"
                        className="h-16 md:h-20 object-contain mx-auto"
                    />
                </div>
            </div>

            <div className="mt-16 text-center text-gray-400 max-w-2xl px-4">
                <p>Proudly supported by these amazing organizations who make this event possible.</p>
            </div>
        </div>
    );
};

export default SponsorsPage;
