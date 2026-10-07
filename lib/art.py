"""SVG artwork for the website, ported from the Utsav design files.
Every function returns SVG markup. Hero and poster art is written out as separate .svg files at build time
(see build.py); small art that carries text or must follow the page colours is inlined."""
import math
from .motifs import f, horse_flat, dhak, kash, shiuli, joba, wheel, trishul  # noqa: F401
from . import byear as BY

SINDOOR = '#CC3018'; HALDI = '#F7B519'; SHOLA = '#FFF6E6'; KAJAL = '#16100C'; NEEL = '#1F2C7A'
PEACOCK = '#0E8C7E'; PEACOCK_D = '#0B6B63'; JOBA = '#E8261E'; SLATE = '#24324A'; ASH = '#34465A'; ABIR = '#D81B60'
PAPER2 = '#F6EBD6'; MUTED = '#4A3B30'


def svg_doc(view, inner, defs='', w=None, h=None):
    """A standalone SVG file (for <img src>)."""
    vb = ' '.join(f(v) for v in view)
    d = f'<defs>{defs}</defs>' if defs else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{f(w or view[2])}" height="{f(h or view[3])}">'
            f'{d}{inner}</svg>\n')


# ---------------------------------------------------------------- the mark: three streams, one mangal ghot
GHOT_STREAMS = '<path d="M19,1 C19,12 29,16 30.5,25"/><path d="M32,0 L32,25"/><path d="M45,1 C45,12 35,16 33.5,25"/>'


def ghot_mark(cls='ghot', size=50, label=None):
    """Inline mark whose colours come from CSS custom properties (--g-body, --g-water ...), so it follows the tone it sits on."""
    a = f' role="img" aria-label="{label}"' if label else ' aria-hidden="true"'
    return (f'<svg class="{cls}" width="{size}" height="{size}" viewBox="-2 -2 68 68"{a} focusable="false">'
            f'<g class="ghot__under" fill="none" stroke-width="5.4" stroke-linecap="round">{GHOT_STREAMS}</g>'
            f'<g class="ghot__water" fill="none" stroke-width="2.8" stroke-linecap="round">{GHOT_STREAMS}</g>'
            '<g class="ghot__line" stroke-width="1.8" stroke-linejoin="round">'
            '<path class="ghot__leaf" d="M32,28 C25,22 18,20 12,21.5 C18,25 25,27 32,28 Z"/><path class="ghot__leaf" d="M32,28 C39,22 46,20 52,21.5 C46,25 39,27 32,28 Z"/>'
            '<path class="ghot__body" d="M25.5,32 C13,35 8,45 11.5,53 C15,61.5 49,61.5 52.5,53 C56,45 51,35 38.5,32 Z"/>'
            '<path class="ghot__body" d="M23.5,26.5 L40.5,26.5 L38.5,32 L25.5,32 Z"/><ellipse class="ghot__body" cx="32" cy="26.5" rx="10.5" ry="2.8"/></g>'
            '<path class="ghot__band" d="M13.5,46 C24,50.5 40,50.5 50.5,46" fill="none" stroke-width="2.2"/>'
            '<g class="ghot__dot"><circle cx="26" cy="41" r="1.9"/><circle cx="32" cy="40" r="1.9"/><circle cx="38" cy="41" r="1.9"/></g></svg>')


def ghot_file(dark=False, size=64):
    """Standalone mark with fixed colours (favicon, share images)."""
    body, water, leaf, band, dots = (HALDI, SHOLA, PEACOCK, SINDOOR, KAJAL) if dark else (SINDOOR, NEEL, PEACOCK, SHOLA, KAJAL)
    o = f' stroke="{KAJAL}" stroke-width="1.8" stroke-linejoin="round"'
    under = f'<g fill="none" stroke="{KAJAL}" stroke-width="5.4" stroke-linecap="round">{GHOT_STREAMS}</g>' if dark else ''
    inner = (under + f'<g fill="none" stroke="{water}" stroke-width="2.8" stroke-linecap="round">{GHOT_STREAMS}</g>'
             f'<path d="M32,28 C25,22 18,20 12,21.5 C18,25 25,27 32,28 Z" fill="{leaf}"{o}/><path d="M32,28 C39,22 46,20 52,21.5 C46,25 39,27 32,28 Z" fill="{leaf}"{o}/>'
             f'<path d="M25.5,32 C13,35 8,45 11.5,53 C15,61.5 49,61.5 52.5,53 C56,45 51,35 38.5,32 Z" fill="{body}"{o}/>'
             f'<path d="M23.5,26.5 L40.5,26.5 L38.5,32 L25.5,32 Z" fill="{body}"{o}/><ellipse cx="32" cy="26.5" rx="10.5" ry="2.8" fill="{body}"{o}/>'
             f'<path d="M13.5,46 C24,50.5 40,50.5 50.5,46" fill="none" stroke="{band}" stroke-width="2.2"/>'
             f'<circle cx="26" cy="41" r="1.9" fill="{dots}"/><circle cx="32" cy="40" r="1.9" fill="{dots}"/><circle cx="38" cy="41" r="1.9" fill="{dots}"/>')
    return svg_doc((-2, -2, 68, 68), inner, w=size, h=size)


# ---------------------------------------------------------------- textures
def sun(pid, cx, cy, r, fill, dots):
    """Halftone sun: returns (defs, shapes)."""
    defs = (f'<pattern id="{pid}D" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="3.6" fill="{dots}"/></pattern>'
            f'<radialGradient id="{pid}G" cx=".5" cy=".5" r=".5"><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>'
            f'<mask id="{pid}M"><circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="url(#{pid}G)"/></mask>')
    return defs, (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{fill}"/>'
                  f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="url(#{pid}D)" mask="url(#{pid}M)"/>')


def grain_tile(size=320):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">'
            '<filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="4" stitchTiles="stitch"/>'
            '<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.05"/></filter>'
            f'<rect width="{size}" height="{size}" filter="url(#n)"/></svg>\n')


# ---------------------------------------------------------------- homepage first screens (drawn on the 1440 x 900 board)
HERO_SPEC = {'durga': 'durga', 'kali': 'kali', 'shivaratri': 'shiva', 'dol': 'dol', 'rath': 'rath', 'janmashtami': 'janma'}
# what each file shows, in board coordinates: desktop = right-hand art column; phone = a tighter crop around the sun
HERO_VIEW = (560, 0, 1080, 836)   # 200 units past the board's right edge show on screens wider than 1440 px
HERO_VIEW_M = {'evergreen': (716, 64, 690, 772), '_': (716, 100, 724, 700)}


def ghot_poster(cx, base, S=7.2):
    """The mark drawn as a poster: haldi ghot with sindoor band, kajal outlines, three dhara-coloured streams carrying bel, tulsi and joba."""
    sw = 3.6 / S
    tx = cx - 32 * S
    ty = base - 60 * S
    pot = (f'<g transform="translate({tx:.1f},{ty:.1f}) scale({S})" stroke="{KAJAL}" stroke-width="{sw:.3f}" stroke-linejoin="round">'
           f'<path d="M32,28 C25,22 18,20 12,21.5 C18,25 25,27 32,28 Z" fill="{PEACOCK}"/><path d="M32,28 C39,22 46,20 52,21.5 C46,25 39,27 32,28 Z" fill="{PEACOCK}"/>'
           f'<path d="M25.5,32 C13,35 8,45 11.5,53 C15,61.5 49,61.5 52.5,53 C56,45 51,35 38.5,32 Z" fill="{HALDI}"/>'
           f'<path d="M23.5,26.5 L40.5,26.5 L38.5,32 L25.5,32 Z" fill="{HALDI}"/><ellipse cx="32" cy="26.5" rx="10.5" ry="2.8" fill="{HALDI}"/>'
           f'<path d="M13.5,46 C24,50.5 40,50.5 50.5,46" fill="none" stroke="{SINDOOR}" stroke-width="2.4"/>'
           f'<path d="M14.2,50 C24,54 40,54 49.8,50" fill="none" stroke="{KAJAL}" stroke-width=".5"/>'
           + ''.join(f'<circle cx="{x}" cy="{y}" r="2" fill="{SINDOOR}"/>' for x, y in ((26, 41), (32, 40), (38, 41)))
           + '</g>')
    mouth_y = ty + 25 * S
    streams = ''
    for x0, col, dx in ((cx - 230, SLATE, -1), (cx, NEEL, 0), (cx + 230, SINDOOR, 1)):
        xm = cx + dx * 26
        d = f'M{x0},150 C{x0},{150 + (mouth_y - 150) * .45:.0f} {xm + dx * 60},{150 + (mouth_y - 150) * .62:.0f} {xm},{mouth_y + 4:.0f}'
        streams += (f'<path d="{d}" fill="none" stroke="{KAJAL}" stroke-width="40" stroke-linecap="round"/>'
                    f'<path d="{d}" fill="none" stroke="{col}" stroke-width="30" stroke-linecap="round"/>'
                    f'<path d="{d}" fill="none" stroke="{SHOLA}" stroke-width="4" stroke-dasharray="18 26" stroke-linecap="round" opacity=".55"/>')
    offers = f'<g transform="translate({cx - 230},150) rotate(-18) scale(.62)">{BY.bel(0, 0, 1, 0)}</g>'
    offers += (f'<g transform="translate({cx},146)">' + ''.join(
        f'<ellipse cx="{x}" cy="{y}" rx="11" ry="18" transform="rotate({r} {x} {y})" fill="#4E8F3A" stroke="{KAJAL}" stroke-width="3.5"/>'
        for x, y, r in ((-15, 0, -30), (15, 0, 30), (-12, -26, -20), (12, -26, 20), (0, -48, 0))) + f'<path d="M0,16 L0,-58" stroke="{KAJAL}" stroke-width="4"/></g>')
    offers += f'<g transform="translate({cx + 230},146) rotate(14) scale(.44)">{joba(fill=JOBA, stroke=KAJAL)}</g>'
    return streams + pot + offers


def hero_art(hid):
    """(defs, shapes) for a homepage first screen, in 1440 x 900 board coordinates."""
    if hid == 'evergreen':
        d, s = sun('evS', 1060, 540, 320, HALDI, SINDOOR)
        return d, s + ghot_poster(1060, 812, 6.6)
    spec = next(x for x in BY.SPECS if x['id'] == HERO_SPEC[hid])
    p = spec['id']
    d, s = sun(p + 'S', 1080, 430, 300, spec['sun'], spec['dots'])
    d += f'<filter id="{p}Soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>'
    art = spec['art'] if spec['art'] is not None else BY.durga_art(p)
    return d, s + art


def hero_files(hid):
    """{'hero-<id>.svg': desktop file, 'hero-<id>-m.svg': phone file}."""
    d, s = hero_art(hid)
    m = HERO_VIEW_M.get(hid, HERO_VIEW_M['_'])
    return {f'hero-{hid}.svg': svg_doc(HERO_VIEW, s, d), f'hero-{hid}-m.svg': svg_doc(m, s, d)}


# ---------------------------------------------------------------- festival posters (203 x 196)
def poster_art(kind):
    if kind == 'durga':
        return (f'<circle cx="104" cy="92" r="72" fill="{HALDI}"/>'
                f'<g transform="translate(150,196) scale(.42) rotate(4)">{kash()}</g><g transform="translate(176,196) scale(.36) rotate(10)">{kash()}</g><g transform="translate(40,196) scale(.38) rotate(-8)">{kash(lean=-1)}</g>'
                + shiuli(30, 26, .9, 10) + shiuli(180, 30, .8, 40) + shiuli(64, 170, .7, 20))
    if kind == 'kali':
        return f'<g transform="translate(101,96) scale(.86)">{joba(fill=JOBA, stroke="#0A0705")}</g>'
    if kind == 'rash':
        return f'<circle cx="112" cy="84" r="70" fill="{SHOLA}"/><g transform="translate(96,190) rotate(-14) scale(.36)">{BY.feather_c(470)}</g>'
    if kind == 'shiva':
        return (f'<path d="M150,30 A58,58 0 1 0 150,146 A76,76 0 0 1 150,30 Z" fill="{SHOLA}"/>'
                f'<g transform="translate(40,4) scale(.44)" style="color: {SHOLA};">{trishul(5)}</g>')
    if kind == 'rath':
        return f'<g transform="translate(101,94) scale(.86)">{wheel()}</g>'
    if kind == 'dol':
        return ('<defs><filter id="psDol" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter></defs>'
                f'<g filter="url(#psDol)">{BY.blob(70, 70, 46, 3, "#2E9E5B", .95)}{BY.blob(150, 120, 50, 5, "#6A1B9A", .9)}{BY.blob(70, 160, 40, 9, HALDI, .95)}</g>'
                f'<g transform="translate(110,100) rotate(-28) scale(.4)">{BY.flute_c(480)}</g>')
    if kind == 'lakshmi':
        return (f'<circle cx="102" cy="92" r="72" fill="{SHOLA}"/>'
                + ''.join(f'<circle cx="{f(102 + 52 * math.cos(a / 57.3))}" cy="{f(92 + 52 * math.sin(a / 57.3))}" r="7" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2"/>' for a in range(0, 360, 30))
                + f'<g transform="translate(48,150) scale(.62)">{BY.diya(60, 0, 1)}</g>')
    if kind == 'saraswati':
        return (f'<circle cx="102" cy="92" r="72" fill="{SHOLA}"/>'
                f'<g transform="translate(102,100)"><path d="M-60,30 C-40,-40 40,-40 60,30" fill="none" stroke="{KAJAL}" stroke-width="6"/>'
                + ''.join(f'<path d="M{x},-6 L{x},40" stroke="{KAJAL}" stroke-width="2"/>' for x in range(-40, 50, 16)) + '</g>')
    if kind == 'janmashtami':
        return (f'<circle cx="104" cy="88" r="70" fill="#F4E9C8"/><g transform="translate(150,196) rotate(14) scale(.36)">{BY.feather_c(470)}</g>'
                f'<g transform="translate(100,104) rotate(-30) scale(.36)">{BY.flute_c(480)}</g>')
    return ''


POSTER_KINDS = ('durga', 'kali', 'rash', 'shiva', 'rath', 'dol', 'lakshmi', 'saraswati', 'janmashtami')


def poster_file(kind):
    return svg_doc((0, 0, 203, 196), poster_art(kind))


# ---------------------------------------------------------------- the three dharas (344 x 270)
def dhara_art(kind):
    if kind == 'shaiva':
        return (f'<path d="M262,24 A70,70 0 1 0 262,164 A92,92 0 0 1 262,24 Z" fill="{SHOLA}"/>'
                f'<g transform="translate(110,6) scale(.6)" style="color: {SHOLA};">{trishul(7)}</g>' + BY.bel(70, 236, .62, -16) + BY.bel(290, 240, .55, 18))
    if kind == 'vaishnava':
        return (f'<circle cx="172" cy="128" r="104" fill="#F4E9C8"/><g transform="translate(206,262) rotate(14) scale(.62)">{BY.feather_c(470)}</g>'
                f'<g transform="translate(168,148) rotate(-30) scale(.62)">{BY.flute_c(480)}</g>')
    if kind == 'shakta':
        return (f'<circle cx="172" cy="122" r="104" fill="#7E1A12"/><g transform="translate(172,120) scale(1.05)">{joba(fill=JOBA, stroke="#0A0705")}</g>'
                + ''.join(BY.diya(x, 236, .55) for x in (70, 172, 274)))
    return ''


def dhara_file(kind):
    return svg_doc((0, 0, 344, 270), dhara_art(kind))


# ---------------------------------------------------------------- small inline art
def shikhara(x, y, s=1, fill=SINDOOR, line=KAJAL):
    """Small Nagara temple marker, base centre at (x, y)."""
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})">'
            f'<rect x="-34" y="-22" width="68" height="22" fill="{fill}" stroke="{line}" stroke-width="3"/>'
            f'<path d="M-26,-22 C-26,-60 -12,-86 0,-98 C12,-86 26,-60 26,-22 Z" fill="{fill}" stroke="{line}" stroke-width="3"/>'
            f'<path d="M-18,-40 L18,-40 M-14,-58 L14,-58 M-8,-76 L8,-76" stroke="{line}" stroke-width="2"/>'
            f'<ellipse cx="0" cy="-101" rx="10" ry="4" fill="{fill}" stroke="{line}" stroke-width="2.5"/>'
            f'<path d="M0,-105 L0,-126" stroke="{line}" stroke-width="2.5"/><path d="M0,-126 L18,-121 L0,-116 Z" fill="{HALDI}" stroke="{line}" stroke-width="2"/>'
            f'<path d="M-9,0 L-9,-12 A9,9 0 0 1 9,-12 L9,0" fill="{line}"/></g>')


def icon_trishul():
    return f'<svg class="ic ic--trishul" width="40" height="56" viewBox="0 0 200 420" aria-hidden="true" focusable="false">{trishul(14)}</svg>'


def icon_chakra():
    sp = ''.join(f'<path d="M0,-8 L0,-26" transform="rotate({a})" stroke="currentColor" stroke-width="4"/>' for a in range(0, 360, 45))
    teeth = ''.join(f'<path d="M-4,-30 L0,-37 L4,-30 Z" transform="rotate({a})" fill="currentColor"/>' for a in range(0, 360, 30))
    return (f'<svg class="ic" width="56" height="56" viewBox="-40 -40 80 80" aria-hidden="true" focusable="false">'
            f'<circle r="28" fill="none" stroke="currentColor" stroke-width="5"/>{sp}{teeth}<circle r="7" fill="currentColor"/></svg>')


def icon_shankha():
    return ('<svg class="ic" width="60" height="56" viewBox="0 0 64 60" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">'
            '<path d="M8,40 C2,30 6,14 20,9 C34,4 50,10 56,22 C60,32 54,40 46,42 L28,50 C20,54 12,48 8,40 Z"/>'
            '<path d="M20,24 C26,18 36,18 40,24 C44,30 38,36 32,34 C28,33 28,28 32,27"/><path d="M46,42 L58,50"/></g></svg>')


def arrow(size=18):
    return (f'<svg class="arrow" width="{size}" height="{size}" viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
            '<path d="M3 10h13M11 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg>')


def icon_menu():
    return ('<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" focusable="false"><path d="M3 6h20M3 13h20M3 20h20" stroke="currentColor" stroke-width="3"/></svg>')


def icon_close():
    return ('<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" focusable="false"><path d="M5 5l16 16M21 5L5 21" stroke="currentColor" stroke-width="3"/></svg>')


def icon_play():
    return '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M2 1l11 6-11 6z" fill="currentColor"/></svg>'


def route_map(label='Route from Kolkata to Panchmura by way of Bishnupur: about 180 km, 4 hours by road'):
    """Kolkata → Bishnupur → Panchmura, a poster map. Inline (its labels use the page fonts)."""
    road = 'M70,96 C190,84 228,178 326,200 C386,214 404,238 428,250 C486,280 526,302 566,334 C592,352 604,358 626,362'
    trees = ''.join(f'<g transform="translate({x},{y})"><path d="M0,0 L0,18" stroke="{KAJAL}" stroke-width="3"/><circle cx="0" cy="-6" r="13" fill="#3E9C8F" stroke="{KAJAL}" stroke-width="3"/></g>'
                    for x, y in ((150, 190), (250, 120), (500, 200), (680, 300), (300, 330), (90, 300)))
    car = (f'<g transform="translate(150,96) rotate(8)"><rect x="-26" y="-14" width="52" height="20" rx="5" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3"/>'
           f'<path d="M-14,-14 L-8,-26 L12,-26 L18,-14" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/><circle cx="-14" cy="8" r="6" fill="{KAJAL}"/><circle cx="14" cy="8" r="6" fill="{KAJAL}"/></g>')
    train = (f'<g transform="translate(470,214)"><rect x="-30" y="-18" width="60" height="26" rx="4" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
             f'<rect x="-22" y="-12" width="12" height="9" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2"/><rect x="-4" y="-12" width="12" height="9" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2"/>'
             f'<circle cx="-16" cy="12" r="6" fill="{KAJAL}"/><circle cx="16" cy="12" r="6" fill="{KAJAL}"/><path d="M-40,22 L40,22" stroke="{KAJAL}" stroke-width="3"/></g>')

    def lab(x, y, bn, en, size=34, color=SHOLA, anchor='start'):
        en_y = y + 22 + max(0, size - 34) // 2     # a bigger Bengali name drops further (the dot under ড়): keep the English clear of it
        return (f'<text x="{x}" y="{y}" text-anchor="{anchor}" fill="{color}" class="map-bn" font-size="{size}" lang="bn">{bn}</text>'
                f'<text x="{x}" y="{en_y}" text-anchor="{anchor}" fill="{color}" class="map-en" font-size="14">{en}</text>')

    def pill(x, y, text, rot, bg=SHOLA, fg=KAJAL, w=168):
        return (f'<g transform="translate({x},{y}) rotate({rot})"><rect x="{-w / 2}" y="-20" width="{w}" height="40" rx="20" fill="{bg}" stroke="{KAJAL}" stroke-width="3"/>'
                f'<text x="0" y="8" text-anchor="middle" fill="{fg}" class="map-bn" font-size="19" lang="bn">{text}</text></g>')
    # 460 high, so "TRIDHARA MILAN MANDIR" under পাঁচমুড়া (baseline y = 445) is drawn whole
    return (f'<svg class="route-map" viewBox="0 0 720 460" role="img" aria-label="{label}">'
            f'{trees}<path d="{road}" fill="none" stroke="{KAJAL}" stroke-width="22" stroke-linecap="round"/>'
            f'<path d="{road}" fill="none" stroke="{HALDI}" stroke-width="13" stroke-linecap="round"/>'
            f'<path d="{road}" fill="none" stroke="{KAJAL}" stroke-width="2" stroke-dasharray="10 10"/>{car}{train}'
            f'<circle cx="70" cy="96" r="16" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>{lab(40, 50, "কলকাতা", "KOLKATA")}'
            f'<circle cx="428" cy="250" r="14" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>{lab(380, 302, "বিষ্ণুপুর", "BISHNUPUR STATION", 30, anchor="middle")}'
            f'{shikhara(640, 372, .9)}<g transform="translate(518,280) scale(.14)">{horse_flat(SHOLA)}</g>'
            f'{lab(690, 420, "পাঁচমুড়া", "TRIDHARA MILAN MANDIR", 40, HALDI, "end")}'
            f'{pill(300, 120, "মোট ১৮০ কিমি · ৪ ঘণ্টা", -4, w=214)}{pill(612, 238, "৩০ কিমি · ৪৫ মিনিট", 5, HALDI, KAJAL, 188)}</svg>')


def common_files():
    """Art files every build writes into assets/img/."""
    out = {'grain.svg': grain_tile()}
    for hid in ('evergreen', 'durga', 'kali', 'shivaratri', 'dol', 'rath', 'janmashtami'):
        out.update(hero_files(hid))
    for k in POSTER_KINDS:
        out[f'poster-{k}.svg'] = poster_file(k)
    for k in ('shaiva', 'vaishnava', 'shakta'):
        out[f'dhara-{k}.svg'] = dhara_file(k)
    out['mark.svg'] = ghot_file(False, 512)
    out['mark-dark.svg'] = ghot_file(True, 512)
    return out


def board_files(name, defs, shapes, view, view_m=None):
    """Art drawn on a design board (e.g. an inner-page first screen, 1440 x 620), cut into a desktop file
    (view = the right-hand region, x0 y0 w h) and a phone file (view_m = a tighter crop). Returns {filename: svg}."""
    out = {f'{name}.svg': svg_doc(view, shapes, defs)}
    out[f'{name}-m.svg'] = svg_doc(view_m or view, shapes, defs)
    return out
