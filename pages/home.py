"""Homepage: festival mode (six big festivals take the first screen 14 days ahead) or the evergreen screen,
then the day at the mandir, the three dharas, the festival year, seva, visiting, the story and reminders."""
import json
import re
from urllib.parse import quote
from lib import ui
from lib.ui import esc, btn, sec_head, section, sticker, marquee, poster, dhara_poster, seva_card, field, tbc
from lib.art import arrow, icon_trishul, icon_chakra, icon_shankha, icon_play, route_map

PAGE = dict(key='home', title='Tridhara Milan Mandir · Panchmura’s Second Vrindavan',
            description='Tridhara Milan Mandir, Panchmura: Mahadev, Radha-Krishna and Maa Kali in one mandir. '
                        'Darshan daily from 5 AM, free anna-daan prasad, festivals all year.',
            tone=None)

HERO_ORDER = ['evergreen', 'durga', 'kali', 'shivaratri', 'dol', 'rath', 'janmashtami']
SR_EN = {'evergreen': 'Three streams in one ghot', 'durga': 'The Puja is coming', 'durga_on': 'Shubho Sharodiya',
         'durga_thanks': 'Again next year', 'kali': 'Shyama Puja', 'shivaratri': 'Shivaratri', 'dol': 'Dol Yatra',
         'rath': 'Rath Yatra', 'janmashtami': 'Happy Janmashtami'}
BASELINE, GAP = 0.81, 0.06   # where the baseline sits in a 1em line (Anek Bangla); space between the two lines' letters
DAY_MONTH = re.compile(r'(\d) (January|February|March|April|May|June|July|August|September|October|November|December)\b')
NBSP = '\u00a0'   # no-break space


def metrics(m):
    (w1, a1, d1), (w2, a2, d2) = m
    lead = d1 + GAP + a2
    pt = max(0.0, a1 - BASELINE) + .02
    pb = max(0.0, d2 - (1 - BASELINE))
    th = pt + lead + 1 + pb
    under = 1 if w2 > w1 + .3 else 0     # line 2 reaches under the sticker: keep it clear of the circle
    return (f'--w1: {w1}; --wmax: {max(w1, w2)}; --lead: {lead:.3f}; --pt: {pt:.3f}; --pb: {pb:.3f}; --th: {th:.3f}; '
            f'--a2: {a2}; --under: {under};')


def head_script(ctx):
    """Runs in <head> before the page is drawn: picks the first screen for today (India time) and fills its sticker."""
    D = ctx.data
    big = []
    for f in D['festivals']:
        if f.get('big'):
            nm = f.get('short_en', f['en'].split(' · ')[0])
            big.append([f['id'], f['start'], f['end'], nm, f['bn'], [[d['date'], d['bn'], d['en']] for d in f.get('days', [])]])
    tones = {k: v['tone'] for k, v in D['heroes'].items() if not k.startswith('_') and isinstance(v, dict)}
    return ('(function(){var S=' + ('true' if ctx.staging else 'false') + ',BIG=' + json.dumps(big, ensure_ascii=False)
            + ',LEAD=' + str(D['heroes']['lead_days']) + ',TONE=' + json.dumps(tones) + ''';
var BN='০১২৩৪৫৬৭৮৯';function bn(n){return String(n).replace(/\\d/g,function(d){return BN[d]})}
function dn(s){var p=s.split('-');return Math.round(Date.UTC(+p[0],p[1]-1,+p[2])/864e5)}
function iso(t){var d=new Date(t*864e5);return d.getUTCFullYear()+'-'+('0'+(d.getUTCMonth()+1)).slice(-2)+'-'+('0'+d.getUTCDate()).slice(-2)}
function today(){if(S){try{var v=sessionStorage.getItem('tmm-test-now'),m=v&&/^(\\d{4}-\\d\\d-\\d\\d)T/.exec(v);if(m)return dn(m[1])}catch(e){}}
var n=new Date(),d=new Date(n.getTime()+(n.getTimezoneOffset()+330)*6e4);return Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)}
function compute(t){for(var i=0;i<BIG.length;i++){var b=BIG[i],s=dn(b[1]),e=dn(b[2]);
if(t>=s-LEAD&&t<s)return{id:b[0],state:'coming',n:s-t,t:t,f:b};if(t>=s&&t<=e)return{id:b[0],state:'on',day:t-s+1,len:e-s+1,t:t,f:b};
if(t===e+1)return{id:b[0],state:'thanks',t:t,f:b}}return{id:'evergreen',state:'evergreen',t:t}}
function next(t){for(var i=0;i<BIG.length;i++)if(dn(BIG[i][1])>t)return BIG[i];return null}
var H=window.TMM_HERO={mode:null,compute:compute,next:next,
apply:function(t){var m=compute(t==null?today():t),r=document.documentElement;r.setAttribute('data-hero',m.id);r.setAttribute('data-hero-state',m.state);r.setAttribute('data-tone',TONE[m.id]||'shola');H.mode=m;return m},
fill:function(el){var m=H.mode;if(!el||!m||el.getAttribute('data-fest')!==m.id||el.hasAttribute('data-static'))return;
var s=el.children,num,b,e,l;
if(m.state==='evergreen'){var x=next(m.t);if(x){var n=dn(x[1])-m.t;num=bn(n);b='দিন বাকি';e='to '+x[3];l=n+(n===1?' day':' days')+' to '+x[3]}else{num='—';b='পরের উৎসব';e='dates to come';l='Dates for the next festival are coming'}}
else if(m.state==='coming'){num=bn(m.n);b='দিন বাকি';e=m.n===1?'day to go':'days to go';l=m.n+(m.n===1?' day':' days')+' to '+m.f[3]}
else if(m.state==='on'){var dd=null,tt=iso(m.t);m.f[5].forEach(function(d){if(d[0]===tt)dd=d});num='আজ';
if(dd){b=dd[1];e=dd[2];l='Today: '+dd[2]}else if(m.len>1){b='উৎসব চলছে';e='Day '+m.day+' of '+m.len;l=m.f[3]+', day '+m.day+' of '+m.len}else{b=m.f[4];e='Today';l=m.f[3]+' is today'}}
else{num='✦';b='ধন্যবাদ';e='Thank you';l='Thank you for celebrating '+m.f[3]+' with us'}
var isN=/^[০-৯0-9—✦]+$/.test(num);s[0].textContent=num;s[0].className='sticker__num'+(isN?(num.length>2?' sticker__num--3':''):(num.length>3?' sticker__num--word':' sticker__num--short'));
s[1].textContent=b;s[2].textContent=e;s[2].className='sticker__en'+(e.length>12?' sticker__en--long':'');el.setAttribute('aria-label',l)},
eager:function(pic){var m=H.mode,h=pic&&pic.closest('.hero');if(m&&h&&h.getAttribute('data-hero')===m.id){var i=pic.querySelector('img');if(i){i.loading='eager';i.setAttribute('fetchpriority','high')}}}};
H.apply()})();''')


def hero_sticker(hid, fe, static=None):
    if static:
        return ui.sticker(static[0], static[1], static[2], label=static[2], cls='hero__sticker', data=f' data-sticker data-static data-fest="{hid}"')
    if fe:   # fallback before the script runs: the date
        day = fe['date_bn'].split(' ')[0].split('–')[0]
        num, b, e, lab = day, fe['date_bn'].split(' ')[-1], fe['date_en'].split(' 20')[0], fe['en']
    else:
        num, b, e, lab = '✦', 'পরের উৎসব', 'see the calendar', 'Festival calendar'
    s = ui.sticker(num, b, e, label=lab, cls='hero__sticker', data=f' data-sticker data-fest="{hid}"')
    return s + '<script>TMM_HERO.fill(document.currentScript.previousElementSibling)</script>'


def hero_head(hid, lines, m, when, fe, sr, static=None, first=False):
    i = f' id="hero-{hid}-{when.split()[0]}"'
    return (f'<div class="hero__head" data-when="{when}"><div class="hero__headin" style="{metrics(m)}">'
            f'<h1 class="hero__title" lang="bn"{i}><span class="hero__l">{lines[0]}</span><span class="hero__l">{lines[1]}</span>'
            f'<span class="sr-only" lang="en"> · {sr}</span></h1>{hero_sticker(hid, fe, static)}</div></div>')


def sub_html(sub):
    """The line under the headline. A date stays in one piece ("25 August", "16–21 October") and each dot stays with the
    words before it; on wide screens a line with dots breaks only at a dot (each part is a .hero__seg)."""
    parts = [DAY_MONTH.sub('\\1' + NBSP + '\\2', p) for p in sub.split(' · ')]
    if len(parts) == 1:
        return parts[0]
    return (NBSP + '· ').join(f'<span class="hero__seg">{p}</span>' for p in parts)


def hero_copy(ctx, sub, body, ctas, when, extra='', after_sub=''):
    b = ''
    for k, (label, key) in enumerate(ctas):
        b += btn(ctx, label, key, 'tone' if k == 0 else 'ghost')
    return (f'<div class="hero__copy" data-when="{when}"><p class="hero__sub">{sub_html(sub)}{after_sub}</p>'
            f'<p class="hero__body">{body}{extra}</p><div class="btns">{b}</div></div>')


def hero(ctx, hid):
    H = ctx.data['heroes'][hid]
    fe = None if hid == 'evergreen' else ui.festival(ctx, hid)
    art = (f'<picture class="hero__art"><source media="(max-width: 899px)" srcset="{ctx.img("hero-" + hid + "-m.svg")}">'
           f'<img src="{ctx.img("hero-" + hid + ".svg")}" alt="" width="1080" height="836" loading="lazy" decoding="async"></picture>'
           f'<script>TMM_HERO.eager(document.currentScript.previousElementSibling)</script>')
    conf = ' ' + tbc() if H.get('confirm') else ''
    # a festival whose date the mandir has not confirmed says so, as the calendar and the seva form do
    tbd = ' <span class="hero__tbd">(date to be confirmed)</span>' if fe and fe.get('confirm') else ''
    if hid == 'evergreen':
        heads = hero_head(hid, H['lines'], H['m'], 'all', None, SR_EN[hid])
        copy = hero_copy(ctx, H['sub'], H['body'], H['ctas'], 'all')
    else:
        if 'lines_on' in H:
            heads = (hero_head(hid, H['lines'], H['m'], 'coming', fe, SR_EN[hid])
                     + hero_head(hid, H['lines_on'], H['m_on'], 'on', fe, SR_EN[hid + '_on']))
        else:
            heads = hero_head(hid, H['lines'], H['m'], 'coming on' + ('' if 'lines_thanks' in H else ' thanks'), fe, SR_EN[hid])
        if 'lines_thanks' in H:
            heads += hero_head(hid, H['lines_thanks'], H['m_thanks'], 'thanks', fe, SR_EN[hid + '_thanks'], static=H.get('thanks_sticker'))
        copy = (hero_copy(ctx, H['sub'] + conf, H['body'], H['ctas'], 'coming on', after_sub=tbd)
                + hero_copy(ctx, f'Thank you for celebrating {fe["en"].split(" · ")[0]} with us',
                            '<span data-next-big>See what comes next on the festival calendar.</span>',
                            [('See the festival year', 'festivals'), ('Plan your darshan', 'darshan')], 'thanks'))
    return f'<section class="hero" data-hero="{hid}" aria-label="{esc(fe["en"] if fe else "Welcome")}">{heads}{art}{copy}</section>'


def first_screen(ctx):
    livebar = (f'<div class="livebar" data-livebar><p class="livebar__t"><span class="livebar__dot" aria-hidden="true"></span>'
               f'<span><span class="livebar__k" lang="bn" data-live-k>আজ</span> · <span data-live-name>Darshan</span>'
               f'<span class="livebar__when" data-live-when>Every day from 5:00 AM</span></span></p>'
               f'{btn(ctx, "Timings", "darshan#today", "kajal", cls="btn--sm")}</div>')
    return ui.top(''.join(hero(ctx, h) for h in HERO_ORDER) + livebar) + marquee(ctx.data['marquee'], data=' data-marquee="festivals"')


# ---------------------------------------------------------------- the bands below
def today(ctx):
    S = ctx.data['schedule']
    tiles = ''
    for i, s in enumerate(S):
        conf = f'<p class="tile__note">Time {tbc()}</p>' if s.get('confirm') else ''
        tiles += (f'<li class="tile" data-slot="{i}"><span class="tile__tag" data-slot-tag hidden><span lang="bn">এখন</span> · Now</span>'
                  f'<p class="tile__time">{s["time"]}<small>{s["ampm"]}</small></p><p class="tile__bn" lang="bn">{s["bn"]}</p>'
                  f'<p class="tile__en">{s["en"]}</p><p class="tile__note">{s["note"]}</p>{conf}</li>')
    aside = (f'<p class="live"><span class="live__dot" aria-hidden="true"></span><span data-live="line">Darshan every day from 5:00 AM</span></p>'
             + btn(ctx, 'Darshan and arati times' + arrow(16), 'darshan', 'kajal', cls='btn--sm'))
    h = ctx.data['hours']['lines']
    note = (f'<p class="day-note"><span><strong>Darshan</strong> {ui.times(h[0])} · {ui.times(h[1].replace("Sat–Sun 5:00 AM – ", "Sat–Sun till "))}</span>'
            f'<span>Ekadashi, Purnima and Amavasya: kirtan through the night</span></p>')
    return section(sec_head('আজ পাঁচমুড়ায়', 'The day at the mandir', aside, hid='today-h') + f'<ol class="day">{tiles}</ol>' + note,
                   'shola', sid='today', labelledby='today-h')


def dharas(ctx):
    ps = (dhara_poster(ctx, 'shaiva', 'slate', 'মহাদেব', 'Shaiva · stillness', 'Mahadev’s stillness: the Shiva linga and the meditating Shiva.', 'অর্পণ · বেলপাতা ও জল', -1.2)
          + dhara_poster(ctx, 'vaishnava', 'neel', 'রাধাকৃষ্ণ', 'Vaishnava · bhakti', 'Radha-Krishna in the main sanctum, with kirtan and tulsi.', 'অর্পণ · তুলসী ও ফুল', .8)
          + dhara_poster(ctx, 'shakta', 'sindoor', 'মা কালী', 'Shakta · shakti', 'Maa Kali, greeted with ulu at the evening arati.', 'অর্পণ · জবা ফুল', -.6))
    offer_note = ''
    band = (f'<div class="aratiband"><span class="aratiband__icons">{icon_trishul()}{icon_chakra()}{icon_shankha()}</span>'
            f'<span class="aratiband__t"><span class="aratiband__bn" lang="bn">ত্রিশূল, চক্র আর শঙ্খ: তিন ধারা, এক আরতি</span>'
            f'<span class="aratiband__en">Trishul, chakra and shankha meet in the Tridhara Sandhya Arati · 6:30 PM</span></span></div>')
    # Radha-Krishna is in the main sanctum, with shrines for Shiva and Kali: one mandir, not one courtyard (content/CURRENT_SITE_FACTS.md)
    aside = '<p>Mahadev’s stillness, Radha-Krishna’s bhakti and Maa Kali’s shakti, worshipped together in one mandir in Panchmura.</p>'
    return section(sec_head('এক মন্দিরে তিন ধারা', 'Three streams of devotion, one mandir', aside, hid='dharas-h')
                   + f'<div class="rail dharas">{ps}</div>' + band + offer_note, 'haldi', sid='dharas', labelledby='dharas-h')


def festivals(ctx):
    # each poster opens its row in the festival calendar; Durga Puja's opens the Durga Puja page
    ps = ''.join(poster(ctx, k)
                 for k in ('durga', 'lakshmi', 'kali', 'rash', 'saraswati', 'shivaratri', 'dol', 'rath', 'janmashtami'))
    aside = ('<p>The next festivals at the mandir. Tap a poster for its dates.</p>'
             + btn(ctx, 'Full calendar' + arrow(16), 'festivals', 'kajal', cls='btn--sm'))
    return section(sec_head('উৎসবের পাঁজি', '<span lang="bn">বাঙালির বারো মাসে তেরো পার্বণ</span> · The festival year', aside, hid='fest-h')
                   + f'<div class="posters" data-next-posters="6">{ps}</div>', 'paper', sid='utsav', labelledby='fest-h')


SEVA_FORM_IDS = (('annadaan', 'anna-daan', '₹1,001'), ('health', 'health', '₹5,001'), ('scholarship', 'scholarship', '₹11,001'))


def seva_form_link(s):
    """The seva page's form, opened on the seva this card offers (its ids: annadaan, festival, health, monthly, scholarship,
    steward, other). A card matches by its name and amount in content/site.json; one the seva page does not list opens
    "Another seva" with its name and amount filled in."""
    en = s['en'].lower()
    for sid, word, amount in SEVA_FORM_IDS:
        if word in en and s['amount'] == amount:
            return f'seva?seva={sid}#seva-form'
    digits = ''.join(ch for ch in s['amount'] if ch.isdigit())
    return f'seva?seva=other&which={quote(s["en"])}' + (f'&amount={digits}' if digits else '') + '#seva-form'


def seva(ctx):
    P = ctx.data['payment']
    feature = (f'<div class="seva-feature"><p class="seva-feature__n" lang="bn">২০০০+</p>'
               f'<p class="seva-feature__bn" lang="bn">পাত প্রসাদ, প্রতিদিন</p><p class="seva-feature__en">Plates of anna-daan, every single day</p>'
               f'<p class="seva-feature__p">Sattvic, onion-free anna-daan prasad, cooked in terracotta handis and served free to every visitor from 12:30 PM.</p>'
               f'<p class="seva-feature__small">{P["methods"]} · {P["receipt"].lower().replace("receipt", "receipt")} · {P["tax"]}</p></div>')
    cards = ''.join(seva_card(ctx, s, key=seva_form_link(s)) for s in ctx.data['seva_home'])
    head = sec_head('সেবা', 'Seva that feeds, heals and teaches', btn(ctx, 'All seva options' + arrow(16), 'seva', 'haldi', cls='btn--sm'), hid='seva-h')
    note = ui.note('the old website listed seva amounts in three different sets; these three are from its homepage.', 'p')
    return section(head + f'<div class="seva-grid">{feature}<div><div class="seva-cards">{cards}</div>{note}</div></div>', 'kajal', sid='seva', labelledby='seva-h')


def visit(ctx):
    def fact(k, t, d):
        return f'<div class="fact"><p class="fact__k">{k}</p><p class="fact__t">{t}</p><p class="fact__d">{d}</p></div>'
    facts = (fact('By road', '180 km from Kolkata, about 4 hours', 'Darshan is open to all, no booking needed. Limited street parking near the temple.')
             + fact('By train', 'Bishnupur or Bankura Junction', 'Shared trekkers from Bishnupur every 30 minutes, ₹30–40; taxis ₹600–800.')
             + fact('Stay', 'Eight suites, 100 m from the courtyard', 'From ₹3,600 a night · check-in 2 PM · 30% advance to book.')
             + fact('Walk', 'The potters’ lanes of Panchmura', 'A 2 PM craft-village walk to the home of the Bankura horse.'))
    c = ctx.data['contact']
    btns = (f'<div class="btns">{btn(ctx, "Plan your visit" + arrow(16), "visit", "haldi", cls="btn--sm")}'
            f'{btn(ctx, "Open in Maps", c["map_url"], "ghost", cls="btn--sm")}</div>')
    head = sec_head('পাঁচমুড়ায় আসুন', 'Come to Panchmura', '<p>Panchmura’s Second Vrindavan, in the potters’ village of the Bankura horse.</p>', hid='visit-h')
    cap = '<p class="map-cap">Bishnupur to Panchmura: 30 km, about 45 minutes by car.</p><p class="map-hint">Swipe the map to see the whole route.</p>'
    return section(head + f'<div class="visit-grid"><div class="map-panel"><div class="map-scroll">{route_map()}</div>{cap}</div>'
                   f'<div><div class="facts">{facts}</div>{btns}</div></div>', 'peacock', sid='visit', labelledby='visit-h')


def story(ctx):
    steps = [('২০১২', '2012–16', 'Visioning circles', 'The community meets in visioning circles to imagine the mandir.'),
             ('২০১৬', '2016–19', 'The land', 'Trustees acquire the temple plot in Panchmura.'),
             ('২০২০', '2020–21', 'Marble and teak', 'Construction: marble murtis and teak doors.'),
             ('২০২২', '1 Jul 2022', 'Pratishtha', 'Consecrated on Rath Yatra.')]
    tl = ''.join(f'<li class="tl"><span class="tl__y" lang="bn">{y}</span><span class="tl__e">{e}</span><span class="tl__t">{t}</span>'
                 f'<span class="tl__d">{d}</span></li>' for y, e, t, d in steps)
    nums = ''.join(f'<div class="stat"><span class="stat__n" lang="bn">{n}</span><span class="stat__t">{t}</span></div>'
                   for n, t in (('২০০০+', 'plates of prasad a day'), ('১২০+', 'students supported a year'),
                                ('১৫', 'villages reached by health camps'), ('৫', 'years in July 2027')))
    head = sec_head('নব বৃন্দাবন', 'Panchmura’s Second Vrindavan', btn(ctx, 'Read our story' + arrow(16), 'about', 'shola', cls='btn--sm'), hid='story-h')
    return section(head + f'<ol class="timeline">{tl}</ol><div class="stats">{nums}</div>', 'sindoor', sid='story', labelledby='story-h')


def remind(ctx):
    f = field('remind-contact', 'ইমেল', 'Email', 'email', name='email', required=True,
              placeholder='you@example.com', autocomplete='email')
    # a sign-up: its own thank-you, and no seva-desk line under it
    attrs = ui.form_attrs('remind', 'Festival news and seva newsletter', sent='Thank you. You’re on the list for festival news.', sent_note='')
    form = (f'<form class="remind__form form"{attrs}>'
            f'<div class="remind__row">{f}<button class="btn" type="submit">Sign up</button></div>{ui.honeypot("remind")}'
            f'<div class="form-result" data-form-result hidden tabindex="-1"></div></form>')
    return section(f'<div class="remind"><div class="remind__t"><h2 class="remind__h" lang="bn" id="remind-h">উৎসবের আগে খবর পান</h2>'
                   f'<p class="remind__en">Festival news and the seva newsletter, <span class="nowrap">by email</span></p></div>{form}</div>',
                   'haldi', cls='sec--tight', sid='remind-band', labelledby='remind-h')


def json_ld(ctx):
    c, s = ctx.data['contact'], ctx.data['site']
    return [{
        '@context': 'https://schema.org', '@type': 'HinduTemple', 'name': s['name_en'],
        'alternateName': [s['name_bn'], 'Naba Brindaban Temple', 'Panchmura Milan Mandir'],
        'url': s['domain'] + '/', 'telephone': c['phone_e164'], 'email': c['email'],
        'address': {'@type': 'PostalAddress', 'streetAddress': c['street'], 'addressLocality': c['locality'],
                    'addressRegion': c['region'], 'postalCode': c['postcode'], 'addressCountry': c['country']},
        'geo': {'@type': 'GeoCoordinates', 'latitude': c['geo'][0], 'longitude': c['geo'][1]},
        'hasMap': c['map_url'], 'sameAs': [u for _, u in c['social']],
        'openingHoursSpecification': [
            {'@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'opens': '05:00', 'closes': '21:00'},
            {'@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Saturday', 'Sunday'], 'opens': '05:00', 'closes': '21:30'}],
        'publicAccess': True}]


def render(ctx):
    PAGE['head_script'] = head_script(ctx)
    PAGE['json_ld'] = json_ld(ctx)
    return (first_screen(ctx) + today(ctx) + dharas(ctx) + festivals(ctx) + seva(ctx) + visit(ctx) + story(ctx) + remind(ctx))
