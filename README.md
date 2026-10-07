# tridharamandir.com

The website of Tridhara Milan Mandir, Panchmura: the **Utsav** design, built as a fast static site (Bengali first,
English alongside) whose homepage changes for the six big festivals. It runs on a Cloudflare Worker that also sends the
website's forms to the mandir by email.

| Page | Address |
|---|---|
| Home (festival mode, today at the mandir, the three dharas, festivals, seva, visit, story) | `/` |
| Darshan and arati times (live: what's on now and next) | `/darshan/` |
| Festival calendar, Ashwin 1433 → Bhadra 1434 (filter by dhara) | `/festivals/` |
| Durga Puja 2026 (live during the Puja) | `/durga-puja/` |
| Seva (plate calculator, seva request, rituals and ceremonies, volunteering, how to pay) | `/seva/` (`#rituals`, `#volunteer`) |
| Visit (route, guest house and booking enquiry, experiences, Panchmura, questions) | `/visit/` |
| About (journey, dharas, architecture, the work, people) | `/about/` |
| Page not found | any other address |

## How the live site runs

- **Cloudflare Worker `tridharamandir`** (custom domains `tridharamandir.com` and `www.tridharamandir.com`), built from this
  repository by Cloudflare Workers Builds:
  - a push to **`main`** builds and deploys the live site (about two minutes): `yarn build:worker` (= `python3 build.py --site-only --strict`),
    then `npx wrangler deploy`;
  - a push to **any other branch** makes a preview version with its own link (`npx wrangler versions upload`). The link is in the
    build log and under Workers → tridharamandir → Deployments in the Cloudflare dashboard. Preview links are not indexed by search engines.
- **What the Worker does** (`worker/index.js`): serves `dist/site`; sends old addresses of the previous website to the new pages
  (`content/site.json` → `redirects`, 301); sends `www` to the bare domain; adds security headers; and takes every form at
  **`POST /api/form`**, checks it, and emails it to the mandir through **ZeptoMail**, with the visitor's email as reply-to.
  Forms still work in a browser where the page script does not run (the Worker answers with a thank-you page).
- **Secrets** (set on the Worker in Cloudflare, never in this repository): `ZEPTOMAIL_API_KEY`, `ZEPTOMAIL_FROM_EMAIL`,
  `ZEPTOMAIL_FROM_NAME`, `ZEPTOMAIL_TO_EMAIL` (where forms arrive; several addresses may be separated by commas).
  If sending ever fails, the visitor sees the details to email or phone in themselves, so nothing is lost silently.
- **Analytics:** Google Analytics 4 (`G-LEJ542QV0B`, the same property as before), on the live pages only.
- **Undo a release:** Cloudflare dashboard → Workers → tridharamandir → Deployments → choose an earlier version → Rollback
  (instant). Or revert the commit on `main` and push. The last version of the previous Next.js site is `4b012742`
  (deployed 13 June 2026, commit `719ec4f`).

## Changing things

Edit, push to a branch, check the preview link, then merge to `main`. Python 3.8+ is all the build needs.

| To change | Edit |
|---|---|
| Hours, daily schedule, kirtan nights | `content/site.json` → `hours`, `schedule`, `tithi_nights` |
| Festival dates (every year, before mid-August) | `content/site.json` → `festivals` (and `heroes` for the six big ones) |
| Homepage first-screen text for each big festival | `content/site.json` → `heroes` |
| Phone, email, address, social links | `content/site.json` → `contact` |
| Old addresses that should keep working | `content/site.json` → `redirects` |
| Words on a page | `pages/<page>.py` |
| Colours, spacing, type | `src/css/` |

**Every year:** the festival list runs to Janmashtami, August 2027. Add the 1434–35 dates (Durga Puja 2027 onwards) before
mid-August 2027, because Durga Puja takes over the homepage two weeks ahead. Add the year's Ekadashi, Purnima and Amavasya
dates to `tithi_nights` so "open late tonight" is right. `static/share.jpg` (the picture shown when the site is shared)
names the 2026–27 festivals: remake it with `tools/make_images.py`.

**How festival mode works:** each of the six big festivals (Durga Puja, Kali Puja, Shivaratri, Dol, Rath Yatra, Janmashtami)
takes the homepage's first screen 14 days before it starts (countdown), keeps it through its last day (the day's name: সপ্তমী,
মহাষ্টমী …) and says thank you the day after (Durga: আসছে বছর আবার হবে, শুভ বিজয়া). The rest of the year the evergreen screen,
এক ঘটে তিন ধারা, counts down to the next big festival. All times are India time, whatever the visitor's clock says.

**Facts:** the site follows the mandir's previous website (`content/CURRENT_SITE_FACTS.md`; where it contradicted itself, its
homepage won) and `content/FACTS.md`. `python3 build.py --strict` refuses to build the live site while any `[CONFIRM]` mark is left.

## Testing

```
python3 build.py             # dist/site (the live site) and dist/staging (a test copy)
node worker/test.mjs         # the Worker's checks (redirects, forms, headers), nothing is sent
node worker/local.mjs        # the whole site with its Worker on http://127.0.0.1:8788; form emails are printed, not sent
```

`yarn install` then `yarn dev` runs the same with Cloudflare's own `wrangler dev`.

**The test copy** (`dist/staging`, published as a private link) has a yellow **Test** button: pretend any date and time
("Durga Puja · Mahashtami morning", "Kali Puja night", "Saturday 9:15 PM" …) and every page behaves as if it were that moment
in India. It also shows notes for the mandir (boxes starting "For the mandir:") that never appear on the live site.
Its forms send nothing; they show the summary the mandir would receive.

`tools/shoot.py` (Playwright) screenshots and checks pages for sideways scrolling and console errors:
`python3 tools/shoot.py site home seva --widths 390,1440 --full`.

## For developers

- `build.py` (standard library only) renders `pages/*.py` with `lib/` (shell, components, SVG art ported from the design) into
  plain HTML; CSS and JS in `src/` are concatenated into `assets/site.css` and `assets/site.js`. It also writes
  `dist/worker-data.js` (redirects and the forms on the pages), which the Worker bundles. `docs/PAGES.md` explains how a page is built.
- Fonts: Anek Bangla and Big Shoulders from Google Fonts. Images are SVG drawings (no photographs, by design);
  `assets/img/share.jpg` is the sharing picture.
- Accessibility: one visible h1 per page, labelled forms, visible keyboard focus, `lang="bn"` on Bengali, a pause button on
  moving strips, reduced motion respected. Structured data (schema.org) for the mandir and its festivals.
- `wrangler.jsonc`: every request runs the Worker first (`run_worker_first`), then static files with
  `auto-trailing-slash` and the 404 page. `.github/workflows/deploy.yml` is not used for deploys (Cloudflare Workers Builds does them);
  it stops at its first step unless a `CLOUDFLARE_API_TOKEN` secret is added.

## From the previous site

The previous Next.js site is in this repository's history (last commit `719ec4f`). Its notes and strategy documents are in
`docs/previous-site/`, and its photographs in `archive/previous-site-public/` (kept for a future gallery; the current
design does not use them). Its addresses redirect to the new pages, and the four old form endpoints (`/api/contact` …)
are replaced by `/api/form`.

Not in this version: a photo gallery, online payment, and visitor confirmation emails (the mandir replies to each form).
