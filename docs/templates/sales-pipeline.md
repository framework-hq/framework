# Sales Pipeline

Visual sales pipeline with deals, stages, and forecasting.

**Competes with:** Salesforce, Pipedrive, HubSpot CRM, Close

## Features

- 📊 **Pipeline Dashboard** — KPIs, weighted forecasting
- 🎯 **Kanban Board** — Drag-and-drop deal management
- 💰 **Deal Tracking** — Value, probability, close dates
- 📋 **Activities** — Notes, calls, emails, tasks
- 👥 **Contact Integration** — Link deals to contacts

## Quick Start

```bash
npx create-framework-app my-sales-app --template sales-pipeline
cd my-sales-app
pnpm install
pnpm dev
```

Open [http://localhost:3006](http://localhost:3006)

## Demo Mode

Works immediately with mock data. No database needed for local development.

## Screenshots

Coming soon.

## Pipeline Stages

Default stages (customizable):

| Stage | Probability |
|-------|-------------|
| Lead | 10% |
| Qualified | 25% |
| Proposal | 50% |
| Negotiation | 75% |
| Won | 100% |
| Lost | 0% |

## Integration: Supabase

[Supabase](https://supabase.com/dashboard?utm_source=framework) provides the database backend.

### Setup

1. [Create a Supabase project](https://supabase.com/dashboard?utm_source=framework)
2. Run the schema migrations
3. Create `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Weighted Pipeline Value

The dashboard shows:
- **Total Value** — Sum of all active deals
- **Weighted Value** — Sum of (deal value × probability)

This gives a realistic forecast of expected revenue.

## Customization

See the [README](https://github.com/framework-hq/framework/tree/main/templates/sales-pipeline) for customization options.
