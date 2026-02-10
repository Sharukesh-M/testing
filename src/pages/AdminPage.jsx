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
            // Dynamic QR Box Size for Mobile
            const qrBoxSize = window.innerWidth < 600 ? 250 : 300;

            scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: { width: qrBoxSize, height: qrBoxSize },
                    aspectRatio: 1.0,
                    rememberLastUsedCamera: true
                },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText) {
                // Determine if it's a valid ID format (TX-XXXXX)
                // Relaxed checking to allow for different ID formats if needed
                if (decodedText.length > 5) {
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
            console.log("Fetching team data for:", teamId);
            const response = await fetch(`${GSHEET_URL}?action=get_team&id=${teamId}`);
            const result = await response.json();
            console.log("Team data result:", result);

            if (result.status === "success") {
                setTeamData(result.data);
            } else {
                setError(result.message || "Team not found");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch team data. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const markAttendance = async () => {
        const tId = getVal(teamData, ['teamId', 'Team ID', 'id']);
        if (!teamData || !tId) return;

        try {
            const response = await fetch(`${GSHEET_URL}?action=mark_attendance&id=${tId}`);
            const result = await response.json();

            if (result.status === "success") {
                setTeamData({ ...teamData, attendance: "PRESENT" });
                alert(`✅ ${tId} marked PRESENT!`);
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

    // Helper to extract values checking multiple possible keys
    const getVal = (obj, keys, defaultVal = "N/A") => {
        if (!obj) return defaultVal;
        for (const key of keys) {
            if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
                return obj[key];
            }
        }
        return defaultVal;
    };

    // Helper to get members list
    const getMembers = (obj) => {
        if (!obj) return [];

        let membersList = [];

        // 1. Try explicit list field first
        const rawMembers = getVal(obj, ['team_members', 'Team Members', 'members', 'Team Member Details'], null);

        if (rawMembers) {
            if (Array.isArray(rawMembers)) {
                membersList = rawMembers;
            } else if (typeof rawMembers === 'string' && rawMembers !== "N/A") {
                membersList = rawMembers.split(',').map(m => m.trim()).filter(m => m);
            }
        }

        // 2. If no list found, scan for individual fields (e.g., "Member 1 Name", "Team Member 2")
        if (membersList.length === 0) {
            const memberKeys = Object.keys(obj).filter(key =>
                /member.*name|name.*member|student.*name|participant/i.test(key) &&
                !/leader|team name|size|email|phone/i.test(key) // Exclude leader/meta info
            );

            // Sort keys to maintain order (Member 1, Member 2...)
            memberKeys.sort();

            memberKeys.forEach(key => {
                const val = obj[key];
                if (val && typeof val === 'string' && val.trim() !== "" && val !== "N/A") {
                    membersList.push(val.trim());
                }
            });
        }

        return membersList;
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
                            <h2>{getVal(teamData, ['teamId', 'Team ID', 'id'])}</h2>
                            <span className={`attendance-badge ${getVal(teamData, ['attendance', 'Attendance']) === 'PRESENT' ? 'present' : 'absent'}`}>
                                {getVal(teamData, ['attendance', 'Attendance']) || "ABSENT"}
                            </span>
                        </div>

                        <div className="team-info-grid">
                            <div className="info-item">
                                <span className="info-label">TEAM NAME</span>
                                <span className="info-value">{getVal(teamData, ['teamName', 'Team Name', 'team_name', 'Team_Name', 'Project Title', 'Title'])}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">TEAM LEADER</span>
                                <span className="info-value">{getVal(teamData, ['name', 'Name', 'Team Leader Name', 'leader_name', 'Leader Name', 'Full Name'])}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">TEAM SIZE</span>
                                <span className="info-value">{getVal(teamData, ['teamSize', 'Team Size', 'team_size', 'Number of Members', 'NO OF TEAM MEMBERS', 'NO OF TEAM MEMBERS(COLUMN)'], "4")} Members</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">COLLEGE</span>
                                <span className="info-value">{getVal(teamData, ['college', 'College', 'Institute', 'Institution', 'University', 'College Name', 'College/Institute'])}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">DOMAIN</span>
                                <span className="info-value domain-highlight">{getVal(teamData, ['domain', 'Domain', 'Track', 'Theme', 'Selected Domain'])}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">EMAIL</span>
                                <span className="info-value">{getVal(teamData, ['email', 'Email', 'Email Address', 'lead_email', 'Email ID'])}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">PHONE</span>
                                <span className="info-value">{getVal(teamData, ['phone', 'Phone', 'Phone Number', 'lead_phone', 'Mobile', 'Contact Number'])}</span>
                            </div>

                            <div className="info-item full-width">
                                <span className="info-label">TRANSACTION ID</span>
                                <span className="info-value transaction-id">{getVal(teamData, ['transactionId', 'Transaction ID', 'payment_id', 'Transaction Reference ID'])}</span>
                            </div>

                            {/* Members Section */}
                            <div className="info-item full-width members-section">
                                <span className="info-label">TEAM MEMBERS</span>
                                <ul className="members-list">
                                    {getMembers(teamData).length > 0 ? (
                                        getMembers(teamData).map((member, idx) => (
                                            <li key={idx} className="member-chip">
                                                {typeof member === 'object' ? (member.name || JSON.stringify(member)) : member}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="member-chip">No additional members found</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* DEBUG: RAW DATA TOGGLE */}
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button
                                onClick={() => console.log(teamData) || alert(JSON.stringify(teamData, null, 2))}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #555',
                                    color: '#888',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                🐞 DEBUG: SHOW RAW DATA
                            </button>
                        </div>

                        {/* PAYMENT VERIFICATION SECTION */}
                        <div className="payment-section">
                            <h3 className="payment-title">💳 PAYMENT VERIFICATION</h3>

                            {(() => {
                                const txnId = getVal(teamData, ['transactionId', 'Transaction ID', 'payment_id'], "");
                                return (
                                    <>
                                        <div className="payment-status">
                                            <span className="payment-label">Payment Status:</span>
                                            <span className={`payment-badge ${txnId && txnId !== "N/A" ? 'paid' : 'unpaid'}`}>
                                                {txnId && txnId !== "N/A" ? "✅ PAID" : "❌ NOT PAID"}
                                            </span>
                                        </div>

                                        {txnId && txnId !== "N/A" && (
                                            <div className="transaction-details">
                                                <p><strong>Transaction ID:</strong> {txnId}</p>
                                                <button
                                                    onClick={() => setShowPaymentProof(!showPaymentProof)}
                                                    className="view-proof-btn"
                                                >
                                                    {showPaymentProof ? "HIDE" : "VIEW"} PAYMENT SCREENSHOT
                                                </button>
                                            </div>
                                        )}

                                        {!txnId || txnId === "N/A" && (
                                            <div className="manual-payment-box">
                                                <p className="warning-text">⚠️ No transaction ID found. If payment was made manually at venue:</p>
                                                <button className="manual-verify-btn">
                                                    MARK AS PAID (Manual Verification)
                                                </button>
                                                <p className="note-text">Note: This will update the Google Sheet</p>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}

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

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="action-buttons">
                            {getVal(teamData, ['attendance', 'Attendance']) !== "PRESENT" && (
                                <button onClick={markAttendance} className="mark-present-btn">
                                    ✅ MARK ATTENDANCE
                                </button>
                            )}

                            {getVal(teamData, ['attendance', 'Attendance']) === "PRESENT" && (
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
