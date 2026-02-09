# TECHATHON X 2K26 - COMPLETE SYSTEM GUIDE

## ✅ ALL ISSUES FIXED

### 1. **ID CARD IMPROVEMENTS**
- ✅ **Background Image**: Now uses `entry.png` from public folder
  - Place your converted `entry.png` in `public/` folder
  - The card will overlay text on your custom background
- ✅ **Bold Text**: All text is now font-weight 900 (extra bold)
- ✅ **Team Name Visible**: Increased font size to 17px with bold weight
- ✅ **Team Size Added**: Shows "X Members" on the ID card
- ✅ **Golden Color Scheme**: All text uses #D4AF37 (golden)

### 2. **ADMIN SCANNER ENHANCEMENTS**
Now shows **COMPLETE participant details**:
- ✅ Team ID
- ✅ Team Name
- ✅ Team Leader Name
- ✅ **Team Size** (number of members)
- ✅ College Name
- ✅ Domain
- ✅ Email Address
- ✅ Phone Number
- ✅ **Transaction ID**

### 3. **PAYMENT VERIFICATION SYSTEM**
The admin page now includes:
- ✅ **Payment Status Badge**: Shows "PAID" (green) or "NOT PAID" (red)
- ✅ **Transaction ID Display**: Shows the UPI/UTR transaction ID
- ✅ **View Payment Screenshot**: Button to open Google Sheet and verify screenshot
- ✅ **Manual Payment Confirmation**: For teams who pay at venue
  - Admin can mark as "PAID" manually
  - Updates Google Sheet automatically

### 4. **EMAIL SYSTEM**
- ✅ Sends to **team leader only** (main "Email address" column)
- ✅ **Enhanced Email Template** includes:
  - 🎉 Congratulations message
  - Team ID, Team Name, Team Leader, Domain
  - QR Code (200x200px)
  - 📍 **Venue**: Main Auditorium & Central Library
  - ⏰ **Timing**: 9:00 AM Sharp, 24-Hour Hackathon
  - Golden color scheme (#D4AF37)
  - Download Entry Pass button

---

## 📋 SETUP INSTRUCTIONS

### **Step 1: Update Google Apps Script**
1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. **Delete all old code**
4. **Copy** the entire code from `GOOGLE_APPS_SCRIPT_CODE.js`
5. **Paste** into the editor
6. Click **Save** 💾

### **Step 2: Deploy the Script**
1. Click **Deploy** → **New deployment** (or **Manage deployments** → Edit)
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** ⚠️ (CRITICAL!)
5. Click **Deploy**
6. **Copy the Web App URL**
7. Update the URL in:
   - `src/pages/AdminPage.jsx` (line 7)
   - `src/pages/RegisterPage.jsx` (line 10)

### **Step 3: Set Up Email Trigger**
1. In Apps Script, click the **Clock icon** ⏰ (Triggers)
2. Click **+ Add Trigger**
3. Function: `onFormSubmit`
4. Event source: `From spreadsheet`
5. Event type: `On form submit`
6. Click **Save**

### **Step 4: Test Email Sending**
1. In Apps Script, select `testBrevoConnection` from dropdown
2. Click **Run** ▶️
3. Check inbox: `techathonx2k26.pec@gmail.com`
4. You should receive a test email

### **Step 5: Add Entry Background Image**
1. Convert your `entry.pdf` to `entry.png` (use online converter)
2. Place `entry.png` in the `public/` folder of your React project
3. The ID card will now use this as background

---

## 🎨 ID CARD DESIGN

The ID card now displays:
```
┌─────────────────────────────────────┐
│      TECHATHON X 2K26               │
│      Official Entry Pass            │
│                                     │
│         [QR CODE]                   │
│                                     │
│  TEAM ID:        TX-26003          │
│  TEAM NAME:      Core Four         │
│  TEAM LEADER:    P R Kaamesh       │
│  TEAM SIZE:      4 Members         │
│  DOMAIN:         AI                │
│                                     │
│  VENUE: Main Auditorium &          │
│         Central Library            │
│                                     │
│  Authorized by TechathonX 2K26     │
│  Committee                         │
└─────────────────────────────────────┘
```

**Colors:**
- Background: Custom image (`entry.png`) or dark gradient
- Text: Golden (#D4AF37)
- Domain: Cyan (#00ffbf)
- All text: **Extra Bold (900 weight)**

---

## 🔍 ADMIN SCANNER FEATURES

### **Scan Flow:**
1. Admin opens `/admin-scan`
2. Clicks "START QR SCAN" or enters Team ID manually
3. System fetches all participant details
4. Shows:
   - Team information
   - Payment status (PAID/NOT PAID)
   - Transaction ID
   - Attendance status (PRESENT/ABSENT)

### **Payment Verification:**
- **If PAID**: Shows green badge + transaction ID
  - Admin can click "VIEW PAYMENT SCREENSHOT"
  - Opens Google Sheet to verify screenshot
- **If NOT PAID**: Shows red badge
  - Admin can click "MARK AS PAID (Manual Verification)"
  - Updates Google Sheet with manual confirmation

### **Attendance Marking:**
- Click "MARK ATTENDANCE" button
- Updates Google Sheet "Attendance" column to "PRESENT"
- Badge changes from red (ABSENT) to green (PRESENT)

---

## 📊 GOOGLE SHEET COLUMNS

Your form should have these columns (exact names):
- `Timestamp`
- `Email address` ← Main email (team leader)
- `TEAM NAME`
- `NO OF TEAM MEMBERS`
- `COLLEGE NAME`
- `LEAD NAME`
- `DOMAINS`
- `Transaction ID (UTR/UPI)`
- `SCREENSHOT UPLOAD` ← Payment proof
- `Team ID` ← Auto-generated (TX-26003, TX-26004, etc.)
- `Attendance` ← Auto-created when first attendance is marked

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Google Apps Script updated and deployed
- [ ] Trigger set for `onFormSubmit`
- [ ] Test email sent successfully
- [ ] `entry.png` placed in `public/` folder
- [ ] React app URLs updated with new deployment URL
- [ ] Website deployed to Vercel
- [ ] Google Form linked correctly
- [ ] Test form submission → Email received → ID card downloaded
- [ ] Admin scanner tested with QR code
- [ ] Payment verification tested

---

## 🎯 TESTING STEPS

### **Test 1: Registration Flow**
1. Fill Google Form
2. Submit
3. Check email (team leader should receive within 1-2 minutes)
4. Click "DOWNLOAD OFFICIAL ENTRY PASS" in email
5. Verify ID card shows all details correctly

### **Test 2: Admin Scanner**
1. Go to `/admin-scan`
2. Scan QR code from email
3. Verify all details appear
4. Check payment status
5. Click "MARK ATTENDANCE"
6. Verify Google Sheet updated

### **Test 3: Payment Verification**
1. Scan a team with transaction ID
2. Verify "PAID" badge appears
3. Click "VIEW PAYMENT SCREENSHOT"
4. Check Google Sheet for screenshot link

---

## 🔧 TROUBLESHOOTING

### **Emails Not Sending:**
1. Check Apps Script **Executions** tab for errors
2. Verify Brevo API key is valid
3. Ensure trigger is set correctly
4. Check "Email address" column exists in sheet

### **ID Card Blank:**
1. Ensure `entry.png` exists in `public/` folder
2. Check browser console for errors
3. Verify image is PNG format (not PDF)

### **Admin Scanner Not Working:**
1. Verify Google Apps Script URL is correct
2. Check deployment is set to "Anyone" access
3. Ensure Team ID column exists in sheet

---

## 📞 SUPPORT

For issues, check:
1. Browser console (F12) for errors
2. Google Apps Script **Executions** tab
3. Network tab to see API responses

**Email:** techathonx2k26.pec@gmail.com

---

## 🎉 SYSTEM READY!

All features are now implemented:
✅ Beautiful golden ID cards with custom background
✅ Email confirmations with venue & timing
✅ Admin scanner with full participant details
✅ Payment verification system
✅ Manual payment confirmation
✅ Attendance tracking
✅ Team size display

**Your TechathonX 2K26 registration system is complete!** 🚀
