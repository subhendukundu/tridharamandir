// Checks worker/index.js without Cloudflare: `python3 build.py --site-only && node worker/test.mjs` (or `yarn test`).
// env.ASSETS and ZeptoMail are stand-ins from local.mjs, so nothing is sent anywhere.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from './index.js';
import { assets, fakeMail, SITE } from './local.mjs';

const ENV = { ASSETS: assets(), ZEPTOMAIL_API_KEY: 'Zoho-enczapikey TESTKEY', ZEPTOMAIL_FROM_EMAIL: 'noreply@tridharamandir.com', ZEPTOMAIL_FROM_NAME: 'Tridhara Mandir', ZEPTOMAIL_TO_EMAIL: 'info@tridharamandir.com' };
const LIVE = 'https://tridharamandir.com';
const get = (p, env = ENV, init = {}) => worker.fetch(new Request(p.startsWith('http') ? p : LIVE + p, { redirect: 'manual', ...init }), env);
const post = (p, body, headers = {}, env = ENV) => worker.fetch(new Request(p.startsWith('http') ? p : LIVE + p, {
  method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body),
  headers: { 'Content-Type': 'application/json', Origin: new URL(p.startsWith('http') ? p : LIVE + p).origin, ...headers } }), env);
const seva = { form: 'seva-form', subject: 'Seva request', page: '/seva/', name: 'Ramesh Das', reply_to: 'ramesh@example.com', _hp: '',
  lines: ['Seva: Anna-daan for 80 · ₹1,001', 'Amount: ₹1,001', 'Name: Ramesh Das', 'Phone: +91 98300 00000', 'Email: ramesh@example.com', 'Message: Two lines\nof message'] };

const results = [];
async function test(name, fn) {
  try { await fn(); results.push(['ok', name]); } catch (e) { results.push(['FAIL', name, e]); }
}

await test('home page, with security headers', async () => {
  const r = await get('/');
  assert.equal(r.status, 200);
  assert.match(await r.text(), /<html lang="en">/);
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.match(r.headers.get('content-security-policy'), /frame-ancestors 'self'/);
  assert.equal(r.headers.get('x-robots-tag'), null);
});
await test('every page is served', async () => {
  for (const p of ['/darshan/', '/festivals/', '/durga-puja/', '/seva/', '/visit/', '/about/']) assert.equal((await get(p)).status, 200, p);
});
await test('folder without a slash gets one (asset server)', async () => {
  const r = await get('/darshan');
  assert.equal(r.status, 307);
  assert.equal(r.headers.get('location'), '/darshan/');
});
await test('unknown address shows the 404 page', async () => {
  const r = await get('/no-such-page');
  assert.equal(r.status, 404);
  assert.match(await r.text(), /404/);
});
await test('old addresses redirect (any case, with or without slash, keeping ?utm)', async () => {
  const cases = {
    '/about-us': '/about/', '/About-Us/': '/about/', '/plan-your-visit': '/visit/', '/faqs?utm_source=x': '/visit/?utm_source=x#questions',
    '/services/marriage-and-rituals': '/seva/#rituals', '/services/anything-else': '/seva/', '/gallery/deities/': '/about/',
    '/gallery/some/deep/path': '/about/', '/guides/new-guide': '/visit/', '/volunteer': '/seva/#volunteer', '/events': '/festivals/',
    '/festivals/rath-yatra': '/festivals/#rath', '/icon.png': '/favicon-32.png', '/preview/about': '/about/', '/sitemap': '/sitemap.xml',
  };
  for (const [from, to] of Object.entries(cases)) {
    const r = await get(from);
    assert.equal(r.status, 301, from);
    assert.equal(r.headers.get('location'), LIVE + to, from);
  }
});
await test('new pages are never caught by the old-address list', async () => {
  for (const p of ['/', '/festivals/', '/seva/', '/visit/', '/about/', '/darshan/', '/durga-puja/']) assert.notEqual((await get(p)).status, 301, p);
});
await test('www goes to the bare domain', async () => {
  const r = await get('https://www.tridharamandir.com/seva/?seva=other');
  assert.equal(r.status, 301);
  assert.equal(r.headers.get('location'), 'https://tridharamandir.com/seva/?seva=other');
});
await test('versioned css/js cached for a year, other assets for an hour', async () => {
  assert.match((await get('/assets/site.css?v=abc')).headers.get('cache-control'), /immutable/);
  assert.equal((await get('/assets/site.js')).headers.get('cache-control'), 'public, max-age=3600');
  assert.equal((await get('/assets/nope.css?v=1')).status, 404);
});
await test('preview hosts are kept out of search', async () => {
  const r = await get('https://new-site-tridharamandir.coolbio.workers.dev/');
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');
});
await test('HEAD works', async () => {
  const r = await get('/seva/', ENV, { method: 'HEAD' });
  assert.equal(r.status, 200);
});
await test('build data files are not public', async () => {
  for (const p of ['/.htaccess', '/_redirects', '/.assetsignore', '/worker-data.js']) assert.equal((await get(p)).status, 404, p);
  assert.ok(fs.readFileSync(path.join(SITE, '.assetsignore'), 'utf8').includes('.htaccess'));
});

await test('form: sends one email to the mandir', async () => {
  const m = fakeMail();
  try {
    const r = await post('/api/form', seva);
    assert.equal(r.status, 200);
    assert.deepEqual(await r.json(), { ok: true });
    assert.equal(m.sent.length, 1);
    const { headers, body } = m.sent[0];
    assert.equal(headers.Authorization, 'Zoho-enczapikey TESTKEY');
    assert.deepEqual(body.from, { address: 'noreply@tridharamandir.com', name: 'Tridhara Mandir' });
    assert.equal(body.to[0].email_address.address, 'info@tridharamandir.com');
    assert.deepEqual(body.reply_to, [{ address: 'ramesh@example.com', name: 'Ramesh Das' }]);
    assert.equal(body.subject, 'Seva request · Ramesh Das');
    assert.match(body.textbody, /Seva: Anna-daan for 80 · ₹1,001/);
    assert.match(body.textbody, /Message: Two lines\nof message/);
    assert.match(body.textbody, /Page: https:\/\/tridharamandir.com\/seva\//);
    assert.match(body.htmlbody, /Two lines<br>of message/);
    assert.doesNotMatch(body.htmlbody, /<script/);
  } finally { m.restore(); }
});
await test('form: key without its prefix, several recipients, no email given', async () => {
  const m = fakeMail();
  try {
    const env = { ...ENV, ZEPTOMAIL_API_KEY: 'RAWKEY', ZEPTOMAIL_TO_EMAIL: 'info@tridharamandir.com, seva@example.org', ZEPTOMAIL_FROM_NAME: '' };
    const r = await post('/api/form', { ...seva, reply_to: '', name: '' }, {}, env);
    assert.equal(r.status, 200);
    const { headers, body } = m.sent[0];
    assert.equal(headers.Authorization, 'Zoho-enczapikey RAWKEY');
    for (const k of ['Zoho-enczapikey_RAWKEY', '"Zoho-enczapikey RAWKEY"', ' zoho-enczapikey  RAWKEY\n']) {
      await post('/api/form', seva, {}, { ...env, ZEPTOMAIL_API_KEY: k });
      assert.equal(m.sent[m.sent.length - 1].headers.Authorization, 'Zoho-enczapikey RAWKEY', JSON.stringify(k));
    }
    await post('/api/form', seva, {}, { ...env, ZEPTOMAIL_FROM_EMAIL: 'Tridhara Mandir <noreply@tridharamandir.com>' });
    assert.deepEqual(m.sent[m.sent.length - 1].body.from, { address: 'noreply@tridharamandir.com', name: 'Tridhara Mandir' });
    assert.equal((await post('/api/form', seva, {}, { ...env, ZEPTOMAIL_FROM_EMAIL: 'not an address' })).status, 503);
    assert.equal(body.to.length, 2);
    assert.equal(body.reply_to, undefined);
    assert.equal(body.subject, 'Seva request');
    assert.equal(body.from.name, 'Tridhara Milan Mandir website');
    assert.match(body.textbody, /No email address was given/);
  } finally { m.restore(); }
});
await test('form: HTML in fields is escaped', async () => {
  const m = fakeMail();
  try {
    await post('/api/form', { ...seva, name: '<b>X</b>', lines: ['Message: <script>alert(1)</script>'] });
    assert.doesNotMatch(m.sent[0].body.htmlbody, /<script>/);
    assert.match(m.sent[0].body.htmlbody, /&lt;script&gt;/);
  } finally { m.restore(); }
});
await test('form: from a preview link the email says [Test]', async () => {
  const m = fakeMail();
  try {
    await post('https://abc-tridharamandir.coolbio.workers.dev/api/form', seva);
    assert.match(m.sent[0].body.subject, /^\[Test\] Seva request/);
    assert.match(m.sent[0].body.textbody, /test copy of the website/);
  } finally { m.restore(); }
});
await test('form: robots (hidden field filled) get a thank-you and nothing is sent', async () => {
  const m = fakeMail();
  try {
    const r = await post('/api/form', { ...seva, _hp: 'http://spam' });
    assert.equal(r.status, 200);
    assert.equal(m.sent.length, 0);
  } finally { m.restore(); }
});
await test('form: refuses what is not a real form', async () => {
  const m = fakeMail();
  try {
    assert.equal((await post('/api/form', { ...seva, form: 'nope' })).status, 400);
    assert.equal((await post('/api/form', { ...seva, lines: [] })).status, 400);
    assert.equal((await post('/api/form', { ...seva, lines: 'x' })).status, 400);
    assert.equal((await post('/api/form', '{not json')).status, 400);
    assert.equal((await post('/api/form', '[1,2]')).status, 400);
    assert.equal((await post('/api/form', seva, { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await post('/api/form', seva, { Origin: 'https://evil.example' })).status, 403);
    assert.equal((await post('/api/form', { ...seva, lines: ['x'.repeat(30000)] })).status, 413);
    assert.equal((await get('/api/form')).status, 405);
    assert.equal((await get('/api/contact')).status, 404);
    assert.equal(m.sent.length, 0);
  } finally { m.restore(); }
});
await test('form: when ZeptoMail fails the visitor is told (and gets the summary to send)', async () => {
  for (const status of [500, 'down']) {
    const m = fakeMail(status);
    try {
      const r = await post('/api/form', seva);
      assert.equal(r.status, 502);
      assert.equal((await r.json()).ok, false);
    } finally { m.restore(); }
  }
  const r = await post('/api/form', seva, {}, { ...ENV, ZEPTOMAIL_API_KEY: '' });
  assert.equal(r.status, 503);
});
await test('form without JavaScript: emails it and shows a thank-you page', async () => {
  const m = fakeMail();
  try {
    const body = new URLSearchParams({ seva: 'Anna-daan for 80', amount: '1001', name: 'Mita Pal', phone: '9830000000', email: 'mita@example.com', _hp: '', _form: 'seva-form' });
    const r = await post('/seva/', body.toString(), { 'Content-Type': 'application/x-www-form-urlencoded' });
    assert.equal(r.status, 200);
    assert.match(await r.text(), /Your message has gone to the mandir/);
    assert.equal(m.sent.length, 1);
    assert.equal(m.sent[0].body.subject, 'Seva request · Mita Pal');
    assert.match(m.sent[0].body.textbody, /Amount: 1001/);
    assert.deepEqual(m.sent[0].body.reply_to, [{ address: 'mita@example.com', name: 'Mita Pal' }]);
  } finally { m.restore(); }
});
await test('form without JavaScript: robots and strangers', async () => {
  const m = fakeMail();
  try {
    const f = (o, h = {}) => post('/seva/', new URLSearchParams(o).toString(), { 'Content-Type': 'application/x-www-form-urlencoded', ...h });
    assert.equal((await f({ name: 'x', _hp: 'spam', _form: 'seva-form' })).status, 200);
    assert.equal((await f({ name: 'x', _form: 'other' })).status, 400);
    assert.equal((await f({ name: 'x', _form: 'seva-form' }, { Origin: 'https://evil.example' })).status, 403);
    assert.equal((await post('/seva/', '{}')).status, 405);
    assert.equal(m.sent.length, 0);
  } finally { m.restore(); }
});

for (const [s, name, e] of results) console.log(`${s === 'ok' ? '✓' : '✗'} ${name}${e ? '\n    ' + (e.message || e).toString().split('\n').join('\n    ') : ''}`);
const failed = results.filter((r) => r[0] !== 'ok').length;
console.log(failed ? `\n${failed} of ${results.length} checks failed` : `\nAll ${results.length} checks passed`);
process.exitCode = failed ? 1 : 0;
