/**
 * Google Apps Script — The Origin Physiotherapy
 * ==============================================
 * Deploy this script as a **web app** inside your Google Sheet.
 *
 * Setup steps:
 *   1. Open your Google Sheet
 *   2. Extensions → Apps Script
 *   3. Paste this entire file (replace any default code)
 *   4. Click Deploy → New deployment → type: "Web app"
 *   5. Execute as: "Me", Who has access: "Anyone" (or "Anyone with link")
 *   6. Copy the web app URL and add it to your Next.js .env
 *      as GOOGLE_SHEETS_WEBHOOK_URL
 *   7. For the Contact form, add another deployment (or reuse the same script)
 *      and set GOOGLE_SHEETS_CONTACT_WEBHOOK_URL
 *
 * The script auto-creates two sheets: "Bookings" and "Contacts"
 * Each row contains the fields listed in the HEADERS below.
 */

/* -------------------------------------------------------------------------- */
/*  Sheet names & column headers                                              */
/* -------------------------------------------------------------------------- */

var BOOKINGS_SHEET_NAME = "Bookings";
var CONTACTS_SHEET_NAME = "Contacts";

var BOOKING_HEADERS = [
  "Timestamp",
  "Reference ID",
  "Patient Name",
  "Email",
  "Phone",
  "Service",
  "Appointment Date",
  "Notes",
];

var CONTACT_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Message",
];

/* -------------------------------------------------------------------------- */
/*  doPost — web app entry point                                              */
/* -------------------------------------------------------------------------- */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var type = payload.type || "booking"; // "booking" or "contact"

    if (type === "contact") {
      appendContactRow(payload);
    } else {
      appendBookingRow(payload);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/* -------------------------------------------------------------------------- */
/*  Append a booking row                                                      */
/* -------------------------------------------------------------------------- */

function appendBookingRow(data) {
  var sheet = getOrCreateSheet(BOOKINGS_SHEET_NAME, BOOKING_HEADERS);

  sheet.appendRow([
    new Date(),                         // Timestamp
    data.reference || "",               // Reference ID
    data.name || "",                    // Patient Name
    data.email || "",                   // Email
    data.phone || "",                   // Phone
    data.service || "",                 // Service
    data.date || "",                    // Appointment Date
    data.notes || "",                   // Notes
  ]);

  // Auto-resize columns for readability
  autoResizeColumns(sheet, BOOKING_HEADERS.length);
}

/* -------------------------------------------------------------------------- */
/*  Append a contact row                                                      */
/* -------------------------------------------------------------------------- */

function appendContactRow(data) {
  var sheet = getOrCreateSheet(CONTACTS_SHEET_NAME, CONTACT_HEADERS);

  sheet.appendRow([
    new Date(),                         // Timestamp
    data.name || "",                    // Name
    data.email || "",                   // Email
    data.message || "",                 // Message
  ]);

  autoResizeColumns(sheet, CONTACT_HEADERS.length);
}

/* -------------------------------------------------------------------------- */
/*  Helper — get or create a sheet with headers if needed                     */
/* -------------------------------------------------------------------------- */

function getOrCreateSheet(sheetName, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Write header row
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Style the header row
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#e8f5e9")
      .setFontColor("#1b5e20");
    // Freeze header row
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/* -------------------------------------------------------------------------- */
/*  Helper — auto-resize columns                                              */
/* -------------------------------------------------------------------------- */

function autoResizeColumns(sheet, numCols) {
  for (var i = 1; i <= numCols; i++) {
    sheet.autoResizeColumn(i);
  }
}

/* -------------------------------------------------------------------------- */
/*  Helper — doGet for testing (visit the web app URL in a browser)           */
/* -------------------------------------------------------------------------- */

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      message: "The Origin Physiotherapy — Google Sheets webhook is live.",
      availableEndpoints: {
        booking: 'POST with { type: "booking", name, email, phone, service, date, notes, reference }',
        contact: 'POST with { type: "contact", name, email, message }',
      },
    })
  ).setMimeType(ContentService.MimeType.JSON);
}