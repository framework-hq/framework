import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Mail, MousePointer, TrendingUp, ArrowRight } from "lucide-react";
import { getStats, getSubscriberStats, getSequences } from "../lib/api";
import type { CampaignStats, Sequence } from "../types";

export function Dashboard() {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [subscriberStats, setSubscriberStats] = useState({ total: 0, active: 0, unsubscribed: 0 });
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, ss, seq] = await Promise.all([
        getStats(),
        getSubscriberStats(),
        getSequences(),
      ]);
      setStats(s);
      setSubscriberStats(ss);
      setSequences(seq);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your email marketing</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Subscribers"
          value={subscriberStats.total.toLocaleString()}
          subtext={`${subscriberStats.active} active`}
          color="blue"
        />
        <StatCard
          icon={Mail}
          label="Emails Sent"
          value={stats?.sent.toLocaleString() || "0"}
          subtext="Last 30 days"
          color="indigo"
        />
        <StatCard
          icon={TrendingUp}
          label="Open Rate"
          value={`${stats?.openRate || 0}%`}
          subtext={`${stats?.opened.toLocaleString()} opened`}
          color="green"
        />
        <StatCard
          icon={MousePointer}
          label="Click Rate"
          value={`${stats?.clickRate || 0}%`}
          subtext={`${stats?.clicked.toLocaleString()} clicked`}
          color="purple"
        />
      </div>

      {/* Active Sequences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Sequences</h2>
          <Link
            to="/sequences"
            className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {sequences.filter((s) => s.status === "active").length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No active sequences.{" "}
            <Link to="/sequences" className="text-indigo-600 hover:underline">
              Create one
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {sequences
              .filter((s) => s.status === "active")
              .slice(0, 3)
              .map((sequence) => (
                <Link
                  key={sequence.id}
                  to={`/sequences/${sequence.id}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{sequence.name}</h3>
                    <p className="text-sm text-gray-500">
                      {sequence.steps.length} steps • {sequence.subscriberCount} subscribers
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Active
                  </span>
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
