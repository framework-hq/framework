# Landing Page Template

A production-ready landing page with email capture form, optimized for conversions.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📧 Email capture form with SendGrid integration
- ⚡ Fast — Vite + React
- 📱 Mobile-first design
- 🔍 SEO-ready with meta tags
- ♿ Accessible (WCAG 2.1)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Configuration

Edit `src/config.ts` to customize:

```typescript
export const config = {
  siteName: "Your Product",
  tagline: "Your amazing tagline here",
  description: "What your product does",
  
  // Email integration
  sendgrid: {
    // Set via environment variable
    apiKey: process.env.SENDGRID_API_KEY,
    listId: process.env.SENDGRID_LIST_ID,
  },
  
  // Customize sections
  features: [...],
  testimonials: [...],
  pricing: [...],
}
```

## Email Integration (SendGrid)

1. [Sign up for SendGrid](https://signup.sendgrid.com/?utm_source=framework&utm_medium=referral) (affiliate link — see disclosure below)
2. Create an API key with "Marketing" permissions
3. Create a contact list and copy the List ID
4. Set environment variables:

```bash
SENDGRID_API_KEY=your_api_key
SENDGRID_LIST_ID=your_list_id
```

### Affiliate Disclosure

This template includes an affiliate link to SendGrid. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly at sendgrid.com or use any other email provider — the template works with any API-compatible service.

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
    }
  }
}
```

### Sections

Toggle sections in `src/config.ts`:

```typescript
sections: {
  hero: true,
  features: true,
  testimonials: true,
  pricing: false,  // Disable pricing section
  cta: true,
}
```

## Deployment

### Vercel (Recommended)

```bash
pnpm build
vercel deploy
```

### Any Static Host

```bash
pnpm build
# Upload contents of `dist/` folder
```

## License

MIT — part of the [FrameWork](https://github.com/framework-hq/framework) project.
