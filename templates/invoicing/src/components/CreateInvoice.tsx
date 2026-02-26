import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { format, addDays } from "date-fns";
import type { InvoiceItem, Client } from "../types";
import { createInvoice, getClients } from "../lib/api";
import { settings } from "../config";

export function CreateInvoice() {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * settings.taxRate;
  const total = subtotal + tax;

  function updateItem(id: string, field: keyof InvoiceItem, value: string | number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      })
    );
  }

  function addItem() {
    setItems([
      ...items,
      { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0, total: 0 },
    ]);
  }

  function removeItem(id: string) {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!client) return alert("Please select a client");
    if (items.some((item) => !item.description)) return alert("Please fill in all items");

    setSaving(true);
    try {
      const invoice = await createInvoice({
        client,
        items,
        status: "draft",
        issueDate: format(new Date(), "yyyy-MM-dd"),
        dueDate: format(addDays(new Date(), settings.paymentTerms), "yyyy-MM-dd"),
        notes: notes || undefined,
      });
      navigate(`/invoice/${invoice.id}`);
    } catch (error) {
      alert("Failed to create invoice");
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to invoices
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Invoice</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-medium text-gray-900 mb-4">Client</h2>
          <ClientSelector selected={client} onSelect={setClient} />
        </div>

        {/* Line Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-medium text-gray-900 mb-4">Items</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-20">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-28">
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-24 py-2 text-right font-medium text-gray-900">
                  ${item.total.toLocaleString()}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {/* Totals & Notes */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment instructions, thank you message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {settings.taxRate > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({settings.taxRate * 100}%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link to="/" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ClientSelector({ selected, onSelect }: { selected: Client | null; onSelect: (c: Client) => void }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    getClients().then((c) => {
      setClients(c);
      setLoading(false);
    });
  });

  if (loading) return <div className="text-gray-500">Loading clients...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {clients.map((client) => (
        <button
          key={client.id}
          type="button"
          onClick={() => onSelect(client)}
          className={`p-3 border rounded-lg text-left transition-colors ${
            selected?.id === client.id
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <p className="font-medium text-gray-900">{client.name}</p>
          <p className="text-sm text-gray-500">{client.company || client.email}</p>
        </button>
      ))}
    </div>
  );
}
