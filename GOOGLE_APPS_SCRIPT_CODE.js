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

    // Find Email Column (Default/Lead)
    const emailColIndex = findColumnIndex(headers, "Email Address", "Email", "e-mail");
    const nameColIndex = findColumnIndex(headers, "Team Lead Name", "Lead Name", "Name");
    const teamNameColIndex = findColumnIndex(headers, "Team Name", "Team");

    // Safe extraction of Lead Data
    const leadEmail = emailColIndex > -1 ? rowValues[emailColIndex] : "";
    const leadName = nameColIndex > -1 ? rowValues[nameColIndex] : "Participant";
    const teamName = teamNameColIndex > -1 ? rowValues[teamNameColIndex] : "Techathon Team";
    const txnId = "N/A";

    // Find ALL columns that might contain emails (to email everyone)
    const allEmailIndices = headers.map((h, i) => {
      const lowerH = h.toString().toLowerCase();
      return (lowerH.includes("email") || lowerH.includes("e-mail")) ? i : -1;
    }).filter(i => i !== -1);

    // Logic to send emails to everyone found
    if (allEmailIndices.length === 0 && leadEmail) {
      // Fallback to just lead if no email columns identified via scan but leadEmail was found
      sendConfirmationEmail(leadEmail, leadName, teamId, teamName, txnId);
    } else {
      const sentEmails = new Set();

      for (const idx of allEmailIndices) {
        const memberEmail = String(rowValues[idx] || "").trim();

        if (memberEmail && memberEmail.includes("@") && !sentEmails.has(memberEmail)) {
          let memberName = "Participant";

          // Identify Name for this email
          if (idx === emailColIndex) {
            memberName = leadName;
          } else {
            // Heuristic: Look at adjacent columns for "Name"
            if (idx > 0) {
              const prevHeader = headers[idx - 1].toLowerCase();
              if (prevHeader.includes("name") && !prevHeader.includes("app") && !prevHeader.includes("id")) {
                memberName = rowValues[idx - 1] || memberName;
              }
            }
            if (memberName === "Participant" && idx < headers.length - 1) {
              const nextHeader = headers[idx + 1].toLowerCase();
              if (nextHeader.includes("name")) {
                memberName = rowValues[idx + 1] || memberName;
              }
            }
          }

          sendConfirmationEmail(memberEmail, memberName, teamId, teamName, txnId);
          sentEmails.add(memberEmail);
        }
      }
    }

  } catch (error) {
    console.error("Error in onFormSubmit: " + error.toString());
  }
}

// API for Website to Fetch ID Card Data
function doGet(e) {
  const lock = LockService.getScriptLock();
  // Wait for up to 30 seconds for other processes to finish.
  lock.tryLock(30000);

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
    const teamIdColIndex = findColumnIndex(headers, "Team ID", "TeamID", "ID");

    // Find ALL columns that might contain emails
    const allEmailIndices = headers.map((h, i) => {
      const lowerH = h.toString().toLowerCase();
      return (lowerH.includes("email") || lowerH.includes("e-mail")) ? i : -1;
    }).filter(i => i !== -1);

    if (allEmailIndices.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Could not find any Email column in sheet. Headers: " + JSON.stringify(headers)
      })).setMimeType(ContentService.MimeType.JSON);
    }

    let foundRow = null;
    let foundRowIndex = -1; // 0-based index in 'data' array
    let specificName = null;
    const searchEmailClean = String(emailToSearch).toLowerCase().trim();

    // Loop through data (starting row 1 to skip headers)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Check ALL email columns for this row
      for (const idx of allEmailIndices) {
        const cellValue = String(row[idx] || "").toLowerCase().trim();
        if (cellValue === searchEmailClean) {
          foundRow = row;
          foundRowIndex = i;

          // Attempt to find specific member name if this isn't the main email
          // Heuristic: Look at adjacent columns for "Name"
          if (idx > 0) {
            const prevHeader = headers[idx - 1].toLowerCase();
            if (prevHeader.includes("name") && !prevHeader.includes("app") && !prevHeader.includes("id")) {
              specificName = row[idx - 1];
            }
          }
          if (!specificName && idx < headers.length - 1) {
            const nextHeader = headers[idx + 1].toLowerCase();
            if (nextHeader.includes("name")) {
              specificName = row[idx + 1];
            }
          }
          break;
        }
      }
      if (foundRow) break;
    }

    if (foundRow) {
      // Helper to safely get value
      const getVal = (candidates) => {
        const idx = findColumnIndex(headers, ...candidates);
        return idx > -1 ? foundRow[idx] : "";
      };

      const teamLeadName = getVal(["Team Lead Name", "Lead Name", "Name"]);

      // SELF-HEALING: If Team ID is missing, Generate it NOW.
      let currentTeamId = (teamIdColIndex > -1 ? foundRow[teamIdColIndex] : "");

      if (!currentTeamId || String(currentTeamId).trim() === "") {
        // Create Headers if missing
        if (teamIdColIndex === -1) {
          // Cannot reliably add header here, fallback to pending text
          currentTeamId = "PENDING-NO-COL";
        } else {
          // Generate ID
          // Row Index in Sheet is foundRowIndex + 1
          const sheetRow = foundRowIndex + 1;
          const newId = "TX-26" + ("000" + sheetRow).slice(-3);

          // Save to Sheet
          // Check if header is actually "Team ID" to be safe or if it was found via fuzzy match
          // We use teamIdColIndex + 1 for getRange (1-based)
          sheet.getRange(sheetRow, teamIdColIndex + 1).setValue(newId);
          currentTeamId = newId; // Update so user gets it immediately
        }
      }

      const responseData = {
        status: "success",
        data: {
          teamId: currentTeamId,
          teamName: getVal(["Team Name", "Team"]),
          name: specificName || teamLeadName, // Use member name if found
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
  } finally {
    lock.releaseLock();
  }
}

function sendConfirmationEmail(email, name, teamId, teamName, txnId) {
  const subject = `Welcome to the Arena - TechathonX'26 [${teamId}]`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(teamId)}`;

  // CHANGE THIS URL TO YOUR DEPLOYED WEBSITE URL
  const websiteUrl = "https://techtesting2k26.netlify.app";

  const magicLink = `${websiteUrl}/register?email=${encodeURIComponent(email)}`;

  const body = `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #1A0B2E; background-color: #f4f4f4;">
        
        <!-- CONGRATULATIONS HEADER -->
        <div style="background-color: #1A0B2E; color: #D4AF37; padding: 20px; text-align: center; margin-bottom: 25px; border-bottom: 3px solid #D4AF37;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">🎉 CONGRATULATIONS! 🎉</h1>
            <p style="margin: 10px 0 0; font-size: 14px; letter-spacing: 1px; color: #fff;">YOUR REGISTRATION IS CONFIRMED</p>
        </div>

        <h2 style="color: #000; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 10px;">OFFICIAL ENTRY PASS</h2>
        <p>AGENT: <strong>${name}</strong></p>
        <p>OPERATION: <strong>TechathonX'26</strong></p>
        <p>SQUAD: <strong>"${teamName}"</strong></p>
        
        <div style="background-color: #fff; padding: 15px; border: 2px dashed #D4AF37; margin: 20px 0; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px; color: #1A0B2E;">${teamId}</h1>
          <p style="margin: 5px 0 0; font-size: 12px; color: #666;">UNIQUE IDENTIFIER</p>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <img src="${qrUrl}" alt="QR Code" style="border: 4px solid #1A0B2E; padding: 5px; background: white;" />
          <p style="font-size: 10px; margin-top: 5px;">SCAN FOR ACCESS</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLink}" style="background-color: #1A0B2E; color: #D4AF37; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; border: 1px solid #D4AF37;">
             ACCESS DIGITAL ID CARD ➔
          </a>
          <p style="font-size: 11px; margin-top: 15px; color: #555;">Click above to view and download your full pass.</p>
        </div>

        <div style="background-color: #e0e0e0; padding: 15px; font-size: 11px; text-align: center; color: #333;">
            <p><strong>VENUE:</strong> Prathyusha Engineering College</p>
            <p>This document serves as your official entry pass. Do not share your unique ID with unauthorized personnel.</p>
        </div>
        
        <p style="font-size: 10px; text-align: center; margin-top: 20px; color: #888;">GENERATED BY TECHATHONX SYSTEM</p>
      </div>
    `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}
