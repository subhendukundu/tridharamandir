"""Durga Puja 2026 (/durga-puja/): the Puja poster first screen (dhak, kash, shiuli, a live sticker), the five days
(cards that open a day sheet), Sandhi Puja, bhog seva, tips for visitors and what comes next.

The page follows the date (src/js/56-durga.js, with TMM_DUR from head_script below):
coming (countdown) · on (16–21 Oct: today's day is highlighted and opened) · thanks (22 Oct: Shubho Bijoya) · after (a record).
Facts: content/FACTS.md, content/CURRENT_SITE_FACTS.md (the old site's own text) and content/site.json."""
import json
import math
from datetime import date

from lib import ui, art
from lib.ui import bn, btn, sec_head, section
from lib.art import arrow, SINDOOR, HALDI, SHOLA, KAJAL, NEEL, PEACOCK_D, ABIR
from lib.motifs import f, dhak, kash, shiuli
from lib import byear as BY

PAGE = dict(key='durga', title='Durga Puja 2026',
            description='Durga Puja 2026 at Tridhara Milan Mandir, Panchmura: Shashthi 16 Oct to Bijoya Dashami 21 Oct, '
                        'Sandhi Puja on Mahashtami, and free anna-daan prasad.',
            tone='sindoor')

LOTUS_PINK = '#F2A7C3'
WD_BN = ['সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার', 'রবিবার']
WD_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
MON_BN = {9: 'সেপ্টেম্বর', 10: 'অক্টোবর', 11: 'নভেম্বর'}
MON_EN = {9: 'Sep', 10: 'Oct', 11: 'Nov'}

SANDHI = dict(date='2026-10-19', start=7 * 60 + 26, end=8 * 60 + 14, other='10:28–11:16 AM')   # FACTS: BMS/GP; VS gives the other time
DEFAULT_OPEN = 'ashtami'   # the day that is open before the Puja (the design's highlighted card)
NEXT_IDS = ['lakshmi', 'kali', 'rash', 'saraswati', 'shivaratri', 'dol', 'rath', 'janmashtami']   # festivals that have a poster

# The Puja days as designed (b_durga.DAYS); dates, names and how many calendar days each covers come from site.json.
# rbn/ren and lead say what each day of Durga Puja is (its customary rites), not a timetable: the mandir has announced
# none, so no order or hour is given except the Sandhi Puja time from the panjika.
# puja: timed rows for the day's sheet (only times that are known; the rest are announced at the mandir).
DAYS = [
    dict(k='shashthi', rbn='বোধন', ren='Bodhon, the awakening', panel='haldi',
         lead='Shashthi is the day of Bodhon, the awakening, when the Puja begins.', puja=[]),
    dict(k='saptami', rbn='নবপত্রিকা স্নান', ren='Nabapatrika snan', panel='neel',
         extra=('তিথি চলবে রবিবার ১৮ অক্টোবর পর্যন্ত', 'Saptami runs into Sun 18 Oct'),
         lead='Saptami is the day of Nabapatrika snan, traditionally at dawn. In the Benimadhab Shil panjika, '
              'Saptami runs on into Sunday 18 October, so the whole weekend is Saptami.',
         puja=[]),
    dict(k='ashtami', rbn='অঞ্জলি ও সন্ধিপূজা', ren='Pushpanjali and Sandhi Puja', panel='haldi', busy=True,
         lead='Mahashtami is the day of Sandhi Puja, and of pushpanjali in the morning. It is usually busy: come early.',
         puja=[('7:26 AM', 'সন্ধিপূজা', 'Sandhi Puja, until 8:14 AM (Benimadhab Shil panjika)', (SANDHI['start'], SANDHI['end']))]),
    dict(k='navami', rbn='হোম ও ভোগ', ren='Navami homa and bhog', panel='kajal',
         lead='Mahanavami is the day of the Navami homa, and of bhog.', puja=[]),
    dict(k='dashami', rbn='সিঁদুর খেলা ও বিসর্জন', ren='Sindoor khela and bisarjan', panel='peacock-d',
         lead='Bijoya Dashami is the day of sindoor khela, then bisarjan. Shubho Bijoya.', puja=[]),
]


# ---------------------------------------------------------------- small helpers
def fmt(m):
    h, mm = divmod(m, 60)
    return f'{h % 12 or 12}:{mm:02d} {"AM" if h < 12 else "PM"}'


def d_of(iso):
    return date.fromisoformat(iso)


def date_bn(iso):
    d = d_of(iso)
    return f'{WD_BN[d.weekday()]}, {bn(d.day)} {MON_BN[d.month]}'


def date_en(iso, year=False):
    d = d_of(iso)
    return f'{WD_EN[d.weekday()]} {d.day} {MON_EN[d.month]}' + (f' {d.year}' if year else '')


def when(states, inline=True):
    """Class list for a part that shows only in some states: c = coming, o = on, t = thanks (22 Oct), a = after."""
    return 'dur-when' + ''.join(f' dur-when--{s}' for s in states) + (' dur-when--i' if inline else '')


def words(n):
    return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][n] if 0 <= n <= 10 else str(n)


def caps(text, cls=''):
    return f'<span class="caps{" " + cls if cls else ""}">{text}</span>'


# ---------------------------------------------------------------- art (ported from the design: b_durga.py, b_phone.py)
def psun(pid, cx, cy, r, fill, dots, step=12, dr=2.7):
    """Halftone sun with finer dots, for the phone composition."""
    defs = (f'<pattern id="{pid}D" width="{step}" height="{step}" patternUnits="userSpaceOnUse"><circle cx="{step / 2}" cy="{step / 2}" r="{dr}" fill="{dots}"/></pattern>'
            f'<radialGradient id="{pid}G" cx=".5" cy=".5" r=".5"><stop offset=".6" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>'
            f'<mask id="{pid}M"><circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{pid}G)"/></mask>')
    return defs, f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{pid}D)" mask="url(#{pid}M)"/>'


def kash_at(x, y, s, r=0, lean=1):
    return f'<g transform="translate({x},{y}) scale({s}) rotate({r})">{kash(lean=lean)}</g>'


def hero_desktop():
    """The first screen's art on the design's 1440-wide board (b_durga.hero_art + its sun)."""
    d, sun = art.sun('durH', 1070, 372, 282, HALDI, SINDOOR)
    sh = ''.join(shiuli(x, y, s, r) for x, y, s, r in (
        (612, 120, 1.1, 10), (700, 96, .8, 40), (1250, 118, 1.2, 20), (1330, 96, .9, 50), (1404, 210, 1.1, 5), (1180, 92, .8, 30),
        (760, 560, .9, 25), (690, 610, 1, 45), (1000, 120, .9, 15), (1408, 400, .8, 35)))
    kashes = ''.join(kash_at(x, 690, s, r, l) for x, s, r, l in (
        (1150, .62, -10, -1), (1206, .8, -4, -1), (1262, .96, -1, -1), (1316, .84, 4, 1), (1370, .98, 8, 1), (1422, .76, 12, 1),
        (1478, .9, 6, 1), (1532, .7, -6, -1), (1586, .86, 9, 1), (1640, .66, 13, 1)))      # past 1440: seen only on wide screens
    sh += ''.join(shiuli(x, y, s, r) for x, y, s, r in ((1490, 120, 1, 25), (1585, 260, .9, 50), (1520, 470, .8, 10), (1630, 90, .85, 35)))
    return d, sun + kashes + f'<g transform="translate(814,176) scale(.96) rotate(-14 280 260)">{dhak()}</g>' + sh


def hero_phone():
    """The phone composition (b_phone.durga_hero, 390 wide)."""
    cx, cy, r = 232, 382, 120
    d, sun = psun('durHm', cx, cy, r, HALDI, SINDOOR)
    s = .42
    dk = f'<g transform="translate({cx - 10 - 280 * s:.1f},{cy + 6 - 260 * s:.1f}) scale({s}) rotate(-14 280 260)">{dhak()}</g>'
    kashes = kash_at(352, 520, .5, -3, -1) + kash_at(368, 520, .6, 3, 1) + kash_at(384, 520, .48, 9, 1)
    fl = ''.join(shiuli(x, y, sc, rt) for x, y, sc, rt in ((34, 412, .8, 10), (128, 470, .6, 40), (370, 250, .75, 20), (150, 268, .55, 5),
                                                         (300, 500, .7, 45), (40, 246, .6, 15), (330, 300, .5, 30)))
    return d, sun + kashes + dk + fl


HERO_VIEW = (560, 0, 1080, 656)     # desktop: the right-hand art column, plus 200 units that show only on screens wider than 1440 px
HERO_VIEW_M = (0, 228, 390, 304)    # phone: the sun, the dhak and the kash


def ghot_pot(x, y, s=1):
    leaves = ''.join(f'<path transform="rotate({a})" d="M0,-30 C-9,-42 -9,-62 0,-76 C9,-62 9,-42 0,-30 Z" fill="#3E8E41" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>' for a in (-50, -25, 0, 25, 50))
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})">{leaves}'
            f'<path d="M-30,-28 C-56,-16 -60,30 -34,52 C-18,66 18,66 34,52 C60,30 56,-16 30,-28 Z" fill="#C0602F" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<rect x="-28" y="-40" width="56" height="15" rx="5" fill="#A44D23" stroke="{KAJAL}" stroke-width="4"/>'
            f'<path d="M-46,10 C-20,18 20,18 46,10" fill="none" stroke="{SHOLA}" stroke-width="4"/>'
            + ''.join(f'<circle cx="{c}" cy="30" r="4" fill="{SHOLA}"/>' for c in (-16, 0, 16)) + '</g>')


def flames(x, y, s=1):
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})">'
            f'<path d="M0,0 C-34,-6 -40,-40 -22,-62 C-20,-44 -10,-40 -6,-46 C-12,-70 0,-92 18,-104 C12,-82 26,-66 30,-52 C36,-60 36,-70 34,-78 C52,-58 52,-14 0,0 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M2,-6 C-18,-10 -22,-32 -10,-46 C-6,-34 2,-34 4,-40 C2,-56 10,-68 20,-76 C18,-58 30,-46 30,-32 C30,-18 20,-8 2,-6 Z" fill="{HALDI}"/>'
            f'<path d="M4,-10 C-6,-14 -8,-26 0,-34 C4,-26 10,-28 12,-34 C18,-26 16,-14 4,-10 Z" fill="{SHOLA}"/></g>')


def waves(rows):
    return ''.join(f'<path d="M{x0},{y} q12,-8 24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0" fill="none" stroke="{SHOLA}" stroke-width="3.5" stroke-linecap="round"/>' for x0, y in rows)


def lotus(cx, cy, s=1):
    petal = lambda a, k: (f'<path transform="translate({cx},{cy}) rotate({a}) scale({s * k})" d="M0,0 C-20,-16 -20,-52 0,-70 C20,-52 20,-16 0,0 Z" fill="{LOTUS_PINK}" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
                          f'<path transform="translate({cx},{cy}) rotate({a}) scale({s * k})" d="M0,-8 L0,-56" stroke="{ABIR}" stroke-width="2.5" stroke-linecap="round"/>')
    return petal(-70, .82) + petal(70, .82) + petal(-36, .94) + petal(36, .94) + petal(0, 1.04)


def day_art(kind):
    """The day vignettes (viewBox 0 0 200 160; Mahalaya 0 0 120 130)."""
    if kind == 'mahalaya':   # new moon and stars
        stars = ''.join(f'<path transform="translate({x},{y}) scale({s})" d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="{HALDI}"/>' for x, y, s in ((24, 26, .9), (92, 18, .6), (100, 112, .8), (16, 104, .55)))
        return (f'<circle cx="60" cy="66" r="40" fill="#2A211B" stroke="{SHOLA}" stroke-width="3"/>'
                f'<circle cx="60" cy="66" r="48" fill="none" stroke="{SHOLA}" stroke-width="1.5" stroke-dasharray="2 6" stroke-linecap="round"/>{stars}')
    if kind == 'shashthi':   # bodhon under the bel tree
        return (f'<circle cx="100" cy="82" r="66" fill="{SHOLA}"/>'
                f'<path d="M14,30 C60,40 92,40 120,26 C146,14 170,12 192,20" fill="none" stroke="#6A3A1E" stroke-width="7" stroke-linecap="round"/>'
                + BY.bel(52, 44, .42, 170) + BY.bel(122, 36, .4, 190) + BY.bel(176, 26, .36, 160) + ghot_pot(100, 112, .62)
                + BY.diya(40, 140, .42) + BY.diya(160, 140, .42))
    if kind == 'saptami':    # nabapatrika snan at dawn
        leaf = lambda a, L: (f'<path transform="translate(82,74) rotate({a})" d="M0,0 C-14,-{L * .3:.0f} -14,-{L * .75:.0f} 0,-{L} C14,-{L * .75:.0f} 14,-{L * .3:.0f} 0,0 Z" fill="#3E8E41" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
                             f'<path transform="translate(82,74) rotate({a})" d="M0,-4 L0,-{L - 8}" stroke="#1F5A23" stroke-width="2"/>')
        return (f'<path d="M30,108 A70,70 0 0 1 170,108 Z" fill="{HALDI}"/>'
                + ''.join(f'<path d="M100,108 L{f(100 + 92 * math.cos(math.radians(a)))},{f(108 - 92 * math.sin(math.radians(a)))}" stroke="{HALDI}" stroke-width="3" stroke-linecap="round" opacity=".7"/>' for a in (20, 45, 70, 110, 135, 160))
                + leaf(-38, 64) + leaf(-8, 72) + leaf(26, 62)
                + f'<path d="M70,76 C64,92 64,110 70,124 L96,124 C100,110 100,92 94,76 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
                f'<path d="M66,112 C76,116 88,116 98,112" fill="none" stroke="{SINDOOR}" stroke-width="5"/><path d="M70,80 L94,80" stroke="{SINDOOR}" stroke-width="4"/>'
                f'<rect x="-4" y="108" width="208" height="56" fill="{NEEL}"/>' + waves(((-6, 118), (6, 134), (-10, 150))))
    if kind == 'ashtami':    # lotus, lamps and anjali flowers
        sd, ss = art.sun('durAs', 100, 76, 64, HALDI, SINDOOR)
        falling = ''.join(shiuli(x, y, s, r) for x, y, s, r in ((26, 30, .8, 10), (176, 24, .9, 40), (30, 92, .7, 20), (172, 96, .8, 50)))
        return (f'<defs>{sd}</defs>{ss}' + lotus(100, 104)
                + f'<path d="M58,104 C76,114 124,114 142,104" fill="none" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>{falling}'
                + BY.diya(46, 140, .5) + BY.diya(100, 144, .5) + BY.diya(154, 140, .5))
    if kind == 'navami':     # homa fire and bhog
        return (f'<circle cx="100" cy="80" r="66" fill="#7E1A12"/>'
                f'<path d="M34,150 L48,118 L152,118 L166,150 Z" fill="#C0602F" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
                f'<path d="M48,118 L56,104 L144,104 L152,118" fill="#A44D23" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
                f'<path d="M60,132 L140,132" stroke="{KAJAL}" stroke-width="3" opacity=".5"/>'
                + flames(100, 106, .78) + BY.handi(170, 120, .34) + BY.handi(32, 124, .3))
    if kind == 'dashami':    # sindoor khela, then bisarjan
        return (f'<circle cx="100" cy="78" r="64" fill="{SHOLA}"/>'
                + BY.blob(70, 62, 26, 3, SINDOOR) + BY.blob(136, 52, 18, 7, SINDOOR) + BY.blob(118, 98, 12, 11, SINDOOR)
                + f'<g transform="translate(100,96)"><ellipse cx="0" cy="12" rx="34" ry="12" fill="#A44D23" stroke="{KAJAL}" stroke-width="4"/>'
                f'<path d="M-34,12 L-34,-6 A34,12 0 0 1 34,-6 L34,12" fill="#C0602F" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
                f'<ellipse cx="0" cy="-6" rx="34" ry="12" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4"/>'
                f'<path d="M-20,-8 C-10,-14 10,-14 20,-8" fill="none" stroke="#8E1F0F" stroke-width="3"/></g>'
                f'<rect x="-4" y="122" width="208" height="40" fill="{PEACOCK_D}"/>' + waves(((-6, 130), (6, 146))))
    return ''


def sandhi_art():
    """Sandhi Puja: the lotus and lamps of the Mahashtami vignette, drawn large on a halftone sun."""
    d, s = art.sun('durSa', 240, 196, 172, HALDI, SINDOOR)
    fl = ''.join(shiuli(x, y, sc, r) for x, y, sc, r in ((52, 70, 1.5, 10), (420, 54, 1.3, 40), (60, 214, 1.1, 20), (430, 222, 1.4, 50), (150, 30, .9, 30), (342, 22, 1, 5)))
    lamps = ''.join(BY.diya(x, y, .66) for x, y in ((82, 346), (162, 360), (242, 366), (322, 360), (402, 346)))
    return art.svg_doc((0, 0, 480, 400), s + lotus(240, 262, 2.3)
                       + f'<path d="M144,262 C186,286 294,286 336,262" fill="none" stroke="{KAJAL}" stroke-width="7" stroke-linecap="round"/>' + fl + lamps, d)


def seva_art():
    d, s = art.sun('durSv', 150, 128, 116, HALDI, KAJAL)
    return art.svg_doc((0, 0, 340, 256), s + f'<g transform="translate(10,20) scale(.46) rotate(-12 280 260)">{dhak()}</g>'
                       + ''.join(shiuli(x, y, sc, r) for x, y, sc, r in ((30, 30, 1, 10), (300, 44, .9, 40), (316, 214, 1.1, 20), (24, 226, .8, 50))), d)


def tip_icon(kind):
    s = f'fill="none" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"'
    if kind == 'early':
        inner = (f'<circle cx="36" cy="36" r="26" fill="{HALDI}" stroke="{KAJAL}" stroke-width="4"/><path d="M36,20 L36,36 L47,43" {s}/>'
                 f'<path d="M62,14 l3,-7 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 Z" fill="{SINDOOR}"/>')
    elif kind == 'dress':
        inner = (f'<path d="M24,10 L48,10 L64,22 L56,34 L50,30 L50,66 L22,66 L22,30 L16,34 L8,22 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
                 f'<path d="M28,10 C30,18 42,18 44,10" {s}/><path d="M22,56 L50,56" stroke="{HALDI}" stroke-width="5"/>')
    elif kind == 'care':
        inner = (f'<rect x="8" y="16" width="56" height="46" rx="6" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/><path d="M26,16 L26,8 L46,8 L46,16" {s}/>'
                 f'<path d="M30,28 L42,28 L42,34 L48,34 L48,46 L42,46 L42,52 L30,52 L30,46 L24,46 L24,34 L30,34 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="2.5" stroke-linejoin="round"/>')
    else:   # watch: a screen with a play button (no red dot: that reads as "live", and nothing is streamed)
        inner = (f'<rect x="6" y="12" width="60" height="42" rx="6" fill="{KAJAL}"/><path d="M30,24 L46,33 L30,42 Z" fill="{HALDI}"/>'
                 f'<path d="M24,64 L48,64 M36,54 L36,64" {s}/>')
    return f'<svg class="dur-tip__ic" width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" focusable="false">{inner}</svg>'


# ---------------------------------------------------------------- page-head script: the state for today, before the page is drawn
def head_script(ctx):
    """window.TMM_DUR: compute(day number) -> {s: coming|on|thanks|after, n, day, iso, y}; mark(el) puts dur-s-<state> on
    the page wrapper; fill(sticker) writes the sticker; days(grid) opens today's day. Used inline (no flash of the
    wrong state) and by src/js/56-durga.js."""
    return _head_js(ctx)


def _head_js(ctx):
    fe = ui.festival(ctx, 'durga')
    days = [[d['date'], d['bn'], d['en']] for d in fe['days']]
    return ('(function(){var S=' + ('true' if ctx.staging else 'false') + ',A="' + fe['start'] + '",B="' + fe['end'] + '",OPEN="' + DEFAULT_OPEN + '",DAYS='
            + json.dumps(days, ensure_ascii=False) + r''';
var BN='০১২৩৪৫৬৭৮৯';function bn(n){return String(n).replace(/\d/g,function(d){return BN[d]})}
function dn(s){var p=s.split('-');return Math.round(Date.UTC(+p[0],p[1]-1,+p[2])/864e5)}
function iso(t){var d=new Date(t*864e5);return d.getUTCFullYear()+'-'+('0'+(d.getUTCMonth()+1)).slice(-2)+'-'+('0'+d.getUTCDate()).slice(-2)}
function today(){if(S){try{var v=sessionStorage.getItem('tmm-test-now'),m=v&&/^(\d{4}-\d\d-\d\d)T/.exec(v);if(m)return dn(m[1])}catch(e){}}
var n=new Date(),d=new Date(n.getTime()+(n.getTimezoneOffset()+330)*6e4);return Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)}
var a=dn(A),b=dn(B),Y=+A.slice(0,4);
function compute(t){var m={t:t,iso:iso(t),y:Y};if(a>t){m.s='coming';m.n=a-t}else if(b>=t){m.s='on';DAYS.forEach(function(d){if(d[0]===m.iso)m.day=d})}
else if(t===b+1)m.s='thanks';else m.s='after';return m}
function sticker(m){if(m.s==='coming')return[bn(m.n),'দিন বাকি',m.n===1?'day to go':'days to go',m.n+(m.n===1?' day':' days')+' to Durga Puja',m.n>99?'sticker__num--3':''];
if(m.s==='on'){var d=m.day||['','পুজো চলছে','Durga Puja'];return['আজ',d[1],d[2],'Today: '+d[2],'sticker__num--short']}
if(m.s==='thanks')return['শুভ','বিজয়া','Shubho Bijoya','Shubho Bijoya','sticker__num--short'];
return[bn(Y+1),'আসছে বছর','dates to come','Durga Puja '+(Y+1)+': dates to come','sticker__num--3']}
var R=window.TMM_DUR={compute:compute,today:today,sticker:sticker,mode:null,
mark:function(el,m){m=m||compute(today());R.mode=m;if(el)el.className=el.className.replace(/(^|\s)dur-(s-\w+|js)/g,'')+' dur-js dur-s-'+m.s;return m},
fill:function(el,m){m=m||R.mode||compute(today());if(!el)return;var x=sticker(m),c=el.children;if(3>c.length)return;
c[0].textContent=x[0];c[0].className='sticker__num'+(x[4]?' '+x[4]:'');
c[1].textContent=x[1];c[1].className='sticker__bn'+(x[1].length>9?' dur-sticker__bn--long':'');
c[2].textContent=x[2];c[2].className='sticker__en'+(x[2].length>12?' sticker__en--long':'');el.setAttribute('aria-label',x[3])},
days:function(g,m){m=m||R.mode||compute(today());if(!g)return;var k=m.s==='coming'?OPEN:'',cs=g.querySelectorAll('[data-dur-day]'),i;
for(i=0;i!==cs.length;i++)if((' '+cs[i].getAttribute('data-dates')+' ').indexOf(' '+m.iso+' ')+1)k=cs[i].getAttribute('data-dur-day');
for(i=0;i!==cs.length;i++){var c=cs[i],on=c.getAttribute('data-dur-day')===k,b=c.querySelector('.dur-day__btn'),s=document.getElementById(c.getAttribute('data-sheet'));
c.classList.toggle('dur-day--open',on);if(b)b.setAttribute('aria-expanded',on?'true':'false');if(s)s.hidden=!on}return k}}})();''')


# ---------------------------------------------------------------- first screen
def sticker_html(fe, cls):
    """The countdown sticker. Before the script runs (or without it): the date."""
    days, month = fe['date_bn'].split(' ', 1)          # '১৬–২১', 'অক্টোবর'
    s = ui.sticker(days, month, str(d_of(fe['start']).year), label=f'Durga Puja, {fe["date_en"]}',
                   cls=f'dur-hero__sticker {cls}', data=' data-dur-sticker').replace('sticker__num--3', 'sticker__num--word', 1)
    return s + '<script>window.TMM_DUR&&TMM_DUR.fill(document.currentScript.previousElementSibling)</script>'


def first_screen(ctx):
    fe = ui.festival(ctx, 'durga')
    d, s = hero_desktop()
    dm, sm = hero_phone()
    desk = art.svg_doc(HERO_VIEW, s, d)
    mob = art.svg_doc(HERO_VIEW_M, sm, dm)
    ctx.add_img('dur-hero.svg', desk)
    ctx.add_img('dur-hero-m.svg', mob)
    pic = (f'<picture><source media="(max-width: 899px)" srcset="{ctx.img("dur-hero-m.svg")}" width="{HERO_VIEW_M[2]}" height="{HERO_VIEW_M[3]}">'
           f'<img src="{ctx.img("dur-hero.svg")}" alt="" width="{HERO_VIEW[2]}" height="{HERO_VIEW[3]}" decoding="async" fetchpriority="high"></picture>')
    b1 = (f'<a class="btn btn--shola" href="#days" data-dur-today-link><span class="{when("cta")}">See the five days</span>'
          f'<span class="{when("o")}">Today at the Puja</span></a>')
    b2 = btn(ctx, 'Offer a Puja seva', '#seva', 'ghost')
    hero = (f'<section class="dur-hero" aria-labelledby="durga-title">'
            f'<div class="dur-hero__head"><h1 class="dur-hero__title" id="durga-title" lang="bn">দুর্গাপূজা<span class="sr-only" lang="en"> · Durga Puja 2026</span></h1>'
            f'{sticker_html(fe, "dur-hero__sticker--d")}</div>'
            f'<div class="dur-hero__art">{pic}{sticker_html(fe, "dur-hero__sticker--m")}</div>'
            f'<div class="dur-hero__copy"><p class="dur-hero__en">Durga Puja at Tridhara · <span class="nowrap">16–21 October 2026</span></p>'
            f'<p class="dur-hero__sub">Five days of dhak, anjali, bhog and arati in Panchmura.</p>'
            f'<div class="btns">{b1}{b2}</div></div></section>')
    items = [f'মহালয়া {ui.festival(ctx, "mahalaya")["date_bn"]}']
    for k, (en_name, bn_name, dates) in enumerate(day_groups(ctx)):
        d0 = d_of(dates[0])
        items.append(f'{bn_name} {bn(d0.day)} {MON_BN[d0.month]}')
        if k == 2:
            items.append('সন্ধিপূজা · মহাষ্টমী')
    return ui.top(hero, cls='dur-top') + ui.marquee(items)


# ---------------------------------------------------------------- the five days
def day_groups(ctx):
    """[(en, bn, [dates])] for the Puja days in site.json; Saptami covers two dates."""
    out = []
    for d in ui.festival(ctx, 'durga')['days']:
        if out and out[-1][0] == d['en']:
            out[-1][2].append(d['date'])
        else:
            out.append((d['en'], d['bn'], [d['date']]))
    return out


def sheet_rows(rows):
    li = ''
    for t, b, e, rng in rows:
        data = ''
        if rng:
            data = f' data-start="{rng[0]}"' + (f' data-end="{rng[1]}"' if rng[1] is not None else '')
        li += (f'<li class="dur-row"{data}><span class="dur-row__t">{t}</span><span class="dur-row__w"><span class="dur-row__bn" lang="bn">{b}</span>'
               f'<span class="dur-row__en">{e}</span></span><span class="dur-row__tag" hidden></span></li>')
    return f'<ul class="dur-sheet__list">{li}</ul>'


def everyday_rows(ctx, iso, night=False):
    """The mandir's usual day (site.json schedule and hours; the 5:30 PM festival meal is from FACTS)."""
    S = ctx.data['schedule']
    H = ctx.data['hours']
    wk = d_of(iso).weekday()
    close = H['close_weekend'] if wk >= 5 else H['close_weekday']
    rows = [(f'{S[0]["time"]} {S[0]["ampm"]}', S[0]['bn'], f'{S[0]["en"]} · darshan opens', (S[0]['start'], S[0]['end'])),
            (f'{S[2]["time"]} {S[2]["ampm"]}', S[2]['bn'], 'Anna-daan prasad, free for every visitor, till 2 PM', (S[2]['start'], S[2]['end'])),
            ('5:30 PM', 'হালকা খাবার', 'A light meal, as on every festival day', (17 * 60 + 30, None)),
            (f'{S[3]["time"]} {S[3]["ampm"]}', S[3]['bn'], S[3]['en'], (S[3]['start'], S[3]['end']))]
    if night:   # Ekadashi, Purnima, Amavasya: extended hours, kirtan through the night (FACTS)
        rows.append(('Night', 'রাতভর কীর্তন', 'Amavasya: kirtan through the night', None))
    else:
        rows.append((fmt(close), 'দর্শন শেষ', 'Darshan closes' + (' (Sat–Sun)' if wk >= 5 else ''), (close, None)))
    return rows


def announced(ctx):
    """Where the Puja timings come from (the seva desk's hours: site.json, 'Seva desk 8 AM – 6 PM', open daily)."""
    c = ctx.data['contact']
    hours = c['seva_desk'].replace('Seva desk ', '').replace(' – ', '–')     # time ranges as 8 AM–6 PM, like 12:30–2 PM
    return (f'<p class="dur-sheet__call">Each day’s puja timings are announced at the mandir. Call the seva desk on '
            f'<a class="u nowrap" href="tel:{c["phone_e164"]}">{c["phone"]}</a> ({hours} daily).</p>')


def sheet(ctx, key, iso_list, label_en, lead, puja_rows, night=False):
    first = iso_list[0]
    dates = ' and '.join(date_en(i) for i in iso_list) + ' ' + str(d_of(first).year)
    hid = '' if key == DEFAULT_OPEN else ' hidden'
    timed = (f'<p class="dur-sheet__h"><span lang="bn">পুজো</span>{caps("The Puja")}</p>{sheet_rows(puja_rows)}') if puja_rows else ''
    return (f'<div class="dur-sheet" id="dur-sheet-{key}" role="region" aria-labelledby="dur-btn-{key}"{hid}>'
            f'<div class="dur-sheet__col"><div class="dur-sheet__intro"><p class="dur-sheet__k">{caps(label_en + " · " + dates)}'
            f'<span class="dur-sheet__today" lang="bn" hidden>আজ · Today</span></p>'
            f'<p class="dur-sheet__lead">{lead}</p></div>{timed}{announced(ctx)}</div>'
            f'<div class="dur-sheet__col"><p class="dur-sheet__h"><span lang="bn">রোজকার সূচি</span>{caps("The usual day")}</p>'
            f'{sheet_rows(everyday_rows(ctx, first, night))}</div></div>')


def band(label_bn, label_en, value, small=''):
    sm = f'<span class="dur-day__bs">{small}</span>' if small else ''
    return (f'<div class="dur-day__band"><span class="dur-day__bl"><span class="dur-day__blb" lang="bn">{label_bn}</span>'
            f'<span class="dur-day__ble">{label_en}</span></span><span class="dur-day__bv">{value}</span>{sm}</div>')


def toggle_mark():
    return '<span class="dur-day__tog" aria-hidden="true"></span>'


def day_card(ctx, key, dates, n, bn_name, en_name, sub_en, rbn, ren, art_html, band_html, panel=None, busy=False, extra=None, prelude=False):
    is_open = key == DEFAULT_OPEN
    cls = 'dur-day' + (' dur-day--pre' if prelude else '') + (' dur-day--x' if extra else '') + (' dur-day--open' if is_open else '')
    tags = ''
    if busy:
        tags += ('<span class="dur-day__tag" data-dur-tag="busy"><span lang="bn">ভিড় বেশি</span>'
                 '<span class="dur-day__tagdot" aria-hidden="true"></span><span class="dur-day__tage">Usually busy</span></span>')
    tags += ('<span class="dur-day__tag dur-day__tag--today" data-dur-tag="today" hidden><span lang="bn">আজ</span>'
             '<span class="dur-day__tagdot" aria-hidden="true"></span><span class="dur-day__tage">Today</span></span>')
    ex = ''
    if extra:
        ex = f'<p class="dur-day__extra"><span lang="bn">{extra[0]}</span><span class="dur-day__exe">{extra[1]}</span></p>'
    pv = f' style="--panel: var(--{panel});"' if panel else ''
    name = bn_name.replace(' ', '<br>')
    head = (f'<p class="dur-day__date">{caps("Prelude", "dur-day__pre") if prelude else ""}<span class="dur-day__db" lang="bn">{date_bn(dates[0])}</span>'
            f'<span class="dur-day__de">{sub_en}</span></p>')
    return (f'<article class="{cls}" id="dur-day-{key}" data-dur-day="{key}" data-dates="{" ".join(dates)}" data-sheet="dur-sheet-{key}"{pv}>{tags}{head}'
            f'<div class="dur-day__art">{art_html}{toggle_mark()}</div>'
            f'<h3 class="dur-day__h"><button class="dur-day__btn" type="button" id="dur-btn-{key}" aria-expanded="{"true" if is_open else "false"}" aria-controls="dur-sheet-{key}">'
            f'<span class="dur-day__bn" lang="bn">{name}</span><span class="dur-day__en">{en_name}</span></button></h3>'
            f'<p class="dur-day__rite"><span class="dur-day__rb" lang="bn">{rbn}</span><span class="dur-day__re">{ren}</span></p>{ex}'
            f'<span class="dur-day__sp" aria-hidden="true"></span>{band_html}</article>')


def days_section(ctx):
    mh = ui.festival(ctx, 'mahalaya')
    groups = day_groups(ctx)
    out = []
    # the prelude: Mahalaya (an Amavasya: kirtan through the night, as on every Amavasya)
    m_iso = mh['start']
    night = m_iso in ctx.data['tithi_nights']['dates']
    img = f'<img src="{ctx.img("dur-day-mahalaya.svg")}" alt="" width="120" height="130" loading="lazy" decoding="async">'
    S3 = ctx.data['schedule'][3]                       # the evening arati, every day
    arati = band('সন্ধ্যা আরতি', 'Every evening', f'{S3["time"]}<small>{S3["ampm"]}</small>')
    out.append(day_card(ctx, 'mahalaya', [m_iso], 0, mh['bn'], mh['en'], date_en(m_iso), 'দেবীপক্ষের সূচনা',
                        'Devi Paksha begins.' + (' Amavasya: kirtan through the night.' if night else ''), img,
                        arati, prelude=True))
    sheets = [sheet(ctx, 'mahalaya', [m_iso], 'Mahalaya · prelude',
                    f'Mahalaya opens Devi Paksha, {words((d_of(groups[0][2][0]) - d_of(m_iso)).days)} days before Shashthi.'
                    + (' It falls on Amavasya, so the mandir keeps kirtan going through the night.' if night else ''),
                    [], night=night)]
    for i, ((en_name, bn_name, dates), D) in enumerate(zip(groups, DAYS)):
        n = i + 1
        img = f'<img src="{ctx.img("dur-day-" + D["k"] + ".svg")}" alt="" width="200" height="160" loading="lazy" decoding="async">'
        if D.get('busy'):
            b = band('সন্ধিপূজা', 'Sandhi Puja', f'{fmt(SANDHI["start"])[:-3]}–{fmt(SANDHI["end"])[:-3]}<small>AM</small>', 'Benimadhab Shil panjika')
        else:
            b = arati
        out.append(day_card(ctx, D['k'], dates, n, bn_name, en_name, f'{date_en(dates[0])} · Day {n}', D['rbn'], D['ren'], img, b,
                            panel=D['panel'], busy=D.get('busy'), extra=D.get('extra')))
        sheets.append(sheet(ctx, D['k'], dates, f'{en_name} · day {n} of {len(groups)}', D['lead'], D['puja']))
    grid = ''.join(c + s for c, s in zip(out, sheets))
    aside = ('<p class="live dur-status"><span class="live__dot" aria-hidden="true"></span><span data-dur-status>'
             f'Shashthi is on {date_en(groups[0][2][0])}</span></p>'
             '<p>Dates from the Benimadhab Shil panjika. Saptami continues into Sun 18 Oct, so Mahashtami falls on Monday.</p>')
    hint = ('<p class="dur-days__hint"><span lang="bn">দিনের সূচি দেখতে একটি দিন বেছে নিন</span>'
            f'{caps("Choose a day for its timings")}</p>')
    return section(sec_head('পাঁচ দিনের পুজো', 'The five days · Shashthi to Bijoya Dashami', aside, hid='days-h')
                   + f'<div class="dur-days-wrap">{hint}<div class="dur-days" data-dur-days>{grid}</div>'
                   '<script>window.TMM_DUR&&TMM_DUR.days(document.currentScript.previousElementSibling)</script></div>',
                   'shola', sid='days', labelledby='days-h')


# ---------------------------------------------------------------- Sandhi Puja
def sandhi_section(ctx):
    ctx.add_img('dur-sandhi.svg', sandhi_art())
    a, b = fmt(SANDHI['start']), fmt(SANDHI['end'])
    mins = SANDHI['end'] - SANDHI['start']
    day = date_en(SANDHI['date'])
    live = (f'<p class="dur-sandhi__live" data-dur-sandhi data-date="{SANDHI["date"]}" data-start="{SANDHI["start"]}" data-end="{SANDHI["end"]}" data-day="{day}">'
            f'<span class="dur-sandhi__dot" aria-hidden="true"></span><span class="dur-sandhi__lb" lang="bn" data-dur-sandhi-bn>সোমবার সকালে</span>'
            f'<span class="dur-sandhi__le" data-dur-sandhi-en>Mahashtami morning, {day}</span></p>')
    body = (f'<div class="dur-sandhi"><div class="dur-sandhi__t">'
            f'<p class="dur-sandhi__time"><span>{a[:-3]}–{b[:-3]}</span><small>AM</small></p>'
            f'<p class="dur-sandhi__bn" lang="bn">অষ্টমী আর নবমীর সন্ধিক্ষণের {bn(mins)} মিনিট</p>'
            f'<p class="dur-sandhi__en">The {mins} minutes when Ashtami ends and Navami begins, on the morning of Mahashtami.</p>'
            f'{live}'
            f'<p class="dur-sandhi__src">The time is from the Benimadhab Shil panjika.</p>'
            + ui.note(f'Another panjika gives {SANDHI["other"]} for Sandhi Puja. The page uses the Benimadhab Shil time.', 'p')
            + '</div>'
            f'<div class="dur-sandhi__art"><img src="{ctx.img("dur-sandhi.svg")}" alt="" width="480" height="400" loading="lazy" decoding="async"></div></div>')
    return section(sec_head('সন্ধিপূজা', f'Sandhi Puja · Mahashtami, {day}', hid='sandhi-h') + body, 'neel', sid='sandhi', labelledby='sandhi-h')


# ---------------------------------------------------------------- bhog seva
# The seva form (pages/seva.py, #seva-form) opens with the seva chosen (src/js/58-seva.js): ?seva=festival takes its listed
# ₹5,001; the Khichuri seva is not on its list, so it comes as "another seva" with its name and amount.
SEVA_FESTIVAL = 'seva?seva=festival#seva-form'
SEVA_KHICHURI = 'seva?seva=other&which=Khichuri%20seva&amount=1001#seva-form'


def seva_section(ctx):
    ctx.add_img('dur-seva.svg', seva_art())
    P = ctx.data['payment']
    feature = (f'<div class="dur-seva__feature"><img class="dur-seva__art" src="{ctx.img("dur-seva.svg")}" alt="" width="340" height="256" loading="lazy" decoding="async">'
               f'<p class="dur-seva__h" lang="bn">পুজোর ভোগ, মাটির হাঁড়িতে</p>'
               f'<p class="dur-seva__p">Sattvic, onion-free bhog, cooked in the terracotta handis of the mandir kitchen. '
               f'Anna-daan prasad stays free for every visitor, from 12:30 PM.</p>'
               f'<p class="dur-seva__small">{P["methods"]} · {P["receipt"].lower()} · {P["tax"]}</p></div>')
    cards = [dict(amount='₹5,001', bn='উৎসবের অন্নদান', en='Festival anna-daan', accent='sindoor', form=SEVA_FESTIVAL,
                  desc='Bhog for about 400 devotees during the Puja, cooked in the mandir’s terracotta handis.'),
             dict(amount='₹1,001', bn='খিচুড়ি সেবা', en='Khichuri seva', accent='haldi', form=SEVA_KHICHURI,
                  desc='Bhog khichuri for about 75 devotees.')]
    cs = ''.join(ui.seva_card(ctx, c, key=c['form']) for c in cards)
    head = sec_head('পুজোর সেবা', 'Puja seva · bhog and anna-daan',
                    btn(ctx, 'Book a bhog seva' + arrow(16), SEVA_FESTIVAL, 'haldi', cls='btn--sm'), hid='seva-h')
    note = ui.note('These amounts are from the bhog page of the current website, which gives seva amounts three different ways.', 'p')
    return section(head + f'<div class="dur-seva">{feature}<div class="dur-seva__cards">{cs}</div></div>' + note,
                   'kajal', sid='seva', labelledby='seva-h')


# ---------------------------------------------------------------- coming for the Puja
def tips_section(ctx):
    yt = dict(ctx.data['contact']['social'])['YouTube']
    tips = [('early', 'অষ্টমীর সকাল', 'Usually busy: come early',     # the Sandhi time is on the Mahashtami card and in #sandhi
             f'Pushpanjali and Sandhi Puja are on Mahashtami morning, {date_en(SANDHI["date"])}.', -.8),
            ('dress', 'পোশাক', 'Dress code', 'Shoulders and knees covered. No leather in the garbhagriha. Phones on silent, and no flash during arati.', .6),
            ('care', 'পুজোর দিনে', 'On festival days', 'First aid during the festival. Drinking water and restrooms near the anna-daan hall, '
             'lockers for small bags by the eastern entrance, and wheelchair access from the eastern gate.', -.5),
            ('watch', 'আসতে পারছেন না?', 'Can’t come?',      # the channel exists; nothing says the Puja is streamed (FACTS)
             f'<a class="u" href="{yt}" rel="noopener" target="_blank">Follow the mandir on YouTube</a>', .7)]
    cards = ''.join(f'<article class="dur-tip" style="--rot: {r}deg;">{tip_icon(k)}<div class="dur-tip__t"><h3 class="dur-tip__h" lang="bn">{b}</h3>'
                    f'<p class="dur-tip__en">{e}</p><p class="dur-tip__p">{p}</p></div></article>' for k, b, e, p, r in tips)
    aside = f'<div class="btns">{btn(ctx, "Plan your visit" + arrow(16), "visit", "kajal", cls="btn--sm")}</div>'
    return section(sec_head('পুজোয় আসছেন?', 'Coming for Puja?', aside, hid='tips-h') + f'<div class="dur-tips">{cards}</div>',
                   'haldi', sid='coming', labelledby='tips-h')


# ---------------------------------------------------------------- what comes next
def cal_item(f):
    """One festival in running text (src/js/56-durga.js writes the same words for later dates)."""
    name = f['en'].split(' · ')[0]
    moon = ', a full-moon night' if f.get('moon') == 'full' else (', an Amavasya night' if f.get('moon') == 'new' else '')
    return name + (' on ' if f['start'] == f['end'] else ', ') + f['date_en'] + (' (date to be confirmed)' if f.get('confirm') else '') + moon


def cal_list(items):
    return items[0] if len(items) == 1 else '; '.join(items[:-1]) + '; and ' + items[-1]


def next_section(ctx):
    fe = ui.festival(ctx, 'durga')
    after = [f for f in ctx.data['festivals'] if f['id'] != 'durga' and f['start'] > fe['end']]
    posters = ''
    for k, fid in enumerate(NEXT_IDS):
        f = ui.festival(ctx, fid)
        p = ui.poster(ctx, fid)
        p = p.replace('<a class="poster"', f'<a class="poster dur-next__poster" data-dur-next data-start="{f["start"]}" data-end="{f["end"]}"'
                      + ('' if k < 2 else ' hidden'), 1)
        posters += p
    cal = (f'<a class="dur-cal" href="{ctx.href("festivals")}"><span class="dur-cal__top">{caps("Full calendar", "dur-cal__k")}'
           f'<span class="dur-cal__h" lang="bn">বারো মাসে তেরো পার্বণ</span></span>'
           f'<span class="dur-cal__bot"><span class="dur-cal__p">Every festival from Ashwin 1433 to Bhadra 1434, month by month.</span>'
           f'<span class="dur-cal__btn">Open the calendar{arrow(16)}</span></span></a>')
    line = cal_list([cal_item(f) for f in after[:3]]) + '.'
    return section(f'<div class="dur-next"><div class="dur-next__t"><h2 class="dur-next__h" lang="bn" id="next-h">এরপর</h2>'
                   f'<p class="dur-next__en">After Puja · next on the calendar</p><p class="dur-next__p" data-dur-next-line>{line}</p></div>'
                   f'<div class="dur-next__row" data-scroll>{posters}{cal}</div></div>', 'sindoor', sid='next', labelledby='next-h')


# ---------------------------------------------------------------- structured data
def json_ld(ctx):
    c, s = ctx.data['contact'], ctx.data['site']
    fe = ui.festival(ctx, 'durga')
    y = d_of(fe['start']).year
    place = {'@type': 'HinduTemple', 'name': s['name_en'], 'url': s['domain'] + '/',
             'address': {'@type': 'PostalAddress', 'streetAddress': c['street'], 'addressLocality': c['locality'],
                         'addressRegion': c['region'], 'postalCode': c['postcode'], 'addressCountry': c['country']},
             'geo': {'@type': 'GeoCoordinates', 'latitude': c['geo'][0], 'longitude': c['geo'][1]}, 'hasMap': c['map_url']}
    first, last = fe['days'][0], fe['days'][-1]
    return [{
        '@context': 'https://schema.org', '@type': 'Event', 'name': f'Durga Puja {y} at {s["name_en"]}',
        'alternateName': f'দুর্গাপূজা {bn(y)}',
        'description': f'Durga Puja at {s["name_en"]}, {s["place_en"]}: {first["en"]} on {date_en(first["date"])} to {last["en"]} '
                       f'on {date_en(last["date"], True)}, by the Benimadhab Shil panjika. Anna-daan prasad is free for every visitor.',
        'startDate': fe['start'], 'endDate': fe['end'],
        'eventStatus': 'https://schema.org/EventScheduled', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'location': place, 'url': ctx.url('durga'),
        'organizer': {'@type': 'Organization', 'name': s['name_en'], 'url': s['domain'] + '/', 'telephone': c['phone_e164'], 'email': c['email']}}]


def render(ctx):
    PAGE['head_script'] = head_script(ctx)
    PAGE['json_ld'] = json_ld(ctx)
    for k in ('mahalaya',) + tuple(D['k'] for D in DAYS):
        view = (0, 0, 120, 130) if k == 'mahalaya' else (0, 0, 200, 160)
        ctx.add_img(f'dur-day-{k}.svg', art.svg_doc(view, day_art(k)))
    return (f'<div class="dur-page dur-s-coming" data-dur-root data-dur-open="{DEFAULT_OPEN}"><script>window.TMM_DUR&&TMM_DUR.mark(document.currentScript.parentNode)</script>'
            + first_screen(ctx) + days_section(ctx) + sandhi_section(ctx) + seva_section(ctx) + tips_section(ctx)
            + next_section(ctx) + '</div>')
