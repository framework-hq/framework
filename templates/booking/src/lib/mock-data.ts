import type { Booking } from "../types";
import { format, addDays } from "date-fns";

// Generate some mock bookings for demo
const today = new Date();

export const mockBookings: Booking[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 555-0123",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
    time: "10:00",
    service: "Consultation",
    status: "confirmed",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 555-0456",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
    time: "14:00",
    service: "Strategy Session",
    notes: "Wants to discuss Q2 planning",
    status: "confirmed",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1 555-0789",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
    time: "11:00",
    service: "Workshop",
    status: "confirmed",
    created_at: new Date().toISOString(),
  },
];
