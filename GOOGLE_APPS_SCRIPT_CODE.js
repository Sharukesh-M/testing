// ==========================================
// GOOGLE APPS SCRIPT CODE FOR TECHATHON X
// FIXED VERSION - EMAIL SENDING & TEAM NAME
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
        message: `Sheet "${SHEET_NAME}" not found.`
      });
    }

    const params = e.parameter;
    const action = params.action;

    // MARK ATTENDANCE
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
          sheet.getRange(rowIdx, attendanceColIdx + 1).setValue("PRESENT");
          return jsonResponse({
            status: "success",
            message: `Team ${idToMark} marked PRESENT!`,
            data: { attendance: "PRESENT" }
          });
        }
      }
      return jsonResponse({ status: "error", message: "Team ID not found" });
    }

    // GET TEAM BY ID or SEARCH BY EMAIL
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

      return jsonResponse({ status: "error", message: "Registration not found." });
    }

    return jsonResponse({ status: "error", message: "Invalid action" });

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

function formatTeamData(row, headers) {
  const getVal = (name) => {
    // Trim all headers to handle trailing spaces
    const trimmedHeaders = headers.map(h => String(h).trim());
    const idx = trimmedHeaders.indexOf(name);
    return idx !== -1 ? (row[idx] || "") : "";
  };

  // Get values with trimmed column names
  const teamName = getVal("TEAM NAME") || "N/A";
  const leadName = getVal("LEAD NAME") || "N/A";
  const domain = getVal("DOMAINS") || "N/A";
  const teamSize = getVal("NO OF TEAM MEMBERS") || "4";
  const college = getVal("COLLEGE NAME") || "N/A";
  const transactionId = getVal("Transaction ID (UTR/UPI)") || "";
  const email = getVal("Email address") || "";
  const phone = getVal("PHONE NO.") || getVal("PHONE NO") || "";

  return {
    teamId: getVal("Team ID"),
    teamName: teamName,
    name: leadName,
    college: college,
    domain: domain,
    teamSize: teamSize,
    transactionId: transactionId,
    email: email,
    phone: phone
  };
}

// ------------------------------------------
// 2. TRIGGER: ON FORM SUBMIT
// ------------------------------------------
function onFormSubmit(e) {
  try {
    Logger.log("🔔 Form submitted! Starting process...");

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const range = e.range;
    const rowIdx = range.getRow();

    Logger.log(`📝 Processing row ${rowIdx}`);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    Logger.log(`📋 Headers: ${headers.join(", ")}`);

    let teamIdCol = headers.indexOf("Team ID") + 1;

    if (teamIdCol === 0) {
      teamIdCol = headers.length + 1;
      sheet.getRange(1, teamIdCol).setValue("Team ID");
      Logger.log(`➕ Created Team ID column at position ${teamIdCol}`);
    }

    let currentId = sheet.getRange(rowIdx, teamIdCol).getValue();
    let memberId = currentId;

    if (!memberId || memberId === "") {
      const allData = sheet.getDataRange().getValues();
      let maxNumber = 26002;

      for (let i = 1; i < allData.length; i++) {
        const existingId = allData[i][teamIdCol - 1];
        if (existingId && String(existingId).startsWith("TX-")) {
          const numPart = parseInt(String(existingId).replace("TX-", ""));
          if (!isNaN(numPart) && numPart > maxNumber) {
            maxNumber = numPart;
          }
        }
      }

      memberId = "TX-" + (maxNumber + 1);
      sheet.getRange(rowIdx, teamIdCol).setValue(memberId);
      Logger.log(`🆔 Generated Team ID: ${memberId}`);
    } else {
      Logger.log(`🆔 Existing Team ID: ${memberId}`);
    }

    const rowValues = sheet.getRange(rowIdx, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Trim headers to handle trailing spaces (e.g., "TEAM NAME " becomes "TEAM NAME")
    const trimmedHeaders = headers.map(h => String(h).trim());

    // Try multiple column name variations
    const teamNameIdx = trimmedHeaders.indexOf("TEAM NAME");
    const leadNameIdx = trimmedHeaders.indexOf("LEAD NAME");
    const domainIdx = trimmedHeaders.indexOf("DOMAINS");
    const emailIdx = trimmedHeaders.indexOf("Email address");

    const teamName = teamNameIdx !== -1 ? (rowValues[teamNameIdx] || "Your Team") : "Your Team";
    const leadName = leadNameIdx !== -1 ? (rowValues[leadNameIdx] || "Participant") : "Participant";
    const domain = domainIdx !== -1 ? (rowValues[domainIdx] || "General") : "General";
    const email = emailIdx !== -1 ? rowValues[emailIdx] : null;

    Logger.log(`👥 Team Name: "${teamName}"`);
    Logger.log(`👤 Lead Name: "${leadName}"`);
    Logger.log(`🎯 Domain: "${domain}"`);
    Logger.log(`📧 Email: "${email}"`);

    if (email) {
      Logger.log(`📤 Attempting to send email to: ${email}`);
      const emailResult = sendBrevoEmail(email, leadName, memberId, teamName, domain);
      if (emailResult) {
        Logger.log(`✅ Email sent successfully to: ${email} for Team ${memberId}`);
      } else {
        Logger.log(`❌ Email failed for: ${email}`);
      }
    } else {
      Logger.log(`⚠️ No email found for row ${rowIdx}`);
      Logger.log(`⚠️ Email column index: ${emailIdx}`);
    }

  } catch (error) {
    Logger.log("❌ onFormSubmit Error: " + error.toString());
    Logger.log("❌ Error stack: " + error.stack);
  }
}

// ------------------------------------------
// 3. SEND EMAIL WITH ENHANCED TEMPLATE
// ------------------------------------------
function sendBrevoEmail(toEmail, name, teamId, teamName, domain) {
  try {
    const url = "https://api.brevo.com/v3/smtp/email";
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(teamId)}`;

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%); color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #1a1a1a; padding: 40px; border-radius: 20px; border: 2px solid #D4AF37; box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);">
          
          <!-- HEADER -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; font-size: 36px; margin: 0; letter-spacing: 3px; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);">
              TECHATHON X 2K26
            </h1>
            <p style="color: #bc13fe; font-size: 14px; margin: 10px 0 0 0; letter-spacing: 2px;">NATIONAL LEVEL HACKATHON</p>
          </div>

          <!-- CONGRATULATIONS -->
          <div style="background: linear-gradient(135deg, #2a0a38, #1a1a1a); padding: 25px; border-radius: 15px; border-left: 4px solid #D4AF37; margin-bottom: 30px;">
            <h2 style="color: #00ffbf; margin: 0 0 10px 0; font-size: 24px;">🎉 CONGRATULATIONS!</h2>
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              Dear <strong style="color: #D4AF37;">${name}</strong>,<br><br>
              Your team <strong style="color: #D4AF37;">${teamName}</strong> has been <strong style="color: #00ffbf;">successfully registered</strong> for TechathonX 2K26! 
              Get ready for an exciting 24-hour journey of innovation and creativity.
            </p>
          </div>

          <!-- TEAM DETAILS -->
          <div style="background: #0d0d0d; padding: 25px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #333;">
            <h3 style="color: #D4AF37; margin: 0 0 20px 0; font-size: 18px; text-align: center;">YOUR TEAM DETAILS</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888; font-size: 14px;">TEAM ID</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #D4AF37; font-weight: bold; text-align: right; font-size: 18px;">${teamId}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888; font-size: 14px;">TEAM NAME</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-weight: bold; text-align: right;">${teamName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888; font-size: 14px;">TEAM LEADER</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; text-align: right;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 14px;">DOMAIN</td>
                <td style="padding: 12px 0; color: #00ffbf; font-weight: bold; text-align: right;">${domain}</td>
              </tr>
            </table>
          </div>

          <!-- QR CODE -->
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #D4AF37; font-size: 14px; margin-bottom: 15px; font-weight: bold;">YOUR ENTRY QR CODE</p>
            <div style="background: white; padding: 15px; display: inline-block; border-radius: 15px; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);">
              <img src="${qrCodeUrl}" alt="QR Code" width="180" height="180" style="display: block;">
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 10px;">Present this QR code at the venue entrance</p>
          </div>

          <!-- VENUE & TIMING -->
          <div style="background: linear-gradient(135deg, #1a0a2e, #0d0d0d); padding: 25px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #bc13fe;">
            <h3 style="color: #D4AF37; margin: 0 0 20px 0; font-size: 18px; text-align: center;">📍 EVENT DETAILS</h3>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #888; font-size: 12px; margin: 0;">VENUE</p>
              <p style="color: #fff; font-size: 16px; margin: 5px 0 0 0; font-weight: bold;">Main Auditorium & Central Library</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #888; font-size: 12px; margin: 0;">DATE & TIME</p>
              <p style="color: #00ffbf; font-size: 16px; margin: 5px 0 0 0; font-weight: bold;">24-Hour Hackathon</p>
              <p style="color: #ccc; font-size: 14px; margin: 5px 0 0 0;">Check your college notice board for exact dates</p>
            </div>
            
            <div>
              <p style="color: #888; font-size: 12px; margin: 0;">REPORTING TIME</p>
              <p style="color: #fff; font-size: 16px; margin: 5px 0 0 0; font-weight: bold;">9:00 AM Sharp</p>
            </div>
          </div>

          <!-- DOWNLOAD BUTTON -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://techathonx2k26-pec.vercel.app/register?mode=download&email=${encodeURIComponent(toEmail)}" 
               style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #f1c40f); color: #000; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4); letter-spacing: 1px;">
              📥 DOWNLOAD OFFICIAL ENTRY PASS
            </a>
          </div>

          <!-- FOOTER -->
          <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #D4AF37; font-size: 12px; margin: 0;">Authorized by TechathonX 2K26 Committee</p>
            <p style="color: #666; font-size: 11px; margin: 10px 0 0 0;">For queries, contact: ${SENDER_EMAIL}</p>
          </div>

        </div>
      </div>
    `;

    const payload = {
      "sender": { "name": SENDER_NAME, "email": SENDER_EMAIL },
      "to": [{ "email": toEmail, "name": name }],
      "subject": `🎉 Registration Confirmed - Team ${teamName} | TechathonX 2K26`,
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

    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    const responseText = response.getContentText();

    Logger.log(`📧 Brevo Response Code: ${code}`);
    Logger.log(`📧 Brevo Response: ${responseText}`);

    if (code === 201) {
      Logger.log("✅ Email sent successfully to: " + toEmail);
      return true;
    } else {
      Logger.log("⚠️ Email failed. Code: " + code + " | Response: " + responseText);
      return false;
    }
  } catch (e) {
    Logger.log("❌ Email error: " + e.toString());
    Logger.log("❌ Error stack: " + e.stack);
    return false;
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
    Logger.log(`\n📝 Processing row ${rowIdx}...`);
    const fakeEvent = { range: sheet.getRange(rowIdx, 1) };
    onFormSubmit(fakeEvent);
    Utilities.sleep(2000);
  }

  Logger.log("\n✅ Finished processing all rows.");
}

// ------------------------------------------
// 5. TEST FUNCTION
// ------------------------------------------
function testBrevoConnection() {
  Logger.log("🔍 Testing Brevo API...");
  const testEmail = "techathonx2k26.pec@gmail.com"; // Your email
  Logger.log(`📧 Sending test email to: ${testEmail}`);
  const result = sendBrevoEmail(testEmail, "Test Admin", "TX-TEST-001", "Debug Team", "Testing");
  if (result) {
    Logger.log("✅ Test complete. Check inbox: " + testEmail);
  } else {
    Logger.log("❌ Test failed. Check logs above for details.");
  }
}

// ------------------------------------------
// 6. DEBUG FUNCTION - Check Column Names
// ------------------------------------------
function debugColumnNames() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  Logger.log("📋 ALL COLUMN NAMES IN YOUR SHEET:");
  Logger.log("=====================================");
  headers.forEach((header, index) => {
    Logger.log(`Column ${index + 1}: "${header}" (length: ${header.length})`);
  });
  Logger.log("=====================================");

  // Check for specific columns
  Logger.log("\n🔍 CHECKING FOR KEY COLUMNS:");
  const keyColumns = ["TEAM NAME", "LEAD NAME", "Email address", "DOMAINS", "NO OF TEAM MEMBERS"];
  keyColumns.forEach(col => {
    const idx = headers.indexOf(col);
    if (idx !== -1) {
      Logger.log(`✅ Found "${col}" at column ${idx + 1}`);
    } else {
      Logger.log(`❌ NOT FOUND: "${col}"`);
    }
  });
}
