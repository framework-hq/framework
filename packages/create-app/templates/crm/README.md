# CRM Template

A simple, powerful CRM for managing contacts, notes, and tags — powered by Supabase.

## Features

- 👥 **Contact Management** — Add, edit, delete contacts
- 📝 **Notes** — Add notes to any contact
- 🏷️ **Tags** — Organize contacts with custom tags
- 🔍 **Search** — Find contacts instantly
- 🎭 **Demo Mode** — Works without Supabase for testing
- 📱 **Responsive** — Works on desktop and mobile

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server (demo mode)
pnpm dev

# Open http://localhost:3001
```

## Supabase Setup

1. [Create a Supabase project](https://supabase.com/dashboard?utm_source=framework&utm_medium=referral) (affiliate link — see disclosure below)
2. Run the database migration (see below)
3. Copy your project URL and anon key
4. Create `.env` file:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  title TEXT,
  avatar_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notes table
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags table (for tag management)
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#6b7280'
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for anon - customize for production)
CREATE POLICY "Allow all" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all" ON notes FOR ALL USING (true);
CREATE POLICY "Allow all" ON tags FOR ALL USING (true);

-- Insert default tags
INSERT INTO tags (name, color) VALUES
  ('customer', '#22c55e'),
  ('lead', '#3b82f6'),
  ('enterprise', '#8b5cf6'),
  ('startup', '#f59e0b'),
  ('partner', '#ec4899'),
  ('investor', '#14b8a6'),
  ('vip', '#ef4444');
```

## Customization

### Add custom fields

Edit `src/types/index.ts` to add fields, then update the form in `ContactModal.tsx`.

### Change the sidebar

Edit `src/components/Layout.tsx` to add new navigation items.

### Styling

The app uses Tailwind CSS. Edit `tailwind.config.js` for theming.

## Affiliate Disclosure

This template includes an affiliate link to Supabase. FrameWork may receive a commission if you sign up via this link. You're free to sign up directly at supabase.com or use any other PostgreSQL-compatible database.

## License

MIT — part of the [FrameWork](https://github.com/framework-hq/framework) project.
