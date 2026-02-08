// --------------------------------------------------------------------
// GOOGLE APPS SCRIPT FOR TECHATHON (LINKED TO GOOGLE SHEET)
// --------------------------------------------------------------------

// TRIGGER SETUP INSTRUCTIONS:
// 1. Paste this code into Extensions > Apps Script.
// 2. Click "Triggers" (clock icon) on the left sidebar.
// 3. Click "Add Trigger" (bottom right).
// 4. Settings:
//    - Choose which function to run: `onFormSubmit`
//    - Select event source: `From spreadsheet`
//    - Select event type: `On form submit`
// 5. Save and Authorize.

// Helper to find column index by name (case-insensitive, partial match)
function findColumnIndex(headers, ...candidates) {
  for (const candidate of candidates) {
    const normalize = s => s.toString().toLowerCase().trim();
    const index = headers.findIndex(h => normalize(h).includes(normalize(candidate)));
    if (index !== -1) return index;
  }
  return -1;
}

function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = e.range;
    const row = range.getRow();

    // Generate Team ID
    const teamId = "TX-26" + ("000" + row).slice(-3); // e.g. TX-26002

    // Get Headers to find/create "Team ID" column
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    let teamIdColIndex = findColumnIndex(headers, "Team ID", "TeamID", "ID");

    if (teamIdColIndex === -1) {
      // Create header if not exists
      teamIdColIndex = sheet.getLastColumn() + 1;
      sheet.getRange(1, teamIdColIndex).setValue("Team ID");
      // Adjust index to be 0-based for internal logic if needed, but setValue uses 1-based
      teamIdColIndex = teamIdColIndex - 1;
    }

    // Set Team ID in the row (teamIdColIndex is 0-based from findColumnIndex, so +1 for getRange)
    sheet.getRange(row, teamIdColIndex + 1).setValue(teamId);

    // Fetch values for email
    // We re-fetch the row values to ensure we have everything aligned
    const rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Find Email Column dynamically
    const emailColIndex = findColumnIndex(headers, "Email Address", "Email", "e-mail");
    const nameColIndex = findColumnIndex(headers, "Team Lead Name", "Lead Name", "Name");
    const teamNameColIndex = findColumnIndex(headers, "Team Name", "Team");

    // Safe extraction
    const email = emailColIndex > -1 ? rowValues[emailColIndex] : "";
    const name = nameColIndex > -1 ? rowValues[nameColIndex] : "Participant";
    const teamName = teamNameColIndex > -1 ? rowValues[teamNameColIndex] : "Techathon Team";
    const txnId = "N/A"; // Simplified for now

    // Send Confirmation Email
    if (email) {
      sendConfirmationEmail(email, name, teamId, teamName, txnId);
    }

  } catch (error) {
    console.error("Error in onFormSubmit: " + error.toString());
  }
}

// API for Website to Fetch ID Card Data
function doGet(e) {
  try {
    // 1. Handle CORS Preflight (if any)
    // 2. Get Parameters
    const emailToSearch = e.parameter.email;

    if (!emailToSearch) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No email provided"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Sheet is empty" })).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0];

    // ROBUST COLUMN FINDING
    const emailColIndex = findColumnIndex(headers, "Email Address", "Email", "e-mail");
    const teamIdColIndex = findColumnIndex(headers, "Team ID", "TeamID", "ID");

    // Debugging info if needed
    if (emailColIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Could not find Email column in sheet. Headers: " + JSON.stringify(headers)
      })).setMimeType(ContentService.MimeType.JSON);
    }

    let foundRow = null;
    const searchEmailClean = String(emailToSearch).toLowerCase().trim();

    // Loop through data (starting row 1 to skip headers)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowEmail = String(row[emailColIndex] || "").toLowerCase().trim();

      if (rowEmail === searchEmailClean) {
        foundRow = row;
        break; // Stop at first match
      }
    }

    if (foundRow) {
      // Helper to safely get value
      const getVal = (candidates) => {
        const idx = findColumnIndex(headers, ...candidates);
        return idx > -1 ? foundRow[idx] : "";
      };

      const responseData = {
        status: "success",
        data: {
          teamId: (teamIdColIndex > -1 ? foundRow[teamIdColIndex] : "") || "PENDING",
          teamName: getVal(["Team Name", "Team"]),
          name: getVal(["Team Lead Name", "Lead Name", "Name"]),
          college: getVal(["College Name", "College"]),
          domain: getVal(["Domain", "Track"]),
          transactionId: getVal(["Transaction ID", "Transaction"])
        }
      };

      return ContentService.createTextOutput(JSON.stringify(responseData)).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No registration found for: " + emailToSearch
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server Error: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(email, name, teamId, teamName, txnId) {
  const subject = `Registration Confirmed - TechathonX'26 [${teamId}]`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(teamId)}`;

  // CHANGE THIS URL TO YOUR DEPLOYED WEBSITE URL (e.g., https://your-site.netlify.app)
  const websiteUrl = "https://techtesting2k26.netlify.app";

  const magicLink = `${websiteUrl}/register?email=${encodeURIComponent(email)}`;

  const body = `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; background-color: #f4f4f4;">
        <h2 style="color: #000; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">OFFICIAL ENTRY PASS</h2>
        <p>AGENT: <strong>${name}</strong></p>
        <p>OPERATION: <strong>TechathonX'26</strong></p>
        <p>SQUAD: <strong>"${teamName}"</strong></p>
        
        <div style="background-color: #fff; padding: 15px; border: 1px dashed #000; margin: 20px 0; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${teamId}</h1>
          <p style="margin: 5px 0 0; font-size: 12px;">UNIQUE IDENTIFIER</p>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <img src="${qrUrl}" alt="QR Code" style="border: 4px solid #000;" />
          <p style="font-size: 10px; margin-top: 5px;">SCAN FOR ACCESS</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLink}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
             ACCESS DIGITAL ID CARD ➔
          </a>
          <p style="font-size: 10px; margin-top: 10px;">Click above to view and download your full pass.</p>
        </div>

        <p>This document serves as your official entry pass. Do not share this QR code with unauthorized personnel.</p>
        <p><strong>VENUE:</strong> Prathyusha Engineering College</p>
        <hr style="border: 0; border-top: 1px solid #000; margin: 20px 0;">
        <p style="font-size: 10px; text-align: center;">GENERATED BY TECHATHONX SYSTEM</p>
      </div>
    `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}
