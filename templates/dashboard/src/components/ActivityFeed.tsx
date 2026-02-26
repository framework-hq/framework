import { ShoppingCart, UserPlus, RefreshCcw } from "lucide-react";
import { recentActivity } from "../data/mock";

const icons = {
  sale: ShoppingCart,
  signup: UserPlus,
  refund: RefreshCcw,
};

const colors = {
  sale: "bg-green-100 text-green-600",
  signup: "bg-blue-100 text-blue-600",
  refund: "bg-red-100 text-red-600",
};

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {recentActivity.map((activity) => {
          const Icon = icons[activity.type as keyof typeof icons];
          const colorClass = colors[activity.type as keyof typeof colors];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              {activity.amount && (
                <span
                  className={`text-sm font-medium ${
                    activity.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.amount > 0 ? "+" : ""}${Math.abs(activity.amount)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
        View all activity
      </button>
    </div>
  );
}
