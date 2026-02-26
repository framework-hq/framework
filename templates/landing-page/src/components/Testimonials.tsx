import { config } from "../config";
import { Quote } from "lucide-react";

export function Testimonials() {
  if (!config.testimonials || config.testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Loved by teams everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what others are saying about us.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Quote className="w-8 h-8 text-indigo-200 mb-4" />
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
