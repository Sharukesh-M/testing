// ==========================================
// GOOGLE APPS SCRIPT CODE FOR TECHATHON X
// SENDS EMAILS TO ALL TEAM MEMBERS
// ==========================================

// ------------------------------------------
// CONFIGURATION
// ------------------------------------------
const SHEET_NAME = "Form Responses 1";
const BREVO_API_KEY = "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";
const SENDER_EMAIL = "techathonx2k26.pec@gmail.com";
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
  try {
    if (!e || !e.parameter) {
      return jsonResponse({ status: "error", message: "No parameters provided." });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({
        status: "error",
        message: `Sheet "${SHEET_NAME}" not found. Please check sheet name.`
      });
    }

    const params = e.parameter;
    const action = params.action;

    // ----------------------------------------------------
    // ACTION: MARK ATTENDANCE
    // ----------------------------------------------------
    if (action === 'mark_attendance') {
      const idToMark = params.id;
      if (!idToMark) return jsonResponse({ status: "error", message: "No ID provided" });

      const data = sheet.getDataRange().getValues();
      if (data.length === 0) return jsonResponse({ status: "error", message: "Sheet is empty." });

      const headers = data[0];
      const teamIdColIdx = headers.indexOf("Team ID");

      let attendanceColIdx = headers.indexOf("Attendance");
      if (attendanceColIdx === -1) {
        attendanceColIdx = headers.length;
        sheet.getRange(1, attendanceColIdx + 1).setValue("Attendance");
      }

      if (teamIdColIdx === -1) return jsonResponse({ status: "error", message: "Team ID column not found." });

      for (let i = 1; i < data.length; i++) {
        if (String(data[i][teamIdColIdx]).trim() === String(idToMark).trim()) {
          const rowIdx = i + 1;
          const targetCol = attendanceColIdx + 1;
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
    // ACTION: GET TEAM BY ID or SEARCH BY EMAIL
    // ----------------------------------------------------
    if (action === 'get_team' || action === 'search_email' || (!action && params.email)) {
      const data = sheet.getDataRange().getValues();
      if (data.length === 0) return jsonResponse({ status: "error", message: "Sheet is empty." });

      const headers = data[0];

      const teamIdColIdx = headers.indexOf("Team ID");
      const emailColIdx = headers.indexOf("Email address");
      const attendanceColIdx = headers.indexOf("Attendance");

      let foundRow = null;

      if (action === 'get_team') {
        const id = params.id;
        if (teamIdColIdx === -1) return jsonResponse({ status: "error", message: "Team ID column not found." });
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][teamIdColIdx]).trim() === String(id).trim()) {
            foundRow = data[i];
            break;
          }
        }
      } else {
        const email = params.email;
        if (emailColIdx === -1) return jsonResponse({ status: "error", message: "Email address column not found." });

        // Search in ALL email columns (leader + team members)
        for (let i = 1; i < data.length; i++) {
          const rowEmails = [
            data[i][emailColIdx], // Main email
            data[i][headers.indexOf("EMAIL ID")], // Lead email
            data[i][headers.indexOf("EMAIL ID") + 6], // Member 1 email (offset by 6 columns)
            data[i][headers.indexOf("EMAIL ID") + 12], // Member 2 email
            data[i][headers.indexOf("EMAIL ID") + 18]  // Member 3 email
          ].filter(e => e); // Remove empty values

          if (rowEmails.some(e => String(e).toLowerCase().trim() === String(email).toLowerCase().trim())) {
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

      return jsonResponse({ status: "error", message: "Registration not found for this email." });
    }

    return jsonResponse({ status: "error", message: "Invalid action: " + (action || "none") });

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: "Script error: " + error.toString()
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper to format row data
function formatTeamData(row, headers) {
  const getVal = (name) => {
    const idx = headers.indexOf(name);
    return idx !== -1 ? (row[idx] || "") : "";
  };

  return {
    teamId: getVal("Team ID"),
    teamName: getVal("TEAM NAME"),
    name: getVal("LEAD NAME"),
    college: getVal("COLLEGE NAME"),
    domain: getVal("DOMAINS"),
    transactionId: getVal("Transaction ID (UTR/UPI)"),
    email: getVal("Email address"),
    phone: getVal("PHONE NO.")
  };
}

// ------------------------------------------
// 2. TRIGGER: ON FORM SUBMIT
// ------------------------------------------
function onFormSubmit(e) {
  try {
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

    // Check if Team ID already exists
    let currentId = sheet.getRange(rowIdx, teamIdCol).getValue();
    let memberId = currentId;

    if (!memberId || memberId === "") {
      // Find the highest existing Team ID number
      const allData = sheet.getDataRange().getValues();
      let maxNumber = 26002; // Start from 26002, so next will be 26003

      for (let i = 1; i < allData.length; i++) {
        const existingId = allData[i][teamIdCol - 1];
        if (existingId && String(existingId).startsWith("TX-")) {
          const numPart = parseInt(String(existingId).replace("TX-", ""));
          if (!isNaN(numPart) && numPart > maxNumber) {
            maxNumber = numPart;
          }
        }
      }

      // Generate new ID
      memberId = "TX-" + (maxNumber + 1);
      sheet.getRange(rowIdx, teamIdCol).setValue(memberId);
    }

    // 2. Get team data
    const teamNameCol = headers.indexOf("TEAM NAME");
    const rowValues = sheet.getRange(rowIdx, 1, 1, sheet.getLastColumn()).getValues()[0];
    const teamName = teamNameCol !== -1 ? rowValues[teamNameCol] : "Your Team";

    // 3. Collect ALL team member emails
    const emailsToSend = [];

    // Lead email (from "Email address" column at start)
    const mainEmailCol = headers.indexOf("Email address");
    if (mainEmailCol !== -1 && rowValues[mainEmailCol]) {
      emailsToSend.push({
        email: rowValues[mainEmailCol],
        name: rowValues[headers.indexOf("LEAD NAME")] || "Team Leader"
      });
    }

    // Team Member 1
    const member1EmailCol = headers.indexOf("EMAIL ID");
    if (member1EmailCol !== -1 && rowValues[member1EmailCol]) {
      emailsToSend.push({
        email: rowValues[member1EmailCol],
        name: rowValues[headers.indexOf("LEAD NAME")] || "Team Member"
      });
    }

    // Team Member 2 (EMAIL ID appears multiple times, need to find the right one)
    // Based on your columns: TEAM MEMBER 1 section ends, then TEAM MEMBER 2 starts
    let currentCol = member1EmailCol;
    for (let offset = 1; offset <= 20; offset++) {
      if (headers[member1EmailCol + offset] === "EMAIL ID" && rowValues[member1EmailCol + offset]) {
        emailsToSend.push({
          email: rowValues[member1EmailCol + offset],
          name: rowValues[headers.indexOf("TEAM MEMBER 2 - NAME")] || "Team Member 2"
        });
        currentCol = member1EmailCol + offset;
        break;
      }
    }

    // Team Member 3
    for (let offset = 1; offset <= 20; offset++) {
      if (headers[currentCol + offset] === "EMAIL ID" && rowValues[currentCol + offset]) {
        emailsToSend.push({
          email: rowValues[currentCol + offset],
          name: rowValues[headers.indexOf("TEAM MEMBER 3 - NAME")] || "Team Member 3"
        });
        break;
      }
    }

    // 4. Send emails to all team members
    const uniqueEmails = [...new Set(emailsToSend.map(e => e.email.toLowerCase()))];

    emailsToSend.forEach((recipient, index) => {
      if (uniqueEmails.includes(recipient.email.toLowerCase())) {
        sendBrevoEmail(recipient.email, recipient.name, memberId, teamName);
        Utilities.sleep(500); // Small delay between emails
        uniqueEmails.splice(uniqueEmails.indexOf(recipient.email.toLowerCase()), 1); // Prevent duplicates
      }
    });

    Logger.log(`✅ Sent ${emailsToSend.length} emails for Team ${memberId}`);

  } catch (error) {
    Logger.log("onFormSubmit Error: " + error.toString());
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
        <h1 style="color: #bc13fe; text-align: center; margin-bottom: 30px; letter-spacing: 2px;">TECHATHON X 2K26</h1>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your team's registration for <span style="color: #00ffbf;">TechathonX 2K26</span> is CONFIRMED.</p>
        
        <div style="background: linear-gradient(45deg, #2a0a38, #1a1a1a); padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0; border: 1px solid #bc13fe;">
          <h2 style="margin: 10px 0; font-size: 32px; color: #ffffff;">${teamId}</h2>
          <p style="margin: 0; font-size: 18px; color: #00ffbf;">${teamName}</p>
        </div>

        <div style="text-align: center;">
           <img src="${qrCodeUrl}" alt="QR" width="150" height="150" style="background:white; padding:10px; border-radius:10px;">
        </div>

        <p style="text-align: center; margin-top: 30px;">
           <a href="https://techathonx2k26-pec.vercel.app/register?mode=download&email=${encodeURIComponent(toEmail)}" 
              style="background-color: #bc13fe; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold;">
              DOWNLOAD ID CARD
           </a>
        </p>
        
        <hr style="border-color: #333; margin: 30px 0;">
        <p style="text-align: center; color: #666; font-size: 12px;">TechathonX Organizing Committee</p>
      </div>
    </div>
  `;

  const payload = {
    "sender": { "name": SENDER_NAME, "email": SENDER_EMAIL },
    "to": [{ "email": toEmail, "name": name }],
    "subject": `[CONFIRMED] Team ${teamName} - TechathonX 2K26 Registration`,
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
    const responseCode = response.getResponseCode();

    if (responseCode === 201) {
      Logger.log("✅ Email sent to: " + toEmail);
    } else {
      Logger.log("⚠️ Email failed for: " + toEmail + " | Code: " + responseCode);
    }
  } catch (e) {
    Logger.log("❌ Email error for " + toEmail + ": " + e.toString());
  }
}

// ------------------------------------------
// 4. MANUAL TRIGGER
// ------------------------------------------
function processAllRows() {
  Logger.log("🔄 Processing all rows...");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  for (let i = 1; i < data.length; i++) {
    const rowIdx = i + 1;
    Logger.log(`Processing row ${rowIdx}...`);

    // Simulate form submit event for this row
    const fakeEvent = {
      range: sheet.getRange(rowIdx, 1)
    };

    onFormSubmit(fakeEvent);
    Utilities.sleep(2000); // Wait 2 seconds between rows
  }

  Logger.log("✅ Finished processing all rows.");
}

// ------------------------------------------
// 5. TEST FUNCTION
// ------------------------------------------
function testBrevoConnection() {
  Logger.log("🔍 Testing Brevo API...");
  sendBrevoEmail(SENDER_EMAIL, "Test Admin", "TX-TEST-001", "Debug Team");
  Logger.log("✅ Test complete. Check inbox: " + SENDER_EMAIL);
}
