# Environment Variable Setup Guide

## Purpose
This guide documents common issues, troubleshooting steps, and best practices for setting up environment variables in Next.js (or similar) projects. It is written for both human developers and AI assistants to ensure smooth onboarding and avoid common pitfalls.

---

## Lessons Learned (from WealthTracker setup)
- **.env.local must be named exactly** `.env.local` (not `.env`, `.env.local.txt`, etc.).
- **File must be in the project root** (same folder as `package.json`).
- **Variable names must match exactly** (case-sensitive, no typos, e.g., `NEXT_PUBLIC_SUPABASE_URL`).
- **No spaces or quotes** around the `=` or values.
- **Values must be on a single line** (especially for long keys like Supabase anon keys).
- **Restart the dev server** after any change to `.env.local`.
- **Check for hidden file extensions** (Windows may hide `.txt` extensions by default).
- **Use a code editor** (VS Code, Sublime, Notepad++) to avoid invisible characters.
- **Console log your env variables** in code to debug if they are being read.
- **Vercel and other hosts require env variables to be set in their dashboard**—they do not use your local `.env.local`.

---

## Step-by-Step Checklist
1. Create `.env.local` in your project root.
2. Add variables with no spaces or quotes:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
   ```
3. Save the file.
4. Restart your dev server (`Ctrl+C` then `npm run dev` or `pnpm dev`).
5. If you get `undefined` or errors, add `console.log(process.env.YOUR_VAR)` in your code to debug.
6. If deploying, add the same variables in your host's dashboard (e.g., Vercel > Settings > Environment Variables).

---

## Troubleshooting Prompt (for AI or Human)
- Are the variable names exactly correct (case, spelling, underscores)?
- Is the `.env.local` file in the project root and named correctly?
- Are there any hidden file extensions (e.g., `.env.local.txt`)?
- Are there spaces or quotes around the `=` or values?
- Are all values on a single line?
- Did you restart the dev server after editing the file?
- Did you try logging the variable in your code to see what is being read?
- If on Vercel (or similar), are the variables set in the dashboard?

---

## Best Practices
- Always use `.env.local` for local secrets (never commit to git).
- Document required variables in `README.md` or a dedicated env guide.
- Use the same variable names locally and in production.
- For long keys, always paste as a single line.
- When onboarding new team members, share this guide!

---

**Keep this guide in every project to save hours of debugging for both humans and AI!** 