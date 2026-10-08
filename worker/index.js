/**
 * tridharamandir.com on Cloudflare Workers.
 *
 * Every request comes here first (assets.run_worker_first in wrangler.jsonc):
 *   1. www.tridharamandir.com → tridharamandir.com (the zone's redirect rule usually does this before we see it).
 *   2. Old website addresses → the matching new page (301), from content/site.json → redirects.
 *   3. POST /api/form → checks the form and emails it to the mandir through ZeptoMail.
 *   4. A form posted without JavaScript (a POST to a page) → the same email, then a plain thank-you page.
 *   5. Everything else → the static site in dist/site (env.ASSETS), with security and cache headers.
 *
 * Secrets (set on the Worker in Cloudflare, never in this repository):
 *   ZEPTOMAIL_API_KEY     the ZeptoMail "Send Mail" token (with or without the "Zoho-enczapikey " prefix)
 *   ZEPTOMAIL_FROM_EMAIL  a sender address on a domain verified in ZeptoMail
 *   ZEPTOMAIL_FROM_NAME   the sender name (optional)
 *   ZEPTOMAIL_TO_EMAIL    where the forms go; several addresses may be separated by commas (default: the site's email)
 *
 * worker-data.js is written by build.py (redirects, the forms on the pages, contact details), so run the build first.
 */
import DATA from '../dist/worker-data.js';

const ZEPTO_URL = 'https://api.zeptomail.in/v1.1/email';
const MAX_BODY = 24 * 1024;          // bytes; the biggest real form is about 2 KB
const MAX_LINES = 60;
const MAX_LINE = 2000;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      return await route(request, env, url);
    } catch (err) {
      console.error('worker error', request.method, url.pathname, (err && err.stack) || err);
      if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'server' }, 500);
      try {
        return withHeaders(await env.ASSETS.fetch(request), url);
      } catch (e) {
        return new Response('Something went wrong. Please try again in a moment.', { status: 500 });
      }
    }
  },
};

async function route(request, env, url) {
  const method = request.method;

  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4);
    return redirect(url.toString());
  }

  if (url.pathname === '/api/form') {
    if (method !== 'POST') return json({ ok: false, error: 'method' }, 405, { Allow: 'POST' });
    return apiForm(request, env, url);
  }
  if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'not_found' }, 404);

  if (method === 'GET' || method === 'HEAD') {
    const target = oldAddress(url.pathname);
    if (target) {
      const to = new URL(target, url.origin);
      if (!to.search && url.search) to.search = url.search;   // keep ?utm_… on old links
      return redirect(to.toString());
    }
    return withHeaders(await env.ASSETS.fetch(request), url);
  }

  if (method === 'POST') return plainForm(request, env, url);
  return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD, POST' } });
}

/* ------------------------------------------------------------------ old addresses */

function oldAddress(pathname) {
  let p = pathname;
  try { p = decodeURIComponent(pathname); } catch (e) { /* keep it encoded */ }
  p = p.toLowerCase();
  if (p.length > 1) p = p.replace(/\/+$/, '') || '/';
  if (has(DATA.redirects, p)) return DATA.redirects[p];
  for (const [prefix, target] of DATA.prefixes) {
    if (p.startsWith(prefix)) return target;
  }
  return null;
}

/* ------------------------------------------------------------------ forms */

// POST /api/form with JSON from src/js/40-forms.js:
// { form, subject, page, lines: ["Label: value", …], reply_to, name, _hp }
async function apiForm(request, env, url) {
  if (!sameOrigin(request, url)) return json({ ok: false, error: 'origin' }, 403);
  if (!(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
    return json({ ok: false, error: 'type' }, 415);
  }
  const raw = await readBody(request);
  if (raw === null) return json({ ok: false, error: 'too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch (e) { return json({ ok: false, error: 'json' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false, error: 'json' }, 400);

  if (text(body._hp)) return json({ ok: true });   // a robot filled the hidden field: say thanks, send nothing

  const form = line(body.form, 60);
  if (!has(DATA.forms, form)) return json({ ok: false, error: 'form' }, 400);
  const lines = (Array.isArray(body.lines) ? body.lines : []).slice(0, MAX_LINES).map((l) => text(l, MAX_LINE)).filter(Boolean);
  if (!lines.length) return json({ ok: false, error: 'empty' }, 400);

  const result = await sendMail(env, url, {
    form,
    subject: DATA.forms[form],
    name: line(body.name, 120),
    email: emailOrEmpty(body.reply_to),
    page: pagePath(body.page),
    lines,
  });
  if (result.ok) return json({ ok: true });
  const { ok, status, ...why } = result;
  return json({ ok: false, ...why }, status);
}

// A form posted the old-fashioned way (site.js did not run): every form carries _form and _hp (lib/ui.py honeypot).
async function plainForm(request, env, url) {
  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!type.includes('application/x-www-form-urlencoded') && !type.includes('multipart/form-data')) {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  if (!sameOrigin(request, url)) return notice(403, 'This form can only be sent from the website itself.', url);
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return notice(413, 'That was too long to send. Please email or call the mandir instead.', url);
  let fd;
  try { fd = await request.formData(); } catch (e) { return notice(400, 'That form could not be read. Please try again, or email or call the mandir.', url); }

  const back = pagePath(url.pathname) || '/';
  if (text(fd.get('_hp'))) return notice(200, null, url, back);
  const form = line(fd.get('_form'), 60);
  if (!has(DATA.forms, form)) return notice(400, 'That form could not be read. Please try again, or email or call the mandir.', url, back);

  const lines = [];
  const at = new Map();
  for (const [k, v] of fd.entries()) {
    if (k.startsWith('_') || typeof v !== 'string') continue;
    const val = text(v, MAX_LINE);
    if (!val) continue;
    const label = line(k.replace(/[_-]+/g, ' '), 60).replace(/^./, (c) => c.toUpperCase());
    if (at.has(label)) { lines[at.get(label)] += ', ' + val; continue; }
    at.set(label, lines.length);
    lines.push(label + ': ' + val);
    if (lines.length >= MAX_LINES) break;
  }
  if (!lines.length) return notice(400, 'The form was empty. Please fill it in and send it again.', url, back);
  lines.push('(Sent from a browser where the page script did not run, so the details are exactly as typed.)');

  const result = await sendMail(env, url, {
    form,
    subject: DATA.forms[form],
    name: line(fd.get('name'), 120),
    email: emailOrEmpty(fd.get('email')),
    page: back,
    lines,
  });
  return result.ok ? notice(200, null, url, back) : notice(502, 'failed', url, back);
}

async function sendMail(env, url, m) {
  const key = (env.ZEPTOMAIL_API_KEY || '').trim();
  const from = (env.ZEPTOMAIL_FROM_EMAIL || '').trim();
  if (!key || !from) {
    console.error('form: ZeptoMail is not configured (ZEPTOMAIL_API_KEY / ZEPTOMAIL_FROM_EMAIL missing)');
    return { ok: false, status: 503, error: 'not_configured' };
  }
  const to = (env.ZEPTOMAIL_TO_EMAIL || DATA.contact.email).split(',').map((s) => s.trim()).filter((s) => EMAIL_RE.test(s));
  if (!to.length) return { ok: false, status: 503, error: 'not_configured' };

  const live = url.hostname === DATA.host;
  const when = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  const who = m.name || m.email;
  const subject = line((live ? '' : '[Test] ') + m.subject + (who ? ' · ' + who : ''), 160);
  const pageUrl = url.origin + (m.page || '/');
  const replyLine = m.email
    ? `Reply to this email to answer ${m.name ? m.name + ' (' + m.email + ')' : m.email}.`
    : 'No email address was given, so please use the phone number above to reply.';
  const testLine = live ? '' : `This came from a test copy of the website (${url.hostname}), not from tridharamandir.com.`;

  const textbody = [
    m.subject,
    `From the website, ${when} (India time)`,
    '',
    ...m.lines,
    '',
    replyLine,
    `Page: ${pageUrl}`,
    testLine,
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n').trim();

  const rows = m.lines.map((l) => {
    const i = l.indexOf(': ');
    const k = i > 0 && i < 60 ? l.slice(0, i) : '';
    const v = k ? l.slice(i + 2) : l;
    return `<tr><th style="text-align:left;vertical-align:top;padding:6px 14px 6px 0;color:#5b4a3f;font-weight:600;white-space:nowrap">${esc(k)}</th>`
      + `<td style="padding:6px 0;vertical-align:top">${esc(v).replace(/\n/g, '<br>')}</td></tr>`;
  }).join('');
  const htmlbody = `<div style="font:16px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#16100C;max-width:640px">`
    + `<p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#A8241A">${esc(m.subject)}</p>`
    + `<p style="margin:0 0 16px;color:#5b4a3f">From the website, ${esc(when)} (India time)</p>`
    + (testLine ? `<p style="margin:0 0 16px;padding:8px 12px;background:#F7B519">${esc(testLine)}</p>` : '')
    + `<table style="border-collapse:collapse;font-size:16px">${rows}</table>`
    + `<p style="margin:20px 0 4px">${esc(replyLine)}</p>`
    + `<p style="margin:0;color:#5b4a3f;font-size:14px">Page: <a href="${esc(pageUrl)}">${esc(pageUrl)}</a></p></div>`;

  const payload = {
    from: { address: from, name: (env.ZEPTOMAIL_FROM_NAME || '').trim() || `${DATA.name} website` },
    to: to.map((address) => ({ email_address: { address, name: DATA.name } })),
    subject,
    textbody,
    htmlbody,
  };
  if (m.email) payload.reply_to = [{ address: m.email, name: m.name || m.email }];

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  try {
    const res = await fetch(ZEPTO_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: /^zoho-enczapikey\s/i.test(key) ? key : 'Zoho-enczapikey ' + key,
      },
      body: JSON.stringify(payload),
      signal: ctl.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('form: ZeptoMail refused', m.form, res.status, detail.slice(0, 300));
      // ZeptoMail's own error codes (e.g. TM_4001 / SERR_157), so a failure can be diagnosed from the browser; no secrets in them
      let code = '';
      try {
        const e = JSON.parse(detail).error || {};
        code = [e.code, ...((e.details || []).map((d) => d.code))].filter(Boolean).join(' ').slice(0, 80);
      } catch (e) { /* not JSON */ }
      return { ok: false, status: 502, error: 'mail', mail_status: res.status, mail_code: code };
    }
    console.log('form: sent', m.form, live ? 'live' : url.hostname);
    return { ok: true };
  } catch (err) {
    console.error('form: ZeptoMail unreachable', m.form, String(err));
    return { ok: false, status: 502, error: 'mail_unreachable', mail_code: String((err && err.name) || 'error').slice(0, 40) };
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ small helpers */

function sameOrigin(request, url) {
  const origin = request.headers.get('origin');
  if (!origin) return (request.headers.get('sec-fetch-site') || 'same-origin') !== 'cross-site';
  try { return new URL(origin).host === url.host; } catch (e) { return false; }
}

async function readBody(request) {
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return null;
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_BODY) return null;
  return new TextDecoder().decode(buf);
}

// text: keeps line breaks (messages); line: one line (names, subjects)
function text(v, max = 200) {
  if (typeof v !== 'string') return '';
  return v.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/g, '').trim().slice(0, max);
}
function line(v, max = 200) {
  return text(v, max * 2).replace(/\s+/g, ' ').trim().slice(0, max);
}
function emailOrEmpty(v) {
  const e = line(v, 254);
  return EMAIL_RE.test(e) ? e : '';
}
function pagePath(v) {
  const p = line(v, 200);
  return /^\/(?!\/)[^\s]*$/.test(p) ? p : '';
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra },
  });
}

function redirect(location) {
  return new Response(null, { status: 301, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });
}

function withHeaders(res, url) {
  const out = new Response(res.body, res);
  const h = out.headers;
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('X-Frame-Options', 'SAMEORIGIN');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  h.set('Content-Security-Policy', "base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'");
  if (url.hostname !== DATA.host) h.set('X-Robots-Tag', 'noindex, nofollow');   // preview links stay out of search
  if (out.status === 200 && url.pathname.startsWith('/assets/')) {
    // site.css and site.js are linked with ?v=<build>, so a new build gets new addresses
    h.set('Cache-Control', url.searchParams.has('v') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600');
  }
  return out;
}

// The page a visitor sees after posting a form without JavaScript.
function notice(status, message, url, back = '/') {
  const ok = status === 200;
  const failed = message === 'failed';
  const c = DATA.contact;
  const title = ok ? 'Thank you' : failed ? 'That didn’t go through' : 'Sorry';
  const body = ok
    ? `<p class="bn" lang="bn">ধন্যবাদ</p><h1>Thank you. Your message has gone to the mandir.</h1>
       <p>The seva desk is open 8 AM – 6 PM daily, India time. For anything urgent, call <a href="tel:${esc(c.phone_e164)}">${esc(c.phone)}</a>.</p>`
    : `<h1>${esc(title)}</h1><p>${esc(failed ? 'Your message could not be sent just now.' : message)}</p>
       <p>Please email <a href="mailto:${esc(c.email)}">${esc(c.email)}</a> or call the seva desk on <a href="tel:${esc(c.phone_e164)}">${esc(c.phone)}</a> (8 AM – 6 PM daily).</p>`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(title)} · ${esc(DATA.name)}</title>
<style>body{margin:0;background:#FFF6E6;color:#16100C;font:18px/1.55 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
main{max-width:36rem;margin:0 auto;padding:12vh 20px}h1{font-size:1.6rem;line-height:1.25;margin:0 0 .6em}
.bn{font-size:2.4rem;font-weight:800;color:#A8241A;margin:0 0 .2em}a{color:#A8241A}
.back{display:inline-block;margin-top:1.4em;padding:.7em 1.1em;background:#16100C;color:#FFF6E6;text-decoration:none;font-weight:700}</style></head>
<body><main>${body}<a class="back" href="${esc(back)}">Back to the page</a></main></body></html>`;
  return withHeaders(new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }), url);
}
