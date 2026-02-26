import { useState } from "react";
import { config, emailConfig } from "../config";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!config.emailCapture.enabled) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(emailConfig.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="signup" className="section-padding bg-indigo-600">
      <div className="container-narrow text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          {config.emailCapture.headline}
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          {config.emailCapture.subtext}
        </p>

        {status === "success" ? (
          <div className="mt-8 inline-flex items-center gap-2 text-white bg-indigo-500 px-6 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            {config.emailCapture.successMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {config.emailCapture.buttonText}
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
            {status === "error" && (
              <div className="mt-3 flex items-center justify-center gap-2 text-red-200">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}
          </form>
        )}

        <p className="mt-4 text-sm text-indigo-200">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
