import { useState } from "react";
import { config } from "./config";
import { Calendar } from "./components/Calendar";
import { TimeSlots } from "./components/TimeSlots";
import { BookingForm } from "./components/BookingForm";
import { Confirmation } from "./components/Confirmation";
import type { Service, Booking } from "./types";

type Step = "service" | "datetime" | "form" | "confirmation";

export default function App() {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  function handleServiceSelect(service: Service) {
    setSelectedService(service);
    setStep("datetime");
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep("form");
  }

  function handleBookingComplete(newBooking: Booking) {
    setBooking(newBooking);
    setStep("confirmation");
  }

  function handleReset() {
    setStep("service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBooking(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{config.name}</h1>
          <p className="text-gray-500">Book an appointment</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["service", "datetime", "form", "confirmation"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s
                    ? "bg-indigo-600 text-white"
                    : i < ["service", "datetime", "form", "confirmation"].indexOf(step)
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`w-12 h-1 ${
                    i < ["service", "datetime", "form", "confirmation"].indexOf(step)
                      ? "bg-indigo-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        {step === "service" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a service</h2>
            <div className="grid gap-4">
              {config.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {service.duration} minutes
                      </p>
                    </div>
                    {service.price && (
                      <span className="text-lg font-semibold text-indigo-600">
                        ${service.price}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "datetime" && selectedService && (
          <div>
            <button
              onClick={() => setStep("service")}
              className="text-indigo-600 hover:underline mb-4 inline-block"
            >
              ← Back to services
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Select date & time for {selectedService.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
              {selectedDate && (
                <TimeSlots
                  date={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
              )}
            </div>
          </div>
        )}

        {step === "form" && selectedService && selectedDate && selectedTime && (
          <div>
            <button
              onClick={() => setStep("datetime")}
              className="text-indigo-600 hover:underline mb-4 inline-block"
            >
              ← Back to calendar
            </button>
            <BookingForm
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              onComplete={handleBookingComplete}
            />
          </div>
        )}

        {step === "confirmation" && booking && (
          <Confirmation booking={booking} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <a
            href="https://github.com/framework-hq/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            Built with FrameWork
          </a>
        </div>
      </footer>
    </div>
  );
}
