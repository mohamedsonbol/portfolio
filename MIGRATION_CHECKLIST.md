# Portfolio domain migration checklist

## Repository findings

- The repository origin is GitHub: `git@github.com:mohamedsonbol/portfolio.git`.
- No application hosting manifest is present (`vercel.json`, Netlify, Docker, Render, Railway, or Hostinger configuration was not found).
- The README's historic Vercel references do not establish the current application hosting provider.
- `@vercel/analytics` is an application integration, not proof that the app is hosted on Vercel.
- The GTM deployment scripts target a separate Google Cloud service and must remain unchanged.

## Required application configuration

- Deploy the Next.js application as a Node.js server application; this is not configured as a static export.
- Install with `pnpm install --frozen-lockfile`.
- Build with `pnpm build`.
- Serve with `pnpm start`.
- Set the host's Node.js version to `>=20.9.0` (the committed Next.js 16.0.10 engine requirement).
- Attach the custom domain `mohamedsonbol.exceptionalgrp.com` in the selected hosting provider.
- Use the DNS record/value supplied by that hosting provider. Do not guess or reuse the GTM DNS record.
- Enable provider-managed SSL for the portfolio domain and verify HTTPS before changing traffic.
- Do not change redirects during this preparation; preserve the host's existing routing behavior.

## Environment variables

Required for the contact form:

```env
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

Optional Telegram notification:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Required only for resume analysis:

```env
OPENAI_API_KEY=
```

The OpenAI key and SMTP credentials must remain server-only. Do not prefix them with `NEXT_PUBLIC_`.

The existing Supabase client uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, but that client is not currently used by the application.

## Analytics invariants

Preserve all of the following exactly:

- Google measurement ID: `G-4898X9MEDR`
- Server-side GTM script hostname: `https://sst.exceptionalgrp.com`
- `server_container_url`: `https://sst.exceptionalgrp.com`
- Vercel Analytics integration: `@vercel/analytics/next`

The portfolio migration must not move, rename, or repoint the GTM hostname.

## Post-deployment verification

- `https://mohamedsonbol.exceptionalgrp.com/` returns the homepage.
- `/projects` and `/resume` return successfully.
- `/robots.txt` references `https://mohamedsonbol.exceptionalgrp.com/sitemap.xml`.
- `/sitemap.xml` contains `/`, `/projects`, and `/resume`.
- Page source contains canonical URLs under `mohamedsonbol.exceptionalgrp.com`.
- Open Graph and Twitter metadata use the new domain and portrait image.
- Google Analytics requests still use `G-4898X9MEDR` and `sst.exceptionalgrp.com`.
- Vercel Analytics remains present in the rendered application.
- Contact SMTP delivery and optional Telegram notifications work.
- PDF parsing and resume analysis endpoints still respond correctly.
- No DNS, SSL, or production redirect changes are made until the host and current records are confirmed.

## Obsolete hostname note

No application source or generated SEO metadata references `dev.exceptionalgrp.com`. The remaining exact hostname reference is inside `map-custom-domain.ps1` as `sst.dev.exceptionalgrp.com`, which belongs to the separate GTM infrastructure and is intentionally preserved. An unlinked user-supplied DOCX under `public/` was not rewritten because binary document editing is outside this migration; inspect or regenerate that document before making it directly public if its embedded contact/domain text is still old.
