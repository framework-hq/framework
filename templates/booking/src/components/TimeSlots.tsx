import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { generateTimeSlots, formatTime, formatDate } from "../lib/calendar";
import { getBookingsByDate } from "../lib/api";
import type { TimeSlot, Booking } from "../types";

interface TimeSlotsProps {
  date: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({ date, selectedTime, onTimeSelect }: TimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const bookings = await getBookingsByDate(dateStr);
        const timeSlots = generateTimeSlots(date, bookings);
        setSlots(timeSlots);
      } catch (error) {
        console.error("Failed to load slots:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSlots();
  }, [date]);

  const availableSlots = slots.filter((s) => s.available);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <span className="font-medium">{formatDate(date)}</span>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : availableSlots.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No available slots for this day
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && onTimeSelect(slot.time)}
              disabled={!slot.available}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium transition-colors
                ${selectedTime === slot.time 
                  ? "bg-indigo-600 text-white" 
                  : slot.available
                    ? "bg-gray-100 hover:bg-indigo-50 text-gray-900"
                    : "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                }
              `}
            >
              {formatTime(slot.time)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
