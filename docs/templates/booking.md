# Booking Template

Appointment scheduling with calendar view, time slots, and SMS reminders.

## Features

- 📅 **Calendar View** — Week-by-week date selection
- ⏰ **Time Slots** — Configurable working hours
- 📝 **Booking Form** — Collect customer details
- ✅ **Confirmation** — Booking summary page
- 📱 **SMS Reminders** — Twilio integration

## Quick Start

```bash
npx create-framework my-booking --template booking
cd my-booking
pnpm install
pnpm dev
```

Open `http://localhost:3002`

## Demo Mode

Works immediately without Twilio. Bookings are stored in memory and SMS is simulated.

## Configuration

Edit `src/config.ts`:

```typescript
export const config = {
  // Business hours
  workingHours: {
    start: "09:00",
    end: "17:00",
  },
  
  // Working days (0 = Sunday, 6 = Saturday)
  workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  
  // Slot duration in minutes
  slotDuration: 30,
  
  // Business info
  businessName: "Your Business",
  businessPhone: "+1234567890",
};
```

## Twilio Integration

### 1. Get Twilio Credentials

[Sign up for Twilio](https://www.twilio.com/try-twilio) and get:
- Account SID
- Auth Token
- Phone Number

### 2. Configure Environment

Create `.env`:

```bash
VITE_TWILIO_ACCOUNT_SID=your-account-sid
VITE_TWILIO_AUTH_TOKEN=your-auth-token
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

### 3. SMS Messages

Customize messages in `src/api/sms.ts`:
- Booking confirmation
- Reminder (24h before)
- Cancellation

## Data Model

```
bookings
├── id (string)
├── date (string, YYYY-MM-DD)
├── time (string, HH:mm)
├── customerName (string)
├── customerEmail (string)
├── customerPhone (string)
├── notes (string)
├── status (pending | confirmed | cancelled)
└── createdAt (timestamp)
```

## Customization

### Add Fields

1. Update `src/types/index.ts`
2. Update `src/components/BookingForm.tsx`
3. Update `src/components/Confirmation.tsx`

### Change Time Slots

Edit `src/config.ts` to modify:
- Working hours
- Working days
- Slot duration

## Deploy

1. Build: `pnpm build`
2. Deploy `dist/` to static host
3. Set up Twilio webhook for production SMS
