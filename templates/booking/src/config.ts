import type { BusinessConfig } from "./types";

// ============================================
// CUSTOMIZE YOUR BOOKING PAGE HERE
// ============================================

export const config: BusinessConfig = {
  name: "Your Business",
  timezone: "America/New_York",
  
  workingHours: {
    start: "09:00",
    end: "17:00",
  },
  
  // Days open (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  
  // Appointment slot duration in minutes
  slotDuration: 30,
  
  // Services offered
  services: [
    {
      id: "consultation",
      name: "Consultation",
      duration: 30,
      price: 50,
      description: "30-minute consultation call",
    },
    {
      id: "strategy",
      name: "Strategy Session",
      duration: 60,
      price: 150,
      description: "1-hour deep dive strategy session",
    },
    {
      id: "workshop",
      name: "Workshop",
      duration: 120,
      price: 300,
      description: "2-hour hands-on workshop",
    },
  ],
};

// ============================================
// SMS CONFIGURATION
// ============================================

export const smsConfig = {
  enabled: true,
  provider: "twilio",
  
  // Messages (customize these)
  confirmationMessage: (booking: { name: string; date: string; time: string; service: string }) =>
    `Hi ${booking.name}! Your ${booking.service} is confirmed for ${booking.date} at ${booking.time}. Reply CANCEL to cancel.`,
  
  reminderMessage: (booking: { name: string; time: string; service: string }) =>
    `Reminder: Your ${booking.service} is in 1 hour at ${booking.time}. See you soon!`,
  
  cancellationMessage: (booking: { name: string }) =>
    `Hi ${booking.name}, your appointment has been cancelled. Book again anytime!`,
};
