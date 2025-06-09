# WealthTracker Authentication

## Overview

WealthTracker uses Supabase Auth for secure, scalable authentication. All user data is protected with Row Level Security (RLS) policies to ensure privacy and data isolation.

---

## Authentication Methods
- **Email/password** (default)
- **OAuth providers** (Google, etc. — can be enabled via Supabase dashboard)

---

## Auth Flow
1. **Sign Up:**
   - User registers via email/password or OAuth
   - Supabase creates a new user in the `auth.users` table
2. **Sign In:**
   - User logs in via email/password or OAuth
   - Supabase issues a JWT session token
3. **Session Management:**
   - JWT is stored in browser (cookie/localStorage)
   - Session is managed client-side via Supabase client
   - Session auto-refreshes on expiry
4. **API Requests:**
   - All requests to Supabase include the JWT for authentication
   - RLS policies enforce per-user data access

---

## Row Level Security (RLS)
- RLS is enabled on all user data tables (assets, liabilities, etc.)
- Policies ensure users can only access their own data
- Example policy (Postgres):
  ```sql
  CREATE POLICY "Users can view their own assets" ON assets
    FOR SELECT USING (user_id = auth.uid());
  ```

---

## TypeScript Auth Hook
- See `hooks/useAuth.ts` for a custom React hook that wraps Supabase Auth methods (sign in, sign out, session, etc.)

---

## Session Persistence
- Sessions persist across browser reloads
- Auto-refresh handled by Supabase client

---

## Security Notes
- All sensitive data is encrypted at rest (Supabase default)
- JWT tokens are short-lived and auto-refreshed
- HTTPS enforced in production

---

For more, see the Supabase [Auth docs](https://supabase.com/docs/guides/auth) and the `supabase/` directory for RLS policy SQL. 