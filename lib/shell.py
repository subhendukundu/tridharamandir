"""The document around each page: <head>, header/footer placement, scripts.
Production pages are full HTML documents. On the test link the homepage is the artifact's main file, which the
host wraps in its own <!doctype>/<head>/<body>, so for that one file we write only what goes inside."""
from .ui import esc, header, footer, menu, mark_tbc, json_ld

FONTS = ('https://fonts.googleapis.com/css2?family=Anek+Bangla:wdth,wght@75..100,400..800'
         '&family=Big+Shoulders:opsz,wght@10..72,700..800&display=swap')


def head_tags(ctx, meta):
    s = ctx.data['site']
    if meta['key'] == 'home':   # on the test link the homepage title is also the artifact's name: keep it to the name
        title = s['name_en'] if ctx.staging else meta['title']
    else:
        title = f'{meta["title"]} · {s["name_en"]}, {s["place_en"]}'
    desc = esc(meta['description'])
    out = [f'<title>{esc(title)}</title>', f'<meta name="description" content="{desc}">']
    if ctx.staging:
        out.append('<meta name="robots" content="noindex, nofollow">')
    elif meta['key'] == 'notfound':
        out.append('<meta name="robots" content="noindex">')
    else:
        out.append(f'<link rel="canonical" href="{ctx.url(meta["key"])}">')
    og_img = s['domain'] + '/assets/img/share.jpg'
    if meta['key'] != 'notfound':
        out.append(f'<meta property="og:url" content="{ctx.url(meta["key"])}">')
    out += [f'<meta property="og:type" content="website">', f'<meta property="og:site_name" content="{esc(s["name_en"])}">',
            f'<meta property="og:title" content="{esc(title)}">', f'<meta property="og:description" content="{desc}">',
            f'<meta property="og:image" content="{og_img}">',
            '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">',
            '<meta name="twitter:card" content="summary_large_image">',
            '<meta name="theme-color" content="#16100C">',
            f'<link rel="icon" href="{ctx.asset("favicon.svg")}" type="image/svg+xml">',
            f'<link rel="icon" href="{ctx.asset("favicon-32.png")}" sizes="32x32" type="image/png">',
            f'<link rel="apple-touch-icon" href="{ctx.asset("apple-touch-icon.png")}">',
            '<link rel="preconnect" href="https://fonts.googleapis.com">',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
            f'<link rel="stylesheet" href="{FONTS}">',
            f'<link rel="stylesheet" href="{ctx.asset("assets/site.css")}?v={ctx.data["_build"]}">']
    ga = ctx.data.get('analytics', {}).get('ga4')
    if ga and not ctx.staging:   # Google Analytics, the same property the old site used
        out.append(f'<script async src="https://www.googletagmanager.com/gtag/js?id={ga}"></script>')
        out.append("<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}"
                   f"gtag('js',new Date());gtag('config','{ga}');</script>")
    for obj in meta.get('json_ld', []):
        out.append(json_ld(obj))
    if meta.get('head_script'):
        out.append(f'<script>{meta["head_script"]}</script>')
    return '\n'.join(out)


def body_html(ctx, meta, main):
    key = meta['key']
    tone = f' data-tone="{meta["tone"]}"' if meta.get('tone') else ''
    return (f'<div class="page" data-page="{key}"{tone}>\n<a class="skip" href="#main">Skip to content</a>\n'
            f'{header(ctx, key)}\n<main id="main">\n{main}\n</main>\n{footer(ctx)}\n{menu(ctx, key)}\n</div>\n'
            f'<script src="{ctx.asset("assets/site.js")}?v={ctx.data["_build"]}" defer></script>')


def document(ctx, meta, main):
    """main = the page content inside <main> (it begins with ui.top(...), the coloured first screen)."""
    import re
    # forms are handled by site.js; without it they must never put names or phone numbers in the address bar
    main = re.sub(r'<form\b(?![^>]*\bmethod=)', '<form method="post"', main)
    head = head_tags(ctx, meta)
    body = body_html(ctx, meta, main)
    if ctx.staging and meta['key'] == 'home':
        # the artifact's main file: the host adds doctype, <html>, <head> (charset + viewport) and <body>
        return mark_tbc("<script>document.documentElement.lang='en'</script>\n" + head + '\n' + body + '\n')
    return mark_tbc(f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
{head}
</head>
<body>
{body}
</body>
</html>
''')
