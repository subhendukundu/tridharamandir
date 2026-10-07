"""404 page: a small poster in the house style. A Bankura horse at a signpost; the signboards are real links.
It is served for every missing address, so every link goes through ctx.href (absolute on the live site)."""
from lib import ui
from lib.ui import esc, btn, section, copy_value
from lib.art import arrow, sun, board_files, SINDOOR, HALDI, SHOLA, KAJAL, PEACOCK_D, ABIR
from lib.motifs import f, horse_defs, horse_body
from pages.seva import art_block

PAGE = dict(key='notfound', title='Page not found',
            description='This page is not on the Tridhara Milan Mandir website. Find darshan times, festivals, seva and the way to Panchmura from here.',
            tone='neel')

WOOD = '#8A4A22'


def board(x, y, w, h, toward, fill):
    """A signboard on the post: an arrow-ended plank with three painted strokes in place of words."""
    t = 30
    if toward == 'left':
        pts = f'{x},{y + h / 2} {x + t},{y} {x + w},{y} {x + w},{y + h} {x + t},{y + h}'
        x0 = x + t + 14
    else:
        pts = f'{x},{y} {x + w - t},{y} {x + w},{y + h / 2} {x + w - t},{y + h} {x},{y + h}'
        x0 = x + 18
    ink = KAJAL if fill in (SHOLA, HALDI) else SHOLA
    strokes = ''.join(f'<path d="M{f(x0)},{f(y + h * k)} L{f(x0 + (w - t - 34) * L)},{f(y + h * k)}" stroke="{ink}" stroke-width="7" stroke-linecap="round" opacity=".8"/>'
                      for k, L in ((.34, .9), (.66, .6)))
    return f'<polygon points="{pts}" fill="{fill}" stroke="{KAJAL}" stroke-width="6" stroke-linejoin="round"/>{strokes}'


def question(x, y, s=1, color=SHOLA):
    return (f'<g transform="translate({f(x)},{f(y)}) scale({s})" fill="none" stroke-linecap="round">'
            f'<path d="M-14,-18 C-14,-38 16,-40 16,-20 C16,-6 0,-6 0,10" stroke="{KAJAL}" stroke-width="16"/>'
            f'<path d="M-14,-18 C-14,-38 16,-40 16,-20 C16,-6 0,-6 0,10" stroke="{color}" stroke-width="8"/>'
            f'<circle cx="0" cy="30" r="8" fill="{color}" stroke="{KAJAL}" stroke-width="4"/></g>')


def hero_shapes(p):
    # the road bends down and leaves the board through its floor before x = 1640, so the strip drawn past the
    # 1440 column (shown on screens wider than 1440 px) carries it on instead of ending it in a cap
    road = 'M640,660 C760,600 900,590 1010,560 C1130,528 1260,526 1380,548 C1470,566 1540,612 1590,690'
    path = (f'<path d="{road}" fill="none" stroke="{KAJAL}" stroke-width="58" stroke-linecap="round"/>'
            f'<path d="{road}" fill="none" stroke="{HALDI}" stroke-width="44" stroke-linecap="round"/>'
            f'<path d="{road}" fill="none" stroke="{KAJAL}" stroke-width="3" stroke-dasharray="14 14"/>')
    post = (f'<rect x="1172" y="168" width="22" height="420" fill="{WOOD}" stroke="{KAJAL}" stroke-width="6"/>'
            f'<circle cx="1183" cy="160" r="16" fill="{HALDI}" stroke="{KAJAL}" stroke-width="6"/>'
            f'<path d="M1150,590 L1216,590" stroke="{KAJAL}" stroke-width="8" stroke-linecap="round"/>')
    boards = (board(990, 196, 196, 58, 'left', SINDOOR) + board(1180, 262, 190, 58, 'right', SHOLA)
              + board(1002, 328, 184, 58, 'left', PEACOCK_D) + board(1180, 394, 170, 58, 'right', ABIR))
    horse = f'<g transform="translate(812,318) scale(.46)">{horse_body(p)}</g>'
    marks = question(902, 262, 1.1) + question(966, 214, .78, HALDI)
    return path + post + boards + horse + marks


def hero(ctx):
    p = 'nfH'
    d, s = sun('nfS', 1080, 330, 250, HALDI, SINDOOR)
    # desktop file: 200 board units past x = 1440, hung off the right of the 1440 column on wider screens (see 62-notfound.css)
    files = board_files('notfound-hero', d + horse_defs(p), s + hero_shapes(p), view=(600, 0, 1040, 620), view_m=(780, 70, 620, 550))
    stk = ui.sticker('৪০৪', 'পাতা নেই', '404 · not found', label='Error 404: page not found', cls='nf-sticker')
    signs = [('home', 'প্রথম পাতা', 'Home', 'back'), ('darshan', 'দর্শন', 'Darshan', ''), ('festivals', 'উৎসব', 'Festivals', ''),
             ('seva', 'সেবা', 'Seva', ''), ('visit', 'আসুন', 'Visit', '')]
    links = ''.join(f'<a class="nf-sign nf-sign--{k}{" nf-sign--back" if back else ""}" href="{esc(ctx.href(k))}">'
                    f'<span class="nf-sign__bn" lang="bn">{b}</span><span class="nf-sign__en">{e}</span></a>' for k, b, e, back in signs)
    extra = (f'<p class="nf-path" data-nf-path hidden>You asked for <code class="nf-path__v" data-nf-path-v></code></p>'
             f'<nav class="nf-signs" aria-label="Where to go from here">{links}</nav>')
    title = '<span class="nf-t">পথ<br class="nf-br"> হারিয়েছেন?</span>'
    out = ui.page_hero(ctx, 'notfound', title, 'This page isn’t here',
                       'The link may be old, or the page has moved. The mandir hasn’t: every signboard below leads back to it.',
                       w=4.99, pt=.13, pa_w=840 / 1440, extra=extra, sr_en='Lost your way? Page not found',
                       sticker_html=art_block(ctx, files, 'nf-art', stk))
    return out.replace('class="phero"', 'class="phero nf-hero"', 1)


def today_band(ctx):
    c = ctx.data['contact']
    h = ctx.data['hours']['lines']
    return section(f'<div class="nf-today"><div class="nf-today__t"><h2 class="nf-today__h" lang="bn" id="nf-today-h">আজ মন্দিরে</h2>'
                   f'<p class="nf-today__en">Today at the mandir</p></div>'
                   f'<div class="nf-today__b"><p class="live"><span class="live__dot" aria-hidden="true"></span><span data-live="line">Darshan every day from 5:00 AM</span></p>'
                   f'<p class="nf-today__hrs">{h[0]} · {h[1]}</p>'
                   f'<p class="nf-today__tell">A broken link brought you here? Tell us: {copy_value(c["email"], href="mailto:" + c["email"])}</p></div>'
                   f'<div class="btns">{btn(ctx, "Plan your darshan" + arrow(16), "darshan", "kajal", cls="btn--sm")}</div></div>',
                   'shola', cls='sec--tight', sid='today', labelledby='nf-today-h')


def render(ctx):
    return hero(ctx) + today_band(ctx)
