# Building a page of tridharamandir.com

The site is the approved **Utsav** design (Kalighat-poster colours, kajal outlines, offset shadows, stickers, Anek Bangla + Big Shoulders),
built as plain static HTML/CSS/JS by a small Python script. Read this whole file before starting.

## Where things are

| | |
|---|---|
| `content/site.json` | the facts the site shows (hours, schedule, festivals, contact, payment, redirects). Single source; read through `ctx.data`. |
| `content/FACTS.md` | the only source of facts for copy. Anything not in it is a gap → write `[CONFIRM]` or a `[PLACEHOLDER IN CAPITALS]`. |
| `lib/ui.py` | shared parts: `Ctx` (links), header, footer, `top`, `page_hero`, `sec_head`, `section`, `btn`, `sticker`, `poster`, `dhara_poster`, `seva_card`, `field`, `form`, `honeypot`, `copy_value`, `note`, `tbc`, `marquee`. |
| `lib/art.py`, `lib/motifs.py`, `lib/byear.py` | SVG art ported from the design (ghot mark, suns, dhak, kash, shiuli, joba, wheel, trishul, bel, diya, feather, flute, handi, bunting, posters, dhara art, route map). `art.board_files()` cuts art into desktop + phone files. |
| `pages/<key>.py` | one module per page: `PAGE = dict(...)` and `render(ctx)`. `pages/home.py` is the finished reference: copy its patterns. |
| `src/css/*.css` | concatenated in name order into `assets/site.css`. 00–40 and 95 are shared. Pages add their own `5N-<key>.css`. |
| `src/js/*.js` | concatenated into `assets/site.js` after `window.TMM_DATA`. Pages add `5N-<key>.js`. Files with `test` in the name ship only to the test link. |
| `build.py` | `python3 build.py` → `dist/site` (production), `dist/staging` (the private test link) and `dist/worker-data.js` (redirects and form names for the Worker). |
| `worker/` | the Cloudflare Worker: `index.js` (redirects, `/api/form` → ZeptoMail email, headers), `test.mjs` (its checks), `local.mjs` (run it all locally). |
| `tools/shoot.py` | screenshots + checks (sideways scroll, console errors). `tools/measure_titles.py` measures Bengali headline words. |

The approved design (desktop boards at 1440 wide, phone screens and a style guide) is on the Claude Design canvas
"tridharamandir.com · final (Utsav)". The SVG art in `lib/art.py` and `lib/motifs.py` was ported from it.

## A page module

```python
from lib import ui
from lib.ui import btn, sec_head, section, tbc, field, form, copy_value, photo_slot
from lib import art

PAGE = dict(key='darshan', title='Darshan and arati times', description='One or two sentences for search results (about 150 characters).', tone='peacock')

def render(ctx):
    files = art.board_files('darshan-hero', defs, shapes, view=(600, 0, 840, 620), view_m=(700, 40, 700, 560))
    return (ui.page_hero(ctx, 'darshan', 'দর্শন', 'Darshan and arati', 'One sentence.', w=1.58, art_files=files, pa_w=840/1440, pt=.16)
            + section(sec_head('আজ', 'Today', aside_html, hid='today-h') + body_html, 'shola', sid='today', labelledby='today-h')
            + ...)
```

- `tone` colours the header and first band: shola · paper · haldi · sindoor · kajal · slate · abir · neel · peacock · ash.
- `page_hero(..., w=)`: `w` is the title's width in em from `python3 tools/measure_titles.py দর্শন` (use `adv`), `pt` = max(0, a − 0.81) + 0.02.
  Art is drawn on the design's 1440 × 620 board (copy the art function from `b_<page>.py`); `view` is the right-hand region the desktop file shows,
  `view_m` a tighter crop for phones. `pa_w` = view width / 1440. Extra buttons go in `extra=` (wrap them in `<div class="btns">`).
- Sections: `section(inner, tone, sid=, labelledby=)` makes a full-width band with the 1312px content column; tones shola · paper · haldi · kajal · peacock · sindoor · neel · slate. Never two of the same tone in a row.
- Headings: one `h1` (the first screen), then `sec_head()` (an `h2`) per band, `h3` inside. Bengali leads, English follows. Put `lang="bn"` on every Bengali element.
- Links: always `ctx.href('home'|'darshan'|'festivals'|'durga'|'seva'|'visit'|'about')`, with anchors like `ctx.href('festivals#kali')`. External links only to URLs in `content/site.json` (maps, YouTube, Facebook, Instagram).
- **Anchors other pages rely on**: festivals page: an element with `id="<festival id>"` for every festival in `site.json` (mahalaya, durga, lakshmi, kali, bhaiphonta, jagaddhatri, rash, poush, saraswati, shivaratri, dol, basanti, charak, boishakh, snan, rath, ulto, jhulan, janmashtami). Visit page: `id="route"`, `id="stay"`, `id="questions"`. Seva page: `id="seva-form"`.

## Look (match the design, made responsive)

- Tokens only: `var(--sindoor) --haldi --shola --kajal --neel --peacock --peacock-d --joba --slate --ash --abir --paper2 --muted --mint --sand`; fonts `var(--bn)` (Anek Bangla; display weight 800 with `font-stretch: 75%`), `var(--caps)` (Big Shoulders, uppercase, letter-spacing .06–.16em).
- Poster language: 3–4px kajal borders, hard offset shadows (`box-shadow: 8px 8px 0 var(--kajal)`), small rotations (±1.5deg) on posters, round stickers, halftone suns. Corners square.
- Existing classes to reuse before writing new CSS: `.sec .sec--* .wrap .sec-head .h2 .h3 .lede .btn .btn--haldi|shola|sindoor|tone|ghost|sm .btns .sticker .poster .dhara .rail .day .tile .seva-card .facts .fact .copyval .photo-slot .form .form__row .field .timeline .tl .stats .stat .live .caps`.
- Your CSS goes in `src/css/5N-<key>.css` and **every selector starts with your page prefix** (`.dar-` darshan, `.vis-` visit, `.fes-` festivals, `.dur-` durga, `.sev-` seva, `.abt-` about, `.nf-` 404) so pages never collide.
- Responsive: mobile first; check 360, 390, 768, 1024, 1440. Grids collapse to one column on phones; a row of cards may become a sideways `.rail` (or your own `overflow-x: auto` container with a `data-scroll` attribute). The page itself must never scroll sideways. Side gutter is `var(--gutter)` (16–64px). Body text ≥ 16px on phones, tap targets ≥ 44px. Give grid/flex children `min-width: 0`.
- Motion: only small hover lifts; respect `prefers-reduced-motion` (already global).

## Shared helpers added after the first review

- `ui.note(text, tag='span'|'p')`: a note addressed to the mandir ("the current site gives three prices"). Shown on the test link only; the production build removes it.
- `T.dayState()` returns `open`, `regular`, `late` (open late on a kirtan night: after closing, and until 5 AM after a kirtan date) and `kirtan`; `T.openText(st)`; `T.nowLine(st)`. Never print an end time for a slot.
- `T.festName(f)` adds "(date to be confirmed)"; big festivals have `short_en`. `T.behavior()` gives 'auto' under reduced motion: use it for every scroll.
- Focus ring: `outline: 3px solid var(--focus)`; `--focus` is kajal on light/yellow/red grounds and haldi on dark ones (set per band and tone). Don't hide it with your own box-shadow rings.
- Stickers: `sticker__num--3` (three digits), `--short` (আজ), `--word`, and `sticker__en--long`. `--sindoor-ink` is the red for small text on paper.
- Wide screens: first-screen art files run 200 board units past x = 1440 and the art box grows into the free margin (up to 200px) on screens wider than 1440, so nothing ends in a hard cut.
- Forms get `method="post"` automatically (no personal data in addresses if the script fails); summaries format dates and `data-format="inr"` amounts.

## Facts and placeholders

- Facts only from `content/FACTS.md` and `content/site.json`. The approved design copy in `b_<page>.py` was checked against it: reuse it, but if a line contradicts FACTS, FACTS wins.
- Write gaps as `[CONFIRM]` (after the claim) or as a placeholder in capitals: `[UPI ID]`, `[BANK DETAILS]`, `[TRUST NAME AND REGISTRATION]`, `[PHOTO]`. Every `[CAPITALS]` in visible text is turned into a yellow mark automatically; `ui.tbc()` makes one explicitly.
- The Shakta deity is **Maa Kali** (not Durga). Anna-daan prasad is **free**. No claim that the arati is live-streamed (the mandir has a YouTube channel; anything "live" is `[CONFIRM]`). No WhatsApp number exists.
- **No photographs of the temple.** The design is drawn (decided October 2026); never trace or screenshot the temple's photos. `photo_slot()` is retired and returns nothing.
- No iframes (YouTube, maps): link out. No external images or scripts. No `mailto:` forms.

## Behaviour

- Forms: build with `ui.form(ctx, 'seva-form', 'Seva request', fields_html, submit='Send request')` and `ui.field(...)`. `src/js/40-forms.js` checks them and shows the visitor a summary to send (or posts to the form service once one is set in site.json). For a radio group: `<fieldset class="..." data-required data-label="Seva"><legend>…</legend><label><input type="radio" name="seva" value="…" data-text="Anna-daan for 80 · ₹1,001"> …</label></fieldset>`. Extra summary lines: in your JS set `form.tmmExtra = () => ['Plates: 80']`.
- Live things (opening status, countdowns, "today"): in `src/js/5N-<key>.js`, inside `(function(){ var T = window.TMM; T.onPage('<key>', function(){ T.onTick(function(){ … }); }); })();`.
  Helpers: `T.now()` (India time, or the test time on the test link), `T.today()`, `T.daysTo('2026-10-16')`, `T.bn(12)` → ১২, `T.fmt(1110)` → 6:30 PM, `T.dayState()` (cur/nxt slot, open, close, tithi), `T.nowLine(st)`, `T.daysLabel(start, end)`, `T.fest(id)`, `T.nextBig()`, `T.data` (site.json subset).
  Markup hooks that already work anywhere: `data-live="line"` (status sentence), `data-live="open"`, `data-slot="i"` tiles with `data-slot-tag`, `data-days-to="YYYY-MM-DD" data-days-end=…` pills, `data-count-to="YYYY-MM-DD"` (+`data-bn`), `[data-copy]` buttons.
- Interactive parts of the design ("Play: …" on the boards) must really work: filters filter, calculators calculate, tabs switch (with `aria-pressed`/`aria-selected`, keyboard usable).

## Check before you finish

```
python3 build.py --only home,<your keys> --dist <your own folder>
python3 tools/shoot.py staging <keys> --dist <your own folder> --widths 360,390,768,1024,1440 --full --scale 0.5
python3 tools/shoot.py staging <keys> --dist <your own folder> --widths 390,1440 --at 2026-10-19T07:45   # a pretend time
```
Read every screenshot (crop long ones with PIL to see them at full size). Fix: sideways scroll, clipped or overlapping text, one-word last lines in headings,
uneven gaps, low contrast, anything that does not look like the design. The tool prints console errors and overflow; it must print none.
Do not edit shared files (lib/*, pages/home.py, build.py, tools/*, src/css/00–40 + 95, src/js/00–40 + 90 + 99, content/*). If you need a shared change, make it in your own files or describe it in your report.
