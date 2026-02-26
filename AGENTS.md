# AGENTS.md

## Project Overview

FrameWork is an open-source collection of production-ready templates for internal tools (CRM, invoicing, booking, dashboard, landing page). MIT licensed, React + TypeScript + Tailwind.

## Repository Structure

```
framework/
├── templates/           # Template source code
│   ├── landing-page/    # Marketing page (SendGrid)
│   ├── crm/             # Contact management (Supabase)
│   ├── booking/         # Appointment scheduling (Twilio)
│   ├── dashboard/       # Analytics (Recharts)
│   └── invoicing/       # Invoice management (Stripe)
├── packages/
│   └── create-app/      # CLI: npx create-framework-app
├── docs/                # VitePress documentation
└── LAUNCH.md            # Marketing materials
```

## Setup Commands

```bash
# Install dependencies for a template
cd templates/<name>
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Type check
npx tsc --noEmit
```

## Template Ports

| Template | Port |
|----------|------|
| landing-page | 3000 |
| crm | 3001 |
| booking | 3002 |
| dashboard | 3003 |
| invoicing | 3004 |

## Code Style

- TypeScript strict mode
- React 18 functional components
- Tailwind CSS for styling
- Lucide icons
- No semicolons, single quotes preferred
- Each template is self-contained with demo mode

## Testing

Each template should:
1. Build without errors: `pnpm build`
2. Pass TypeScript: `npx tsc --noEmit`
3. Work in demo mode without external services

## CLI Development

```bash
cd packages/create-app
pnpm install
pnpm build           # Compile TypeScript
pnpm dev my-test     # Test locally
```

## Adding New Templates

1. Create folder in `templates/<name>/`
2. Include: package.json, vite.config.ts, tailwind.config.js, tsconfig.json
3. Add demo mode (mock data when env vars missing)
4. Add to `packages/create-app/src/templates.ts`
5. Add docs page in `docs/templates/<name>.md`

## Affiliate Links

Templates include affiliate tracking links for integrated services. Format:
```
https://<service>.com/?utm_source=framework&utm_medium=referral
```

## PR Guidelines

- Title format: `[template-name] Description` or `[cli] Description`
- Run `pnpm build` and `npx tsc --noEmit` before committing
- Test that demo mode still works
- Update docs if adding features
