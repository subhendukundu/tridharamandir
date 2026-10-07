"""Festival calendar: the twelve Bengali months from Ashwin 1433 to Bhadra 1434 (the year wheel on the first screen),
a filter by dhara, the next big festival (it follows the date), a note on the panjika and the festival-news sign-up.
Dates and names come from content/site.json; the month grouping, seasons, notes and art from the approved design (b_utsav.py)."""
import json
import math
import re
from datetime import date, datetime, timedelta, timezone

from lib import ui
from lib.ui import esc, btn, sec_head, section, field, DHARA_LABEL, DHARA_EN, POSTER_STYLE
from lib.art import arrow, sun, svg_doc, poster_art, SINDOOR, HALDI, SHOLA, KAJAL, PAPER2
from lib.motifs import f, shiuli, kash, dhak, wheel
from lib import byear as BY

PAGE = dict(key='festivals', title='Festival calendar 2026–27',
            description='The festival year at Tridhara Milan Mandir, Panchmura: Durga Puja, Kali Puja, Rash, Shivaratri, Dol and Rath Yatra, '
                        'month by month from Ashwin 1433 to Bhadra 1434.',
            tone='haldi')

IST = timezone(timedelta(hours=5, minutes=30))

# The twelve months as the design groups them. start = first day the month card counts as "this month" (about the
# Sankranti; Ashwin runs on to the end of Durga Puja and Kartik to Jagaddhatri Puja, as the design groups them).
# ids = festivals from content/site.json, in date order. art + panel = the picture at the foot of the card.
MONTHS = [
    dict(key='ashwin', bn='আশ্বিন', name='Ashwin', yr='১৪৩৩', en='Sep – Oct 2026', season=('শরৎ', 'Autumn'), start='2026-09-18',
         ids=['mahalaya', 'durga'], art='durga', panel='sindoor'),
    dict(key='kartik', bn='কার্তিক', name='Kartik', yr='১৪৩৩', en='Oct – Nov 2026', season=('হেমন্ত', 'Late autumn'), start='2026-10-22',
         ids=['lakshmi', 'kali', 'bhaiphonta', 'jagaddhatri']),
    dict(key='agrahayan', bn='অগ্রহায়ণ', name='Agrahayan', yr='১৪৩৩', en='Nov – Dec 2026', season=('হেমন্ত', 'Late autumn'), start='2026-11-19',
         ids=['rash'], art='rash', panel='neel'),
    dict(key='poush', bn='পৌষ', name='Poush', yr='১৪৩৩', en='Dec 2026 – Jan 2027', season=('শীত', 'Winter'), start='2026-12-17',
         ids=['poush'], art='poush', panel='peacock-d'),
    dict(key='magh', bn='মাঘ', name='Magh', yr='১৪৩৩', en='Jan – Feb 2027', season=('শীত', 'Winter'), start='2027-01-16',
         ids=['saraswati'], art='saraswati', panel='haldi'),
    dict(key='falgun', bn='ফাল্গুন', name='Falgun', yr='১৪৩৩', en='Feb – Mar 2027', season=('বসন্ত', 'Spring'), start='2027-02-14',
         ids=['shivaratri'], art='shiva', panel='ash'),
    dict(key='chaitra', bn='চৈত্র', name='Chaitra', yr='১৪৩৩', en='Mar – Apr 2027', season=('বসন্ত', 'Spring'), start='2027-03-16',
         ids=['dol', 'basanti', 'charak']),
    dict(key='boishakh', bn='বৈশাখ', name='Boishakh', yr='১৪৩৪', en='Apr – May 2027', season=('গ্রীষ্ম', 'Summer'), start='2027-04-15',
         ids=['boishakh'], art='boishakh', panel='sindoor', newyear=True),
    dict(key='joishtho', bn='জ্যৈষ্ঠ', name='Joishtho', yr='১৪৩৪', en='May – Jun 2027', season=('গ্রীষ্ম', 'Summer'), start='2027-05-16',
         ids=[], art='nitya', panel='kajal'),
    dict(key='asharh', bn='আষাঢ়', name='Asharh', yr='১৪৩৪', en='Jun – Jul 2027', season=('বর্ষা', 'Monsoon'), start='2027-06-16',
         ids=['snan', 'rath', 'ulto']),
    dict(key='srabon', bn='শ্রাবণ', name='Srabon', yr='১৪৩৪', en='Jul – Aug 2027', season=('বর্ষা', 'Monsoon'), start='2027-07-17',
         ids=['jhulan'], art='jhulan', panel='peacock-d'),
    dict(key='bhadra', bn='ভাদ্র', name='Bhadra', yr='১৪৩৪', en='Aug – Sep 2027', season=('শরৎ', 'Autumn'), start='2027-08-18', last='2027-09-17',
         ids=['janmashtami'], art='janma', panel='neel'),
]
# what the design adds to a festival (display only; dates stay those of site.json)
EXTRA = {
    'janmashtami': dict(note=('মধ্যরাতে অভিষেক ও আরতি', 'Akhanda nama sankirtan, then the midnight abhishek and arati')),
    'rath': dict(special='পঞ্চম প্রতিষ্ঠা দিবস'),                                                # English = 1st half of note_en
}
UNCONFIRMED = ' (date to be confirmed)'   # plain text: content/site.json marks the date with "confirm"
WD_BN = ['সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার', 'রবিবার']
MOON = {'full': ('পূর্ণিমা', 'Purnima'), 'new': ('অমাবস্যা', 'Amavasya')}
WHEEL_C = (1112, 414)   # the year wheel's centre on the 1440 x 720 board


# ---------------------------------------------------------------- dates
def d_(s):
    return date.fromisoformat(s)


def ranges():
    """[(from, to)] for each month card: from its start to the day before the next month starts,
    stretched to cover its own festivals' last day."""
    out = []
    for i, m in enumerate(MONTHS):
        to = m.get('last') or (d_(MONTHS[i + 1]['start']) - timedelta(days=1)).isoformat()
        out.append([m['start'], to])
    return out


def with_ends(ctx):
    r = ranges()
    for i, m in enumerate(MONTHS):
        for fid in m['ids']:
            r[i][1] = max(r[i][1], ui.festival(ctx, fid)['end'])
    return r


def build_day():
    return datetime.now(IST).date()


def month_now(rng, t):
    cur = -1
    for i, (a, b) in enumerate(rng):
        if d_(a) <= t <= d_(b):
            cur = i
    return cur


def big_now(ctx, t):
    """The big festival on now, else the next one to start, else None (as the site's JS decides it)."""
    big = [x for x in ctx.data['festivals'] if x.get('big')]
    for x in big:
        if d_(x['start']) <= t <= d_(x['end']):
            return x
    return next((x for x in big if d_(x['start']) > t), None)


def short(fe):
    return fe['en'].split(' · ')[0]


# ---------------------------------------------------------------- the first screen: the বারো মাস wheel (1440 x 720 board)
def ring_sector(cx, cy, r0, r1, a0, a1):
    def pt(r, a):
        return f(cx + r * math.cos(math.radians(a))), f(cy + r * math.sin(math.radians(a)))
    x0, y0 = pt(r1, a0)
    x1, y1 = pt(r1, a1)
    x2, y2 = pt(r0, a1)
    x3, y3 = pt(r0, a0)
    return f'M{x0},{y0} A{r1},{r1} 0 0 1 {x1},{y1} L{x2},{y2} A{r0},{r0} 0 0 0 {x3},{y3} Z'


def year_wheel(ctx, cur, R=262, hub=112):
    """The year wheel. Its colours come from CSS classes so the script can move 'this month' (is-cur) and dim dots by dhara."""
    cx, cy = WHEEL_C
    out = [f'<circle cx="{cx + 12}" cy="{cy + 12}" r="{R + 4}" fill="{KAJAL}"/>',
           f'<circle cx="{cx}" cy="{cy}" r="{R + 24}" fill="none" stroke="{KAJAL}" stroke-width="3.5" stroke-dasharray="1 13" stroke-linecap="round"/>']
    secs, labels, dots = [], [], []
    for i, m in enumerate(MONTHS):
        a0 = -105 + 30 * i
        c = ' is-cur' if i == cur else ''
        alt = ' fes-wh__s--alt' if i % 2 else ''
        secs.append(f'<path class="fes-wh__s{alt}{c}" data-m="{i}" d="{ring_sector(cx, cy, hub, R, a0, a0 + 30)}"/>')
        am = math.radians(a0 + 15)
        lx, ly = cx + 206 * math.cos(am), cy + 206 * math.sin(am)
        labels.append(f'<text class="fes-wh__l{c}" data-m="{i}" x="{f(lx)}" y="{f(ly + 10)}" text-anchor="middle">{m["bn"]}</text>')
        n = len(m['ids'])
        for k, fid in enumerate(m['ids']):
            a = math.radians(a0 + 15 + (k - (n - 1) / 2) * 6.6)
            dx, dy = cx + 152 * math.cos(a), cy + 152 * math.sin(a)
            dh = ui.festival(ctx, fid)['dhara']
            dots.append(f'<circle class="fes-wh__halo{c}" data-m="{i}" data-dh="{dh}" cx="{f(dx)}" cy="{f(dy)}" r="9.5"/>'
                        f'<circle class="fes-wh__dot fes-wh__dot--{dh}" data-dh="{dh}" cx="{f(dx)}" cy="{f(dy)}" r="7"/>')
    out += secs + labels + dots
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{KAJAL}" stroke-width="9"/>')
    for i in range(12):
        a = math.radians(-105 + 30 * i)
        out.append(f'<circle cx="{f(cx + R * math.cos(a))}" cy="{f(cy + R * math.sin(a))}" r="7" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>')
    rot = f' transform="rotate({30 * max(cur, 0)} {cx} {cy})"'
    out.append(f'<path class="fes-wh__ptr" d="M{cx - 16},{cy - hub + 4} L{cx},{cy - hub - 26} L{cx + 16},{cy - hub + 4} Z" fill="{KAJAL}"{rot}/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{hub}" fill="{KAJAL}" stroke="{KAJAL}" stroke-width="4"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{hub - 12}" fill="none" stroke="{HALDI}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>')
    out.append(f'<text class="fes-wh__hub" x="{cx}" y="{cy - 6}" text-anchor="middle" fill="{SHOLA}">বারো মাসে</text>')
    out.append(f'<text class="fes-wh__hub" x="{cx}" y="{cy + 38}" text-anchor="middle" fill="{HALDI}">তেরো পার্বণ</text>')
    return ''.join(out)


def hero_art(ctx, cur):
    """Inline (not a file) because the month names use the page's Bengali font, and the script moves 'this month'."""
    d, s = sun('fesH', WHEEL_C[0], WHEEL_C[1], 328, SINDOOR, HALDI)   # 328 (design 330): stays inside the board, no flat edge on wide screens
    sh = ''.join(shiuli(x, y, sc, r) for x, y, sc, r in ((812, 168, 1.1, 10), (870, 120, .8, 40), (1404, 140, 1.2, 20),
                                                         (1380, 640, 1, 50), (1414, 520, .8, 5), (790, 640, .9, 30)))
    return (f'<svg class="fes-wheel" viewBox="760 0 680 720" width="680" height="720" aria-hidden="true" focusable="false" data-fes-wheel>'
            f'<defs>{d}</defs>{s}{sh}{year_wheel(ctx, cur)}</svg>')


def hero_sticker(ctx, t):
    """Countdown to the next big festival. Without the script it shows that festival's date; the script in the page head
    (TMM_FES.hero) turns it into days to go, or 'today', before the page is drawn."""
    fe = big_now(ctx, t)
    if fe:
        num, b = fe['date_bn'].split(' ')[0].split('–')[0], fe['date_bn'].split(' ')[-1]
        e, lab = 'to ' + fe.get('short_en', short(fe)), f'{fe["en"]}, {fe["date_en"]}' + (' (date to be confirmed)' if fe.get('confirm') else '')
    else:
        num, b, e, lab = '✦', 'পরের উৎসব', 'dates to come', 'Dates for the next festival are coming'
    return (ui.sticker(num, b, e, label=lab, cls='fes-sticker', data=' data-fes-sticker')
            + '<script>window.TMM_FES&&TMM_FES.hero()</script>')


def first_screen(ctx, t, cur):
    sub = ('Thirteen festivals in twelve months, as the Bengali saying goes. '
           'Bring the family, book a bhog, or sign up for festival news by email.')
    art = f'<div class="fes-art">{hero_art(ctx, cur)}{hero_sticker(ctx, t)}</div>'
    h = ui.page_hero(ctx, 'festivals', 'উৎসবের পাঁজি', 'The next twelve months<br>Ashwin 1433 to <span class="nowrap">Bhadra 1434</span>', sub,
                     w=4.61, pt=.22, ph_max=164, sr_en='Festival calendar', sticker_html=art)
    out = h.replace('<div class="top">', '<div class="top fes-top">', 1)
    assert out != h, 'ui.top() markup changed: the festivals first screen needs its fes-top class'
    return out


# ---------------------------------------------------------------- the filter bar
def check_icon():
    return ('<svg class="fes-chip__ic" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
            '<path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"/></svg>')


def bell_icon():
    return ('<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
            '<path d="M10 2.5c-3 0-5 2.3-5 5.2v3.6L3.2 14.5h13.6L15 11.3V7.7c0-2.9-2-5.2-5-5.2z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>'
            '<path d="M8 16.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>')


def filter_bar(ctx):
    chips = ''
    for key, b, e in [('', 'সব', 'All')] + [(k, DHARA_LABEL[k], DHARA_EN[k]) for k in ('shaiva', 'vaishnava', 'shakta', 'all')]:
        n = sum(1 for x in ctx.data['festivals'] if not key or x['dhara'] == key)
        cls = key or 'every'
        chips += (f'<button class="fes-chip fes-chip--{cls}" type="button" aria-pressed="{"true" if not key else "false"}" data-fes-dh="{key}" '
                  f'data-n="{n}">{check_icon()}<span class="fes-chip__bn" lang="bn">{b}</span><span class="fes-chip__en">{e}</span></button>')
    label = (f'<p class="fes-filter__k" id="fes-filter-k"><span class="fes-filter__bn" lang="bn">ধারা অনুযায়ী</span>'
             f'<span class="fes-filter__en">Show by dhara</span></p>')
    scroll = f'<div class="fes-filter__scroll" data-scroll><div class="fes-chips" role="group" aria-labelledby="fes-filter-k">{chips}</div></div>'
    cta = f'<a class="btn btn--sm fes-filter__cta" href="#remind">{bell_icon()}<span class="fes-filter__get">Festival </span>news</a>'
    # hidden until the script runs: without it every festival shows and there is nothing to filter with
    return (f'<section class="fes-filter" aria-label="Filter the festivals" data-fes-filter hidden>'
            f'<div class="fes-filter__in">{label}{scroll}{cta}</div></section>')


# ---------------------------------------------------------------- month cards
def moon_icon(kind, size=18, label=True):
    fill = HALDI if kind == 'full' else KAJAL
    a = f' role="img" aria-label="{MOON[kind][1]}"' if label else ' aria-hidden="true"'
    return (f'<svg class="fes-moon" width="{size}" height="{size}" viewBox="0 0 20 20"{a} focusable="false">'
            f'<circle cx="10" cy="10" r="7.5" fill="{fill}" stroke="{KAJAL}" stroke-width="2.5"/></svg>')


def dh_chip(dh):
    return (f'<span class="fes-dh fes-dh--{dh}" title="{DHARA_EN[dh]}"><span lang="bn">{DHARA_LABEL[dh]}</span>'
            f'<span class="sr-only"> ({DHARA_EN[dh]})</span></span>')


def pill(fe):
    return f'<span class="fes-pill" lang="bn" data-days-to="{fe["start"]}" data-days-end="{fe["end"]}" hidden></span>'


def at_mandir():
    return '<span class="fes-at"><span lang="bn">মন্দিরে</span><span class="fes-at__en">At the mandir</span></span>'


def meta(fe):
    moon = moon_icon(fe['moon']) if fe.get('moon') else ''
    at = at_mandir() if fe.get('big') else ''
    return f'<p class="fes-meta">{at}{dh_chip(fe["dhara"])}{moon}{pill(fe)}</p>'


def no_year(s):
    return re.sub(r' 20\d\d', '', s)


def date_parts(fe):
    x = EXTRA.get(fe['id'], {})
    d, m = fe['date_bn'].rsplit(' ', 1)
    return x.get('d', d), x.get('m', m)


def date_tile(fe):
    d, m = date_parts(fe)
    long_ = ' fes-date--long' if len(d) > 2 else ''
    return (f'<span class="fes-date{long_}" lang="bn"><span class="fes-date__d">{d}</span>'
            f'<span class="fes-date__m">{m}</span></span>')


def fest_attrs(fe, cls):
    return (f'class="fes-fest {cls}" id="{fe["id"]}" data-fes-fest data-dhara="{fe["dhara"]}" '
            f'data-start="{fe["start"]}" data-end="{fe["end"]}"')


def fest_row(ctx, fe):
    conf = UNCONFIRMED if fe.get('confirm') else ''
    if fe['id'] == 'rath':   # the mandir's own anniversary
        sp_en = fe.get('note_en', '').split(' · ')[0] + '. Nine days, with the chariot procession and sankirtan.'
        special = (f'<p class="fes-row__sp" lang="bn">{EXTRA["rath"]["special"]}</p>'
                   f'<p class="fes-row__spen">{sp_en}</p>')
        mini = (f'<svg class="fes-row__wheel" width="52" height="52" viewBox="-112 -112 224 224" aria-hidden="true" focusable="false">'
                f'{wheel()}</svg>')
        return (f'<li {fest_attrs(fe, "fes-row fes-row--special")}>{date_tile(fe)}<div class="fes-row__t">'
                f'<h4 class="fes-row__bn" lang="bn">{fe["bn"]}</h4><p class="fes-row__en">{fe["en"]}</p>'
                f'<p class="fes-row__date">{no_year(fe["date_en"])}{conf}</p>{special}{meta(fe)}</div>{mini}</li>')
    return (f'<li {fest_attrs(fe, "fes-row")}>{date_tile(fe)}<div class="fes-row__t">'
            f'<h4 class="fes-row__bn" lang="bn">{fe["bn"]}</h4><p class="fes-row__en">{fe["en"]}</p>'
            f'<p class="fes-row__date">{no_year(fe["date_en"])}{conf}</p>{meta(fe)}</div></li>')


def feature(ctx, fe):
    x = EXTRA.get(fe['id'], {})
    d, m = date_parts(fe)
    wd = WD_BN[d_(fe['start']).weekday()]
    parts = fe['date_en'].split(' · ')
    conf = UNCONFIRMED if fe.get('confirm') else ''
    note = ''
    if x.get('note'):
        nbn, nen = x['note']
        nen = nen or (parts[1] if len(parts) > 1 else '')
        note = f'<p class="fes-feat__note"><span lang="bn">{nbn}</span><span class="fes-feat__nen">{nen}</span></p>'
    long_ = ' fes-feat__d--long' if len(d) > 2 else ''
    return (f'<div {fest_attrs(fe, "fes-feat")}>'
            f'<p class="fes-feat__day"><span class="fes-feat__d{long_}" lang="bn">{d}</span>'
            f'<span class="fes-feat__mw"><span class="fes-feat__m" lang="bn">{m}</span><span class="fes-feat__wd" lang="bn">{wd}</span></span></p>'
            f'<p class="fes-feat__date">{parts[0]}{conf}</p>'
            f'<h4 class="fes-feat__bn" lang="bn">{fe["bn"]}</h4><p class="fes-feat__en">{fe["en"]}</p>'
            f'{meta(fe)}{note}</div>')


def nitya(ctx):
    S = ctx.data['schedule']
    line = (f'{S[0]["en"]} {S[0]["time"]} {S[0]["ampm"]} · {S[3]["en"]} {S[3]["time"]} {S[3]["ampm"]} · '
            f'{S[2]["en"]} from {S[2]["time"]} {S[2]["ampm"]}')
    return (f'<div class="fes-feat fes-feat--nitya"><h4 class="fes-feat__bn" lang="bn">নিত্য পূজা</h4>'
            f'<p class="fes-feat__en">Daily worship and arati</p><p class="fes-feat__p">{line}</p>'
            f'<p class="fes-feat__p"><a class="u" href="{ctx.href("darshan")}">Darshan and arati times</a></p></div>')


# small paintings at the foot of the cards (203 x 196), ported from the design
def month_art(kind):
    if kind in ('durga', 'rash', 'shiva'):
        return poster_art(kind)
    if kind == 'saraswati':   # veena with marigolds
        frets = ''.join(f'<path d="M{x},-9 L{x},9" stroke="{KAJAL}" stroke-width="2.4"/>' for x in range(-22, 70, 13))
        flowers = ''.join(f'<g transform="translate({x},{y})">'
                          + ''.join(f'<circle cx="{f(7 * math.cos(math.radians(a)))}" cy="{f(7 * math.sin(math.radians(a)))}" r="6" fill="#F08A1C" stroke="{KAJAL}" stroke-width="2"/>' for a in range(0, 360, 60))
                          + f'<circle r="5" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="2"/></g>' for x, y in ((38, 40), (170, 150), (156, 176)))
        return (f'<circle cx="102" cy="92" r="72" fill="{SHOLA}"/>'
                f'<g transform="translate(104,104) rotate(-34)">'
                f'<circle cx="44" cy="24" r="17" fill="#C0602F" stroke="{KAJAL}" stroke-width="4"/>'
                f'<rect x="-74" y="-10" width="156" height="20" rx="10" fill="{HALDI}" stroke="{KAJAL}" stroke-width="4"/>{frets}'
                f'<path d="M-84,-3 L84,-3 M-84,3 L84,3" stroke="{KAJAL}" stroke-width="1.3"/>'
                f'<path d="M80,-2 C96,-6 102,-22 94,-32 C86,-40 74,-34 78,-24" fill="none" stroke="{KAJAL}" stroke-width="6" stroke-linecap="round"/>'
                f'<circle cx="-64" cy="2" r="34" fill="#C0602F" stroke="{KAJAL}" stroke-width="4"/>'
                f'<path d="M-88,2 C-80,-14 -48,-14 -40,2" fill="none" stroke="#7A3215" stroke-width="3"/>'
                f'<circle cx="-64" cy="12" r="5" fill="{SHOLA}"/></g>{flowers}')
    if kind == 'poush':   # Poush Sankranti: pitha by a clay handi
        pitha = ''.join(f'<path transform="translate({x},{y}) rotate({r})" d="M-22,0 C-22,-16 22,-16 22,0 C14,6 -14,6 -22,0 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
                        f'<path transform="translate({x},{y}) rotate({r})" d="M-14,-4 L-10,-9 M-4,-4 L0,-10 M6,-4 L10,-9" stroke="{KAJAL}" stroke-width="2"/>'
                        for x, y, r in ((44, 178, -8), (160, 176, 10)))
        return f'<circle cx="102" cy="88" r="72" fill="{HALDI}"/>' + BY.handi(102, 112, .78) + pitha
    if kind == 'boishakh':   # Poila Boishakh: mangal ghot with mango leaves
        leaves = ''.join(f'<path transform="translate(102,72) rotate({a})" d="M0,0 C-10,-14 -10,-40 0,-56 C10,-40 10,-14 0,0 Z" fill="#3E8E41" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
                         for a in (-64, -32, 0, 32, 64))
        return (f'<circle cx="102" cy="92" r="74" fill="{HALDI}"/>{leaves}'
                f'<path d="M66,80 C40,92 34,140 60,166 C78,184 126,184 144,166 C170,140 164,92 138,80 Z" fill="#C0602F" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
                f'<rect x="72" y="66" width="60" height="16" rx="5" fill="#A44D23" stroke="{KAJAL}" stroke-width="4"/>'
                f'<path d="M62,120 C86,128 118,128 142,120" fill="none" stroke="{SHOLA}" stroke-width="5"/>'
                + ''.join(f'<circle cx="{x}" cy="142" r="5" fill="{SHOLA}"/>' for x in (82, 102, 122)))
    if kind == 'nitya':   # the daily arati: three clay lamps
        return f'<circle cx="102" cy="96" r="74" fill="#7E1A12"/>' + BY.diya(46, 150, .62) + BY.diya(102, 128, .8) + BY.diya(158, 150, .62)
    if kind == 'jhulan':   # the swing under a full moon, garlanded with marigolds
        def mg(x, y, r=5.2):
            return (''.join(f'<circle cx="{f(x + r * math.cos(math.radians(a)))}" cy="{f(y + r * math.sin(math.radians(a)))}" r="{f(r * .82)}" fill="#F08A1C" stroke="{KAJAL}" stroke-width="1.6"/>' for a in range(0, 360, 60))
                    + f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r * .7)}" fill="{HALDI}" stroke="{KAJAL}" stroke-width="1.6"/>')
        garland = ''.join(mg(x, y) for x in (66, 140) for y in range(52, 150, 20))
        leaves = ''.join(f'<path transform="translate({x},{y}) rotate({r})" d="M0,0 C-8,-10 -8,-26 0,-34 C8,-26 8,-10 0,0 Z" fill="#3E8E41" stroke="{KAJAL}" stroke-width="2.5"/>'
                         for x, y, r in ((26, 30, -40), (110, 20, 30), (178, 22, 60)))
        return (f'<circle cx="102" cy="90" r="70" fill="{SHOLA}"/>{leaves}'
                f'<path d="M4,34 C60,18 140,14 200,26" fill="none" stroke="{KAJAL}" stroke-width="10" stroke-linecap="round"/>'
                f'<g transform="rotate(-7 102 26)"><path d="M66,30 L66,160 M140,26 L140,160" stroke="{KAJAL}" stroke-width="4"/>{garland}'
                f'<rect x="46" y="158" width="114" height="16" rx="4" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4"/>'
                f'<g transform="translate(103,150) rotate(-6) scale(.25)">{BY.flute_c(480)}</g></g>')
    if kind == 'janma':
        return (f'<circle cx="104" cy="90" r="72" fill="#F4E9C8"/><g transform="translate(130,190) rotate(16) scale(.38)">{BY.feather_c(470)}</g>'
                f'<g transform="translate(100,108) rotate(-30) scale(.36)">{BY.flute_c(480)}</g>' + BY.handi(54, 160, .36))
    return ''


def art_src(ctx, kind):
    if kind in ('durga', 'rash', 'shiva'):
        return ctx.img(f'poster-{kind}.svg')   # the same paintings as the festival posters
    return ctx.add_img(f'fes-month-{kind}.svg', svg_doc((0, 0, 203, 196), month_art(kind)))


def art_panel(ctx, kind, panel):
    return (f'<div class="fes-panel" style="--panel: var(--{panel});"><img class="fes-panel__art" src="{art_src(ctx, kind)}" alt="" '
            f'width="180" height="174" loading="lazy" decoding="async"></div>')


def card_tag(bn_, en, cls, attrs=''):
    return (f'<p class="fes-tag {cls}"{attrs}><span lang="bn">{bn_}</span><span class="fes-tag__dot" aria-hidden="true"></span>'
            f'<span class="fes-tag__en">{en}</span></p>')


def month_card(ctx, i, m, rng, cur, t):
    fests = [ui.festival(ctx, fid) for fid in m['ids']]
    a, b = rng
    state = (' is-cur' if i == cur else '') + (' is-past' if d_(b) < t else '')
    tags = card_tag('এই মাস', 'This month', 'fes-tag--cur', ' data-fes-cur' + ('' if i == cur else ' hidden'))
    if m.get('newyear'):
        tags += card_tag('নববর্ষ ১৪৩৪', 'New year', 'fes-tag--ny')
    sbn, sen = m['season']
    hid = f'm-{m["key"]}'
    head = (f'<div class="fes-month__head"><div class="fes-month__r1"><h3 class="fes-month__bn" lang="bn" id="{hid}">{m["bn"]}'
            f'<span class="sr-only" lang="en"> · {m["name"]}</span></h3><span class="fes-month__yr" lang="bn">{m["yr"]}</span></div>'
            f'<p class="fes-month__r2"><span class="fes-month__en">{m["en"]}</span>'
            f'<span class="fes-month__season"><span lang="bn">{sbn}</span><span class="fes-month__sen">{sen}</span></span></p></div>')
    if not fests:
        body = nitya(ctx)
    elif len(fests) == 1:
        body = feature(ctx, fests[0])
    else:
        body = f'<ul class="fes-rows">{"".join(fest_row(ctx, fe) for fe in fests)}</ul>'
        if 'durga' in m['ids']:
            body += f'<p class="fes-month__cta">{btn(ctx, "See the Puja days" + arrow(14), "durga", cls="btn--sm")}</p>'
    none = (f'<p class="fes-none" data-fes-none hidden><span lang="bn">এ মাসে এই ধারার কোনো পার্বণ নেই</span>'
            f'<span class="fes-none__en">Nothing this month for this stream</span></p>')
    panel = art_panel(ctx, m['art'], m['panel']) if m.get('art') else ''
    return (f'<article class="fes-month{state}" data-fes-month data-from="{a}" data-to="{b}" aria-labelledby="{hid}">'
            f'{tags}{head}<div class="fes-month__body" data-fes-body>{body}</div>{none}{panel}</article>')


def months(ctx, rng, cur, t):
    key = (f'<p class="fes-key"><span class="fes-key__i">{moon_icon("full", 20, False)}<span lang="bn">পূর্ণিমা</span><span class="fes-key__en">Purnima</span></span>'
           f'<span class="fes-key__i">{moon_icon("new", 20, False)}<span lang="bn">অমাবস্যা</span><span class="fes-key__en">Amavasya</span></span></p>'
           f'<p class="fes-key__p">Purnima and Amavasya nights: extended hours and kirtan through the night.</p>')
    cards = ''.join(month_card(ctx, i, m, rng[i], cur, t) for i, m in enumerate(MONTHS))
    head = sec_head('মাসে মাসে', '<span class="nowrap">Month by month ·</span> <span class="nowrap">Ashwin 1433 to Bhadra 1434</span>',
                    key, hid='months-h')
    scope = (f'<p class="fes-scope">The Bengali festival year, month by month. The mandir’s own big celebrations are '
             f'<span class="nowrap">marked {at_mandir()}</span></p>')
    return section(head + scope + f'<div class="fes-grid" id="months-grid">{cards}</div>', 'paper', sid='months', labelledby='months-h')


# ---------------------------------------------------------------- next up: the next big festival (follows the date)
def durga_poster_art():
    sdefs, sshape = sun('fesNx', 190, 150, 138, HALDI, SINDOOR)
    kashes = ''.join(f'<g transform="translate({x},{y}) scale({s}) rotate({r})">{kash(lean=ln)}</g>'
                     for x, y, s, r, ln in ((22, 344, .62, -10, -1), (52, 344, .72, -4, -1), (318, 344, .7, 4, 1), (350, 344, .62, 10, 1)))
    sh = ''.join(shiuli(x, y, s, r) for x, y, s, r in ((40, 40, 1.1, 10), (330, 30, 1, 40), (96, 300, .9, 20), (282, 290, 1, 50), (350, 200, .8, 5)))
    return svg_doc((0, 0, 384, 344), f'{sshape}{kashes}<g transform="translate(52,78) scale(.52) rotate(-12 280 260)">{dhak()}</g>{sh}', sdefs)


# width (adv) and drop below the baseline (d) of each poster title in em, from tools/measure_titles.py
TITLE_W = {'durga': 2.77, 'kali': 3.21, 'shivaratri': 4.0, 'dol': 3.19, 'rath': 2.59, 'janmashtami': 2.94}
TITLE_D = {'durga': .39, 'kali': .39, 'shivaratri': .14, 'dol': .1, 'rath': .14, 'janmashtami': .09}


def big_poster(ctx, fe):
    fid = fe['id']
    kind, bg, fg, title, pb, pf, rot = POSTER_STYLE[fid]
    if fid == 'durga':
        src, wh, href = ctx.add_img('fes-next-durga.svg', durga_poster_art()), (384, 344), ctx.href('durga')
        line = f'{fe["days"][0]["en"]} to {fe["days"][-1]["en"]}'
    else:
        src, wh, href = ctx.img(f'poster-{kind}.svg'), (203, 196), ctx.href('#' + fid)
        line = fe['date_en']
    tvar = f' --p-title: {title};' if title else ''
    yr = ui.bn(fe['start'][:4])
    conf = UNCONFIRMED if fe.get('confirm') else ''
    return (f'<a class="fes-np fes-np--{fid}" href="{esc(href)}" style="--p-bg: var(--{bg}); --p-fg: var(--{fg}); --p-pill-bg: var(--{pb}); '
            f'--p-pill-fg: var(--{pf}); --rot: {rot * 1.15:.2f}deg; --w: {TITLE_W[fid]}; --d: {TITLE_D[fid]};{tvar}">'
            f'<span class="fes-np__top"><span class="fes-np__dh"><span lang="bn">{DHARA_LABEL[fe["dhara"]]}</span> · {DHARA_EN[fe["dhara"]]}</span>'
            f'{pill(fe).replace("fes-pill", "fes-np__pill")}</span>'
            f'<img class="fes-np__art" src="{src}" alt="" width="{wh[0]}" height="{wh[1]}" loading="lazy" decoding="async">'
            f'<span class="fes-np__title" lang="bn">{fe["bn"]}</span>'
            f'<span class="fes-np__date" lang="bn">{fe["date_bn"]} {yr}</span>'
            f'<span class="fes-np__en">{line}{conf}</span></a>')


BHOG = ('Every day', 'ভোগ ও প্রসাদ', 'Bhog and prasad', 'Anna-daan prasad from 12:30 PM, and a light meal at 5:30 PM during festivals.')


def expect(ctx, fid):
    """What to expect, from content/FACTS.md and the festival's first screen in site.json."""
    H = ctx.data['heroes']
    if fid == 'durga':
        return [('Fri 16 – Wed 21 Oct', 'ষষ্ঠী থেকে বিজয়া দশমী', 'Five days', 'Bodhon on Shashthi; Saptami runs into Sun 18 Oct by the panjika.'),
                ('Mon 19 Oct', 'অঞ্জলি ও সন্ধিপূজা', 'Mahashtami', 'Pushpanjali in the morning and Sandhi Puja 7:26–8:14 AM (Benimadhab Shil panjika). Ashtami morning is usually busy: come early.'),
                BHOG,
                ('Wed 21 Oct', 'সিঁদুর খেলা ও বিসর্জন', 'Bijoya Dashami', 'Sindoor khela, then bisarjan.')]
    if fid == 'kali':
        return [('Sun 8 Nov', 'দীপান্বিতা কালীপূজা', 'Dipanwita night', H['kali']['body']),
                ('Amavasya night', 'সারা রাত কীর্তন', 'Open late', 'Extended hours and kirtan through the night.'),
                BHOG]
    if fid == 'shivaratri':
        return [('Sat 6 Mar', 'বেলপাতা ও জল', 'Maha Shivaratri', H['shivaratri']['body']), BHOG]
    if fid == 'dol':
        return [('Mon 22 Mar', 'দোল পূর্ণিমা', 'Dol Yatra · Gaura Purnima', H['dol']['body']),
                ('Purnima night', 'সারা রাত কীর্তন', 'Open late', 'Extended hours and kirtan through the night.'),
                BHOG]
    if fid == 'rath':
        return [('Mon 5 Jul', 'পঞ্চম প্রতিষ্ঠা দিবস', 'Five years of Tridhara', H['rath']['body']),
                ('5 – 13 Jul', 'রথ থেকে উল্টোরথ', 'Nine days', 'Nine days of Rath Yatra, with the chariot procession and sankirtan, '
                 'to Ulto Rath on Tue 13 Jul. More than 3,000 devotees come.'),
                BHOG]
    if fid == 'janmashtami':
        return [('Wed 25 Aug' + UNCONFIRMED, 'নব বৃন্দাবনে জন্মাষ্টমী', 'Janmashtami at Naba Brindaban', H['janmashtami']['body'] + ' More than 5,000 devotees come.'),
                ('Midnight', 'অখণ্ড নাম সংকীর্তন ও অভিষেক', 'Sankirtan, abhishek and arati', 'Akhanda nama sankirtan, then the midnight abhishek and arati.'),
                BHOG]
    return [BHOG]


def expect_item(k, b, e, body):
    return (f'<li class="fes-exp__i"><span class="fes-exp__k">{k}</span><span class="fes-exp__t"><span class="fes-exp__bn" lang="bn">{b}</span>'
            f'<span class="fes-exp__en">{e}</span><span class="fes-exp__p">{body}</span></span></li>')


def next_variant(ctx, fe, shown):
    fid = fe['id']
    items = ''.join(expect_item(*x) for x in expect(ctx, fid))
    if fid == 'durga':
        btns = btn(ctx, 'See the Puja days' + arrow(16), 'durga', 'haldi') + btn(ctx, 'Book a bhog seva', 'seva', 'ghost')
    else:
        btns = btn(ctx, 'Offer a seva' + arrow(16), 'seva', 'haldi') + btn(ctx, 'Find it in the calendar', '#' + fid, 'ghost')
    h = ' hidden' if not shown else ''
    return (f'<div class="fes-next" data-fes-next="{fid}"{h}>{big_poster(ctx, fe)}'
            f'<div class="fes-next__t"><h3 class="fes-next__h"><span lang="bn">কী কী হবে</span><span class="fes-next__hen">What to expect</span></h3>'
            f'<ul class="fes-exp">{items}</ul><div class="btns">{btns}</div></div></div>')


def next_up(ctx, t):
    nb = big_now(ctx, t)
    big = [x for x in ctx.data['festivals'] if x.get('big')]
    on = bool(nb and d_(nb['start']) <= t)
    if nb:   # without the script: the date (a count of days would go stale); site.js turns it into days to go
        num, b, e = nb['date_bn'].split(' ')[0].split('–')[0], nb['date_bn'].split(' ')[-1], no_year(nb['date_en'])
    else:
        num, b, e = '✦', 'পরের বছর', 'Dates to come'
    count = (f'<p class="fes-count" data-fes-count><span class="fes-count__n" lang="bn">{num}</span>'
             f'<span class="fes-count__t"><span class="fes-count__bn" lang="bn">{b}</span><span class="fes-count__en">{e}</span></span></p>')
    en = (f'{"On now" if on else "Next up"} · {short(nb)} {nb["start"][:4]}') if nb else 'Next up · the new festival year'
    head = sec_head('আজকের পার্বণ' if on else 'পরের পার্বণ', f'<span data-fes-next-en>{en}</span>', count, hid='next-h')
    variants = ''.join(next_variant(ctx, x, nb is not None and x['id'] == nb['id']) for x in big)
    variants += (f'<div class="fes-next fes-next--none" data-fes-next=""{"" if nb is None else " hidden"}>'
                 f'<p class="fes-next__p">The dates for the next festival year are coming soon. Sign up below for festival news by email.</p>'
                 f'<div class="btns">{btn(ctx, "Festival news", "#remind", "haldi")}</div></div>')
    return section(head + variants, 'kajal', sid='next', labelledby='next-h')


# ---------------------------------------------------------------- the note and the festival-news band
def note_band(ctx):
    book = (f'<svg class="fes-note__ic" width="64" height="56" viewBox="0 0 64 56" aria-hidden="true" focusable="false">'
            f'<path d="M32,12 C24,6 12,5 4,7 L4,48 C12,46 24,47 32,53 C40,47 52,46 60,48 L60,7 C52,5 40,6 32,12 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
            f'<path d="M32,12 L32,53" stroke="{KAJAL}" stroke-width="3"/><path d="M10,18 C16,17 22,18 26,20 M10,27 C16,26 22,27 26,29 M38,20 C42,18 48,17 54,18 M38,29 C42,27 48,26 54,27" stroke="{KAJAL}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>')
    return section(f'<div class="fes-note">{book}<div class="fes-note__t"><p class="fes-note__h"><span lang="bn">তিথি মিলিয়ে নিন</span>'
                   f'<span class="fes-note__en">About these dates</span></p>'
                   f'<p class="fes-note__p">Dates follow the Benimadhab Shil panjika. Belur Math (Bisuddha Siddhanta) may differ by a day for Shashthi, Saptami and Jagaddhatri Puja.</p>'
                   f'</div></div>', 'shola', cls='fes-noteband', label='About these dates')


def remind(ctx):
    """Festival news and the seva newsletter by email: the homepage's band with its own form id."""
    fl = field('remind-fes-contact', 'ইমেল', 'Email', 'email', name='email', required=True,
               placeholder='you@example.com', autocomplete='email')
    form = (f'<form class="remind__form form" id="remind-fes" data-form="remind-fes" data-subject="Festival news and seva newsletter" novalidate>'
            f'<div class="remind__row">{fl}<button class="btn" type="submit">Sign up</button></div>{ui.honeypot("remind-fes")}'
            f'<div class="form-result" data-form-result hidden tabindex="-1"></div></form>')
    return section(f'<div class="remind"><div class="remind__t"><h2 class="remind__h" lang="bn" id="remind-h">উৎসবের আগে খবর পান</h2>'
                   f'<p class="remind__en">Festival news and the seva newsletter, <span class="nowrap">by email</span></p></div>{form}</div>',
                   'haldi', cls='sec--tight', sid='remind', labelledby='remind-h')


# ---------------------------------------------------------------- search engines and the script in the page head
JSONLD_IDS = ('durga', 'rath')   # the festivals content/FACTS.md names as the mandir's own, with dates


def json_ld(ctx):
    c, s = ctx.data['contact'], ctx.data['site']
    place = {'@type': 'Place', 'name': s['name_en'],
             'address': {'@type': 'PostalAddress', 'streetAddress': c['street'], 'addressLocality': c['locality'],
                         'addressRegion': c['region'], 'postalCode': c['postcode'], 'addressCountry': c['country']},
             'geo': {'@type': 'GeoCoordinates', 'latitude': c['geo'][0], 'longitude': c['geo'][1]}}
    org = {'@type': 'Organization', 'name': s['name_en'], 'url': s['domain'] + '/'}
    H = ctx.data['heroes']
    items = []
    for fe in ctx.data['festivals']:
        if fe['id'] not in JSONLD_IDS or fe.get('confirm'):
            continue
        ev = {'@type': 'Event', 'name': f'{fe["en"]} {fe["start"][:4]}', 'alternateName': fe['bn'], 'startDate': fe['start'], 'endDate': fe['end'],
              'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode', 'eventStatus': 'https://schema.org/EventScheduled',
              'location': place, 'organizer': org,
              'url': ctx.url('durga') if fe['id'] == 'durga' else ctx.url('festivals') + '#' + fe['id']}
        if fe['id'] in H and isinstance(H[fe['id']], dict) and not H[fe['id']].get('confirm'):
            ev['description'] = H[fe['id']]['body']
        items.append({'@type': 'ListItem', 'position': len(items) + 1, 'item': ev})
    return [{'@context': 'https://schema.org', '@type': 'ItemList', 'name': f'Festivals at {s["name_en"]}, {s["place_en"]}: Ashwin 1433 to Bhadra 1434',
             'url': ctx.url('festivals'), 'numberOfItems': len(items), 'itemListElement': items}]


def head_script(ctx, rng):
    """Runs in <head>: knows today (India time, or the test time on the test link) so the year wheel and the countdown
    sticker are right before the page is drawn. site.js calls TMM_FES.hero(day) again on every tick."""
    big = [[x['id'], x['start'], x['end'], x.get('short_en', short(x)), x['bn'], [[d['date'], d['bn'], d['en']] for d in x.get('days', [])],
            1 if x.get('confirm') else 0] for x in ctx.data['festivals'] if x.get('big')]
    js = ('(function(){var S=' + ('true' if ctx.staging else 'false') + ',B=' + json.dumps(big, ensure_ascii=False)
            + ',M=' + json.dumps(rng) + ',C=' + json.dumps(list(WHEEL_C)) + ''';
var BN='০১২৩৪৫৬৭৮৯';function bn(n){return String(n).replace(/\\d/g,function(d){return BN[d]})}
function dn(s){var p=s.split('-');return Math.round(Date.UTC(+p[0],p[1]-1,+p[2])/864e5)}
function iso(t){var d=new Date(t*864e5);return d.getUTCFullYear()+'-'+('0'+(d.getUTCMonth()+1)).slice(-2)+'-'+('0'+d.getUTCDate()).slice(-2)}
function today(){if(S){try{var v=sessionStorage.getItem('tmm-test-now'),m=v&&/^(\\d{4}-\\d\\d-\\d\\d)T/.exec(v);if(m)return dn(m[1])}catch(e){}}
var n=new Date(),d=new Date(n.getTime()+(n.getTimezoneOffset()+330)*6e4);return Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)}
var F=window.TMM_FES={today:today,
month:function(t){var c=-1;for(var i=0;M.length>i;i++)if(t>=dn(M[i][0])&&dn(M[i][1])>=t)c=i;return c},
big:function(t){var i,b;for(i=0;B.length>i;i++){b=B[i];if(t>=dn(b[1])&&dn(b[2])>=t)return{f:b,on:true,day:t-dn(b[1])+1,len:dn(b[2])-dn(b[1])+1}}
for(i=0;B.length>i;i++){b=B[i];if(dn(b[1])>t)return{f:b,on:false,n:dn(b[1])-t}}return null},
label:function(t){var x=F.big(t);if(!x)return['✦','পরের উৎসব','dates to come','Dates for the next festival are coming'];var f=x.f,nm=f[3];
if(!x.on)return[bn(x.n),'দিন বাকি','to '+nm,x.n+(x.n===1?' day':' days')+' to '+nm+(f[6]?' (date to be confirmed)':'')];
var dd=null,tt=iso(t);f[5].forEach(function(d){if(d[0]===tt)dd=d});
if(dd)return['আজ',dd[1],dd[2],'Today: '+dd[2]];if(x.len>1)return['আজ','উৎসব চলছে','Day '+x.day+' of '+x.len,nm+', day '+x.day+' of '+x.len];
return['আজ',f[4],'Today',nm+' is today'+(f[6]?' (date to be confirmed)':'')]},
hero:function(t){if(t==null)t=today();var c=F.month(t),w=document.querySelector('[data-fes-wheel]'),s=document.querySelector('[data-fes-sticker]');
if(w){var k=0>c?(dn(M[0][0])>t?0:M.length-1):c;Array.prototype.forEach.call(w.querySelectorAll('[data-m]'),function(el){
el.classList.toggle('is-cur',c>=0&&+el.getAttribute('data-m')===k)});var p=w.querySelector('.fes-wh__ptr');
if(p)p.setAttribute('transform','rotate('+30*k+' '+C[0]+' '+C[1]+')')}
if(s){var l=F.label(t),e=s.children,v=l[0],isN=/^[০-৯0-9—✦]+$/.test(v);e[0].textContent=v;
e[0].className='sticker__num'+(isN?(v.length>2?' sticker__num--3':''):(v.length>3?' sticker__num--word':' sticker__num--short'));
e[1].textContent=l[1];e[2].textContent=l[2];e[2].className='sticker__en'+(l[2].length>12?' sticker__en--long':'');s.setAttribute('aria-label',l[3])}}};})();''')
    # no '<' anywhere, so no tool that scans the page for tags with a regex can mistake part of this script for one
    assert '<' not in js, 'write comparisons in the head script with > only'
    return js


def render(ctx):
    t = build_day()
    rng = with_ends(ctx)
    cur = month_now(rng, t)
    PAGE['head_script'] = head_script(ctx, rng)
    PAGE['json_ld'] = json_ld(ctx)
    return (first_screen(ctx, t, cur) + filter_bar(ctx) + months(ctx, rng, cur, t) + next_up(ctx, t)
            + note_band(ctx) + remind(ctx))
