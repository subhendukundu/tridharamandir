"""Seva page: choose a seva, count the plates of anna-daan, send a seva request, how to pay, rituals and ceremonies
(the old /services/marriage-and-rituals comes here, to #rituals) and volunteering (the old /volunteer, to #volunteer).
There is no payment gateway: the seva form only sends a request (src/js/40-forms.js posts every form to /api/form on the
live site; the test link shows a summary instead). src/js/58-seva.js runs the plate calculator, the live summary,
the ceremony picker and the seva-desk status. Facts: content/FACTS.md and content/CURRENT_SITE_FACTS.md."""
import math
import re
from urllib.parse import quote
from lib import ui
from lib.ui import esc, btn, section, field, form, copy_value, bn, times  # noqa: F401 (times is used here and by other pages)
from lib.art import arrow, sun, board_files, shikhara, SINDOOR, HALDI, SHOLA, KAJAL, NEEL, ABIR, PEACOCK, PEACOCK_D
from lib.motifs import f, horse_flat, wheel

PAGE = dict(key='seva', title='Seva, rituals and volunteering',
            description='Offer a seva at Tridhara Milan Mandir, Panchmura: anna-daan, health camps or heritage-arts scholarships. '
                        'Book a ceremony, or volunteer.',
            tone='haldi')

CLAY = '#C0602F'; CLAY_D = '#A44D23'; CLAY_L = '#DE7D45'; LEAF = '#4E8B31'; LEAF_D = '#2C5A19'; KHICHURI = '#EBA637'
RATE_AMOUNT, RATE_PLATES = 1001, 80          # "₹1,001 feeds 80 devotees" (content/FACTS.md): about ₹12.50 a plate


def sec_head(*a, **k):
    """ui.sec_head with a page class, so its aside can sit at the right edge when it wraps under the title (see 58-seva.css)."""
    return ui.sec_head(*a, **k).replace('class="sec-head"', 'class="sec-head sev-head"', 1)


# ---------------------------------------------------------------- drawings (ported from the design, b_seva.py)
def leaf_plate(x, y, rx=92, ry=24, food=False, sw=4):
    """Sal-pata (stitched sal-leaf plate) seen at an angle, centre (x, y)."""
    veins = ''.join(f'<path d="M{f(x + rx * .18 * math.cos(a))},{f(y + ry * .18 * math.sin(a))} L{f(x + rx * .86 * math.cos(a))},{f(y + ry * .86 * math.sin(a))}" stroke="{LEAF_D}" stroke-width="2"/>'
                    for a in [i * math.pi / 5 for i in range(10)])
    out = (f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{rx}" ry="{ry}" fill="{LEAF}" stroke="{KAJAL}" stroke-width="{sw}"/>'
           f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(rx * .62)}" ry="{f(ry * .62)}" fill="none" stroke="{LEAF_D}" stroke-width="2.2" stroke-dasharray="5 5"/>{veins}')
    if food:
        out += (f'<path d="M{f(x - rx * .5)},{f(y + 2)} C{f(x - rx * .42)},{f(y - ry * 1.3)} {f(x + rx * .4)},{f(y - ry * 1.5)} {f(x + rx * .5)},{f(y + 2)} '
                f'C{f(x + rx * .2)},{f(y + ry * .45)} {f(x - rx * .2)},{f(y + ry * .45)} {f(x - rx * .5)},{f(y + 2)} Z" fill="{KHICHURI}" stroke="{KAJAL}" stroke-width="{sw * .85:.1f}"/>'
                + ''.join(f'<ellipse cx="{f(x + dx * rx)}" cy="{f(y + dy * ry)}" rx="3.2" ry="1.8" fill="{SHOLA}"/>'
                          for dx, dy in ((-.22, -.6), (.05, -.9), (.25, -.55), (-.05, -.3), (.32, -.2))))
    return out


def plate_stack(x, y, n=5, rx=92, ry=24, gap=10):
    return ''.join(leaf_plate(x, y - i * gap, rx, ry, food=(i == n - 1)) for i in range(n))


def steam(x, y, h, sway=1, w=22):
    d = (f'M{f(x)},{f(y)} C{f(x - w * sway)},{f(y - h * .3)} {f(x + w * sway)},{f(y - h * .55)} {f(x)},{f(y - h * .78)} '
         f'C{f(x - w * .6 * sway)},{f(y - h * .9)} {f(x - w * .2 * sway)},{f(y - h)} {f(x + w * .2 * sway)},{f(y - h * 1.04)}')
    return (f'<path d="{d}" fill="none" stroke="{KAJAL}" stroke-width="16" stroke-linecap="round"/>'
            f'<path d="{d}" fill="none" stroke="{SHOLA}" stroke-width="8" stroke-linecap="round"/>')


def big_handi(cx, cy, s=1):
    """Open terracotta handi of khichuri with a brass ladle and steam. (0,0) = belly centre."""
    body = 'M-118,-146 C-196,-124 -232,-44 -224,22 C-214,112 -122,178 0,178 C122,178 214,112 224,22 C232,-44 196,-124 118,-146 Z'
    sheen = 'M-176,-70 C-198,-12 -190,58 -152,108 C-166,50 -168,-6 -150,-62 Z'
    band1, band2, band3 = 'M-198,-92 Q0,-34 198,-92', 'M-216,-46 Q0,16 216,-46', 'M-224,48 Q0,118 224,48'

    def q(t, a, b, c):
        return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t * t * c
    dots = ''.join(f'<circle cx="{f(q(t, -207, 0, 207))}" cy="{f(q(t, -70, -10, -70))}" r="5.5" fill="{SHOLA}"/>' for t in [i / 12 for i in range(1, 12)])
    leaves = ''
    for t in [i / 9 for i in range(1, 9)]:
        x, y = q(t, -224, 0, 224), q(t, 48, 118, 48) + 26
        leaves += f'<path d="M{f(x)},{f(y - 20)} C{f(x + 12)},{f(y - 8)} {f(x + 12)},{f(y + 8)} {f(x)},{f(y + 20)} C{f(x - 12)},{f(y + 8)} {f(x - 12)},{f(y - 8)} {f(x)},{f(y - 20)} Z" fill="{SHOLA}"/>'
    lip_front = 'M-148,-162 A148,30 0 0 0 148,-162 L120,-164 A120,20 0 0 1 -120,-164 Z'
    mound = 'M-116,-164 C-104,-200 -60,-212 -26,-204 C-4,-224 52,-222 72,-204 C100,-206 118,-186 116,-166 C70,-154 -70,-154 -116,-164 Z'
    grains = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="5" ry="2.6" transform="rotate({r} {x} {y})" fill="{SHOLA}"/>'
                     for x, y, r in ((-70, -190, 20), (-30, -196, -15), (10, -206, 10), (44, -198, 30), (80, -186, -20), (-90, -174, 0), (30, -180, -5), (-10, -176, 25)))
    ladle = (f'<g transform="translate(52,-176) rotate(36)"><rect x="-10" y="-196" width="20" height="200" rx="10" fill="#E2A92A" stroke="{KAJAL}" stroke-width="5"/>'
             f'<path d="M-4,-176 L-4,-20" stroke="#FFF1C2" stroke-width="4" stroke-linecap="round" opacity=".8"/><circle cx="0" cy="-204" r="15" fill="#E2A92A" stroke="{KAJAL}" stroke-width="5"/></g>')
    return (f'<g transform="translate({f(cx)},{f(cy)}) scale({s})">'
            f'<ellipse cx="0" cy="182" rx="206" ry="22" fill="{KAJAL}" opacity=".28"/>'
            f'{steam(-62, -214, 96, 1)}{steam(4, -228, 118, -1)}{steam(70, -212, 84, 1, 18)}'
            f'<path d="{body}" fill="{CLAY}" stroke="{KAJAL}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="{sheen}" fill="{CLAY_L}"/>'
            f'<path d="{band1}" fill="none" stroke="{SHOLA}" stroke-width="6"/><path d="{band2}" fill="none" stroke="{SHOLA}" stroke-width="6"/>{dots}'
            f'<path d="{band3}" fill="none" stroke="{KAJAL}" stroke-width="4" opacity=".55"/>{leaves}'
            f'<path d="M-118,-146 L-122,-162 L122,-162 L118,-146 Z" fill="{CLAY_D}" stroke="{KAJAL}" stroke-width="5" stroke-linejoin="round"/>'
            f'<ellipse cx="0" cy="-162" rx="148" ry="30" fill="{CLAY_D}" stroke="{KAJAL}" stroke-width="6"/>'
            f'<ellipse cx="0" cy="-164" rx="120" ry="20" fill="#4A1E0C"/>'
            f'<path d="{mound}" fill="{KHICHURI}" stroke="{KAJAL}" stroke-width="5" stroke-linejoin="round"/>{grains}{ladle}'
            f'<path d="{lip_front}" fill="{CLAY_D}" stroke="{KAJAL}" stroke-width="5" stroke-linejoin="round"/></g>')


def mini_handi(cx=50, cy=60, s=1, sw=3.5):
    """Open handi of khichuri with two wisps of steam, drawn for ~100-unit icons."""
    dots = ''.join(f'<circle cx="{x}" cy="{y}" r="2.2" fill="{SHOLA}"/>' for x, y in ((-28, -6), (-17, -3), (-6, -1.5), (6, -1.5), (17, -3), (28, -6)))
    return (f'<g transform="translate({cx},{cy}) scale({s})">'
            f'<path d="M-9,-38 C-15,-44 -3,-48 -9,-56 M9,-38 C3,-44 15,-48 9,-56" fill="none" stroke="{KAJAL}" stroke-width="{sw}" stroke-linecap="round"/>'
            f'<path d="M-24,-26 C-40,-21 -46,-6 -45,6 C-43,24 -24,36 0,36 C24,36 43,24 45,6 C46,-6 40,-21 24,-26 Z" fill="{CLAY}" stroke="{KAJAL}" stroke-width="{sw}" stroke-linejoin="round"/>'
            f'<path d="M-36,-16 C-40,-4 -38,10 -30,20 C-34,8 -34,-4 -30,-14 Z" fill="{CLAY_L}"/>'
            f'<path d="M-40,-14 Q0,4 40,-14" fill="none" stroke="{SHOLA}" stroke-width="2.6"/>{dots}'
            f'<ellipse cx="0" cy="-28" rx="30" ry="7.5" fill="{CLAY_D}" stroke="{KAJAL}" stroke-width="{sw * .85:.1f}"/>'
            f'<path d="M-23,-29 C-20,-38 -9,-40 -2,-37 C6,-42 18,-39 23,-29 C12,-26 -12,-26 -23,-29 Z" fill="{KHICHURI}" stroke="{KAJAL}" stroke-width="{sw * .75:.1f}" stroke-linejoin="round"/></g>')


def hero_shapes():
    return big_handi(1100, 420, .9) + plate_stack(1338, 580, 5, 88, 23, 10) + leaf_plate(880, 578, 100, 26, food=True)


# small card icons, drawn on a 100 x 100 grid
def ic_handi_inner():
    return mini_handi(50, 58, 1.05)


def ic_plates_inner():
    return (''.join(leaf_plate(50, 82 - i * 9, 40, 11, food=(i == 3), sw=3) for i in range(4))
            + f'<path d="M40,30 C34,22 46,18 40,10 M60,30 C54,22 66,18 60,10" fill="none" stroke="{KAJAL}" stroke-width="3.4" stroke-linecap="round"/>')


def ic_health_inner():
    return (f'<path d="M36,30 L36,20 Q36,14 42,14 L58,14 Q64,14 64,20 L64,30" fill="none" stroke="{KAJAL}" stroke-width="5"/>'
            f'<rect x="10" y="28" width="80" height="60" rx="8" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<path d="M44,40 L56,40 L56,52 L68,52 L68,64 L56,64 L56,76 L44,76 L44,64 L32,64 L32,52 L44,52 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>')


def ic_book_inner():
    lines = ''.join(f'<path d="M{x0},{y} L{x1},{y + d}" stroke="{KAJAL}" stroke-width="2" opacity=".6"/>'
                    for x0, x1, y, d in ((16, 42, 44, 2), (16, 42, 54, 2), (16, 36, 64, 2), (58, 84, 46, -2), (58, 84, 56, -2), (58, 78, 66, -2)))
    return (f'<path d="M50,36 C38,28 20,28 6,32 L6,86 C20,82 38,82 50,90 C62,82 80,82 94,86 L94,32 C80,28 62,28 50,36 Z" fill="{NEEL}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M50,34 C38,26 22,26 10,30 L10,80 C22,76 38,76 50,84 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M50,34 C62,26 78,26 90,30 L90,80 C78,76 62,76 50,84 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>{lines}'
            f'<g transform="translate(54,20) rotate(-24)"><rect x="-40" y="-6" width="80" height="12" rx="6" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            + ''.join(f'<circle cx="{x}" cy="0" r="2.2" fill="{KAJAL}"/>' for x in (-14, -4, 6, 16, 26)) + '</g>')


def ic_month_inner():
    cells = ''
    for r in range(3):
        for c in range(5):
            x, y = 24 + c * 13, 54 + r * 12
            cells += (f'<circle cx="{x}" cy="{y}" r="7.5" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.5"/>' if (r, c) == (1, 2)
                      else f'<circle cx="{x}" cy="{y}" r="3" fill="{KAJAL}" opacity=".55"/>')
    return (f'<rect x="10" y="20" width="80" height="70" rx="4" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<path d="M10,24 Q10,20 14,20 L86,20 Q90,20 90,24 L90,40 L10,40 Z" fill="{ABIR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<rect x="28" y="10" width="8" height="20" rx="4" fill="{KAJAL}"/><rect x="64" y="10" width="8" height="20" rx="4" fill="{KAJAL}"/>{cells}')


def ic_steward_inner():
    return (f'<g transform="translate(18,6) scale(.135)">{horse_flat(CLAY)}</g>'
            f'<path d="M14,94 L90,94" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>')


def icon(inner, cls='sev-ic', size=84):
    return f'<svg class="{cls}" width="{size}" height="{size}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">{inner}</svg>'


# ---------------------------------------------------------------- the six sevas
# Amounts as the current site gives them (content/CURRENT_SITE_FACTS.md; where it contradicts itself, its homepage wins).
SEVAS = [
    dict(id='annadaan', tag=('অন্ন', 'Feed'), amount=1001, bn='অন্নদান · ৮০ জন', en='Anna-daan for 80', name_bn='অন্নদান', name_en='Anna-daan',
         desc='Prasad for 80 devotees, cooked in terracotta handis.', accent='haldi', icon=ic_handi_inner, plates=True,
         opt='₹1,001 · feeds about 80'),
    dict(id='festival', tag=('অন্ন', 'Feed'), amount=5001, bn='উৎসবের অন্নদান', en='Festival anna-daan', name_bn='উৎসবের অন্নদান', name_en='Festival anna-daan',
         desc='Anna-daan for about 400 devotees on a festival day.', accent='sindoor', icon=ic_plates_inner, plates=True, opt='₹5,001 · about 400, on a festival day'),
    dict(id='health', tag=('আরোগ্য', 'Heal'), amount=5001, bn='স্বাস্থ্য শিবির', en='Health-camp supplies', name_bn='স্বাস্থ্য শিবির', name_en='Health-camp supplies',
         desc='Medical supplies for the quarterly health camps in 15 Panchmura villages.', accent='peacock', icon=ic_health_inner, opt='₹5,001'),
    dict(id='scholarship', tag=('শিক্ষা', 'Teach'), amount=11001, bn='শিল্পশিক্ষা বৃত্তি', en='Heritage-arts scholarship', name_bn='শিল্পশিক্ষা বৃত্তি', name_en='Heritage-arts scholarship',
         desc='Textbooks, instruments and travel for five heritage-arts students.', accent='neel', icon=ic_book_inner, opt='₹11,001'),
    dict(id='monthly', tag=('প্রতি মাসে', 'Every month'), amount=1501, bn='মাসিক সেবা চক্র', en='Monthly Seva Circle', name_bn='মাসিক সেবা চক্র', name_en='Monthly Seva Circle',
         desc='Join the circle with a fixed seva every month.', accent='abir', icon=ic_month_inner, monthly=True, opt='₹1,501 a month'),
    dict(id='steward', tag=('ঐতিহ্য', 'Heritage'), amount=25001, bn='ঐতিহ্য রক্ষক', en='Heritage Steward', name_bn='ঐতিহ্য রক্ষক', name_en='Heritage Steward',
         desc='Restoration, archival recordings and trilingual signage.', accent='kajal', icon=ic_steward_inner, opt='₹25,001'),
]
PRICE_NOTE = ('the current website gives three different sets of seva prices. This page shows the homepage’s three sevas, '
              'the Festival Anna-Daan from the bhog page, and the Monthly Seva Circle and Heritage Steward from the donation page. '
              'Left out: ₹10,001 Quarterly Impact Patron, ₹11,001 Monthly Kitchen Patron and ₹1,001 Khichuri Seva (about 75); '
              'visitors can still ask for any of them under “Another seva” in the form.')


RECEIPT = 'Receipt within 48 hours of contribution confirmation'      # the current site's words


def inr(n):
    """1001 -> ₹1,001 ; 100000 -> ₹1,00,000 (Indian grouping)."""
    s = str(int(n))
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        head = re.sub(r'(\d)(?=(\d\d)+$)', r'\1,', head)
        s = head + ',' + tail
    return '₹' + s


def art_block(ctx, files, cls='', inner=''):
    """The first-screen art as a .phero__art box we can add a sticker to (page_hero's own <picture> takes no class).
    The desktop file is drawn 200 board units wider than the art column; on screens wider than 1440 px the page CSS
    lets that extra part show (instead of the art ending in a hard edge)."""
    for n, svg in files.items():
        ctx.add_img(n, svg)
    names = sorted(files)
    desk = next(n for n in names if not n.endswith('-m.svg'))
    mob = next((n for n in names if n.endswith('-m.svg')), desk)

    def wh(name):
        m = re.search(r'width="([\d.]+)" height="([\d.]+)"', files[name])
        return f' width="{m.group(1)}" height="{m.group(2)}"' if m else ''
    return (f'<div class="phero__art {cls}"><picture><source media="(max-width: 899px)" srcset="{ctx.img(mob)}"{wh(mob)}>'
            f'<img src="{ctx.img(desk)}" alt=""{wh(desk)} decoding="async" fetchpriority="high"></picture>{inner}</div>')


HERO_VIEW = (600, 0, 1040, 620)   # the art column (x 600–1440 of the 1440 x 620 board) plus 200 units that show only on wide screens


# ---------------------------------------------------------------- first screen
def hero(ctx):
    d, s = sun('svS', 1096, 318, 262, SINDOOR, HALDI)
    files = board_files('seva-hero', d, s + hero_shapes(), view=HERO_VIEW, view_m=(770, 40, 670, 580))
    stk = ui.sticker('২০০০+', 'পাত রোজ', 'plates a day', label='2,000+ plates of prasad every day', cls='sev-hero__sticker')
    btns = (f'<div class="btns">{btn(ctx, "Choose a seva" + arrow(16), "#choose", "tone")}'
            f'{btn(ctx, "Count the plates", "#plates", "ghost")}</div>'
            f'<p class="sev-hero__also"><span>Also on this page:</span> <a class="u" href="#rituals">Rituals and ceremonies</a> · '
            f'<a class="u" href="#volunteer">Volunteer</a></p>')
    # w: the title is 1.5 em wide (tools/measure_titles.py সেবা); 3.17 leaves room beside it for the sticker
    out = ui.page_hero(ctx, 'seva', 'সেবা', 'Seva that feeds, heals and teaches',
                       'Choose what your seva does: feed devotees, support health camps, or help heritage-arts students.',
                       w=3.17, pt=.02, ph_max=250, pa_w=840 / 1440, extra=btns + stk, sr_en='Seva',
                       sticker_html=art_block(ctx, files, 'sev-hero__art'))
    return out.replace('class="phero"', 'class="phero sev-hero"', 1)


# ---------------------------------------------------------------- choose a seva
def choose_section(ctx):
    cards = ''
    for s in SEVAS:
        price = inr(s['amount']) + ('<span class="sev-card__per"> / month</span>' if s.get('monthly') else '')
        go = btn(ctx, 'Offer this seva' + arrow(16), '#seva-form', 'kajal', cls='btn--sm', attrs=' data-sev-pick="' + s['id'] + '"')
        cards += (f'<li class="sev-card" style="--accent: var(--{s["accent"]});">'
                  f'<span class="sev-card__tag"><span lang="bn">{s["tag"][0]}</span><span class="sev-card__tag-en">{s["tag"][1]}</span></span>'
                  f'<article class="seva-card sev-card__in" aria-labelledby="sev-c-{s["id"]}">'
                  f'<div class="sev-card__top"><p class="seva-card__amt"><span class="sev-card__price">{price}</span></p>{icon(s["icon"]())}</div>'
                  f'<h3 class="seva-card__bn" lang="bn" id="sev-c-{s["id"]}">{s["bn"]}</h3>'
                  f'<p class="seva-card__en">{s["en"]}</p><p class="seva-card__desc">{s["desc"]}</p>'
                  f'<div class="seva-card__cta">{go}</div>'
                  f'</article></li>')
    aside = '<p>Choose one, then tell us in whose name you offer it.</p>'
    swipe = (f'<p class="sev-swipe" aria-hidden="true"><span lang="bn">সরিয়ে দেখুন</span><span class="sev-swipe__en">Six sevas · swipe</span>{arrow(20)}</p>')
    return section(sec_head('সেবা বেছে নিন', 'Choose a seva', aside, hid='choose-h')
                   + f'<div class="sev-cardwrap" data-scroll><ul class="sev-cards" aria-label="Six sevas">{cards}</ul></div>{swipe}'
                   + ui.note(PRICE_NOTE, 'p'),
                   'shola', sid='choose', labelledby='choose-h')


# ---------------------------------------------------------------- plate calculator
def plate_defs():
    c = 22.5
    veins = ''.join(f'<path d="M{f(c + 7 * math.cos(a))},{f(c + 7 * math.sin(a))} L{f(c + 16 * math.cos(a))},{f(c + 16 * math.sin(a))}"/>'
                    for a in [k * math.pi / 4 + .39 for k in range(8)])
    return (f'<symbol id="sev-plate" viewBox="0 0 45 45"><circle cx="{c}" cy="{c}" r="19" fill="{LEAF}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<g stroke="{LEAF_D}" stroke-width="1.6">{veins}</g><circle cx="{c}" cy="{c}" r="7" fill="{KHICHURI}" stroke="{KAJAL}" stroke-width="2"/></symbol>'
            f'<symbol id="sev-plate-e" viewBox="0 0 45 45"><circle cx="{c}" cy="{c}" r="18" fill="none" stroke="{KAJAL}" stroke-width="2.4" stroke-dasharray="4 4" opacity=".45"/></symbol>')


def calc_section(ctx):
    picks = ''
    for n, amount in ((80, 1001), (400, 5001)):      # ₹1,001 feeds 80 (homepage); ₹5,001 about 400 (bhog page)
        picks += (f'<button class="sev-pick" type="button" aria-pressed="{"true" if n == 80 else "false"}" data-calc-pick="{amount}">'
                  f'<span class="sev-pick__n" lang="bn">{bn(n)}</span><span class="sev-pick__en">{n} plates · {inr(amount)}</span></button>')
    picks += ('<button class="sev-pick sev-pick--custom" type="button" aria-pressed="false" data-calc-custom>'
              '<span class="sev-pick__n sev-pick__n--word" lang="bn">অন্য অঙ্ক</span><span class="sev-pick__en">Your amount</span></button>')
    uses = ''.join(f'<use href="#sev-plate" x="{(i % 16) * 45}" y="{(i // 16) * 45}" width="45" height="45"/>' for i in range(80))
    grid = (f'<svg class="sev-calc__svg" viewBox="0 0 720 225" role="img" aria-label="80 leaf plates" data-calc-svg>'
            f'<defs>{plate_defs()}</defs><g data-calc-plates>{uses}</g></svg>')
    amount = field('calc-amount', 'টাকার অঙ্ক', 'Amount in rupees', 'number', name='calc_amount', value=str(RATE_AMOUNT),
                   attrs=' min="1" max="9999999" step="1" inputmode="numeric" data-calc-input', cls='sev-calc__field')
    left = (f'<div class="sev-calc__l">'
            f'<p class="sev-calc__q"><span class="sev-calc__qbn" lang="bn">কত পাত?</span><span class="sev-calc__qen">Choose the plates, or type an amount</span></p>'
            f'<div class="sev-picks" role="group" aria-label="Number of plates">{picks}</div>'
            f'<div class="sev-calc__amt"><span class="sev-calc__rupee" aria-hidden="true">₹</span>{amount}</div>'
            f'<figure class="sev-calc__grid">{grid}<figcaption class="sev-calc__cap"><span lang="bn" data-calc-capbn>৮০ জন, ৮০টি পাত</span>'
            f'<span class="sev-calc__capen" data-calc-capen>Each plate is one devotee fed</span></figcaption></figure></div>')
    go = btn(ctx, 'Offer this seva' + arrow(16), '#seva-form', 'kajal', attrs=' data-sev-pick="annadaan" data-sev-from-calc')
    right = (f'<div class="sev-calc__r">'
             f'<p class="sev-calc__k">Your anna-daan</p>'
             f'<p class="sev-calc__total" data-calc-total>{inr(RATE_AMOUNT)}</p>'
             f'<div aria-live="polite" aria-atomic="true"><p class="sev-calc__bn" lang="bn" data-calc-bn>প্রায় ৮০ জনের পাত</p>'
             f'<p class="sev-calc__en" data-calc-en>About 80 plates of anna-daan</p></div>'
             f'<p class="sev-calc__est"><span class="sev-calc__estk">An estimate</span> About ₹12.50 a plate (₹1,001 feeds 80 devotees).</p>'
             f'<div class="sev-calc__go">{go}</div></div>')
    aside = '<p>Every plate is sattvic and onion-free, cooked in terracotta handis, and served free to whoever comes.</p>'
    return section(sec_head('কতজনকে খাওয়াবেন?', 'How many will you feed?', aside, hid='plates-h')
                   + f'<div class="sev-calc" data-sev-calc>{left}{right}</div>', 'kajal', sid='plates', labelledby='plates-h')


# ---------------------------------------------------------------- the seva request form
OCCASIONS = ['durga', 'lakshmi', 'kali', 'jagaddhatri', 'rash', 'saraswati', 'shivaratri', 'dol', 'basanti', 'boishakh', 'rath', 'janmashtami']


def seva_fieldset():
    opts = ''
    for s in SEVAS:
        chk = ' checked' if s['id'] == 'annadaan' else ''
        extra = (' data-plates' if s.get('plates') else '') + (' data-monthly' if s.get('monthly') else '')
        opts += (f'<label class="sev-opt">'
                 f'<input type="radio" name="seva" value="{s["id"]}" data-text="{esc(s["name_en"])}" data-amount="{s["amount"]}"'
                 f' data-bn="{esc(s["name_bn"])}"{extra}{chk}>'
                 f'<span class="sev-opt__t"><span class="sev-opt__bn" lang="bn">{s["name_bn"]}</span><span class="sev-opt__en">{s["name_en"]}</span>'
                 f'<span class="sev-opt__amt">{s["opt"]}</span></span></label>')
    # for anything not on the list (the Durga Puja page sends people here for the Khichuri and bhog sevas)
    opts += ('<label class="sev-opt sev-opt--other">'
             '<input type="radio" name="seva" value="other" data-text="Another seva" data-amount="" data-bn="অন্য সেবা" data-other>'
             '<span class="sev-opt__t"><span class="sev-opt__bn" lang="bn">অন্য সেবা</span><span class="sev-opt__en">Another seva</span>'
             '<span class="sev-opt__amt">Tell us which, below</span></span></label>')
    return (f'<fieldset class="sev-fs" data-required data-label="Seva"><legend class="sev-fs__l"><span class="field__bn" lang="bn">সেবা</span>'
            f'<span class="field__en">Choose a seva</span><span class="field__req" aria-hidden="true">*</span></legend>'
            f'<div class="sev-opts">{opts}</div></fieldset>')


PAY_WAYS = [('upi', 'ইউপিআই', 'UPI'), ('bank', 'ব্যাংক ট্রান্সফার', 'Bank transfer'), ('cheque', 'চেক', 'Cheque')]


def pay_fieldset(ctx):
    P = ctx.data['payment']
    opts = ''
    for i, (v, b, e) in enumerate(PAY_WAYS):
        chk = ' checked' if i == 0 else ''
        opts += (f'<label class="sev-pay"><input type="radio" name="pay" value="{v}" data-text="{e}"{chk}>'
                 f'<span class="sev-pay__t"><span class="sev-pay__bn" lang="bn">{b}</span><span class="sev-pay__en">{e}</span></span></label>')
    # the current site never publishes the UPI ID, the bank details or the cheque payee: the seva desk gives them
    return (f'<fieldset class="sev-fs" data-required data-label="Payment"><legend class="sev-fs__l"><span class="field__bn" lang="bn">কীভাবে দেবেন</span>'
            f'<span class="field__en">How you will pay</span></legend><div class="sev-pays">{opts}</div>'
            f'<p class="sev-pays__how">{times(P["how"])}</p></fieldset>')


def form_section(ctx):
    occ = [('any', 'যেকোনো দিন · Any day')]
    names = {}
    for fid in OCCASIONS:
        fe = ui.festival(ctx, fid)
        tbd = ' (date to be confirmed)' if fe.get('confirm') else ''
        names[fid] = fe['en'].split(' · ')[0] + tbd
        occ.append((fid, f'{fe["bn"]} · {fe["en"].split(" · ")[0]} · {fe["date_en"]}{tbd}'))
    occ.append(('date', 'অন্য দিন · A date of my choice'))
    when = field('seva-when', 'কবে', 'Occasion', 'select', name='occasion', options=occ, value='any', attrs=' data-sev-when')
    for fid in OCCASIONS:      # data-end lets the page drop festivals that have already passed; data-name is for the summary card
        fe = ui.festival(ctx, fid)
        when = when.replace(f'<option value="{fid}">', f'<option value="{fid}" data-end="{fe["end"]}" data-name="{esc(names[fid])}">', 1)
    when = when.replace('<option value="', '<option lang="bn" value="')     # every occasion leads with its Bengali name
    which = ('<div class="sev-which" data-sev-which-wrap hidden>'
             + field('seva-which', 'কোন সেবা', 'Which seva', 'text', name='which', placeholder='For example, Khichuri seva',
                     attrs=' data-sev-which disabled')
             + '</div>')
    amount_hint = '<span data-sev-amt-hint>About 80 plates of anna-daan (an estimate). Change the amount if you wish.</span>'
    inner = (seva_fieldset() + which
             + '<div class="form__row">'
             + field('seva-amount', 'টাকার অঙ্ক', 'Amount (₹)', 'number', name='amount', required=True, value=str(RATE_AMOUNT),
                     attrs=' min="1" max="9999999" step="1" inputmode="numeric" data-label="Amount" data-format="inr"', hint=amount_hint, cls='sev-amtf')
             + '</div><div class="form__row">'
             + field('seva-name', 'নাম', 'Your name', 'text', name='name', required=True, autocomplete='name', placeholder='Your full name')
             + field('seva-phone', 'ফোন', 'Phone', 'tel', name='phone', required=True, autocomplete='tel', placeholder='98300 00000', attrs=' inputmode="tel"')
             + field('seva-email', 'ইমেল', 'Email · optional', 'email', name='email', autocomplete='email', placeholder='you@example.com', attrs=' data-label="Email"')
             + '</div><div class="form__row">'
             + field('seva-for', 'কার নামে', 'In whose name', 'text', name='in_name_of', attrs=' data-label="In the name of"',
                     hint='Tell us in whose name you offer it.')
             + '</div><div class="form__row">'
             + when
             + field('seva-date', 'তারিখ', 'Date · optional', 'date', name='date', attrs=' data-label="Date" data-sev-date')
             + '</div>'
             + pay_fieldset(ctx)
             + field('seva-msg', 'বার্তা', 'Message · optional', 'textarea', name='message', rows=3, placeholder='Anything the mandir should know',
                     attrs=' data-label="Message"')
             + '<p class="sev-formnote">Nothing is paid on this website. The button sends your request to the mandir; then you pay in the way you chose.</p>')
    the_form = form(ctx, 'seva-form', 'Seva request', inner, submit=f'Send request<span data-sev-total> · {inr(RATE_AMOUNT)}</span>{arrow(18)}',
                    cls='sev-form')
    icons = ''.join(f'<span class="sev-sum__ic" data-sum-ic="{s["id"]}"{"" if s["id"] == "annadaan" else " hidden"}>{icon(s["icon"](), "sev-ic", 84)}</span>' for s in SEVAS)
    icons += f'<span class="sev-sum__ic" data-sum-ic="other" hidden>{icon(ic_handi_inner(), "sev-ic", 84)}</span>'

    def row(key, b, e, v, hidden=False):
        h = ' hidden' if hidden else ''
        lang = ' lang="bn"' if key == 'plates' else ''
        return (f'<div class="sev-sum__row" data-sum-row="{key}"{h}><dt><span lang="bn">{b}</span><span class="sev-sum__k">{e}</span></dt>'
                f'<dd data-sum="{key}"{lang}>{v}</dd></div>')
    summary = (f'<aside class="sev-sum" aria-label="Your seva so far">'
               f'<div class="sev-sum__top"><div class="sev-sum__t"><p class="sev-sum__kk">Your seva</p>'
               f'<p class="sev-sum__bn" lang="bn" data-sum="bn">অন্নদান</p><p class="sev-sum__en" data-sum="en">Anna-daan</p></div>'
               f'<span class="sev-sum__medal" aria-hidden="true">{icons}</span></div>'
               f'<dl class="sev-sum__rows">{row("plates", "পাত", "Plates", "প্রায় ৮০")}{row("when", "কবে", "When", "Any day")}'
               f'{row("for", "কার নামে", "In the name of", "—")}{row("pay", "দেবেন", "Payment", "UPI")}</dl>'
               f'<div class="sev-sum__total"><span class="sev-sum__tk"><span lang="bn">মোট</span><span class="sev-sum__k">Total</span></span>'
               f'<span class="sev-sum__amtw"><span class="sev-sum__amt" data-sum="total">{inr(RATE_AMOUNT)}</span>'
               f'<span class="sev-sum__per" data-sum-per hidden>a month</span></span></div>'
               f'<p class="sev-sum__note">{RECEIPT}. Anna-daan prasad is served free every day, {times("12:30–2 PM")}.</p></aside>')
    aside = f'<p>A few details and how you will pay. {RECEIPT}.</p>'
    return section(sec_head('আপনার সেবা', 'Your seva request', aside, hid='order-h')
                   + f'<div class="sev-order">{the_form}{summary}</div>', 'paper', cls='sev-order-sec', sid='order', labelledby='order-h')


# ---------------------------------------------------------------- how to pay
def ic_upi_inner():
    """A phone paying by UPI: the rupee sign on its screen."""
    return (f'<rect x="29" y="6" width="42" height="88" rx="9" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<rect x="35" y="16" width="30" height="60" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<circle cx="50" cy="85" r="3.4" fill="{KAJAL}"/>'
            f'<path d="M42,30 L58,30 M42,38 L58,38 M44,30 C56,30 56,46 44,46 L57,62" fill="none" stroke="{KAJAL}" stroke-width="4" '
            f'stroke-linecap="round" stroke-linejoin="round"/>')


def ic_bank_inner():
    cols = ''.join(f'<rect x="{x}" y="43" width="9" height="33" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/>' for x in (19, 35, 56, 72))
    return (f'<path d="M10,38 L50,12 L90,38 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<circle cx="50" cy="28" r="5" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<rect x="12" y="36" width="76" height="7" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>{cols}'
            f'<rect x="12" y="76" width="76" height="8" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<rect x="6" y="84" width="88" height="8" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/>')


def ic_cheque_inner():
    return (f'<g transform="rotate(-8 50 50)"><rect x="6" y="26" width="88" height="50" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<rect x="6" y="26" width="88" height="11" fill="{PEACOCK}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<path d="M14,50 L54,50 M14,60 L42,60" stroke="{KAJAL}" stroke-width="3" opacity=".55"/>'
            f'<rect x="62" y="44" width="24" height="12" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<path d="M52,70 C56,62 60,74 64,66 C68,60 71,72 80,66" fill="none" stroke="{KAJAL}" stroke-width="2.5" stroke-linecap="round"/></g>')


PAY_ICONS = {'upi': ic_upi_inner, 'bank': ic_bank_inner, 'cheque': ic_cheque_inner}


def pay_section(ctx):
    P = ctx.data['payment']
    c = ctx.data['contact']
    ways = ''.join(f'<li class="sev-way sev-way--{k}">{icon(PAY_ICONS[k](), "sev-way__ic", 72)}'
                   f'<p class="sev-way__h"><span class="sev-way__bn" lang="bn">{b}</span><span class="sev-way__en">{e}</span></p></li>'
                   for k, b, e in PAY_WAYS)
    # the current site never publishes the UPI ID, the bank details or the cheque payee: the seva desk gives them
    mail = 'mailto:' + c['email'] + '?subject=' + quote('Seva payment details')
    desk = (f'<div class="sev-paydesk"><p class="sev-paydesk__k"><span lang="bn">বিবরণ সেবা ডেস্কে</span>'
            f'<span class="sev-paydesk__ke">Details from the seva desk</span></p>'
            f'<p class="sev-paydesk__t">{times(P["how"])} Paying by cheque? Ask them whom to make it payable to.</p>'
            f'<p class="sev-paydesk__phone">{copy_value(c["phone"], href="tel:" + c["phone_e164"])}</p>'
            f'<p class="sev-paydesk__mail">{copy_value(c["email"], href=mail)}</p></div>')

    def fact(k, t):
        return f'<div class="fact"><p class="fact__k">{k}</p><p class="fact__t">{t}</p></div>'
    facts = (fact('Receipt', 'Within 48 hours of contribution confirmation') + fact('Tax', P['tax'])
             + fact('Seva desk', times('8 AM–6 PM') + ' daily'))
    safe = ('<div class="sev-safe"><p><strong>No card payments on this website.</strong> It never asks for card details or passwords. '
            'The seva form sends the mandir your request; you pay afterwards, in the way you chose.</p></div>')
    aside = f'<p>{P["methods"]}. Send your request first, then pay in the way that suits you.</p>'
    return section(sec_head('কীভাবে দেবেন', 'How to pay', aside, hid='pay-h')
                   + f'<div class="sev-payrow"><ul class="sev-ways" aria-label="Ways to pay">{ways}</ul>{desk}</div>'
                   + f'<div class="facts sev-payfacts">{facts}</div>{safe}',
                   'neel', sid='pay', labelledby='pay-h')


# ---------------------------------------------------------------- where it goes
def impact_section(ctx):
    def medal(inner, fill=HALDI):
        return (f'<svg class="sev-medal" width="124" height="124" viewBox="0 0 124 124" aria-hidden="true" focusable="false"><circle cx="64" cy="64" r="56" fill="{KAJAL}"/>'
                f'<circle cx="58" cy="58" r="56" fill="{fill}" stroke="{KAJAL}" stroke-width="4"/>{inner}</svg>')

    def col(num, b, e, body, m):
        return (f'<li class="sev-imp">{m}<p class="sev-imp__n" lang="bn">{num}</p><p class="sev-imp__bn" lang="bn">{b}</p>'
                f'<p class="sev-imp__en">{e}</p><p class="sev-imp__d">{body}</p></li>')
    cols = (col('২০০০+', 'পাত প্রসাদ, প্রতিদিন', 'Plates a day', 'Anna-daan from the mandir kitchen: sattvic, onion-free, cooked in terracotta handis.',
                medal(mini_handi(58, 70, .9, 3.8)))
            + col('১২০+', 'ছাত্রছাত্রী, প্রতি বছর', 'Students a year', 'Supported in Sanskrit, music and STEM.',
                  medal(f'<g transform="translate(20,18) scale(.76)">{ic_book_inner()}</g>', SHOLA))
            + col('৫০০+', 'রোগী, প্রতি শিবিরে', 'Patients per health camp', 'Quarterly camps across 15 villages, with volunteer doctors from Kolkata and Durgapur.',
                  medal(f'<g transform="translate(20,20) scale(.76)">{ic_health_inner()}</g>')))
    aside = btn(ctx, 'Choose a seva' + arrow(16), '#choose', 'shola', cls='btn--sm')
    return section(sec_head('সেবা কোথায় যায়', 'Where it goes', aside, hid='imp-h') + f'<ul class="sev-imps">{cols}</ul>',
                   'sindoor', sid='where', labelledby='imp-h')


# ---------------------------------------------------------------- prasad is free
def prasad_band(ctx):
    return section(f'<div class="sev-prasad"><div class="sev-prasad__t"><h2 class="sev-prasad__h" lang="bn" id="prasad-h">অন্নদান প্রসাদ সবার জন্য</h2>'
                   f'<p class="sev-prasad__en">Anna-daan prasad is free for every visitor</p></div>'
                   f'<ul class="sev-prasad__list">'
                   f'<li><span class="sev-prasad__big">{times("12:30–2 PM")}</span><span>The free midday meal, every day, for visitors, villagers and devotees alike.</span></li>'
                   f'<li><span class="sev-prasad__big">₹300</span><span>Takeaway prasad, packed for elders or devotees who cannot come. The ₹300 covers the packaging.</span></li>'
                   f'</ul></div>',
                   'haldi', cls='sec--tight', sid='prasad', labelledby='prasad-h')


# ---------------------------------------------------------------- rituals and ceremonies (the old /services/marriage-and-rituals)
def ic_mandap_inner():
    garland = 'M20,45 Q27,54 34,45 Q42,54 50,45 Q58,54 66,45 Q73,54 80,45'
    return (f'<path d="M12,43 L50,13 L88,43 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<circle cx="50" cy="12" r="4.5" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<rect x="18" y="43" width="8" height="43" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3.5"/>'
            f'<rect x="74" y="43" width="8" height="43" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3.5"/>'
            f'<path d="{garland}" fill="none" stroke="{KAJAL}" stroke-width="8.5" stroke-linecap="round"/>'
            f'<path d="{garland}" fill="none" stroke="{HALDI}" stroke-width="4.5" stroke-linecap="round"/>'
            f'<path d="M50,74 C57,67 55,60 50,51 C45,60 43,67 50,74 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2.6"/>'
            f'<path d="M40,86 L43,75 L57,75 L60,86 Z" fill="{CLAY}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
            f'<rect x="8" y="86" width="84" height="8" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3.5"/>')


def ic_homa_inner():
    """A havan kund with its fire."""
    return (f'<path d="M50,66 C69,53 63,34 50,10 C37,34 31,53 50,66 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
            f'<path d="M50,63 C59,55 56,45 50,30 C44,45 41,55 50,63 Z" fill="{HALDI}"/>'
            f'<path d="M28,68 L72,58 M28,58 L72,68" stroke="{KAJAL}" stroke-width="5" stroke-linecap="round"/>'
            f'<path d="M14,66 L86,66 L76,88 L24,88 Z" fill="{CLAY}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M20,76 L80,76" stroke="{SHOLA}" stroke-width="3"/>'
            f'<path d="M8,92 L92,92" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>')


def ic_bhoomi_inner():
    """A kalash with mango leaves and a coconut, set on a mound of earth."""
    return (f'<path d="M6,92 C18,66 82,66 94,92 Z" fill="#8A4A22" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M24,86 C36,80 64,80 76,86" fill="none" stroke="{KAJAL}" stroke-width="2" opacity=".5"/>'
            f'<ellipse cx="38" cy="27" rx="5" ry="13" transform="rotate(-42 38 27)" fill="{LEAF}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<ellipse cx="62" cy="27" rx="5" ry="13" transform="rotate(42 62 27)" fill="{LEAF}" stroke="{KAJAL}" stroke-width="2.5"/>'
            f'<circle cx="50" cy="22" r="9" fill="{CLAY_L}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<rect x="42" y="30" width="16" height="7" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<path d="M38,37 C25,44 27,64 40,70 L60,70 C73,64 75,44 62,37 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
            f'<path d="M31,50 Q50,57 69,50" fill="none" stroke="{SINDOOR}" stroke-width="3"/><circle cx="50" cy="61" r="3.6" fill="{SINDOOR}"/>')


def ic_vehicle_inner():
    """A new car with a marigold garland on its bonnet."""
    body = 'M8,70 L10,58 Q12,50 22,48 L34,34 Q38,30 46,30 L64,30 Q72,30 76,36 L84,48 Q92,50 92,58 L92,70 Z'
    garland = 'M13,53 Q27,66 42,53'
    return (f'<path d="{body}" fill="{NEEL}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M38,47 L44,36 L56,36 L56,47 Z M61,47 L61,36 L68,36 L76,47 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="{garland}" fill="none" stroke="{KAJAL}" stroke-width="8.5" stroke-linecap="round"/>'
            f'<path d="{garland}" fill="none" stroke="{HALDI}" stroke-width="4.5" stroke-linecap="round"/>'
            f'<circle cx="28" cy="72" r="10" fill="{KAJAL}"/><circle cx="28" cy="72" r="4" fill="{SHOLA}"/>'
            f'<circle cx="72" cy="72" r="10" fill="{KAJAL}"/><circle cx="72" cy="72" r="4" fill="{SHOLA}"/>'
            f'<path d="M4,86 L96,86" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>')


# the current site's four offerings (content/CURRENT_SITE_FACTS.md, "Marriage and rituals")
RITES = [
    dict(id='wedding', pick='wedding', bn='মন্দিরে বিবাহ', en='Temple Wedding Package', price=31001, accent='sindoor', icon=ic_mandap_inner,
         desc='A Radha-Krishna themed wedding with a floral mandap and kirtan processions. Prasadam catering for up to 400 guests.',
         inc=('Mandap decor', 'Priest dakshina', 'A kirtan group', 'Anna-daan for 200 guests')),
    dict(id='sanskar', pick='sanskar', bn='সংস্কার', en='Sanskar Ceremony', price=7501, accent='haldi', icon=ic_homa_inner,
         desc='Annaprashan, Namkaran or Upanayan (Poite), with a personalised sankalpa.',
         inc=('A priest', 'Havan samagri', 'Prasadam')),
    dict(id='bhoomi', pick='bhoomi', bn='ভূমি পূজা', en='Bhoomi Pujan', price=5001, accent='peacock', icon=ic_bhoomi_inner,
         desc='At your site, or at the mandir with symbolic earth from your land.',
         inc=('Vastu Shaanti', 'Navagraha homa', 'Prasadam')),
    dict(id='vehicle', pick='vehicle', bn='গাড়ি ও ব্যবসার পূজা', en='Vehicle / Business Puja', price=3001, accent='neel', icon=ic_vehicle_inner,
         desc='For a new vehicle, shop or factory, with Navagraha homa and Lakshmi Narayan archana.',
         inc=('A one-hour ritual', 'Navagraha sankalpa')),
]
CEREMONIES = [('', 'Choose one'), ('wedding', 'Temple wedding · ₹31,001'), ('annaprashan', 'Annaprashan · ₹7,501'),
              ('namkaran', 'Namkaran · ₹7,501'), ('upanayan', 'Upanayan (Poite) · ₹7,501'), ('griha', 'Griha Pravesh'),
              ('bhoomi', 'Bhoomi Pujan · ₹5,001'), ('vehicle', 'Vehicle or business puja · ₹3,001'), ('other', 'Another ceremony')]
SANSKARS = ('annaprashan', 'namkaran', 'upanayan')
RIT_TIMES = [('বিবাহমণ্ডপ', 'Wedding mandap', [('6–11 AM', ''), ('4–9 PM', '')], 'Every day'),
             ('সংস্কার', 'Sanskar ceremonies', [('7–10 AM', 'Weekdays'), ('3–6 PM', 'Weekends')], ''),
             ('পুরোহিতের পরামর্শ', 'Priest consultation', [('7:30–8:30 PM', 'Evenings')], 'An appointment is recommended')]
RIT_STEPS = ['Tell the mandir your dates, how many people are coming, and your family’s traditions.',
             'The mandir arranges the priests, a kirtan group, the decoration and the prasad menu.',
             'For a marriage, bring identity proof, passport photographs and affidavits, as local municipal rules require.']
RIT_FAQ = [('Caterers and stays?', 'The mandir has preferred caterers and guest-house partners.'),
           ('Papers for a marriage?', 'Aadhaar cards, passport photographs and the local registrar’s forms. Volunteers help with notarisation.'),
           ('In which language?', 'The rites are in Sanskrit, with guidance in Bengali or Hindi. Regional bhajans are possible.')]


def rituals_section(ctx):
    cards = ''
    for r in RITES:
        inc = ''.join(f'<li>{x}</li>' for x in r['inc'])
        go = btn(ctx, 'Enquire' + arrow(16), '#ritual-form', 'kajal', cls='btn--sm', attrs=f' data-rit-pick="{r["pick"]}"')
        cards += (f'<li class="sev-rit" style="--accent: var(--{r["accent"]});">'
                  f'<article class="seva-card sev-rit__in" aria-labelledby="rit-{r["id"]}">'
                  f'<div class="sev-card__top"><p class="seva-card__amt"><span class="sev-card__price">{inr(r["price"])}</span></p>{icon(r["icon"]())}</div>'
                  f'<h3 class="seva-card__bn" lang="bn" id="rit-{r["id"]}">{r["bn"]}</h3><p class="seva-card__en">{r["en"]}</p>'
                  f'<p class="seva-card__desc">{r["desc"]}</p>'
                  f'<p class="sev-rit__k">Includes</p><ul class="sev-rit__inc">{inc}</ul>'
                  f'<div class="seva-card__cta">{go}</div></article></li>')

    rows = ''
    for b, e, slots, note in RIT_TIMES:
        times = ''.join(f'<span class="sev-ritime__slot"><span class="sev-ritime__t">{t}</span>'
                        + (f'<span class="sev-ritime__w">{w}</span>' if w else '') + '</span>' for t, w in slots)
        rows += (f'<li class="sev-ritime"><p class="sev-ritime__h"><span class="sev-ritime__en">{e}</span><span lang="bn">{b}</span></p>'
                 f'<p class="sev-ritime__slots">{times}</p>' + (f'<p class="sev-ritime__note">{note}</p>' if note else '') + '</li>')
    times_card = (f'<div class="sev-ritimes"><h3 class="sev-ritimes__h"><span lang="bn">সময়</span><span class="sev-ritimes__en">When</span></h3>'
                  f'<ul class="sev-ritimes__list">{rows}</ul></div>')
    steps = ''.join(f'<li class="sev-step"><span class="sev-step__n" lang="bn" aria-hidden="true">{bn(i + 1)}</span><p class="sev-step__t">{t}</p></li>'
                    for i, t in enumerate(RIT_STEPS))
    how = (f'<div class="sev-rithow"><h3 class="sev-rithow__h"><span lang="bn">কীভাবে হয়</span><span class="sev-rithow__en">How it works</span></h3>'
           f'<ol class="sev-steps">{steps}</ol></div>')
    faq = ''.join(f'<div class="sev-ritq"><dt class="sev-ritq__q">{q}</dt><dd class="sev-ritq__a">{a}</dd></div>' for q, a in RIT_FAQ)

    sel = field('rit-ceremony', 'অনুষ্ঠান', 'Ceremony', 'select', name='ceremony', required=True, options=CEREMONIES, value='', attrs=' data-rit-select')
    for v in SANSKARS:
        sel = sel.replace(f'<option value="{v}">', f'<option value="{v}" data-group="sanskar">', 1)
    # the fields in the order the old enquiry asked for them: who, how to reach you, which ceremony, when, how many
    inner = (field('rit-name', 'নাম', 'Your name', 'text', name='name', required=True, autocomplete='name', placeholder='Your full name')
             + '<div class="form__row">'
             + field('rit-phone', 'ফোন', 'Phone', 'tel', name='phone', required=True, autocomplete='tel', placeholder='98300 00000', attrs=' inputmode="tel"')
             + field('rit-email', 'ইমেল', 'Email · optional', 'email', name='email', autocomplete='email', placeholder='you@example.com', attrs=' data-label="Email"')
             + '</div>' + sel + '<div class="form__row">'
             + field('rit-date', 'তারিখ', 'Preferred date · optional', 'date', name='date', attrs=' data-label="Preferred date" data-rit-date')
             + field('rit-people', 'কতজন', 'Number of people · optional', 'number', name='people',
                     attrs=' min="1" step="1" inputmode="numeric" data-label="Number of people"')
             + '</div>'
             + field('rit-msg', 'বার্তা', 'Message · optional', 'textarea', name='message', rows=3,
                     placeholder='Which sanskar, your traditions, anything the mandir should know', attrs=' data-label="Message"'))
    frm = form(ctx, 'ritual-form', 'Ritual or ceremony enquiry', inner, submit='Send enquiry' + arrow(18), cls='sev-ritform')
    book = (f'<div class="sev-ritbook"><h3 class="sev-ritbook__h"><span lang="bn">খোঁজ নিন</span><span class="sev-ritbook__en">Ask about a ceremony</span></h3>'
            f'{frm}</div>')
    aside = ('<p>Sanctify life events with Vedic rites, from Radha-Krishna kalyanam to Bhoomi Pujan, vehicle puja and sacred thread '
             'ceremonies, in the mandir complex.</p>')
    return section(sec_head('আচার-অনুষ্ঠান', 'Rituals and ceremonies', aside, hid='rituals-h')
                   + f'<div class="sev-cardwrap sev-ritwrap" data-scroll><ul class="sev-rits" aria-label="Ceremonies">{cards}</ul></div>'
                   + (f'<p class="sev-swipe" aria-hidden="true"><span lang="bn">সরিয়ে দেখুন</span>'
                      f'<span class="sev-swipe__en">Four ceremonies · swipe</span>{arrow(20)}</p>')
                   + f'<div class="sev-ritgrid"><div class="sev-ritinfo">{times_card}{how}<dl class="sev-ritfaq">{faq}</dl></div>{book}</div>',
                   'paper', sid='rituals', labelledby='rituals-h')


# ---------------------------------------------------------------- volunteering (the old /volunteer)
def ic_shrine_inner():
    return shikhara(50, 92, .7, SHOLA, KAJAL) + f'<path d="M8,94 L92,94" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>'


def ic_wheel_inner():
    return f'<g transform="translate(50,50) scale(.44)">{wheel(KAJAL, SINDOOR)}</g>'


def ic_toran_inner():
    """A doorway with a toran of mango leaves and marigolds: welcome."""
    leaves = ''.join(f'<path d="M{x},31 L{x + 4},44 L{x + 8},31 Z" fill="{LEAF}" stroke="{KAJAL}" stroke-width="2" stroke-linejoin="round"/>'
                     for x in (18, 34, 50, 66))
    flowers = ''.join(f'<circle cx="{x}" cy="33" r="4.2" fill="{HALDI}" stroke="{KAJAL}" stroke-width="2"/>' for x in (30, 46, 62, 78))
    return (f'<path d="M22,94 L22,36 Q50,8 78,36 L78,94 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M33,94 L33,46 Q50,28 67,46 L67,94 Z" fill="{PEACOCK_D}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M12,30 L88,30" stroke="{KAJAL}" stroke-width="3"/>{leaves}{flowers}'
            f'<path d="M8,94 L92,94" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>')


def ic_letter_inner():
    return (f'<rect x="10" y="24" width="80" height="56" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M10,24 L50,58 L90,24" fill="none" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M10,80 L38,52 M90,80 L62,52" stroke="{KAJAL}" stroke-width="2.5" opacity=".5"/>'
            f'<circle cx="50" cy="58" r="8" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3"/>')


# the six areas on the current site's /volunteer page
AREAS = [
    ('temple', 'মন্দিরের সেবা', 'Temple services', 'Daily pujas, arati, deity decoration and maintenance.', ic_shrine_inner, 'sindoor'),
    ('events', 'উৎসব ও জনসংযোগ', 'Community outreach and events', 'Festivals such as Rath Yatra and Janmashtami.', ic_wheel_inner, 'haldi'),
    ('guests', 'অতিথি সেবা', 'Guest services and hospitality', 'Welcoming visitors, darshan help, tours and the guest house.', ic_toran_inner, 'peacock'),
    ('office', 'দপ্তরের কাজ', 'Administrative support', 'The office, donors, communication, social media and the website.', ic_letter_inner, 'neel'),
    ('kitchen', 'রান্নাঘর ও প্রসাদ', 'Kitchen and prasad distribution', 'Prasad for 2,000+ devotees every day.', ic_handi_inner, 'abir'),
    ('teaching', 'শিক্ষা', 'Teaching and education', 'Sanskrit, the Bhagavad Gita, music and cultural programmes.', ic_book_inner, 'kajal'),
]


def volunteer_section(ctx):
    c = ctx.data['contact']
    tiles = ''
    for k, b, e, d, ic, accent in AREAS:
        tiles += (f'<label class="sev-area" style="--accent: var(--{accent});"><input type="checkbox" name="areas" value="{k}" data-text="{e}">'
                  f'<span class="sev-area__t"><span class="sev-area__bn" lang="bn">{b}</span>'
                  f'<span class="sev-area__en">{e}</span><span class="sev-area__d">{d}</span></span>{icon(ic(), "sev-area__ic", 56)}</label>')
    tiles += ('<label class="sev-area sev-area--home"><input type="checkbox" name="areas" value="remote" data-text="From home">'
              '<span class="sev-area__t"><span class="sev-area__bn" lang="bn">বাড়ি থেকে</span><span class="sev-area__en">From home</span>'
              '<span class="sev-area__d">Communications, translation and fundraising outreach.</span></span></label>')
    areas = (f'<fieldset class="sev-fs" data-label="Areas of interest"><legend class="sev-fs__l"><span class="field__bn" lang="bn">কোথায় হাত লাগাবেন</span>'
             f'<span class="field__en">Areas of interest · choose any</span></legend><div class="sev-areas">{tiles}</div></fieldset>')
    inner = (areas
             + '<div class="form__row">'
             + field('vol-name', 'নাম', 'Your name', 'text', name='name', required=True, autocomplete='name', placeholder='Your full name')
             + field('vol-email', 'ইমেল', 'Email', 'email', name='email', required=True, autocomplete='email', placeholder='you@example.com')
             + '</div><div class="form__row">'
             + field('vol-phone', 'ফোন', 'Phone · optional', 'tel', name='phone', autocomplete='tel', placeholder='98300 00000', attrs=' inputmode="tel" data-label="Phone"')
             + field('vol-when', 'কবে পারবেন', 'Availability · optional', 'text', name='availability', placeholder='For example, Saturdays',
                     attrs=' data-label="Availability"')
             + '</div>'
             + field('vol-msg', 'বার্তা', 'Message · optional', 'textarea', name='message', rows=3, placeholder='Your skills, and anything the mandir should know',
                     attrs=' data-label="Message"'))
    frm = form(ctx, 'volunteer-form', 'Volunteer application', inner, submit='Send application' + arrow(18), cls='sev-volform')
    mail = 'mailto:' + c['email'] + '?subject=' + quote('Volunteering')
    info = (f'<div class="sev-volinfo">'
            f'<div class="sev-volinfo__big"><p class="sev-volinfo__k">Orientation</p><p class="sev-volinfo__n" lang="bn">দ্বিতীয় শনিবার</p>'
            f'<p class="sev-volinfo__en">Every second Saturday</p>'
            f'<p class="sev-volinfo__d">For kitchen seva, scholarship mentoring and health-camp support.</p></div>'
            f'<div class="facts sev-volfacts">'
            f'<div class="fact"><p class="fact__k">Groups</p><p class="fact__t">CSR and college NSS groups</p>'
            f'<p class="fact__d">Register for kitchen or distribution shifts at least two weeks ahead.</p></div>'
            f'<div class="fact"><p class="fact__k">From home</p><p class="fact__t">Remote volunteering</p>'
            f'<p class="fact__d">Help with communications, translation and fundraising outreach.</p></div>'
            f'<div class="fact"><p class="fact__k">Or write</p><p class="fact__t">{copy_value(c["email"], href=mail)}</p>'
            f'<p class="fact__d">Send your skills and the dates you can give.</p></div></div></div>')
    aside = '<p>Give your time in the kitchen, at the festivals, in the classroom, or from home.</p>'
    return section(sec_head('সেবায় হাত লাগান', 'Volunteer with the mandir', aside, hid='volunteer-h')
                   + f'<div class="sev-vol">{info}<div class="sev-volcard">{frm}</div></div>',
                   'peacock', sid='volunteer', labelledby='volunteer-h')


# ---------------------------------------------------------------- questions and the seva desk
def faq_section(ctx):
    c = ctx.data['contact']
    qa = [('রসিদ কবে পাব?', 'When do I get a receipt?', 'Within 48 hours of contribution confirmation.', 'sindoor'),
          ('কর ছাড় পাওয়া যাবে?', 'Is it tax-deductible?', 'Not yet. The mandir is actively working on obtaining 80G certification.', 'haldi'),
          ('ভোগে থাকতে পারি?', 'Can I attend the bhog?', 'Yes, everyone is welcome. After the midday bhog, anna-daan prasad is served free '
                                                           f'to every visitor, {times("12:30–2 PM")}.', 'peacock'),
          ('অনলাইনে দেওয়া যায়?', 'Can I pay online?', 'Yes, by UPI or bank transfer: call or email the seva desk for the details. This website takes no card payments.', 'neel'),
          ('সেবার খবর পাব?', 'Will I hear how my seva helped?', 'Yes. The mandir sends quarterly impact reports by email: '
                                                                  f'<a class="u" href="{esc(ctx.href("home#remind"))}">sign up for the seva newsletter</a> on the homepage.', 'abir')]
    items = ''
    for i, (bq, eq, a, tone) in enumerate(qa):
        light = ' sev-q--light' if tone == 'haldi' else ''
        items += (f'<li class="sev-q{light}" style="--q: var(--{tone});"><span class="sev-q__n" lang="bn" aria-hidden="true">{bn(i + 1)}</span>'
                  f'<div class="sev-q__t"><h3 class="sev-q__h" lang="bn">{bq}</h3><p class="sev-q__en">{eq}</p><p class="sev-q__a">{a}</p></div></li>')
    phone = (f'<svg class="sev-desk__ic" width="96" height="96" viewBox="0 0 124 124" aria-hidden="true" focusable="false"><circle cx="64" cy="64" r="56" fill="{SINDOOR}"/>'
             f'<circle cx="58" cy="58" r="56" fill="{HALDI}" stroke="{SHOLA}" stroke-width="4"/>'
             f'<g transform="translate(26,26) scale(.64)"><path d="M22,18 C14,22 10,32 14,44 C22,66 38,82 58,88 C70,92 80,86 84,78 L86,72 L68,58 L58,66 C46,60 40,52 34,42 L42,32 L30,14 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="5" stroke-linejoin="round"/>'
             f'<path d="M60,14 C74,18 84,28 88,42 M58,28 C66,30 72,36 74,44" fill="none" stroke="{KAJAL}" stroke-width="6" stroke-linecap="round"/></g></svg>')
    desk = (f'<aside class="sev-desk" id="desk" aria-labelledby="desk-h">'
            f'<div class="sev-desk__head">{phone}<div><h3 class="sev-desk__h" lang="bn" id="desk-h">সেবা ডেস্ক</h3><p class="sev-desk__en">Seva desk</p></div></div>'
            f'<p class="sev-desk__hours">{times("8 AM–6 PM")} <span class="sev-desk__days"><span lang="bn">প্রতিদিন</span> · every day</span></p>'
            f'<p class="sev-desk__live" data-sev-desk><span class="sev-desk__dot" aria-hidden="true"></span><span data-sev-desk-line>Open {times("8 AM–6 PM")} daily, India time</span></p>'
            f'<div class="sev-desk__contact"><p class="sev-desk__phone">{copy_value(c["phone"], href="tel:" + c["phone_e164"])}</p>'
            f'<p class="sev-desk__mail">{copy_value(c["email"], href="mailto:" + c["email"])}</p>'
            f'<div>{btn(ctx, "Call the seva desk" + arrow(16), "tel:" + c["phone_e164"], "haldi", cls="btn--sm")}</div></div></aside>')
    aside = '<p>For anything else, ask the seva desk.</p>'
    return section(sec_head('প্রশ্ন', 'Questions', aside, hid='faq-h') + f'<div class="sev-faqgrid"><ol class="sev-faq">{items}</ol>{desk}</div>',
                   'shola', sid='questions', labelledby='faq-h')


def render(ctx):
    return (hero(ctx) + choose_section(ctx) + calc_section(ctx) + form_section(ctx) + pay_section(ctx)
            + impact_section(ctx) + prasad_band(ctx) + rituals_section(ctx) + volunteer_section(ctx) + faq_section(ctx))
