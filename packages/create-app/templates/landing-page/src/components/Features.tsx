import { config } from "../config";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Type-safe icon lookup
const iconMap = Icons as unknown as Record<string, LucideIcon>;

export function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Built with the features that matter, none of the bloat.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Icons.Circle;
            
            return (
              <div
                key={index}
                className="relative p-6 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
