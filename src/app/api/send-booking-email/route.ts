import { Resend } from "resend";
import { clinic } from "@/lib/data";

export type BookingEmailRequest = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
  reference: string;
};

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function getSender() {
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!sender || sender === "onboarding@resend.dev") {
    throw new Error(
      "Patient email delivery requires RESEND_FROM_EMAIL to be a sender from a domain verified in Resend."
    );
  }
  return sender;
}

function hasVerifiedSender() {
  const sender = process.env.RESEND_FROM_EMAIL;
  return Boolean(sender && sender !== "onboarding@resend.dev");
}

async function sendClinicNotification(booking: BookingEmailRequest) {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `The Origin Physiotherapy <${getSender()}>`,
      to: clinic.email,
      replyTo: booking.email,
      subject: `New Appointment Request - ${booking.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">New Appointment Request</h2>
          <p style="color: #4a5568;">A new appointment request has been received:</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Patient Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Appointment Date:</strong> ${booking.date}</p>
            <p><strong>Reference ID:</strong> ${booking.reference}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
          </div>
          
          <p style="color: #4a5568;">Please contact the patient to confirm the appointment.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #a0aec0; font-size: 12px;">This is an automated email from The Origin Physiotherapy booking system.</p>
        </div>
      `,
    });
    if (error) {
      throw new Error(`Clinic notification failed: ${error.message}`);
    }
  } catch (error) {
    console.error("Error sending clinic notification:", error);
    throw error;
  }
}

async function sendPatientConfirmation(booking: BookingEmailRequest) {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `The Origin Physiotherapy <${getSender()}>`,
      to: booking.email,
      subject: "Your Appointment Request Received - The Origin Physiotherapy",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Thank You for Your Appointment Request</h2>
          <p style="color: #4a5568;">Hi ${booking.name},</p>
          
          <p style="color: #4a5568;">We've received your appointment request. Our team will contact you shortly at <strong>${booking.phone}</strong> to confirm your booking.</p>
          
          <h3 style="color: #2d3748; margin-top: 20px;">Appointment Details</h3>
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Requested Date:</strong> ${booking.date}</p>
            <p><strong>Location:</strong> ${clinic.address}</p>
            <p><strong>Reference ID:</strong> ${booking.reference}</p>
          </div>
          
          <h3 style="color: #2d3748; margin-top: 20px;">Next Steps</h3>
          <ul style="color: #4a5568;">
            <li>Our team will call you to confirm the appointment date and time</li>
            <li>You can also reach us at <strong>${clinic.phone}</strong></li>
            <li>WhatsApp: <strong>${clinic.whatsapp}</strong></li>
            <li>Free cancellation up to 24 hours before your appointment</li>
          </ul>
          
          <p style="color: #4a5568; margin-top: 20px;">If you have any questions, feel free to reach out to us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #4a5568;"><strong>The Origin Physiotherapy & Rehabilitation</strong></p>
            <p style="color: #a0aec0; font-size: 14px;">
              📍 ${clinic.address}<br/>
              📞 ${clinic.phone}<br/>
              🕐 Mon-Sat: 9:00 AM - 8:00 PM | Sun: Closed
            </p>
          </div>
          
          <p style="color: #a0aec0; font-size: 12px; text-align: center; margin-top: 20px;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    });
    if (error) {
      throw new Error(`Patient confirmation failed: ${error.message}`);
    }
  } catch (error) {
    console.error("Error sending patient confirmation:", error);
    throw error;
  }
}

async function appendBookingToGoogleSheet(booking: BookingEmailRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Google Sheets webhook is not configured; skipping booking row.");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "booking",
      timestamp: new Date().toISOString(),
      ...booking,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with status ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "Google Sheets webhook did not return JSON. Deploy the Apps Script as a web app with access set to Anyone."
    );
  }

  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    error?: string;
  } | null;

  if (!result?.success) {
    throw new Error(result?.error || "Google Sheets webhook did not confirm the booking row.");
  }
}

export async function POST(request: Request) {
  try {
    const booking = (await request.json()) as BookingEmailRequest;

    // Validate required fields
    if (!booking.name || !booking.email || !booking.phone || !booking.service || !booking.date || !booking.reference) {
      return Response.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Keep each notification independent so one integration outage does not block the booking.
    const [clinicResult, patientResult, sheetResult] = await Promise.allSettled([
      sendClinicNotification(booking),
      sendPatientConfirmation(booking),
      appendBookingToGoogleSheet(booking),
    ]);

    const emailFailures = [clinicResult, patientResult].filter(
      (result) => result.status === "rejected"
    );
    emailFailures.forEach((result) => console.error("Booking email failed:", result.reason));

    const sheetFailed = sheetResult.status === "rejected";
    if (sheetFailed) {
      console.error("Booking Google Sheets sync failed:", sheetResult.reason);
    }

    if (sheetFailed) {
      const errorMessage =
        emailFailures.length > 0
          ? "Booking could not update Google Sheets or send emails."
          : "Emails were sent, but the booking could not be added to Google Sheets.";
      return Response.json(
        { error: errorMessage },
        { status: 502 }
      );
    }

    if (emailFailures.length > 0) {
      return Response.json(
        {
          success: true,
          warning: hasVerifiedSender()
            ? "Booking saved, but one or more confirmation emails could not be sent."
            : "Booking saved, but emails were not sent. Set RESEND_FROM_EMAIL to an address from a verified Resend domain.",
        },
        { status: 200 }
      );
    }

    return Response.json(
      { success: true, message: "Booking confirmation emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in booking email handler:", error);
    return Response.json(
      { error: "Failed to send booking confirmation emails" },
      { status: 500 }
    );
  }
}
