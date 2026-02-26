import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DollarSign, TrendingUp, Target, BarChart, ArrowRight } from "lucide-react";
import { getStats, getDeals } from "../lib/api";
import type { PipelineStats, Deal } from "../types";
import { format } from "date-fns";

export function Dashboard() {
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, d] = await Promise.all([getStats(), getDeals()]);
      setStats(s);
      setDeals(d);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  const closingSoon = deals
    .filter(d => d.stage.id !== "won" && d.stage.id !== "lost")
    .sort((a, b) => new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Target}
          label="Active Deals"
          value={stats?.totalDeals.toString() || "0"}
          subtext="In pipeline"
          color="blue"
        />
        <StatCard
          icon={DollarSign}
          label="Pipeline Value"
          value={`$${(stats?.totalValue || 0).toLocaleString()}`}
          subtext="Total potential"
          color="indigo"
        />
        <StatCard
          icon={TrendingUp}
          label="Weighted Value"
          value={`$${Math.round(stats?.weightedValue || 0).toLocaleString()}`}
          subtext="Probability-adjusted"
          color="green"
        />
        <StatCard
          icon={BarChart}
          label="Won This Month"
          value={`$${(stats?.wonThisMonth || 0).toLocaleString()}`}
          subtext={`${stats?.conversionRate}% conversion`}
          color="purple"
        />
      </div>

      {/* Closing Soon */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Closing Soon</h2>
          <Link
            to="/pipeline"
            className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
          >
            View pipeline <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {closingSoon.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No deals closing soon</p>
        ) : (
          <div className="space-y-3">
            {closingSoon.map((deal) => (
              <Link
                key={deal.id}
                to={`/deals/${deal.id}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{deal.name}</h3>
                  <p className="text-sm text-gray-500">
                    {deal.contact?.company || deal.contact?.name || "No contact"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ${deal.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(deal.expectedCloseDate), "MMM d")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: "blue" | "indigo" | "green" | "purple";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xs text-gray-400 mt-1">{subtext}</div>
    </div>
  );
}
