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

The application preserves the existing Vercel Analytics integration and Google Analytics configuration routed through the existing server-side GTM endpoint. GTM deployment and domain-mapping scripts are intentionally kept unchanged.

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
