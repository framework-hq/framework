# Dashboard Template

Analytics dashboard with KPIs, charts, and activity feed.

## Features

- 📊 **KPI Cards** — Revenue, users, orders, conversion
- 📈 **Revenue Chart** — 30-day trend (area chart)
- 🥧 **Traffic Sources** — Pie chart breakdown
- 🏆 **Top Products** — Revenue ranking
- 📋 **Activity Feed** — Real-time activity stream

## Quick Start

```bash
npx create-framework my-dashboard --template dashboard
cd my-dashboard
pnpm install
pnpm dev
```

Open `http://localhost:3003`

## Demo Mode

Displays generated mock data. Connect your own data source for production.

## Charts

Uses [Recharts](https://recharts.org/) for visualization:

- `AreaChart` — Revenue trend
- `PieChart` — Traffic sources
- Custom progress bars — Top products

## Connecting Real Data

Replace mock data in `src/data/mock.ts` with API calls:

```typescript
// Before (mock)
export const dailyData = generateDailyData(30);

// After (API)
export async function fetchDailyData() {
  const response = await fetch('/api/analytics/daily');
  return response.json();
}
```

### Data Sources

Connect to any backend:
- **Supabase** — Real-time database
- **Stripe** — Revenue data via Stripe API
- **Google Analytics** — Traffic sources
- **Your API** — Custom metrics

## Customization

### Change KPIs

Edit `src/data/mock.ts`:

```typescript
export const kpiData = {
  revenue: { value: 45000, change: 12.5, label: "Revenue", prefix: "$" },
  users: { value: 1250, change: 8.2, label: "Active Users" },
  // Add your own...
};
```

### Add Charts

1. Install additional Recharts components
2. Create component in `src/components/`
3. Add to `src/App.tsx` grid

### Change Colors

Edit Tailwind config or update chart colors directly:

```typescript
// In chart components
<Area fill="#6366f1" stroke="#6366f1" />
```

## Deploy

1. Build: `pnpm build`
2. Deploy `dist/` to static host
3. Configure API endpoints for production data
