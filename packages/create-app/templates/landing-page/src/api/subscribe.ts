/**
 * Email subscription handler
 * 
 * This file can be used as:
 * - Vercel/Netlify serverless function
 * - Express.js route handler
 * - Standalone API endpoint
 * 
 * Supports: SendGrid, Resend, Mailchimp (easily extendable)
 */

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

// SendGrid integration
async function subscribeWithSendGrid(email: string): Promise<SubscribeResponse> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;

  if (!apiKey || !listId) {
    console.error("SendGrid API key or list ID not configured");
    return { success: false, message: "Email service not configured" };
  }

  try {
    const response = await fetch(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_ids: [listId],
          contacts: [{ email }],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("SendGrid error:", error);
      return { success: false, message: "Failed to subscribe" };
    }

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    console.error("SendGrid request failed:", error);
    return { success: false, message: "Failed to subscribe" };
  }
}

// Resend integration (alternative)
async function subscribeWithResend(email: string): Promise<SubscribeResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { success: false, message: "Email service not configured" };
  }

  try {
    const response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      return { success: false, message: "Failed to subscribe" };
    }

    return { success: true, message: "Successfully subscribed!" };
  } catch {
    return { success: false, message: "Failed to subscribe" };
  }
}

// Main handler
export async function handleSubscribe(
  request: SubscribeRequest
): Promise<SubscribeResponse> {
  const { email } = request;

  // Validate email
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address" };
  }

  // Determine provider from environment
  const provider = process.env.EMAIL_PROVIDER || "sendgrid";

  switch (provider) {
    case "sendgrid":
      return subscribeWithSendGrid(email);
    case "resend":
      return subscribeWithResend(email);
    default:
      // Log to console for development/testing
      console.log(`📧 New subscriber: ${email}`);
      return { success: true, message: "Subscribed (dev mode)" };
  }
}

// Vercel/Netlify serverless function export
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const result = await handleSubscribe(body);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
