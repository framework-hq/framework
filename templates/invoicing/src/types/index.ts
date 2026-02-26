export interface Invoice {
  id: string;
  number: string;
  client: Client;
  items: InvoiceItem[];
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  notes?: string;
  subtotal: number;
  tax: number;
  total: number;
  paidAt?: string;
  stripePaymentIntentId?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
}

export interface InvoiceSettings {
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  taxRate: number;
  currency: string;
  paymentTerms: number; // days
  invoicePrefix: string;
}
