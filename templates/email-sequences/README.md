# Email Sequences Template

Automated email drip campaigns for marketing and customer engagement.

**Competes with:** Mailchimp, ConvertKit, ActiveCampaign, Drip

## Features

- 📧 **Subscriber Management** — Add, tag, and segment subscribers
- 📝 **Email Templates** — Reusable templates with personalization
- 🔄 **Drip Sequences** — Automated multi-step email flows
- 📊 **Analytics** — Open rates, click rates, deliverability
- 🏷️ **Tags & Segments** — Organize subscribers by behavior

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3005
```

## Demo Mode

Works immediately with mock data. No email service needed for local development.

## Resend Integration

### 1. Get Resend API Key

[Sign up for Resend](https://resend.com?utm_source=framework) and get your API key.

### 2. Configure Environment

Create `.env`:

```bash
VITE_RESEND_API_KEY=re_...
```

### 3. Sending Emails

The template includes API helpers for:
- Single email sends
- Batch sends
- Sequence automation

## Data Model

```
subscribers
├── id
├── email
├── name
├── status (active | unsubscribed | bounced)
├── tags[]
├── subscribedAt
└── lastEmailAt

templates
├── id
├── name
├── subject (supports {{name}}, {{company}})
├── body
├── createdAt
└── updatedAt

sequences
├── id
├── name
├── status (draft | active | paused)
├── steps[] (order, delay, templateId)
└── subscriberCount

emails
├── id
├── subscriberId
├── templateId
├── status (queued | sent | opened | clicked | bounced)
├── sentAt
├── openedAt
└── clickedAt
```

## Personalization Variables

Use these in templates:
- `{{name}}` — Subscriber name
- `{{email}}` — Subscriber email
- `{{company}}` — Company name (from metadata)

## Webhook Events (Production)

For tracking opens/clicks, set up Resend webhooks:
- `email.delivered`
- `email.opened`
- `email.clicked`
- `email.bounced`

## Customization

### Add Subscriber Fields

1. Update `src/types/index.ts`
2. Update subscriber forms
3. Update mock data

### Custom Email Styling

Edit template body or add HTML email templates with inline CSS.

## Affiliate Disclosure

This template includes affiliate links. FrameWork may receive a commission if you sign up via these links.

## License

MIT — part of [FrameWork](https://github.com/framework-hq/framework)
