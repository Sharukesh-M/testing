
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import './IDCard.css';

const IDCard = ({ data, teamId, onClose }) => {
    const cardRef = useRef(null);

    // Path to the image the user will upload
    // Instruct user to place "id_card_bg.png" in the "public" folder
    const bgImage = "/id_card_bg.png";

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                // Wait for images to load before capturing
                const canvas = await html2canvas(cardRef.current, {
                    scale: 3, // High resolution
                    useCORS: true,
                    backgroundColor: null, // Transparent background
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `TechathonX_ID_${data.teamName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error("Failed to generate ID card", err);
                alert("Failed to download. Please take a screenshot manually.");
            }
        }
    };

    return (
        <div className="id-card-modal-overlay">
            <div className="id-card-wrapper-dl">

                {/* 
                    This is the capture area. 
                    It uses the background image if available.
                */}
                <div
                    className="id-card-content"
                    ref={cardRef}
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        // Fallback gradient if image not found or loading
                        backgroundColor: '#1a0b2e'
                    }}
                >
                    {/* 
                        ADJUST THESE CLASS NAMES IN CSS TO MATCH YOUR IMAGE LAYOUT 
                        You might need to change 'top', 'left', etc. in CSS 
                        based on where the empty slots are in your design.
                    */}

                    {/* QR Code Position */}
                    <div className="qr-section" style={{
                        marginTop: '160px', // Adjust this to move QR down/up
                        background: 'white',
                        padding: '5px',
                        borderRadius: '8px'
                    }}>
                        <QRCodeCanvas
                            value={teamId}
                            size={100}
                            fgColor="#000000"
                            bgColor="#ffffff"
                            level="H"
                        />
                    </div>

                    {/* Text Details Position */}
                    <div className="id-card-details" style={{
                        marginTop: '20px', // Adjust spacing from QR
                        width: '80%',
                    }}>
                        <div className="detail-row">
                            <span className="detail-label">ID</span>
                            <span className="detail-value" style={{ color: '#00ffea' }}>{teamId}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">TEAM</span>
                            <span className="detail-value">{data.teamName}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">LEADER</span>
                            <span className="detail-value">{data.name}</span>
                        </div>

                        {/* Optional: Add College/Domain if your design has space */}
                        {/* 
                         <div className="detail-row">
                            <span className="detail-label">COLLEGE</span>
                            <span className="detail-value">{data.college}</span>
                         </div> 
                         */}
                    </div>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '10px' }}>
                        YOUR OFFICIAL ID CARD
                    </h2>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>
                        If the background image is missing, place <b>id_card_bg.png</b> in the <b>public</b> folder.
                    </p>

                    <button onClick={handleDownload} className="download-btn">
                        DOWNLOAD ID
                    </button>

                    <button onClick={onClose} style={{
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        marginLeft: '15px',
                        cursor: 'pointer'
                    }}>
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IDCard;
