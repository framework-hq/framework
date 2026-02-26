import { subDays, format } from "date-fns";

// Generate last 30 days of data
function generateDailyData(days: number) {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    const baseRevenue = 1000 + Math.random() * 500;
    const baseUsers = 50 + Math.random() * 30;
    
    return {
      date: format(date, "MMM dd"),
      revenue: Math.round(baseRevenue * (1 + i * 0.02)),
      users: Math.round(baseUsers * (1 + i * 0.015)),
      orders: Math.round(10 + Math.random() * 15),
      pageViews: Math.round(500 + Math.random() * 300),
    };
  });
}

export const dailyData = generateDailyData(30);

export const kpiData = {
  revenue: {
    value: dailyData.reduce((sum, d) => sum + d.revenue, 0),
    change: 12.5,
    label: "Total Revenue",
    prefix: "$",
  },
  users: {
    value: dailyData[dailyData.length - 1].users * 30,
    change: 8.2,
    label: "Active Users",
  },
  orders: {
    value: dailyData.reduce((sum, d) => sum + d.orders, 0),
    change: -2.4,
    label: "Total Orders",
  },
  conversion: {
    value: 3.2,
    change: 0.5,
    label: "Conversion Rate",
    suffix: "%",
  },
};

export const topProducts = [
  { name: "Pro Plan", revenue: 12500, sales: 125 },
  { name: "Enterprise Plan", revenue: 8900, sales: 45 },
  { name: "Starter Plan", revenue: 4200, sales: 210 },
  { name: "Add-on: Storage", revenue: 2100, sales: 180 },
  { name: "Add-on: Support", revenue: 1800, sales: 90 },
];

export const recentActivity = [
  { id: 1, type: "sale", message: "New Pro Plan subscription", time: "2 min ago", amount: 99 },
  { id: 2, type: "signup", message: "New user registered", time: "5 min ago" },
  { id: 3, type: "sale", message: "Enterprise upgrade", time: "12 min ago", amount: 299 },
  { id: 4, type: "refund", message: "Refund processed", time: "1 hour ago", amount: -49 },
  { id: 5, type: "signup", message: "New user registered", time: "2 hours ago" },
  { id: 6, type: "sale", message: "Starter Plan subscription", time: "3 hours ago", amount: 19 },
];

export const trafficSources = [
  { name: "Organic Search", value: 45, color: "#6366f1" },
  { name: "Direct", value: 25, color: "#22c55e" },
  { name: "Social", value: 15, color: "#f59e0b" },
  { name: "Referral", value: 10, color: "#ec4899" },
  { name: "Email", value: 5, color: "#14b8a6" },
];
