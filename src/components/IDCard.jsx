import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import './IDCard.css';

const IDCard = ({ data, teamId, onClose }) => {
    const cardRef = useRef(null);

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    scale: 2,
                    backgroundColor: '#1A0B2E',
                    useCORS: true
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
            <div className="id-card-wrapper-dl" style={{ textAlign: 'center' }}>
                <div className="id-card-content" ref={cardRef}>
                    <div className="id-card-header">
                        <h2 className="id-card-title">TECHATHONX'26</h2>
                        <p style={{ letterSpacing: '2px', color: '#D4AF37', fontSize: '0.8rem', marginTop: '5px' }}>OFFICIAL ENTRY PASS</p>
                    </div>

                    <div className="qr-section">
                        <QRCodeCanvas value={teamId} size={120} fgColor="#1A0B2E" />
                    </div>

                    <div className="id-card-details">
                        <div className="detail-row">
                            <span className="detail-label">TEAM ID</span>
                            <span className="detail-value" style={{ color: '#00ffea' }}>{teamId}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">TEAM NAME</span>
                            <span className="detail-value">{data.teamName}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">TEAM LEAD</span>
                            <span className="detail-value">{data.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">COLLEGE</span>
                            <span className="detail-value" style={{ fontSize: '0.8rem', maxWidth: '200px', textAlign: 'right' }}>
                                {data.college || "KSRIET"}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">DOMAIN</span>
                            <span className="detail-value">{data.domain || "OPEN INNOVATION"}</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '20px' }}>
                        Authorized by TechathonX Committee<br />
                        Verification ID: {data.transactionId?.slice(-6)}
                    </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ color: '#fff', marginBottom: '10px' }}>Registration Successful! Please download your ID Card.</p>
                    <button onClick={handleDownload} className="download-btn">DOWNLOAD PASS</button>
                    <button onClick={onClose} style={{
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        marginLeft: '15px',
                        cursor: 'pointer'
                    }}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default IDCard;
