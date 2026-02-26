import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, User, Mail, Phone, FileText } from "lucide-react";
import { createBooking } from "../lib/api";
import { formatTime } from "../lib/calendar";
import type { Service, Booking } from "../types";

interface BookingFormProps {
  service: Service;
  date: Date;
  time: string;
  onComplete: (booking: Booking) => void;
}

export function BookingForm({ service, date, time, onComplete }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const booking = await createBooking({
        ...formData,
        date: format(date, "yyyy-MM-dd"),
        time,
        service: service.name,
      });
      onComplete(booking);
    } catch (err) {
      setError("Failed to create booking. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Complete your booking</h2>

      {/* Summary */}
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-indigo-900 mb-2">{service.name}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-indigo-700">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(date, "EEEE, MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatTime(time)}
          </span>
        </div>
        {service.price && (
          <p className="mt-2 font-semibold text-indigo-900">${service.price}</p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4 inline mr-1" />
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number * (for SMS reminders)
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="+1 555-0123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="w-4 h-4 inline mr-1" />
            Notes (optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Anything you'd like us to know..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
