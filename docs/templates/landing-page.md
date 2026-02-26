# Landing Page Template

A modern marketing landing page with email capture functionality.

## Features

- 🎯 **Hero Section** — Bold headline, CTA button
- ✨ **Features Grid** — Configurable feature cards with icons
- 💬 **Testimonials** — Social proof carousel
- 📧 **Email Capture** — Newsletter signup form
- 🦶 **Footer** — Links, social icons, legal

## Quick Start

```bash
npx create-framework my-landing --template landing-page
cd my-landing
pnpm install
pnpm dev
```

Open `http://localhost:3000`

## Configuration

Edit `src/config.ts` to customize:

```typescript
export const config = {
  // Site metadata
  siteName: "Your Product",
  tagline: "The best solution for...",
  
  // Hero section
  hero: {
    title: "Build something amazing",
    subtitle: "Your compelling description here",
    cta: "Get Started",
  },
  
  // Features (icon names from lucide-react)
  features: [
    { icon: "Zap", title: "Fast", description: "..." },
    { icon: "Shield", title: "Secure", description: "..." },
    // ...
  ],
  
  // Testimonials
  testimonials: [
    { name: "Jane Doe", role: "CEO", quote: "..." },
    // ...
  ],
};
```

## SendGrid Integration

### Demo Mode (Default)

Email capture works without configuration — submissions are logged to console.

### Production Setup

1. [Sign up for SendGrid](https://signup.sendgrid.com/)
2. Create an API key
3. Create `.env`:

```bash
VITE_SENDGRID_API_KEY=SG.your-api-key
VITE_SENDGRID_LIST_ID=your-list-id
```

4. Restart the dev server

## Customization

### Styling

Tailwind classes throughout. Edit `tailwind.config.js` to change:
- Colors
- Fonts
- Spacing

### Components

All components in `src/components/`:
- `Hero.tsx`
- `Features.tsx`
- `Testimonials.tsx`
- `EmailCapture.tsx`
- `Footer.tsx`

## Deploy

```bash
pnpm build
```

Upload `dist/` to Vercel, Netlify, or any static host.
