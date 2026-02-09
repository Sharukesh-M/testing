import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import './IDCard.css';

const IDCard = ({ data, teamId, onClose }) => {
    const cardRef = useRef(null);
    const bgImage = "/entry.png"; // User's custom background

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    scale: 3,
                    useCORS: true,
                    backgroundColor: null,
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `TechathonX_EntryPass_${teamId}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error("Failed to generate ID card", err);
                alert("Failed to download. Please take a screenshot.");
            }
        }
    };

    return (
        <div className="id-card-modal-overlay">
            <div className="id-card-wrapper-dl">

                <div
                    className="id-card-content"
                    ref={cardRef}
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* HEADER */}
                    <div className="id-header">
                        <h1 className="id-event-title">TECHATHON X 2K26</h1>
                        <p className="id-subtitle">Official Entry Pass</p>
                    </div>

                    {/* QR CODE */}
                    <div className="id-qr-section">
                        <div className="qr-wrapper">
                            <QRCodeCanvas
                                value={teamId}
                                size={140}
                                fgColor="#000000"
                                bgColor="#ffffff"
                                level="H"
                            />
                        </div>
                    </div>

                    {/* TEAM DETAILS */}
                    <div className="id-details-section">
                        <div className="id-detail-row">
                            <span className="id-label">TEAM ID</span>
                            <span className="id-value id-team-id">{teamId}</span>
                        </div>

                        <div className="id-detail-row">
                            <span className="id-label">TEAM NAME</span>
                            <span className="id-value id-team-name">{data.teamName || "N/A"}</span>
                        </div>

                        <div className="id-detail-row">
                            <span className="id-label">TEAM LEADER</span>
                            <span className="id-value id-leader-name">{data.name || "N/A"}</span>
                        </div>

                        <div className="id-detail-row">
                            <span className="id-label">TEAM SIZE</span>
                            <span className="id-value">{data.teamSize || "4"} Members</span>
                        </div>

                        <div className="id-detail-row">
                            <span className="id-label">DOMAIN</span>
                            <span className="id-value id-domain">{data.domain || "N/A"}</span>
                        </div>
                    </div>

                    {/* VENUE */}
                    <div className="id-venue-section">
                        <p className="venue-label">VENUE</p>
                        <p className="venue-text">Main Auditorium & Central Library</p>
                    </div>

                    {/* FOOTER */}
                    <div className="id-footer">
                        <p className="id-auth-text">Authorized by TechathonX 2K26 Committee</p>
                    </div>
                </div>

                {/* DOWNLOAD BUTTON */}
                <div className="id-actions">
                    <h2 className="download-title">YOUR OFFICIAL ENTRY PASS</h2>
                    <p className="download-subtitle">
                        {!bgImage.includes('entry.png') && (
                            <span style={{ color: '#ff6b6b' }}>
                                ⚠️ Convert entry.pdf to entry.png and place in public folder for custom background
                            </span>
                        )}
                        {bgImage.includes('entry.png') && "Save this pass and present it at the venue"}
                    </p>

                    <button onClick={handleDownload} className="download-btn-gold">
                        📥 DOWNLOAD ENTRY PASS
                    </button>

                    <button onClick={onClose} className="close-btn-transparent">
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IDCard;
