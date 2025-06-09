# WealthTracker Architecture

## Overview

WealthTracker is a modern, mobile-first finance management platform built with Next.js (React), TypeScript, and Supabase. It is designed to help Indian users track assets and liabilities in a unified dashboard, with real-time analytics, broker integrations, and AI-ready insights.

---

## System Components

- **Frontend:** Next.js (App Router), React 18, TypeScript, TailwindCSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** React Query, Zustand
- **APIs/Services:** Centralized in `services/`
- **Authentication:** Supabase Auth (JWT, RLS)
- **Database:** PostgreSQL (schema in `supabase/`)
- **UI Components:** Custom design system (in `components/`)

---

## High-Level Architecture Diagram

```
[User Device]
     |
     v
[Next.js Frontend (React)]
     |
     v
[API Services / Hooks]
     |
     v
[Supabase Backend (Postgres, Auth, Storage)]
```

---

## Data Flow

1. **User Interaction:**
   - Users interact with the app via the browser/mobile (PWA-ready).
   - Navigation and UI handled by Next.js App Router and custom components.

2. **State Management:**
   - Local state: Zustand stores, React state/hooks.
   - Server state: React Query for data fetching/caching.

3. **API Communication:**
   - All backend communication is via Supabase client (RESTful/PostgREST, Realtime, Auth).
   - API logic is abstracted in `services/api.ts` and custom hooks in `hooks/`.

4. **Authentication:**
   - Supabase Auth manages user sessions (JWT, cookies).
   - Row Level Security (RLS) ensures data privacy per user.

5. **Database:**
   - PostgreSQL schema defined in `supabase/schema.sql`.
   - TypeScript types for DB models in `types/database.ts`.

6. **Assets & Static Files:**
   - Served from `public/` directory.

---

## Key Directories

- `app/` - Application routes/pages (Next.js App Router)
- `components/` - Shared UI components
- `hooks/` - Custom React hooks
- `services/` - API and backend service logic
- `stores/` - State management (Zustand)
- `supabase/` - Database schema, SQL, and sample data
- `types/` - TypeScript types and DB models
- `utils/` - Helper functions
- `public/` - Static assets
- `styles/` - Global and modular CSS

---

## Extensibility

- **Feature Modules:** Each major feature (assets, liabilities, insights, etc.) is organized in its own directory under `app/`.
- **Integrations:** Broker and aggregator integrations are modular and can be extended easily.
- **AI/Analytics:** The system is designed to be AI-ready for future insights and analytics modules.

---

## Next Steps

- See `DATABASE.md` for schema details
- See `AUTH.md` for authentication flow
- See `DATAFLOW.md` for detailed data movement 