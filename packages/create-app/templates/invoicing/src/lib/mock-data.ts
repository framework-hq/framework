import type { Invoice, Client } from "../types";
import { subDays, addDays, format } from "date-fns";

export const mockClients: Client[] = [
  { id: "c1", name: "John Smith", email: "john@techcorp.com", company: "TechCorp Inc" },
  { id: "c2", name: "Sarah Johnson", email: "sarah@startup.io", company: "Startup.io" },
  { id: "c3", name: "Mike Chen", email: "mike@agency.co", company: "Creative Agency" },
];

const today = new Date();

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    client: mockClients[0],
    items: [
      { id: "i1", description: "Web Development - Phase 1", quantity: 1, unitPrice: 5000, total: 5000 },
      { id: "i2", description: "UI/UX Design", quantity: 20, unitPrice: 150, total: 3000 },
    ],
    status: "paid",
    issueDate: format(subDays(today, 45), "yyyy-MM-dd"),
    dueDate: format(subDays(today, 15), "yyyy-MM-dd"),
    subtotal: 8000,
    tax: 0,
    total: 8000,
    paidAt: format(subDays(today, 20), "yyyy-MM-dd"),
  },
  {
    id: "2",
    number: "INV-002",
    client: mockClients[1],
    items: [
      { id: "i3", description: "Monthly Retainer - February", quantity: 1, unitPrice: 3000, total: 3000 },
      { id: "i4", description: "Additional Development Hours", quantity: 10, unitPrice: 125, total: 1250 },
    ],
    status: "sent",
    issueDate: format(subDays(today, 5), "yyyy-MM-dd"),
    dueDate: format(addDays(today, 25), "yyyy-MM-dd"),
    subtotal: 4250,
    tax: 0,
    total: 4250,
  },
  {
    id: "3",
    number: "INV-003",
    client: mockClients[2],
    items: [
      { id: "i5", description: "Brand Identity Package", quantity: 1, unitPrice: 2500, total: 2500 },
    ],
    status: "overdue",
    issueDate: format(subDays(today, 40), "yyyy-MM-dd"),
    dueDate: format(subDays(today, 10), "yyyy-MM-dd"),
    subtotal: 2500,
    tax: 0,
    total: 2500,
  },
  {
    id: "4",
    number: "INV-004",
    client: mockClients[0],
    items: [
      { id: "i6", description: "Web Development - Phase 2", quantity: 1, unitPrice: 7500, total: 7500 },
    ],
    status: "draft",
    issueDate: format(today, "yyyy-MM-dd"),
    dueDate: format(addDays(today, 30), "yyyy-MM-dd"),
    subtotal: 7500,
    tax: 0,
    total: 7500,
  },
];
