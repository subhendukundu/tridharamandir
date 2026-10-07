"""Darshan page: today at the mandir (live), the hours through the week, the three shrines, the Tridhara Sandhya Arati,
the mandir on YouTube, and four things to remember inside. Ported from the B-Darshan board."""
from lib import ui
from lib.ui import esc, btn, sec_head, section, sticker, marquee, dhara_poster
from lib import art
from lib.art import arrow, shikhara, sun, svg_doc, f, KAJAL, SHOLA, HALDI, SINDOOR, NEEL
from lib.motifs import trishul
from lib import byear as BY
from pages.seva import times

PAGE = dict(key='darshan', title='Darshan and arati times',
            description='Darshan at Tridhara Milan Mandir, Panchmura: open every day from 5 AM, the Tridhara Sandhya Arati at 6:30 PM, '
                        'the three shrines and the rules inside.',
            tone='neel')

# the first screen is drawn on the design's 1440 x 620 board; the files show the art column under the header.
# The desktop file runs 200 board units past the board's right edge; that part shows only on screens wider than 1440 px.
VIEW = (600, 96, 1040, 524)
ART_W = 840          # the art column inside the 1440 board (VIEW without the extra 200)
VIEW_M = (760, 96, 680, 524)
DAY_ITEMS = ['মঙ্গল আরতি ভোর ৫:০০', 'রাজভোগ দর্শন সকাল ৭:৩০', 'ভোগ দুপুর ১২:০০', 'অন্নদান প্রসাদ দুপুর ১২:৩০', 'ত্রিধারা সন্ধ্যা আরতি ৬:৩০',
             'বৃন্দাবন সভা রাত ৮:০০', 'প্রতিদিন ভোর ৫টা থেকে দর্শন']


# ---------------------------------------------------------------- small drawings (from the board)
def chakra_g(c=KAJAL):
    sp = ''.join(f'<path d="M0,-8 L0,-26" transform="rotate({a})" stroke="{c}" stroke-width="4"/>' for a in range(0, 360, 45))
    teeth = ''.join(f'<path d="M-4,-30 L0,-37 L4,-30 Z" transform="rotate({a})" fill="{c}"/>' for a in range(0, 360, 30))
    return f'<circle r="28" fill="none" stroke="{c}" stroke-width="5"/>{sp}{teeth}<circle r="7" fill="{c}"/>'


def shankha_g(c=KAJAL):
    return (f'<g transform="translate(-32,-30)" fill="none" stroke="{c}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">'
            '<path d="M8,40 C2,30 6,14 20,9 C34,4 50,10 56,22 C60,32 54,40 46,42 L28,50 C20,54 12,48 8,40 Z"/>'
            '<path d="M20,24 C26,18 36,18 40,24 C44,30 38,36 32,34 C28,33 28,28 32,27"/><path d="M46,42 L58,50"/></g>')


def trishul_g(c=KAJAL, s=.21):
    return f'<g transform="scale({s}) translate(-100,-222)" style="color: {c};">{trishul(18)}</g>'


def medal(cx, cy, r, inner, scale=1):
    return (f'<circle cx="{cx + 7}" cy="{cy + 7}" r="{r}" fill="{KAJAL}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<g transform="translate({cx},{cy}) scale({scale})">{inner}</g>')


def spark(x, y, s=1, c=HALDI):
    return f'<path transform="translate({x},{y}) scale({s})" d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z" fill="{c}"/>'


def hero_art():
    """(defs, shapes): the kajal shikhara with a lamp-lit door in a haldi sun, three medals (trishul, chakra, shankha), five diyas."""
    d, s = sun('dnH', 1112, 352, 246, HALDI, NEEL)
    tx, ty, ts = 1112, 586, 2.55
    temple = shikhara(tx, ty, ts, fill=KAJAL, line=KAJAL)
    glow = (f'<g transform="translate({tx},{ty}) scale({ts})"><path d="M-9,0 L-9,-12 A9,9 0 0 1 9,-12 L9,0 Z" fill="{HALDI}"/>'
            f'<path d="M0,-126 L20,-120.5 L0,-115 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="2"/></g>')
    medals = medal(944, 262, 50, trishul_g()) + medal(1112, 168, 50, chakra_g(), 1.12) + medal(1280, 262, 50, shankha_g(), 1.1)
    sparks = spark(880, 150, 1.1) + spark(1384, 168, .9, SHOLA) + spark(1400, 396, 1.2) + spark(1210, 120, .7, SHOLA)
    diyas = ''.join(BY.diya(x, 598, .84) for x in (1028, 1124, 1220, 1316, 1412, 1508))
    sparks += spark(1560, 236, .9, SHOLA) + spark(1600, 470, .7)      # beyond the board: wide screens only
    return d, s + sparks + temple + glow + medals + diyas


def yt_banner():
    """The banner of the YouTube channel card, drawn in the poster language (not a photo, and nothing like a video
    player: no play button): the mandir against a rising haldi sun, with diyas and sparks."""
    w, h = 752, 280
    d, s = sun('dnLv', 376, 292, 206, HALDI, NEEL)
    tx, ty, ts = 376, 262, 1.62
    temple = shikhara(tx, ty, ts, fill=KAJAL, line=KAJAL)
    glow = (f'<g transform="translate({tx},{ty}) scale({ts})"><path d="M-9,0 L-9,-12 A9,9 0 0 1 9,-12 L9,0 Z" fill="{HALDI}"/>'
            f'<path d="M0,-126 L20,-120.5 L0,-115 Z" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="2"/></g>')
    ground = f'<path d="M0,262 L{w},262 L{w},{h} L0,{h} Z" fill="{KAJAL}"/>'
    diyas = ''.join(BY.diya(x, 250, .6) for x in (54, 142, 230, 506, 594, 682))
    sp = spark(110, 64, .9) + spark(646, 58, 1.1, SHOLA) + spark(690, 166, .7) + spark(70, 170, .7, SHOLA) + spark(560, 120, .55, SHOLA)
    return svg_doc((0, 0, w, h), f'<rect width="{w}" height="{h}" fill="{NEEL}"/>{s}{sp}{ground}{temple}{glow}{diyas}', d)


def medal_svg(kind):
    """A round medal for the arati band (inline, decorative)."""
    inner = {'trishul': trishul_g(KAJAL, .26), 'chakra': f'<g transform="scale(1.4)">{chakra_g()}</g>',
             'shankha': f'<g transform="scale(1.35)">{shankha_g()}</g>'}[kind]
    return (f'<svg class="dar-medal" viewBox="0 0 140 140" aria-hidden="true" focusable="false">'
            f'<circle cx="77" cy="77" r="58" fill="{KAJAL}"/><circle cx="68" cy="68" r="58" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="5"/>'
            f'<g transform="translate(68,68)">{inner}</g></svg>')


# rule icons: shola line drawings on a coloured block
def _ico(body, extra=''):
    return (f'<svg class="dar-rule__ic" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g fill="none" stroke="{SHOLA}" stroke-width="3.4" '
            f'stroke-linecap="round" stroke-linejoin="round">{body}</g>{extra}</svg>')


NO_SIGN = f'<g fill="none" stroke="{HALDI}" stroke-width="4.4" stroke-linecap="round"><circle cx="32" cy="32" r="28"/><path d="M12.2,12.2 L51.8,51.8"/></g>'


def icon_dress():
    return _ico('<circle cx="32" cy="10" r="6"/><path d="M23,19 L41,19 L50,31 L45,35 L41,29 L43,50 L21,50 L23,29 L19,35 L14,31 Z"/><path d="M27,50 L27,60 M37,50 L37,60"/>'
                '<path d="M23,40 L41,40" stroke-width="2.4"/>')


def icon_leather():
    return _ico('<path d="M13,43 L13,25 L23,25 C26,31 34,35 45,37 C51,38 54,41 54,45 L54,48 L13,48 Z"/><path d="M13,43 L54,43" stroke-width="2.4"/>'
                '<path d="M23,25 L23,31 M29,30 L32,27 M34,33 L37,30" stroke-width="2.4"/>', NO_SIGN)


def icon_phone():
    return _ico('<rect x="19" y="5" width="26" height="54" rx="5"/><path d="M29,52 L35,52"/>'
                '<path d="M26,33 C26,25 28,20 32,20 C36,20 38,25 38,33 L40,37 L24,37 Z" stroke-width="2.8"/><path d="M30,41 L34,41" stroke-width="2.8"/>',
                f'<path d="M21,16 L43,46" stroke="{HALDI}" stroke-width="4.4" stroke-linecap="round"/>')


def icon_camera():
    """A camera (photos are fine in the courtyards) with only its flash crossed out."""
    return _ico('<path d="M6,31 L16,31 L20,25 L32,25 L36,31 L46,31 L46,55 L6,55 Z"/><circle cx="26" cy="43" r="7"/>'
                '<path d="M54,5 L47,14 L53,14 L48,23" stroke-width="2.8"/>',
                f'<g fill="none" stroke="{HALDI}" stroke-width="3.6" stroke-linecap="round"><circle cx="51" cy="14" r="11"/><path d="M43.2,6.2 L58.8,21.8"/></g>')


def icon_wheelchair():
    return ('<svg class="dar-ramp__ic" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="4.2" '
            'stroke-linecap="round" stroke-linejoin="round"><circle cx="26" cy="9" r="5"/><path d="M26,18 L26,36 L44,36 L50,52"/><path d="M26,26 L40,26"/>'
            '<path d="M20,30 A15,15 0 1 0 40,46"/></g></svg>')


def moon(kind):
    r, c = 11, 13
    if kind == 'full':
        body = f'<circle cx="{c}" cy="{c}" r="{r}" fill="currentColor" stroke="currentColor" stroke-width="2"/>'
    elif kind == 'new':
        body = f'<circle cx="{c}" cy="{c}" r="{r}" fill="none" stroke="currentColor" stroke-width="2"/>'
    else:   # ekadashi: a waxing gibbous moon
        body = (f'<circle cx="{c}" cy="{c}" r="{r}" fill="none" stroke="currentColor" stroke-width="2"/>'
                f'<path d="M{c},{c - r} A{r},{r} 0 0 1 {c},{c + r} A{f(r * .45)},{r} 0 0 1 {c},{c - r} Z" fill="currentColor"/>')
    return f'<svg class="dar-moon" width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" focusable="false">{body}</svg>'


def youtube_url(ctx):
    return next(u for n, u in ctx.data['contact']['social'] if n == 'YouTube')


# ---------------------------------------------------------------- 1 · first screen
def first_screen(ctx):
    d, s = hero_art()
    files = art.board_files('darshan-hero', d, s, view=VIEW, view_m=VIEW_M)
    ctx.add_img('darshan-youtube.svg', yt_banner())
    # before the script runs (or without it) the sticker shows the arati time; site.js turns it into a countdown
    stk = sticker('৬:৩০', 'সন্ধ্যা আরতি', 'Every evening', label='Tridhara Sandhya Arati, 6:30 PM every evening',
                  cls='phero__sticker dar-sticker', data=' data-dar-arati')
    extra = f'<div class="btns">{btn(ctx, "Today’s timings", "#today", "shola")}{btn(ctx, "The mandir on YouTube", "#youtube", "ghost")}</div>'
    sub = ('Open every day from 5\N{NO-BREAK SPACE}AM. Come for the Tridhara Sandhya Arati at 6:30\N{NO-BREAK SPACE}PM, '
           'when trishul, chakra and shankha meet in one arati.')
    hero = ui.page_hero(ctx, 'darshan', 'দর্শন ও আরতি', 'Darshan and arati times', sub, w=4.8, art_files=files, pa_w=ART_W / 1440,
                        extra=extra, sticker_html=stk, pt=.16, sr_en='Darshan and arati times', ph_max=160)
    return hero.replace('class="phero"', 'class="phero dar-hero"', 1) + marquee(DAY_ITEMS)


# ---------------------------------------------------------------- 2 · today, live
def today(ctx):
    S = ctx.data['schedule']
    tiles = ''
    for i, s in enumerate(S):
        tiles += (f'<li class="tile" data-slot="{i}"><span class="tile__tag" data-slot-tag hidden><span lang="bn">এখন</span> · Now</span>'
                  f'<p class="tile__time">{s["time"]}<small>{s["ampm"]}</small></p><p class="tile__bn" lang="bn">{s["bn"]}</p>'
                  f'<p class="tile__en">{s["en"]}</p><p class="tile__note">{s["note"]}</p></li>')
    aside = ('<div class="dar-status">'
             '<p class="dar-date" data-dar-date>Every day · India time</p>'
             '<p class="dar-open" data-live="open">Darshan from 5:00 AM</p>'
             '<p class="live"><span class="live__dot" aria-hidden="true"></span><span data-live="line">Darshan every day from 5:00 AM</span></p></div>')
    notes = (f'<div class="dar-notes" hidden>'
             f'<p class="dar-note dar-note--tithi" data-dar-tithi hidden>{moon("ekadashi")}{moon("full")}{moon("new")}'
             f'<span><span class="dar-note__bn" lang="bn">আজ রাতে কীর্তন</span> An Ekadashi, Purnima or Amavasya night: '
             f'the mandir stays open, with kirtan through the night.</span></p>'
             f'<p class="dar-note dar-note--fest" data-dar-fest hidden data-href="{esc(ctx.href("festivals"))}" data-href-durga="{esc(ctx.href("durga"))}">'
             f'<span class="dar-note__bn" lang="bn" data-dar-fest-bn>আজ উৎসব</span> <span data-dar-fest-en>A festival today.</span></p></div>')
    head = sec_head('আজ মন্দিরে', 'Today, hour by hour', aside, hid='today-h')
    return section(head + f'<ol class="day">{tiles}</ol>' + notes, 'shola', cls='dar-sec', sid='today', labelledby='today-h')


# ---------------------------------------------------------------- 3 · the week's hours
AX0, AX1 = 240, 1500   # the board's time axis: 4 AM to 1 AM the next morning


def pct(m):
    return f'{(m - AX0) / (AX1 - AX0) * 100:.3f}%'


def hours(ctx):
    H = ctx.data['hours']
    ticks = [(300, '5 AM'), (540, '9 AM'), (720, '12 PM'), (900, '3 PM'), (1080, '6 PM'), (1260, '9 PM'), (1440, '12 AM')]
    minor = {540, 900, 1260}
    grid = '<span class="dar-hrs__grid" aria-hidden="true">' + ''.join(f'<i style="left: {pct(m)};"></i>' for m, _ in ticks) + '</span>'
    axis = ''.join(f'<span class="dar-hrs__tick{" dar-hrs__tick--minor" if m in minor else ""}" style="left: {pct(m)};">{t}</span>' for m, t in ticks)
    arati = next((s for s in ctx.data['schedule'] if 'Sandhya' in s['en']), None)
    mark = f'<span class="dar-hrs__mark" style="left: {pct(arati["start"])};" aria-hidden="true"></span>' if arati else ''

    def bar(start, end, text, cls=''):
        return f'<p class="dar-hrs__bar{cls}" style="left: {pct(start)}; width: calc({pct(end)} - {pct(start)});">{text}</p>'

    def row(key, bn, en, track, cls='', icons=''):
        return (f'<div class="dar-hrs__row{cls}" data-dar-row="{key}"><div class="dar-hrs__l">{icons}'
                f'<span class="dar-hrs__bn" lang="bn">{bn}</span> <span class="dar-hrs__en">{en}</span> '
                f'<span class="dar-hrs__today" data-dar-today hidden><span lang="bn">আজ</span> · Today</span></div>'
                f'<div class="dar-hrs__track">{grid}{track}{mark}</div></div>')
    o, cwd, cwe = H['open'], H['close_weekday'], H['close_weekend']
    tail = (f'<span class="dar-hrs__tail" style="left: {pct(cwe)};" aria-hidden="true">{moon("full")}</span>')
    board = (f'<div class="dar-hrs">'
             f'<div class="dar-hrs__row dar-hrs__row--axis" aria-hidden="true"><div class="dar-hrs__l"><span class="dar-hrs__k">Darshan hours · IST</span></div>'
             f'<div class="dar-hrs__track">{axis}</div></div>'
             + row('weekday', 'সোম–শুক্র', 'Monday to Friday', bar(o, cwd, times(H['lines'][0].split(' ', 1)[1])))
             + row('weekend', 'শনি–রবি', 'Saturday and Sunday', bar(o, cwe, times(H['lines'][1].split(' ', 1)[1])))
             + row('tithi', 'একাদশী, পূর্ণিমা, অমাবস্যা', 'Ekadashi · Purnima · Amavasya',
                   bar(o, cwe, '<span class="dar-hrs__long">Extended hours · kirtan through the night</span> '
                       '<span class="dar-hrs__short">Kirtan through the night</span>', ' dar-hrs__bar--tithi') + tail,
                   ' dar-hrs__row--tithi', f'<span class="dar-moons">{moon("ekadashi")}{moon("full")}{moon("new")}</span>')
             + '</div>')
    legend = ('<div class="dar-legend"><span class="dar-legend__mark" aria-hidden="true"></span>'
              '<div><p><strong>Tridhara Sandhya Arati, 6:30 PM daily</strong></p>'
              + ui.note('the arati time follows the current website’s homepage (18:30). Elsewhere that website also gives '
                        '6:30–8 PM and 7–8:30 PM.', 'p')
              + ui.note('only seven kirtan nights are listed so far, and no Ekadashi. Please send this year’s Ekadashi, Purnima and Amavasya dates.', 'p')
              + '</div></div>')

    def t(a, b):
        return f'{a}<small>{b}</small>'

    def ticket(time, bn, en, accent):
        return (f'<li class="dar-tk" style="--tk: var(--{accent});"><p class="dar-tk__t">{time}</p>'
                f'<p class="dar-tk__bn" lang="bn">{bn}</p><p class="dar-tk__en">{en}</p></li>')
    tickets = (ticket(t('12:00', 'PM'), 'রাধাকৃষ্ণের ভোগ', 'Bhog before Radha-Krishna', 'sindoor')
               + ticket(t('12:30–2', 'PM'), 'অন্নদান প্রসাদ', 'Anna-daan prasad, free', 'haldi')
               + ticket(t('5:30', 'PM'), 'হালকা খাবার', 'Light meal during festivals', 'peacock')
               + ticket(t('8', 'AM') + '–' + t('6', 'PM'), 'সেবা ডেস্ক', 'Seva desk', 'neel'))
    aside = '<p>Darshan begins at 5:00 AM with Mangal Arati and tulsi parikrama.</p>'
    return section(sec_head('দর্শনের সময়', 'Every day of the week', aside, hid='hours-h')
                   + f'<div class="dar-hrs-wrap">{board}{legend}</div><ul class="dar-tks">{tickets}</ul>',
                   'paper', cls='dar-sec', sid='hours', labelledby='hours-h')


# ---------------------------------------------------------------- 4 · the three shrines
def shrines(ctx):
    ps = (dhara_poster(ctx, 'shaiva', 'slate', 'মহাদেব', 'Shaiva · stillness', 'The Shiva linga and the meditating Shiva: Mahadev’s stillness.',
                       'অর্পণ · বেলপাতা ও জল', -1.2, key='festivals#shivaratri')
          + dhara_poster(ctx, 'vaishnava', 'neel', 'রাধাকৃষ্ণ', 'Vaishnava · bhakti', 'Radha-Krishna in the main sanctum, with kirtan and tulsi.',
                         'অর্পণ · তুলসী ও ফুল', .8, key='festivals#rash')
          + dhara_poster(ctx, 'shakta', 'sindoor', 'মা কালী', 'Shakta · shakti', 'Maa Kali, greeted with ulu at the evening arati.',
                         'অর্পণ · জবা ফুল', -.6, key='festivals#kali'))

    def chip(bn, en):
        return f'<li class="dar-also__i"><span class="dar-also__bn" lang="bn">{bn}</span> <span class="dar-also__en">{en}</span></li>'
    band = (f'<div class="dar-also"><h3 class="dar-also__h"><span lang="bn">আরও দর্শন</span> <span class="dar-also__he">Also in the mandir</span></h3>'
            f'<ul class="dar-also__list">{chip("জগন্নাথ", "Jagannath, on the altar")}{chip("চৈতন্য মহাপ্রভু", "Chaitanya Mahaprabhu")}'
            f'{chip("রাম–সীতা", "Rama–Sita")}{chip("হনুমান", "Hanuman")}</ul></div>')
    aside = '<p>Mahadev, Radha-Krishna and Maa Kali, worshipped together in one mandir.</p>'
    return section(sec_head('তিন ধারার দর্শন', 'The three shrines', aside, hid='shrines-h')
                   + f'<div class="rail dar-shrines">{ps}</div>' + band, 'haldi', cls='dar-sec', sid='shrines', labelledby='shrines-h')


# ---------------------------------------------------------------- 5 · the arati
def arati(ctx):
    def item(kind, dh_bn, bn, en):
        return (f'<li class="dar-arati__i">{medal_svg(kind)}<p class="dar-arati__dh" lang="bn">{dh_bn}</p>'
                f'<h3 class="dar-arati__bn" lang="bn">{bn}</h3><p class="dar-arati__en">{en}</p></li>')
    items = (item('trishul', 'শৈব', 'ত্রিশূল আর ডমরু', 'Shaiva · the trishul and the damru')
             + item('chakra', 'বৈষ্ণব', 'চক্র আর মৃদঙ্গ', 'Vaishnava · the chakra and the mridanga')
             + item('shankha', 'শাক্ত', 'শঙ্খ আর উলু', 'Shakta · the shankha and the ulu'))
    aside = '<p>Every evening the three streams meet in one arati. It culminates before Radha-Krishna and Maa Kali.</p>'
    return section(sec_head('তিন ধারা, এক আরতি', 'The Tridhara Sandhya Arati · 6:30 PM', aside, hid='arati-h')
                   + f'<ol class="dar-arati">{items}</ol>', 'sindoor', cls='dar-sec', sid='arati', labelledby='arati-h')


# ---------------------------------------------------------------- 6 · the mandir on YouTube: a channel card that links out.
# No embed, and nothing that reads like a live stream (no play button, no arati time beside it): FACTS gives the channel only.
def youtube(ctx):
    yt = youtube_url(ctx)
    handle = '@' + yt.rstrip('/').rsplit('@', 1)[-1]
    social = dict(ctx.data['contact']['social'])
    card = (f'<a class="dar-yt__frame" href="{esc(yt)}" rel="noopener" target="_blank" aria-label="Follow the mandir on YouTube, {handle} (opens YouTube)">'
            f'<span class="dar-yt__banner"><img src="{ctx.img("darshan-youtube.svg")}" alt="" width="752" height="280" loading="lazy" decoding="async"></span>'
            f'<span class="dar-yt__chan"><span class="dar-yt__avatar">{art.ghot_mark("ghot dar-yt__mark", 64)}</span>'
            f'<span class="dar-yt__who"><span class="dar-yt__name" lang="bn">{esc(ctx.data["site"]["name_bn"])}</span>'
            f'<span class="dar-yt__handle">{handle}</span></span>'
            f'<span class="dar-yt__follow">Follow on YouTube{arrow(16)}</span></span></a>')
    also = ''
    if social.get('Facebook') and social.get('Instagram'):
        also = (f'<p class="dar-yt__also">The mandir is also on <a class="u" href="{esc(social["Facebook"])}" rel="noopener" target="_blank">Facebook</a> '
                f'and <a class="u" href="{esc(social["Instagram"])}" rel="noopener" target="_blank">Instagram</a>.</p>')
    text = (f'<div class="dar-yt__text">{sec_head("ইউটিউবে মন্দির", "The mandir on YouTube", hid="youtube-h")}'
            f'<p class="dar-yt__p">Far from Panchmura? Follow the mandir on its YouTube channel, {handle}.</p>{also}'
            f'<div class="btns">{btn(ctx, "Follow the mandir on YouTube" + arrow(16), yt, "haldi")}</div></div>')
    return section(f'<div class="dar-yt">{text}{card}</div>', 'kajal', cls='dar-sec', sid='youtube', labelledby='youtube-h')


# ---------------------------------------------------------------- 7 · before you come
def rules(ctx):
    def card(n, icon, bn, en, tone, detail=''):
        d = f'<p class="dar-rule__d">{detail}</p>' if detail else ''
        return (f'<li class="dar-rule" style="--rule: var(--{tone});"><div class="dar-rule__top"><span class="dar-rule__n" lang="bn" aria-hidden="true">{n}</span>{icon}</div>'
                f'<div class="dar-rule__b"><h3 class="dar-rule__bn" lang="bn">{bn}</h3><p class="dar-rule__en">{en}</p>{d}</div></li>')
    # the words of the mandir's own FAQ
    cards = (card('১', icon_dress(), 'কাঁধ ও হাঁটু ঢাকা', 'Shoulders and knees covered', 'sindoor')
             + card('২', icon_leather(), 'গর্ভগৃহে চামড়া নয়', 'No leather in the garbhagriha', 'neel', 'Remove shoes and leather belts before the sanctum.')
             + card('৩', icon_phone(), 'ফোন সাইলেন্টে', 'Phones on silent', 'peacock-d', 'Silence during arati.')
             + card('৪', icon_camera(), 'ছবি প্রাঙ্গণে, ফ্ল্যাশ নয়', 'Photos in the courtyards · no flash', 'abir',
                    'Ask before photographing inside the sanctum, and no interior photography during arati.'))
    ramp = (f'<div class="dar-ramp">{icon_wheelchair()}<p class="dar-ramp__t"><span class="dar-ramp__bn" lang="bn">পূর্ব দিকের প্রবেশপথে হুইলচেয়ার র‍্যাম্প</span> '
            f'<span class="dar-ramp__en">Wheelchair ramps at the eastern entrance</span></p>'
            f'{btn(ctx, "Plan your visit" + arrow(16), "visit", "kajal", cls="btn--sm")}</div>')
    head = sec_head('আসার আগে', 'Before you come', '<p>Four things to remember inside the mandir.</p>', hid='rules-h')
    return section(head + f'<ol class="dar-rules">{cards}</ol>' + ramp, 'shola', cls='dar-sec', sid='rules', labelledby='rules-h')


def render(ctx):
    return first_screen(ctx) + today(ctx) + hours(ctx) + shrines(ctx) + arati(ctx) + youtube(ctx) + rules(ctx)
