/* Durga Puja page: the countdown sticker, today's day (highlighted and opened), the day sheets, the Sandhi Puja clock
   and what comes next. TMM_DUR (written into the page head by pages/durga.py) works out the state for a date:
   coming (before Shashthi) · on (16–21 Oct) · thanks (the day after Dashami) · after (the page stays as a record). */
(function () {
  'use strict';
  var T = window.TMM;

  T.onPage('durga', function () {
    var R = window.TMM_DUR, root = T.qs('[data-dur-root]');
    if (!R || !root) return;
    var F = T.fest('durga') || { days: [] };
    var cards = T.qsa('[data-dur-day]', root);
    var btns = cards.map(function (c) { return c.querySelector('.dur-day__btn'); });
    var chosen = null;      // the day a visitor opened or closed themselves (null: follow the date)
    var lastSig = '';

    function keyOf(card) { return card.getAttribute('data-dur-day'); }
    function sheetOf(card) { return document.getElementById(card.getAttribute('data-sheet')); }
    function dateOf(iso) { var p = iso.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); }
    function short(iso) { return T.fmtDate(dateOf(iso)).replace(/ \d{4}$/, '').replace(/ /g, '\u00a0'); }   // Fri 16 Oct, kept on one line

    /* ---------------------------------------------------------------- open one day at a time */
    function setOpen(key) {
      cards.forEach(function (c, i) {
        var on = keyOf(c) === key, sh = sheetOf(c);
        c.classList.toggle('dur-day--open', on);
        if (btns[i]) btns[i].setAttribute('aria-expanded', on ? 'true' : 'false');
        if (sh) sh.hidden = !on;
      });
    }
    btns.forEach(function (b, i) {
      if (!b) return;
      b.addEventListener('click', function () {
        chosen = b.getAttribute('aria-expanded') === 'true' ? '' : keyOf(cards[i]);
        setOpen(chosen);
      });
      b.addEventListener('keydown', function (e) {
        var n = btns.length, j = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = n - 1;
        if (j < 0 || !btns[j]) return;
        e.preventDefault();
        btns[j].focus();
      });
    });

    /* ---------------------------------------------------------------- lines that depend on the date */
    function statusLine(m, today) {
      var first = F.days[0] || { en: 'Shashthi', date: F.start };
      if (m.s === 'coming') {
        if (today && today.key === 'mahalaya') return 'Today is Mahalaya · the Puja begins in ' + m.n + (m.n === 1 ? ' day' : ' days');
        if (m.n === 1) return 'Tomorrow: ' + first.en + ', ' + short(first.date);
        return m.n + ' days to go · ' + first.en + ' is on ' + short(first.date);
      }
      if (m.s === 'on') {
        if (!today) return 'Durga Puja is on';
        return 'Today: ' + today.en + (today.repeat ? ', continued' : '') + ' · day ' + today.n + ' of ' + today.of;
      }
      if (m.s === 'thanks') return 'Shubho Bijoya · thank you for celebrating with us';
      var a = dateOf(F.start), z = dateOf(F.end);
      return 'Durga Puja ' + m.y + ' was ' + a.getDate() + '–' + z.getDate() + ' ' + T.fmtDate(z).split(' ')[2] + ' · next year’s dates to come';
    }

    /* now · next · past for the times in today's sheet */
    function liveRows(sheet, live, mins) {
      var rows = T.qsa('[data-start]', sheet), cur = -1, nxt = -1, best = 1e9;
      var span = rows.map(function (r) {
        var a = +r.getAttribute('data-start'), b = r.hasAttribute('data-end') ? +r.getAttribute('data-end') : a;
        return [a, b];
      });
      if (live) {
        span.forEach(function (s, i) { if (cur < 0 && s[1] > s[0] && mins >= s[0] && mins < s[1]) cur = i; });
        if (cur < 0) span.forEach(function (s, i) { if (s[0] > mins && s[0] < best) { best = s[0]; nxt = i; } });
      }
      rows.forEach(function (r, i) {
        var now = i === cur, next = i === nxt, past = live && !now && span[i][1] <= mins;
        r.classList.toggle('dur-row--now', now);
        r.classList.toggle('dur-row--next', next);
        r.classList.toggle('dur-row--past', past);
        var tag = r.querySelector('.dur-row__tag');
        if (tag) {
          tag.hidden = !(now || next);
          var b = document.createElement('span');
          b.lang = 'bn'; b.textContent = now ? 'এখন' : 'পরের';
          tag.textContent = '';
          tag.appendChild(b);
          tag.appendChild(document.createTextNode(now ? ' · Now' : ' · Next'));
        }
      });
    }

    function sandhi(m, mins) {
      var el = T.qs('[data-dur-sandhi]', root);
      if (!el) return;
      var date = el.getAttribute('data-date'), a = +el.getAttribute('data-start'), b = +el.getAttribute('data-end');
      var d = T.daysTo(date), st, bnT, enT;
      /* the time is the Benimadhab Shil panjika's */
      if (d > 1) { st = 'soon'; bnT = T.bn(d) + ' দিন বাকি'; enT = d + ' days to go · ' + el.getAttribute('data-day'); }
      else if (d === 1) { st = 'soon'; bnT = 'কাল সকালে'; enT = 'Tomorrow morning, ' + T.fmt(a) + ' (Benimadhab Shil panjika)'; }
      else if (d === 0 && mins < a) { st = 'soon'; bnT = 'আজ সকালে'; enT = 'Today, in ' + T.dur(a - mins) + ' (Benimadhab Shil panjika)'; }
      else if (d === 0 && mins < b) { st = 'now'; bnT = 'এখন চলছে'; enT = 'On now (Benimadhab Shil panjika)'; }
      else {
        st = 'done'; bnT = 'এ বছরের সন্ধিপূজা হয়ে গেছে';
        enT = d === 0 ? 'Done for this year' : 'Held on ' + el.getAttribute('data-day') + (m.s === 'on' ? '' : ' · next year’s time to come');
      }
      el.setAttribute('data-state', st);
      var x = T.qs('[data-dur-sandhi-bn]', el), y = T.qs('[data-dur-sandhi-en]', el);
      if (x) x.textContent = bnT;
      if (y) y.textContent = enT;
    }

    /* after the Puja: the next two festivals that have a poster, and a line about what is next on the calendar.
       A festival counts as on until its last day (Rath Yatra runs to Ulto Rath). Same words as cal_item() in pages/durga.py. */
    function item(f) {
      var moon = f.moon === 'full' ? ', a full-moon night' : f.moon === 'new' ? ', an Amavasya night' : '';
      return f.en.split(' · ')[0] + (f.start === f.end ? ' on ' : ', ') + f.date_en + (f.confirm ? ' (date to be confirmed)' : '') + moon;
    }
    function list(a) { return a.length > 1 ? a.slice(0, -1).join('; ') + '; and ' + a[a.length - 1] : a[0]; }
    function nextUp() {
      var t = T.today(), end = T.dayNum(F.end), from = Math.max(t, end + 1), cur = [], up = [];
      T.festivals.forEach(function (f) {
        var s = T.dayNum(f.start), e = T.dayNum(f.end || f.start);
        if (f.id === 'durga' || s <= end) return;
        if (s <= t && e >= t) cur.push(f);
        else if (s >= from && s > t) up.push(f);
      });
      var shown = 0;
      T.qsa('[data-dur-next]', root).forEach(function (p) {
        var live = T.dayNum(p.getAttribute('data-end')) >= from;
        p.hidden = !(live && shown < 2);
        if (live && shown < 2) shown++;
      });
      var line = T.qs('[data-dur-next-line]', root);
      if (!line) return;
      var txt = cur.length ? 'On now: ' + list(cur.map(function (f) { return f.en.split(' · ')[0]; })) + '.' : '';
      if (up.length) txt += (txt ? ' Then ' : '') + list(up.slice(0, 3).map(item)) + '.';
      line.textContent = txt || 'Dates for the next festivals are coming soon.';
    }

    /* ---------------------------------------------------------------- every tick (on load, every 30 s, and when the test time changes) */
    T.onTick(function () {
      var m = R.mark(root, R.compute(T.today()));
      var mins = T.mins();
      T.qsa('[data-dur-sticker]', root).forEach(function (el) { R.fill(el, m); });

      var today = null, puja = cards.filter(function (c) { return keyOf(c) !== 'mahalaya'; });
      cards.forEach(function (c) {
        var dates = (c.getAttribute('data-dates') || '').split(' ');
        var isToday = dates.indexOf(m.iso) >= 0;
        var past = (m.s === 'coming' || m.s === 'on') && T.dayNum(dates[dates.length - 1]) < m.t;
        if (isToday) {
          var n = puja.indexOf(c) + 1, name = c.querySelector('.dur-day__en');
          today = { key: keyOf(c), en: name ? name.textContent : '', n: n, of: puja.length, repeat: dates.indexOf(m.iso) > 0 };
        }
        c.classList.toggle('dur-day--today', isToday);
        c.classList.toggle('dur-day--past', past && !isToday);
        var tt = c.querySelector('[data-dur-tag="today"]'), tb = c.querySelector('[data-dur-tag="busy"]');
        if (tt) tt.hidden = !isToday;
        if (tb) tb.hidden = isToday;
        var sh = sheetOf(c), mark = sh && sh.querySelector('.dur-sheet__today');
        if (mark) mark.hidden = !isToday;
        if (sh) liveRows(sh, isToday, mins);
      });

      /* which day is open: the visitor's choice, else today's, else Mahashtami before the Puja */
      var sig = m.s + '|' + m.iso;
      if (sig !== lastSig) { lastSig = sig; chosen = null; }
      var auto = today ? today.key : (m.s === 'coming' ? (root.getAttribute('data-dur-open') || '') : '');
      setOpen(chosen !== null ? chosen : auto);

      var st = T.qs('[data-dur-status]', root);
      if (st) st.textContent = statusLine(m, today);
      var go = T.qs('[data-dur-today-link]', root);
      if (go) go.setAttribute('href', today && m.s === 'on' ? '#dur-day-' + today.key : '#days');

      sandhi(m, mins);
      nextUp();
    });
  });
})();
