"""Page parts shared by every page: links, header, footer, buttons, section heads, stickers, posters, forms.
Markup only; the look lives in src/css, the behaviour in src/js."""
import html as _html
import json
import re
from .art import ghot_mark, arrow, icon_menu, icon_close, icon_play

SLUGS = {'home': '', 'darshan': 'darshan', 'festivals': 'festivals', 'durga': 'durga-puja', 'seva': 'seva',
         'visit': 'visit', 'about': 'about', 'notfound': '404'}
NAV = [('darshan', 'দর্শন', 'Darshan'), ('festivals', 'উৎসব', 'Festivals'), ('seva', 'সেবা', 'Seva'),
       ('visit', 'আসুন', 'Visit'), ('about', 'আমাদের কথা', 'About')]
BN_DIGITS = '০১২৩৪৫৬৭৮৯'


class Ctx:
    """Build context. mode 'site' = production (tridharamandir.com, folder URLs); 'staging' = the private test link (flat .html files)."""

    def __init__(self, mode, data):
        self.mode = mode
        self.data = data
        self.files = {}          # extra files a page wants written: path -> str
        self.page = None         # key of the page being rendered

    @property
    def staging(self):
        return self.mode == 'staging'

    def href(self, key):
        if key.startswith(('http://', 'https://', 'mailto:', 'tel:', '#')):
            return key
        anchor = query = ''
        if '#' in key:
            key, a = key.split('#', 1)
            anchor = '#' + a
        if '?' in key:   # e.g. 'seva?seva=festival#seva-form' opens the seva form with that seva chosen
            key, q = key.split('?', 1)
            query = '?' + q
        if key not in SLUGS:
            raise KeyError(f'unknown page key {key!r}')
        slug = SLUGS[key]
        if self.staging:
            base = 'index.html' if key == 'home' else f'{slug}.html'
        else:
            base = '/' if key == 'home' else ('/404.html' if key == 'notfound' else f'/{slug}/')
        return base + query + anchor

    def url(self, key):
        """Absolute production URL (canonical links, sitemap)."""
        d = self.data['site']['domain']
        slug = SLUGS[key]
        return d + '/' if key == 'home' else (d + '/404.html' if key == 'notfound' else f'{d}/{slug}/')

    def asset(self, path):
        return path if self.staging else '/' + path

    def img(self, name):
        return self.asset('assets/img/' + name)

    def add_img(self, name, svg):
        """Register an SVG file written to assets/img/<name>; returns its URL."""
        self.files['assets/img/' + name] = svg
        return self.img(name)


# ---------------------------------------------------------------- text helpers
def esc(s):
    return _html.escape(str(s), quote=True)


def bn(n):
    return ''.join(BN_DIGITS[int(c)] if c.isdigit() else c for c in str(n))


def tbc(label='CONFIRM'):
    """A visible 'to be confirmed' mark. Writing [CONFIRM] or [UPI ID] in any copy does the same (see mark_tbc)."""
    return f'<mark class="tbc">[{label}]</mark>'


TBC_RE = re.compile(r'\[([A-Z0-9][A-Z0-9 :’\'&,.\-/()]{1,60})\]')


def mark_tbc(page_html):
    """Wrap every [CAPITALS] placeholder in visible text with <mark class="tbc">. Whole <script>/<style> blocks,
    tags and attributes, <title>, <textarea> and marks that are already wrapped are left alone."""
    out = []
    for block in re.split(r'(<script\b[\s\S]*?</script>|<style\b[\s\S]*?</style>)', page_html, flags=re.I):
        if re.match(r'<(script|style)\b', block, re.I):
            out.append(block)
            continue
        skip = 0
        for part in re.split(r'(<[^>]+>)', block):
            if part.startswith('<'):
                m = re.match(r'<(/?)(title|textarea|mark)\b', part, re.I)
                if m:
                    skip += -1 if m.group(1) else 1
                out.append(part)
            elif skip > 0 or not part:
                out.append(part)
            else:
                out.append(TBC_RE.sub(lambda mm: f'<mark class="tbc">[{mm.group(1)}]</mark>', part))
    return ''.join(out)


def note(text, tag='span'):
    """A note for the mandir, not for visitors (e.g. "the current site gives three different prices").
    Shown on the test link only; the production build removes it. Keep it plain text (marks allowed)."""
    return f'<{tag} class="tbc-note">For the mandir: {text}</{tag}>'


def ext(href):
    return href.startswith('http')


def a_attrs(href):
    return ' rel="noopener" target="_blank"' if ext(href) else ''


# ---------------------------------------------------------------- atoms
def btn(ctx, label, key, kind='kajal', arrow_=False, cls='', attrs=''):
    """kind: kajal (black, haldi text) | haldi | shola | sindoor | ghost (outline in the current colour) | tone (follows the first screen)."""
    href = ctx.href(key)
    k = f' btn--{kind}' if kind != 'kajal' else ''
    c = f' {cls}' if cls else ''
    arr = arrow(16) if arrow_ else ''
    return f'<a class="btn{k}{c}" href="{esc(href)}"{a_attrs(href)}{attrs}>{label}{arr}</a>'


def caps(text, cls=''):
    return f'<span class="caps{" " + cls if cls else ""}">{text}</span>'


def sec_head(bn_title, en, aside='', hid=None, level=2):
    i = f' id="{hid}"' if hid else ''
    a = f'<div class="sec-head__aside">{aside}</div>' if aside else ''
    return (f'<div class="sec-head"><div class="sec-head__t"><h{level} class="h2" lang="bn"{i}>{bn_title}</h{level}>'
            f'<p class="sec-head__en">{en}</p></div>{a}</div>')


def section(inner, tone='shola', cls='', sid=None, label=None, labelledby=None):
    """A full-width band. tone sets background and text colour: shola | paper | haldi | kajal | peacock | sindoor | neel | slate."""
    i = f' id="{sid}"' if sid else ''
    lab = f' aria-labelledby="{labelledby}"' if labelledby else (f' aria-label="{esc(label)}"' if label else '')
    c = f' {cls}' if cls else ''
    return f'<section class="sec sec--{tone}{c}"{i}{lab}><div class="wrap">{inner}</div></section>'


def sticker_num_class(num):
    """Numbers (Bengali or Western digits) fill the sticker; a short word (আজ, শুভ) is smaller; a long word smaller still."""
    if re.fullmatch(r'[০-৯0-9—✦–+]+', num):
        return ' sticker__num--3' if len(num) > 2 else ''
    return ' sticker__num--short' if len(num) <= 3 else ' sticker__num--word'


def sticker(num, bn_line, en_line, label=None, cls='', data=''):
    lab = f' role="img" aria-label="{esc(label)}"' if label else ''
    word = sticker_num_class(num)
    return (f'<div class="sticker{" " + cls if cls else ""}"{lab}{data}><span class="sticker__num{word}" lang="bn">{num}</span>'
            f'<span class="sticker__bn" lang="bn">{bn_line}</span><span class="sticker__en{" sticker__en--long" if len(en_line) > 12 else ""}">{en_line}</span></div>')


def marquee(items, data=''):
    """The moving strip of dates. Decorative (the same facts are on the page), so screen readers skip it; it has a pause button."""
    run = ''.join(f'<span>{t}</span><span class="marquee__star">✦</span>' for t in items)
    return (f'<div class="marquee"{data}><div class="marquee__run" lang="bn" aria-hidden="true">'
            f'<div class="marquee__grp">{run}</div><div class="marquee__grp">{run}</div></div>'
            f'<button class="marquee__btn" type="button" aria-pressed="false" data-marquee-pause>'
            f'<span class="sr-only">Pause the moving strip</span></button></div>')


def copy_value(value, kind='text', href=None, cls=''):
    """A value people may want to copy (phone, email, UPI ID): shown as selectable text, with a copy button.
    href (tel:/mailto:) is a convenience link that works on the real site."""
    v = esc(value)
    shown = f'<a class="copyval__v" href="{esc(href)}">{v}</a>' if href else f'<span class="copyval__v">{v}</span>'
    return (f'<span class="copyval{" " + cls if cls else ""}">{shown}'
            f'<button class="copyval__b" type="button" data-copy="{v}" aria-label="Copy {v}">Copy</button></span>')


def photo_slot(label, ratio='4/3', cls=''):
    """Retired (7 Oct 2026): the site stays illustrated, as agreed. Kept so old calls render nothing."""
    return ''


# ---------------------------------------------------------------- posters and cards
DHARA_LABEL = {'shaiva': 'শৈব', 'vaishnava': 'বৈষ্ণব', 'shakta': 'শাক্ত', 'all': 'সবার'}
DHARA_EN = {'shaiva': 'Shaiva', 'vaishnava': 'Vaishnava', 'shakta': 'Shakta', 'all': 'For all'}
POSTER_STYLE = {  # festival id: (art kind, bg, fg, title colour, pill bg, pill fg, rotation)
    'durga': ('durga', 'sindoor', 'shola', None, 'kajal', 'haldi', -1.4),
    'kali': ('kali', 'kajal', 'shola', '#FF5A3C', 'shola', 'kajal', .9),
    'rash': ('rash', 'neel', 'shola', None, 'shola', 'neel', -.7),
    'shivaratri': ('shiva', 'ash', 'shola', None, 'shola', 'ash', 1.1),
    'dol': ('dol', 'abir', 'shola', None, 'shola', 'abir', -.6),
    'rath': ('rath', 'haldi', 'kajal', None, 'kajal', 'haldi', -.9),
    'lakshmi': ('lakshmi', 'peacock-d', 'shola', None, 'shola', 'peacock-d', .7),
    'saraswati': ('saraswati', 'haldi', 'kajal', None, 'kajal', 'haldi', -.5),
    'janmashtami': ('janmashtami', 'neel', 'shola', None, 'shola', 'neel', .8),
}


def festival(ctx, fid):
    return next(x for x in ctx.data['festivals'] if x['id'] == fid)


def poster(ctx, fid, href_key=None):
    """A festival poster card with a live 'days to go' pill (filled by site.js)."""
    fe = festival(ctx, fid)
    art, bg, fg, title, pb, pf, rot = POSTER_STYLE[fid]
    href = ctx.href(href_key or ('durga' if fid == 'durga' else f'festivals#{fid}'))
    tvar = f' --p-title: {title};' if title else ''
    tb = ''
    return (f'<a class="poster" href="{esc(href)}" style="--p-bg: var(--{bg}); --p-fg: var(--{fg}); --p-pill-bg: var(--{pb}); --p-pill-fg: var(--{pf}); --rot: {rot}deg;{tvar}">'
            f'<span class="poster__top"><span class="poster__dh" lang="bn" title="{DHARA_EN[fe["dhara"]]}">{DHARA_LABEL[fe["dhara"]]}</span>'
            f'<span class="poster__pill" lang="bn" data-days-to="{fe["start"]}" data-days-end="{fe["end"]}" hidden></span></span>'
            f'<img class="poster__art" src="{ctx.img("poster-" + art + ".svg")}" alt="" width="203" height="196" loading="lazy" decoding="async">'
            f'<span class="poster__title" lang="bn">{fe["bn"]}</span>'
            f'<span class="poster__date" lang="bn">{fe["date_bn"]}</span>'
            f'<span class="poster__en">{fe["date_en"]} {tb}</span></a>')


def dhara_poster(ctx, kind, tone, title, en, line, offer, rot, key='darshan'):
    href = ctx.href(key)
    return (f'<a class="dhara" href="{esc(href)}" style="--d-bg: var(--{tone}); --rot: {rot}deg;">'
            f'<img class="dhara__art" src="{ctx.img("dhara-" + kind + ".svg")}" alt="" width="344" height="270" loading="lazy" decoding="async">'
            f'<span class="dhara__title" lang="bn">{title}</span><span class="dhara__en">{en}</span>'
            f'<span class="dhara__line">{line}</span><span class="dhara__offer" lang="bn">{offer}</span></a>')


def seva_card(ctx, s, key='seva'):
    return (f'<article class="seva-card" style="--accent: var(--{s["accent"]});">'
            f'<p class="seva-card__amt">{s["amount"]}</p><h3 class="seva-card__bn" lang="bn">{s["bn"]}</h3>'
            f'<p class="seva-card__en">{s["en"]}</p><p class="seva-card__desc">{s["desc"]}</p>'
            f'<div class="seva-card__cta">{btn(ctx, "Offer this seva", key, "kajal", cls="btn--sm")}</div></article>')


# ---------------------------------------------------------------- forms
def field(fid, label_bn, label_en, kind='text', name=None, required=False, placeholder='', autocomplete=None,
          options=None, rows=3, hint=None, cls='', value='', attrs=''):
    """A labelled form control. kind: text | email | tel | number | date | textarea | select."""
    name = name or fid
    req = ' required' if required else ''
    ph = f' placeholder="{esc(placeholder)}"' if placeholder else ''
    ac = f' autocomplete="{autocomplete}"' if autocomplete else ''
    dh = f' aria-describedby="{fid}-hint"' if hint else ''
    if kind == 'textarea':
        ctl = f'<textarea class="field__c" id="{fid}" name="{name}" rows="{rows}"{req}{ph}{dh}{attrs}>{esc(value)}</textarea>'
    elif kind == 'select':
        opts = ''.join(f'<option value="{esc(v)}"{" selected" if v == value else ""}>{t}</option>' for v, t in (options or []))
        ctl = f'<select class="field__c" id="{fid}" name="{name}"{req}{dh}{attrs}>{opts}</select>'
    else:
        vv = f' value="{esc(value)}"' if value else ''
        ctl = f'<input class="field__c" id="{fid}" name="{name}" type="{kind}"{req}{ph}{ac}{dh}{vv}{attrs}>'
    star = '<span class="field__req" aria-hidden="true">*</span>' if required else ''
    h = f'<span class="field__hint" id="{fid}-hint">{hint}</span>' if hint else ''
    return (f'<div class="field{" " + cls if cls else ""}"><label class="field__l" for="{fid}"><span class="field__bn" lang="bn">{label_bn}</span>'
            f'<span class="field__en">{label_en}</span>{star}</label>{ctl}{h}</div>')


def times(s):
    """English times in the site's one style, as in '12:30–2 PM': no ':00', and a range joined by an en dash without spaces,
    kept on one line (a no-break space before AM/PM, a word joiner after the dash).
    'Mon–Fri 5:00 AM – 9:00 PM' -> 'Mon–Fri 5 AM–9 PM'; 'Seva desk 8 AM – 6 PM' -> 'Seva desk 8 AM–6 PM'.
    Used on running text and on what comes from content/site.json (hours, seva desk, payment); dates and Bengali numerals are left alone."""
    s = re.sub(r'\b([0-9]{1,2}):00(?=\s?[AP]M\b)', r'\1', s)

    def rng(m):
        a, ap, b, bp = m.groups()
        return a + ('\N{NO-BREAK SPACE}' + ap if ap else '') + '–\N{WORD JOINER}' + b + '\N{NO-BREAK SPACE}' + bp
    return re.sub(r'\b([0-9]{1,2}(?::[0-9]{2})?)(?:\s?([AP]M))?\s*[–-]\s*([0-9]{1,2}(?::[0-9]{2})?)\s?([AP]M)\b', rng, s)


def honeypot(fid):
    """A field people never see or fill; form robots usually do, and the server ignores what they send.
    Also carries the form's name, so the Worker can still send a form that was posted without JavaScript."""
    return (f'<div class="hp" aria-hidden="true"><label for="{fid}-hp">Leave this empty</label>'
            f'<input id="{fid}-hp" name="_hp" type="text" tabindex="-1" autocomplete="off">'
            f'<input type="hidden" name="_form" value="{fid}"></div>')


def form_attrs(fid, subject, sent=None, sent_note=None):
    """The attributes every form handled by site.js carries. No novalidate here: site.js switches the browser's own
    checks off when it runs (it shows its own messages), so without the script the browser still stops an empty form.
    sent = the thank-you heading once the form has gone (default: 'Thank you. Your message has gone to the mandir.');
    sent_note = the line under it ('' for none; default: the seva desk's hours)."""
    out = f' id="{fid}" data-form="{fid}" data-subject="{esc(subject)}"'
    if sent is not None:
        out += f' data-sent="{esc(sent)}"'
    if sent_note is not None:
        out += f' data-sent-note="{esc(sent_note)}"'
    return out


def form(ctx, fid, subject, inner, submit='Send', cls='', sent=None, sent_note=None):
    """A form handled by site.js: it checks the fields, then either sends them to the form service in site.json
    (forms.endpoint) or shows the visitor a summary to send to the mandir by email or phone."""
    return (f'<form class="form{" " + cls if cls else ""}"{form_attrs(fid, subject, sent, sent_note)}>{inner}{honeypot(fid)}'
            f'<div class="form__foot"><button class="btn btn--sindoor form__submit" type="submit">{submit}</button></div>'
            f'<div class="form-result" data-form-result hidden tabindex="-1"></div></form>')


# ---------------------------------------------------------------- header, menu, footer
def header(ctx, current):
    items = ''
    for key, b, e in NAV:
        cur = ' aria-current="page"' if key == current or (key == 'festivals' and current == 'durga') else ''
        items += (f'<li><a class="nav__a" href="{ctx.href(key)}"{cur}><span class="nav__bn" lang="bn">{b}</span>'
                  f'<span class="nav__en">{e}</span></a></li>')
    return (f'<header class="site-header"><div class="site-header__in">'
            f'<a class="logo" href="{ctx.href("home")}" aria-label="Tridhara Milan Mandir, home">{ghot_mark("ghot logo__mark")}'
            f'<span class="logo__t"><span class="logo__bn" lang="bn">ত্রিধারা মিলন মন্দির</span><span class="logo__short" lang="bn" aria-hidden="true">ত্রিধারা</span>'
            f'<span class="logo__en">Tridhara Milan Mandir · Panchmura</span></span></a>'
            f'<nav class="nav" aria-label="Main"><ul class="nav__list">{items}</ul>'
            f'<a class="btn btn--sm hdr-cta" href="{ctx.href("seva")}">Offer seva</a>'
            f'<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-open>{icon_menu()}<span class="sr-only">Menu</span></button>'
            f'</nav></div></header>')


def menu(ctx, current):
    c = ctx.data['contact']
    items = ''
    for key, b, e in [('home', 'প্রথম পাতা', 'Home')] + NAV + [('durga', 'দুর্গাপূজা ২০২৬', 'Durga Puja 2026')]:
        cur = ' aria-current="page"' if key == current else ''
        items += f'<li><a class="menu__a" href="{ctx.href(key)}"{cur}><span class="menu__bn" lang="bn">{b}</span><span class="menu__en">{e}</span></a></li>'
    return (f'<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>'
            f'<div class="menu__top"><a class="logo" href="{ctx.href("home")}" aria-label="Tridhara Milan Mandir, home">{ghot_mark("ghot logo__mark")}'
            f'<span class="logo__t"><span class="logo__bn" lang="bn">ত্রিধারা মিলন মন্দির</span><span class="logo__en">Tridhara Milan Mandir · Panchmura</span></span></a>'
            f'<button class="menu__close" type="button" data-menu-close>{icon_close()}<span class="sr-only">Close menu</span></button></div>'
            f'<nav aria-label="Menu"><ul class="menu__list">{items}</ul></nav>'
            f'<div class="menu__foot">{btn(ctx, "Offer seva", "seva", "haldi")}'
            f'<p class="menu__info">Darshan {times(ctx.data["hours"]["lines"][0])} · {times(ctx.data["hours"]["lines"][1])}</p>'
            f'<p class="menu__info">{copy_value(c["phone"], href="tel:" + c["phone_e164"])}</p>'
            f'<p class="menu__info">{copy_value(c["email"], href="mailto:" + c["email"])}</p></div></div>')


def top(inner, cls=''):
    """The coloured first band of a page, under the header (which floats over it). Its colours come from the
    page's tone (data-tone on .page, or on <html> for the homepage, set by the first-screen script)."""
    return f'<div class="top{" " + cls if cls else ""}"><div class="top__in">{inner}</div></div>'


def footer(ctx):
    c = ctx.data['contact']
    s = ctx.data['site']
    stripe = ''.join(f'<span style="background: var(--{k});"></span>' for k in ('sindoor', 'haldi', 'neel', 'peacock', 'ash', 'abir', 'kajal'))

    def col(hb, he, body):
        return (f'<div class="foot__col"><p class="foot__h"><span lang="bn">{hb}</span><span class="foot__he">{he}</span></p>'
                f'<div class="foot__b">{body}</div></div>')
    addr = '<br>'.join(c['address_lines'])
    social = ''.join(f'<a href="{u}" rel="noopener" target="_blank">{n}</a>' for n, u in c['social'])
    return f'''<footer class="foot" data-tone="kajal">
<div class="foot__stripe" aria-hidden="true">{stripe}</div>
<div class="foot__in">
<div class="foot__top">
<div class="foot__brand">{ghot_mark("ghot foot__mark")}<div><p class="foot__name" lang="bn">{s["name_bn"]}</p><p class="foot__tag">{s["tagline_en"]}</p></div></div>
{btn(ctx, "Offer seva", "seva", "haldi")}
</div>
<div class="foot__cols">
{col("আসুন", "Visit", f'<span>{addr}</span><a href="{c["map_url"]}" rel="noopener" target="_blank" class="u">Open in Google Maps</a><a href="{ctx.href("visit")}" class="u">How to get here</a>')}
{col("দর্শন", "Darshan", f'<span>{times(ctx.data["hours"]["lines"][0])}</span><span>{times(ctx.data["hours"]["lines"][1])}</span><span>Tridhara Sandhya Arati 6:30 PM</span><a href="{ctx.href("darshan")}" class="u">Today at the mandir</a>')}
{col("যোগাযোগ", "Contact", copy_value(c["phone"], href="tel:" + c["phone_e164"]) + copy_value(c["email"], href="mailto:" + c["email"]) + f'<span>{times(c["seva_desk"])}</span>')}
{col("সঙ্গে থাকুন", "Follow", social)}
</div>
<nav class="foot__nav" aria-label="All pages">{''.join(f'<a href="{ctx.href(k)}">{e}</a>' for k, e in (('home', 'Home'), ('darshan', 'Darshan'), ('festivals', 'Festivals'), ('durga', 'Durga Puja 2026'), ('seva', 'Seva'), ('visit', 'Visit'), ('about', 'About')))}</nav>
<div class="foot__base"><span>© {s["year"]} {s["name_en"]}, {s["place_en"]}{(" · " + s["trust_line"]) if s["trust_line"] else ""}</span><span lang="bn" class="foot__sig">{s["signature_bn"]}</span></div>
</div></footer>'''


def json_ld(obj):
    return f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>'


def page_hero(ctx, key, title_bn, title_en, sub, w, art_files=None, pa_w=.5, extra='', sticker_html='', pt=.1, sr_en='', ph_max=200):
    """Inner-page first screen: big Bengali title (one line), English title, a sentence, optional buttons (extra),
    and art on the right (art_files from art.board_files('<key>-hero', ...); pa_w = the art's share of 1440 px).
    w = the title's width in em (python3 tools/measure_titles.py WORD), pt = how far its letters rise above the line, in em."""
    pic = ''
    if art_files:
        names = sorted(art_files)
        for n, svg in art_files.items():
            ctx.add_img(n, svg)
        desk = next(n for n in names if not n.endswith('-m.svg'))
        mob = next((n for n in names if n.endswith('-m.svg')), desk)
        import re as _re
        m = _re.search(r'width="([\d.]+)" height="([\d.]+)"', art_files[desk])
        wh = f' width="{m.group(1)}" height="{m.group(2)}"' if m else ''
        pic = (f'<picture class="phero__art"><source media="(max-width: 899px)" srcset="{ctx.img(mob)}">'
               f'<img src="{ctx.img(desk)}" alt=""{wh} decoding="async" fetchpriority="high"></picture>')
    sr = f'<span class="sr-only" lang="en"> · {sr_en}</span>' if sr_en else ''
    hid = f'{key}-title'
    return top(f'<section class="phero" aria-labelledby="{hid}" style="--pa-w: {pa_w};">'
               f'<div class="phero__text"><h1 class="phero__title" lang="bn" id="{hid}" style="--w: {w}; --pt: {pt}; --ph-max: {ph_max}px;">{title_bn}{sr}</h1>'
               f'<p class="phero__en">{title_en}</p><p class="phero__sub">{sub}</p>{extra}</div>{pic}{sticker_html}</section>')
