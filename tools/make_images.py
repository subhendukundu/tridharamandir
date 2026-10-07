#!/usr/bin/env python3
"""Make the PNG images in static/: favicon-32.png, apple-touch-icon.png (180) and share.jpg (1200 x 630, the picture
WhatsApp/Facebook show when someone shares the site). Needs Playwright + Chromium and the fonts (FONT_DIR). Run once, or when the look changes:
    python3 tools/make_images.py"""
import asyncio
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
from lib import art  # noqa: E402

FONT_DIR = os.environ.get('FONT_DIR', os.path.join(ROOT, 'tools', 'fonts'))
FACES = f"""@font-face{{font-family:'Anek Bangla';font-weight:100 800;font-stretch:75% 125%;src:url(file://{FONT_DIR}/anekbangla/AnekBangla%5Bwdth,wght%5D.ttf)}}
@font-face{{font-family:'Big Shoulders';font-weight:100 900;src:url(file://{FONT_DIR}/bigshoulders/BigShoulders%5Bopsz,wght%5D.ttf)}}"""


def share_html():
    d, s = art.hero_art('evergreen')
    poster = art.svg_doc((640, 60, 840, 840), s, d).replace('<svg ', '<svg style="position:absolute;right:-40px;top:-6px;width:640px;height:640px" ', 1)
    grain = art.grain_tile().replace('<svg ', '<svg style="position:absolute;inset:0;width:1200px;height:630px;opacity:.08" preserveAspectRatio="none" ', 1)
    mark = art.ghot_file(False, 64).replace('<svg ', '<svg style="width:58px;height:58px" ', 1)
    return f"""<!doctype html><meta charset="utf-8"><style>{FACES}
body,p,h1{{margin:0}} .c{{position:relative;width:1200px;height:630px;overflow:hidden;background:#FFF6E6;color:#16100C;font-family:'Anek Bangla'}}
.h{{position:absolute;left:56px;top:132px;margin:0;font-weight:800;font-stretch:75%;font-size:128px;line-height:1;color:#CC3018;text-shadow:5px 5px 0 #16100C}}
.h span{{display:block}} .h span+span{{margin-top:6px}}
.s{{position:absolute;left:60px;top:430px;font-family:'Big Shoulders';font-weight:800;font-size:40px;letter-spacing:.02em;text-transform:uppercase}}
.b{{position:absolute;left:60px;top:480px;font-size:22px;font-weight:500;width:560px;line-height:1.35}}
.n{{position:absolute;left:56px;top:28px;display:flex;align-items:center;gap:14px}}
.n b{{font-size:30px;font-weight:700}} .n i{{display:block;font-style:normal;font-family:'Big Shoulders';font-weight:700;font-size:15px;letter-spacing:.16em;text-transform:uppercase}}
.m{{position:absolute;left:0;right:0;bottom:0;height:44px;background:#16100C;color:#F7B519;display:flex;align-items:center;gap:22px;padding-left:24px;font-weight:700;font-size:21px;white-space:nowrap}}
.m em{{font-style:normal;color:#FFF6E6}}</style>
<div class="c">{grain}{poster}
<div class="n">{mark}<div><b>ত্রিধারা মিলন মন্দির</b><i>Tridhara Milan Mandir · Panchmura</i></div></div>
<h1 class="h"><span>এক ঘটে</span><span>তিন ধারা</span></h1>
<p class="s">Three streams, one mandir</p>
<p class="b">Mahadev, Radha-Krishna and Maa Kali in one courtyard. Darshan every day from 5 AM.</p>
<div class="m"><span>দুর্গাপূজা ১৬–২১ অক্টোবর</span><em>✦</em><span>কালীপূজা ৮ নভেম্বর</span><em>✦</em><span>শিবরাত্রি ৬ মার্চ</span><em>✦</em><span>দোলযাত্রা ২২ মার্চ</span><em>✦</em><span>রথযাত্রা ৫ জুলাই</span></div>
</div>"""


def icon_html(size, pad, bg):
    mark = art.ghot_file(False, size).replace('<svg ', f'<svg style="width:{size - 2 * pad}px;height:{size - 2 * pad}px;margin:{pad}px" ', 1)
    return f'<!doctype html><meta charset="utf-8"><style>body{{margin:0}} div{{width:{size}px;height:{size}px;background:{bg}}}</style><div>{mark}</div>'


async def main():
    from playwright.async_api import async_playwright
    out = os.path.join(ROOT, 'static')
    os.makedirs(out, exist_ok=True)
    tmp = os.path.join(out, '_tmp.html')
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, html, w, h, transparent in (('share.png', share_html(), 1200, 630, False),
                                             ('apple-touch-icon.png', icon_html(180, 18, '#FFF6E6'), 180, 180, False),
                                             ('favicon-32.png', icon_html(32, 0, 'transparent'), 32, 32, True)):
            pg = await b.new_page(viewport={'width': w, 'height': h})
            open(tmp, 'w', encoding='utf-8').write(html)
            await pg.goto('file://' + tmp)
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(300)
            await pg.screenshot(path=os.path.join(out, name), omit_background=transparent, clip={'x': 0, 'y': 0, 'width': w, 'height': h})
            if name == 'share.png':   # WhatsApp wants link pictures under ~300 KB: keep a JPEG
                from PIL import Image
                Image.open(os.path.join(out, name)).convert('RGB').save(os.path.join(out, 'share.jpg'), quality=86, optimize=True, progressive=True)
                os.remove(os.path.join(out, name))
            await pg.close()
            print('wrote static/' + name)
        await b.close()
    os.remove(tmp)


if __name__ == '__main__':
    asyncio.run(main())
