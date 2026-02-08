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

function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = e.range;
    const row = range.getRow();

    // Get values directly from the sheet to ensure we have the latest data
    // ASSUMPTION: Column 1 is Timestamp, then subsequent columns follow the Form order.
    // YOU MUST ADJUST THESE INDEXES BASED ON YOUR FORM QUESTIONS
    // Let's assume:
    // Col 1: Timestamp
    // Col 2: Email Address (if collected)
    // Col 3: Team Name
    // Col 4: Lead Name
    // Col 5: Year
    // Col 6: Department
    // Col 7: College Name
    // Col 8: Mobile
    // Col 9: Transaction ID
    // Col 10: Domain
    // Col 11: Member Details (if any)

    // IMPORTANT: It's better to use Named Values if possible, but row index is reliable for simple sheets.
    // Let's generate a Team ID

    const teamId = "TX-26" + ("000" + row).slice(-3); // e.g. TX-26002

    // Write Team ID to the LAST column (or a specific column if you prefer)
    // Let's verify if a Team ID column exists, otherwise append it.
    // Assuming we want to write it to Column 15 (O) for example.
    // BETTER: Find a header named "Team ID" or add it.

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    let teamIdColIndex = headers.indexOf("Team ID") + 1;

    if (teamIdColIndex === 0) {
      // Create header if not exists
      teamIdColIndex = sheet.getLastColumn() + 1;
      sheet.getRange(1, teamIdColIndex).setValue("Team ID");
    }

    // Set Team ID in the row
    sheet.getRange(row, teamIdColIndex).setValue(teamId);

    // Extract Data for Email/ID Card
    // Use e.namedValues for reliability if form setup changes
    // e.namedValues keys match the Question Titles exactly
    const responses = e.namedValues;

    // FALLBACK: If namedValues isn't working as expected, use default names
    // Note: Adjust these keys to match your EXACT Google Form Question Titles
    const email = responses['Email Address'] ? responses['Email Address'][0] : "";
    const name = responses['Team Lead Name'] ? responses['Team Lead Name'][0] : (responses['Name'] ? responses['Name'][0] : "Participant");
    const teamName = responses['Team Name'] ? responses['Team Name'][0] : "Techathon Team";
    const txnId = responses['Transaction ID'] ? responses['Transaction ID'][0] : "N/A";
    const college = responses['College Name'] ? responses['College Name'][0] : "KSRIET";
    const domain = responses['Domain'] ? responses['Domain'][0] : "Open Innovation";

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
    const emailToSearch = e.parameter.email;
    const teamIdToSearch = e.parameter.teamId;

    if (!emailToSearch && !teamIdToSearch) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No email or ID provided" })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];

    // Find Columns
    const emailColIndex = headers.indexOf("Email Address"); // Default GForm email header
    const teamIdColIndex = headers.indexOf("Team ID");

    // If exact header names differ, try to guess or use fixed indices
    // You might need to update "Email Address" to whatever your form says, e.g. "Email"

    let foundRow = null;

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Check Email match (case insensitive)
      if (emailToSearch && String(row[emailColIndex]).toLowerCase().trim() === emailToSearch.toLowerCase().trim()) {
        foundRow = row;
        break;
      }
    }

    if (foundRow) {
      // Map data back to JSON
      // We need to hunt for specific columns again dynamically or hardcode indices
      // Helper to safely get value by header name
      const getVal = (headerName) => {
        const idx = headers.indexOf(headerName);
        return idx > -1 ? foundRow[idx] : "";
      };

      const responseData = {
        status: "success",
        data: {
          teamId: getVal("Team ID") || "PENDING",
          teamName: getVal("Team Name"),
          name: getVal("Team Lead Name") || getVal("Name"),
          college: getVal("College Name") || "KSRIET",
          domain: getVal("Domain"),
          transactionId: getVal("Transaction ID")
        }
      };

      return ContentService.createTextOutput(JSON.stringify(responseData)).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Not found" })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
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
