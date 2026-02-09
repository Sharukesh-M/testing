
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import "./admin-scanner.css";

// Updated Script URL
const GSHEET_URL = "https://script.google.com/macros/s/AKfycbx1rNH-6zvf2Xswd9_mSbMX2WDk5IPA83Lzyn-JxC1kSRL9W7nnpcEijB8eZzDiFS8Hsg/exec";

const AdminPage = () => {
    const [scanResult, setScanResult] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState(null);
    const [scannerInstance, setScannerInstance] = useState(null);

    useEffect(() => {
        // Initialize scanner only if not already scanning a result
        if (!scanResult) {
            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);
            setScannerInstance(scanner);

            function onScanSuccess(decodedText) {
                if (decodedText.startsWith("TX-")) {
                    setScanResult(decodedText);
                    fetchTeamData(decodedText);
                    scanner.clear(); // pause scanning
                }
            }

            function onScanFailure(err) {
                // ignore
            }

            return () => {
                scanner.clear().catch(err => console.error(err));
            };
        }
    }, [scanResult]); // Re-run if scanResult is cleared (to restart scanner)

    const fetchTeamData = async (teamId) => {
        setLoading(true);
        setError(null);
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

    const markAttendance = async () => {
        setMarking(true);
        try {
            const response = await fetch(`${GSHEET_URL}?action=mark_attendance&id=${encodeURIComponent(scanResult)}`);
            const result = await response.json();

            if (result.status === "success") {
                // Update local state to reflect change
                setTeamData(prev => ({ ...prev, attendance: "PRESENT" }));
                alert("SUCCESS: Team marked present!");
            } else {
                alert("ERROR: " + result.message);
            }
        } catch (err) {
            alert("Failed to mark attendance. Check connection.");
        } finally {
            setMarking(false);
        }
    };

    const handleNextScan = () => {
        setScanResult(null);
        setTeamData(null);
        setError(null);
        // Effect will re-trigger and restart scanner
    };

    return (
        <div className="admin-page-container">
            <h1 className="admin-title">ADMIN CONTROL</h1>

            {!scanResult ? (
                <div className="scanner-wrapper">
                    <div id="reader"></div>
                    <p className="scanner-instruction">Point camera at Team QR Code</p>
                </div>
            ) : (
                <div className="scan-result-container">
                    <button onClick={handleNextScan} className="scan-again-btn">
                        SCAN NEXT TEAM
                    </button>

                    {loading && <div className="loader">Fetching Data...</div>}

                    {error && <div className="error-box">{error}</div>}

                    {teamData && (
                        <motion.div
                            className="team-details-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {/* HEADER */}
                            <div className="card-header">
                                <h2 className="team-id">{teamData.teamId}</h2>
                                <span className={`status-badge ${teamData.attendance === "PRESENT" ? "present" : "absent"}`}>
                                    {teamData.attendance === "PRESENT" ? "ALREADY PRESENT" : "NOT YET HERE"}
                                </span>
                            </div>

                            {/* DETAILS */}
                            <div className="details-grid">
                                <div className="detail-item">
                                    <label>TEAM NAME</label>
                                    <span>{teamData.teamName}</span>
                                </div>
                                <div className="detail-item">
                                    <label>LEADER</label>
                                    <span>{teamData.name}</span>
                                </div>
                                <div className="detail-item">
                                    <label>COLLEGE</label>
                                    <span>{teamData.college}</span>
                                </div>
                                <div className="detail-item">
                                    <label>DOMAIN</label>
                                    <span>{teamData.domain}</span>
                                </div>
                                <div className="detail-item">
                                    <label>EMAIL</label>
                                    <span>{teamData.email}</span>
                                </div>
                            </div>

                            {/* PAYMENTS */}
                            <div className={`payment-status ${teamData.transactionId ? "paid" : "unpaid"}`}>
                                <span>PAYMENT STATUS: </span>
                                <strong>{teamData.transactionId ? "PAID" : "PENDING/FAILED"}</strong>
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
                                        {marking ? "MARKING..." : "MARK AS PRESENT ✅"}
                                    </button>
                                ) : (
                                    <div className="timestamp-info">
                                        Team checked in.
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
