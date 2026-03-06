# FrameWork

React templates for internal tools. Free. No vendor lock-in. Probably over-engineered.

---

## The honest backstory

I watched an [Alex Becker video](https://www.youtube.com/...) about how SaaS is dying and people just need simple internal tools without paying $50/user/month to Retool. 

I was dumb enough to actually try building it.

Turns out he was right about the problem, but building templates that work for everyone is harder than it looks. This is my attempt.

## What this actually is

A collection of React + TypeScript templates for common internal tools:

- **CRM** — track contacts, add notes, tag people
- **Landing page** — collect emails, send to SendGrid
- **Booking** — schedule appointments, SMS reminders via Twilio
- **Dashboard** — charts and KPIs
- **Invoicing** — create invoices, accept Stripe payments
- **Email sequences** — drip campaigns via Resend
- **Sales pipeline** — kanban board for deals

Each one is a standalone Vite app. Clone it, `pnpm install`, customize, deploy. That's it.

## What this is NOT

- Not a framework (ironic, I know)
- Not a no-code builder
- Not production-ready out of the box — you'll need to wire up your own auth, add your API keys, etc.
- Not going to replace a real engineering team

If you want something that just works with zero config, use Retool. This is for developers who'd rather own their code than pay monthly fees forever.

## Quick start

```bash
npx create-framework-app my-app
cd my-app
pnpm install
pnpm dev
```

Pick a template, hack on it, deploy wherever you want. MIT licensed, do whatever.

## Templates

| Template | What it does | Integrations |
|----------|--------------|--------------|
| `crm` | Contact management | Supabase |
| `landing-page` | Email capture | SendGrid |
| `booking` | Appointments + SMS | Twilio |
| `dashboard` | Charts & metrics | — |
| `invoicing` | Invoices + payments | Stripe |
| `email-sequences` | Drip campaigns | Resend |
| `sales-pipeline` | Deal tracking | Supabase |

All templates work in demo mode without config, so you can poke around before committing.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide icons

Nothing weird. Standard stuff you already know.

## Why not just use [Retool/Bubble/whatever]?

Honestly, those are fine. Use them if:
- You hate writing code
- You have budget
- You don't care about vendor lock-in

Use this if:
- You're a developer who'd rather own the code
- You're broke or cheap (same thing)
- You've been burned by platforms shutting down or jacking up prices

## Real-world example

I built [Esgrow](https://getesgrow.com) — a CRM for real estate agents — using the same patterns as these templates. It started as basically the CRM template, then I added auth, Gmail sync, AI lead scoring, etc.

The templates here are the "starter" version. Esgrow is what it looks like after a few months of iteration. Proof these patterns actually scale to real products.

## Known issues / honest limitations

- Auth is BYO — I use Supabase but you do you
- Mobile responsiveness is inconsistent across templates
- Some templates are more polished than others
- Docs are sparse (PRs welcome)

## Contributing

Found a bug? Fixed something? Made it suck less? PRs welcome.

## License

MIT. Do whatever. I'm not your lawyer.

---

Built because I watched a YouTube video and thought "how hard could it be?" (Very.)
