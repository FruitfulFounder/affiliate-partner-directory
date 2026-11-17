# AvaraPath integration setup — Batch 2

Nothing in this setup requires activating payments or changing the production domain. Start in the existing Vercel project's **Preview** environment. No accounts were created, subscriptions purchased, or credentials configured by this batch. Provider plans and limits should be checked in the account before use; code does not assume a paid plan.

## Inquiry delivery
Implemented route: `api/contact.js` → `integrations/node-contact.mjs` → `integrations/providers.mjs` → shared validated contact handler. Local Vite development serves the same route. Plain static hosting without server functions will not provide the inquiry API.

1. Use a business-owned Resend account. Verify an authorized sender/domain and obtain an API key. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to that verified sender. Sender verification may require DNS records; this batch does not change DNS. If the sender domain is not already verified, obtain authorization before adding records. Resend's default test sender may be limited to the account owner's address.
2. Set `CONTACT_TO_EMAIL` to the receiving inbox. It defaults to `contact.email` in `src/config.mjs`, currently `contact@avarapath.com`. There is no Zoho-specific integration: any valid inbox can receive the email. Zoho is scheduled to expire in May 2027; verify renewal or migrate the inbox before then. When changing inbox, update both `CONTACT_TO_EMAIL` and public `contact.email` so the direct-email fallback stays accurate.
3. Create a Cloudflare Turnstile widget and add only the intended preview hostnames. Set `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Action must be `inquiry`; the server verifies both hostname and action. The site key is public; the secret remains on the server. Use official test keys for local tests only, never production. This batch tested provider behavior with mocks, not a real widget.
4. Use an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The rate limiter uses an atomic `SET ... NX EX 60`: one attempt per client IP per minute. It stores a salted hash key, not a raw IP, for 60 seconds; the secret-backed salt is server-only. If the limiter fails, the request fails closed.
5. Set `CONTACT_ALLOWED_ORIGINS` to comma-separated exact origins you approve. The Vercel-generated `https://${VERCEL_URL}` preview origin is automatically allowed. Add a stable branch-preview/custom host explicitly if used. Do not accept arbitrary origins. On Vercel, only its trusted forwarding header supplies the client IP; local development uses the socket address.
6. For local development, copy `.env.example` to `.env.local` and fill it privately, or export variables in the terminal. Vite reads these for the local server. None needs a `VITE_` prefix. Never add server secrets to client config, screenshots, commits, or chat. On Vercel, set server values in the dashboard; never commit `.env.local`.
7. Redeploy **Preview only**, then check `GET /api/contact`: it returns only readiness and the public site key. Readiness means required values are present, not proof of credential validity. The browser loads Turnstile only when readiness is true. It disables Send until verification completes.
8. Test invalid fields, honeypot, bad/expired challenge, rate limiting, provider downtime, and an actual valid submission. A success message appears only after Resend returns an accepted message ID. Confirm the email arrives and reply-to uses the customer's email. Provider acceptance is not a guarantee of final inbox delivery; verify domain and spam-folder behavior.
9. Review the inquiry privacy disclosure and choose an inbox retention/deletion policy. Code does not persist leads or messages in an app database; email/provider logs still exist. Respond to access/deletion requests through the configured business inbox. Restrict access in each provider account.

If any provider is unconfigured or unavailable, the form does not download files, send unprotected submissions, or claim success. It shows an explicit unavailable message and a `mailto:` link. Email opens the visitor's own mail app; delivery depends on the actual inbox and mail setup. Direct email was not end-to-end tested here.

## Consultation booking

Create a business-owned Cal.com (default preference) or Calendly event. Use its available free/low-cost plan if suitable. Configure:
- Consultation duration (default 30 minutes), actual availability and timezone.
- Confirmation email, cancellation and rescheduling links, buffers and booking notice.
- Business name and contact information.

Set `integrations.booking.provider`, `.url` (HTTPS public event URL), and `.durationMinutes` in `src/config.mjs`. The same values drive the section and assistant. Duration is display configuration; the event's actual duration must be set to match in the scheduling provider. The CTA opens the provider's live availability page. The provider owns confirmations and appointment changes; this site does not implement a separate calendar system.

Until connected, the CTA selects Consultation in the inquiry section; email is the available fallback while inquiry delivery is unconfigured. It never confirms an appointment. After connection, book a test appointment and exercise confirmation, cancellation, rescheduling, timezone and mobile flows in the provider. No scheduling account was available for this batch.

## FAQ guide

Working, local, rule-based assistant; no paid AI service, account, network request or conversation storage. Its approved response rules are in `src/assistant.mjs`; appearance, introductory text, suggested questions and enable switch are in `config.assistant`. Prices come from `config.pricing`, not a second hardcoded list. CTA links point to services, pricing, consultation and inquiry sections. The guide never claims to be live AI. It cannot read customer data, submit inquiries or book an appointment.

For another customer, update the approved rules and service mapping as well as branding. Paid AI integration remains a separately scoped optional feature, disabled by default.

## Demonstrations and new clients

`/?demo=field-fern`: fictional local garden service. `/?demo=forma-studio`: fictional premium interior studio. Both share local form/appointment-request behavior and use distinct themes, layouts, typography, and business content in `src/demos.mjs`. Forms validate locally and explicitly state nothing was sent or booked.

Use these as starting compositions, not live businesses. Before customer use, replace fictional content, supply their logo/assets, connect their form and booking accounts, remove demo-only behavior after real integration testing, and review privacy copy. `scripts/new-client.mjs` copies framework source, API, and the empty environment template but excludes real credentials, Vercel identity, runtime data and Git history. Customer tests containing AvaraPath-specific content/pricing expectations must be updated alongside that client's configuration.
