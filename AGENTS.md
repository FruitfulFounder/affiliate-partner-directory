# Agent instructions

- Read PROJECT_BLUEPRINT.md and README.md before modifying this project.
- Preserve customer assets, DNS, deployment settings, environment files, databases, and original Git history. Never commit secrets.
- No production deployment, purchases, new payment activation, or customer charges without explicit authorization.
- No old affiliate membership marketing or checkout links on public pages.
- Keep business content in src/config.mjs, reusable markup in src/render.mjs, interactions in src/interactions.mjs and server adapters in integrations/. Escape text. Allow only verified HTTPS integration URLs.
- Standardize technology, never client appearance. New clients need a distinct design brief, content, assets, composition and styling. Use scripts/new-client.mjs with a new destination and follow the blueprint.
- Prefer native HTML and dependency-free code. Every interactive control must have a label, visible focus state, keyboard access and honest success/failure states. Preserve mobile rules and reduced-motion support.
- Do not represent concepts as customer projects or unconfigured integrations as working. Do not fabricate testimonials, prices or results.
- Validate public inquiries server-side, verify spam, enforce durable rate limiting, bound request sizes, and keep recipients/secrets server-side. Browser success must follow a confirmed provider response.
- Required checks after functional changes: npm test, npm run build, node --check src/interactions.mjs. Test relevant error paths, not only success. Rendered changes require browser review at 375px, 768px, and desktop when supported. Report inability to perform browser testing.
- Keep the review build noindex. Production indexing requires release preparation and an approved domain. Never deploy as a side effect of a test or build.

- This repository uses React/Vite. Preserve the existing Vite plugins and lockfile; do not replace it with a separate static build project.
- Batch 2 authorizes pushing dev/digital-solutions and automatic Vercel preview generation. Preserve main and the backup branch; never merge or deploy production without separate authorization.

- Batch 2 pricing is explicitly approved as provisional starting prices; keep it centralized in src/config.mjs. Do not add checkout or recurring billing.
- Read INTEGRATIONS_SETUP.md for server setup. Inquiry success must follow actual provider acceptance. Keep Send disabled if delivery/spam controls are not configured. No fake confirmation or download substitute.
- The FAQ guide is rule-based and must always identify itself as such. Never interpolate visitor questions as HTML.
- Demo websites are fictional. Keep their local-only forms and appointment requests clearly labeled until a real customer implementation is configured and tested.
- New customer scaffolding must include the API and blank environment example, never real .env or .vercel identity.
