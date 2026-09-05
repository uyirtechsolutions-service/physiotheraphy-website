# Google Apps Script — The Origin Physiotherapy

This directory contains the Apps Script that powers the Google Sheets webhook
integration. When a patient books an appointment or sends a contact message on
the website, the Next.js backend posts the data here and this script appends
it to your Google Sheet.

---

## 🚀 Step-by-Step Deployment

### 1. Open Google Sheets
Create a new Google Sheet (or open an existing one).

### 2. Open Apps Script Editor
**Extensions** → **Apps Script**

### 3. Paste the Script
Replace the default `Code.gs` content with the entire content of
[`./Code.gs`](./Code.gs) from this directory.

### 4. Deploy as a Web App
1. Click **Deploy** → **New deployment**
2. Set **Type** to **Web app**
3. **Execute as**: `Me (your-email@gmail.com)`
4. **Who has access**: `Anyone` *(If you choose "Anyone with link", only
   requests with a valid Google account header will work.)*
5. Click **Deploy**

### 5. Authorize
Google will prompt you to authorize the script. Click **Review permissions**,
choose your account, then **Allow**. *(You may see an "unverified app"
warning — click Advanced → Go to…)*

### 6. Copy the Web App URL
After deployment you'll see a URL like:
```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
```
Copy this URL.

### 7. Add to your `.env` file
Open `.env` (create from `.env.example`) and paste:
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...your-url.../exec
```

> **Note:** If you want separate sheets for bookings and contacts (or separate
> URLs), you can deploy the same script twice — once for each purpose — and
> set `GOOGLE_SHEETS_CONTACT_WEBHOOK_URL` for the contact form. Alternatively,
> the single URL handles both via the `type` field.

---

## 🧪 Testing the Webhook

```bash
# Test booking endpoint
curl -X POST https://script.google.com/macros/s/YOUR_ID/exec \
  -H "Content-Type: application/json" \
  -d '{
    "type": "booking",
    "name": "Test Patient",
    "email": "test@example.com",
    "phone": "+91 99999 99999",
    "service": "Pain Management",
    "date": "Monday, January 15, 2026",
    "notes": "Test booking via cURL",
    "reference": "PC-ABC123"
  }'

# Test contact endpoint
curl -X POST https://script.google.com/macros/s/YOUR_ID/exec \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message."
  }'
```

---

## 🗂️ What the Script Does

| Sheet Name  | Created When          | Columns                                              |
|-------------|-----------------------|------------------------------------------------------|
| **Bookings**| First booking arrives | Timestamp, Reference ID, Name, Email, Phone, Service, Date, Notes |
| **Contacts**| First contact arrives | Timestamp, Name, Email, Message                     |

- Header rows are styled (green background, bold text) and frozen.
- Columns auto-resize after each append.
- A `doGet()` test endpoint is available for quick browser verification.

---

## 🔁 Updating the Script
If you modify `Code.gs`, you must create a **new deployment** (Deploy →
Manage deployments → Edit → New version → Deploy). The URL remains the same
if you redeploy the same project.

---

## 🛡️ Security Notes
- The web app URL is effectively a secret — anyone with it can POST data to
  your sheet. Keep your `.env` file out of version control.
- Consider restricting **Who has access** to `Anyone` for public sites.
- For additional security, you can add a shared secret token validation in
  the Apps Script and send it as a custom header from Next.js.