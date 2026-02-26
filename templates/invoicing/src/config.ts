import type { InvoiceSettings } from "./types";

export const settings: InvoiceSettings = {
  businessName: "Your Business Name",
  businessEmail: "billing@yourbusiness.com",
  businessAddress: "123 Business St, City, State 12345",
  taxRate: 0, // 0 = no tax, 0.1 = 10%
  currency: "USD",
  paymentTerms: 30, // days until due
  invoicePrefix: "INV-",
};

export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
};
