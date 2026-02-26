import type { Booking } from "../types";
import { mockBookings } from "./mock-data";

// In-memory store for demo (replace with database in production)
let bookings = [...mockBookings];

export async function getBookings(): Promise<Booking[]> {
  return bookings;
}

export async function getBookingsByDate(date: string): Promise<Booking[]> {
  return bookings.filter((b) => b.date === date && b.status !== "cancelled");
}

export async function createBooking(
  data: Omit<Booking, "id" | "status" | "created_at">
): Promise<Booking> {
  const newBooking: Booking = {
    ...data,
    id: crypto.randomUUID(),
    status: "confirmed",
    created_at: new Date().toISOString(),
  };

  bookings.push(newBooking);

  // Send confirmation SMS (in production)
  await sendConfirmationSMS(newBooking);

  return newBooking;
}

export async function cancelBooking(id: string): Promise<void> {
  const booking = bookings.find((b) => b.id === id);
  if (booking) {
    booking.status = "cancelled";
    // Send cancellation SMS (in production)
    await sendCancellationSMS(booking);
  }
}

// ============================================
// SMS FUNCTIONS (Twilio integration)
// ============================================

async function sendConfirmationSMS(booking: Booking): Promise<void> {
  // In demo mode, just log
  console.log(`📱 [SMS] Confirmation sent to ${booking.phone}`);
  
  // In production, call the API endpoint
  // await fetch('/api/sms/send', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: booking.phone,
  //     type: 'confirmation',
  //     booking,
  //   }),
  // });
}

async function sendCancellationSMS(booking: Booking): Promise<void> {
  console.log(`📱 [SMS] Cancellation sent to ${booking.phone}`);
}

export async function sendReminderSMS(booking: Booking): Promise<void> {
  console.log(`📱 [SMS] Reminder sent to ${booking.phone}`);
}
