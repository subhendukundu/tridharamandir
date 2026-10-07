"""Visit page: getting to Panchmura (route), the guest house (stay), the potters' village of the Bankura horse and the
guest house's experiences, a booking enquiry, facilities and questions. Ported from the B-Visit board; every fact is from
content/FACTS.md or the current website's own text (content/CURRENT_SITE_FACTS.md)."""
import json
from lib import ui
from lib.ui import esc, btn, sec_head, section, sticker, marquee, field, form, copy_value
from lib import art
from lib.art import arrow, shikhara, sun, svg_doc, route_map, f, KAJAL, SHOLA, HALDI, SINDOOR, NEEL, PEACOCK_D
from lib.motifs import _mane, horse_body, horse_defs
from lib import byear as BY
from pages.seva import times

PAGE = dict(key='visit', title='Plan your visit',
            description='Reach Tridhara Milan Mandir in Panchmura, Bankura: 180 km from Kolkata, trains to Bishnupur or Bankura, '
                        'the guest house and the potters’ village.',
            tone='peacock')

# the desktop file runs 200 board units past the board's right edge; that part shows only on screens wider than 1440 px
VIEW = (600, 96, 1040, 524)
ART_W = 840          # the art column inside the 1440 board (VIEW without the extra 200)
VIEW_M = (700, 96, 740, 524)
VISIT_ITEMS = ['কলকাতা থেকে ১৮০ কিমি', 'বিষ্ণুপুর থেকে ৩০ কিমি', 'ট্রেনে বিষ্ণুপুর বা বাঁকুড়া জংশন', 'দুপুর ২টায় কুমোরপাড়া ভ্রমণ',
               'অতিথিশালায় আটটি স্যুট', 'প্রতিদিন ভোর ৫টা থেকে দর্শন', 'অন্নদান প্রসাদ দুপুর ১২:৩০ থেকে']
ROOMS = [('শান্তি ডিলাক্স স্টুডিও', 'Shanti Deluxe Studio', 3600, 'kajal'),
         ('বৃন্দাবন কোর্টইয়ার্ড স্যুট', 'Vrindavan Courtyard Suite', 4500, 'sindoor'),
         ('পিলগ্রিম ফ্যামিলি রুম', 'Pilgrim Family Room', 5800, 'neel')]
# the drawn header of each room card (the site has no photographs): arches in the doorway, background, roof
ROOM_ART = {'Shanti Deluxe Studio': (1, KAJAL, SINDOOR), 'Vrindavan Courtyard Suite': (3, SINDOOR, KAJAL), 'Pilgrim Family Room': (2, NEEL, SINDOOR)}

# the guest house's experiences, in the current website's words (its /guides/guest-house-experiences page)
WALK = 'Craft-village walk (2 PM)'
PASSPORT, RESIDENCY = 'Artisans’ Studio Passport', 'Terracotta Residency'
RETREAT, FAMILY = 'Art & Wellness Retreat', 'Family & School Discovery'
EXPERIENCES = [
    dict(name=PASSPORT, bn='কারিগর স্টুডিও পাসপোর্ট', price=9200, unit='per person', tone=('haldi', 'kajal'),
         desc='A hands-on terracotta residency, with daily craft demonstrations and clay modelling, supporting Panchmura’s potters directly.',
         incl=['A workshop kit', 'A wheel session with a master artisan', 'A souvenir firing', 'Lunch at the craft village']),
    dict(name=RESIDENCY, bn='টেরাকোটা রেসিডেন্সি', price=32000, unit='for two weeks', tone=('peacock-d', 'shola'),
         desc='A creative residency of two to four weeks for ceramic artists and researchers, ending with an exhibition that supports temple programmes.',
         incl=['Studio workspace', 'Artisan mentorship', 'A material stipend', 'A showcase and sales opportunity'])]
MORE_EXPERIENCES = [(RETREAT, 'আর্ট ও ওয়েলনেস রিট্রিট', 15600, 'per couple · four days'),
                    (FAMILY, 'ফ্যামিলি ও স্কুল ডিসকভারি', 18000, 'per group of four')]
SOIL = '#B04A26'      # Bankura red earth (art only)
LEAF = '#3E9C8F'      # tree canopy, as on the homepage route map
DARK = '#8A2414'      # far legs and mane of the poster horse


def rupees(n):
    return f'₹{n:,}'


# ---------------------------------------------------------------- drawings (from the board)
def horse_poster(x, y, s=1, body=SINDOOR, dark=DARK, paint=HALDI):
    """Flat Kalighat-style Bankura horse (the geometry of motifs.horse_body), feet centred at (x, y), facing left."""
    shapes = [('rect', dict(x=96, y=404, width=30, height=186, rx=14), dark), ('rect', dict(x=284, y=404, width=30, height=186, rx=14), dark),
              ('rect', dict(x=130, y=408, width=36, height=188, rx=16), body), ('rect', dict(x=320, y=408, width=36, height=188, rx=16), body),
              ('path', dict(d='M356,350 C390,334 410,298 404,252 C382,262 360,294 348,334 Z'), body),
              ('rect', dict(x=78, y=316, width=298, height=126, rx=63), body),
              ('path', dict(d='M64,388 C60,300 66,206 80,126 L150,118 C156,206 168,300 186,372 Z'), body),
              ('path', dict(d=_mane()[0]), dark),
              ('path', dict(d='M106,76 C92,42 96,8 110,-16 C124,8 130,42 120,78 Z'), dark),
              ('path', dict(d='M124,72 C118,36 128,2 146,-22 C158,4 156,42 140,76 Z'), body),
              ('path', dict(d='M156,112 C156,78 130,58 100,62 C72,66 52,92 40,124 C30,150 18,182 16,198 C15,210 24,216 36,212 C52,206 64,196 78,182 '
                              'C98,162 122,150 146,146 C154,138 156,126 156,112 Z'), body)]

    def draw(fill, extra=''):
        out = ''
        for tag, a, c in shapes:
            attrs = ' '.join(f'{k}="{v}"' for k, v in a.items())
            out += f'<{tag} {attrs} fill="{fill or c}"{extra}/>'
        return out
    lines = ['M74,200 Q115,209 154,199', 'M71,233 Q115,242 158,231', 'M69,268 Q116,277 163,266', 'M67,301 Q117,310 166,298', 'M67,337 Q120,346 173,334',
             'M74,256' + ''.join(' l6,-7 l6,7' for _ in range(7)), 'M72,323' + ''.join(' l6,-7 l6,7' for _ in range(8)),
             'M68,358' + ''.join(' q9,13 18,0' for _ in range(6)),
             'M131,434 L165,434', 'M131,446 L165,446', 'M321,434 L355,434', 'M321,446 L355,446']
    cloth = 'M192,322 L300,322 Q306,322 306,328 L306,404' + ''.join(' q-10,12 -20,0' for _ in range(6)) + ' L186,328 Q186,322 192,322 Z'
    rings = ''.join(f'<circle cx="{cx}" cy="{cy}" r="9.5" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/>' for cx, cy in ((216, 362), (246, 362), (276, 362), (344, 372)))
    face = (f'<path d="M68,112 C78,103 92,103 102,112 C92,119 78,119 68,112 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="3"/><circle cx="86" cy="112" r="4" fill="{KAJAL}"/>'
            f'<path d="M22,200 C32,203 44,199 55,190" fill="none" stroke="{KAJAL}" stroke-width="4" stroke-linecap="round"/>')
    t = f'translate({f(x)},{f(y)}) scale({s}) translate(-210,-596)'
    ts = f'translate({f(x + 11)},{f(y + 9)}) scale({s}) translate(-210,-596)'
    return (f'<g transform="{ts}">{draw(KAJAL)}</g>'
            f'<g transform="{t}"><g stroke="{KAJAL}" stroke-width="13" stroke-linejoin="round">{draw(KAJAL)}</g>{draw(None)}'
            f'<path d="{cloth}" fill="{paint}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="{" ".join(lines)}" fill="none" stroke="{paint}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
            f'{rings}{face}</g>')


def palm(x, y, h=260, c=KAJAL, lean=1):
    fr = ''.join(f'<path transform="translate({4 * lean},{-h}) rotate({a})" d="M0,0 C22,-15 54,-16 82,-2 C54,7 22,7 0,0 Z" fill="{c}"/>'
                 for a in (-178, -150, -122, -96, -70, -42, -12, 14))
    trunk = (f'<path d="M-6,0 C-4,{f(-h * .45)} {6 * lean},{f(-h * .8)} {2 * lean},{-h} L{10 * lean},{-h} C{14 * lean},{f(-h * .8)} 6,{f(-h * .45)} 6,0 Z" fill="{c}"/>')
    return f'<g transform="translate({x},{y})">{trunk}{fr}<circle cx="{6 * lean}" cy="{-h + 2}" r="9" fill="{c}"/></g>'


def tree(x, y, r=26, fill=LEAF):
    return (f'<g transform="translate({x},{y})"><path d="M0,0 L0,{-r - 6}" stroke="{KAJAL}" stroke-width="5"/>'
            f'<circle cx="0" cy="{f(-r * 1.5)}" r="{r}" fill="{fill}" stroke="{KAJAL}" stroke-width="4"/></g>')


def spark(x, y, s=1, c=HALDI):
    return f'<path transform="translate({x},{y}) scale({s})" d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z" fill="{c}"/>'


def hero_art():
    """(defs, shapes): the poster horse, a shola shikhara, a palm and two trees on Bankura's red earth, in a haldi sun."""
    d, s = sun('vsH', 1150, 332, 236, HALDI, PEACOCK_D)
    # past 1440 the earth runs on and ends in a slope (it shows only on screens wider than 1440 px)
    ground = (f'<path d="M720,630 C800,600 900,572 1040,566 C1160,561 1270,572 1350,558 C1390,552 1420,548 1444,546 '
              f'C1520,540 1580,546 1610,552 C1628,560 1637,590 1640,632 Z" fill="{SOIL}" stroke="{KAJAL}" stroke-width="4"/>')
    wide = tree(1500, 548, 20) + tree(1586, 548, 15, '#2F8A7E') + spark(1540, 210, .8, SHOLA) + spark(1610, 380, .9)   # past 1440: wide screens only
    return d, (s + spark(1392, 132, 1) + spark(1238, 108, .7, SHOLA) + spark(880, 560, .6, SHOLA)
               + palm(1408, 560, 300, lean=-1) + shikhara(1306, 560, 1.75, fill=SHOLA, line=KAJAL)
               + ground + tree(1236, 574, 22) + tree(1392, 556, 18, '#2F8A7E') + wide + horse_poster(1060, 590, .62))


def village_art():
    """The textured terracotta horse on a plinth, with two handis, in a haldi sun on kajal (600 x 560)."""
    w, h = 600, 560
    sd, ss = sun('vsVs', 300, 250, 214, HALDI, KAJAL)
    horse = f'<g transform="translate(300,486) scale(.74) translate(-210,-596)">{horse_body("vsV")}</g>'
    plinth = (f'<ellipse cx="300" cy="494" rx="190" ry="22" fill="{KAJAL}"/><path d="M110,494 L110,520 C110,534 490,534 490,520 L490,494" fill="{KAJAL}"/>'
              f'<ellipse cx="300" cy="490" rx="186" ry="18" fill="#3A2C22"/>')
    pots = BY.handi(92, 470, .62) + BY.handi(514, 474, .52)
    inner = (f'<rect width="{w}" height="{h}" fill="{KAJAL}"/>{ss}' + spark(66, 70, .9, SHOLA) + spark(40, 300, 1.1) + spark(556, 300, .7, SHOLA)
             + plinth + horse + pots)
    return svg_doc((0, 0, w, h), inner, sd + horse_defs('vsV'))


def room_art(arches, bg, roof, pid):
    """The top of a room card, in place of a photograph: a Bengal do-chala doorway (one, two or three arches, lamps lit)
    in front of a haldi sun, on the card's colour (400 x 150)."""
    w, h = 400, 150
    d, s = sun(pid, 298, 70, 60, HALDI, bg)
    cx = 168
    wd = 60 * arches + 36
    x0, x1 = cx - wd / 2, cx + wd / 2
    block = (f'<path d="M{f(x0)},152 L{f(x0)},86 C{f(x0 + wd * .3)},76 {f(x1 - wd * .3)},76 {f(x1)},86 L{f(x1)},152 Z" '
             f'fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>')
    top = f(cx - wd * .22), f(cx + wd * .22)
    roof_ = (f'<path d="M{f(x0 - 14)},89 C{f(x0 + 4)},54 {top[0]},40 {cx},40 C{top[1]},40 {f(x1 - 4)},54 {f(x1 + 14)},89 '
             f'C{f(x1 - wd * .25)},77 {f(x0 + wd * .25)},77 {f(x0 - 14)},89 Z" fill="{roof}" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>')
    doors = ''
    for i in range(arches):
        ax = cx + (i - (arches - 1) / 2) * 60
        doors += (f'<path d="M{f(ax - 18)},152 L{f(ax - 18)},114 A18,18 0 0 1 {f(ax + 18)},114 L{f(ax + 18)},152 Z" fill="{KAJAL}"/>'
                  f'<path transform="translate({f(ax)},134)" d="M0,-15 C7,-6 7,3 0,7 C-7,3 -7,-6 0,-15 Z" fill="{HALDI}"/>')
    sparks = spark(44, 36, .8) + spark(370, 128, .6, SHOLA) + spark(96, 112, .5, SHOLA) + spark(356, 22, .55)
    return svg_doc((0, 0, w, h), f'<rect width="{w}" height="{h}" fill="{bg}"/>{s}{sparks}{block}{roof_}{doors}', d)


def _ico(body, cls, sw=3.6):
    return (f'<svg class="{cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>')


ICON_CAR = '<path d="M8,38 L12,26 C13,23 15,22 18,22 L46,22 C49,22 51,23 52,26 L56,38 L56,48 L8,48 Z"/><path d="M8,38 L56,38"/><circle cx="19" cy="48" r="5"/><circle cx="45" cy="48" r="5"/><path d="M18,30 L46,30"/>'
ICON_TRAIN = '<rect x="14" y="8" width="36" height="40" rx="8"/><path d="M14,30 L50,30"/><path d="M22,18 L42,18"/><circle cx="23" cy="39" r="3"/><circle cx="41" cy="39" r="3"/><path d="M20,48 L12,58 M44,48 L52,58 M16,54 L48,54"/>'
ICON_JEEP = '<path d="M5,44 L5,26 L13,26 L19,14 L59,14 L59,44 Z"/><path d="M22,14 L22,26 L59,26"/><path d="M38,14 L38,26"/><path d="M18,8 L56,8 M24,8 L24,14 M50,8 L50,14"/><circle cx="17" cy="46" r="6"/><circle cx="47" cy="46" r="6"/>'
ICON_PIN = '<path d="M32,58 C32,58 14,38 14,25 C14,15 22,7 32,7 C42,7 50,15 50,25 C50,38 32,58 32,58 Z"/><circle cx="32" cy="25" r="7"/>'
ICON_WHEEL = '<circle cx="26" cy="9" r="5"/><path d="M26,18 L26,36 L44,36 L50,52"/><path d="M26,26 L40,26"/><path d="M20,30 A15,15 0 1 0 40,46"/>'
ICON_WATER = '<path d="M32,6 C32,6 14,28 14,40 C14,50 22,58 32,58 C42,58 50,50 50,40 C50,28 32,6 32,6 Z"/><path d="M24,42 C24,47 27,50 31,51"/>'
ICON_AID = '<rect x="8" y="16" width="48" height="38" rx="5"/><path d="M24,16 L24,10 L40,10 L40,16"/><path d="M32,26 L32,44 M23,35 L41,35"/>'
ICON_PARK = '<rect x="8" y="8" width="48" height="48" rx="8"/><path d="M25,46 L25,18 L35,18 C41,18 44,22 44,27 C44,32 41,36 35,36 L25,36"/>'
ICON_LOCKER = ('<rect x="12" y="6" width="40" height="52" rx="4"/><path d="M32,6 L32,58"/><path d="M26,30 L26,38 M38,30 L38,38"/>'
               '<path d="M18,14 L26,14 M18,19 L26,19 M38,14 L46,14 M38,19 L46,19"/>')
ICON_TALK = ('<path d="M8,10 L38,10 C41,10 43,12 43,15 L43,31 C43,34 41,36 38,36 L22,36 L13,44 L14,36 L8,36 C5,36 3,34 3,31 L3,15 C3,12 5,10 8,10 Z"/>'
             '<path d="M47,22 L56,22 C59,22 61,24 61,27 L61,43 C61,46 59,48 56,48 L51,48 L51,56 L42,48 L27,48 C24,48 22,46 22,43 L22,40"/>'
             '<path d="M12,20 L34,20 M12,27 L28,27"/>')


def address_text(ctx):
    return ' '.join(ctx.data['contact']['address_lines'])


def address_block(ctx, cls):
    """The address as selectable lines with a copy button (the button copies it as one line)."""
    c = ctx.data['contact']
    lines = '<br>'.join(esc(x) for x in c['address_lines'])
    full = esc(address_text(ctx))
    return (f'<div class="{cls}" data-copy-scope><p class="{cls}-v" data-copy-text>{lines}</p>'
            f'<button class="copyval__b" type="button" data-copy="{full}" aria-label="Copy the address: {full}">Copy</button></div>')


# ---------------------------------------------------------------- 1 · first screen
def first_screen(ctx):
    d, s = hero_art()
    files = art.board_files('visit-hero', d, s, view=VIEW, view_m=VIEW_M)
    # without the script the sticker gives the opening time; site.js turns it into open now / closed now
    stk = sticker('রোজ', 'ভোর ৫টা থেকে', 'Darshan daily', label='Darshan every day from 5 AM', cls='phero__sticker vis-sticker', data=' data-vis-open')
    extra = f'<div class="btns">{btn(ctx, "How to get here", "#route", "shola")}{btn(ctx, "Stay the night", "#stay", "ghost")}</div>'
    sub = 'Panchmura’s Second Vrindavan, 180\N{NO-BREAK SPACE}km from Kolkata, in the potters’ village of the Bankura horse.'
    hero = ui.page_hero(ctx, 'visit', 'পাঁচমুড়ায় আসুন', 'Plan your visit', sub, w=5.34, art_files=files, pa_w=ART_W / 1440,
                        extra=extra, sticker_html=stk, pt=.22, sr_en='Come to Panchmura', ph_max=146)
    return hero.replace('class="phero"', 'class="phero vis-hero"', 1) + marquee(VISIT_ITEMS)


# ---------------------------------------------------------------- 2 · getting here
def route(ctx):
    c = ctx.data['contact']
    mapp = (f'<div class="map-panel vis-map"><div class="map-scroll" data-scroll>{route_map()}</div>'
            f'<p class="map-cap">Bishnupur to Panchmura: 30 km, about 45 minutes</p>'
            f'<p class="map-hint">Swipe the map to see the whole route.</p></div>')

    def dist(bn, en, km_bn):
        return (f'<li class="vis-dist__i"><span class="vis-dist__bn" lang="bn">{bn}</span> <span class="vis-dist__en">{en}</span> '
                f'<span class="vis-dist__dots" aria-hidden="true"></span> <span class="vis-dist__km" lang="bn">{km_bn}</span></li>')
    lat, lng = c['geo']
    card = (f'<div class="vis-addr"><div class="vis-addr__h">{_ico(ICON_PIN, "vis-addr__ic", 4)}'
            f'<h3 class="vis-addr__t"><span lang="bn">ঠিকানা</span> <span class="vis-addr__te">Address</span></h3></div>'
            f'{address_block(ctx, "vis-addr__a")}'
            f'<p class="vis-addr__gps"><span class="vis-addr__k">GPS</span> {copy_value(f"{lat}, {lng}")}</p>'
            f'<ul class="vis-dist">{dist("কলকাতা", "Kolkata", "১৮০ কিমি")}{dist("বিষ্ণুপুর", "Bishnupur", "৩০ কিমি")}{dist("বাঁকুড়া", "Bankura", "৪৫ কিমি")}</ul>'
            f'<div class="vis-addr__btn">{btn(ctx, "Open in Google Maps" + arrow(16), c["map_url"], "haldi")}</div></div>')

    def ticket(tone, icon, mode_bn, mode_en, big, big_en, detail):
        return (f'<li class="vis-tk" style="--tk: var(--{tone});"><div class="vis-tk__h"><p class="vis-tk__m"><span class="vis-tk__mbn" lang="bn">{mode_bn}</span> '
                f'<span class="vis-tk__men">{mode_en}</span></p>{_ico(icon, "vis-tk__ic")}</div>'
                f'<div class="vis-tk__b"><p class="vis-tk__big" lang="bn">{big}</p><p class="vis-tk__ben">{big_en}</p>'
                f'<p class="vis-tk__d">{detail}</p></div></li>')
    # parking in the words of the mandir's FAQ
    J = '⁠'   # word joiner: a price range such as ₹600–800 never breaks after its dash
    tickets = (ticket('sindoor', ICON_CAR, 'সড়কপথে', 'By road', '১৮০ কিমি', 'From Kolkata · about 4 hours',
                      'Limited street parking near the temple; the temple does not manage parking. The guest house has designated parking.')
               + ticket('neel', ICON_TRAIN, 'ট্রেনে', 'By train', 'বিষ্ণুপুর', 'or Bankura Junction', 'Bishnupur is 30 km from the mandir; Bankura is 45 km.')
               + ticket('peacock-d', ICON_JEEP, 'বিষ্ণুপুর থেকে', 'Bishnupur to Panchmura', '৩০ কিমি', 'About 45 minutes',
                        f'Shared trekkers from Bishnupur bus stand every 30 minutes, ₹30–{J}40 a person. Private taxis ₹600–{J}800, or local buses '
                        'towards Panchmura. The mandir is signposted in the village.'))

    def stop(k_bn, k_en, text):
        return (f'<li class="vis-day__i"><p class="vis-day__k"><span lang="bn">{k_bn}</span> <span class="vis-day__ke">{k_en}</span></p>'
                f'<p class="vis-day__t">{text}</p></li>')
    day = (f'<div class="vis-day"><h3 class="vis-day__h"><span lang="bn">বিষ্ণুপুর হয়ে একদিনে</span> <span class="vis-day__he">A day trip by way of Bishnupur</span></h3>'
           f'<ol class="vis-day__list">{stop("সকাল", "Morning", "Bishnupur’s Rasmancha, Jor-Bangla and Madan Mohan temples, 2–" + J + "3 hours")}'
           f'{stop("১২:৩০", "12:30 PM", "Anna-daan prasad at the mandir in Panchmura")}'
           f'{stop("৬:৩০", "6:30 PM", "The Tridhara Sandhya Arati")}</ol></div>')
    head = sec_head('কীভাবে আসবেন', 'Getting here', '<p>Kolkata to Bishnupur, then 30 km by road to Panchmura.</p>', hid='route-h')
    return section(head + f'<div class="vis-route">{mapp}{card}</div><ul class="vis-tks">{tickets}</ul>{day}',
                   'shola', cls='vis-sec', sid='route', labelledby='route-h')


# ---------------------------------------------------------------- 3 · the guest house
def stay(ctx):
    def room(i, bn, en, price, accent):
        arches, bg, roof = ROOM_ART[en]
        src = ctx.add_img(f'visit-room-{i + 1}.svg', room_art(arches, bg, roof, f'vsR{i + 1}'))
        return (f'<li class="vis-room" style="--acc: var(--{accent});">'
                f'<span class="vis-room__art"><img src="{src}" alt="" width="400" height="150" loading="lazy" decoding="async"></span>'
                f'<h3 class="vis-room__bn" lang="bn">{bn}</h3><p class="vis-room__en">{en}</p>'
                f'<p class="vis-room__p"><span class="vis-room__price">{rupees(price)}</span> <span class="vis-room__per">per night</span></p>'
                f'<a class="btn btn--sm vis-room__cta" href="#book" data-room="{esc(en)}">Ask for this room{arrow(16)}</a></li>')
    rooms = ''.join(room(i, *r) for i, r in enumerate(ROOMS))

    def term(bn, en):
        return f'<li class="vis-term"><span class="vis-term__bn" lang="bn">{bn}</span> <span class="vis-term__en">{en}</span></li>'
    band = (f'<div class="vis-band"><p class="vis-band__lead"><span class="vis-band__n" lang="bn">৮</span> '
            f'<span class="vis-band__t"><span class="vis-band__bn" lang="bn">বুটিক স্যুট</span> <span class="vis-band__en">100 m from the courtyard</span></span></p>'
            f'<ul class="vis-terms">{term("দুপুর ২টা", "Check-in 2 PM")}{term("সকাল ১১টা", "Check-out 11 AM")}{term("৩০% অগ্রিম", "Advance to book")}</ul>'
            f'{btn(ctx, "Book a room" + arrow(16), "#book", "haldi", cls="vis-band__btn")}</div>')
    head = sec_head('অতিথিশালায় থাকুন', 'Stay at the guest house',
                    '<p>Eight boutique suites, 100 m from the mandir courtyard. Rooms include anna-daan meals and temple access, '
                    'with optional terracotta workshops.</p>', hid='stay-h')
    other = '<p class="vis-other">Other guest houses are in Bishnupur, 30 km away, and in Bankura town, 45 km away.</p>'
    return section(head + f'<ul class="rail vis-rooms">{rooms}</ul>' + band + other, 'haldi', cls='vis-sec', sid='stay', labelledby='stay-h')


# ---------------------------------------------------------------- 4 · booking enquiry
def book(ctx):
    c = ctx.data['contact']
    opts =[('', 'Choose a room')] + [(en, f'{en} · {rupees(p)} a night') for _, en, p, _ in ROOMS] + [('Not sure yet', 'Not sure yet: please suggest one')]
    row1 = (field('book-name', 'নাম', 'Your name', 'text', name='name', required=True, autocomplete='name', placeholder='Your full name')
            + field('book-phone', 'ফোন', 'Phone', 'tel', name='phone', required=True, autocomplete='tel', placeholder='+91 98300 00000', attrs=' inputmode="tel"'))
    row2 = (field('book-email', 'ইমেল', 'Email', 'email', name='email', autocomplete='email', placeholder='you@example.com', hint='Optional, for a written reply.')
            + field('book-guests', 'কতজন', 'Guests', 'number', name='guests', required=True, value='2', attrs=' min="1" max="40" inputmode="numeric"'))
    row3 = (field('book-in', 'আসার দিন', 'Check-in', 'date', name='checkin', required=True, hint='Check-in from 2 PM.')
            + field('book-out', 'যাওয়ার দিন', 'Check-out', 'date', name='checkout', required=True, hint='Check-out by 11 AM.'))
    row4 = field('book-room', 'ঘর', 'Room', 'select', name='room', required=True, options=opts)
    also = ([(WALK, 'Craft-village walk · 2 PM')]
            + [(x['name'], f'{x["name"]} · {rupees(x["price"])}') for x in EXPERIENCES]
            + [(name, f'{name} · {rupees(p)}') for name, _, p, _ in MORE_EXPERIENCES])
    ask = ('<fieldset class="vis-ask" data-label="Also ask about"><legend class="field__l"><span class="field__bn" lang="bn">আরও জানতে চাই</span> '
           '<span class="field__en">Also ask about</span></legend><div class="vis-ask__opts">'
           + ''.join(f'<label class="vis-ask__o"><input type="checkbox" name="also" value="{esc(v)}" data-text="{esc(v)}"><span>{esc(t)}</span></label>' for v, t in also)
           + '</div></fieldset>')
    msg = field('book-msg', 'আর কিছু', 'Anything else', 'textarea', name='message', rows=3,
                placeholder='Your arrival time, any food allergies, a festival you are coming for…')
    inner = (f'<div class="form__row">{row1}</div><div class="form__row">{row2}</div><div class="form__row">{row3}</div>'
             f'<div class="form__row">{row4}</div>{ask}{msg}')
    frm = form(ctx, 'book-form', 'Guest house booking enquiry', inner, submit='Send booking enquiry', cls='vis-form')
    prices = esc(json.dumps({en: p for _, en, p, _ in ROOMS}))
    est = (f'<aside class="vis-est" aria-labelledby="est-h" data-vis-est data-prices="{prices}">'
           f'<div class="vis-est__a"><p class="vis-est__k" id="est-h"><span lang="bn">আপনার থাকা</span> · Your stay</p>'
           f'<p class="vis-est__room" data-est-room>Choose a room and your dates</p>'
           f'<p class="vis-est__nights" data-est-nights>From {rupees(ROOMS[0][2])} a night</p></div>'
           f'<div class="vis-est__b"><p class="vis-est__total" data-est-total aria-live="polite">₹ —</p>'
           f'<p class="vis-est__adv" data-est-adv hidden></p></div>'
           f'<ul class="vis-est__terms"><li>Check-in 2 PM</li><li>Check-out 11 AM</li><li>30% advance to book</li></ul>'
           f'<p class="vis-est__note">An estimate for one room at the listed price a night.</p>'
           f'<p class="vis-est__alt">Or email <a href="mailto:{esc(c["email"])}">{esc(c["email"])}</a> or call '
           f'<a href="tel:{esc(c["phone_e164"])}">{esc(c["phone"])}</a>.</p></aside>')
    head = sec_head('ঘর বুক করুন', 'Booking enquiry', '<p>Send your dates and the room you would like. A 30% advance is needed to book.</p>', hid='book-h')
    return section(head + f'<div class="vis-book">{frm}{est}</div>', 'paper', cls='vis-sec', sid='book', labelledby='book-h')


# ---------------------------------------------------------------- 5 · the potters' village
def village(ctx):
    ctx.add_img('visit-village.svg', village_art())
    panel = (f'<div class="vis-vill__panel"><img class="vis-vill__img" src="{ctx.img("visit-village.svg")}" alt="A terracotta Bankura horse, drawn in the poster style" '
             f'width="600" height="560" loading="lazy" decoding="async">'
             f'{sticker("GI", "২০১৮ থেকে", "Registered craft", label="A registered Geographical Indication since 2018", cls="vis-gi")}</div>')

    walk = ('<div class="vis-vill__r"><span class="vis-vill__k">2 PM</span> <span class="vis-vill__rt"><span class="vis-vill__bn" lang="bn">কুমোরপাড়া ভ্রমণ</span> '
            '<span class="vis-vill__en">Craft-village walk</span> <span class="vis-vill__note">A walk through the craft village at 2 PM. '
            'Ask the guest house for details.</span></span></div>')
    ask_walk = btn(ctx, 'Ask about the walk' + arrow(16), '#book', 'shola', attrs=' data-also="' + esc(WALK) + '"')
    text = (f'<div class="vis-vill__t">{sec_head("কুমোরপাড়ায়", "In the potters’ village", hid="village-h")}'
            f'<p class="vis-vill__big" lang="bn">বাঁকুড়ার ঘোড়া তৈরি হয় এখানেই</p>'
            f'<p class="vis-vill__p">The Bankura horse is made here in Panchmura. It was registered as a Geographical Indication, '
            f'“Bankura Panchmura Terracotta Craft”, on 28 March 2018, and it is the logo of All India Handicrafts.</p>'
            f'{walk}<div class="btns">{ask_walk}</div></div>')
    return section(f'<div class="vis-vill">{panel}{text}</div>{experiences(ctx)}', 'sindoor', cls='vis-sec', sid='village', labelledby='village-h')


def experiences(ctx):
    """The guest house's experiences (the old /guides/guest-house-experiences page now comes here, to #experiences)."""
    def ask(name, kind=''):
        return f'<a class="btn btn--sm{kind} vis-xp__cta" href="#book" data-also="{esc(name)}">Ask about this{arrow(16)}</a>'

    def card(x):
        inc = ''.join(f'<li>{esc(i)}</li>' for i in x['incl'])
        bg, ink = x['tone']
        return (f'<li class="vis-xp" style="--xp: var(--{bg}); --xp-ink: var(--{ink});"><p class="vis-xp__top"><span class="vis-xp__price">{rupees(x["price"])}</span> '
                f'<span class="vis-xp__unit">{x["unit"]}</span></p>'
                f'<div class="vis-xp__b"><h4 class="vis-xp__bn" lang="bn">{x["bn"]}</h4><p class="vis-xp__en">{esc(x["name"])}</p>'
                f'<p class="vis-xp__d">{x["desc"]}</p><p class="vis-xp__k">Includes</p><ul class="vis-xp__inc">{inc}</ul>{ask(x["name"])}</div></li>')

    def small(name, bn, price, unit):
        return (f'<li class="vis-xs"><p class="vis-xs__p"><span class="vis-xs__price">{rupees(price)}</span> <span class="vis-xs__unit">{unit}</span></p>'
                f'<div class="vis-xs__t"><h4 class="vis-xs__bn" lang="bn">{bn}</h4><p class="vis-xs__en">{esc(name)}</p></div>{ask(name, " btn--haldi")}</li>')
    return (f'<div class="vis-exp" id="experiences"><div class="vis-exp__head">'
            f'<h3 class="vis-exp__h"><span lang="bn">অতিথিশালার অভিজ্ঞতা</span> <span class="vis-exp__he">Guest-house experiences</span></h3>'
            f'<p class="vis-exp__p">Ask about any of them in your booking enquiry.</p></div>'
            f'<ul class="vis-xps">{"".join(card(x) for x in EXPERIENCES)}</ul>'
            f'<ul class="vis-xss">{"".join(small(*x) for x in MORE_EXPERIENCES)}</ul></div>')


# ---------------------------------------------------------------- 6 · facilities and questions
def questions(ctx):
    c = ctx.data['contact']
    H = ctx.data['hours']

    def fac(icon, bn, en):
        return (f'<li class="vis-fac__i"><span class="vis-fac__ic">{_ico(icon, "vis-fac__svg", 4.4)}</span> '
                f'<span class="vis-fac__t"><span class="vis-fac__bn" lang="bn">{bn}</span> <span class="vis-fac__en">{en}</span></span></li>')
    # access and facilities as the mandir's own FAQ gives them
    facilities = (f'<div class="vis-fac"><h3 class="vis-fac__h"><span lang="bn">সুবিধা</span> <span class="vis-fac__he">Facilities</span></h3><ul>'
                  + fac(ICON_WHEEL, 'হুইলচেয়ারে প্রবেশ', 'Wheelchair access from the eastern gate, with ramps and railings, and volunteers to help '
                        'at peak hours. Accessible restrooms and drinking water. For help during festivals, email ahead.')
                  + fac(ICON_WATER, 'জল, বসার জায়গা, শৌচাগার', 'Drinking water, shaded seating and restrooms near the anna-daan hall')
                  + fac(ICON_LOCKER, 'লকার', 'Lockers for small bags beside the eastern entrance')
                  + fac(ICON_AID, 'প্রাথমিক চিকিৎসা', 'First aid during major festivals')
                  + fac(ICON_TALK, 'দোভাষী', 'Volunteer interpreters for guided tours, in Bengali or Hindi, with 48 hours’ notice')
                  + fac(ICON_PARK, 'পার্কিং', 'Limited street parking near the temple; the temple does not manage parking. '
                        'The guest house has designated parking.') + '</ul></div>')

    def q(n, accent, en, bn, big, answer, is_open=False):
        o = ' open' if is_open else ''
        ink = 'sindoor-ink' if accent == 'sindoor' else accent      # small text in sindoor needs the darker red
        return (f'<details class="vis-q" style="--q: var(--{accent}); --qi: var(--{ink});"{o}><summary class="vis-q__s">'
                f'<span class="vis-q__n" lang="bn" aria-hidden="true">{n}</span> '
                f'<h3 class="vis-q__h"><span class="vis-q__en">{en}</span> <span class="vis-q__bn" lang="bn">{bn}</span></h3> '
                f'<span class="vis-q__x" aria-hidden="true"></span></summary>'
                f'<div class="vis-q__a"><p class="vis-q__big" lang="bn">{big}</p>{answer}</div></details>')
    lat, lng = c['geo']
    where = (f'{address_block(ctx, "vis-q__addr")}'
             f'<p class="vis-q__p"><span class="vis-q__k">GPS</span> {copy_value(f"{lat}, {lng}")}</p>'
             f'<div class="btns">{btn(ctx, "Open in Google Maps" + arrow(16), c["map_url"], "kajal", cls="btn--sm")}'
             f'<a class="u vis-q__link" href="#route">How to get here</a></div>')
    qs = (q('১', 'sindoor', 'Where exactly is the mandir?', 'মন্দির ঠিক কোথায়?', 'পাঁচমুড়া, বাঁকুড়া', where, True)
          + q('২', 'neel', 'Do I need to book darshan?', 'দর্শনের জন্য কি বুক করতে হয়?', 'না, সবার জন্য খোলা',
              '<p class="vis-q__p">Darshan is open to all, no booking needed.</p>'
              '<p class="vis-q__p">Groups of 10 or more, guest-house stays, special pujas and temple weddings: please contact the mandir in advance.</p>')
          + q('৩', 'peacock-d', 'When is the mandir open?', 'মন্দির কখন খোলা থাকে?', 'ভোর ৫টা থেকে',
              f'<p class="vis-q__p">Every day: {times(H["lines"][0])}, {times(H["lines"][1])}. On Ekadashi, Purnima and Amavasya the hours are longer, '
              f'with kirtan through the night.</p><p class="vis-q__p"><a class="u" href="{ctx.href("darshan#today")}">Today’s timings at the mandir</a></p>')
          + q('৪', 'abir', 'When is the best time?', 'কখন আসা সবচেয়ে ভালো?', 'অক্টোবর থেকে মার্চ',
              '<p class="vis-q__p">October to March. July and August, in the monsoon, are green; carry rain gear. '
              'Weekdays are less crowded than weekends.</p>'
              '<p class="vis-q__p">For the Tridhara Sandhya Arati at 6:30 PM, arrive 30 minutes early to find a seat and leave your footwear.</p>'
              f'<p class="vis-q__p"><a class="u" href="{ctx.href("festivals")}">The festival calendar</a></p>')
          + q('৫', 'sindoor', 'What should I wear?', 'কী পরে আসব?', 'কাঁধ ও হাঁটু ঢাকা',
              '<p class="vis-q__p">Clothes that cover the shoulders and knees. Remove shoes and leather belts before the sanctum, and keep silence during arati.</p>'
              f'<p class="vis-q__p"><a class="u" href="{ctx.href("darshan#rules")}">Four things to remember inside the mandir</a></p>')
          + q('৬', 'neel', 'Can I take photos?', 'ছবি তোলা যায়?', 'হ্যাঁ, প্রাঙ্গণে',
              '<p class="vis-q__p">Photography is allowed in the courtyards; ask before photographing inside the sanctum; no flash, '
              'and no interior photography during arati.</p>')
          + q('৭', 'peacock-d', 'Is there food?', 'খাবারের ব্যবস্থা আছে?', 'বিনামূল্যে প্রসাদ',
              f'<p class="vis-q__p">Anna-daan prasad, {times("12:30–2 PM")}, after the midday bhog: sattvic, onion-free and free for everyone, '
              'about 2,000 meals a day.</p>'
              '<p class="vis-q__p">Staying at the guest house? Note any food allergies in your booking enquiry.</p>'))
    more = (f'<div class="vis-more"><p class="vis-more__h"><span class="vis-more__bn" lang="bn">আর কোনো প্রশ্ন?</span> <span class="vis-more__en">Anything else?</span></p>'
            f'<p class="vis-more__p">Call or write to the mandir · {times(c["seva_desk"])}</p>'
            f'<p class="vis-more__c">{copy_value(c["phone"], href="tel:" + c["phone_e164"])}{copy_value(c["email"], href="mailto:" + c["email"])}</p></div>')
    head = sec_head('জেনে রাখুন', 'Good to know', btn(ctx, 'Festival calendar' + arrow(16), 'festivals', 'kajal', cls='btn--sm'), hid='questions-h')
    return section(head + f'<div class="vis-know">{facilities}<div class="vis-faq">{qs}{more}</div></div>',
                   'shola', cls='vis-sec', sid='questions', labelledby='questions-h')


# ---------------------------------------------------------------- structured data: the guest house, only what FACTS says
def json_ld(ctx):
    c = ctx.data['contact']
    return [{
        '@context': 'https://schema.org', '@type': 'LodgingBusiness',
        'name': 'Guest house at Tridhara Milan Mandir',
        'description': 'Eight boutique suites, 100 m from the courtyard of Tridhara Milan Mandir, Panchmura. '
                       'Rooms include anna-daan meals and temple access, with optional terracotta workshops.',
        'url': ctx.url('visit') + '#stay', 'telephone': c['phone_e164'], 'email': c['email'],
        'address': {'@type': 'PostalAddress', 'addressLocality': c['locality'], 'addressRegion': c['region'],
                    'postalCode': c['postcode'], 'addressCountry': c['country']},
        'numberOfRooms': 8, 'checkinTime': '14:00', 'checkoutTime': '11:00',
        'amenityFeature': [{'@type': 'LocationFeatureSpecification', 'name': 'Designated parking', 'value': True}],
        'priceRange': f'{rupees(ROOMS[0][2])}–{rupees(ROOMS[-1][2])} a night',
        'makesOffer': [{'@type': 'Offer', 'name': en, 'priceCurrency': 'INR',
                        'priceSpecification': {'@type': 'UnitPriceSpecification', 'price': p, 'priceCurrency': 'INR', 'unitText': 'night'}}
                       for _, en, p, _ in ROOMS]}]


def render(ctx):
    PAGE['json_ld'] = json_ld(ctx)
    return first_screen(ctx) + route(ctx) + stay(ctx) + village(ctx) + book(ctx) + questions(ctx)
