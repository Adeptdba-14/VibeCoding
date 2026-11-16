# AdeptTech Consulting Ltd — Website

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Motion · Lucide icons.
Styled to **BrandGuidelines.pdf v1.0** (Navy #031C50, Teal #00C0AF, Deep teal #007A6E, Ink #2B3A5C, Mist #E9EDF4; Montserrat + Inter).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 (hot reload)
# or production mode
npm run build && npm start
```

Both commands also work from the parent `AdeptTechnologies` folder.

> If the site shows a "Cannot find module" error after reinstalling packages, stop the dev server (Ctrl+C) and run `npm run dev` again. A dev server started while `node_modules` was being rebuilt keeps the error cached.

## Tests

```bash
npm test               # unit + component tests (Vitest, jsdom)
npm run test:coverage  # same, with a coverage report in coverage/
npm run build && npm run test:e2e   # Playwright against the production build, desktop + mobile
npm run test:all       # lint, typecheck, coverage, build and e2e: run before deploying
```

- **Unit/component** (`src/**/*.test.ts(x)`): service data integrity (four services, four engines, three clouds, full
  coverage matrix), company address, the `/api/contact` handler (200 / 400 / 422), the contact form (validation,
  service chips, successful submit, server failure), platform tabs (click and arrow keys), navigation and mobile
  menu, logo brand colours, and home sections.
- **End-to-end** (`e2e/site.spec.ts`), run in desktop (1440px) and mobile (Pixel 7) Chrome: every page returns 200
  with one visible `h1`, brand CSS and fonts load, every section becomes visible after scrolling, no sideways scroll,
  no console errors; home content and address; service card → service page → tab switch → portfolio navigation;
  a real enquiry posted through the form; the branded 404; and axe WCAG 2.1 AA checks (including colour contrast)
  on every page.
- E2E uses the installed Google Chrome (`channel: "chrome"`), so no browser download is needed. It starts its own
  production server on port 3100.

## Where to edit things

| What | File |
| --- | --- |
| Company name, address, email, phone, LinkedIn | `src/lib/site.ts` (empty fields are hidden automatically) |
| Services, platforms, offerings, coverage matrix | `src/lib/services.ts` |
| Portfolio / case studies | `src/lib/portfolio.ts` (add entries and the "in preparation" cards switch to real case studies) |
| Brand colours, fonts, utilities | `src/app/globals.css` |
| Logo / A mark (SVG) | `src/components/Logo.tsx`, favicon in `src/app/icon.svg` |
| Contact form handler | `src/app/api/contact/route.ts` (currently logs enquiries to the server console; plug in an email provider here) |

## Pages

- `/` — Home: hero, services, coverage matrix, approach, training, portfolio teaser, about/address, contact
- `/services/database-administration`, `/services/cloud-architecture`, `/services/data-engineering`, `/services/training`
- `/portfolio`
