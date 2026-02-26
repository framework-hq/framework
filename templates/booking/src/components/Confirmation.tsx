import { CheckCircle, Calendar, Clock, Mail, Phone, MessageSquare } from "lucide-react";
import { formatTime, formatDate } from "../lib/calendar";
import { parse } from "date-fns";
import type { Booking } from "../types";

interface ConfirmationProps {
  booking: Booking;
  onReset: () => void;
}

export function Confirmation({ booking, onReset }: ConfirmationProps) {
  const bookingDate = parse(booking.date, "yyyy-MM-dd", new Date());

  return (
    <div className="text-center max-w-md mx-auto">
      {/* Success icon */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-6">
        We've sent a confirmation to your email and phone.
      </p>

      {/* Booking details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-left mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">{booking.service}</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-gray-400" />
            {formatDate(bookingDate)}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-5 h-5 text-gray-400" />
            {formatTime(booking.time)}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5 text-gray-400" />
            {booking.email}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5 text-gray-400" />
            {booking.phone}
          </div>
        </div>

        {booking.notes && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">{booking.notes}</p>
          </div>
        )}
      </div>

      {/* SMS reminder note */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">SMS Reminder</p>
            <p className="text-sm text-blue-700">
              You'll receive a reminder 1 hour before your appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={onReset}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Book Another Appointment
      </button>
    </div>
  );
}
