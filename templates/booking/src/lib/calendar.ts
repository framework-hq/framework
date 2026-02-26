import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
  isToday,
  isBefore,
  parse,
  addMinutes,
} from "date-fns";
import { config } from "../config";
import type { TimeSlot, Booking } from "../types";

export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function isWorkingDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return config.workingDays.includes(dayOfWeek);
}

export function generateTimeSlots(
  date: Date,
  existingBookings: Booking[]
): TimeSlot[] {
  if (!isWorkingDay(date)) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const { start, end } = config.workingHours;
  const duration = config.slotDuration;

  let currentTime = parse(start, "HH:mm", date);
  const endTime = parse(end, "HH:mm", date);
  const now = new Date();

  while (isBefore(currentTime, endTime)) {
    const timeStr = format(currentTime, "HH:mm");
    const dateStr = format(date, "yyyy-MM-dd");

    // Check if slot is in the past
    const slotDateTime = parse(
      `${dateStr} ${timeStr}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const isPast = isBefore(slotDateTime, now);

    // Check if slot is already booked
    const isBooked = existingBookings.some(
      (b) =>
        b.date === dateStr &&
        b.time === timeStr &&
        b.status !== "cancelled"
    );

    slots.push({
      time: timeStr,
      available: !isPast && !isBooked,
    });

    currentTime = addMinutes(currentTime, duration);
  }

  return slots;
}

export function formatDate(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy");
}

export function formatDateShort(date: Date): string {
  return format(date, "MMM d");
}

export function formatTime(time: string): string {
  return format(parse(time, "HH:mm", new Date()), "h:mm a");
}
