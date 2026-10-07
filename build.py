#!/usr/bin/env python3
"""Build the website from content/site.json, pages/*.py and src/.

    python3 build.py            # writes dist/site (production, for tridharamandir.com) and dist/staging (the test link)
    python3 build.py --only home,seva --dist /tmp/x   # build some pages into another folder (for parallel work)

Needs only Python 3.8+. No packages to install."""
import hashlib
import importlib
import json
import os
import re
import shutil
import sys
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ROOT)
from lib import ui, shell, art  # noqa: E402

PAGES = ['home', 'darshan', 'festivals', 'durga', 'seva', 'visit', 'about', 'notfound']


def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as fh:
        return fh.read()


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    mode = 'wb' if isinstance(content, bytes) else 'w'
    with open(path, mode, **({} if mode == 'wb' else {'encoding': 'utf-8'})) as fh:
        fh.write(content)


def sources(folder, staging, only=None):
    """CSS or JS files in name order. Files whose name contains 'test' are for the test link only.
    Page files (NN-<page>.css/js) are left out when that page is not being built (--only)."""
    import re
    d = os.path.join(ROOT, 'src', folder)
    names = sorted(n for n in os.listdir(d) if n.endswith('.' + folder))
    out = []
    for n in names:
        if not staging and 'test' in n:
            continue
        m = re.match(r'^\d+-([a-z]+)\.(css|js)$', n)
        if only and m and m.group(1) in PAGES and m.group(1) not in only:
            continue
        out.append((n, read(os.path.join('src', folder, n))))
    return out


def minify_css(css):
    """Small, safe CSS squeeze: comments and extra whitespace out."""
    import re
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};,>])\s*', r'\1', css)
    css = css.replace(';}', '}')
    return css.strip() + '\n'


def load_data():
    data = json.loads(read('content/site.json'))
    h = hashlib.sha1()
    for folder in ('src/css', 'src/js', 'content', 'pages', 'lib'):
        for n in sorted(os.listdir(os.path.join(ROOT, folder))):
            p = os.path.join(ROOT, folder, n)
            if os.path.isfile(p):
                h.update(open(p, 'rb').read())
    data['_build'] = h.hexdigest()[:8]
    return data


def js_data(ctx):
    D = ctx.data
    keep = ('id', 'bn', 'en', 'short_en', 'start', 'end', 'big', 'days', 'date_bn', 'date_en', 'dhara', 'confirm', 'moon')
    return {
        'staging': ctx.staging,
        'site': {k: D['site'][k] for k in ('name_en', 'name_bn', 'domain')},
        'contact': {k: D['contact'][k] for k in ('phone', 'phone_e164', 'email')},
        'hours': {k: D['hours'][k] for k in ('open', 'close_weekday', 'close_weekend')},
        'schedule': D['schedule'],
        'tithi': D['tithi_nights']['dates'],
        'festivals': [{k: f[k] for k in keep if k in f} for f in D['festivals']],
        'forms': {'endpoint': D['forms']['endpoint']},
    }


def out_path(ctx, key):
    slug = ui.SLUGS[key]
    if key == 'home':
        return 'index.html'
    if key == 'notfound':
        return '404.html'
    return f'{slug}.html' if ctx.staging else f'{slug}/index.html'


def redirect_rules(data):
    """(exact, prefixes) from site.json → redirects. Keys ending in * cover everything under them."""
    r = {k: v for k, v in data['redirects'].items() if not k.startswith('_')}
    exact = {k: v for k, v in r.items() if not k.endswith('*')}
    prefixes = sorted(((k[:-1], v) for k, v in r.items() if k.endswith('*')), key=lambda kv: -len(kv[0]))
    return exact, prefixes


def redirects(data):
    """_redirects (Netlify / Cloudflare Pages) and .htaccess (Apache) versions of the redirect list.
    The live site runs on a Cloudflare Worker, which reads worker-data.js instead (see worker_data)."""
    exact, prefixes = redirect_rules(data)
    netlify = ['# Old tridharamandir.com addresses → new pages (Netlify / Cloudflare Pages format)']
    netlify += [f'{old}  {new}  301' for old, new in exact.items()]
    netlify += [f'{old}/  {new}  301' for old, new in exact.items() if old != '/' and '.' not in old.rsplit('/', 1)[-1]]
    netlify += [f'{p}*  {new}  301' for p, new in prefixes]
    ht = ['# Apache / cPanel hosting', 'ErrorDocument 404 /404.html', '<IfModule mod_rewrite.c>', 'RewriteEngine On']
    for old, new in exact.items():
        ht.append(f'RewriteRule ^{re.escape(old.lstrip("/"))}/?$ {new} [R=301,NE,L,NC]')
    for p, new in prefixes:
        ht.append(f'RewriteRule ^{re.escape(p.lstrip("/"))}.* {new} [R=301,NE,L,NC]')
    ht += ['</IfModule>', '<IfModule mod_deflate.c>',
           'AddOutputFilterByType DEFLATE text/html text/css application/javascript text/javascript image/svg+xml application/json text/plain', '</IfModule>',
           '<IfModule mod_expires.c>', 'ExpiresActive On', 'ExpiresByType text/css "access plus 30 days"',
           'ExpiresByType application/javascript "access plus 30 days"', 'ExpiresByType image/svg+xml "access plus 30 days"',
           'ExpiresByType image/png "access plus 30 days"', '</IfModule>']
    return '\n'.join(netlify) + '\n', '\n'.join(ht) + '\n'


def worker_data(data, built):
    """worker-data.js: what the Cloudflare Worker (worker/index.js) needs from the build. Written next to the site folder,
    so it is bundled into the Worker but never served as a file."""
    import html as htmlmod
    from urllib.parse import urlparse
    exact, prefixes = redirect_rules(data)
    forms = {}
    for _key, page in built:
        for m in re.finditer(r'<form\b[^>]*>', page):
            fid = re.search(r'\bdata-form="([^"]+)"', m.group(0))
            if fid:
                subj = re.search(r'\bdata-subject="([^"]*)"', m.group(0))
                forms[fid.group(1)] = htmlmod.unescape(subj.group(1)) if subj else 'Website form'
    out = {
        'host': urlparse(data['site']['domain']).hostname,
        'name': data['site']['name_en'],
        'contact': {k: data['contact'][k] for k in ('phone', 'phone_e164', 'email')},
        'redirects': {(k.rstrip('/') or '/').lower(): v for k, v in exact.items()},
        'prefixes': [[p.lower(), v] for p, v in prefixes],
        'forms': forms,
        'build': data['_build'],
    }
    return ('// Generated by build.py from content/site.json and the built pages. Do not edit; run python3 build.py.\n'
            'export default ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')


def tbc_report(pages_html):
    import re
    lines = ['# Still to confirm before launch', '',
             'Every yellow [MARK] on the site, page by page, with the words just before it. Settle each one in content/site.json or the page file, then rebuild.', '']
    total = 0
    for key, html in pages_html:
        body = html.split('<main', 1)[-1]
        body = re.sub(r'<script[\s\S]*?</script>', ' ', body)
        found = []
        for m in re.finditer(r'<mark class="tbc">\[([^\]]+)\]</mark>', body):
            chunk = body[max(0, m.start() - 600):m.start()]
            chunk = re.sub(r'^[^<]*>', '', chunk)          # drop a tag cut in half at the start
            before = re.sub(r'<[^>]*>', ' ', chunk)
            before = ' '.join(before.split())[-90:]
            found.append(f'- [{m.group(1)}] … {before}')
        if found:
            lines += [f'## {key} ({len(found)})', ''] + found + ['']
            total += len(found)
    lines.insert(2, f'{total} marks in all.')
    return '\n'.join(lines) + '\n'


def build(mode, data, only=None, dist=None):
    out = os.path.join(dist or os.path.join(ROOT, 'dist'), mode)
    if os.path.isdir(out):
        shutil.rmtree(out)
    ctx = ui.Ctx(mode, data)
    built = []
    for key in PAGES:
        if only and key not in only:
            continue
        modname = 'pages.' + key
        try:
            mod = importlib.import_module(modname)
        except ModuleNotFoundError as e:
            if e.name == modname:
                print(f'  (skip {key}: no pages/{key}.py yet)')
                continue
            raise
        ctx.page = key
        main = mod.render(ctx)
        meta = dict(mod.PAGE)
        html = shell.document(ctx, meta, main)
        if not ctx.staging:   # notes for the mandir appear on the test link only
            import re
            html = re.sub(r'<(span|p|div) class="tbc-note">[\s\S]*?</\1>', '', html)
        write(os.path.join(out, out_path(ctx, key)), html)
        built.append((key, html))

    # assets
    css = '\n'.join(f'/* {n} */\n{s}' for n, s in sources('css', ctx.staging, only))
    if not ctx.staging:
        css = minify_css(css)
    write(os.path.join(out, 'assets', 'site.css'), css)
    js = ('window.TMM_DATA = ' + json.dumps(js_data(ctx), ensure_ascii=False) + ';\n'
          + '\n'.join(f'/* {n} */\n{s}' for n, s in sources('js', ctx.staging, only)))
    write(os.path.join(out, 'assets', 'site.js'), js)
    for name, svg in art.common_files().items():
        write(os.path.join(out, 'assets', 'img', name), svg)
    for path, content in ctx.files.items():
        write(os.path.join(out, path), content)
    write(os.path.join(out, 'favicon.svg'), art.ghot_file(False, 64))
    static = os.path.join(ROOT, 'static')
    if os.path.isdir(static):
        for n in os.listdir(static):
            dest = os.path.join(out, 'assets', 'img', n) if n.startswith('share.') else os.path.join(out, n)
            shutil.copyfile(os.path.join(static, n), dest)

    if ctx.staging:
        write(os.path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
    else:
        d = data['site']['domain']
        write(os.path.join(out, 'robots.txt'), f'User-agent: *\nAllow: /\n\nSitemap: {d}/sitemap.xml\n')
        today = date.today().isoformat()
        urls = ''.join(f'<url><loc>{ctx.url(k)}</loc><lastmod>{today}</lastmod></url>' for k, _ in built if k != 'notfound')
        write(os.path.join(out, 'sitemap.xml'), f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n')
        nl, ht = redirects(data)
        write(os.path.join(out, '_redirects'), nl)
        write(os.path.join(out, '.htaccess'), ht)
        # Cloudflare: files the Worker's static-asset upload leaves out, and the data the Worker itself needs
        write(os.path.join(out, '.assetsignore'), '.assetsignore\n.htaccess\n_redirects\n')
        write(os.path.join(dist or os.path.join(ROOT, 'dist'), 'worker-data.js'), worker_data(data, built))
        report = tbc_report(built)
        write(os.path.join(dist or os.path.join(ROOT, 'dist'), 'TO-CONFIRM.md'), report)
        n = report.split('\n')[2].split(' ')[0]
        if n != '0':
            print(f'  NOTE: {n} [CONFIRM]/placeholder marks are still on the pages (see dist/TO-CONFIRM.md). Settle them before going live.')
    print(f'{mode}: {len(built)} pages → {os.path.relpath(out, ROOT)}')
    return built


if __name__ == '__main__':
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', default='', help='comma-separated page keys: ' + ','.join(PAGES))
    ap.add_argument('--dist', default='', help='output folder (default: dist/)')
    ap.add_argument('--site-only', action='store_true', help='build only the production site (what Cloudflare runs)')
    ap.add_argument('--strict', action='store_true', help='fail if any [CONFIRM]/placeholder mark is left on a production page')
    a = ap.parse_args()
    data = load_data()
    for m in (('site',) if a.site_only else ('site', 'staging')):
        built = build(m, data, [k for k in a.only.split(',') if k] or None, a.dist or None)
        if a.strict and m == 'site':
            left = [(k, h.count('<mark class="tbc">')) for k, h in built if '<mark class="tbc">' in h]
            if left:
                sys.exit('STRICT: placeholder marks left on ' + ', '.join(f'{k} ({n})' for k, n in left) + ' (see dist/TO-CONFIRM.md)')
