#!/usr/bin/env python3
"""Measure Bengali display words in Anek Bangla 800, 75% width (the headline style), at 100px.
    python3 tools/measure_titles.py দর্শন "আমাদের কথা"
adv = width in em (use as --w / w), a = rise above the baseline in em, d = drop below it. B = baseline position in a 1em line."""
import asyncio, json
from playwright.async_api import async_playwright
import os
GF = 'file://' + os.environ.get('FONT_DIR', os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'tools', 'fonts')) + '/'
import sys
WORDS = sys.argv[1:] or ["দর্শন"]
HTML = f"""<!doctype html><meta charset=utf-8><style>
@font-face{{font-family:'Anek Bangla';font-weight:100 800;font-stretch:75% 125%;src:url({GF}anekbangla/AnekBangla%5Bwdth,wght%5D.ttf)}}
.t{{font-family:'Anek Bangla';font-weight:800;font-stretch:75%;font-size:100px;line-height:1;white-space:nowrap}}
</style><div class=t id=probe>পুজো<span id=b style="display:inline-block;width:1px;height:0;vertical-align:baseline"></span></div>"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        import tempfile, os; tmp = os.path.join(tempfile.gettempdir(), f'_measure_{os.getpid()}.html'); open(tmp, 'w', encoding='utf-8').write(HTML); await pg.goto('file://' + tmp); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
        await pg.evaluate("document.fonts.load(\"800 100px 'Anek Bangla'\")")
        res = await pg.evaluate("""(words) => {
          const c = document.createElement('canvas').getContext('2d');
          c.fontStretch = 'condensed'; c.font = "800 100px 'Anek Bangla'";
          const probe = document.getElementById('probe'), bEl = document.getElementById('b');
          const B = (bEl.getBoundingClientRect().top - probe.getBoundingClientRect().top) / 100;
          const out = {B};
          for (const w of words) { const s = document.createElement('span'); s.className='t'; s.style.display='inline-block'; s.textContent=w; document.body.appendChild(s);
            const adv = s.getBoundingClientRect().width/100; const m = c.measureText(w);
            out[w] = {adv: +adv.toFixed(4), ink: +((m.actualBoundingBoxRight + m.actualBoundingBoxLeft)/100).toFixed(4), a: +(m.actualBoundingBoxAscent/100).toFixed(4), d: +(m.actualBoundingBoxDescent/100).toFixed(4), cw: +(m.width/100).toFixed(4)}; }
          return out; }""", WORDS)
        print(json.dumps(res, ensure_ascii=False, indent=0))
        await b.close()
asyncio.run(main())
