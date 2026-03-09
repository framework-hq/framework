# Affiliate/Referral Program Template

A complete referral program system you can add to any app. Track referrals, attribute signups, record conversions, and manage payouts.

## Features

- **Referral Link Generation** - Unique codes for each user
- **Click Tracking** - Monitor link performance with full attribution
- **Signup Attribution** - 7-day cookie-based attribution window
- **Conversion Tracking** - Record when referred users become paying customers
- **Reward System** - Configurable rewards (credits, cash, discounts)
- **User Dashboard** - Let users see their stats and copy their link
- **Admin Dashboard** - Monitor program performance and top referrers
- **Multi-Program Support** - Run multiple referral campaigns

## Quick Start

### 1. Set up Supabase

1. [Create a Supabase project](https://supabase.com/dashboard?utm_source=framework&utm_medium=referral) (affiliate link — see disclosure below)

2. Copy your project URL and anon key from Settings → API

3. Create `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Run Database Migrations

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push the schema
supabase db push
```

### 3. Start Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:5173` to see your referral program.

## Integration Guide

### Adding Referral Tracking to Your App

```tsx
import { initReferralTracking } from './lib/referrals';

// Call on app initialization
useEffect(() => {
  initReferralTracking();
}, []);
```

### Attributing Signups

When a user signs up, call `attributeSignup`:

```tsx
import { attributeSignup } from './lib/referrals';

async function handleSignup(userId: string) {
  // Your signup logic...
  
  // Attribute to referrer (reads from cookie)
  await attributeSignup(userId);
}
```

### Recording Conversions

When a referred user converts (e.g., subscribes):

```tsx
import { recordConversion } from './lib/referrals';

async function handleSubscription(userId: string, amount: number) {
  // Your subscription logic...
  
  // Record the conversion
  await recordConversion(userId, 'subscription', amount);
}
```

### Adding the User Dashboard

```tsx
import { ReferralDashboard } from './components/ReferralDashboard';

function SettingsPage() {
  const { user } = useAuth();
  
  return (
    <ReferralDashboard 
      userId={user.id}
      userName={user.name}
      baseUrl="https://yourapp.com"
    />
  );
}
```

## Customization

### Reward Configuration

Edit the default program in `supabase/migrations/001_initial.sql`:

```sql
INSERT INTO programs (name, slug, reward_type, referrer_reward, referee_reward) 
VALUES (
  'My Program', 
  'default', 
  'credit',    -- 'credit', 'cash', 'discount', or 'custom'
  10.00,       -- Reward for referrer
  10.00        -- Reward for new user
);
```

### Attribution Window

Change the cookie expiry in `src/lib/referrals.ts`:

```ts
// 30-day attribution window
document.cookie = `ref_code=${code}; max-age=${30 * 24 * 60 * 60}; path=/`;
```

### Custom Referral Codes

Allow users to set custom codes:

```tsx
const { data } = await supabase
  .from('referral_codes')
  .update({ custom_code: 'JOHN10' })
  .eq('user_id', userId);
```

## Database Schema

| Table | Purpose |
|-------|---------|
| `programs` | Referral program configurations |
| `referral_codes` | User referral codes |
| `referral_clicks` | Click tracking |
| `referral_signups` | Signup attribution |
| `referral_conversions` | Conversion records |
| `referral_payouts` | Payout tracking |
| `referral_balances` | User reward balances |

## API Reference

### `initReferralTracking()`
Call on app load to track incoming referral clicks.

### `getOrCreateReferralCode(userId, userName, programSlug?)`
Get or create a referral code for a user.

### `trackClick(code, metadata?)`
Manually track a referral click.

### `attributeSignup(refereeId, referralCode?)`
Attribute a signup to a referrer.

### `recordConversion(refereeId, type, value?)`
Record a conversion and distribute rewards.

### `getReferralStats(userId)`
Get referral statistics for a user.

## Affiliate Disclosure

This template includes an affiliate link to Supabase. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly at supabase.com or use any other PostgreSQL-compatible database.
