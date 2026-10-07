# Design & Implementation Rules

1. **Sections use a standardized shell.** Every full-width section is wrapped with `SectionShell` so spacing, max-width, and background styling remain consistent.
2. **Typography pulls from shared tokens.** Headings, subtitles, and supporting copy use the presets in `textRules` to keep sizing and colors unified.
3. **Buttons and badges stick to variants.** Use `Button` and `Badge` components with the predefined variants instead of ad-hoc utility combinations.
4. **Containers respect the grid.** Any layout wider than a single column snaps to the `layoutRules.container` width and uses `layoutRules.gridGap` for spacing.
5. **Surfaces rely on surfaces tokens.** Frosted or elevated panels apply styles from `surfaceRules` to keep glassmorphism effects consistent.
6. **Images rely on remote-friendly patterns.** When using `next/image`, pick remote sources whitelisted in `next.config.mjs` to avoid runtime issues.
7. **Data stays decoupled from components.** Copy, cards, FAQs, and testimonials live in `src/data` so components remain presentation-only.

These rules stay in force for the build out. If a new pattern appears, extend the tokens/components first, then adopt them across the layout.
