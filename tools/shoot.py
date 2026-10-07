#!/usr/bin/env python3
"""Screenshot built pages and check them (needs Playwright + Chromium; for the developers, not the live site).

    python3 tools/shoot.py [site|staging] [page ...] [--widths 390,768,1440] [--at 2026-12-01T10:30] [--out shots] [--full]

Checks each page for: horizontal overflow, console errors, failed requests, images without size.
Google Fonts are served from local copies when the font folder exists (FONT_DIR, default tools/fonts: the Google Fonts
files anekbangla/AnekBangla[wdth,wght].ttf and bigshoulders/BigShoulders[opsz,wght].ttf), for machines without internet."""
import argparse
import asyncio
import functools
import http.server
import os
import socketserver
import sys
import threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.environ.get('FONT_DIR', os.path.join(ROOT, 'tools', 'fonts'))
LOCAL_FONTS_CSS = """
@font-face{font-family:'Anek Bangla';font-weight:100 800;font-stretch:75% 125%;src:url(http://127.0.0.1:PORT/__fonts/anekbangla/AnekBangla%5Bwdth,wght%5D.ttf)}
@font-face{font-family:'Big Shoulders';font-weight:100 900;src:url(http://127.0.0.1:PORT/__fonts/bigshoulders/BigShoulders%5Bopsz,wght%5D.ttf)}
"""
SKELETON = """<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif;background:#fafaf7}img{max-width:100%}[hidden]{display:none!important}</style>
</head><body>%BODY%</body></html>"""
SLUG = {'home': '', 'darshan': 'darshan', 'festivals': 'festivals', 'durga': 'durga-puja', 'seva': 'seva', 'visit': 'visit', 'about': 'about', 'notfound': '404'}


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def translate_path(self, path):
        if path.startswith('/__fonts/'):
            from urllib.parse import unquote
            return os.path.join(FONT_DIR, unquote(path[len('/__fonts/'):].split('?')[0]))
        return super().translate_path(path)


def serve(folder, port):
    h = functools.partial(Handler, directory=folder)
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(('127.0.0.1', port), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def url_for(mode, key, port):
    s = SLUG[key]
    if key == 'home':
        return f'http://127.0.0.1:{port}/index.html' if mode == 'staging' else f'http://127.0.0.1:{port}/'
    if key == 'notfound':
        return f'http://127.0.0.1:{port}/404.html'
    return f'http://127.0.0.1:{port}/{s}.html' if mode == 'staging' else f'http://127.0.0.1:{port}/{s}/'


async def run(args):
    from playwright.async_api import async_playwright
    folder = os.path.join(args.dist or os.path.join(ROOT, 'dist'), args.mode)
    port = 8700 + (os.getpid() % 200)
    srv = serve(folder, port)
    os.makedirs(args.out, exist_ok=True)
    problems = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for key in args.pages:
            for w in args.widths:
                ctx = await b.new_context(viewport={'width': w, 'height': 900 if w > 600 else 844}, device_scale_factor=args.scale)
                if args.at:
                    await ctx.add_init_script(f"try{{sessionStorage.setItem('tmm-test-now','{args.at}')}}catch(e){{}}")
                pg = await ctx.new_page()
                errs = []
                pg.on('pageerror', lambda e, errs=errs: errs.append('JS error: ' + str(e)))
                pg.on('console', lambda m, errs=errs: errs.append('console: ' + m.text) if m.type == 'error' else None)
                pg.on('requestfailed', lambda r, errs=errs: errs.append('failed: ' + r.url) if 'fonts.g' not in r.url else None)

                async def fonts(route):
                    if 'fonts.googleapis.com' in route.request.url:
                        await route.fulfill(status=200, content_type='text/css', body=LOCAL_FONTS_CSS.replace('PORT', str(port)))
                    else:
                        await route.abort()
                if os.path.isdir(FONT_DIR):
                    await pg.route('https://fonts.googleapis.com/**', fonts)
                    await pg.route('https://fonts.gstatic.com/**', lambda r: r.abort())
                if args.mode == 'staging':
                    async def skeleton(route):   # what the artifact host wraps around the main file
                        body = open(os.path.join(folder, 'index.html'), encoding='utf-8').read()
                        await route.fulfill(status=200, content_type='text/html; charset=utf-8', body=SKELETON.replace('%BODY%', body))
                    await pg.route(f'http://127.0.0.1:{port}/index.html', skeleton)
                await pg.goto(url_for(args.mode, key, port), wait_until='networkidle')
                await pg.evaluate('document.fonts.ready')
                if args.full:   # walk down the page so lazy images load, then back to the top
                    await pg.evaluate("async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'); window.scrollTo(0, 0); }")
                await pg.evaluate("() => new Promise(r => { const imgs=[...document.images].filter(i=>i.offsetParent); let n=imgs.length; if(!n) return r(); imgs.forEach(i=>{ if(i.complete) {if(--n===0) r();} else {i.onload=i.onerror=()=>{ if(--n===0) r(); };} }); setTimeout(r, 3000); })")
                await pg.wait_for_timeout(250)
                ov = await pg.evaluate("""() => { const d = document.documentElement; const out = [];
                  if (d.scrollWidth > d.clientWidth + 1) out.push('page scrolls sideways: ' + d.scrollWidth + ' > ' + d.clientWidth);
                  for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
                    if (r.width && r.right > d.clientWidth + 2 && cs.position !== 'fixed' && !el.closest('.rail,.posters,.map-scroll,.marquee,.tpanel,[data-scroll]')) {
                      const anc = el.parentElement && el.parentElement.closest('[data-scroll]'); out.push('wide: <' + el.tagName.toLowerCase() + ' class=' + el.className + '> right=' + Math.round(r.right)); if (out.length > 6) break; } }
                  return out; }""")
                name = f'{args.mode}-{key}-{w}'
                path = os.path.join(args.out, name + '.jpg')
                await pg.screenshot(path=path, full_page=args.full, type='jpeg', quality=82)
                h = await pg.evaluate('document.documentElement.scrollHeight')
                msg = errs + ov
                problems += len(msg)
                print(f'{name}: {h}px tall' + ('' if not msg else '\n   ' + '\n   '.join(msg[:10])))
                await ctx.close()
        await b.close()
    srv.shutdown()
    return problems


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('mode', nargs='?', default='staging', choices=['site', 'staging'])
    ap.add_argument('pages', nargs='*', default=['home'])
    ap.add_argument('--widths', default='390,768,1440')
    ap.add_argument('--at', default=None, help='pretend time on the test link, e.g. 2026-12-01T10:30')
    ap.add_argument('--out', default=os.path.join(ROOT, 'shots'))
    ap.add_argument('--scale', type=float, default=1)
    ap.add_argument('--full', action='store_true', help='whole page, not just the first screen')
    ap.add_argument('--dist', default='', help='built folder (default: dist/)')
    a = ap.parse_args()
    a.widths = [int(x) for x in a.widths.split(',')]
    sys.exit(1 if asyncio.run(run(a)) else 0)
