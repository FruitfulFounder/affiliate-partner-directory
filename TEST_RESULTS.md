# Integration verification

## Repository and preservation
- GitHub read access verified; repository API reports pull/push permissions.
- Origin: https://github.com/FruitfulFounder/affiliate-partner-directory.git
- Original main and local backup/production-before-digital-solutions-2026-11-16: d45846c20d22c574c24e67ccd1036fe5e290947e.
- All development changes are on local dev/digital-solutions. Main was not changed. No branch push, PR creation, merge, Vercel configuration change, or deployment was performed.
- Original source is recoverable with `git show backup/production-before-digital-solutions-2026-11-16:src/App.jsx`.
- The existing main commit has a successful Vercel deployment status; the actual Vercel production-branch setting and current domain target require dashboard access to verify.

## Checks performed
- `npm ci --cache /workspace/work/npm-cache --no-audit --no-fund`: passed with original lockfile. The initial install failed because default npm cache path was unavailable; using a workspace cache fixed it.
- `npm test`: 9 tests passed. Local anchors, unique IDs, honest integration states, no membership checkout, text escaping, configurable composition, safe URLs, Stripe host restrictions, form validation, fail-closed server handler, origin/spam/rate checks, provider failure, oversized body, original logo references and Vite build entry.
- `npm run build`: passed, Vite 8.0.11 from the existing lockfile. JS 208.12 kB (67.00 kB gzip), CSS 15.00 kB (4.16 kB gzip).
- `node --check src/interactions.mjs`: passed.
- `git diff --check`: passed.
- Compared public/images/brand, package-lock.json, vite.config.js and src/main.jsx to main: unchanged.
- Inspected the original header logo visually; it contains the AvaraPath brand and no affiliate membership tagline.

## Verification limits
- Headless Chromium browser review now completed at 1440, 768 and 375px. Inspected full-page screenshots and refreshed hero screenshots after fixes. Verified image loading, no horizontal document overflow, no page JavaScript errors, desktop links, mobile menu open/close, expandable service explanations, and consultation selection. Additional checks verified FAQ expansion, keyboard skip link and mobile Escape, plus actual inquiry downloads at desktop/mobile. Shared desktop tools remain unavailable; screen-reader and physical-device testing remain outstanding.
- Live inquiry, scheduler, chat, payment and automation providers are not configured or tested. Server-adapter tests use mocked providers. The inquiry form remains download-only and clearly says no message is sent.
- Vercel dashboard settings, environment variables, production branch, domain mapping and automatic-preview policy were not accessed. No tracked vercel.json or .vercel/project.json exists.
- Backup is local source history, not a backup of external service data or secret values. Remote backup/development branches remain unpublished to avoid automatic Vercel deployment triggers.

## Readiness
Ready for local source/design review in the existing repository. Not ready for production release. Publishing branches requires controlling Vercel auto-deploy behavior; final release also needs browser verification and configured-provider tests.

## Development preview and visual corrections
- Vite development server launched on port 5173; Chromium loaded the actual running page successfully.
- Fixed undersized branding by framing original padded PNG in CSS; asset unchanged.
- Replaced missing diagonal-arrow glyphs with inline SVG and replaced emoji-like strip symbols.
- Stacked the tablet hero and service cards for better readability; reduced mobile illustration overlap.
- All 9 unit tests, Vite production build, interaction syntax check, and whitespace check passed after changes.
- Browser screenshots and QA scripts are in /workspace/work/visual-qa (scratch evidence; no production files).
- Attempted managed user-facing preview: sites-preview relay failed with 'relay could not open browser port 4173: timed out waiting for relay readiness'. No external preview URL is available.
- No push, deployment or modification of main.
