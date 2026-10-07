// Run the site and its Worker on your own computer, without Cloudflare and without sending email:
//
//     python3 build.py --site-only && node worker/local.mjs        → http://127.0.0.1:8788
//
// Forms work as on the live site, but the email that would go to the mandir is printed here instead.
// (`yarn dev` does the same with Cloudflare's own wrangler, which needs `yarn install` first.)
// worker/test.mjs uses the two stand-ins below.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITE = path.join(ROOT, 'dist', 'site');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
};

// env.ASSETS: serves a folder the way Workers static assets do with html_handling "auto-trailing-slash" and
// not_found_handling "404-page" (files listed in .assetsignore are left out, as they are on Cloudflare).
export function assets(root = SITE) {
  let ignored = [];
  try { ignored = fs.readFileSync(path.join(root, '.assetsignore'), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean); } catch (e) { /* none */ }
  const file = (p) => {
    const f = path.join(root, p);
    if (!f.startsWith(root + path.sep) || ignored.includes(path.basename(f))) return null;
    return fs.existsSync(f) && fs.statSync(f).isFile() ? f : null;
  };
  const send = (f, status, method) => new Response(method === 'HEAD' ? null : fs.readFileSync(f), {
    status,
    headers: { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'public, max-age=0, must-revalidate' },
  });
  return {
    async fetch(req) {
      const u = new URL(req.url);
      let p;
      try { p = decodeURIComponent(u.pathname); } catch (e) { p = u.pathname; }
      const move = (to) => new Response(null, { status: 307, headers: { Location: to + u.search } });
      if (p.endsWith('/index.html')) return move(p.slice(0, -10));
      if (p.endsWith('/')) {
        const f = file(p + 'index.html');
        if (f) return send(f, 200, req.method);
      } else {
        if (file(p + '/index.html')) return move(p + '/');
        if (p.endsWith('.html') && file(p)) return move(p.slice(0, -5));
        const f = file(p) || file(p + '.html');
        if (f) return send(f, 200, req.method);
      }
      return send(path.join(root, '404.html'), 404, req.method);
    },
  };
}

// Replaces fetch() to ZeptoMail with a fake that records each email. status: 200, an error code such as 500, or 'down'.
export function fakeMail(status = 200, onSend = null) {
  const sent = [];
  const real = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url).startsWith('https://api.zeptomail.in/')) {
      const mail = { url: String(url), headers: init.headers, body: JSON.parse(init.body) };
      sent.push(mail);
      if (onSend) onSend(mail);
      if (status === 'down') throw new Error('network down');
      return new Response(JSON.stringify(status === 200 ? { data: [{ message: 'OK' }] } : { error: { code: 'TEST' } }), { status });
    }
    return real(url, init);
  };
  return { sent, restore: () => { globalThis.fetch = real; } };
}

// node worker/local.mjs [port] [--mail-log file.json] [--mail-fails]
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const port = Number(args.find((a) => /^\d+$/.test(a)) || 8788);
  const logAt = args.indexOf('--mail-log');
  const logFile = logAt >= 0 ? args[logAt + 1] : null;
  if (!fs.existsSync(path.join(ROOT, 'dist', 'worker-data.js'))) {
    console.error('Run python3 build.py --site-only first.');
    process.exit(1);
  }
  const { default: worker } = await import('./index.js');
  const log = [];
  fakeMail(args.includes('--mail-fails') ? 500 : 200, (mail) => {
    log.push(mail.body);
    if (logFile) fs.writeFileSync(logFile, JSON.stringify(log, null, 1));
    console.log(`\n── email to ${mail.body.to.map((t) => t.email_address.address).join(', ')}: ${mail.body.subject}\n${mail.body.textbody}\n──`);
  });
  const env = {
    ASSETS: assets(),
    ZEPTOMAIL_API_KEY: 'local-test', ZEPTOMAIL_FROM_EMAIL: 'noreply@tridharamandir.com',
    ZEPTOMAIL_FROM_NAME: 'Tridhara Milan Mandir website', ZEPTOMAIL_TO_EMAIL: 'info@tridharamandir.com',
  };
  http.createServer(async (req, res) => {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) if (v != null) headers.set(k, Array.isArray(v) ? v.join(', ') : v);
      const request = new Request(`http://${req.headers.host || '127.0.0.1:' + port}${req.url}`, {
        method: req.method, headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks), redirect: 'manual',
      });
      const r = await worker.fetch(request, env);
      const out = {};
      r.headers.forEach((v, k) => { out[k] = v; });
      res.writeHead(r.status, out);
      res.end(r.body ? Buffer.from(await r.arrayBuffer()) : undefined);
    } catch (e) {
      console.error(e);
      res.writeHead(500);
      res.end('local server error');
    }
  }).listen(port, '127.0.0.1', () => console.log(`tridharamandir.com (local) on http://127.0.0.1:${port}/ · forms are printed here, not sent`));
}
