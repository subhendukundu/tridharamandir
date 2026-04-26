# Tridhara Milan Mandir Design System

## Overview

Creative North Star: a devotional heritage guide. The interface should feel like a clear temple noticeboard elevated with quiet editorial craft: warm, legible, reverent, and practical.

## Rethink Direction

The homepage now prioritizes a "plan today" mental model. The hero pairs devotional identity with immediate utility: open hours, distance, prasad timing, daily rhythm, calling, and directions. The next section branches visitors into three practical journeys: day darshan, overnight stay, and seva/donation.

This gives the site a clearer product shape: a pilgrimage planning guide with temple storytelling underneath, rather than a generic sequence of marketing sections.

## Colors

- Deep temple plum `brand.dark` `#1B0A2C`: primary dark surface, hero backgrounds, overlays.
- Maroon-brown `brand.primary` `#452937`: headings, primary actions, structured emphasis.
- Burnt terracotta `brand.secondary` `#9A5937`: accessible eyebrow text, secondary emphasis, heritage warmth.
- Brass gold `brand.accent` `#E5B76A`: donation CTA, highlights, active states.
- Warm parchment `brand.light` `#F5EEE7`: soft section backgrounds.
- Tinted neutrals lean warm rose/brown rather than pure gray.

## Typography

- Display: Playfair Display for devotional/editorial headlines.
- Body: Plus Jakarta Sans for practical information, forms, navigation, and dense visitor guidance.
- Hero-scale type is reserved for true page heroes.
- Inner cards and utility panels use tighter headings and body sizes for scanning.
- Avoid negative letter spacing; use uppercase tracking only for short labels.

## Elevation

Flat by default. Use borders and warm surface shifts before heavy shadow. Shadows should be soft, low-contrast, and reserved for cards, modals, galleries, and important action panels.

## Components

- Header: fixed dark navigation with clear mobile drawer and 44px touch targets.
- Hero: full-bleed real mandir image with an actionable planning panel; no abstract hero artwork.
- Buttons: rounded-pill CTAs using existing `Button` variants. One primary action per decision area.
- Cards: use for repeated items and framed tools only. Avoid nested card stacks.
- Visit-path cards: three high-level visitor intents, each with audience, time commitment, and one next action.
- Forms: visible labels, clear required state, helpful errors, explicit success state.
- Gallery: touch-first image browsing; hover overlays are enhancement only.
- Tables: must be contained in local horizontal scroll regions and never widen the page.

## Do's and Don'ts

- Do keep visitor-critical facts visible: date, time, place, phone, email, route, cost, and booking expectation.
- Do use real temple/campus imagery for high-intent pages where available.
- Do keep contrast WCAG AA for small text.
- Do keep mobile layouts within the viewport at 320-390px.
- Don't publish preview-only routes.
- Don't present old festivals as upcoming.
- Don't use pure black overlays when brand-dark can carry the same weight.
- Don't use side-tab card borders or generic purple/cyan gradients.
