# WealthTracker Data Flow

## Overview

This document describes how data moves through the WealthTracker application, from user actions in the UI to the backend database and back.

---

## 1. User Interaction
- Users interact with the app via the browser or mobile (PWA-ready)
- UI is built with React components (in `app/` and `components/`)

## 2. State Management
- **Local state:** Managed with React state/hooks and Zustand stores (`stores/`)
- **Server state:** Managed with React Query for fetching/caching data from Supabase

## 3. Data Fetching & Mutations
- Data is fetched and mutated using custom hooks (`hooks/`) and service functions (`services/api.ts`)
- All backend communication is via the Supabase client (RESTful/PostgREST, Realtime, Auth)

## 4. Authentication
- Auth state is managed by Supabase Auth and the custom `useAuth.ts` hook
- JWT tokens are included in all requests to ensure secure, per-user data access

## 5. Backend & Database
- Supabase handles all backend logic, including:
  - Database queries (PostgreSQL)
  - Authentication (JWT, RLS)
  - Storage (files, images)
- Row Level Security (RLS) ensures users only access their own data

## 6. Data Rendering
- Fetched data is passed to React components for rendering
- UI updates automatically on data changes (React Query cache, Zustand state)

---

## Example Data Flow: Adding an Asset

1. **User Action:**
   - User fills out the "Add Asset" form and submits
2. **Frontend:**
   - Form data is validated (React Hook Form + Zod)
   - `addAsset` function (in `services/api.ts`) is called
3. **API Call:**
   - Supabase client sends an `INSERT` request to the `assets` table
   - JWT token is included for authentication
4. **Backend:**
   - Supabase checks RLS policy to ensure user can insert
   - Asset is added to the database
5. **Frontend Update:**
   - React Query invalidates/fetches the latest assets
   - UI updates to show the new asset

---

## Example Data Flow: Fetching Dashboard Data

1. **User Action:**
   - User navigates to the dashboard
2. **Frontend:**
   - Dashboard component calls a custom hook (e.g., `useDashboardData`)
   - Hook fetches data via Supabase client (multiple tables: assets, liabilities, goals, etc.)
3. **Backend:**
   - Supabase applies RLS and returns only the user's data
4. **Frontend Update:**
   - Data is rendered in charts, tables, and analytics components

---

## References
- See `services/api.ts` for API logic
- See `hooks/` for data fetching hooks
- See `types/database.ts` for data models 