# PROJECT_BIBLE.md — FrameWork

*The single source of truth for architecture decisions, rationale, and project direction.*

---

## Mission

**FrameWork** is the open-source framework that replaces bloated multi-tenant SaaS for internal tools.

- Ready-made templates for mini-apps (CRM, email, booking, landing pages, dashboards, invoicing)
- Lightweight composer (`framework compose`) binds templates via natural language
- Pre-wired to infrastructure APIs (Stripe, Twilio, SendGrid, Supabase, Vercel, AWS)
- Monetization via embedded affiliate/referral links with clear disclosure
- 100% free core (MIT license), turnkey, maintainable by one person

## Goals

| Metric | 6 Months | Year 1 | Year 2 |
|--------|----------|--------|--------|
| Active Users | 5,000 | 25,000 | 80,000 |
| Revenue | — | $200k-$600k | $850k-$2.5M |

## Target User

**Primary:** SMBs (10-200 employees) with growing tech stack pain, one "tech-savvy" person, budget-conscious but quality-focused.

**Secondary:** Agencies building for SMB clients.

---

## Architecture Decisions

### ADR-001: Tech Stack
**Date:** 2025-02-26  
**Status:** Accepted

**Decision:**
- Runtime: Node.js 22+ (LTS)
- Language: TypeScript 5.x
- Package manager: pnpm
- Testing: Vitest
- Linting: ESLint + Prettier
- Docs: VitePress (later)

**Rationale:**
- Node 22 is current LTS, widely supported
- TypeScript for type safety and better DX
- pnpm for speed and disk efficiency
- Vitest for fast, modern testing
- Industry standard tooling = easier contributions

### ADR-002: Monorepo Structure
**Date:** 2025-02-26  
**Status:** Accepted

**Decision:**
```
framework/
├── packages/
│   ├── cli/           # framework CLI
│   ├── core/          # shared utilities
│   └── create-app/    # npm create framework
├── templates/
│   ├── landing-page/
│   ├── crm/
│   ├── booking/
│   └── ...
├── docs/              # VitePress documentation
└── examples/          # Example implementations
```

**Rationale:**
- Monorepo allows shared code between CLI and templates
- Templates are self-contained, easy to understand
- Clear separation of concerns

### ADR-003: Affiliate Integration Approach
**Date:** 2025-02-26  
**Status:** Accepted

**Decision:**
- Embed affiliate/referral links in template configs
- Clear disclosure in README and docs
- User can replace with their own links
- Track via UTM parameters where possible

**Services (validated rates):**
| Service | Program | Rate |
|---------|---------|------|
| DigitalOcean | Affiliate | 10% recurring for 12 months |
| Hostinger | Affiliate | 40%+ one-time |
| Stripe | Partner | Negotiated |
| Supabase | Partner | Negotiated |

**Rationale:**
- Transparent monetization users can see and modify
- No lock-in — users own their infrastructure
- Hybrid model: affiliates + paid tiers + services

---

## Progress

### Templates (Phase 1)
| Template | Status | Integrations |
|----------|--------|--------------|
| Landing Page | ✅ Complete | SendGrid |
| CRM | ✅ Complete | Supabase |
| Booking | ✅ Complete | Twilio |
| Dashboard | 🔜 Pending | — |
| Invoicing | 🔜 Pending | Stripe |

### CLI (Phase 2)
| Feature | Status |
|---------|--------|
| `create-framework` scaffolding | 🔄 In Progress |
| Template selection | 🔜 Pending |
| Affiliate link injection | 🔜 Pending |

---

## Changelog

| Date | Change |
|------|--------|
| 2025-02-26 | Project initialized. ADR-001, 002, 003 created. |
| 2025-02-26 | Template #1: Landing Page with email capture + SendGrid |
| 2025-02-26 | Template #2: CRM with contacts, notes, tags + Supabase |
| 2025-02-26 | Template #3: Booking system with calendar + Twilio SMS |

---

*Update this file with every significant decision.*
