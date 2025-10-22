# GEO Footprint Audit – 9 Oct 2025

## Overview
- Introduced a reusable `TempleGeoJsonLd` helper to standardise `GeoCoordinates`, postal address, and map references sourced from `siteConfig`.
- Brought every public route (including dynamic service detail pages) up to parity with baseline temple/place structured data.
- Extended guest-house and article schemas with spatial coverage, ensuring third-party surfaces can associate lodging, guides, and services with the Panchmura location.

## Route-Level Findings
| Route | Existing GEO signals (before) | Updates applied | Follow-ups |
| --- | --- | --- | --- |
| `/` | Rich HinduTemple, OfferCatalog, Event schemas already emitted with `GeoCoordinates`. | No change needed. | Consider refreshing hero imagery sizing when image optimisation task runs. |
| `/events` | Event schema per festival with `GeoCoordinates`; missing standalone place reference. | Added `TempleGeoJsonLd` for consistent Place schema reference. | Automate festival date refresh cadence (already tracked in backlog). |
| `/services` | Metadata only; lacked structured geo + map context. | Added `TempleGeoJsonLd` for route plus continued Offer list UI. | Potential future `ItemList` schema for services (optional). |
| `/services/[slug]` | Service schema without `geo` or `serviceLocation`; provider lacked `sameAs`. | Added canonical place/provider schemas, `serviceLocation`, `mainEntityOfPage`, and route-level geo JSON-LD. | Evaluate per-service imagery alt coverage during accessibility audit. |
| `/guest-house` | LodgingBusiness schema emitted without `geo`/`areaServed`. | Added geo/map fields in `guesthouseSchemaData` and inserted LodgingBusiness-flavoured `TempleGeoJsonLd`. | Track gallery alt-text updates under accessibility backlog. |
| `/guides/guest-house-experiences` | Article schema missing spatial coverage and GE0 JSON-LD. | Added shared place schema, `spatialCoverage`, and `TempleGeoJsonLd`. | Future enhancement: author listicle schema variants as more guides launch. |
| `/plan-your-visit` | No structured data beyond breadcrumb JSON-LD. | Added `TempleGeoJsonLd` with visitor/tourism context. | Layer travel Itinerary schema when long-form guide expands. |
| `/history` | Content-only layout; no structured place data. | Added `TempleGeoJsonLd` with founding date context. | Could add `CreativeWorkSeries` schema for milestone timeline later. |
| `/search` | Search results UI without structured geo/search cues. | Added `TempleGeoJsonLd` (hours suppressed) to ground the route in NAP data. | Add SearchAction schema (tracked as low-priority backlog). |
| `/preview/about` | Preview-only route without GEO reference. | Added `TempleGeoJsonLd` (opening hours suppressed) to avoid schema gaps when the route is exposed temporarily. | Remove or authenticate preview route before production launch. |

## Shared Assets
- `src/components/seo/TempleGeoJsonLd.tsx` – emits canonical HinduTemple/LodgingBusiness schema with configurable opening hours and overrides.
- `src/data/guesthouse.ts` – LodgingBusiness schema data now includes `geo`, `areaServed`, and `hasMap`.

## Recommended Next Steps
1. Wire hreflang + language toggles once localisation copy is ready to finish GEO backlog item.
2. Coordinate with directory/outreach owners before publishing the audit summary externally.
3. Re-run Search Console URL inspection after deployment to confirm rich result eligibility for the updated routes.
