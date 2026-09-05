# The Origin Physiotherapy & Rehabilitation — Website

A modern, responsive website for The Origin Physiotherapy & Rehabilitation
clinic in Coimbatore, Tamil Nadu. Built with **Next.js 16**, **TypeScript**,
and **Tailwind CSS v4**.

## 🚀 Quick Start

```bash
npm install
cp .env.example .env        # then fill in your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Features

- **Appointment Booking** — multi-step form with calendar date picker
- **Service Showcase** — detailed pages for each physiotherapy service
- **Contact Form** — sends email notifications + writes to Google Sheets
- **Responsive Design** — Tailwind CSS v4 with mobile-first approach
- **Email Notifications** — powered by [Resend](https://resend.com)
- **Google Sheets Integration** — bookings and contact messages sync to a live spreadsheet

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) for sending emails |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Yes | Google Apps Script web app URL (handles bookings & contacts) |
| `GOOGLE_SHEETS_CONTACT_WEBHOOK_URL` | No | Override URL for contact form only (falls back to `GOOGLE_SHEETS_WEBHOOK_URL`) |

---

## 📊 Google Sheets Integration

The website sends booking and contact form submissions to Google Sheets via a
webhook. Follow the step-by-step guide in
**[`google-apps-script/README.md`](./google-apps-script/README.md)**.

**Quick summary:**

1. Open your Google Sheet → **Extensions → Apps Script**
2. Paste `google-apps-script/Code.gs` into the editor
3. **Deploy → New deployment → Web app** (execute as "Me", access "Anyone")
4. Copy the web app URL → paste into `.env` as `GOOGLE_SHEETS_WEBHOOK_URL`

### What gets tracked

| Sheet | Columns |
|---|---|
| **Bookings** | Timestamp, Reference ID, Patient Name, Email, Phone, Service, Appointment Date, Notes |
| **Contacts** | Timestamp, Name, Email, Message |

Sheets are auto-created on first submission. Header rows are styled (green
background, bold font) and frozen.

---

## 🧪 Testing the Google Sheets Webhook

```bash
# Test booking
curl -X POST https://script.google.com/macros/s/YOUR_ID/exec \
  -H "Content-Type: application/json" \
  -d '{"type":"booking","name":"Test","email":"t@t.com","phone":"123","service":"Pain","date":"Jan 1","notes":"test","reference":"PC-ABC123"}'

# Test contact
curl -X POST https://script.google.com/macros/s/YOUR_ID/exec \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"Test","email":"t@t.com","message":"Hello from test"}'
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── send-booking-email/route.ts   # Booking emails + Google Sheets
│   │   └── send-contact-email/route.ts   # Contact emails + Google Sheets
│   ├── about/page.tsx
│   ├── book/page.tsx                     # Booking page
│   ├── contact/page.tsx                  # Contact page
│   ├── services/page.tsx
│   ├── layout.tsx
│   ├── page.tsx                          # Home page
│   └── providers.tsx                     # Redux provider
├── components/
│   ├── BookingForm.tsx                   # Multi-step booking form
│   ├── ContactForm.tsx                   # Contact form
│   ├── FloatingWidgets.tsx               # WhatsApp / phone floaters
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/
│   ├── data.ts                           # Clinic info, services, therapists
│   ├── hooks.ts                          # Redux typed hooks
│   ├── images.ts                         # Image imports
│   └── store.ts                          # Redux store
google-apps-script/
├── Code.gs                               # Apps Script for Google Sheets
└── README.md                             # Deployment guide
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Redux Toolkit |
| Email | Resend |
| Google Sheets | Apps Script Web App |
| Deployment | Vercel (recommended) |

---

## 📝 License

Private — The Origin Physiotherapy & Rehabilitation
