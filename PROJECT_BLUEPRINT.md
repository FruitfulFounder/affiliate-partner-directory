# AvaraPath project blueprint

## Direction
AvaraPath: Your Business. Built Smarter. Custom websites and practical digital systems for small businesses locally and nationwide. One-time development and optional recurring care are separate offerings. No affiliate membership, fixed unapproved pricing, payment activation, fabricated clients, or testimonials.

## Source and preservation status
Integrated into the existing FruitfulFounder/affiliate-partner-directory checkout. Original main d45846c20d22c574c24e67ccd1036fe5e290947e is preserved in local backup/production-before-digital-solutions-2026-11-16. Changes live only on local dev/digital-solutions. Neither branch has been pushed because Vercel may automatically deploy branch events. Main and origin remain unchanged.

All four original PNG logos remain unchanged in public/images/brand. The original header logo and icon are used. Historical affiliate code/data are recoverable in the backup branch; old public membership marketing and checkout code are removed from the development App. Original favicon and historical assets remain stored, while the page references the branded PNG icon.

## Architecture
Retains React 19, Vite 8, Tailwind 4 and existing dependency versions/lockfile. src/config.mjs separates content and branding; src/render.mjs provides reusable HTML sections mounted through the React App host. This adapter intentionally retains the original generated section renderer instead of duplicating the page as JSX. Only trusted source configuration is rendered; visitor input never becomes HTML. Native disclosures and inquiry behavior use src/interactions.mjs with AbortController cleanup for React StrictMode and unmounts. src/App.css contains responsive styling. Existing main.jsx and vite.config.js are unchanged. No new dependencies are added.

Editorial/compact layouts and inline/stacked navigation are starting variants. Sections can be reordered/omitted; update linked navigation and CTA targets when removing a section. Brand typography accepts a CSS font stack. Future client work should expand the renderer or introduce React sections where stateful behavior warrants it, while keeping content separate.

## Services
Website and digital experiences: business websites, landing pages, lead collection.
Automation and customer experience: scheduling, approved-knowledge chatbots, workflow automation, follow-ups and review requests.
Commerce and business tools: provider-hosted payments and e-commerce, dashboards, hosting and maintenance.
Each service has an expandable explanation. Services are offered capabilities, not claims that this review site runs those integrations.

## Modules and activation
- Contact: default download-only, no persistence or network request. Setting `integrations.contact.endpoint` to HTTPS enables POST submission. Use a server handler based on `integrations/contact.mjs`, with explicit origin, durable rate limiter, server spam verification, and delivery adapter. Validate destinations server-side. Verify provider acceptance and test failures before launch. A honeypot alone is insufficient for public production. Wire provider spam tokens in the UI when using a challenge provider. Consent and privacy copy must match the final provider, retention period, and deletion contact.
- Booking: a configured HTTPS URL replaces the consultation request CTA with an external scheduling link. Use a business-owned Calendly, Cal.com, or equivalent account. Verify timezone, availability, notifications, cancellation and rescheduling flows.
- Chat: adapter descriptor only, disabled. Select provider; add approved knowledge, escalation and privacy rules; implement consent-aware UI and test. No widget is embedded by this version.
- Payments: descriptor only, disabled. Pattern allows Stripe-hosted `buy.stripe.com` checkout; do not activate payment links without separate authorization. No card processing, checkout, subscription or payments exist here.
- Automation: versioned `lead.received` event contract only. Choose Zapier, Make, or equivalent; configure authenticated server-to-server webhook with secret, retry policy, idempotency, and consent controls. Never expose webhook credentials in client config.
- Dashboard: architectural extension contract only. Requires authenticated server routes and per-customer authorization; never treat client configuration as access control.

## New customer workflow
1. Run `node scripts/new-client.mjs /absolute/unused/client-directory "Business Name"`. The generator refuses existing destinations and copies source without Git state, dist, secrets, runtime data or project identity. It creates CLIENT_START.md; it does not pretend the resulting copy is a finished client site.
2. Write a customer design brief: audience, primary action, tone, photography, typography, composition, and industry requirements. Standardize technology, not appearance.
3. Replace brand, service content, examples, title/description, footer, favicon and AvaraPath logos. Edit template metadata as well as config. Supply business-owned assets. Recompose sections and create a visually distinct layout rather than only recoloring AvaraPath.
4. Choose and implement required modules. Keep others disabled. Use customer-owned provider accounts and server-only credentials.
5. Run tests/build and manually verify mobile, desktop, keyboard navigation, reduced motion, actual submissions, accessibility and provider failure paths.
6. Initialize the customer's independent repository, document ownership and hosting, and deploy only with authorization.

## Design standards
Navy/blue identity, editorial type hierarchy, generous whitespace, useful visual concepts, clear CTAs, readable copy, visible keyboard focus, native disclosure elements and reduced-motion support. Two concept previews are explicitly illustrative and are not customer work. No invented results or testimonials.

## Roadmap and launch blockers
Original repository and logo integration is complete. Publish the backup/development branches only after automatic Vercel deployment behavior is controlled. Configure contact delivery and spam/rate controls; connect consultation scheduling; complete privacy notice and retention policy. Review actual rendered breakpoints and keyboard/screen reader behavior. Test configured providers end to end. Add approved real project examples when available. Expand chat, payment, automation and dashboard modules only for validated customer needs. Deployment authorization is still required.
