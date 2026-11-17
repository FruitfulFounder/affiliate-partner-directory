# AvaraPath digital solutions — development integration

This branch integrates the digital solutions redesign into the original `FruitfulFounder/affiliate-partner-directory` repository. It keeps React 19, Vite 8, Tailwind 4, the dependency lockfile, and the original brand assets. No production deployment is authorized.

## Local review
Requires Node compatible with Vite 8 (22.12+ or 24+).

```sh
npm ci
npm test
npm run build
npm run dev
```

The form downloads an inquiry file; it does not send messages. Booking falls back to inquiry preparation. Chat, payments, automation, and dashboards are contracts, not live integrations. No analytics code runs in the new App; the existing dependency remains unchanged.

## Structure
- `src/App.jsx`: React host for the shared renderer, with StrictMode-safe interaction setup/cleanup.
- `src/config.mjs`: branding, service content, optional modules and composition.
- `src/render.mjs`: escaped HTML section renderer. Only trusted repository configuration may reach this renderer; never inject user-generated HTML. React mounts its output and owns the host lifecycle; the section DOM is managed by the renderer and native controls.
- `src/interactions.mjs`: inquiry validation/download, configured delivery, menu and consultation events.
- `src/App.css`: responsive design and reduced-motion rules.
- `integrations/`: guarded contact-handler factory and optional module contracts.
- `public/images/brand/`: original unmodified logos. Header uses avarapath-header-logo.png; favicon uses avarapath-icon-only.png.
- `scripts/new-client.mjs`: source scaffolding for a separate customer. See the blueprint for distinct branding and layouts.

## Preservation and Vercel
Original main: `d45846c20d22c574c24e67ccd1036fe5e290947e` (Launch AvaraPath membership checkout).
Local backup: `backup/production-before-digital-solutions-2026-11-16` at that exact commit.
Development: `dev/digital-solutions`.

The original main commit has a successful `Vercel` GitHub status linking to project `fruitfulfounderhq/affiliate-partner-directory`. Repository homepage: https://affiliate-partner-directory.vercel.app. There is no tracked vercel.json or .vercel/project.json. Vite plugins are React and Tailwind; existing build is `vite build`, output defaults to dist. Actual Vercel dashboard build overrides, root directory, production branch, domain mappings, and environment variables have not been verified. No production credentials were accessed or changed.

Branches remain local because pushing new branches/commits to the connected repository may automatically trigger Vercel deployments. Before publishing branches or opening a PR, confirm automatic deployments are disabled for them in Vercel. No push, merge or deploy has been performed. The backup preserves source history, not a snapshot of Vercel environment values or databases.

## Release preparation — separate authorization required
1. Review source/design and complete real-browser desktop/mobile/keyboard checks.
2. Configure inquiry endpoint, server delivery/CRM provider, origin checks, durable rate limiting and server spam verification. The handler is an adapter, not an installed Vercel API route. Wire a real serverless route and challenge tokens as required by the provider; test success/failure end to end. Add provider-specific privacy, retention and deletion details.
3. Connect a business-owned scheduler URL and verify availability/timezones/notifications. Other modules remain disabled until implemented and tested. Do not activate new payment links without authorization.
4. Keep original assets, Vite configuration, hosting settings, DNS and environment values intact. Preview is noindex; production requires approved canonical/sitemap and indexing changes.
5. After separate authorization, push branches with preview deployments suppressed, review, and merge via the existing release process. Never use a force push to main.
