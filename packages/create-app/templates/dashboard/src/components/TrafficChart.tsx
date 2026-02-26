import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { trafficSources } from "../data/mock";

export function TrafficChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Traffic Sources</h3>
      <p className="text-sm text-gray-500 mb-4">Where your visitors come from</p>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trafficSources}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {trafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-4">
        {trafficSources.map((source) => (
          <div key={source.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-gray-600">{source.name}</span>
            </div>
            <span className="font-medium text-gray-900">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
