# Getting Started with FrameWork

Get a working internal tool in 5 minutes.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Quick Start

### Option 1: Use the CLI

```bash
npx create-framework-app my-app
cd my-app
pnpm install
pnpm dev
```

The CLI will ask which template you want. Pick one and go.

### Option 2: Clone Directly

```bash
git clone https://github.com/framework-hq/framework.git
cd framework/templates/crm  # or whichever template
cp .env.example .env       # add your API keys
pnpm install
pnpm dev
```

## Available Templates

| Template | Port | What it does |
|----------|------|--------------|
| landing-page | 3000 | Email capture + SendGrid |
| crm | 3001 | Contact management |
| booking | 3002 | Appointments + SMS |
| dashboard | 3003 | Charts and metrics |
| invoicing | 3004 | Stripe payments |
| email-sequences | 3005 | Drip campaigns |
| sales-pipeline | 3006 | Deal tracking |
| voice-input | 3007 | Voice-to-action |

## Environment Variables

Each template has an `.env.example` file. Copy it to `.env` and add your keys:

```bash
cp .env.example .env
```

Common variables:
- `OPENAI_API_KEY` — For AI features
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` — For database
- `SENDGRID_API_KEY` — For email
- `TWILIO_*` — For SMS
- `STRIPE_*` — For payments

## Demo Mode

All templates work without API keys in demo mode. Data is stored in localStorage for testing.

## Customization

Each template is just React + TypeScript. Modify anything:

- **Styling**: Edit Tailwind classes or add custom CSS
- **Components**: Swap out or add new components
- **Data**: Change the schema, add fields, modify logic
- **Integrations**: Add your own API connections

## Deployment

### Vercel (Recommended)

```bash
cd templates/crm
npx vercel --prod
```

### Other Platforms

Build and deploy the `dist` folder:

```bash
pnpm build
# Deploy dist/ to Netlify, Cloudflare Pages, etc.
```

## Next Steps

1. **Pick a template** that's closest to what you need
2. **Get it running** locally with demo mode
3. **Add your API keys** to connect real services
4. **Customize** the code for your use case
5. **Deploy** when ready

## Stuck?

- Check the template's README for specific instructions
- [Open an issue](https://github.com/framework-hq/framework/issues) for bugs
- Email hello@getesgrow.com for help
