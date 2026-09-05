import { Resend } from "resend";
import { clinic } from "@/lib/data";

export type ContactEmailRequest = {
  name: string;
  email: string;
  message: string;
};

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function getSender() {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

async function sendContactNotification(contact: ContactEmailRequest) {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: `The Origin Physiotherapy <${getSender()}>`,
      to: clinic.email,
      subject: `New Contact Message from ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">New Contact Form Message</h2>
          <p style="color: #4a5568;">You received a new message from the website contact form:</p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #a0aec0; font-size: 12px;">
            This is an automated email from The Origin Physiotherapy website contact form.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending contact notification:", error);
    throw error;
  }
}

async function sendContactAutoReply(contact: ContactEmailRequest) {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: `The Origin Physiotherapy <${getSender()}>`,
      to: contact.email,
      subject: "Thank you for contacting The Origin Physiotherapy",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">We've Received Your Message</h2>
          <p style="color: #4a5568;">Hi ${contact.name},</p>

          <p style="color: #4a5568;">
            Thank you for reaching out to The Origin Physiotherapy & Rehabilitation.
            We've received your message and will get back to you within one business day.
          </p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748;">Contact Information</h3>
            <p>📍 ${clinic.address}</p>
            <p>📞 ${clinic.phone}</p>
            <p>📧 ${clinic.email}</p>
            <p>🕐 Mon-Sat: 9:00 AM - 8:00 PM | Sun: Closed</p>
          </div>

          <p style="color: #4a5568;">
            For immediate assistance, you can reach us on WhatsApp at
            <strong>${clinic.phone}</strong>.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #4a5568; font-weight: bold;">The Origin Physiotherapy & Rehabilitation</p>
            <p style="color: #a0aec0; font-size: 14px;">${clinic.address}</p>
          </div>

          <p style="color: #a0aec0; font-size: 12px; text-align: center; margin-top: 20px;">
            This is an automated email. Replies to this message are not monitored.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending contact auto-reply:", error);
    throw error;
  }
}

async function appendContactToGoogleSheet(contact: ContactEmailRequest) {
  const webhookUrl =
    process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Google Sheets webhook is not configured; skipping contact row.");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "contact",
      timestamp: new Date().toISOString(),
      ...contact,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with status ${response.status}.`);
  }
}

export async function POST(request: Request) {
  try {
    const contact = (await request.json()) as ContactEmailRequest;

    // Validate required fields
    if (!contact.name || !contact.email || !contact.message) {
      return Response.json(
        { error: "Missing required contact information" },
        { status: 400 }
      );
    }

    if (contact.message.trim().length < 10) {
      return Response.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Keep each notification independent so one integration outage does not block the contact.
    const results = await Promise.allSettled([
      sendContactNotification(contact),
      sendContactAutoReply(contact),
      appendContactToGoogleSheet(contact),
    ]);

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Contact notification failed:", result.reason);
      }
    });

    return Response.json(
      { success: true, message: "Contact message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact email handler:", error);
    return Response.json(
      { error: "Failed to send contact message" },
      { status: 500 }
    );
  }
}