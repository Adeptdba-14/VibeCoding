# AdeptTech Consulting Ltd — Website

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Lucide icons.
Styled to **BrandGuidelines.pdf v1.0** (Navy #031C50, Teal #00C0AF, Deep teal #007A6E, Ink #2B3A5C, Mist #E9EDF4; Montserrat + Inter).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 (hot reload)
# or production mode
npm run build && npm start
```

## Tests

```bash
npm test               # unit + component tests (Vitest, jsdom)
npm run test:coverage  # same, with a v8 coverage report in coverage/ (fails under 90% lines)
npm run build && npm run test:e2e   # Playwright against the production build, desktop + mobile
npm run test:all       # lint, typecheck, coverage, build and e2e: run before deploying
```

- **Unit/component** (`src/**/*.test.ts(x)`): data integrity, enquiry validation, the API route handler,
  the contact form (validation, focus, success, server and network failures), tabs keyboard support,
  nav/mobile menu, every section and page including the async service pages and footer.
- **End-to-end** (`e2e/`): every route renders with one `h1` and no sideways scroll; axe WCAG 2.1 AA checks
  (including colour contrast, which enforces the brand's "deep teal for small text" rule); only Montserrat
  and Inter are used; every internal link resolves; unknown pages return a real 404; navigation and the
  mobile menu; a real enquiry posted through `/api/contact`; and the API's status codes.
- E2E uses the installed Google Chrome (`channel: "chrome"`), so no browser download is needed. Any console
  error on a page fails the test.

## Where to edit things

| What | File |
| --- | --- |
| Company name, address, email, phone, LinkedIn | `src/lib/site.ts` (empty fields are hidden automatically) |
| Services, platforms, offerings, coverage matrix | `src/lib/services.ts` |
| Portfolio / case studies | `src/lib/portfolio.ts` (add entries and the "typical engagements" list switches to real case studies) |
| Brand colours, fonts, utilities | `src/app/globals.css` |
| Logo / A mark (SVG) | `src/components/Logo.tsx`, favicon in `src/app/icon.svg` |
| Contact form handler | `src/app/api/contact/route.ts` (currently logs enquiries to the server console; plug in an email provider here) |

## Pages

- `/` — Home: hero, services, coverage matrix, approach, training, portfolio teaser, about/address, contact
- `/services/database-administration`, `/services/cloud-architecture`, `/services/data-engineering`, `/services/training`
- `/portfolio`
