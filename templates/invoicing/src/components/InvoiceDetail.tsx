import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Send, CreditCard, Download, Trash2, CheckCircle } from "lucide-react";
import type { Invoice } from "../types";
import { getInvoice, sendInvoice, markAsPaid, deleteInvoice } from "../lib/api";
import { settings } from "../config";

export function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadInvoice(id);
  }, [id]);

  async function loadInvoice(invoiceId: string) {
    const data = await getInvoice(invoiceId);
    setInvoice(data);
    setLoading(false);
  }

  async function handleSend() {
    if (!id) return;
    const updated = await sendInvoice(id);
    setInvoice(updated);
  }

  async function handleMarkPaid() {
    if (!id) return;
    const updated = await markAsPaid(id);
    setInvoice(updated);
  }

  async function handleDelete() {
    if (!id || !confirm("Delete this invoice?")) return;
    await deleteInvoice(id);
    navigate("/");
  }

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!invoice) return <div className="p-6 text-gray-500">Invoice not found</div>;

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Back to invoices
        </Link>
        <div className="flex items-center gap-2">
          {invoice.status === "draft" && (
            <button
              onClick={handleSend}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Send className="w-4 h-4" />
              Send Invoice
            </button>
          )}
          {(invoice.status === "sent" || invoice.status === "overdue") && (
            <button
              onClick={handleMarkPaid}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Paid
            </button>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Invoice */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{invoice.number}</h1>
            <p className="text-gray-500 mt-1">
              Issued {format(new Date(invoice.issueDate), "MMMM d, yyyy")}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-gray-900">{settings.businessName}</h2>
            <p className="text-sm text-gray-500">{settings.businessEmail}</p>
            <p className="text-sm text-gray-500">{settings.businessAddress}</p>
          </div>
        </div>

        {/* Client */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Bill To</p>
          <p className="font-medium text-gray-900">{invoice.client.name}</p>
          {invoice.client.company && <p className="text-gray-600">{invoice.client.company}</p>}
          <p className="text-gray-600">{invoice.client.email}</p>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Qty</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Price</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 text-gray-900">{item.description}</td>
                <td className="py-3 text-right text-gray-600">{item.quantity}</td>
                <td className="py-3 text-right text-gray-600">${item.unitPrice}</td>
                <td className="py-3 text-right font-medium text-gray-900">${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${invoice.subtotal.toLocaleString()}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${invoice.tax.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${invoice.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-500">
            Due by <span className="font-medium text-gray-900">{format(new Date(invoice.dueDate), "MMMM d, yyyy")}</span>
          </p>
          {invoice.status === "paid" && invoice.paidAt && (
            <p className="text-green-600 mt-2">
              ✓ Paid on {format(new Date(invoice.paidAt), "MMMM d, yyyy")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
