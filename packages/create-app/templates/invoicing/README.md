# Invoicing Template

Professional invoice management with Stripe payment integration.

## Features

- 📄 **Invoice CRUD** — Create, view, edit, delete invoices
- 👥 **Client Management** — Store client information
- 💳 **Stripe Payments** — Accept online payments (optional)
- 📊 **Dashboard** — Summary of paid, pending, overdue
- 🖨️ **Print Ready** — Clean invoice layout for PDF/print
- 📱 **Responsive** — Works on all devices

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3004
```

## Configuration

Edit `src/config.ts`:

```typescript
export const settings: InvoiceSettings = {
  businessName: "Your Business Name",
  businessEmail: "billing@yourbusiness.com",
  businessAddress: "123 Business St, City, State 12345",
  taxRate: 0, // 0 = no tax, 0.1 = 10%
  currency: "USD",
  paymentTerms: 30, // days
  invoicePrefix: "INV-",
};
```

## Stripe Integration

1. [Sign up for Stripe](https://stripe.com/partners?utm_source=framework) (affiliate link — see disclosure)
2. Get your API keys from the Stripe Dashboard
3. Create `.env`:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Implement payment handler in `src/api/payment.ts`

### Online Payments Flow

1. Send invoice to client
2. Client clicks "Pay Now" link
3. Stripe Checkout or Payment Element
4. Webhook updates invoice status to "paid"

## Data Storage

By default uses in-memory mock data. For production:

- **Supabase** — Postgres database
- **Firebase** — Firestore
- **Your own API** — REST/GraphQL backend

## Customization

### Add Custom Fields

Edit `src/types/index.ts` and update forms.

### Change Invoice Design

Edit `src/components/InvoiceDetail.tsx` for print layout.

### PDF Export

Add jsPDF or react-pdf for direct PDF generation.

## Affiliate Disclosure

This template includes an affiliate link to Stripe. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly at stripe.com or use any payment processor.

## License

MIT — part of [FrameWork](https://github.com/framework-hq/framework)
