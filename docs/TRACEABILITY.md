# WealthTracker Codebase Traceability Guide

## Purpose

This guide is for non-coders, new contributors, and AI tools to easily trace, understand, and navigate the WealthTracker codebase. It explains naming conventions, where to find documentation, and how to follow the flow of data and features.

---

## 1. Naming Conventions

- **Files/Folders:**
  - Use `kebab-case` for files and folders (e.g., `add-asset-form.tsx`, `user-profile/`)
- **Components:**
  - Use `PascalCase` for React components (e.g., `DashboardCard`)
- **Variables/Functions:**
  - Use `camelCase` (e.g., `fetchUserAssets`, `userId`)
- **Types/Interfaces:**
  - Use `PascalCase` with a `T` or `I` prefix if needed (e.g., `TAsset`, `IUserProfile`)

---

## 2. Where to Find Documentation

- **Project Overview:** `README.md`
- **Architecture:** `docs/ARCHITECTURE.md`
- **Database Schema:** `docs/DATABASE.md`
- **Authentication:** `docs/AUTH.md`
- **Data Flow:** `docs/DATAFLOW.md`
- **Traceability Guide:** `docs/TRACEABILITY.md` (this file)

---

## 3. How to Trace a Feature or Data Flow

1. **Start at the UI:**
   - Find the relevant page or component in `app/` or `components/` (e.g., `app/dashboard/` for the dashboard)
2. **Check for Hooks:**
   - Look for custom hooks in `hooks/` (e.g., `useDashboardData.ts`)
3. **Follow Service/API Calls:**
   - See `services/api.ts` for backend/API logic
4. **Check Types:**
   - Refer to `types/` for TypeScript types and database models
5. **Database:**
   - See `supabase/` for SQL schema and sample data
6. **Authentication:**
   - See `hooks/useAuth.ts` and `docs/AUTH.md`

---

## 4. Inline Comments & Documentation

- All major functions, components, and types should have JSDoc/TSDoc comments explaining their purpose and usage.
- Complex logic is explained with inline comments.
- If you find something unclear, check the nearest doc file or ask for clarification in the project's support channel.

---

## 5. Example: Tracing "Add Asset" Feature

1. **UI:** `app/assets/add-asset-form.tsx`
2. **Hook:** `hooks/useAddAsset.ts`
3. **Service:** `services/api.ts` (function: `addAsset`)
4. **Type:** `types/database.ts` (`TAsset`)
5. **Database:** `supabase/schema.sql` (table: `assets`)

---

## 6. Best Practices

- Use clear, descriptive names for everything
- Keep functions and components small and focused
- Write and update documentation as you go
- Use TypeScript types everywhere
- Keep code and docs in sync

---

## 7. For Non-Coders

- Don't be afraid to explore! Start with the docs, then follow the steps above.
- Use search (Ctrl+F or project search) to find files, functions, or types by name.
- If you get lost, check this guide or ask for help.

---

**This guide will be updated as the project evolves.** 