/**
 * SMS Handler for Twilio
 * 
 * Deploy as:
 * - Vercel/Netlify serverless function
 * - Express.js route
 * - API endpoint
 */

import { smsConfig } from "../config";

interface SendSMSRequest {
  to: string;
  type: "confirmation" | "reminder" | "cancellation";
  booking: {
    name: string;
    date: string;
    time: string;
    service: string;
  };
}

interface SendSMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Twilio credentials (from environment)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

function getMessage(type: string, booking: SendSMSRequest["booking"]): string {
  switch (type) {
    case "confirmation":
      return smsConfig.confirmationMessage(booking);
    case "reminder":
      return smsConfig.reminderMessage(booking);
    case "cancellation":
      return smsConfig.cancellationMessage(booking);
    default:
      return "";
  }
}

export async function sendSMS(
  request: SendSMSRequest
): Promise<SendSMSResponse> {
  const { to, type, booking } = request;

  if (!smsConfig.enabled) {
    console.log(`[SMS Disabled] Would send ${type} to ${to}`);
    return { success: true, messageId: "disabled" };
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn("⚠️ Twilio credentials not configured");
    return { success: false, error: "SMS not configured" };
  }

  const message = getMessage(type, booking);

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          To: to,
          From: TWILIO_PHONE_NUMBER,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Twilio error:", error);
      return { success: false, error: error.message };
    }

    const result = await response.json();
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error("SMS send failed:", error);
    return { success: false, error: "Failed to send SMS" };
  }
}

// Serverless function handler
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const result = await sendSMS(body);

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
