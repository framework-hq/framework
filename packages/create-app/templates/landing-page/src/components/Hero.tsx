import { config } from "../config";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="section-padding container-wide">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            <span className="mr-2">🚀</span>
            Now available — Get started free
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            {config.siteName}
            <span className="block text-indigo-600 mt-2">{config.tagline}</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {config.description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#signup" className="btn-primary">
              {config.cta.primary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#features" className="btn-secondary">
              {config.cta.secondary}
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white"
                  />
                ))}
              </div>
              <span>Trusted by 1,000+ teams</span>
            </div>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-2xl aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <span className="text-gray-400 text-lg">
              [Your product screenshot here]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
