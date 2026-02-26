# Invoicing Template

Invoice management with client tracking and Stripe payment integration.

## Features

- 📄 **Invoice CRUD** — Create, view, edit, delete
- 👥 **Client Management** — Store client information
- 💵 **Summary Dashboard** — Paid, pending, overdue totals
- 📊 **Status Tracking** — Draft → Sent → Paid workflow
- 🖨️ **Print Ready** — Clean layout for PDF/print
- 💳 **Stripe Payments** — Online payment (optional)

## Quick Start

```bash
npx create-framework my-invoicing --template invoicing
cd my-invoicing
pnpm install
pnpm dev
```

Open `http://localhost:3004`

## Demo Mode

Works with mock data. No Stripe account needed for local development.

## Configuration

Edit `src/config.ts`:

```typescript
export const settings: InvoiceSettings = {
  businessName: "Your Business Name",
  businessEmail: "billing@yourbusiness.com",
  businessAddress: "123 Business St, City, State 12345",
  taxRate: 0,        // 0 = no tax, 0.1 = 10%
  currency: "USD",
  paymentTerms: 30,  // days until due
  invoicePrefix: "INV-",
};
```

## Stripe Integration

### 1. Get Stripe Keys

[Sign up for Stripe](https://stripe.com) and get your API keys from the Dashboard.

### 2. Configure Environment

Create `.env`:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Payment Flow

1. Send invoice to client (email with payment link)
2. Client clicks "Pay Now"
3. Stripe Checkout processes payment
4. Webhook updates invoice status to "paid"

### 4. Webhook Setup

For production, set up Stripe webhooks to handle:
- `payment_intent.succeeded`
- `payment_intent.failed`

## Data Model

```
invoices
├── id (string)
├── number (string, e.g., "INV-001")
├── client (Client)
├── items (InvoiceItem[])
├── status (draft | sent | paid | overdue | cancelled)
├── issueDate (string)
├── dueDate (string)
├── subtotal (number)
├── tax (number)
├── total (number)
└── paidAt (string, optional)

clients
├── id (string)
├── name (string)
├── email (string)
├── company (string, optional)
└── address (string, optional)
```

## Customization

### Add Custom Fields

1. Update `src/types/index.ts`
2. Update forms in `src/components/CreateInvoice.tsx`
3. Update display in `src/components/InvoiceDetail.tsx`

### Change Invoice Design

Edit `src/components/InvoiceDetail.tsx` for the print layout.

### PDF Export

Add `jspdf` or `react-pdf` for direct PDF generation:

```bash
pnpm add jspdf
```

## Deploy

1. Build: `pnpm build`
2. Deploy `dist/` to static host
3. Configure Stripe for production (live keys, webhooks)

## Affiliate Disclosure

This template includes a link to Stripe. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly or use any payment processor.
