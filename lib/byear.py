"""B · Utsav through the Bengali year: one first screen per festival, same layout, new colours/motif/headline."""
from .motifs import *
import random, math

BNF = "'Anek Bangla', 'Noto Sans Bengali', sans-serif"
CAPS = "'Big Shoulders', 'Anek Bangla', Impact, sans-serif"
PEACOCK = '#0E8C7E'
# ink metrics at 264px (asc, desc, width), measured with the real Anek Bangla
M = {'পুজো': (182, 83, 467), 'আসছে': (178, 42, 629), 'রথ': (182, 29, 272), 'যাত্রা': (178, 21, 410), 'শুভ': (182, 0, 354),
     'জন্মাষ্টমী': (256, 21, 775), 'শ্যামা': (178, 0, 476), 'পূজা': (182, 98, 397), 'শিব': (244, 5, 338), 'রাত্রি': (244, 29, 398), 'দোল': (178, 9, 429)}


def layout(w1, w2):
    F = 264
    while True:
        k = F / 264
        a1, d1, x1 = [v * k for v in M[w1]]
        a2, d2, x2 = [v * k for v in M[w2]]
        b1 = 112 + a1; b2 = b1 + d1 + 20 + a2
        if b2 + d2 <= 622 and max(x1, x2) <= 700:
            return F, b1 - 0.8167 * F, b2 - 0.8167 * F, x1
        F -= 4


# ---------------------------------------------------------------- extra poster motifs
def diya(x, y, s=1):
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})">'
            f'<path d="M-46,-6 C-40,16 -18,24 0,24 C18,24 40,16 46,-6 L62,-14 L48,2 C30,-2 -30,-2 -46,-6 Z" fill="#C0602F" stroke="{KAJAL}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M-40,2 C-20,10 20,10 40,2" fill="none" stroke="#7A3215" stroke-width="3"/>'
            f'<path d="M56,-14 C66,-30 64,-50 52,-68 C42,-50 40,-30 56,-14 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<path d="M55,-18 C60,-28 59,-38 53,-48 C48,-38 48,-28 55,-18 Z" fill="{SHOLA}"/></g>')


def bel(x, y, s=1, rot=0):
    leaf = lambda a: (f'<g transform="rotate({a})"><path d="M0,0 C-18,-20 -18,-62 0,-84 C18,-62 18,-20 0,0 Z" fill="#3E8E41" stroke="{KAJAL}" stroke-width="3.5" stroke-linejoin="round"/>'
                      f'<path d="M0,-6 L0,-74" stroke="#1F5A23" stroke-width="2.5"/></g>')
    return f'<g transform="translate({f(x)},{f(y)}) rotate({rot}) scale({s})">{leaf(-58)}{leaf(58)}{leaf(0)}<path d="M0,0 L0,30" stroke="#1F5A23" stroke-width="5" stroke-linecap="round"/></g>'


def blob(cx, cy, r, seed, color, op=1):
    rnd = random.Random(seed); n = 11
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n; rr = r * rnd.uniform(.72, 1.18)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d = f'M{f((pts[0][0]+pts[-1][0])/2)},{f((pts[0][1]+pts[-1][1])/2)}'
    for i in range(n):
        p, q = pts[i], pts[(i + 1) % n]
        d += f' Q{f(p[0])},{f(p[1])} {f((p[0]+q[0])/2)},{f((p[1]+q[1])/2)}'
    dots = ''.join(f'<circle cx="{f(cx + r*1.35*math.cos(a))}" cy="{f(cy + r*1.35*math.sin(a))}" r="{f(rnd.uniform(3,9))}" fill="{color}" opacity="{op}"/>'
                   for a in [rnd.uniform(0, 6.28) for _ in range(9)])
    return f'<path d="{d} Z" fill="{color}" opacity="{op}"/>{dots}'


def feather_c(L=360):
    """Coloured peacock feather pointing up, base at 0,0."""
    barbs = ''.join(f'<path d="M0,{-y} q{-(26 + y*.12):.0f},-8 {-(40 + y*.14):.0f},-26 M0,{-y} q{26 + y*.12:.0f},-8 {40 + y*.14:.0f},-26" stroke="{PEACOCK}" stroke-width="5" fill="none" stroke-linecap="round"/>'
                    for y in range(40, int(L * .62), 16))
    return (f'<path d="M0,0 L0,{-L*.78:.0f}" stroke="{SHOLA}" stroke-width="6" stroke-linecap="round"/>{barbs}'
            f'<g transform="translate(0,{-L*.8:.0f})"><path d="M0,-96 C46,-66 50,10 0,40 C-50,10 -46,-66 0,-96 Z" fill="{PEACOCK}" stroke="{KAJAL}" stroke-width="4"/>'
            f'<path d="M0,-62 C26,-44 28,2 0,20 C-28,2 -26,-44 0,-62 Z" fill="{HALDI}" stroke="{KAJAL}" stroke-width="3"/>'
            f'<ellipse cx="0" cy="-18" rx="13" ry="20" fill="{NEEL}"/><ellipse cx="0" cy="-22" rx="5" ry="8" fill="#5B8DEF"/></g>')


def flute_c(L=420):
    holes = ''.join(f'<circle cx="{f(-L/2 + 70 + i*30)}" cy="0" r="4.5" fill="{KAJAL}"/>' for i in range(7))
    return (f'<rect x="{-L/2}" y="-12" width="{L}" height="24" rx="12" fill="{HALDI}" stroke="{KAJAL}" stroke-width="4"/>{holes}'
            f'<path d="M{-L/2+30},-12 L{-L/2+30},12 M{-L/2+42},-12 L{-L/2+42},12 M{L/2-34},-12 L{L/2-34},12" stroke="{SINDOOR}" stroke-width="5"/>'
            f'<path d="M{L/2-40},12 C{L/2-44},40 {L/2-30},58 {L/2-40},84" stroke="{SINDOOR}" stroke-width="6" fill="none" stroke-linecap="round"/>'
            f'<circle cx="{L/2-40}" cy="88" r="9" fill="{SINDOOR}" stroke="{KAJAL}" stroke-width="3"/>')


def handi(x, y, s=1):
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})">'
            f'<path d="M-30,-70 C-60,-60 -78,-28 -76,8 C-74,48 -40,72 0,72 C40,72 74,48 76,8 C78,-28 60,-60 30,-70 Z" fill="#C0602F" stroke="{KAJAL}" stroke-width="5"/>'
            f'<path d="M-62,-6 C-30,8 30,8 62,-6" fill="none" stroke="{KAJAL}" stroke-width="3" opacity=".6"/>'
            + ''.join(f'<circle cx="{c}" cy="22" r="5" fill="none" stroke="{KAJAL}" stroke-width="2.5" opacity=".6"/>' for c in (-36, -12, 12, 36))
            + f'<rect x="-36" y="-84" width="72" height="18" rx="6" fill="#A44D23" stroke="{KAJAL}" stroke-width="5"/>'
            f'<path d="M-30,-84 C-34,-110 -10,-122 0,-112 C10,-126 36,-112 30,-84 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4"/></g>')


def bunting(x0, y0, x1, y1, sag, colors):
    n = 9; out = [f'<path d="M{x0},{y0} Q{(x0+x1)/2},{(y0+y1)/2+sag} {x1},{y1}" fill="none" stroke="{KAJAL}" stroke-width="3"/>']
    for i in range(n):
        t = (i + .5) / n
        x = (1-t)**2*x0 + 2*(1-t)*t*(x0+x1)/2 + t*t*x1; y = (1-t)**2*y0 + 2*(1-t)*t*((y0+y1)/2+sag) + t*t*y1
        out.append(f'<path d="M{f(x-22)},{f(y)} L{f(x+22)},{f(y)} L{f(x)},{f(y+44)} Z" fill="{colors[i % len(colors)]}" stroke="{KAJAL}" stroke-width="3" stroke-linejoin="round"/>')
    return ''.join(out)


# ---------------------------------------------------------------- the festivals
def art_rath():
    return (bunting(800, 120, 1430, 150, 70, [SINDOOR, SHOLA, NEEL]) + f'<g transform="translate(1080,450) scale(2.45)">{wheel()}</g>')


def art_janma():
    stars = ''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SHOLA}"/>' for x, y, r in ((860, 130, 3), (930, 210, 2), (1300, 120, 3), (1390, 260, 2.5), (1210, 96, 2), (820, 330, 2), (1400, 520, 3), (1340, 180, 2)))
    return (stars + f'<g transform="translate(1190,830) rotate(14) scale(1.32)">{feather_c(470)}</g>'
            + f'<g transform="translate(1030,470) rotate(-32)">{flute_c(520)}</g>' + handi(890, 700, 1.1))


def art_kali():
    diyas = ''.join(diya(x, 800, .95) for x in range(840, 1440, 112))
    sparks = ''.join(f'<path d="M{x},{y} l4,-12 l4,12 l12,4 l-12,4 l-4,12 l-4,-12 l-12,-4 Z" fill="{HALDI}"/>' for x, y in ((860, 150), (1330, 120), (1390, 300), (820, 420), (1260, 690)))
    return sparks + f'<g transform="translate(1080,420) scale(2.25)">{joba(fill="#E8261E", stroke="#0A0705")}</g>' + diyas


def art_shiva():
    return (f'<circle cx="1036" cy="388" r="270" fill="#24324A"/>'
            f'<g transform="translate(980,58) scale(1.32)" style="color: {SHOLA};">{trishul(7)}</g>'
            + bel(900, 760, 1.2, -18) + bel(1290, 770, 1.05, 16))


def art_dol():
    b = ('<g filter="url(#dolSoft)">' + blob(900, 220, 110, 3, '#2E9E5B', .95) + blob(1300, 210, 120, 5, '#6A1B9A', .92) + blob(1360, 640, 130, 7, HALDI, .95)
         + blob(860, 640, 120, 9, '#FB8C00', .95) + blob(1130, 760, 90, 11, '#2E9E5B', .9) + '</g>')
    return b + f'<g transform="translate(1080,450) rotate(-28)">{flute_c(480)}</g>' + f'<g transform="translate(1180,700) rotate(22) scale(.8)">{feather_c(460)}</g>'


SPECS = [
    dict(id='rath', month='আষাঢ়', en='Rath Yatra', dhara='Vaishnava', bg=HALDI, sun=SINDOOR, dots=HALDI, head=KAJAL, shadow=SINDOOR, fg=KAJAL,
         w=('রথ', 'যাত্রা'), num='১২', sub='Rath Yatra · five years of Tridhara', body='The chariots roll out on the mandir’s own birthday: Tridhara was consecrated on Rath Yatra 2022.', art=art_rath()),
    dict(id='janma', month='ভাদ্র', en='Janmashtami', dhara='Vaishnava', bg=NEEL, sun='#F4E9C8', dots=NEEL, head=SHOLA, shadow=KAJAL, fg=SHOLA,
         w=('শুভ', 'জন্মাষ্টমী'), num='৯', sub='Janmashtami in Naba Brindaban', body='Sri Krishna’s birth, celebrated at midnight in Bankura’s Vrindavan.', art=art_janma()),
    dict(id='durga', month='আশ্বিন', en='Durga Puja', dhara='Shakta', bg=SINDOOR, sun=HALDI, dots=SINDOOR, head=SHOLA, shadow=KAJAL, fg=SHOLA,
         w=('পুজো', 'আসছে'), num='১৪', sub='Durga Puja at Tridhara · 16–21 October', body='Shashthi to Dashami: five days of dhak, bhog and arati in Panchmura.', art=None),
    dict(id='kali', month='কার্তিক', en='Kali Puja', dhara='Shakta', bg=KAJAL, sun='#7E1A12', dots=KAJAL, head=SHOLA, shadow=SINDOOR, fg=SHOLA,
         w=('শ্যামা', 'পূজা'), num='৭', sub='Kali Puja · Dipanwita night', body='A night of lamps: light a clay diya for someone you love.', art=art_kali()),
    dict(id='shiva', month='ফাল্গুন', en='Maha Shivaratri', dhara='Shaiva', bg='#24324A', sun='#E4E9EE', dots='#24324A', head=SHOLA, shadow=KAJAL, fg=SHOLA,
         w=('শিব', 'রাত্রি'), num='৫', sub='Maha Shivaratri at Tridhara', body='A night awake with Mahadev: jal and bel-patra for the Shiva linga.', art=art_shiva()),
    dict(id='dol', month='ফাল্গুন', en='Dol Yatra', dhara='Vaishnava', bg='#D81B60', sun='#FFD23F', dots='#D81B60', head=SHOLA, shadow=KAJAL, fg=SHOLA,
         w=('দোল', 'যাত্রা'), num='১০', sub='Dol Purnima · Gaura Purnima', body='Abir for Radha-Krishna, and the birthday of Chaitanya Mahaprabhu.', art=art_dol()),
]


def durga_art(p):
    rnd = random.Random(21)
    sh = []
    for _ in range(15):
        x = rnd.uniform(560, 1420); y = rnd.uniform(96, 330)
        if 760 < x < 1400 and 140 < y < 330 and rnd.random() < .5:
            y = rnd.uniform(96, 140)
        sh.append(shiuli(x, y, rnd.uniform(.8, 1.35), rnd.uniform(0, 60)))
    for x, y in ((604, 792), (680, 768), (744, 806), (30, 120)):
        sh.append(shiuli(x, y, rnd.uniform(.8, 1.2), rnd.uniform(0, 60)))
    kashes = ''.join(f'<g transform="translate({x},{y}) scale({s}) rotate({r})">{kash(lean=l)}</g>'
                     for x, y, s, r, l in ((1204, 846, .9, -6, -1), (1256, 846, 1.05, -2, -1), (1312, 846, .95, 4, 1), (1366, 846, 1.1, 8, 1), (1418, 846, .85, 12, 1), (1150, 846, .7, -10, -1)))
    return kashes + f'<g transform="translate(804,236) scale(1.02) rotate(-14 280 260)">{dhak()}</g>' + ''.join(sh)


def hero(s):
    p = s['id']
    F, t1, t2, x1 = layout(*s['w'])
    art = s['art'] if s['art'] is not None else durga_art(p)
    fg = s['fg']
    sun = f'<circle cx="1080" cy="430" r="300" fill="{s["sun"]}"/><circle cx="1080" cy="430" r="300" fill="url(#{p}Dots)" mask="url(#{p}Ring)"/>'
    svg = f'''<svg width="1440" height="900" viewBox="0 0 1440 900" aria-hidden="true" style="position: absolute; left: 0; top: 0; display: block;">
<defs><pattern id="{p}Dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="3.6" fill="{s['dots']}"/></pattern>
<radialGradient id="{p}RingG" cx=".5" cy=".5" r=".5"><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>
<mask id="{p}Ring"><circle cx="1080" cy="430" r="300" fill="url(#{p}RingG)"/></mask>
<filter id="{p}Soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="{p}Paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.05"/></filter></defs>
<rect width="1440" height="900" fill="{s['bg']}"/>{sun}{art}
<rect width="1440" height="900" filter="url(#{p}Paper)" opacity=".08"/></svg>'''
    big = f"position: absolute; left: 64px; margin: 0; font-family: {BNF}; font-weight: 800; font-stretch: 75%; font-size: {F}px; line-height: {F}px; color: {s['head']}; text-shadow: 7px 7px 0 {s['shadow']}; white-space: nowrap;"
    sx = min(64 + x1 + 56, 600)
    btn_bg, btn_fg = (KAJAL, HALDI) if s['bg'] in (HALDI,) else (SHOLA, KAJAL)
    items = ['দুর্গাপূজা ১৬–২১ অক্টোবর', 'কালীপূজা ৮ নভেম্বর', 'রাসপূর্ণিমা ২৪ নভেম্বর', 'শিবরাত্রি ৬ মার্চ', 'রথযাত্রা ৫ জুলাই', 'প্রতিদিন সন্ধ্যা আরতি ৬:৩০']
    run = ''.join(f'<span>{t}</span><span aria-hidden="true" style="color: {SHOLA};">✦</span>' for t in items)
    return f'''<div style="position: relative; width: 1440px; height: 900px; overflow: hidden; background: {s['bg']}; font-family: {BNF};">
{svg}
<header style="position: absolute; left: 0; top: 0; width: 1440px; height: 84px; box-sizing: border-box; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; color: {fg};">
<a href="#home" style="display: flex; flex-direction: column; gap: 2px; color: {fg};"><span lang="bn" style="font-weight: 700; font-size: 25px; line-height: 1.2;">ত্রিধারা মিলন মন্দির</span>
<span style="font-family: {CAPS}; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase;">Tridhara Milan Mandir · Panchmura</span></a>
<nav style="display: flex; align-items: center; gap: 30px; font-weight: 600; font-size: 20px;"><a href="#d" lang="bn" style="color: {fg};">দর্শন</a><a href="#a" lang="bn" style="color: {fg};">আরতি</a><a href="#s" lang="bn" style="color: {fg};">সেবা</a><a href="#u" lang="bn" style="color: {fg};">উৎসব</a><a href="#v" style="color: {fg};">Visit</a>
<a href="#s" style="padding: 12px 18px; background: {KAJAL}; color: {HALDI}; font-family: {CAPS}; font-weight: 800; font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase;">Offer seva</a></nav>
</header>
<h1 lang="bn" style="margin: 0;"><span style="{big} top: {t1:.0f}px;">{s['w'][0]}</span><span style="{big} top: {t2:.0f}px;">{s['w'][1]}</span></h1>
<div style="position: absolute; left: {sx:.0f}px; top: 140px; width: 188px; height: 188px; box-sizing: border-box; border-radius: 50%; border: 4px solid {KAJAL}; background: {SHOLA}; transform: rotate(-10deg); box-shadow: 6px 6px 0 {KAJAL}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: {KAJAL};">
<span style="font-weight: 800; font-stretch: 75%; font-size: 92px; line-height: 0.9; color: {SINDOOR};">{s['num']}</span><span lang="bn" style="font-weight: 700; font-size: 24px; line-height: 1.1;">দিন বাকি</span>
<span style="font-family: {CAPS}; font-weight: 800; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;">days to go</span></div>
<div style="position: absolute; left: 64px; top: 644px; width: 760px; display: flex; flex-direction: column; gap: 10px; color: {fg};">
<p style="margin: 0; font-family: {CAPS}; font-weight: 800; font-size: 40px; line-height: 1.1; letter-spacing: 0.02em; text-transform: uppercase;">{s['sub']}</p>
<p style="margin: 0; font-weight: 500; font-size: 20px; line-height: 1.45;">{s['body']}</p>
<div style="margin-top: 16px; display: flex; gap: 20px;">
<a href="#u" style="padding: 16px 24px; background: {btn_bg}; color: {btn_fg}; box-shadow: 5px 5px 0 {KAJAL if btn_bg == SHOLA else s['shadow']}; font-family: {CAPS}; font-weight: 800; font-size: 18px; letter-spacing: 0.08em; text-transform: uppercase;">See the schedule</a>
<a href="#s" style="padding: 13px 22px; border: 3px solid {fg}; color: {fg}; font-family: {CAPS}; font-weight: 800; font-size: 18px; letter-spacing: 0.08em; text-transform: uppercase;">Offer a seva</a></div></div>
<div style="position: absolute; left: 0; bottom: 0; width: 1440px; height: 64px; overflow: hidden; background: {KAJAL};">
<div lang="bn" style="display: flex; align-items: center; gap: 28px; width: max-content; height: 64px; padding-left: 28px; font-weight: 700; font-size: 26px; color: {HALDI}; white-space: nowrap;">{run}{run}</div></div>
</div>'''


