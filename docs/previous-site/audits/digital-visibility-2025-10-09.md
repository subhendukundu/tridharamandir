# Digital Visibility Audit – 9 Oct 2025

This audit covers three areas requested by the marketing team: (1) GA4 engagement and conversion reporting, (2) keyword rank + SERP posture, (3) FAQ crawl hygiene, and (4) competitive keyword tracking. Findings are based on code/config review and assumed marketing goals because direct access to GA4, Google Search Console (GSC), or rank trackers was not provided in the repository.

## 0. Assumptions & Data Status
- GA4: No measurement ID or client-side config is present in the repo. If GA4 is active, it is being injected via environment variables or Tag Manager outside this codebase.
- Search Console / Rank Tracking: No GSC verification artefacts, API connectors, or keyword exports exist in `docs/` or `/data`.
- FAQ Source: The canonical FAQ inventory is authored in `src/data/content.ts` and rendered via `src/components/sections/FAQSection.tsx`.
- Competitor Baseline: No formal competitor list exists; the site is positioning itself against regional temples, guest houses, and pilgrimage destinations around Panchmura/Bishnupur.

> **Immediate Action:** confirm marketing credentials for GA4 + GSC and export baseline data before modifying tagging.

---

## 1. GA4 Analysis & Recommendations

| Checkpoint | Observations | Recommended Actions | Priority |
| --- | --- | --- | --- |
| Property & stream health | No GA4 config detected; risk of untracked sessions. | Verify GA4 property ID. If absent, create web stream, add measurement ID to Next.js runtime (e.g. `NEXT_PUBLIC_GA_ID`), or deploy via GTM. Document in `.env.example`. | High |
| Conversion events | No conversion schema in code (e.g., `gtag` calls on CTA clicks). | Define key conversions (donation CTA clicks, guest-house enquiry form submit, `mailto:` interactions). Fire GA4 `event` with `event_category` & `event_label` using Next.js client components or GTM. | High |
| Engagement measurement | Scroll depth/section views not tracked. Important for long-form pages (history, guides). | Add `view_item` / `scroll` events via GTM or Intersection Observer to gauge hero vs. mid-page engagement. | Medium |
| Content grouping | No GA4 content grouping defined. | Configure GA4 page-view dimensions (`page_category` via data layer) to distinguish Home / Services / Guides / Guest House funnels. | Medium |
| GA4 reporting cadence | No Looker Studio dashboards or CSV exports in repo. | Build a GA4 Looker Studio report keyed to pilgrimage KPIs (sessions, engaged sessions, conversions, top landing pages). Schedule monthly snapshot export to `/docs/analytics/`. | Medium |

### Suggested GA4 Event Map
| Event Name | Trigger | Parameters |
| --- | --- | --- |
| `cta_click` | Primary CTA buttons (`Donate`, `Plan Visit`, `Book Stay`) | `cta_label`, `page_path`, `cta_destination` |
| `form_submit` | Guest-house enquiry form submit | `form_id`, `page_path` |
| `mailto_click` | Clicks to temple email links | `link_text`, `page_path` |
| `map_interaction` | Click to `Open Google Maps` / `Get Directions` | `link_type`, `page_path` |
| `faq_expand` | FAQ accordion open | `question`, `page_path` |

---

## 2. Rank & SERP Posture

### Current Observations
- Structured data coverage is strong (HinduTemple, OfferCatalog, Event, LodgingBusiness). This positions the site for knowledge panel + rich results once GSC detects the markup.
- Canonical tags exist for key pages, but no hreflang is implemented; this limits regional/language reach.
- No sitemap submission evidence—`app/sitemap.ts` exists, but confirm it is deployed and listed in robots.txt (`app/robots.ts`).

### Recommended Workflow
1. **Baseline Keyword Export:** Pull top GA4 / GSC queries containing `panchmura`, `tridhara`, `radha krishna temple bankura`, `guest house near bishnupur`, `anna daan seva`. Export to `/docs/analytics/keywords-YYYY-MM-DD.csv`.
2. **SERP Feature Tracking:** Use a rank tracker (Ahrefs, SEMrush, Nightwatch, or manual SERP API) to monitor:
   - Organic positions
   - Local pack / map pack presence
   - FAQ rich results
   - Sitelinks
3. **Entity Optimisation:** Ensure the Google Business Profile (GBP) categories, NAP, photos, and posts align with site messaging; schedule quarterly schema review.
4. **Sitemap & Indexing:** Confirm `https://tridharamandir.com/sitemap.xml` is submitted in GSC. Automate weekly crawl using Screaming Frog or Sitebulb to detect broken links, duplicate titles, or missing canonicals.
5. **Content Gap Analysis:** Cross-reference keyword export with services & guides; flag topics where rank >20 or impressions high but clicks low.

| Risk / Opportunity | Notes | Action Owner | Timeline |
| --- | --- | --- | --- |
| Lack of GA4/GSC data loop | Without verified properties, rank tracking cannot correlate with traffic. | Marketing Analytics | Week 1 |
| Missing hreflang | Already logged in backlog; impacts future multilingual rollout. | Dev + Content | Align with localisation |
| GBP optimisation | No GBP audit artefact available. | Local SEO Lead | Week 2 |

---

## 3. FAQ Crawl & Clean-Up

### Findings from Code Review
- Featured FAQ CTA in `FAQSection.tsx` renders a `<button>` without navigation (`Learn More`). This is non-functional and does not pass SEO or accessibility checks.
- FAQ content is entirely hard-coded in `src/data/content.ts`, making at-scale updates manual; there is no localisation or tagging.
- Schema is emitted correctly, but question copy includes punctuation inconsistencies (`?` usage) and duplicates temple logistics already covered in Plan Your Visit.
- No automated crawler or content linting process is present.

### Recommended Remediation
| Task | Details | Priority |
| --- | --- | --- |
| Replace inert CTA | Convert the `Learn More` button to `<Link>` targeting `/plan-your-visit#visitor-essentials` or other relevant anchor. | High |
| FAQ inventory spreadsheet | Export existing question/answer pairs to a shared sheet. Add columns for status, owner, last reviewed. | Medium |
| Crawl & dedupe | Use Screaming Frog’s custom extraction or ContentKing to check for duplicate questions, missing answers, or long answers (>120 words). | Medium |
| Editorial governance | Establish quarterly review of FAQ content; include translation & accessibility checks (reading level, glossary). | Medium |
| Analytics tagging | Fire `faq_expand` event when accordion opens to validate actual user interest per topic. | Medium |

---

## 4. Competitor Keyword Tracking

### Proposed Competitor Set
- Regional temples: “Rasmancha Temple Bishnupur”, “Jairambati Matri Mandir”, “Radha Gobinda Mandir Bishnupur”.
- Hospitality: “Bishnupur tourist lodge”, “Panchmura homestay”, “Terracotta guest house Bankura”.
- Experience/tour operators: “Bankura terracotta workshop tour”, “Bishnupur heritage walk”.

### Tracking Framework
1. **Build Seed List:** Combine branded + non-branded queries (temple, seva, guest house, Panchmura/Bishnupur tourism). Use GA4/GSC + manual brainstorming.
2. **Rank Monitoring:** Configure a weekly rank tracker segment per competitor cluster; include SERP feature tracking (map packs, knowledge panels, People Also Ask).
3. **Share of Voice Dashboard:** In Looker Studio, visualise (a) Top keywords, (b) Competitor visibility %, (c) Movement WoW/ MoM.
4. **Content Response Plan:** For keywords where competitors outrank Tridhara, log action items (new blog, schema enhancement, backlink outreach).
5. **Backlink Watchlist:** Track directory listings and backlink opportunities (e.g., Incredible India, Tourism Bengal, temple directories) competitors leverage.

| Deliverable | Owner | Tooling | Cadence |
| --- | --- | --- | --- |
| Competitor keyword sheet | SEO Strategist | Sheets + Ahrefs/Semrush export | Initial build + monthly update |
| Ranking dashboard | Marketing Analytics | Looker Studio + GA4 + rank tracker API | Monthly |
| SERP watch (screenshots) | Content Marketing | VisualPing / manual capture | Monthly or on movement |
| Backlink prospecting log | Outreach lead | Airtable/Sheets | Rolling |

---

## 5. Implementation Roadmap
1. **Week 1 (Foundations):**
   - Confirm GA4 and GSC access; add team members.
   - Instrument GA4 events (cta, form, map, faq) via GTM or in-app telemetry.
   - Submit sitemap in GSC; request indexing for new structured-data-heavy routes.
2. **Week 2 (Data & Content Ops):**
   - Launch rank tracker project with competitor keywords.
   - Fix FAQ CTA link + prepare FAQ inventory sheet.
   - Configure Looker Studio dashboards (GA4 overview, rank/SERP overlay).
3. **Week 3+ (Optimisation):**
   - Analyse first two weeks of GA4 data; highlight quick wins (high-exit sections, CTA performance).
   - Compare SERP movement; prioritise content updates for keywords with low CTR.
   - Begin hreflang planning aligned with localisation backlog.

### Reporting & Governance
- **Monthly:** GA4 performance deck, rank tracker export, FAQ hygiene check.
- **Quarterly:** SERP feature review, competitor repositioning, schema validation, GBP audit.
- **Ad hoc:** Festival/event launches trigger dedicated campaign tracking (UTM conventions + GA4 audiences).

---

## Next Steps
1. Share this audit with analytics and content stakeholders; agree on ownership per action item.
2. Add GA4 measurement ID and event instrumentation tasks to the engineering backlog.
3. Create `/docs/analytics/` directory for incoming reports (GA4 exports, keyword CSVs, dashboards).
4. Schedule first cross-functional review after 30 days to validate data completeness and prioritise optimisation work.
