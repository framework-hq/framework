# Email Sequences

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
npx create-framework-app my-email-app --template email-sequences
cd my-email-app
pnpm install
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005)

## Demo Mode

Works immediately with mock data. No email service needed for local development.

## Screenshots

Coming soon.

## Integration: Resend

[Resend](https://resend.com?utm_source=framework) provides a modern email API perfect for transactional and marketing emails.

### Setup

1. [Sign up for Resend](https://resend.com?utm_source=framework)
2. Get your API key
3. Create `.env`:

```bash
VITE_RESEND_API_KEY=re_...
```

## Personalization

Use variables in templates:
- `{{name}}` — Subscriber name
- `{{email}}` — Subscriber email
- `{{company}}` — Company name

## Data Persistence

For production, connect to [Supabase](https://supabase.com/dashboard?utm_source=framework) for data storage.

## Customization

See the [README](https://github.com/framework-hq/framework/tree/main/templates/email-sequences) for customization options.
