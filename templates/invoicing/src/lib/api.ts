import type { Invoice, Client } from "../types";
import { mockInvoices, mockClients } from "./mock-data";
import { settings } from "../config";
import { format } from "date-fns";

// In-memory store for demo
let invoices = [...mockInvoices];
let clients = [...mockClients];
let invoiceCounter = 5;

export async function getInvoices(): Promise<Invoice[]> {
  return invoices.sort((a, b) => 
    new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  );
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  return invoices.find((inv) => inv.id === id) || null;
}

export async function createInvoice(
  data: Omit<Invoice, "id" | "number" | "subtotal" | "tax" | "total">
): Promise<Invoice> {
  const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * settings.taxRate;
  const total = subtotal + tax;

  const invoice: Invoice = {
    ...data,
    id: crypto.randomUUID(),
    number: `${settings.invoicePrefix}${String(invoiceCounter++).padStart(3, "0")}`,
    subtotal,
    tax,
    total,
  };

  invoices.unshift(invoice);
  return invoice;
}

export async function updateInvoice(
  id: string,
  updates: Partial<Invoice>
): Promise<Invoice> {
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index === -1) throw new Error("Invoice not found");

  // Recalculate totals if items changed
  if (updates.items) {
    const subtotal = updates.items.reduce((sum, item) => sum + item.total, 0);
    updates.subtotal = subtotal;
    updates.tax = subtotal * settings.taxRate;
    updates.total = subtotal + updates.tax;
  }

  invoices[index] = { ...invoices[index], ...updates };
  return invoices[index];
}

export async function deleteInvoice(id: string): Promise<void> {
  invoices = invoices.filter((inv) => inv.id !== id);
}

export async function sendInvoice(id: string): Promise<Invoice> {
  return updateInvoice(id, { status: "sent" });
}

export async function markAsPaid(id: string): Promise<Invoice> {
  return updateInvoice(id, {
    status: "paid",
    paidAt: format(new Date(), "yyyy-MM-dd"),
  });
}

// Clients
export async function getClients(): Promise<Client[]> {
  return clients;
}

export async function createClient(data: Omit<Client, "id">): Promise<Client> {
  const client: Client = {
    ...data,
    id: crypto.randomUUID(),
  };
  clients.push(client);
  return client;
}

// Calculate summary stats
export async function getInvoiceSummary() {
  const all = await getInvoices();
  
  return {
    total: all.reduce((sum, inv) => sum + inv.total, 0),
    paid: all.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0),
    pending: all.filter((inv) => inv.status === "sent").reduce((sum, inv) => sum + inv.total, 0),
    overdue: all.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.total, 0),
    draft: all.filter((inv) => inv.status === "draft").length,
  };
}
