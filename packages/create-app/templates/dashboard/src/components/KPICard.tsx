import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
}

export function KPICard({ icon: Icon, label, value, change, prefix = "", suffix = "" }: KPICardProps) {
  const isPositive = change >= 0;

  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {prefix}{formatValue(value)}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
