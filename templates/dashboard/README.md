# Dashboard Template

A clean analytics dashboard with KPIs, charts, and activity feeds.

## Features

- 📊 **KPI Cards** — Revenue, users, orders, conversion rate
- 📈 **Revenue Chart** — 30-day trend with area chart
- 🥧 **Traffic Sources** — Pie chart with breakdown
- 🏆 **Top Products** — Revenue ranking with progress bars
- 📋 **Activity Feed** — Real-time activity stream
- 📱 **Responsive** — Works on all screen sizes

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3003
```

## Customization

### Data Source

Edit `src/data/mock.ts` to connect to your real data:

```typescript
// Replace mock data with API calls
export async function fetchKPIs() {
  const response = await fetch('/api/kpis');
  return response.json();
}
```

### Charts

Uses [Recharts](https://recharts.org/) for charts. Customize in:
- `src/components/RevenueChart.tsx`
- `src/components/TrafficChart.tsx`

### Styling

Tailwind CSS. Edit colors in `tailwind.config.js`.

## Data Integrations

This template uses mock data by default. Connect to:

- **Supabase** — Add real-time database
- **Stripe** — Pull revenue data
- **Google Analytics** — Traffic sources
- **Your own API** — Custom metrics

## License

MIT — part of [FrameWork](https://github.com/framework-hq/framework)
