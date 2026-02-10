
# 🚨 CRITICAL: HOW TO FIX "ADMIN SCAN NOT WORKING"

If your Admin Scan is not working (e.g., getting errors or nothing happens),
it is almost certainly because the Google Script is not deployed correctly.

## RECENT UPDATES (Admin Page Fixes)
- **Mobile Scanning**: The scanner now adapts to mobile screen sizes automatically.
- **Team Members**: The Admin Page now intelligently scans for member names across all data columns (e.g., "Member 1", "Participant Name").
- **Team Size**: Fixed an issue where team size showed as "4" (default). We now look for "NO OF TEAM MEMBERS".
- **Data Display**: Added support for varied column names (e.g., "Project Title" for Team Name).
- **DEBUG MODE**: Added a "🐞 DEBUG: SHOW RAW DATA" button at the bottom of the scanned result.

## 🛠 TROUBLESHOOTING: STILL SEEING "N/A"?
1. Scan a QR Code.
2. Scroll to the bottom and click **🐞 DEBUG: SHOW RAW DATA**.
3. An alert will pop up showing the *exact* data coming from Google Sheets.
4. Look at the key names (e.g., `Input_1`, `Column_A`).
   - If they look like `Input_1` instead of `Team Name`, your Google Sheet headers are missing or not in the first row.
   - Using this raw data, you can tell me the correct key names to add.

## STEP 1: UPDATE YOUR GOOGLE SCRIPT
1. Go to your Google Spreadsheet -> Extensions -> Apps Script.
2. DELETE all the old code.
3. PASTE the new code from `GOOGLE_APPS_SCRIPT_CODE.js`.
   - Make sure your BREVO_API_KEY is correct.

## STEP 2: DEPLOY CORRECTLY (MOST IMPORTANT)
If you do not do this, `fetch` will fail!

1. Top right corner blue button: **Deploy** -> **New deployment**.
2. Click the specific Gear icon ⚙️ next to "Select type" -> **Web app**.
3. **Description**: "Version 2 - Admin Scan" (or anything).
4. **Execute as**: `Me` (your email).
5. **Who has access**: `Anyone` (CRITICAL! Must be "Anyone").
   - If you set this to "Only myself", your React app cannot access it.
6. Click **Deploy**.
7. Copy the **Web App URL** (starts with `https://script.google.com/...`).

## STEP 3: UPDATE REACT APP
1. Go to `src/pages/AdminPage.jsx`.
2. Update `GSHEET_URL` at the top with your **NEW Web App URL**.
   - Even if the ID looks same, ensuring it's the latest deployment URL is safe.
3. Also update `GSHEET_URL` in `src/pages/RegisterPage.jsx` if it changed.

## STEP 4: TESTING ON LOCALHOST
1. Restart your local server: `npm run dev`.
2. Open `http://localhost:5173/admin-scan`.
3. Allow Camera permissions.
4. Scan a QR code.
   - If it says "Team not found", check if that Team ID exists in your Google Sheet (Column: Team ID).
   - If it says "Network Error", your Script Deployment "Who has access" is likely wrong (fix in Step 2).

## STEP 5: VERIFY COLUMNS
Ensure your Google Sheet headers match exactly what the script expects:
- `Team ID`
- `Team Name`
- `Team Leader Name`
- `Email Address`
- `Transaction ID` (for payment status)
- `Attendance` (script will create this automatically if missing)
