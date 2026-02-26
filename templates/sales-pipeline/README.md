# Sales Pipeline Template

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
pnpm install
pnpm dev
# Open http://localhost:3006
```

## Demo Mode

Works immediately with mock data. No database needed for local development.

## Pipeline Stages

Default stages (customizable):
1. **Lead** (10% probability)
2. **Qualified** (25%)
3. **Proposal** (50%)
4. **Negotiation** (75%)
5. **Won** (100%)
6. **Lost** (0%)

## Data Model

```
deals
├── id
├── name
├── value
├── stage (Stage)
├── contact (Contact)
├── probability
├── expectedCloseDate
├── notes
├── activities[]
├── createdAt
└── updatedAt

stages
├── id
├── name
├── order
├── color
└── probability

activities
├── id
├── dealId
├── type (call | email | meeting | note | task)
├── description
├── dueDate
├── completed
└── createdAt
```

## Supabase Integration

### 1. Create Tables

Run migrations in Supabase SQL Editor (schema in `supabase/migrations/`).

### 2. Configure Environment

Create `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Customization

### Add Pipeline Stages

Edit `src/lib/mock-data.ts`:

```typescript
export const stages: Stage[] = [
  { id: "discovery", name: "Discovery", order: 1, color: "#...", probability: 5 },
  // ...
];
```

### Custom Deal Fields

1. Update `src/types/index.ts`
2. Update forms and display components

### Reporting

Add revenue reports by modifying `src/components/Dashboard.tsx`.

## Affiliate Disclosure

This template includes affiliate links. FrameWork may receive a commission if you sign up via these links.

## License

MIT — part of [FrameWork](https://github.com/framework-hq/framework)
