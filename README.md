# Mohamed Sonbol portfolio

Personal portfolio for Mohamed Ezzat (Sonbol), a Technical Support Engineer focused on JavaScript and integrations.

The site is built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. It includes a responsive portfolio homepage, project browser, HTML resume, contact form, PDF parsing endpoint, and optional AI-powered resume analysis.

## Local development

Requirements:

- Node.js compatible with the project dependencies
- pnpm

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000`.

Available scripts:

- `pnpm dev` — start Next.js in development mode
- `pnpm build` — create a production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint

## Environment variables

The contact endpoint requires SMTP credentials:

```env
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

Telegram notifications are optional:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Resume analysis requires an OpenAI key:

```env
OPENAI_API_KEY=
```

The repository also contains an unused Supabase browser client, which requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only if that integration is enabled in the future.

## Routes

- `/` — portfolio homepage
- `/projects` — GitHub and CodePen project collection
- `/resume` — HTML resume
- `/api/contact` — SMTP contact form endpoint with optional Telegram notification
- `/api/parse-pdf` — PDF text extraction endpoint
- `/api/analyze-resume` — AI-assisted ATS analysis endpoint

## Analytics

Analytics runs through Google Tag Manager (web container `GTM-PMCQ6NCG`, `components/gtm-analytics.tsx`), which serves the GA4 property `G-4898X9MEDR`. The container is requested only after the visitor grants analytics consent; Google Consent Mode v2 defaults are all denied and set inline before GTM initializes (`app/layout.tsx`, `components/consent-provider.tsx`, `lib/consent.ts`). Consent is restored into the data layer before GTM initialization on repeat visits.

Automatic page_view tracking is disabled: the GA4 Google tag must not send a page view on load and Enhanced Measurement URL-change tracking must be off in the GA4 stream. Page views are pushed manually as a single `page_view` data-layer event per pathname change (`pushPageView` in `lib/analytics.ts`), so initial loads and App Router client navigations each produce exactly one page view, with no GTM History Change triggers.

Custom events (`contact_form_submit`, `outbound_click`) are pushed in object form into the data layer and forwarded to GA4 by GTM tags. The former direct gtag.js implementation was removed; the former server-side tagging setup (TAGGRS / `sst.exceptionalgrp.com`, server-side GTM on Cloud Run) has been removed and `deploy-gtm.ps1` / `map-custom-domain.ps1` were deleted.

Vercel Analytics (`@vercel/analytics`) is not initialized. The dependency remains installed for possible future re-evaluation.

Consent preferences are stored in `localStorage` under `mgmt_consent_v1`, can be changed any time via the footer "Cookie Settings" button, and withdrawing analytics consent stops collection and removes analytics cookies. Legal pages live at `/privacy-policy` and `/cookie-policy`.

## Security controls

- Contact submissions require JSON input with bounded name, email, and message lengths. Email HTML is escaped, email header newlines are rejected, and the endpoint has a best-effort per-IP rate limit.
- PDF parsing accepts only `.pdf` uploads with an `application/pdf` MIME type and `%PDF-` signature, limits uploads to 10 MB, caps extracted text, and returns safe errors for malformed files.
- Resume analysis validates and bounds request fields, caps the request body and prompt input, keeps `OPENAI_API_KEY` server-side, limits analysis requests, and returns generic provider-failure responses.

The rate limiter is process-local because no external stateful rate-limit service is configured; multiple server instances will not share counters. Run `pnpm audit --prod` in a network-enabled environment as part of dependency maintenance. No production environment variables are stored in the repository.

## Identity

- Website: https://mohamedsonbol.exceptionalgrp.com
- Email: mhmdezzat.eng@gmail.com
- LinkedIn: https://linkedin.com/in/mohamedsonbol
- Location: Warsaw, Poland

Deployment is intentionally not performed from this repository workflow.
