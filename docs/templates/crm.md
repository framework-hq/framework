# CRM Template

A contact management system with notes, tags, and full-text search.

## Features

- 👥 **Contact List** — Sortable, searchable table
- 🏷️ **Tags** — Categorize contacts with color-coded tags
- 📝 **Notes** — Add timestamped notes to any contact
- 🔍 **Search** — Full-text search across all fields
- ➕ **CRUD** — Create, read, update, delete contacts

## Quick Start

```bash
npx create-framework my-crm --template crm
cd my-crm
pnpm install
pnpm dev
```

Open `http://localhost:3001`

## Demo Mode

Works immediately with mock data. No database setup needed for local development.

## Supabase Integration

### 1. Create a Supabase Project

[Sign up for Supabase](https://supabase.com/dashboard) and create a new project.

### 2. Run Migrations

Find the SQL in `supabase/migrations/001_initial.sql`. Run it in the Supabase SQL Editor:

```sql
-- Creates contacts, notes, and tags tables
-- with proper relationships and indexes
```

### 3. Configure Environment

Create `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Restart Dev Server

```bash
pnpm dev
```

## Data Model

```
contacts
├── id (uuid)
├── name (text)
├── email (text)
├── phone (text)
├── company (text)
├── created_at (timestamp)
└── tags (text[])

notes
├── id (uuid)
├── contact_id (uuid, FK)
├── content (text)
└── created_at (timestamp)
```

## Customization

### Add Fields

1. Update `src/types/index.ts`
2. Update Supabase schema
3. Update form in `src/components/ContactModal.tsx`
4. Update display in `src/components/ContactDetail.tsx`

### Change Tags

Edit the default tags in `src/lib/mock-data.ts` or your Supabase data.

## Deploy

1. Build: `pnpm build`
2. Deploy `dist/` to static host
3. Ensure Supabase project is configured for production
