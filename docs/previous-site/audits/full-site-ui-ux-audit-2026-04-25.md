# Full Site UI/UX Audit - 2026-04-25

## Scope

Audited the live production site at `https://tridharamandir.com` on 2026-04-25. The requested `ttridharamandir.com` host does not resolve.

Coverage included the 23 URLs in `https://tridharamandir.com/sitemap.xml` plus two public app routes that are not in the sitemap: `/volunteer` and `/preview/about`.

Checks performed:

- Desktop and mobile visual review across 26 public routes.
- Live crawl for HTTP status, titles, descriptions, canonicals, headings, images, forms, and internal links.
- Internal link and anchor validation.
- Axe accessibility pass across all routes.
- Lighthouse mobile audit on the homepage.
- Code-level review of routed pages and shared UI components.

## Executive Summary

The site has a strong foundation: all audited routes return 200, the visual system is coherent, the core navigation covers most visitor tasks, the homepage Lighthouse performance score is good, and there are no broken internal links.

## Branch Update

This branch addresses the highest-confidence fixes from the audit: 2026 event/date consistency, `/why-visit` mobile overflow, `/faqs` canonical metadata, `/preview/about` noindex handling, sitemap conflicts, contrast token adjustment, gallery role cleanup, FAQ accessible names, the bad FAQ jump link, duplicate event select copy, and stale guest-house placeholder text.

Remaining follow-up items are larger product decisions: real newsletter and guest-house submission flows, shorter metadata titles across long-tail pages, gallery payload reduction, and richer page-specific visual modules on high-intent inner pages.

The issues worth fixing first are not cosmetic. They affect trust, mobile usability, accessibility, and search hygiene:

1. `/events` is presenting 2025 festivals as "Upcoming Events" on 2026-04-25.
2. `/why-visit` has a 390px mobile horizontal overflow caused by the comparison table section, pushing the fixed header and menu off the normal viewport.
3. `/faqs` has the wrong canonical URL because its layout metadata does not override the root canonical.
4. `/preview/about` is publicly reachable in production and explicitly says it should be removed or protected.
5. Gallery pages have an accessibility role error and large image payloads, especially `/gallery/deities`.
6. Several conversion forms look actionable but use weak or missing submission handling.
7. Page titles are frequently too long or duplicate the site name.

## What Is Working

- All 26 audited routes returned HTTP 200.
- No broken internal links were found across 1,388 internal link instances.
- Every audited route has exactly one `h1`.
- Image `alt` coverage is mostly solid.
- Homepage Lighthouse mobile scores: Performance 92, Accessibility 96, Best Practices 100, SEO 85.
- Homepage Core Web Vitals lab snapshot: FCP 1.5s, LCP 3.2s, TBT 20ms, CLS 0.
- The site has a clear devotional/heritage identity and a consistent route structure for visitors, seva, stays, services, events, and guides.

## Priority Findings

### P0 - Correct Outdated Event Dates

`/events` and the event registration form use dates from 2025:

- Rath Yatra: 2025-06-27 to 2025-06-29
- Janmashtami: 2025-08-26 to 2025-08-27

As of 2026-04-25, both are past events. This directly conflicts with the page headline "Upcoming Events at Tridhara". The standalone festival guide pages already use 2026 dates, so production content is inconsistent.

Recommended fix:

- Update `src/data/events.ts` to current confirmed 2026 event dates.
- Make `/events` derive from the same event source as `/festivals/janmashtami` and `/festivals/rath-yatra`.
- Hide registration or label events as archived when dates are in the past.

### P0 - Fix `/why-visit` Mobile Overflow

At a 390px mobile viewport, `/why-visit` has `scrollWidth: 540px`, creating 150px of horizontal overflow. The comparison table later on the page expands the document width and pushes the fixed header/menu to the right.

Observed offender:

- `app/why-visit/page.tsx`
- Section: "How Tridhara Compares to Other Bengal Temples"
- Table wrapper: `mt-12 overflow-x-auto`
- Table: `w-full border-collapse text-left`

Recommended fix:

- Constrain the table wrapper with `max-w-full`.
- Put the wide table inside a contained scroll region, for example `overflow-x-auto max-w-full`.
- Give the table a deliberate minimum width, such as `min-w-[720px]`, instead of allowing the parent to widen the page.
- Add `min-w-0` to intermediate containers where needed.

### P1 - Fix Canonical and Sitemap Hygiene

Issues found:

- `/faqs` canonicalizes to `https://tridharamandir.com` instead of `/faqs`.
- `/preview/about` canonicalizes to the homepage.
- `/search` is `noindex` but appears in the sitemap.
- `/volunteer` is indexable but missing from the sitemap.
- `app/sitemap.ts` sets `lastModified: new Date().toISOString()` for every route on every request, making all pages appear freshly modified.

Recommended fix:

- Add `alternates: { canonical: "/faqs" }` in `app/faqs/layout.tsx`.
- Remove `/search` from the sitemap or make it indexable; do not do both.
- Add `/volunteer` to the sitemap if it should be public.
- Protect, remove, or `noindex` `/preview/about`.
- Replace dynamic `lastModified` values with real content update dates.

### P1 - Remove or Protect `/preview/about`

`/preview/about` is publicly accessible and contains the text "remove or protect before going live." It should not be indexed or discoverable in production.

Recommended fix:

- Delete the route if no longer needed.
- Or protect it behind an environment check.
- Or add `robots: { index: false, follow: false }` and remove schema/canonical inheritance.

### P1 - Accessibility Issues

Axe found these recurring issues:

- Color contrast: `text-brand-secondary` (`#A96842`) on `brand-light` (`#F5EEE7`) is about 3.84:1 for small uppercase eyebrow text. WCAG AA expects 4.5:1 for normal text.
- Gallery pages: `role="list"` is applied to a grid whose direct children are buttons, not `role="listitem"` elements.
- FAQ page: service-specific icon-only links have no accessible name.
- FAQ table-of-contents link `#what-are-the-temple-timings` points to a missing target.
- `yarn lint` also reports two warnings in `app/faqs/page.tsx`: `allFAQs` is rebuilt every render and should be wrapped in `useMemo`.

Recommended fix:

- Darken `brand.secondary` for text use or create a separate accessible eyebrow token.
- Remove `role="list"` from `GalleryGrid` or wrap each button in an element with `role="listitem"`.
- Add `aria-label` to the icon-only FAQ service links.
- Ensure generated FAQ TOC IDs match rendered FAQ IDs.

### P1 - Improve Conversion Form Reliability

Forms that need review:

- Footer newsletter form has no `action` or `onSubmit`, so it appears functional but does not complete a meaningful signup.
- `CtaSection` has the same issue, although it does not appear to be currently mounted.
- Guest-house booking uses `mailto:info@tridharamandir.com`, which depends on the visitor having a configured mail client and is unreliable on many mobile devices.
- Guest-house date placeholder still says `12-15 Aug 2025`.
- Event registration select renders "Select an event" twice.

Recommended fix:

- Route newsletter and guest-house enquiries through API endpoints, or remove the forms and use clear email/phone CTAs.
- Replace stale date placeholders with current examples.
- Remove duplicate empty event option.

### P2 - Tighten Page Titles and Metadata

Long or duplicated titles were found on gallery, guest-house, services, volunteer, and guide pages. Several titles include `Tridhara Milan Mandir` manually and then receive the root title template again, producing duplicate brand text.

Examples:

- `/gallery`: 93 characters.
- `/services`: 103 characters.
- `/guest-house`: 89 characters.
- `/volunteer`: 93 characters.
- `/guides/guest-house-experiences`: 107 characters.

Recommended fix:

- For templated metadata, set page titles without the brand suffix.
- Use `title.absolute` only when the full title is intentional.
- Aim for concise titles with one primary keyword and one place signal.

### P2 - Reduce Gallery Payload and Improve Browsing UX

Gallery route payloads are much heavier than content pages:

- `/gallery/deities`: about 3.4 MB transferred.
- `/gallery/festivals`: about 2.65 MB transferred.
- `/gallery`: about 2.0 MB transferred.
- Most content pages are about 330-530 KB.

The gallery currently eagerly loads the first 8 images per grid. That is reasonable for a small grid, but the category pages still become the heaviest routes.

Recommended fix:

- Eager-load only the first 2-4 images on mobile.
- Consider responsive eager count based on viewport or server-rendered priority.
- Add stronger category-specific `h1` text on category pages instead of repeating "Panchmura Radha Krishna Temple Photos" everywhere.
- Add visible image captions or category context without requiring hover; hover-only overlays are weak on touch devices.

### P2 - Strengthen Visual Differentiation Across Inner Pages

The brand system is consistent, but many inner pages open with the same dark hero pattern and text-card rhythm. This makes pages feel credible but repetitive.

Recommended direction:

- Use page-specific media or structured visual elements on high-intent pages: `/plan-your-visit`, `/guest-house`, `/services/darshan-and-timings`, `/services/bhog-and-prasad`, and festival pages.
- Turn travel/service pages into task-oriented layouts: schedule cards, map/distance modules, booking steps, availability, and primary contact actions.
- Keep long article pages as readable editorial content, but add scannable summary blocks above the fold.

## Page-by-Page Notes

| Page | Status |
| --- | --- |
| `/` | Strong first impression. Good Lighthouse score. Contrast issue on lower homepage eyebrow labels. |
| `/about-us` | Clear story page. Minor contrast issue. Decorative empty alts are acceptable if intentional. |
| `/why-visit` | High-value page, but mobile overflow is a release-blocking UX issue. |
| `/gallery` | Good asset library, but heavy and category UX is repetitive. |
| `/gallery/*` | Category pages work, but repeat the same hero `h1` and carry the gallery ARIA issue. |
| `/history` | Clean and accessible. Mostly text-driven; could benefit from stronger timeline affordance. |
| `/guest-house` | Strong commercial intent. Replace `mailto:` booking form and update stale date placeholder. |
| `/services` | Clean hub, but light at 147 words and needs stronger CTAs into service flows. |
| `/services/*` | Mostly accessible and coherent. Visual treatment is inconsistent: donation/marriage get imagery, darshan/bhog are text-only. |
| `/events` | Needs immediate date/content correction; currently shows 2025 events as upcoming. |
| `/plan-your-visit` | Useful and task-oriented. Could add stronger map/directions affordance above the fold. |
| `/faqs` | Useful search/filter UX, but canonical, accessible names, contrast, and one bad anchor need fixes. |
| `/search` | Works, but it is `noindex` while listed in the sitemap. |
| `/guides/*` | Good SEO/editorial structure. Add more visual route/timing summaries for scanning. |
| `/festivals/*` | Good 2026 detail pages, but inconsistent with `/events` source data. |
| `/volunteer` | Useful page but missing from sitemap/navigation; uses `container-custom`, which is not defined in the current Tailwind config. |
| `/preview/about` | Should not be public in production. |

## Recommended Fix Order

1. Update 2026 event data and registration options.
2. Fix `/why-visit` mobile overflow.
3. Add `/faqs` canonical, remove/protect `/preview/about`, and clean sitemap conflicts.
4. Fix the accessibility issues: contrast token, gallery list role, FAQ icon-link names, bad FAQ anchor.
5. Replace newsletter and guest-house `mailto:` forms with real submission flows or clear contact CTAs.
6. Shorten metadata titles and remove duplicated brand suffixes.
7. Reduce gallery eager image load and improve touch-friendly image captions.
8. Add page-specific visual modules to high-intent inner pages.
