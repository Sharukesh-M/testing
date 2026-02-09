
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import "./admin-scanner.css";

// Updated Script URL
const GSHEET_URL = "https://script.google.com/macros/s/AKfycby7XlJ0SI8Q3VxqV5_ppK1yeqdUV5halOfQZqREqKhAS8dxIOTOZn3Vf5FSAJGEYTVC/exec";

const AdminPage = () => {
    const [scanResult, setScanResult] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [manualId, setManualId] = useState("");

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
                /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText) {
                if (decodedText.startsWith("TX-")) {
                    setScanResult(decodedText);
                    setIsScanning(false); // Stop scanning UI
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
        setTeamData(null);

        try {
            const response = await fetch(`${GSHEET_URL}?action=get_team&id=${encodeURIComponent(teamId)}`);
            const result = await response.json();

            if (result.status === "success") {
                setTeamData(result.data);
            } else {
                setError(result.message || "Team not found.");
            }
        } catch (err) {
            setError("Network Error: Could not fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const handleManualSearch = (e) => {
        e.preventDefault();
        if (!manualId.trim()) return;
        setScanResult(manualId);
        fetchTeamData(manualId);
    };

    const markAttendance = async () => {
        setMarking(true);
        try {
            const response = await fetch(`${GSHEET_URL}?action=mark_attendance&id=${encodeURIComponent(scanResult)}`);
            const result = await response.json();

            if (result.status === "success") {
                setTeamData(prev => ({ ...prev, attendance: "PRESENT" }));
                alert("SUCCESS: Team marked present!");
            } else {
                alert("ERROR: " + result.message);
            }
        } catch (err) {
            alert("Failed to mark attendance.");
        } finally {
            setMarking(false);
        }
    };

    const handleReset = () => {
        setScanResult(null);
        setTeamData(null);
        setError(null);
        setIsScanning(false);
        setManualId("");
    };

    return (
        <div className="admin-page-container">
            <h1 className="admin-title">ADMIN CONTROL</h1>

            {/* INITIAL STATE: START BUTTON OR MANUAL SEARCH */}
            {!isScanning && !scanResult && (
                <div className="start-screen">
                    <button
                        className="start-scan-btn"
                        onClick={() => setIsScanning(true)}
                    >
                        📸 START QR SCAN
                    </button>

                    <div className="or-divider">OR</div>

                    <form onSubmit={handleManualSearch} className="manual-search-form">
                        <input
                            type="text"
                            placeholder="Enter Team ID (e.g. TX-26001)"
                            value={manualId}
                            onChange={(e) => setManualId(e.target.value)}
                            className="manual-input"
                        />
                        <button type="submit" className="manual-btn">SEARCH</button>
                    </form>
                </div>
            )}

            {/* SCANNING STATE */}
            {isScanning && !scanResult && (
                <div className="scanner-wrapper">
                    <div id="reader"></div>
                    <button
                        className="cancel-btn"
                        onClick={() => setIsScanning(false)}
                    >
                        CANCEL SCAN
                    </button>
                </div>
            )}

            {/* LOADING STATE */}
            {loading && <div className="loader">FETCHING DATA...</div>}

            {/* ERROR STATE */}
            {error && (
                <div className="error-box">
                    <p>{error}</p>
                    <button onClick={handleReset} className="retry-btn">TRY AGAIN</button>
                </div>
            )}

            {/* RESULT STATE */}
            {teamData && (
                <motion.div
                    className="scan-result-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        className="team-details-card"
                    >
                        {/* HEADER */}
                        <div className="card-header">
                            <div>
                                <h2 className="team-id">{teamData.teamId}</h2>
                                <span className="team-name-header">{teamData.teamName}</span>
                            </div>
                            <span className={`status-badge ${teamData.attendance === "PRESENT" ? "present" : "absent"}`}>
                                {teamData.attendance === "PRESENT" ? "PRESENT" : "ABSENT"}
                            </span>
                        </div>

                        {/* DETAILS */}
                        <div className="details-grid">
                            <div className="detail-item">
                                <label>Team Name</label>
                                <span>{teamData.teamName}</span>
                            </div>
                            <div className="detail-item">
                                <label>Leader</label>
                                <span>{teamData.name}</span>
                            </div>
                            <div className="detail-item">
                                <label>College</label>
                                <span>{teamData.college}</span>
                            </div>
                            <div className="detail-item">
                                <label>Domain</label>
                                <span>{teamData.domain}</span>
                            </div>
                            <div className="detail-item full-width">
                                <label>Email</label>
                                <span>{teamData.email}</span>
                            </div>
                            <div className="detail-item full-width">
                                <label>Phone</label>
                                <span>{teamData.phone || "N/A"}</span>
                            </div>
                        </div>

                        {/* PAYMENTS */}
                        <div className={`payment-status ${teamData.transactionId ? "paid" : "unpaid"}`}>
                            <span>PAYMENT STATUS</span>
                            <strong>{teamData.transactionId ? "VERIFIED PAID" : "PENDING"}</strong>
                            {teamData.transactionId && <div className="trans-id">Ref: {teamData.transactionId}</div>}
                        </div>

                        {/* ACTIONS */}
                        <div className="action-buttons">
                            {teamData.attendance !== "PRESENT" ? (
                                <button
                                    className="mark-present-btn"
                                    onClick={markAttendance}
                                    disabled={marking}
                                >
                                    {marking ? "UPDATING..." : "MARK AS PRESENT ✅"}
                                </button>
                            ) : (
                                <div className="timestamp-info">
                                    ALREADY CHECKED IN
                                </div>
                            )}

                            <button onClick={handleReset} className="scan-again-btn">
                                SCAN NEXT TEAM
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminPage;
