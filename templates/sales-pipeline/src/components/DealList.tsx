import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { getDeals } from "../lib/api";
import type { Deal } from "../types";
import { format } from "date-fns";

export function DealList() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"value" | "date" | "name">("date");

  useEffect(() => {
    loadDeals();
  }, []);

  async function loadDeals() {
    const data = await getDeals();
    setDeals(data);
    setLoading(false);
  }

  const filtered = deals
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.contact?.name.toLowerCase().includes(search.toLowerCase()) ||
      d.contact?.company?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "value") return b.value - a.value;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const stageColors: Record<string, string> = {
    lead: "bg-gray-100 text-gray-700",
    qualified: "bg-blue-100 text-blue-700",
    proposal: "bg-purple-100 text-purple-700",
    negotiation: "bg-yellow-100 text-yellow-700",
    won: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Deals</h1>
          <p className="text-gray-500">{deals.length} total deals</p>
        </div>
        <Link
          to="/deals/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          New Deal
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Recent</option>
          <option value="value">Value</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {search ? "No deals match your search" : "No deals yet"}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Deal</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Contact</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Stage</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Value</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Close Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/deals/${deal.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
                      {deal.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {deal.contact?.name || "—"}
                    {deal.contact?.company && (
                      <span className="text-gray-400"> • {deal.contact.company}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${stageColors[deal.stage.id]}`}>
                      {deal.stage.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    ${deal.value.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {format(new Date(deal.expectedCloseDate), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
