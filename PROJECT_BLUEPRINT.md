# AvaraPath project blueprint

## Direction and identity
AvaraPath — Your Business. Built Smarter. Practical websites and digital solutions for small businesses locally and nationwide. One-time development and optional ongoing care remain separate. No affiliate membership or recurring billing platform. The approved navy/blue identity, original logos, hero, services, four-step process, benefits, support, FAQ and footer remain the foundation.

## Architecture
The original React 19/Vite 8/Tailwind 4 stack and dependency lockfile are retained. The React App hosts a shared escaped HTML renderer and installs native interactions with AbortController cleanup for StrictMode/unmounts. Content and feature settings are in src/config.mjs. Trusted source content is rendered; never accept customer-generated HTML as configuration. Node-only provider code stays outside the browser bundle.

Modules:
- HTML utilities and URL guards: src/html.mjs.
- Main composition: src/render.mjs. Optional sections are configured in `sections`; update navigation, assistant actions and internal CTA targets when removing a linked section.
- Pricing, booking, form, assistant shell: src/features.mjs.
- Native browser interactions: src/interactions.mjs; delivery UI: src/contact-client.mjs.
- Rule-based FAQ assistant: src/assistant.mjs. Appearance/intro/questions are configurable; prices and booking information share the central config.
- Demo content/themes: src/demos.mjs. Query routes render full fictional business websites with separate scoped themes and shared local-only form behavior.
- API: api/contact.js and integrations/node-contact.mjs adapt Node/Vercel requests to the provider chain. Local Vite middleware uses the same adapter.
- Provider chain: integrations/providers.mjs wraps shared validation with Resend, Turnstile and atomic Upstash rate limiting. Server credentials never enter client config. See INTEGRATIONS_SETUP.md.
- payments, automation and dashboard contracts remain disabled/integration-ready; no money is processed and no customer dashboard is claimed functional.

## Services and provisional prices
All editable in src/config.mjs: Landing Pages $199+, Business Websites $499+, Booking Setup $249+, AI Chatbot Setup $399+, Business Automation $399+, Maintenance Request a Quote, Custom Business Software Request a Quote. The user approved these provisional starting prices for Batch 2. Final price depends on client requirements; no checkout is introduced.

Additional offered services include customer follow-ups and review automation, provider-hosted payments/e-commerce, dashboards, lead collection, hosting and support. Availability is scoped per customer; the site does not claim these optional systems are all active on AvaraPath.

## Working versus external setup
The local FAQ guide, prices, navigation, quote intent selection and full fictional demos work without accounts. Demo forms are explicitly non-sending and do not reserve appointments.

Inquiry delivery is implemented, not yet externally configured or verified. The API checks configuration and fails closed. No download substitute or false submission confirmation remains. An honest email link is offered if unavailable; actual inbox delivery was not tested. Receiving email is configurable independently of Zoho; review the May 2027 expiry with the business owner.

Booking is a reusable HTTPS link to a Cal.com/Calendly event with displayed duration and request fallback. Real availability, confirmations, rescheduling and cancellation require a configured provider event and end-to-end testing. No scheduling credentials were supplied.

## Client generation
Standardize the technology. Personalize the experience.
1. Run `node scripts/new-client.mjs /absolute/unused/customer-directory "Business Name"`. It refuses existing paths and copies source/API/blank env template without real credentials, Git history, Vercel identity, runtime data or dist.
2. Write a distinct brief: audience, goal, tone, photography, typography, hierarchy and composition. Do not just recolor AvaraPath. Use either fictional demo as a starting composition, then substantially tailor it.
3. Replace company details, logo/favicon, pricing, metadata, approved FAQ rules, examples and content. Choose brand colors/fonts, layouts, sections and assistant behavior. Self-host licensed fonts if needed. Update AvaraPath-specific tests.
4. Select optional features. Connect customer-owned form, booking and hosting accounts with server-only secrets. Do not share rate-limit keys, inboxes or secrets between customers. Review privacy and data retention.
5. Run unit tests/build and browser checks at desktop/tablet/mobile. Verify real mail, challenge, rate limit, provider failures, booking timezone, confirmations and cancellation/rescheduling. Label any unconfigured state honestly.
6. Create an independent customer repository and hosting linkage only with authorization; deploy through the customer's approved workflow.

## Preservation and release
Main d45846c20d22c574c24e67ccd1036fe5e290947e and local backup/production-before-digital-solutions-2026-11-16 preserve affiliate history. Original logos and assets remain unmodified. Batch 2 authorizes development branch pushes and automatic Vercel preview generation only. No merge into main, production deployment, DNS/domain change, payment activation or purchase is authorized.

Launch work remaining: authorize/configure external provider accounts; verify actual delivery and scheduling; confirm Vercel settings and preview access; decide privacy retention; complete production SEO and indexing only when approved; then seek production release authorization. No invented testimonials or customer results.
