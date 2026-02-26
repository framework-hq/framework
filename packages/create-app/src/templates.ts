export interface Template {
  id: string;
  name: string;
  description: string;
  source: string; // Path relative to templates/
  affiliates?: {
    name: string;
    url: string;
  }[];
}

export const TEMPLATES: Template[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    description: "Marketing page with email capture",
    source: "landing-page",
    affiliates: [
      {
        name: "SendGrid",
        url: "https://signup.sendgrid.com/?utm_source=framework",
      },
    ],
  },
  {
    id: "crm",
    name: "CRM",
    description: "Contact management with notes and tags",
    source: "crm",
    affiliates: [
      {
        name: "Supabase",
        url: "https://supabase.com/dashboard?utm_source=framework",
      },
    ],
  },
  {
    id: "booking",
    name: "Booking",
    description: "Appointment scheduling with SMS reminders",
    source: "booking",
    affiliates: [
      {
        name: "Twilio",
        url: "https://www.twilio.com/try-twilio?utm_source=framework",
      },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Analytics dashboard with charts and KPIs",
    source: "dashboard",
    affiliates: [],
  },
  {
    id: "invoicing",
    name: "Invoicing",
    description: "Invoice management with Stripe payments",
    source: "invoicing",
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com/partners?utm_source=framework",
      },
    ],
  },
  {
    id: "email-sequences",
    name: "Email Sequences",
    description: "Automated drip campaigns and email marketing",
    source: "email-sequences",
    affiliates: [
      {
        name: "Resend",
        url: "https://resend.com?utm_source=framework",
      },
    ],
  },
];
