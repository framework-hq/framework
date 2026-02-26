# Booking Template

A clean appointment booking system with calendar selection and SMS reminders via Twilio.

## Features

- 📅 **Calendar view** — Select date from week view
- ⏰ **Time slots** — Auto-generated based on business hours
- 📝 **Booking form** — Capture customer details
- 📱 **SMS reminders** — Twilio integration for confirmations & reminders
- 🎨 **Customizable** — Services, hours, and styling
- 🎭 **Demo mode** — Works without Twilio for testing

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server (demo mode)
pnpm dev

# Open http://localhost:3002
```

## Configuration

Edit `src/config.ts` to customize:

```typescript
export const config: BusinessConfig = {
  name: "Your Business",
  timezone: "America/New_York",
  
  workingHours: {
    start: "09:00",
    end: "17:00",
  },
  
  workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  slotDuration: 30, // minutes
  
  services: [
    { id: "consultation", name: "Consultation", duration: 30, price: 50 },
    // ... add more services
  ],
};
```

## Twilio Setup (SMS)

1. [Sign up for Twilio](https://www.twilio.com/try-twilio?utm_source=framework&utm_medium=referral) (affiliate link — see disclosure below)
2. Get your Account SID, Auth Token, and a phone number
3. Create `.env` file:

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### SMS Messages

Customize message templates in `src/config.ts`:

```typescript
export const smsConfig = {
  confirmationMessage: (booking) => `Your appointment is confirmed...`,
  reminderMessage: (booking) => `Reminder: Your appointment is in 1 hour...`,
  cancellationMessage: (booking) => `Your appointment has been cancelled...`,
};
```

## Database Integration

By default, bookings are stored in memory (demo mode). For production:

1. Add Supabase/Postgres (see CRM template for example)
2. Update `src/lib/api.ts` with database calls
3. Set up a cron job for sending reminders

## Deployment

### Vercel

1. Deploy the frontend
2. Add SMS handler as serverless function (`api/sms.ts`)
3. Set environment variables

### Self-hosted

1. Build: `pnpm build`
2. Serve `dist/` folder
3. Run SMS handler as Express endpoint

## Affiliate Disclosure

This template includes an affiliate link to Twilio. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly at twilio.com or use any other SMS provider.

## License

MIT — part of the [FrameWork](https://github.com/framework-hq/framework) project.
