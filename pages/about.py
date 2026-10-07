"""About page (আমাদের কথা): the names the mandir goes by, the journey from 2012 to the Pratishtha on Rath Yatra 2022,
the three dharas and the arati, the architecture, the work, Panchmura, and the people.
src/js/60-about.js keeps the five-years countdown (Rath Yatra, 5 July 2027) up to date."""
import math
from lib import ui
from lib.ui import esc, btn, section
from lib.art import (arrow, sun, svg_doc, board_files, shikhara, icon_trishul, icon_chakra, icon_shankha,
                     SINDOOR, HALDI, SHOLA, KAJAL, NEEL, PEACOCK, PEACOCK_D, JOBA)
from lib.motifs import f, horse_defs, horse_body, joba, wheel, trishul
from lib import byear as BY
from pages.seva import mini_handi, art_block

PAGE = dict(key='about', title='Our story',
            description='Tridhara Milan Mandir, Panchmura: from the 2012 visioning circles to the Pratishtha on Rath Yatra 2022, '
                        'its three dharas, its architecture and its work.',
            tone='sindoor')

CLAY = '#C0602F'; BRASS = '#E2A92A'; TEAL_L = '#3E9C8F'; TULSI = '#4E8F3A'; TULSI_D = '#2C5A19'


def sec_head(*a, **k):
    """ui.sec_head with a page class, so its aside can sit at the right edge when it wraps under the title (see 60-about.css)."""
    return ui.sec_head(*a, **k).replace('class="sec-head"', 'class="sec-head abt-head"', 1)


# ---------------------------------------------------------------- drawings (ported from the design, b_about.py)
def temple(x, y, s, fill=SHOLA, line=KAJAL, flag=SINDOOR, accent=SINDOOR, gold=HALDI):
    """The Nagara shikhara scaled up, with strokes kept at poster weight, ribs, a frieze, niches, a kalash and a stepped plinth."""
    sk = shikhara(x, y, s, fill, line)
    sk = (sk.replace('stroke-width="3"', f'stroke-width="{f(4.2 / s)}"').replace('stroke-width="2.5"', f'stroke-width="{f(3.6 / s)}"')
          .replace('stroke-width="2"', f'stroke-width="{f(3.2 / s)}"').replace(f'fill="{HALDI}"', f'fill="{flag}"')
          .replace(f'<ellipse cx="0" cy="-101" rx="10" ry="4" fill="{fill}"', f'<ellipse cx="0" cy="-101" rx="10" ry="4" fill="{gold}"'))
    sw = f(3.4 / s)
    g = f'<g transform="translate({f(x)},{f(y)}) scale({s})"'
    ribs = (f'{g} fill="none" stroke="{line}" stroke-width="{f(2.6 / s)}" stroke-linecap="round">'
            '<path d="M-13,-24 C-13,-56 -6,-80 0,-95"/><path d="M13,-24 C13,-56 6,-80 0,-95"/></g>')
    detail = (f'{g} stroke="{line}" stroke-width="{f(2.8 / s)}" stroke-linejoin="round">'
              f'<rect x="-34" y="-22" width="68" height="5" fill="{accent}"/>'
              f'<path d="M-27,-3 L-27,-10 A4,4 0 0 1 -19,-10 L-19,-3 Z" fill="{accent}"/><path d="M19,-3 L19,-10 A4,4 0 0 1 27,-10 L27,-3 Z" fill="{accent}"/>'
              f'<path d="M-12.5,0 L-12.5,-12 A12.5,12.5 0 0 1 12.5,-12 L12.5,0" fill="none" stroke="{gold}" stroke-width="{f(3.6 / s)}"/>'
              f'<path d="M-4,-104 C-7,-108 -4,-113 0,-113 C4,-113 7,-108 4,-104 Z" fill="{gold}"/></g>')
    plinth = (f'{g} fill="{fill}" stroke="{line}" stroke-width="{sw}" stroke-linejoin="round">'
              '<rect x="-46" y="0" width="92" height="8"/><rect x="-58" y="8" width="116" height="8"/></g>')
    return plinth + sk + ribs + detail


def tile(inner, w=160, h=160, vb=None):
    return f'<svg class="abt-step__art" width="{w}" height="{h}" viewBox="{vb or f"0 0 {w} {h}"}" aria-hidden="true" focusable="false">{inner}</svg>'


def circle_art():
    """Community visioning circle: devotees seated round a lamp."""
    pts = []
    for k in range(8):
        a = 2 * math.pi * k / 8 + .2
        pts.append((80 + 58 * math.cos(a), 98 + 32 * math.sin(a), k))
    figs = ''
    for x, y, k in sorted(pts, key=lambda t: t[1]):
        c = HALDI if k % 2 else SHOLA
        figs += (f'<path d="M{f(x - 13)},{f(y + 12)} C{f(x - 13)},{f(y - 6)} {f(x + 13)},{f(y - 6)} {f(x + 13)},{f(y + 12)} Z" fill="{c}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
                 f'<circle cx="{f(x)}" cy="{f(y - 12)}" r="8" fill="{c}" stroke="{KAJAL}" stroke-width="3"/>')
    return tile(f'<ellipse cx="80" cy="100" rx="70" ry="40" fill="#2B3A93" stroke="{SHOLA}" stroke-width="2.5" stroke-dasharray="6 6"/>'
                f'{figs}<g transform="translate(76,104) scale(.42)">{BY.diya(0, 0, 1)}</g>')


def plot_art():
    furrows = ''.join(f'<path d="M{f(80 - 70 * t)},{f(60 + 35 * t)} L{f(150 - 70 * t)},{f(95 + 35 * t)}" stroke="{KAJAL}" stroke-width="2" opacity=".45"/>' for t in (.2, .4, .6, .8))
    pegs = ''.join(f'<rect x="{x - 3}" y="{y - 14}" width="6" height="16" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2"/>' for x, y in ((80, 60), (150, 95), (80, 130), (10, 95)))
    return tile(f'<path d="M80,60 L150,95 L80,130 L10,95 Z" fill="{TEAL_L}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>{furrows}{pegs}'
                f'<path d="M84,98 L84,22" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/><path d="M84,24 L120,34 L84,46 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
                f'<g transform="translate(32,72)"><path d="M0,0 L0,18" stroke="{KAJAL}" stroke-width="3"/><circle cx="0" cy="-8" r="14" fill="#2E7D4F" stroke="{KAJAL}" stroke-width="3"/></g>')


def build_art():
    bamboo = (f'<g stroke="{KAJAL}" stroke-width="3" stroke-linecap="round" fill="none">'
              '<path d="M36,40 L36,176 M134,40 L134,176 M28,84 L142,84 M28,124 L142,124 M36,84 L134,124 M134,84 L36,124 M36,124 L134,164"/></g>')
    meas = (f'<g stroke="{KAJAL}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M164,14 L164,176"/><path d="M156,24 L164,12 L172,24"/><path d="M156,166 L164,178 L172,166"/></g>')
    return tile(f'{temple(86, 160, 1.2, SINDOOR, KAJAL, SHOLA, HALDI, SHOLA)}{bamboo}{meas}', vb='0 0 190 190')


def wheel_art():
    return tile(f'<circle cx="80" cy="80" r="62" fill="{SHOLA}" opacity=".18"/><g transform="translate(80,80) scale(.7)">{wheel(KAJAL, HALDI)}</g>')


def pradip_art():
    """Pancha-pradip: the five-wick arati lamp, for five years."""
    def flame(x, y, h=30):
        w = h * .38
        return (f'<path d="M{f(x)},{f(y)} C{f(x + w)},{f(y - h * .25)} {f(x + w * .6)},{f(y - h * .65)} {f(x)},{f(y - h)} C{f(x - w * .6)},{f(y - h * .65)} {f(x - w)},{f(y - h * .25)} {f(x)},{f(y)} Z" fill="{SINDOOR}"/>'
                f'<path d="M{f(x)},{f(y - 2)} C{f(x + w * .55)},{f(y - h * .22)} {f(x + w * .35)},{f(y - h * .55)} {f(x)},{f(y - h * .78)} C{f(x - w * .35)},{f(y - h * .55)} {f(x - w * .55)},{f(y - h * .22)} {f(x)},{f(y - 2)} Z" fill="{HALDI}"/>')
    flames = ''.join(flame(x, y, h) for x, y, h in ((28, 82, 26), (54, 76, 32), (80, 72, 38), (106, 76, 32), (132, 82, 26)))
    st = f'fill="{BRASS}" stroke="{SHOLA}" stroke-width="2.5" stroke-linejoin="round"'
    return tile(f'<path d="M46,164 L114,164 L94,142 L66,142 Z" {st}/><rect x="73" y="96" width="14" height="48" {st}/>'
                f'<ellipse cx="80" cy="108" rx="13" ry="5" {st}/><ellipse cx="80" cy="126" rx="13" ry="5" {st}/>'
                f'<path d="M18,86 C30,104 130,104 142,86 Z" {st}/>{flames}', 160, 170)


def damru():
    return (f'<g><path d="M-30,-40 L30,-40 L5,0 L30,40 L-30,40 L-5,0 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<ellipse cx="0" cy="-40" rx="30" ry="8" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/><ellipse cx="0" cy="40" rx="30" ry="8" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<rect x="-8" y="-5" width="16" height="10" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<path d="M8,0 C26,6 34,18 40,30" fill="none" stroke="{SHOLA}" stroke-width="3"/><circle cx="41" cy="33" r="6" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<path d="M-8,0 C-26,-6 -34,-18 -40,-30" fill="none" stroke="{SHOLA}" stroke-width="3"/><circle cx="-41" cy="-33" r="6" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2.5"/></g>')


def mridanga():
    straps = ''.join(f'<path d="M{-92 + 23 * i},{-36 + (4 if i in (0, 8) else 0) - 8 * math.sin(math.pi * i / 8):.1f} L{-80 + 23 * i},{36 - 8 * math.sin(math.pi * (i + .5) / 8):.1f}" stroke="{SHOLA}" stroke-width="2.5"/>' for i in range(8))
    return (f'<g><path d="M-100,-34 C-60,-50 50,-52 100,-26 L100,26 C50,52 -60,50 -100,34 Z" fill="{CLAY}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>{straps}'
            f'<path d="M-40,-46 C-36,-16 -36,16 -40,46 M30,-45 C34,-16 34,16 30,45" fill="none" stroke="{HALDI}" stroke-width="5"/>'
            f'<ellipse cx="-100" cy="0" rx="12" ry="34" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/><ellipse cx="-100" cy="0" rx="5" ry="14" fill="{KAJAL}"/>'
            f'<ellipse cx="100" cy="0" rx="10" ry="26" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/><ellipse cx="100" cy="0" rx="4" ry="10" fill="{KAJAL}"/></g>')


def chakra_big(c=HALDI, r=70):
    sp = ''.join(f'<path d="M0,-16 L0,{-r + 12}" transform="rotate({a})" stroke="{KAJAL}" stroke-width="6" stroke-linecap="round"/>' for a in range(0, 360, 45))
    teeth = ''.join(f'<path d="M-9,{-r + 2} L0,{-r - 16} L9,{-r + 2} Z" transform="rotate({a})" fill="{c}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>' for a in range(0, 360, 30))
    return (f'<g>{teeth}<circle r="{r}" fill="{c}" stroke="{KAJAL}" stroke-width="5"/><circle r="{r - 14}" fill="{NEEL}" stroke="{KAJAL}" stroke-width="4"/>{sp}'
            f'<circle r="16" fill="{c}" stroke="{KAJAL}" stroke-width="4"/></g>')


def shankha_big():
    """Shankha (conch), apex up, canal down, aperture to the right. Centre (0,0), ~130 x 210."""
    body = 'M0,-104 C30,-98 62,-62 64,-20 C66,22 50,62 18,104 C13,110 5,110 3,103 C-14,72 -50,46 -60,6 C-69,-36 -42,-92 0,-104 Z'
    lip = 'M24,-34 C54,-22 62,20 42,58 C32,76 22,90 12,98 C22,62 24,22 10,-12 C12,-24 16,-32 24,-34 Z'
    ridges = ''.join(f'<path d="{d}" fill="none" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>' for d in (
        'M-26,-82 C-8,-74 14,-76 30,-88', 'M-44,-56 C-16,-44 26,-48 50,-62', 'M-56,-26 C-24,-12 18,-14 40,-26'))
    whorls = ''.join(f'<path d="{d}" fill="none" stroke="{KAJAL}" stroke-width="2.6" opacity=".55" stroke-linecap="round"/>' for d in (
        'M-46,10 C-36,34 -18,52 0,64', 'M-30,0 C-22,26 -8,44 6,54'))
    band = f'<path d="M-4,78 C6,86 18,84 26,76 L22,90 C14,96 4,96 -1,90 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
    return (f'<g stroke-linejoin="round"><path d="{body}" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="5"/>'
            f'<path d="{lip}" fill="#F2A38F" stroke="{KAJAL}" stroke-width="4"/>{ridges}{whorls}{band}'
            f'<path d="M0,-104 L0,-116" stroke="{SHOLA}" stroke-width="6" stroke-linecap="round"/></g>')


def dhara_art(kind):
    if kind == 'shaiva':
        moon = f'<path d="M296,24 A40,40 0 1 0 296,104 A50,50 0 0 1 296,24 Z" fill="{SHOLA}"/>'
        return (moon + f'<g transform="translate(92,6) scale(.52)" style="color: {SHOLA};">{trishul(9)}</g>'
                + f'<g transform="translate(144,138) rotate(-12)">{damru()}</g>' + BY.bel(52, 214, .5, -22) + BY.bel(270, 214, .46, 20))
    if kind == 'vaishnava':
        return f'<g transform="translate(176,92)">{chakra_big()}</g><g transform="translate(176,196) rotate(-4) scale(.95)">{mridanga()}</g>'
    if kind == 'shakta':
        return (f'<g transform="translate(96,104) scale(.66)">{joba(fill=JOBA, stroke="#0A0705")}</g><g transform="translate(306,46) scale(.34) rotate(30)">{joba(fill=JOBA, stroke="#0A0705")}</g>'
                f'<g transform="translate(240,140) rotate(58) scale(.9)">{shankha_big()}</g>')
    return ''


def tulsi_mancha(x, y, s=1):
    """The raised tulsi altar: a stepped, painted pedestal with a tulsi plant. (x, y) = foot of the pedestal."""
    leaves = ''.join(f'<ellipse cx="{f(lx)}" cy="{f(ly)}" rx="9" ry="15" transform="rotate({r} {f(lx)} {f(ly)})" fill="{TULSI}" stroke="{KAJAL}" stroke-width="3"/>'
                     for lx, ly, r in ((-22, -96, -40), (22, -96, 40), (-14, -116, -25), (14, -116, 25), (-26, -76, -60), (26, -76, 60), (0, -132, 0), (-8, -84, -10), (8, -84, 10)))
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})" stroke-linejoin="round">'
            f'<path d="M0,-60 L0,-126" stroke="{TULSI_D}" stroke-width="5" stroke-linecap="round"/>{leaves}'
            f'<rect x="-44" y="-26" width="88" height="26" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<rect x="-32" y="-66" width="64" height="40" fill="{HALDI}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<rect x="-38" y="-72" width="76" height="8" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3.5"/>'
            f'<path d="M-14,-30 L-14,-50 A14,14 0 0 1 14,-50 L14,-30 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/>'
            + ''.join(f'<circle cx="{cx}" cy="-13" r="3.5" fill="{SHOLA}"/>' for cx in (-30, -15, 0, 15, 30)) + '</g>')


def arch_drawing():
    """The mandir, drawn as a poster elevation with numbered parts (inline: the numbers use the page font)."""
    W, H = 640, 600
    sd, ss = sun('abArS', 362, 290, 236, HALDI, SINDOOR)
    ground = f'<path d="M0,571 L{W},571 L{W},{H} L0,{H} Z" fill="{PEACOCK_D}"/><path d="M0,571 L{W},571" stroke="{KAJAL}" stroke-width="4"/>'
    tx, ty, s = 362, 520, 3.2
    # a frieze of carved panels on the upper plinth (the mandir has 28 relief panels)
    panels = ''
    for i in range(7):
        px = tx - 140 + i * 40
        panels += (f'<rect x="{px}" y="{ty + 3}" width="34" height="20" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="2.4"/>'
                   f'<circle cx="{px + 17}" cy="{ty + 9}" r="3.4" fill="{HALDI}"/><path d="M{px + 11},{ty + 21} L{px + 17},{ty + 12} L{px + 23},{ty + 21} Z" fill="{HALDI}"/>')
    top_y = ty - 126 * s
    dim = (f'<g stroke="{SHOLA}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M584,{f(top_y)} L584,571"/>'
           f'<path d="M574,{f(top_y + 12)} L584,{f(top_y)} L594,{f(top_y + 12)}"/><path d="M574,559 L584,571 L594,559"/>'
           f'<path d="M560,{f(top_y)} L600,{f(top_y)}" stroke-dasharray="4 5"/></g>'
           f'<text x="0" y="0" transform="translate(616,{f((top_y + 571) / 2)}) rotate(-90)" text-anchor="middle" class="abt-arch__dim" lang="bn">৪৫ ফুট</text>')

    def murti(cx, crown=HALDI):
        """A marble murti, seen through the door of the sanctum: white on the dark doorway, crowned in gold."""
        return (f'<path d="M{cx - 7},494 C{cx - 9},502 {cx - 11},512 {cx - 11},{ty} L{cx + 11},{ty} C{cx + 11},512 {cx + 9},502 {cx + 7},494 Z" '
                f'fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2"/><circle cx="{cx}" cy="487" r="6" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="2"/>'
                f'<path d="M{cx - 5},483 L{cx},473 L{cx + 5},483 Z" fill="{crown}" stroke="{KAJAL}" stroke-width="1.5" stroke-linejoin="round"/>')
    murtis = murti(tx - 11) + murti(tx + 11)

    def num(n, x, y, lx=None, ly=None):
        lead = f'<path d="M{x},{y} L{lx},{ly}" stroke="{KAJAL}" stroke-width="3"/><circle cx="{lx}" cy="{ly}" r="5" fill="{KAJAL}"/>' if lx is not None else ''
        return (f'{lead}<circle cx="{x}" cy="{y}" r="21" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
                f'<text x="{x}" y="{y + 9}" text-anchor="middle" class="abt-arch__num" lang="bn">{n}</text>')
    # one marker for each item of the list beside the drawing (arch_section), in the same order
    marks = (num('১', 188, 236, 318, 300)        # the Nagara body of the shikhara
             + num('২', 548, 150, 584, 150)       # 45 feet
             + num('৩', 150, 488, 228, 532)       # relief panels
             + num('৪', 470, 420, 402, 488)       # the teak door frame; through it, the shegun-beamed ceilings
             + num('৫', 72, 372, 90, 420)         # tulsi mancha
             + num('৬', 236, 396, 349, 503))      # the marble murtis in the sanctum
    label = ('Drawing of the mandir: a Nagara-style shikhara 45 feet tall, a frieze of carved relief panels on the plinth, '
             'the doorway to the sanctum with its marble murtis, and a tulsi mancha')
    return (f'<svg class="abt-arch__svg" viewBox="0 0 {W} {H}" role="img" aria-label="{label}"><defs>{sd}</defs>'
            f'<rect width="{W}" height="{H}" fill="{NEEL}"/>{ss}{ground}{temple(tx, ty, s, SHOLA, KAJAL, SINDOOR, SINDOOR, HALDI)}{panels}'
            f'{murtis}{tulsi_mancha(110, 571, .95)}{dim}{marks}</svg>')


# ---------------------------------------------------------------- first screen
def hero(ctx):
    d, s = sun('abHS', 1080, 340, 270, HALDI, SINDOOR)
    p = 'abHh'
    files = board_files('about-hero', d + horse_defs(p), s + temple(1180, 560, 3.1) + f'<g transform="translate(800,314) scale(.5)">{horse_body(p)}</g>',
                        view=(600, 0, 1040, 620), view_m=(780, 60, 600, 560))   # 200 units past the board show only on wide screens
    stk = ui.sticker('২০২২', 'প্রতিষ্ঠা', '1 July · Rath Yatra', label='Pratishtha on Rath Yatra, 1 July 2022', cls='abt-hero__sticker')
    btns = (f'<div class="btns">{btn(ctx, "The journey" + arrow(16), "#journey", "tone")}'
            f'{btn(ctx, "Visit Panchmura", "visit", "ghost")}</div>')
    title = '<span class="abt-hero__t">আমাদের<br class="abt-hero__br"> কথা</span>'
    out = ui.page_hero(ctx, 'about', title, 'Our story · Naba Brindaban',
                       'A mandir where three currents of Hindu devotion meet: Mahadev’s stillness, Radha-Krishna’s bhakti and Maa Kali’s shakti.',
                       w=4.6, pt=.02, pa_w=840 / 1440, extra=btns, sr_en='Our story',
                       sticker_html=art_block(ctx, files, 'abt-hero__art', stk))
    return out.replace('class="phero"', 'class="phero abt-hero"', 1)


# ---------------------------------------------------------------- the names it goes by
def names_band(ctx):
    names = [('ত্রিধারা মিলন মন্দির', 'Tridhara Milan Mandir', 'Where three streams meet.'),
             ('নব বৃন্দাবন', 'Naba Brindaban Temple', 'Also written Naba-Vrindavan: the new, or second, Vrindavan.'),
             ('পাঁচমুড়া মিলন মন্দির', 'Panchmura Milan Mandir', 'After the village it stands in.')]
    items = ''.join(f'<li class="abt-name"><span class="abt-name__bn" lang="bn">{b}</span><span class="abt-name__en">{e}</span>'
                    f'<span class="abt-name__d">{d}</span></li>' for b, e, d in names)
    items += ('<li class="abt-name abt-name--blessing"><span class="abt-name__bn" lang="bn">পাঁচমুড়ার দ্বিতীয় বৃন্দাবন</span>'
              '<span class="abt-name__en">Panchmura’s Second Vrindavan</span><span class="abt-name__d">A blessing, not an official title.</span></li>')
    return section(f'<div class="abt-names"><div class="abt-names__t"><h2 class="abt-names__h" lang="bn" id="names-h">এক মন্দির, অনেক নাম</h2>'
                   f'<p class="abt-names__en">The names it goes by</p></div><ul class="abt-names__list">{items}</ul></div>',
                   'kajal', cls='sec--tight', sid='names', labelledby='names-h')


# ---------------------------------------------------------------- the journey
STEPS = [
    dict(yr='২০১২–১৬', pre='', en='2012–16', bn='স্বপ্নের শুরু', t='Community visioning circles', tone='neel', acc='haldi', rot=-.8, art=circle_art, d=''),
    dict(yr='২০১৬–১৯', pre='', en='2016–19', bn='মন্দিরের জমি', t='Trustees acquire the temple plot', tone='peacock-d', acc='haldi', rot=.7, art=plot_art,
         d='The trustees acquire the plot in Panchmura where the mandir stands today.'),
    dict(yr='২০২০–২১', pre='', en='2020–21', bn='নির্মাণ', t='Construction', tone='haldi', acc='sindoor-ink', rot=-.6, art=build_art, light=True,
         d='The mandir is built, with marble murtis and teak doors.'),
    dict(yr='২০২২', pre='১ জুলাই', en='1 July 2022', bn='প্রতিষ্ঠা', t='Pratishtha on Rath Yatra', tone='sindoor', acc='shola', rot=.8, art=wheel_art,
         d='The mandir is consecrated on the day of Rath Yatra.'),
    dict(yr='২০২৭', pre='জুলাই', en='July 2027', bn='পাঁচ বছর', t='Five years', tone='kajal', acc='haldi', rot=-.7, art=pradip_art,
         d='Rath Yatra on 5 July 2027 marks five years since the Pratishtha.'),
]


def journey_section(ctx):
    rows = ''
    for i, s in enumerate(STEPS):
        side = 'l' if i % 2 == 0 else 'r'
        pre = f'<span class="abt-step__pre" lang="bn">{s["pre"]}</span>' if s['pre'] else ''
        extra = ''
        if i == 2:
            chip = lambda n, l: f'<span class="abt-chip"><span class="abt-chip__n" lang="bn">{n}</span><span class="abt-chip__l">{l}</span></span>'
            extra = f'<div class="abt-chips">{chip("২৮", "relief panels")}{chip("৪৫ ফুট", "Nagara shikhara")}</div>'
        if i == 4:
            extra = ('<p class="abt-five" data-abt-five><span class="abt-five__bn" lang="bn" data-abt-five-bn>৫ জুলাই ২০২৭</span>'
                     '<span class="abt-five__en" data-abt-five-en>Rath Yatra, 5 July 2027</span></p>')
        light = ' abt-step--light' if s.get('light') else ''
        d = f'<p class="abt-step__d">{s["d"]}</p>' if s['d'] else ''
        rows += (f'<li class="abt-step abt-step--{side}{light}" style="--bg: var(--{s["tone"]}); --acc: var(--{s["acc"]}); --rot: {s["rot"]}deg;">'
                 f'<span class="abt-step__node" aria-hidden="true"></span><span class="abt-step__stub" aria-hidden="true"></span>'
                 f'<article class="abt-step__card">'
                 f'<p class="abt-step__yr">{pre}<span class="abt-step__y" lang="bn">{s["yr"]}</span></p>{s["art"]()}'
                 f'<p class="abt-step__en">{s["en"]}</p>'
                 f'<h3 class="abt-step__bn" lang="bn">{s["bn"]}</h3><p class="abt-step__t">{s["t"]}</p>'
                 f'{d}{extra}</article></li>')
    aside = '<p>From the first visioning circles in 2012 to the Pratishtha on <span class="nowrap">Rath Yatra 2022.</span></p>'
    return section(sec_head('যাত্রাপথ', 'The journey · 2012 to 2027', aside, hid='journey-h') + f'<ol class="abt-tl">{rows}</ol>',
                   'shola', sid='journey', labelledby='journey-h')


# ---------------------------------------------------------------- three streams, one arati
def dharas_section(ctx):
    def fest(fid):
        fe = ui.festival(ctx, fid)
        nb = lambda s: s.replace(' ', '\N{NO-BREAK SPACE}')     # a date never breaks inside (৬ মার্চ, Sat 6 Mar 2027)
        return (f'<a class="abt-dh__fest" href="{esc(ctx.href("festivals#" + fid))}"><span lang="bn">{fe["bn"]} · {nb(fe["date_bn"])}</span>'
                f'<span class="abt-dh__festen">{fe["en"].split(" · ")[0]} · {nb(fe["date_en"])}</span></a>')
    cols = [
        dict(k='shaiva', bg='slate', dh='শৈব', en='Shaiva · stillness', icon=icon_trishul(), deity='মহাদেব', deity_en='Mahadev',
             body='A Shiva linga and a meditating Shiva.', extra=[], sound=('ডমরু', 'Damru'), fest='shivaratri'),
        dict(k='vaishnava', bg='neel', dh='বৈষ্ণব', en='Vaishnava · bhakti', icon=icon_chakra(), deity='রাধাকৃষ্ণ', deity_en='Radha-Krishna · main sanctum',
             body='Radha-Krishna in the main sanctum, with Jagannath on the altar.', extra=[],
             sound=('মৃদঙ্গ', 'Mridanga'), fest='rath'),
        dict(k='shakta', bg='kajal', dh='শাক্ত', en='Shakta · shakti', icon=icon_shankha(), deity='মা কালী', deity_en='Maa Kali',
             body='The evening arati culminates before Radha-Krishna and Maa Kali.', extra=[], sound=('উলুধ্বনি', 'Ulu'), fest='kali'),
    ]
    cards = ''
    for c in cols:
        ctx.add_img(f'about-dhara-{c["k"]}.svg', svg_doc((0, 0, 352, 250), dhara_art(c['k'])))
        chips = ''
        if c['extra']:
            chips = '<ul class="abt-dh__chips">' + ''.join(f'<li><span lang="bn">{b}</span><span class="abt-dh__chipen">{e}</span></li>' for b, e in c['extra']) + '</ul>'
        dark = ' abt-dh--dark' if c['bg'] == 'kajal' else ''
        cards += (f'<article class="abt-dh{dark}" style="--d-bg: var(--{c["bg"]});" aria-labelledby="dh-{c["k"]}">'
                  f'<img class="abt-dh__art" src="{ctx.img("about-dhara-" + c["k"] + ".svg")}" alt="" width="352" height="250" loading="lazy" decoding="async">'
                  f'<div class="abt-dh__body"><div class="abt-dh__top"><h3 class="abt-dh__name" lang="bn" id="dh-{c["k"]}">{c["dh"]}</h3>{c["icon"]}</div>'
                  f'<p class="abt-dh__en">{c["en"]}</p><p class="abt-dh__deity" lang="bn">{c["deity"]}</p><p class="abt-dh__deityen">{c["deity_en"]}</p>'
                  f'<p class="abt-dh__d">{c["body"]}</p>{chips}{fest(c["fest"])}'
                  f'<p class="abt-dh__sound"><span class="abt-dh__soundk">In the arati</span><span lang="bn" class="abt-dh__soundbn">{c["sound"][0]}</span>'
                  f'<span class="abt-dh__sounden">{c["sound"][1]}</span></p></div></article>')
    band = (f'<div class="aratiband abt-arati"><span class="aratiband__icons">{icon_trishul()}{icon_chakra()}{icon_shankha()}</span>'
            f'<span class="aratiband__t"><span class="aratiband__bn" lang="bn">ত্রিধারা সন্ধ্যা আরতিতে ত্রিশূল, চক্র আর শঙ্খ এক হয়</span>'
            f'<span class="abt-arati__en">In the Tridhara Sandhya Arati the trishul, chakra and shankha meet, with the Shaiva damru, the Vaishnava mridanga and the Shakta ulu.</span>'
            f'<span class="abt-arati__when">Every evening at 6:30 PM · <a class="u" href="{esc(ctx.href("darshan"))}">Today’s darshan times</a></span></span></div>')
    also = [('রাম–সীতা', 'Rama–Sita'), ('হনুমান', 'Hanuman'), ('চৈতন্য মহাপ্রভু', 'Chaitanya Mahaprabhu')]
    also_html = ('<div class="abt-also"><p class="abt-also__t"><span lang="bn">মন্দিরে আরও</span><span class="abt-also__en">Also in the mandir</span></p>'
                 '<ul class="abt-also__list">' + ''.join(f'<li><span lang="bn">{b}</span><span class="abt-also__li-en">{e}</span></li>' for b, e in also)
                 + '</ul></div>')
    aside = '<p>Each stream has its own deities, symbol and sound in the evening arati.</p>'
    return section(sec_head('তিন ধারা, এক আরতি', 'Three streams, one arati', aside, hid='dharas-h')
                   + f'<div class="rail abt-dharas">{cards}</div>{also_html}{band}', 'haldi', sid='dharas', labelledby='dharas-h')


# ---------------------------------------------------------------- the architecture
def arch_section(ctx):
    parts = [('১', 'নাগর শৈলী', 'Nagara style', 'The north-Indian temple form: a curved shikhara rising over the sanctum.'),
             ('২', '৪৫ ফুটের শিখর', 'A 45-foot shikhara', 'The shikhara rises 45 feet; the design is inspired by the Govind Dev Temple.'),
             ('৩', '২৮টি খোদাই প্যানেল', '28 relief panels', 'Hand-carved, telling the Dasavatara and the Krishna lila.'),
             ('৪', 'সেগুন কাঠের কড়িবরগা', 'Shegun-beamed ceilings', 'Inside, the ceilings rest on beams of shegun (teak), and the doors are teak too.'),
             ('৫', 'তুলসী মঞ্চ', 'The tulsi mancha', 'The raised tulsi altar, circled at Mangal Arati every morning.'),
             ('৬', 'মার্বেলের বিগ্রহ', 'Marble murtis', 'The murtis in the sanctum are of marble.')]
    items = ''.join(f'<li class="abt-part"><span class="abt-part__n" lang="bn" aria-hidden="true">{n}</span><div class="abt-part__t">'
                    f'<h3 class="abt-part__bn" lang="bn">{b}</h3><p class="abt-part__en">{e}</p><p class="abt-part__d">{d}</p></div></li>'
                    for n, b, e, d in parts)
    aside = '<p>A Nagara-style mandir, built in 2020–21 with marble murtis, teak doors and hand-carved panels.</p>'
    return section(sec_head('স্থাপত্য', 'The architecture', aside, hid='arch-h')
                   + f'<div class="abt-arch"><figure class="abt-arch__fig">{arch_drawing()}</figure><ol class="abt-parts">{items}</ol></div>',
                   'paper', sid='architecture', labelledby='arch-h')


# ---------------------------------------------------------------- the work
def work_section(ctx):
    handis = ''.join(f'<svg class="abt-handi" width="96" height="96" viewBox="0 0 100 100" aria-hidden="true" focusable="false">{mini_handi(50, 58, 1.04, 3.6)}</svg>' for _ in range(3))
    grow = ('<div class="abt-grow" role="img" aria-label="600 plates a day in 2022; more than 2,000 a day now">'
            '<p class="abt-grow__row"><span class="abt-grow__k" lang="bn">২০২২</span><span class="abt-grow__bar" style="--v: .3;"></span><span class="abt-grow__n" lang="bn">৬০০</span></p>'
            '<p class="abt-grow__row"><span class="abt-grow__k" lang="bn">আজ</span><span class="abt-grow__bar" style="--v: 1;"></span><span class="abt-grow__n" lang="bn">২০০০+</span></p></div>')
    feature = (f'<div class="abt-feat"><p class="abt-feat__n" lang="bn">২০০০+</p><p class="abt-feat__bn" lang="bn">পাত প্রসাদ, প্রতিদিন</p>'
               f'<p class="abt-feat__en">Anna-daan · plates a day</p>'
               f'<p class="abt-feat__d">Cooked in terracotta handis, sattvic and onion-free, and served free as anna-daan prasad from 12:30 to 2 PM. '
               f'It began in 2022 with 600 plates a day.</p>{grow}<div class="abt-feat__handis">{handis}</div></div>')

    def stat(num, b, e, body, tone, shadow, en):
        return (f'<li class="abt-stat" style="--bg: var(--{tone}); --sh: var(--{shadow}); --en: var(--{en});"><span class="abt-stat__n" lang="bn">{num}</span>'
                f'<div class="abt-stat__t"><p class="abt-stat__bn" lang="bn">{b}</p><p class="abt-stat__en">{e}</p><p class="abt-stat__d">{body}</p></div></li>')
    stats = (stat('১২০+', 'ছাত্রছাত্রী, প্রতি বছর', 'Students supported a year', 'In Sanskrit, music and STEM.', 'peacock-d', 'haldi', 'shola')
             + stat('৫০০+', 'রোগী, প্রতি শিবিরে', 'Patients at each health camp',
                    'Quarterly camps across 15 Panchmura villages, with volunteer doctors from Kolkata and Durgapur.', 'neel', 'sindoor', 'haldi'))
    aside = btn(ctx, 'Offer seva' + arrow(16), 'seva', 'haldi', cls='btn--sm')
    return section(sec_head('আমাদের কাজ', 'The work: <span class="nowrap">anna-daan,</span> learning, healing', aside, hid='work-h')
                   + f'<div class="abt-work">{feature}<ul class="abt-stats">{stats}</ul></div>', 'kajal', sid='work', labelledby='work-h')


# ---------------------------------------------------------------- Panchmura
def panchmura_section(ctx):
    p = 'abHp'
    sd, ss = sun('abPs', 270, 250, 210, HALDI, PEACOCK)
    horse = svg_doc((0, 0, 540, 560), f'<rect width="540" height="560" fill="{PEACOCK}"/>{ss}<ellipse cx="282" cy="528" rx="170" ry="16" fill="{KAJAL}" opacity=".3"/>'
                    f'<g transform="translate(140,152) scale(.62)">{horse_body(p)}</g>', sd + horse_defs(p))
    src = ctx.add_img('about-bankura-horse.svg', horse)

    def fact(k, t, d):
        return f'<div class="fact"><p class="fact__k">{k}</p><p class="fact__t" lang="bn">{t}</p><p class="fact__d">{d}</p></div>'
    facts = (fact('The Bankura horse', 'বাঁকুড়ার ঘোড়া, পাঁচমুড়ার মাটিতে',
                  'Registered as a Geographical Indication, “Bankura Panchmura Terracotta Craft”, on 28 March 2018, and the logo of All India Handicrafts.')
             + fact('Artisans’ Studio Passport · ₹9,200 per person', 'স্টুডিও পাসপোর্ট',
                    'Hands-on terracotta days with daily craft demonstrations and clay modelling, supporting Panchmura’s potters directly. '
                    'Includes a workshop kit, a wheel session with a master artisan, a souvenir firing and lunch at the craft village.')
             + fact('Terracotta Residency · ₹32,000 for two weeks', 'টেরাকোটা রেসিডেন্সি',
                    'A two-to-four-week residency for ceramic artists and researchers, ending in an exhibition that supports the mandir’s programmes. '
                    'Includes studio space, artisan mentorship, a material stipend, and a chance to show and sell.')
             + fact('Craft-village walk', 'দুপুর ২টায় কুমোরপাড়া', 'A 2 PM walk through the potters’ lanes of Panchmura.'))
    btns = (f'<div class="btns">{btn(ctx, "Plan your visit" + arrow(16), "visit", "haldi", cls="btn--sm")}'
            f'{btn(ctx, "Guest-house experiences", "visit#experiences", "ghost", cls="btn--sm")}</div>')
    return section(f'<div class="abt-pm"><figure class="abt-pm__art"><img src="{src}" alt="A Bankura horse in Panchmura terracotta, against a yellow sun" '
                   f'width="540" height="560" loading="lazy" decoding="async"></figure>'
                   f'<div class="abt-pm__t"><h2 class="abt-pm__h" lang="bn" id="pm-h">পাঁচমুড়া</h2><p class="abt-pm__en">The potters’ village</p>'
                   f'<div class="facts abt-pm__facts">{facts}</div>{btns}</div></div>', 'peacock', sid='panchmura', labelledby='pm-h')


# ---------------------------------------------------------------- the people
def people_section(ctx):
    temple_icon = (f'<svg class="abt-pcard__ic" width="120" height="120" viewBox="0 0 160 160" aria-hidden="true" focusable="false">'
                   f'{temple(80, 128, 1.05, SINDOOR, KAJAL, HALDI, HALDI, HALDI)}</svg>')
    # no photographs on the site (decided 7 Oct 2026): the founder's card carries a painted monogram of his initials
    mono = '<span class="abt-mono" aria-hidden="true"><span class="abt-mono__t" lang="bn">ভ<span class="abt-mono__d">·</span>দ</span></span>'
    founder = (f'<article class="abt-pcard abt-pcard--founder">{mono}'
               f'<h3 class="abt-pcard__bn" lang="bn">ভজন দত্ত</h3><p class="abt-pcard__en">Bhajan Dutta</p>'
               f'<p class="abt-pcard__role" lang="bn">প্রতিষ্ঠাতা ও আধ্যাত্মিক পথপ্রদর্শক</p><p class="abt-pcard__roleen">Founder &amp; Spiritual Guide</p></article>')
    trustees = (f'<article class="abt-pcard abt-pcard--trust">{temple_icon}<h3 class="abt-pcard__bn" lang="bn">ট্রাস্টি</h3><p class="abt-pcard__en">The trustees</p>'
                f'<p class="abt-pcard__d">The trustees acquired the temple plot between 2016 and 2019. The mandir runs on voluntary donations.</p></article>')
    vol = (f'<article class="abt-pcard abt-pcard--vol"><h3 class="abt-pcard__bn" lang="bn">সেবায় হাত\u00a0লাগান</h3><p class="abt-pcard__en">Join as a volunteer</p>'
           f'<p class="abt-pcard__d">In the temple, the kitchen, the classroom or the office, at the festivals, or from home. '
           f'Orientation is every second Saturday.</p>'
           f'<div class="abt-pcard__go">{btn(ctx, "Volunteer with us" + arrow(16), "seva#volunteer", "shola", cls="btn--sm")}</div></article>')
    more = ui.note('names of the trustees, the priests, the kitchen team and the health-camp doctors can be added to this section later, if the mandir wishes.', 'p')
    aside = '<p>The founder, the trustees and the volunteers who keep the seva going.</p>'
    return section(sec_head('মন্দিরের মানুষ', 'The people', aside, hid='people-h')
                   + f'<div class="abt-people">{founder}{trustees}{vol}</div>{more}', 'shola', sid='people', labelledby='people-h')


def render(ctx):
    return (hero(ctx) + names_band(ctx) + journey_section(ctx) + dharas_section(ctx) + arch_section(ctx)
            + work_section(ctx) + panchmura_section(ctx) + people_section(ctx))
