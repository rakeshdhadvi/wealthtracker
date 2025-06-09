# WealthTracker Database Schema

## Overview

WealthTracker uses Supabase (PostgreSQL) as its backend database. The schema is designed to support comprehensive asset and liability tracking, user management, broker integrations, and analytics.

---

## Main Schema Files
- `supabase/schema.sql` — Main schema definition
- `supabase/schema-fixed.sql` — Updated/fixed schema
- `supabase/sample-data.sql` — Sample data for development

---

## Key Tables (Summary)

- **users**: Registered users (managed by Supabase Auth)
- **assets**: User assets (stocks, mutual funds, gold, real estate, etc.)
- **liabilities**: User liabilities (loans, credit cards, EMIs)
- **brokers**: Broker integration metadata
- **transactions**: Asset/liability transactions
- **goals**: User financial goals
- **insights**: AI/analytics suggestions
- **settings**: User preferences and settings

*Note: Table names and structure may be updated; see schema files for details.*

---

## Entity Relationship Diagram (ERD)

```
[users] <1---n> [assets]
[users] <1---n> [liabilities]
[users] <1---n> [goals]
[assets] <1---n> [transactions]
[liabilities] <1---n> [transactions]
[users] <1---n> [insights]
[users] <1---n> [settings]
[assets] <n---1> [brokers]
```

---

## Table Descriptions

### users
- Managed by Supabase Auth
- Stores user profile and metadata

### assets
- Tracks all user assets (type, value, broker, etc.)
- Linked to `users` and `brokers`

### liabilities
- Tracks all user liabilities (type, amount, due dates, etc.)
- Linked to `users`

### brokers
- Metadata for broker integrations (Zerodha, Groww, etc.)

### transactions
- Records transactions for assets and liabilities
- Linked to `assets` or `liabilities`

### goals
- User-defined financial goals

### insights
- AI/analytics suggestions for users

### settings
- User preferences (language, notifications, etc.)

---

## TypeScript Types
- See `types/database.ts` for generated TypeScript types matching the schema.

---

## How to Update the Schema
- Edit the SQL files in `supabase/`
- Apply changes via Supabase SQL editor or CLI
- Update TypeScript types as needed

---

For full details, see the schema files in the `supabase/` directory. 