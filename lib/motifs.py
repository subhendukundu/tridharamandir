"""SVG motifs shared by the round-2 boards. Each function returns markup (strings)."""
import math, random

KAJAL = '#16100C'; SHOLA = '#FFF6E6'; HALDI = '#F7B519'; SINDOOR = '#CC3018'; NEEL = '#1F2C7A'


def f(x):
    return ('%.1f' % x).rstrip('0').rstrip('.')


# ---------------------------------------------------------------- Bankura horse (Panchmura terracotta)

def _bez(p0, p1, p2, p3, t):
    u = 1 - t
    return (u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0], u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1])


def _mane():
    P = ((150, 118), (156, 206), (168, 300), (186, 372))
    inner, outer, notches = [], [], []
    for i in range(0, 21):
        t = 0.02 + 0.9 * i / 20
        x, y = _bez(*P, t); x2, y2 = _bez(*P, t + .01)
        dx, dy = x2 - x, y2 - y; n = (dx*dx + dy*dy) ** .5; nx, ny = dy / n, -dx / n  # outward normal (to the right)
        w = 14 * (1 - .35 * t)
        inner.append((x - nx * 3, y - ny * 3)); outer.append((x + nx * w, y + ny * w))
        if 0 < i < 20: notches.append(f'M{f(x+nx*1)},{f(y+ny*1)} L{f(x+nx*(w-3))},{f(y+ny*(w-3))}')
    d = 'M' + ' L'.join(f'{f(x)},{f(y)}' for x, y in inner) + ' L' + ' L'.join(f'{f(x)},{f(y)}' for x, y in reversed(outer)) + ' Z'
    return d, ' '.join(notches)

def horse_defs(p='h'):
    """Gradients + clay texture filter for the horse. p = id prefix."""
    return f'''<linearGradient id="{p}H" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DE7D45"/><stop offset=".5" stop-color="#C2602E"/><stop offset="1" stop-color="#8C3918"/></linearGradient>
<linearGradient id="{p}Hd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A9532A"/><stop offset="1" stop-color="#6A2A11"/></linearGradient>
<linearGradient id="{p}V" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DC7A43"/><stop offset=".55" stop-color="#C05E2E"/><stop offset="1" stop-color="#8B3918"/></linearGradient>
<filter id="{p}Tex" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .42  0 0 0 0 .18  0 0 0 0 .07  0 0 0 -3.2 1.42" result="sp"/><feComposite in="sp" in2="SourceGraphic" operator="in" result="spi"/><feBlend in="spi" in2="SourceGraphic" mode="multiply"/></filter>'''


def horse_body(p='h', incise=True):
    """The horse in local coords (viewBox 0 -30 420 640), facing left. Feet at y≈596."""
    H, Hd, V = f'url(#{p}H)', f'url(#{p}Hd)', f'url(#{p}V)'
    s = [f'<g filter="url(#{p}Tex)">']
    s += [f'<rect x="96" y="404" width="30" height="186" rx="14" fill="{Hd}"/>',
          f'<rect x="284" y="404" width="30" height="186" rx="14" fill="{Hd}"/>',
          f'<rect x="130" y="408" width="36" height="188" rx="16" fill="{H}"/>',
          f'<rect x="320" y="408" width="36" height="188" rx="16" fill="{H}"/>',
          f'<path d="M356,350 C390,334 410,298 404,252 C382,262 360,294 348,334 Z" fill="{H}"/>',
          f'<rect x="78" y="316" width="298" height="126" rx="63" fill="{V}"/>',
          f'<path d="M64,388 C60,300 66,206 80,126 L150,118 C156,206 168,300 186,372 Z" fill="{H}"/>',
          f'<path d="{_mane()[0]}" fill="{Hd}"/>',
          f'<path d="M106,76 C92,42 96,8 110,-16 C124,8 130,42 120,78 Z" fill="{Hd}"/>',
          f'<path d="M124,72 C118,36 128,2 146,-22 C158,4 156,42 140,76 Z" fill="{H}"/>',
          f'<path d="M156,112 C156,78 130,58 100,62 C72,66 52,92 40,124 C30,150 18,182 16,198 C15,210 24,216 36,212 C52,206 64,196 78,182 C98,162 122,150 146,146 C154,138 156,126 156,112 Z" fill="{V}"/>']
    s.append('</g>')
    if incise:
        lines = []
        lines += ['M68,112 C78,103 92,103 102,112 C92,119 78,119 68,112 Z', 'M22,200 C32,203 44,199 55,190', 'M60,90 C72,118 92,136 116,146']
        lines += ['M74,200 Q115,209 154,199', 'M71,233 Q115,242 158,231', 'M69,268 Q116,277 163,266', 'M67,301 Q117,310 166,298', 'M67,337 Q120,346 173,334']
        # zigzags between bands 2-3 and 4-5
        zz = 'M74,256' + ''.join(' l6,-7 l6,7' for _ in range(7))
        zz2 = 'M72,323' + ''.join(' l6,-7 l6,7' for _ in range(8))
        lines += [zz, zz2]
        # garland scallops at neck base
        lines.append('M68,358' + ''.join(' q9,13 18,0' for _ in range(6)))
        # saddle cloth with scalloped hem
        lines.append('M192,322 L300,322 Q306,322 306,328 L306,404' + ''.join(' q-10,12 -20,0' for _ in range(6)) + ' L186,328 Q186,322 192,322 Z')
        lines += ['M131,434 L165,434', 'M131,446 L165,446', 'M321,434 L355,434', 'M321,446 L355,446', 'M133,578 L163,578', 'M323,578 L353,578']
        lines.append(_mane()[1])
        lines += ['M114,68 L111,-6', 'M133,64 L143,-12', 'M358,338 C372,318 386,294 396,266']
        dots = []
        for y, x0, x1 in ((216, 80, 150), (284, 76, 158)):
            x = x0
            while x <= x1:
                dots.append((x, y + 3 * math.sin((x - x0) / (x1 - x0) * math.pi)))
                x += 11
        dots += [(77 + 18 * i, 373) for i in range(6)]
        rings = [(216, 362), (246, 362), (276, 362), (344, 372)]
        d = ' '.join(lines)
        s.append(f'<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="{d}" stroke="#F4B184" stroke-width="1.3" opacity=".55" transform="translate(0,1.8)"/><path d="{d}" stroke="#56200C" stroke-width="2.6"/></g>')
        s.append('<g fill="#56200C">' + ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="2.5"/>' for x, y in dots) + '<circle cx="86" cy="112" r="3.6"/></g>')
        s.append('<g fill="none" stroke="#56200C" stroke-width="2.4">' + ''.join(f'<circle cx="{x}" cy="{y}" r="9.5"/>' for x, y in rings) + '</g>')
        s.append('<g fill="#56200C">' + ''.join(f'<circle cx="{x}" cy="{y}" r="3.2"/>' for x, y in rings) + '</g>')
    return ''.join(s)


def horse_flat(color='#B4532A'):
    """Single-colour silhouette (for small marks and tile reliefs), same coords."""
    return (f'<g fill="{color}"><rect x="96" y="404" width="30" height="186" rx="14"/><rect x="284" y="404" width="30" height="186" rx="14"/>'
            '<rect x="130" y="408" width="36" height="188" rx="16"/><rect x="320" y="408" width="36" height="188" rx="16"/>'
            '<path d="M356,350 C390,334 410,298 404,252 C382,262 360,294 348,334 Z"/><rect x="78" y="316" width="298" height="126" rx="63"/>'
            '<path d="M64,388 C60,300 66,206 80,126 L150,118 C156,206 168,300 186,372 Z"/>' + f'<path d="{_mane()[0]}"/>' + '<path d="M106,76 C92,42 96,8 110,-16 C124,8 130,42 120,78 Z"/>'
            '<path d="M124,72 C118,36 128,2 146,-22 C158,4 156,42 140,76 Z"/>'
            '<path d="M156,112 C156,78 130,58 100,62 C72,66 52,92 40,124 C30,150 18,182 16,198 C15,210 24,216 36,212 C52,206 64,196 78,182 C98,162 122,150 146,146 C154,138 156,126 156,112 Z"/></g>')


# ---------------------------------------------------------------- Puja vocabulary
def feather(L, W, angle):
    return (f'<g transform="rotate({angle})"><path d="M0,0 C{f(L*.22)},{f(-W)} {f(L*.72)},{f(-W*1.15)} {f(L)},0 C{f(L*.72)},{f(W*1.15)} {f(L*.22)},{f(W)} 0,0 Z" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="4.5" stroke-linejoin="round"/>'
            f'<path d="M14,0 L{f(L-16)},0" stroke="{KAJAL}" stroke-width="2.6" stroke-linecap="round"/></g>')


def dhak():
    """Dhak drum with its feather plume, local coords ~ (0..560, 0..470)."""
    fe = ''.join(feather(L, 19, a) for a, L in ((-112, 150), (-96, 196), (-80, 228), (-64, 246), (-48, 244), (-32, 226), (-16, 196), (0, 156)))
    lace = '112,168 436,192 112,220 440,240 112,272 440,288 112,324 436,336'
    return (f'<g transform="translate(454,192)">{fe}</g>'
            f'<path d="M86,150 C200,122 336,126 452,160 C472,200 474,322 452,362 C336,396 200,400 86,372 Z" fill="{KAJAL}"/>'
            f'<path d="M110,160 C220,138 330,142 440,170" fill="none" stroke="#3B2A22" stroke-width="10" stroke-linecap="round"/>'
            f'<polyline points="{lace}" fill="none" stroke="{HALDI}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>'
            f'<path d="M446,168 C462,210 462,316 446,356" fill="none" stroke="{HALDI}" stroke-width="7" stroke-linecap="round"/>'
            f'<ellipse cx="86" cy="261" rx="42" ry="113" fill="{SHOLA}" stroke="{KAJAL}" stroke-width="7"/>'
            f'<ellipse cx="86" cy="261" rx="26" ry="86" fill="none" stroke="{KAJAL}" stroke-width="2.5" opacity=".45"/>'
            f'<path d="M122,150 C170,58 384,54 442,160" fill="none" stroke="{KAJAL}" stroke-width="18" stroke-linecap="round"/>'
            f'<path d="M122,150 C170,58 384,54 442,160" fill="none" stroke="{SINDOOR}" stroke-width="9" stroke-linecap="round"/>')


def kash(color=SHOLA, lean=1):
    """Kash-phool stem + soft plume, base at (0,0), ~430 tall. lean = +1 droops right, -1 left."""
    strands = []
    rnd = random.Random(11 if lean > 0 else 5)
    for i in range(15):
        a = -14 + 28 * i / 14 + rnd.uniform(-3, 3) + 7 * lean
        L = rnd.uniform(118, 172); W = rnd.uniform(9, 14); b = lean * rnd.uniform(.3, .55)
        o = rnd.uniform(.86, 1)
        strands.append(f'<path transform="translate(2,-256) rotate({f(a)})" opacity="{o:.2f}" d="M0,0 C{f(-W)},{f(-L*.3)} {f(b*L*.22-W*.8)},{f(-L*.72)} {f(b*L*.38)},{f(-L)} C{f(b*L*.22+W*.8)},{f(-L*.72)} {f(W)},{f(-L*.3)} 0,0 Z"/>')
    return (f'<path d="M0,0 C{-4*lean},-90 {6*lean},-180 2,-262" stroke="{color}" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
            f'<g fill="{color}">{"".join(strands)}</g>')


def shiuli(x, y, s=1, rot=0):
    pet = ''.join(f'<ellipse cx="0" cy="-8" rx="4.4" ry="8" transform="rotate({a})"/>' for a in (0, 60, 120, 180, 240, 300))
    return (f'<g transform="translate({f(x)},{f(y)}) rotate({rot}) scale({s})"><g fill="{SHOLA}">{pet}</g>'
            f'<path d="M0,0 L9,11" stroke="#F08A1C" stroke-width="3.2" stroke-linecap="round"/><circle r="3.4" fill="#F08A1C"/></g>')


def joba(fill='#E8261E', stroke=KAJAL, center=HALDI):
    """Hibiscus, centred at 0,0, radius ~100."""
    petal = 'M0,0 C-28,-16 -50,-56 -34,-84 C-22,-102 -6,-92 0,-100 C6,-92 22,-102 34,-84 C50,-56 28,-16 0,0 Z'
    pets = ''.join(f'<path d="{petal}" transform="rotate({a})" fill="{fill}" stroke="{stroke}" stroke-width="4" stroke-linejoin="round"/>' for a in (0, 72, 144, 216, 288))
    veins = ''.join(f'<path d="M0,-10 L0,-70" transform="rotate({a})" stroke="{stroke}" stroke-width="2" opacity=".55"/>' for a in (0, 72, 144, 216, 288))
    stamen = (f'<path d="M0,0 C10,-26 28,-56 50,-78" stroke="{center}" stroke-width="6" fill="none" stroke-linecap="round"/>'
              + ''.join(f'<circle cx="{x}" cy="{y}" r="4.2" fill="{center}" stroke="{stroke}" stroke-width="1.6"/>' for x, y in ((50, -84), (58, -76), (44, -92), (60, -88))))
    return pets + veins + f'<circle r="11" fill="{stroke}"/>' + stamen


def wheel(rim=KAJAL, accent=SINDOOR, r=86):
    spokes = ''.join(f'<path d="M0,-18 L0,{-r+10}" transform="rotate({a})" stroke="{rim}" stroke-width="7" stroke-linecap="round"/>' for a in range(0, 360, 30))
    studs = ''.join(f'<circle cx="0" cy="{-r}" r="5.5" transform="rotate({a+15})" fill="{accent}"/>' for a in range(0, 360, 30))
    return (f'<circle r="{r}" fill="none" stroke="{rim}" stroke-width="16"/>{spokes}<circle r="22" fill="{accent}" stroke="{rim}" stroke-width="7"/>'
            f'<circle r="{r+14}" fill="none" stroke="{rim}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>{studs}')


# ---------------------------------------------------------------- fine line art (gold on dark / paper on dark)
def trishul(sw=2):
    return (f'<g fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">'
            '<path d="M100,410 L100,118"/><path d="M100,34 C114,60 116,92 100,120 C84,92 86,60 100,34 Z"/>'
            '<path d="M94,152 C62,150 44,124 46,92 L54,52 C56,80 66,102 92,114"/>'
            '<path d="M106,152 C138,150 156,124 154,92 L146,52 C144,80 134,102 108,114"/>'
            '<path d="M80,150 L120,150"/><path d="M76,194 L124,194 L100,221 Z"/><path d="M76,248 L124,248 L100,221 Z"/>'
            '<path d="M100,221 C116,228 124,240 120,256"/><circle cx="120" cy="260" r="4"/></g>')


def bansuri(sw=2):
    barbs = []
    # quill: from (150,410) curving to (176,176)
    for i in range(18):
        t = i / 17
        x = 150 + 26 * t ** 1.3; y = 404 - 230 * t
        L = 14 + 34 * math.sin(math.pi * min(1, t * 1.1))
        barbs.append(f'M{f(x)},{f(y)} l{f(-L*.8)},{f(-L*.55)}')
        barbs.append(f'M{f(x)},{f(y)} l{f(L*.8)},{f(-L*.55)}')
    holes = ''.join(f'<circle cx="{f(-80 + 26*i)}" cy="0" r="2.6"/>' for i in range(6))
    return (f'<g fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">'
            '<path d="M150,410 C152,330 162,250 176,176"/>'
            f'<path d="{" ".join(barbs)}" opacity=".75"/>'
            '<path d="M176,30 C218,62 220,150 176,180 C132,150 134,62 176,30 Z"/><path d="M176,70 C198,88 198,138 176,154 C154,138 154,88 176,70 Z"/>'
            '<ellipse cx="176" cy="116" rx="9" ry="15"/>'
            f'<g transform="translate(150,262) rotate(-26)"><rect x="-132" y="-8" width="264" height="16" rx="8"/>{holes}'
            '<path d="M100,-8 L100,8 M112,-8 L112,8"/></g></g>')


def joba_line(sw=2):
    petal = 'M0,0 C-28,-16 -50,-56 -34,-84 C-22,-102 -6,-92 0,-100 C6,-92 22,-102 34,-84 C50,-56 28,-16 0,0 Z'
    pets = ''.join(f'<path d="{petal}" transform="rotate({a})"/>' for a in (0, 72, 144, 216, 288))
    return (f'<g fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{pets}'
            '<path d="M0,0 C10,-26 28,-56 50,-78"/><circle cx="50" cy="-84" r="4"/><circle cx="60" cy="-78" r="4"/><circle cx="44" cy="-93" r="4"/></g>')


# ---------------------------------------------------------------- arati lamp scene pieces
def flame(x, y, h, pid):
    w = h * .36
    return (f'<g class="a-flame" style="animation-delay:{-(x % 7) * .21:.2f}s"><path d="M{f(x)},{f(y)} C{f(x+w)},{f(y-h*.22)} {f(x+w*.7)},{f(y-h*.62)} {f(x)},{f(y-h)} C{f(x-w*.7)},{f(y-h*.62)} {f(x-w)},{f(y-h*.22)} {f(x)},{f(y)} Z" fill="url(#{pid})"/>'
            f'<path d="M{f(x)},{f(y-2)} C{f(x+w*.45)},{f(y-h*.18)} {f(x+w*.3)},{f(y-h*.5)} {f(x)},{f(y-h*.72)} C{f(x-w*.3)},{f(y-h*.5)} {f(x-w*.45)},{f(y-h*.18)} {f(x)},{f(y-2)} Z" fill="#FFFBEA" opacity=".9"/></g>')


def bokeh(seed, n, box, rrange, colors, op=(0.08, 0.3), blur=None):
    rnd = random.Random(seed)
    x0, y0, x1, y1 = box
    out = []
    for i in range(n):
        x = rnd.uniform(x0, x1); y = rnd.uniform(y0, y1); r = rnd.uniform(*rrange)
        c = rnd.choice(colors); o = rnd.uniform(*op)
        out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{c}" opacity="{o:.2f}"/>')
    g = ''.join(out)
    return f'<g filter="url(#{blur})">{g}</g>' if blur else g


# ---------------------------------------------------------------- terracotta tile wall
def tile_pattern(pid='tile', size=132):
    """A 2x2 super-tile pattern: rosette, lotus, horse, rings. Relief via offset shadow/highlight copies."""
    s = size
    j = 6  # joint
    def relief(shape, cx, cy, sc=1):
        t = f'translate({f(cx)},{f(cy)}) scale({sc})'
        return (f'<g transform="translate(2.2,2.6)"><g transform="{t}" fill="#6B2A10" opacity=".55">{shape}</g></g>'
                f'<g transform="translate(-1.4,-1.6)"><g transform="{t}" fill="#F1A774" opacity=".5">{shape}</g></g>'
                f'<g transform="{t}" fill="#BA5A2C">{shape}</g>')
    ros = ''.join(f'<ellipse cx="0" cy="-22" rx="8" ry="20" transform="rotate({a})"/>' for a in range(0, 360, 45)) + '<circle r="9"/>'
    lotus = ('<path d="M0,26 C-10,6 -10,-16 0,-34 C10,-16 10,6 0,26 Z"/><path d="M0,26 C-20,14 -30,-6 -30,-26 C-16,-18 -6,-4 0,22 Z"/>'
             '<path d="M0,26 C20,14 30,-6 30,-26 C16,-18 6,-4 0,22 Z"/><path d="M-34,30 L34,30 L28,38 L-28,38 Z"/>')
    rings = '<path d="M0,-40 A40,40 0 1 1 -0.1,-40 Z M0,-28 A28,28 0 1 0 0.1,-28 Z"/><circle r="14"/>'
    hz = f'<g transform="translate(-44,-66) scale(.21)">{horse_flat("inherit")}</g>'
    cells = [(ros, 0, 0, 1), (lotus, 1, 0, 1), (hz, 0, 1, 1), (rings, 1, 1, 1)]
    body = []
    for shape, cx, cy, sc in cells:
        x = cx * s; y = cy * s
        body.append(f'<rect x="{x+j/2}" y="{y+j/2}" width="{s-j}" height="{s-j}" rx="3" fill="#B4532A"/>')
        body.append(f'<rect x="{x+j/2+6}" y="{y+j/2+6}" width="{s-j-12}" height="{s-j-12}" rx="2" fill="none" stroke="#8E3B19" stroke-width="2" opacity=".7"/>')
        body.append(relief(shape, x + s / 2, y + s / 2, sc))
    return (f'<pattern id="{pid}" width="{2*s}" height="{2*s}" patternUnits="userSpaceOnUse">'
            f'<rect width="{2*s}" height="{2*s}" fill="#7A3215"/>{"".join(body)}</pattern>')
