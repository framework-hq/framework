// ============================================
// CUSTOMIZE YOUR LANDING PAGE HERE
// ============================================

export const config = {
  // Basic info
  siteName: "YourProduct",
  tagline: "Build faster. Ship sooner.",
  description: "The modern way to build internal tools without the overhead.",
  
  // Call to action
  cta: {
    primary: "Get Started Free",
    secondary: "See Demo",
  },

  // Features section
  features: [
    {
      icon: "Zap",
      title: "Lightning Fast",
      description: "Built for speed. Your pages load in milliseconds.",
    },
    {
      icon: "Shield",
      title: "Secure by Default",
      description: "Enterprise-grade security without the complexity.",
    },
    {
      icon: "Puzzle",
      title: "Easy Integration",
      description: "Connect to your existing tools in minutes.",
    },
    {
      icon: "Users",
      title: "Team Ready",
      description: "Collaborate seamlessly with your entire team.",
    },
    {
      icon: "BarChart",
      title: "Analytics Built-in",
      description: "Track what matters without third-party tools.",
    },
    {
      icon: "Heart",
      title: "Made with Care",
      description: "Crafted by developers who care about DX.",
    },
  ],

  // Testimonials
  testimonials: [
    {
      quote: "This saved us weeks of development time. Absolutely worth it.",
      author: "Sarah Chen",
      role: "CTO at TechCorp",
      avatar: "/avatars/sarah.jpg",
    },
    {
      quote: "Finally, a solution that just works. No bloat, no nonsense.",
      author: "Marcus Johnson",
      role: "Founder at StartupXYZ",
      avatar: "/avatars/marcus.jpg",
    },
    {
      quote: "Our team adopted it in a day. The docs are incredible.",
      author: "Emily Rodriguez",
      role: "Engineering Lead at ScaleUp",
      avatar: "/avatars/emily.jpg",
    },
  ],

  // Pricing (optional - set to null to hide)
  pricing: null,
  
  // Toggle sections
  sections: {
    hero: true,
    features: true,
    testimonials: true,
    pricing: false,
    cta: true,
    footer: true,
  },

  // Social links
  social: {
    twitter: "https://twitter.com/yourproduct",
    github: "https://github.com/yourproduct",
    discord: null,
  },

  // Email capture
  emailCapture: {
    enabled: true,
    headline: "Stay in the loop",
    subtext: "Get updates on new features and releases. No spam, ever.",
    buttonText: "Subscribe",
    successMessage: "Thanks! Check your email to confirm.",
  },

  // SEO
  seo: {
    title: "YourProduct — Build faster. Ship sooner.",
    description: "The modern way to build internal tools without the overhead.",
    ogImage: "/og-image.png",
  },
};

// ============================================
// EMAIL INTEGRATION CONFIG
// ============================================

export const emailConfig = {
  provider: "sendgrid", // or "resend", "mailchimp", "custom"
  
  // SendGrid settings (set via env vars)
  sendgrid: {
    apiKey: import.meta.env.VITE_SENDGRID_API_KEY || "",
    listId: import.meta.env.VITE_SENDGRID_LIST_ID || "",
  },

  // API endpoint for email submission
  apiEndpoint: "/api/subscribe",
};
