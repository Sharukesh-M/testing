import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./admin-scanner.css";

// Updated Script URL
const GSHEET_URL = "https://script.google.com/macros/s/AKfycby9V3j0NK20A6oWAabArQKDLqPVkFu41aTOoyhxCbfiScNG91VHpw3hH7tfIwhB4Aue/exec";

const AdminPage = () => {
    const [scanResult, setScanResult] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [manualSearch, setManualSearch] = useState("");
    const [showPaymentProof, setShowPaymentProof] = useState(false);

    useEffect(() => {
        let scanner = null;

        if (isScanning && !scanResult) {
            scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    rememberLastUsedCamera: true
                },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText) {
                if (decodedText.startsWith("TX-")) {
                    setScanResult(decodedText);
                    setIsScanning(false);
                    fetchTeamData(decodedText);
                    scanner.clear().catch(console.error);
                }
            }

            function onScanFailure(err) {
                // ignore
            }
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(console.error);
            }
        };
    }, [isScanning, scanResult]);

    const fetchTeamData = async (teamId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${GSHEET_URL}?action=get_team&id=${teamId}`);
            const result = await response.json();

            if (result.status === "success") {
                setTeamData(result.data);
            } else {
                setError(result.message || "Team not found");
            }
        } catch (err) {
            setError("Failed to fetch team data. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const markAttendance = async () => {
        if (!teamData || !teamData.teamId) return;

        try {
            const response = await fetch(`${GSHEET_URL}?action=mark_attendance&id=${teamData.teamId}`);
            const result = await response.json();

            if (result.status === "success") {
                setTeamData({ ...teamData, attendance: "PRESENT" });
                alert(`✅ ${teamData.teamId} marked PRESENT!`);
            } else {
                alert("❌ Failed to mark attendance: " + result.message);
            }
        } catch (err) {
            alert("❌ Error marking attendance");
        }
    };

    const handleManualSearch = () => {
        if (manualSearch.trim()) {
            setScanResult(manualSearch.trim());
            fetchTeamData(manualSearch.trim());
        }
    };

    const handleStartScan = () => {
        setScanResult(null);
        setTeamData(null);
        setError(null);
        setIsScanning(true);
    };

    const handleCancelScan = () => {
        setIsScanning(false);
        setScanResult(null);
    };

    const handleScanNext = () => {
        setScanResult(null);
        setTeamData(null);
        setError(null);
        setIsScanning(true);
    };

    return (
        <div className="admin-scanner-page">
            <div className="admin-container">
                <h1 className="admin-title">🔍 ADMIN SCANNER</h1>
                <p className="admin-subtitle">Scan QR codes or search manually</p>

                {/* MANUAL SEARCH */}
                <div className="manual-search-section">
                    <input
                        type="text"
                        placeholder="Enter Team ID (e.g., TX-26001)"
                        value={manualSearch}
                        onChange={(e) => setManualSearch(e.target.value)}
                        className="manual-search-input"
                    />
                    <button onClick={handleManualSearch} className="search-btn">
                        🔍 SEARCH
                    </button>
                </div>

                {/* QR SCANNER */}
                {!isScanning && !scanResult && (
                    <button onClick={handleStartScan} className="start-scan-btn">
                        📷 START QR SCAN
                    </button>
                )}

                {isScanning && (
                    <div className="scanner-wrapper">
                        <div id="reader"></div>
                        <button onClick={handleCancelScan} className="cancel-scan-btn">
                            ❌ CANCEL SCAN
                        </button>
                    </div>
                )}

                {/* LOADING */}
                {loading && (
                    <div className="loading-box">
                        <div className="spinner"></div>
                        <p>Loading team data...</p>
                    </div>
                )}

                {/* ERROR */}
                {error && !loading && (
                    <div className="error-box">
                        <p>❌ {error}</p>
                        <button onClick={handleScanNext} className="scan-next-btn">
                            SCAN NEXT TEAM
                        </button>
                    </div>
                )}

                {/* TEAM DATA */}
                {teamData && !loading && (
                    <div className="team-data-card">
                        <div className="team-header">
                            <h2>{teamData.teamId}</h2>
                            <span className={`attendance-badge ${teamData.attendance === 'PRESENT' ? 'present' : 'absent'}`}>
                                {teamData.attendance || "ABSENT"}
                            </span>
                        </div>

                        <div className="team-info-grid">
                            <div className="info-item">
                                <span className="info-label">TEAM NAME</span>
                                <span className="info-value">{teamData.teamName || "N/A"}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">TEAM LEADER</span>
                                <span className="info-value">{teamData.name || "N/A"}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">TEAM SIZE</span>
                                <span className="info-value">{teamData.teamSize || "4"} Members</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">COLLEGE</span>
                                <span className="info-value">{teamData.college || "N/A"}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">DOMAIN</span>
                                <span className="info-value domain-highlight">{teamData.domain || "N/A"}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">EMAIL</span>
                                <span className="info-value">{teamData.email || "N/A"}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">PHONE</span>
                                <span className="info-value">{teamData.phone || "N/A"}</span>
                            </div>

                            <div className="info-item full-width">
                                <span className="info-label">TRANSACTION ID</span>
                                <span className="info-value transaction-id">{teamData.transactionId || "NOT PROVIDED"}</span>
                            </div>
                        </div>

                        {/* PAYMENT VERIFICATION SECTION */}
                        <div className="payment-section">
                            <h3 className="payment-title">💳 PAYMENT VERIFICATION</h3>

                            <div className="payment-status">
                                <span className="payment-label">Payment Status:</span>
                                <span className={`payment-badge ${teamData.transactionId ? 'paid' : 'unpaid'}`}>
                                    {teamData.transactionId ? "✅ PAID" : "❌ NOT PAID"}
                                </span>
                            </div>

                            {teamData.transactionId && (
                                <div className="transaction-details">
                                    <p><strong>Transaction ID:</strong> {teamData.transactionId}</p>
                                    <button
                                        onClick={() => setShowPaymentProof(!showPaymentProof)}
                                        className="view-proof-btn"
                                    >
                                        {showPaymentProof ? "HIDE" : "VIEW"} PAYMENT SCREENSHOT
                                    </button>
                                </div>
                            )}

                            {showPaymentProof && (
                                <div className="payment-proof-box">
                                    <p className="proof-note">
                                        📸 Payment screenshot should be verified in Google Sheet.<br />
                                        Check the "SCREENSHOT UPLOAD" column for the image link.
                                    </p>
                                    <a
                                        href={`https://docs.google.com/spreadsheets/d/${GSHEET_URL.split('/')[5]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="open-sheet-btn"
                                    >
                                        OPEN GOOGLE SHEET
                                    </a>
                                </div>
                            )}

                            {!teamData.transactionId && (
                                <div className="manual-payment-box">
                                    <p className="warning-text">⚠️ No transaction ID found. If payment was made manually at venue:</p>
                                    <button className="manual-verify-btn">
                                        MARK AS PAID (Manual Verification)
                                    </button>
                                    <p className="note-text">Note: This will update the Google Sheet</p>
                                </div>
                            )}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="action-buttons">
                            {teamData.attendance !== "PRESENT" && (
                                <button onClick={markAttendance} className="mark-present-btn">
                                    ✅ MARK ATTENDANCE
                                </button>
                            )}

                            {teamData.attendance === "PRESENT" && (
                                <div className="already-present">
                                    <p>✅ Already marked PRESENT</p>
                                </div>
                            )}

                            <button onClick={handleScanNext} className="scan-next-btn">
                                SCAN NEXT TEAM
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
