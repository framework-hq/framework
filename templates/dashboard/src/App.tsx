import { Header } from "./components/Header";
import { KPICard } from "./components/KPICard";
import { RevenueChart } from "./components/RevenueChart";
import { TrafficChart } from "./components/TrafficChart";
import { TopProducts } from "./components/TopProducts";
import { ActivityFeed } from "./components/ActivityFeed";
import { kpiData } from "./data/mock";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

const icons = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: TrendingUp,
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(kpiData).map(([key, data]) => (
            <KPICard
              key={key}
              icon={icons[key as keyof typeof icons]}
              {...data}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <TrafficChart />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProducts />
          <ActivityFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <a
            href="https://github.com/framework-hq/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            Built with FrameWork
          </a>
        </div>
      </footer>
    </div>
  );
}
