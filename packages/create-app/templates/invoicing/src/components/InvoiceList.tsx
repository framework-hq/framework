import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Filter, DollarSign, Clock, AlertCircle, CheckCircle } from "lucide-react";
import type { Invoice } from "../types";
import { getInvoices, getInvoiceSummary } from "../lib/api";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: null },
  sent: { label: "Sent", color: "bg-blue-100 text-blue-600", icon: Clock },
  paid: { label: "Paid", color: "bg-green-100 text-green-600", icon: CheckCircle },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-600", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-400", icon: null },
};

export function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState({ total: 0, paid: 0, pending: 0, overdue: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      const [invs, sum] = await Promise.all([getInvoices(), getInvoiceSummary()]);
      setInvoices(invs);
      setSummary(sum);
      setLoading(false);
    }
    load();
  }, []);

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Invoiced" value={summary.total} icon={DollarSign} />
        <SummaryCard label="Paid" value={summary.paid} icon={CheckCircle} color="text-green-600" />
        <SummaryCard label="Pending" value={summary.pending} icon={Clock} color="text-blue-600" />
        <SummaryCard label="Overdue" value={summary.overdue} icon={AlertCircle} color="text-red-600" />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Invoices</option>
            <option value="draft">Drafts</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <span className="text-sm text-gray-500">{filteredInvoices.length} invoices</span>
      </div>

      {/* Invoice List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filteredInvoices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No invoices found. <Link to="/new" className="text-indigo-600 hover:underline">Create your first invoice</Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {filteredInvoices.map((invoice) => {
            const status = statusConfig[invoice.status];
            const StatusIcon = status.icon;

            return (
              <Link
                key={invoice.id}
                to={`/invoice/${invoice.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{invoice.number}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${status.color}`}>
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {status.label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {invoice.client.name} {invoice.client.company && `• ${invoice.client.company}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${invoice.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, color = "text-gray-900" }: {
  label: string;
  value: number;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <div className={`text-xl font-bold ${color}`}>
            ${value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
