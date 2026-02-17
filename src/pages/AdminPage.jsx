
import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./admin-scanner.css";

// API Base URL - Update this if your backend is hosted elsewhere
// Assuming the backend runs on port 8000 locally or a deployed URL
// For Vercel deployment, this might needs to be the backend URL
const API_BASE_URL = "https://client.linupadippurakkal.com";
// Note: If testing locally, ensure backend is running. 
// If deployed, replace with https://your-backend-app.vercel.app

const AdminPage = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const scannerRef = useRef(null);

    // App State
    const [currentView, setCurrentView] = useState("dashboard"); // dashboard, edit-payment, view-sheet, total-team, total-present, total-paid
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visitorCount, setVisitorCount] = useState(0);

    // Scanner/Selection State
    const [scannedTeam, setScannedTeam] = useState(null);
    const [scanTime, setScanTime] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [manualSearch, setManualSearch] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);

    // Initial Fetch on Login

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllTeams();

            // Visitor Count Fetch
            const fetchVisitorCount = async () => {
                try {
                    // Using CounterAPI.dev persistent counter
                    const res = await fetch("https://api.counterapi.dev/v1/techathonx2k26/homepage_visits");
                    if (res.ok) {
                        const data = await res.json();
                        setVisitorCount(data.count || 0);
                    }
                } catch (e) {
                    console.error("Failed to fetch visitor count:", e);
                }
            };
            fetchVisitorCount();
        }
    }, [isAuthenticated]);


    const handleRefresh = async () => {
        await fetchAllTeams();
        try {
            const res = await fetch("https://api.counterapi.dev/v1/techathonx2k26/homepage_visits");
            if (res.ok) {
                const data = await res.json();
                setVisitorCount(data.count || visitorCount);
            }
        } catch (e) {
            console.error("Failed to refresh visitor count:", e);
        }
    };

    // Cleanup scanner when view changes or component unmounts
    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
                scannerRef.current = null;
            }
        };
    }, [currentView]);

    // Scanner Effect
    useEffect(() => {
        let timer = null;

        const onScanSuccess = (decodedText) => {
            if (decodedText && decodedText.length > 2) {
                handleSearch(decodedText);
                setIsScanning(false);
                // Cleanup handles the rest
            }
        };

        if (isAuthenticated && isScanning && !scannedTeam) {
            // Delay initialization to ensure DOM is ready
            timer = setTimeout(() => {
                const element = document.getElementById("reader");
                if (!element) {
                    console.error("Scanner reader element not found");
                    return;
                }

                // Double check cleanup
                if (scannerRef.current) {
                    try { scannerRef.current.clear(); } catch (e) { /* ignore */ }
                    scannerRef.current = null;
                }

                const qrBoxSize = window.innerWidth < 600 ? 250 : 300;
                const scanner = new Html5QrcodeScanner(
                    "reader",
                    {
                        fps: 10,
                        qrbox: { width: qrBoxSize, height: qrBoxSize },
                        aspectRatio: 1.0,
                        rememberLastUsedCamera: true
                    },
                    false
                );

                scannerRef.current = scanner;

                scanner.render(onScanSuccess, (err) => {
                    // ignore errors
                });

            }, 150);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (scannerRef.current) {
                scannerRef.current.clear().catch(e => console.warn("Failed to clear scanner", e));
                scannerRef.current = null;
            }
        };
    }, [isAuthenticated, isScanning, scannedTeam]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "techathonx2k26" && password === "techathonx2026") {
            setIsAuthenticated(true);
            setLoginError("");
        } else {
            setLoginError("Invalid Username or Password");
        }
    };

    const handleViewChange = (newView) => {
        setIsScanning(false);
        if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            scannerRef.current = null;
        }
        setCurrentView(newView);
    };

    const [debugData, setDebugData] = useState(null);

    const fetchAllTeams = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log(`Fetching from: ${API_BASE_URL}/teams`);
            const res = await fetch(`${API_BASE_URL}/teams`);
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText} \n ${text}`);
            }
            const data = await res.json();
            console.log("API Response:", data);
            setDebugData(data); // Save for debug view

            // Handle potential response structures
            if (Array.isArray(data)) {
                setTeams(data);
            } else if (data.teams && Array.isArray(data.teams)) {
                setTeams(data.teams);
            } else if (data.data && Array.isArray(data.data)) {
                setTeams(data.data);
            } else {
                console.warn("Unexpected data format:", data);
                setError("Received data is not a list of teams.");
                setTeams([]);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load team data. Is the backend running?");
            setTeams([]);
            // Mock data for development if backend fails (Optional, but good for UI testing)
            // setTeams([{ team_id: "T001", teamName: "Alpha", name: "John", payment_status: "PAID" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        if (!teams || teams.length === 0) return;

        const found = teams.find(t => {
            // Robust check for fields
            const tId = t.team_id || t.teamId || "";
            const email = t.lead_email || t.email || "";
            const tName = t.teamName || "";
            const lName = t.name || "";

            return tId.toLowerCase() === query.toLowerCase() ||
                email.toLowerCase() === query.toLowerCase() ||
                tName.toLowerCase().includes(query.toLowerCase()) ||
                lName.toLowerCase().includes(query.toLowerCase());
        });

        if (found) {
            setScannedTeam(found);
            setScanTime(new Date().toLocaleString()); // Set scan time
            setSelectedMember(null); // Reset member selection
            if (currentView === "dashboard") {
                setCurrentView("scanner-view"); // Directly go to scanner view to show details
            }
        } else {
            alert("Team not found in loaded data!");
        }
    };

    const updatePaymentStatus = async (teamId, newStatus) => {
        try {
            console.log(`Updating payment for ${teamId} to ${newStatus}`);
            let res;
            try {
                res = await fetch(`${API_BASE_URL}/update_payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ team_id: teamId, status: newStatus })
                });
            } catch (networkErr) {
                console.error("Network Fetch Error:", networkErr);
                throw new Error("Could not connect to backend. Is it running? (Network Error)");
            }

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server Error (${res.status}): ${text}`);
            }

            const data = await res.json();
            if (data.status === "success" || data.message) {
                // Update local state
                setTeams(prevTeams => prevTeams.map(t =>
                    t.team_id === teamId ? { ...t, payment_status: newStatus ? "PAID" : "UNPAID" } : t
                ));
                // Also update scanned team if it matches
                if (scannedTeam && scannedTeam.team_id === teamId) {
                    setScannedTeam(prev => ({ ...prev, payment_status: newStatus ? "PAID" : "UNPAID" }));
                }
                alert("Payment status updated successfully!");
            } else {
                alert("Failed to update status: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            alert("Error updating payment: " + err.message);
        }
    };

    const markAttendance = async (teamId, status, memberName = null) => {
        try {
            const timestamp = new Date().toLocaleString();
            console.log(`Marking attendance for ${teamId} to ${status} at ${timestamp}`);

            // Optimistically update local state for immediate feedback
            if (scannedTeam && scannedTeam.team_id === teamId) {
                // Format: "12/02/2026, 10:30:00 AM" (approx)
                setScanTime(timestamp);
            }

            let res;
            try {
                res = await fetch(`${API_BASE_URL}/mark_attendance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        team_id: teamId,
                        status: status,
                        member_name: memberName,
                        timestamp: timestamp // Send client timestamp
                    })
                });
            } catch (networkErr) {
                console.error("Network Fetch Error:", networkErr);
                throw new Error("Could not connect to backend. Is it running? (Network Error)");
            }

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server Error (${res.status}): ${text}`);
            }

            const data = await res.json();
            if (data.status === "success" || data.message) {
                // Update local state
                setTeams(prevTeams => prevTeams.map(t => {
                    if (t.team_id !== teamId) return t;
                    if (!memberName) {
                        return { ...t, attendance: status ? "PRESENT" : "ABSENT" };
                    }
                    return t;
                }));

                // Update Scanned Team View if active
                if (scannedTeam && scannedTeam.team_id === teamId) {
                    setScannedTeam(prev => ({ ...prev, attendance: status ? "PRESENT" : "ABSENT" }));
                }

                if (memberName) {
                    alert(`Attendance marked for ${memberName}`);
                    fetchAllTeams();
                } else {
                    alert("Team Attendance Marked!");
                }
            } else {
                alert("Failed to mark attendance: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            alert("Error marking attendance: " + err.message);
        }
    }

    // --- RENDER HELPERS ---

    const renderDashboard = () => {
        const totalTeams = teams.length;
        const totalPaid = teams.filter(t => t.payment_status === "PAID").length; // Fixed strict check
        const totalPresent = teams.filter(t => t.attendance === "PRESENT").length;
        const totalAbsent = totalTeams - totalPresent;

        return (
            <div className="dashboard-grid-container">
                {/* VISITOR COUNT & TOP DATA */}
                <div className="top-stats-row" style={{ marginBottom: '1.5rem' }}>
                    <div className="visitor-badge" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: '#334155', padding: '0.5rem 1rem', borderRadius: '0.5rem',
                        border: '1px solid #475569', color: '#f8fafc', fontWeight: 'bold'
                    }}>
                        <span style={{ color: '#3b82f6' }}>👥 VISITORS:</span>
                        <span style={{ fontSize: '1.2rem' }}>{visitorCount}</span>
                    </div>
                </div>

                {/* GLOBAL SEARCH & SCAN */}
                <div className="action-row top" style={{ marginBottom: '2rem', width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="search-bar" style={{ flex: 1, minWidth: '300px' }}>
                        <input
                            type="text"
                            placeholder="🔍 Global Search by Team ID or Email..."
                            value={manualSearch}
                            onChange={(e) => setManualSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(manualSearch)}
                            style={{ width: '100%', padding: '1rem', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button className="dash-btn scan-btn large" onClick={() => { setCurrentView("scanner-view"); setIsScanning(true); _setScannedTeam(null); }}>
                        📷 SCAN QR
                    </button>
                    <button className="dash-btn" onClick={() => handleSearch(manualSearch)}>SEARCH</button>
                </div>

                <div className="dashboard-grid">
                    <div className="stat-card" onClick={() => handleViewChange("total-team")}>
                        <h3>TOTAL TEAMS</h3>
                        <p>{totalTeams}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleViewChange("total-present")}>
                        <h3>TOTAL PRESENT</h3>
                        <p>{totalPresent}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleViewChange("total-absent")} style={{ background: '#ef4444' }}>
                        <h3>TOTAL ABSENT</h3>
                        <p>{totalAbsent}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleViewChange("total-paid")}>
                        <h3>TOTAL PAID</h3>
                        <p>{totalPaid}</p>
                    </div>
                </div>

                {/* Custom Action Buttons */}
                <div className="action-row">
                    <button className="dash-btn" onClick={() => handleViewChange("edit-payment")}>
                        📝 EDIT PAYMENT
                    </button>
                    <button className="dash-btn" onClick={() => handleViewChange("view-sheet")}>
                        📊 VIEW SHEET
                    </button>
                    <button className="dash-btn" onClick={() => handleViewChange("total-team")}>
                        👥 ALL TEAMS
                    </button>
                </div>

                {/* DEBUG SECTION */}
                <div style={{ marginTop: '3rem', padding: '1rem', background: '#334155', borderRadius: '1rem', maxWidth: '100%', overflow: 'hidden' }}>
                    <h4 style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>🔧 Debug Info</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        API URL: {API_BASE_URL}<br />
                        Teams Loaded: {teams.length}<br />
                        Loading: {loading ? "Yes" : "No"}<br />
                        Error: {error || "None"}
                    </p>
                    <button
                        onClick={fetchAllTeams}
                        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#475569', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                        🔄 Force Refresh Data
                    </button>
                    {error && (
                        <div style={{ marginTop: '1rem', background: '#1e293b', padding: '1rem', borderRadius: '0.5rem', maxHeight: '200px', overflow: 'auto' }}>
                            <code style={{ color: '#ef4444', fontSize: '0.8rem' }}>{JSON.stringify(error, null, 2)}</code>
                        </div>
                    )}
                    <div style={{ marginTop: '1rem' }}>
                        <details>
                            <summary style={{ color: '#cbd5e1', cursor: 'pointer' }}>View Raw Response (First 2 items)</summary>
                            <pre style={{ marginTop: '0.5rem', background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', color: '#10b981', fontSize: '0.8rem', overflow: 'auto' }}>
                                {JSON.stringify(teams.slice(0, 2), null, 2)}
                            </pre>
                        </details>
                    </div>
                </div>
            </div>
        );
    };

    const renderTeamList = (filterFn, title, extraColumns = null, extraHeaders = null) => {
        const filtered = teams.filter(filterFn);
        return (
            <div className="list-view">
                <div className="list-header">
                    <h2>{title} ({filtered.length})</h2>
                    <button onClick={() => setCurrentView("dashboard")} className="back-btn">⬅ BACK</button>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by ID or Name..."
                            onChange={(e) => setManualSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Team Name</th>
                                <th>Leader Name</th>
                                {extraHeaders}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.filter(t =>
                                !manualSearch ||
                                (t.team_id && t.team_id.toLowerCase().includes(manualSearch.toLowerCase())) ||
                                (t.teamName && t.teamName.toLowerCase().includes(manualSearch.toLowerCase()))
                            ).map(team => (
                                <tr key={team.team_id}>
                                    <td style={{ fontWeight: 'bold', color: '#fbbf24' }}>{team.team_id}</td>
                                    <td>{team.teamName || "N/A"}</td>
                                    <td>{team.name || "N/A"}</td>
                                    {extraColumns && extraColumns(team)}
                                    <td>
                                        <button onClick={() => { setScannedTeam(team); setCurrentView("scanner-view"); }} className="action-btn small">
                                            VIEW
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderEditPayment = () => renderTeamList(
        () => true,
        "Edit Payment",
        (team) => (
            <>
                <td>{team.transaction_id || "N/A"}</td>
                <td>
                    {team.screenshot_url ? (
                        <a href={team.screenshot_url} target="_blank" rel="noreferrer" className="link-btn">View Proof</a>
                    ) : (
                        <span className="no-proof">No Proof</span>
                    )}
                </td>
                <td>
                    <select
                        value={team.payment_status === "PAID" ? "PAID" : "UNPAID"}
                        onChange={(e) => updatePaymentStatus(team.team_id, e.target.value === "PAID")}
                        className={`status-select ${team.payment_status === "PAID" ? "success" : "warning"}`}
                    >
                        <option value="UNPAID">UNPAID</option>
                        <option value="PAID">PAID</option>
                    </select>
                </td>
            </>
        ),
        <>
            <th>Txn ID</th>
            <th>Proof</th>
            <th>Status</th>
        </>
    );



    const renderTotalPaid = () => renderTeamList(
        (t) => t.payment_status === "PAID",
        "Total Paid Teams",
        (team) => (
            <>
                <td>{team.transaction_id || "N/A"}</td>
                <td>
                    {team.screenshot_url ? (
                        <a href={team.screenshot_url} target="_blank" rel="noreferrer" className="link-btn">View Proof</a>
                    ) : (
                        <span className="no-proof">No Proof</span>
                    )}
                </td>
                <td><span className="status-badge success">PAID</span></td>
            </>
        ),
        <>
            <th>Txn ID</th>
            <th>Proof</th>
            <th>Status</th>
        </>
    );

    const renderTotalAbsentList = () => renderTeamList(
        (t) => t.attendance !== "PRESENT",
        "Total Absent Teams",
        (team) => (
            <>
                <td><span className="status-badge error">ABSENT</span></td>
            </>
        ),
        <>
            <th>Attendance</th>
        </>
    );

    const renderTotalPresentList = () => renderTeamList(
        (t) => t.attendance === "PRESENT",
        "Total Present Teams",
        (team) => (
            <>
                <td><span className="status-badge success">PRESENT</span></td>
            </>
        ),
        <>
            <th>Attendance</th>
        </>
    );

    const renderViewSheet = () => {
        if (!teams || teams.length === 0) return <div>No data to display</div>;

        // Dynamically get all keys from the first team object, excluding some internal ones if needed
        const allKeys = Object.keys(teams[0]);

        return (
            <div className="sheet-view">
                <div className="list-header">
                    <h2>Full Sheet Data (Dynamic)</h2>
                    <button onClick={() => setCurrentView("dashboard")} className="back-btn">⬅ BACK</button>
                </div>
                <div className="table-responsive">
                    <table className="admin-table tiny">
                        <thead>
                            <tr>
                                {allKeys.map(key => (
                                    <th key={key}>{key.toUpperCase().replace(/_/g, ' ')}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((t, idx) => (
                                <tr key={t.team_id || idx}>
                                    {allKeys.map(key => (
                                        <td key={key}>
                                            {typeof t[key] === 'object' ? JSON.stringify(t[key]) : t[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // Clean helper to set Scanned Team to null when changing logic
    const _setScannedTeam = (val) => {
        setScannedTeam(val);
    }

    const renderScannerView = () => {
        if (scannedTeam) {
            return (
                <div className="detail-view">
                    <button onClick={() => { _setScannedTeam(null); setScanTime(null); setCurrentView("dashboard"); }} className="back-btn">⬅ BACK</button>

                    <div className="team-detail-card">
                        <div className="detail-header">
                            <h2>{scannedTeam.teamName}</h2>
                            <span className="id-badge">{scannedTeam.team_id}</span>
                        </div>

                        {/* TIMESTAMP DISPLAY */}
                        <div style={{ textAlign: 'center', margin: '1rem 0', color: '#fbbf24', fontWeight: 'bold' }}>
                            SCAN TIME: {scanTime || "Just Now"}
                        </div>

                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Payment Status</label>
                                <div className="status-row">
                                    <span className={`status-badge ${scannedTeam.payment_status === "PAID" ? "success" : "error"}`}>
                                        {scannedTeam.payment_status || "UNPAID"}
                                    </span>
                                    {scannedTeam.payment_status !== "PAID" && (
                                        <button onClick={() => updatePaymentStatus(scannedTeam.team_id, true)} className="action-btn small">
                                            Mark Paid
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="detail-item">
                                <label>Attendance</label>
                                <div className="status-row">
                                    <span className={`status-badge ${scannedTeam.attendance === "PRESENT" ? "success" : "warning"}`}>
                                        {scannedTeam.attendance || "ABSENT"}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <label>Transaction ID</label>
                                <span>{scannedTeam.transaction_id || "N/A"}</span>
                            </div>

                            {/* EXTRA DETAILS SECTION */}
                            <div className="detail-item">
                                <label>College</label>
                                <span>{scannedTeam.college || "N/A"}</span>
                            </div>

                            <div className="detail-item full">
                                <label>Team Leader Details</label>
                                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem' }}>
                                    <p style={{ margin: '0.2rem 0' }}><strong>Name:</strong> {scannedTeam.name}</p>
                                    <p style={{ margin: '0.2rem 0' }}><strong>Phone:</strong> {scannedTeam.lead_phone || scannedTeam.phone || scannedTeam['Phone Number'] || scannedTeam.PhoneNumber || "N/A"}</p>
                                    <p style={{ margin: '0.2rem 0' }}><strong>Email:</strong> {scannedTeam.lead_email || scannedTeam.email || scannedTeam['Email Address'] || scannedTeam.Email || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* MEMBER DROPDOWN */}
                        <div className="detail-item full" style={{ marginTop: '1rem' }}>
                            <label>View Member Details (Select to view)</label>
                            <select
                                onChange={(e) => {
                                    const member = scannedTeam.team_members?.find(m => m.name === e.target.value);
                                    setSelectedMember(member);
                                }}
                                style={{
                                    width: '100%', padding: '0.8rem', borderRadius: '0.5rem',
                                    background: '#1e293b', color: 'white', border: '1px solid #475569'
                                }}
                            >
                                <option value="">Select a Member...</option>
                                <option value={scannedTeam.name}>{scannedTeam.name} (Leader)</option>
                                {scannedTeam.team_members && scannedTeam.team_members.map((m, i) => (
                                    <option key={i} value={m.name}>{m.name}</option>
                                ))}
                            </select>
                            {selectedMember && (
                                <div style={{ marginTop: '1rem', padding: '1rem', background: '#334155', borderRadius: '0.5rem' }}>
                                    <h4 style={{ margin: '0 0 1rem 0', color: '#fbbf24' }}>{selectedMember.name}</h4>
                                    <p><strong>Email:</strong> {selectedMember.email || selectedMember.Email || selectedMember['Email Address'] || "N/A"}</p>
                                    <p><strong>Phone:</strong> {selectedMember.phone || selectedMember.Phone || selectedMember.PhoneNumber || selectedMember['Phone Number'] || "N/A"}</p>
                                    <p><strong>College:</strong> {selectedMember.college || scannedTeam.college || "N/A"}</p>
                                </div>
                            )}
                        </div>

                        <div className="members-section">
                            <h3>Attendance Check</h3>
                            <div className="actions">
                                <button className="action-btn success" style={{ padding: '1.5rem', fontSize: '1.2rem', width: '100%' }} onClick={() => markAttendance(scannedTeam.team_id, true)}>
                                    ✅ MARK TEAM PRESENT
                                </button>
                            </div>
                            <br />
                            <ul className="member-check-list">
                                {/* Leader */}
                                <li className="member-check-item">
                                    <span className="member-name">Leader: {scannedTeam.name}</span>
                                </li>
                                {/* Members */}
                                {scannedTeam.team_members && scannedTeam.team_members.map((m, i) => (
                                    <li key={i} className="member-check-item">
                                        <span className="member-name">Member: {m.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        // Scanner View
        return (
            <div className="scanner-container">
                <div className="list-header">
                    <h2>Scan for Attendance</h2>
                    <button onClick={() => setCurrentView("dashboard")} className="back-btn">⬅ DASHBOARD</button>
                </div>

                {!isScanning && (
                    <div className="scan-actions">
                        <button onClick={() => setIsScanning(true)} className="start-scan-btn">
                            📷 START SCANNER
                        </button>

                        <div className="manual-input">
                            <input
                                type="text"
                                placeholder="Enter Team ID or Email..."
                                value={manualSearch}
                                onChange={(e) => setManualSearch(e.target.value)}
                            />
                            <button onClick={() => handleSearch(manualSearch)}>SEARCH</button>
                        </div>
                    </div>
                )}

                {isScanning && (
                    <div className="scanner-wrapper">
                        <div id="reader"></div>
                        <button onClick={() => setIsScanning(false)} className="cancel-scan-btn">STOP SCANNING</button>
                    </div>
                )}
            </div>
        );
    };

    // --- MAIN RENDER ---

    if (!isAuthenticated) {
        return (
            <div className="admin-page-login">
                <div className="login-box">
                    <h1>🔐 ADMIN ACCESS</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {loginError && <p className="error">{loginError}</p>}
                        <button type="submit">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>ADMIN DASHBOARD</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={handleRefresh} className="icon-btn success" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', fontWeight: 'bold' }}>
                        🔄 REFRESH
                    </button>
                    <button onClick={() => { setIsAuthenticated(false); setUsername(""); setPassword("") }} className="logout-btn">
                        LOGOUT
                    </button>
                </div>
            </header>

            <div className="admin-content">
                {currentView === "dashboard" && renderDashboard()}
                {currentView === "edit-payment" && renderEditPayment()}
                {currentView === "view-sheet" && renderViewSheet()}
                {currentView === "total-team" && renderTeamList(() => true, "All Teams", (t) => (
                    <td>
                        <span className={`status-badge ${t.payment_status === "PAID" ? "success" : "error"}`}>
                            {t.payment_status || "UNPAID"}
                        </span>
                    </td>
                ), <th>Payment Status</th>)}
                {currentView === "total-present" && renderTotalPresentList()}
                {currentView === "total-absent" && renderTotalAbsentList()}
                {currentView === "scanner-view" && renderScannerView()}
                {currentView === "total-paid" && renderTotalPaid()}
            </div>
        </div>
    );
};

export default AdminPage;
