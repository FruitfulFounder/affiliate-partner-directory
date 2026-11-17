# AvaraPath Digital Solutions — Batch 2

Existing repository: `FruitfulFounder/affiliate-partner-directory`. Development branch: `dev/digital-solutions`. Keeps React 19, Vite 8, Tailwind 4, the original four logo assets, and the approved blue/navy homepage design.

## Local review
Requires Node 22.12+ or 24+.

```sh
npm ci
npm test
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

Open the URL printed by Vite. The same development server serves `/api/contact`. Without integration credentials it returns `{ready:false,siteKey:null}`; the UI gives an honest unavailable state and email fallback. This cloud workspace's forwarding relay was previously unavailable, so its localhost URL may not open in a browser outside the workspace. Use the Vercel preview when available.

## Working features
- Centralized provisional USD pricing, service explanations and quote intent selection.
- Rule-based floating FAQ guide with service advice, prices, booking and quote links. No paid AI or conversation storage.
- Complete fictional demos at `/?demo=field-fern` and `/?demo=forma-studio`, with distinct compositions and locally validated demonstration forms.
- Responsive navigation, FAQ disclosures, privacy details and accessible native form controls.
- Server inquiry implementation, validation, Turnstile, durable rate limiting and provider-confirmed email delivery, tested with mocked providers. Actual external configuration and inbox tests remain required.
- Reusable booking-provider interface with consultation inquiry fallback. A live provider account/event remains required.

## Configuration and code
- `src/config.mjs`: branding, contact email, pricing, assistant appearance/content, booking provider/duration, enabled sections and module flags.
- `src/render.mjs`, `src/features.mjs`: reusable section rendering.
- `src/html.mjs`: escaping, approved URL handling and shared icons. Rendered markup uses trusted repository config only; visitor text is never inserted as HTML.
- `src/interactions.mjs`, `src/contact-client.mjs`, `src/assistant.mjs`: browser behavior with StrictMode cleanup.
- `src/demos.mjs`: fictional theme/content compositions and complete demonstration pages.
- `api/contact.js`, `integrations/`: actual Vercel API entry and reusable provider adapters.
- `src/App.css`: approved main design plus scoped pricing, assistant and demo styles.
- `INTEGRATIONS_SETUP.md`: provider accounts, server variables, local setup, privacy and verification steps.
- `PROJECT_BLUEPRINT.md`, `AGENTS.md`: architecture and customer-generation rules.
- `TEST_RESULTS.md`: performed checks and remaining limits.

No checkout, recurring billing, payment activation, live AI, customer database or production deployment is part of this batch.

## Source and deployment safety
Original main: `d45846c20d22c574c24e67ccd1036fe5e290947e`, preserved in local `backup/production-before-digital-solutions-2026-11-16`. Affiliate-platform history remains recoverable; its checkout/marketing code is absent from the new public app. Do not merge into main or change DNS/domain/environment settings without authorization.

The existing Vercel project is `fruitfulfounderhq/affiliate-partner-directory`; GitHub owner is `FruitfulFounder`. There is no tracked `vercel.json` or `.vercel/project.json`. `vite build` writes dist; Vercel's standard Vite preset serves the static app and the Node function in `api/`. Root-query demo URLs avoid dependence on custom route rewrites. Actual dashboard overrides and provider values are not visible in this workspace.

Batch 2 explicitly authorizes pushing this development branch and allowing automatic Vercel previews. Production publishing is not authorized. Preview remains noindex. Once external providers are connected, verify actual mail and scheduling workflows before considering a production release. Final production SEO canonical/sitemap, indexing, business privacy retention decisions and approval remain release work.
