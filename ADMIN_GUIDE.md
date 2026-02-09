
# ADMIN & SETUP GUIDE

## 1. GETTING YOUR BREVO API KEY (For Emails)
To send emails to participants, you need a free API key from Brevo (formerly Sendinblue):
1. Go to [Brevo Signup](https://onboarding.brevo.com/account/register) and create a free account.
2. Once logged in, go to **Settings** (top right profile icon) -> **SMTP & API**.
3. Click on the **API Keys** tab.
4. Click **+ Generate a new API key**.
5. Name it "Techathon Script" and copy the key (it starts with `xkeysib-...`).
6. Paste this key into `GOOGLE_APPS_SCRIPT_CODE.js` where it says `YOUR_BREVO_API_KEY_HERE`.

---

## 2. ENSURING ALL EMAILS ARE SENT
- The script has a **Trigger** (`onFormSubmit`) that sends an email *automatically* when a new form is submitted.
- **If some emails were missed** (e.g., before the script was running):
  1. Open the Google Script Editor.
  2. Select the function `processAllRows` from the dropdown at the top.
  3. Click **Run**.
  - This checks *every* row. If a row has no Team ID, it generates one and sends the email.

---

## 3. SETTING UP THE ID CARD DESIGN
You mentioned you will upload an image for the ID card background.
1. Name your image file: `id_card_bg.png`
2. Place it inside the `public` folder of your project:
   `techfinal - Copy/public/id_card_bg.png`
3. The website will automatically use this image as the background for the ID card.
4. The QR code and text will overlay on top of it. You can adjust their positions in `IDCard.jsx` if needed.

---

## 4. USING THE ADMIN QR SCANNER
I have created a special Admin Page for you to scan QR codes.
1. Open your website.
2. Go to: `https://YOUR-WEBSITE-URL/admin-scan`
   (e.g., `localhost:5173/admin-scan`)
3. **Allow Camera Access** when prompted.
4. Scan a participant's QR code.
5. The screen will show their **Team Details** and **Payment Status**.

---

## 5. RE-DEPLOYMENT
After adding the image and testing, don't forget to deploy your changes:
`npm run build` 
(and then deploy to Vercel/Netlify)
