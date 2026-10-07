/* Tridhara Milan Mandir · shared helpers. TMM_DATA (the facts from content/site.json) is written above this by build.py. */
(function () {
  'use strict';
  var D = window.TMM_DATA || {};
  var T = window.TMM = window.TMM || {};
  T.data = D;
  T.staging = !!D.staging;

  var BN = '০১২৩৪৫৬৭৮৯';
  T.bn = function (n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); };
  T.pad = function (n) { return (n < 10 ? '0' : '') + n; };
  T.qs = function (s, el) { return (el || document).querySelector(s); };
  T.qsa = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* Time at the mandir (India Standard Time). On the test link a pretend time can be set from the Test panel. */
  T.testKey = 'tmm-test-now';
  T.getTest = function () {
    try { var v = window.sessionStorage.getItem(T.testKey); if (v) return v; } catch (e) { /* storage blocked */ }
    return T._test || null;
  };
  T.setTest = function (v) {
    T._test = v || null;
    try { if (v) window.sessionStorage.setItem(T.testKey, v); else window.sessionStorage.removeItem(T.testKey); } catch (e) { /* storage blocked */ }
  };
  T.realNow = function () {
    var n = new Date();
    return new Date(n.getTime() + (n.getTimezoneOffset() + 330) * 60000);
  };
  T.now = function () {
    var t = T.staging ? T.getTest() : null;
    var m = t && /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/.exec(t);
    if (m) return new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]);
    return T.realNow();
  };
  T.iso = function (d) { return d.getFullYear() + '-' + T.pad(d.getMonth() + 1) + '-' + T.pad(d.getDate()); };
  T.dayNum = function (s) { var p = s.split('-'); return Math.round(Date.UTC(+p[0], p[1] - 1, +p[2]) / 864e5); };
  T.today = function () { return T.dayNum(T.iso(T.now())); };
  T.daysTo = function (s) { return T.dayNum(s) - T.today(); };
  T.mins = function () { var d = T.now(); return d.getHours() * 60 + d.getMinutes(); };
  T.fmt = function (m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return (h % 12 || 12) + ':' + T.pad(mm) + (h < 12 ? ' AM' : ' PM'); };
  T.dur = function (d) { var h = Math.floor(d / 60), m = d % 60; return h ? h + ' h' + (m ? ' ' + m + ' min' : '') : m + ' min'; };
  /* smooth scrolling only when the visitor hasn't asked for less motion */
  T.reduced = function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); };
  T.behavior = function () { return T.reduced() ? 'auto' : 'smooth'; };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  T.fmtDate = function (d) { return WD[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); };

  /* festivals */
  T.festivals = D.festivals || [];
  T.fest = function (id) { for (var i = 0; i < T.festivals.length; i++) if (T.festivals[i].id === id) return T.festivals[i]; return null; };
  /* a festival's English name for running text, with a note when its date is not yet confirmed */
  T.festName = function (f) { return f.en.split(' · ')[0] + (f.confirm ? ' (date to be confirmed)' : ''); };
  T.nextBig = function () {
    var t = T.today();
    for (var i = 0; i < T.festivals.length; i++) { var f = T.festivals[i]; if (f.big && T.dayNum(f.start) > t) return f; }
    return null;
  };
  /* days-to label for a festival pill: ১২ দিন · আজ · চলছে · হয়ে গেছে */
  T.daysLabel = function (start, end) {
    var n = T.daysTo(start), e = T.daysTo(end || start);
    if (n > 0) return { bn: T.bn(n) + ' দিন', en: n + (n === 1 ? ' day' : ' days') + ' to go', state: 'coming', n: n };
    if (e >= 0) return n === 0 && e === 0 ? { bn: 'আজ', en: 'Today', state: 'on', n: 0 } : { bn: 'চলছে', en: 'On now', state: 'on', n: 0 };
    return { bn: 'হয়ে গেছে', en: 'Done for this year', state: 'past', n: n };
  };

  /* everything that shows the time registers here; it runs on load, every 30 seconds and when the test time changes */
  var ticks = [];
  T.onTick = function (fn) { ticks.push(fn); };
  T.tick = function () { ticks.forEach(function (fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } }); };

  var pageEl = document.querySelector('.page');
  T.page = pageEl ? pageEl.getAttribute('data-page') : '';
  T.onPage = function (key, fn) { if (T.page === key) fn(); };

  /* a quiet message for screen readers */
  T.say = function (msg) {
    var r = document.getElementById('tmm-live');
    if (!r) { r = document.createElement('div'); r.id = 'tmm-live'; r.className = 'sr-only'; r.setAttribute('aria-live', 'polite'); document.body.appendChild(r); }
    r.textContent = ''; setTimeout(function () { r.textContent = msg; }, 60);
  };
})();
