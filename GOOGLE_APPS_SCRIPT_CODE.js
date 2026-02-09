
// ==========================================
// GOOGLE APPS SCRIPT CODE FOR TECHATHON X
// ==========================================

// ------------------------------------------
// CONFIGURATION
// ------------------------------------------
const SHEET_NAME = "Form Responses 1";
const BREVO_API_KEY = "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";
const SENDER_EMAIL = "techathonx26@gmail.com";
const SENDER_NAME = "TechathonX Team";

// ------------------------------------------
// 1. ENTRY POINTS
// ------------------------------------------
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const output = ContentService.createTextOutput();

  if (!e || !e.parameter) {
    output.setContent(JSON.stringify({ status: "error", message: "No parameters" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const params = e.parameter;
  const action = params.action;

  // ----------------------------------------------------
  // ACTION: MARK ATTENDANCE (For Admin)
  // ----------------------------------------------------
  if (action === 'mark_attendance') {
    const idToMark = params.id;
    if (!idToMark) return jsonResponse({ status: "error", message: "No ID provided" });

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const teamIdColIdx = headers.indexOf("Team ID");

    // Find or Create Attendance Column
    let attendanceColIdx = headers.indexOf("Attendance");
    if (attendanceColIdx === -1) {
      attendanceColIdx = headers.length; // New column index
      sheet.getRange(1, attendanceColIdx + 1).setValue("Attendance"); // Add header
      // Re-fetch data to include new column
    }

    if (teamIdColIdx === -1) return jsonResponse({ status: "error", message: "Team ID column missing" });

    // Find row
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][teamIdColIdx]).trim() === String(idToMark).trim()) {
        const rowIdx = i + 1;
        // Mark as PRESENT
        // Note: If column was just added, we need to be careful with index.
        // Best to re-read headers/data or just trust valid index if existing
        // Since we might have added a col, let's just use the calculated index.
        // If it was -1, it's now 'headers.length'.
        const targetCol = (attendanceColIdx === -1) ? headers.length + 1 : attendanceColIdx + 1;

        sheet.getRange(rowIdx, targetCol).setValue("PRESENT");

        return jsonResponse({
          status: "success",
          message: `Team ${idToMark} marked PRESENT!`,
          data: { attendance: "PRESENT" }
        });
      }
    }
    return jsonResponse({ status: "error", message: "Team ID not found" });
  }

  // ----------------------------------------------------
  // ACTION: GET TEAM BY ID (For Admin Scan) or EMAIL
  // ----------------------------------------------------
  if (action === 'get_team' || action === 'search_email') {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];

    // Key Column Indices
    const teamIdColIdx = headers.indexOf("Team ID");
    const emailColIdx = headers.indexOf("Email Address");
    const attendanceColIdx = headers.indexOf("Attendance");

    let foundRow = null;

    if (action === 'get_team') {
      const id = params.id;
      if (teamIdColIdx === -1) return jsonResponse({ status: "error", message: "Team ID col not found" });
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][teamIdColIdx]).trim() === String(id).trim()) {
          foundRow = data[i];
          break;
        }
      }
    } else {
      const email = params.email;
      if (emailColIdx === -1) return jsonResponse({ status: "error", message: "Email col not found" });
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][emailColIdx]).toLowerCase().trim() === String(email).toLowerCase().trim()) {
          foundRow = data[i];
          break;
        }
      }
    }

    if (foundRow) {
      const formatted = formatTeamData(foundRow, headers);
      if (attendanceColIdx !== -1) {
        formatted.attendance = foundRow[attendanceColIdx] || "ABSENT";
      } else {
        formatted.attendance = "ABSENT";
      }
      return jsonResponse({ status: "success", data: formatted });
    }

    return jsonResponse({ status: "error", message: "Not found" });
  }

  return jsonResponse({ status: "error", message: "Invalid action" });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper to format row data
function formatTeamData(row, headers) {
  const getVal = (name) => {
    const idx = headers.indexOf(name);
    return idx !== -1 ? row[idx] : "";
  };

  return {
    teamId: getVal("Team ID"),
    teamName: getVal("Team Name"),
    name: getVal("Team Leader Name"),
    college: getVal("College Name"),
    domain: getVal("Selected Domain"),
    transactionId: getVal("Transaction ID"),
    email: getVal("Email Address"),
    phone: getVal("Phone Number")
  };
}

// ------------------------------------------
// 2. TRIGGER: ON FORM SUBMIT
// ------------------------------------------
function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const range = e.range;
  const rowIdx = range.getRow();

  // 1. Generate Team ID if missing
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let teamIdCol = headers.indexOf("Team ID") + 1;

  if (teamIdCol === 0) {
    teamIdCol = headers.length + 1;
    sheet.getRange(1, teamIdCol).setValue("Team ID");
  }

  let currentId = sheet.getRange(rowIdx, teamIdCol).getValue();
  let memberId = currentId;

  if (!memberId) {
    memberId = "TX-" + (26000 + (rowIdx - 1));
    sheet.getRange(rowIdx, teamIdCol).setValue(memberId);
  }

  // 2. Send Email
  const emailCol = headers.indexOf("Email Address");
  const nameCol = headers.indexOf("Team Leader Name");
  const teamNameCol = headers.indexOf("Team Name");

  const rowValues = sheet.getRange(rowIdx, 1, 1, sheet.getLastColumn()).getValues()[0];
  const email = rowValues[emailCol];
  const name = nameCol !== -1 ? rowValues[nameCol] : "Participant";
  const teamName = teamNameCol !== -1 ? rowValues[teamNameCol] : "Your Team";

  if (email) {
    sendBrevoEmail(email, name, memberId, teamName);
  }
}

// ------------------------------------------
// 3. HELPER: SEND EMAIL
// ------------------------------------------
function sendBrevoEmail(toEmail, name, teamId, teamName) {
  const url = "https://api.brevo.com/v3/smtp/email";
  const qrCodeUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(teamId)}`;

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d0d0d; color: #ffffff; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; padding: 30px; border-radius: 15px; border: 1px solid #333; box-shadow: 0 0 20px rgba(138, 43, 226, 0.2);">
        <h1 style="color: #bc13fe; text-align: center; margin-bottom: 30px; letter-spacing: 2px;">TECHATHON X</h1>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your registration for <span style="color: #00ffbf;">TechathonX 2026</span> is CONFIRMED.</p>
        
        <div style="background: linear-gradient(45deg, #2a0a38, #1a1a1a); padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0; border: 1px solid #bc13fe;">
          <h2 style="margin: 10px 0; font-size: 32px; color: #ffffff;">${teamId}</h2>
          <p style="margin: 0; font-size: 18px; color: #00ffbf;">${teamName}</p>
        </div>

        <div style="text-align: center;">
           <img src="${qrCodeUrl}" alt="QR" width="150" height="150" style="background:white; padding:10px; border-radius:10px;">
        </div>

        <p style="text-align: center; margin-top: 30px;">
           <a href="https://testing-mu-lac.vercel.app/register?mode=download&email=${encodeURIComponent(toEmail)}" 
              style="background-color: #bc13fe; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px;">
              DOWNLOAD ID CARD
           </a>
        </p>
      </div>
    </div>
  `;

  const payload = {
    "sender": { "name": SENDER_NAME, "email": SENDER_EMAIL },
    "to": [{ "email": toEmail, "name": name }],
    "subject": `[CONFIRMED] Team ${teamName} - TechathonX Registration`,
    "htmlContent": htmlBody
  };

  const options = {
    "method": "post",
    "headers": {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Email sent: " + response.getContentText());
  } catch (e) {
    Logger.log("Error sending email: " + e.toString());
  }
}

// ------------------------------------------
// 4. MANUAL TRIGGER (Run manually if needed)
// ------------------------------------------
function processAllRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  let teamIdCol = headers.indexOf("Team ID") + 1;
  const emailCol = headers.indexOf("Email Address");
  const nameCol = headers.indexOf("Team Leader Name");
  const teamNameCol = headers.indexOf("Team Name");

  if (teamIdCol === 0) {
    teamIdCol = headers.length + 1;
    sheet.getRange(1, teamIdCol).setValue("Team ID");
  }

  for (let i = 1; i < data.length; i++) {
    const rowIdx = i + 1;
    const currentId = sheet.getRange(rowIdx, teamIdCol).getValue();

    if (!currentId || currentId === "") {
      const memberId = "TX-" + (26000 + (rowIdx - 1));
      sheet.getRange(rowIdx, teamIdCol).setValue(memberId);

      const email = data[i][emailCol];
      const name = nameCol !== -1 ? data[i][nameCol] : "Participant";
      const teamName = teamNameCol !== -1 ? data[i][teamNameCol] : "Your Team";

      if (email) {
        sendBrevoEmail(email, name, memberId, teamName);
      }
    }
  }
}
