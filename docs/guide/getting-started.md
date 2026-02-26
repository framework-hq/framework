# Getting Started

Get up and running with FrameWork in under 5 minutes.

## Prerequisites

- Node.js 22+
- pnpm (recommended) or npm

## Create a New Project

```bash
npx create-framework my-app
```

You'll be prompted to select a template:

```
? Select a template:
❯ Landing Page — Marketing page with email capture
  CRM — Contact management with notes and tags
  Booking — Appointment scheduling with SMS reminders
  Dashboard — Analytics dashboard with charts and KPIs
  Invoicing — Invoice management with Stripe payments
```

## Install Dependencies

```bash
cd my-app
pnpm install
```

## Start Development Server

```bash
pnpm dev
```

Your app is now running at `http://localhost:3000` (port varies by template).

## Configure Services (Optional)

Each template works in **demo mode** without any configuration. When you're ready to go live:

1. Copy `.env.example` to `.env`
2. Add your API keys
3. Restart the dev server

See individual [template docs](/templates/) for specific setup instructions.

## Deploy

All templates build to static files:

```bash
pnpm build
```

Deploy the `dist/` folder to any static host:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## Next Steps

- Browse [available templates](/templates/)
- Read [why FrameWork](/guide/why-framework)
- Check the [CLI reference](/guide/cli-commands)
