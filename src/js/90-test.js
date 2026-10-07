/* TEST LINK ONLY (not in the production build): a panel to pretend it is another day or time,
   so festival mode, countdowns and opening hours can be checked, and a counter for the items still to confirm. */
(function () {
  'use strict';
  var T = window.TMM;
  if (!T.staging) return;

  var PRESETS = [
    ['Durga Puja · Mahashtami morning', '2026-10-19T07:45'],
    ['Day after Durga Puja (Bijoya)', '2026-10-22T10:00'],
    ['Kali Puja is near', '2026-10-30T18:40'],
    ['Kali Puja night (open late)', '2026-11-08T21:40'],
    ['Between festivals', '2026-12-01T10:30'],
    ['Saturday 9:15 PM', '2026-10-24T21:15'],
    ['Weekday 11 PM (closed)', '2026-12-02T23:00'],
    ['Rath Yatra, day 3', '2027-07-07T12:45'],
    ['Janmashtami in 10 days', '2027-08-15T18:00']
  ];

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  var wrap = h('div', { 'class': 'tpanel' });
  var toggle = h('button', { type: 'button', 'class': 'tpanel__toggle', 'aria-expanded': 'false', 'aria-controls': 'tpanel-box', text: 'Test' });
  var box = h('div', { 'class': 'tpanel__box', id: 'tpanel-box', role: 'dialog', 'aria-label': 'Test this site' });
  box.hidden = true;
  var nowLine = h('p', { 'class': 'tpanel__now' });
  var date = h('input', { type: 'date', id: 'tp-date', 'aria-label': 'Date' });
  var time = h('input', { type: 'time', id: 'tp-time', 'aria-label': 'Time' });
  var apply = h('button', { type: 'button', 'class': 'tpanel__btn', text: 'Apply' });
  var real = h('button', { type: 'button', 'class': 'tpanel__btn tpanel__btn--ghost', text: 'Back to real time' });
  var presets = h('div', { 'class': 'tpanel__presets' });
  PRESETS.forEach(function (p) {
    var b = h('button', { type: 'button', 'class': 'tpanel__chip', text: p[0] });
    b.addEventListener('click', function () { set(p[1]); });
    presets.appendChild(b);
  });
  var tbcCount = h('span', { 'class': 'tpanel__count' });
  var tbcNext = h('button', { type: 'button', 'class': 'tpanel__btn tpanel__btn--ghost', text: 'Show the next one' });
  var close = h('button', { type: 'button', 'class': 'tpanel__x', 'aria-label': 'Close the test panel', text: '×' });

  box.appendChild(h('div', { 'class': 'tpanel__head' }, [h('p', { 'class': 'tpanel__h', text: 'Test this site' }), close]));
  box.appendChild(h('p', { 'class': 'tpanel__p', text: 'Pretend the date and time at the mandir is:' }));
  box.appendChild(h('div', { 'class': 'tpanel__row' }, [date, time, apply]));
  box.appendChild(presets);
  box.appendChild(h('div', { 'class': 'tpanel__row' }, [real]));
  box.appendChild(nowLine);
  box.appendChild(h('hr', { 'class': 'tpanel__hr' }));
  box.appendChild(h('p', { 'class': 'tpanel__h', text: 'Still to confirm on this page' }));
  box.appendChild(h('div', { 'class': 'tpanel__row' }, [tbcCount, tbcNext]));
  box.appendChild(h('p', { 'class': 'tpanel__small', text: 'Yellow marks like [CONFIRM] are facts the mandir still has to check. This panel only appears on the test link.' }));
  wrap.appendChild(box);
  wrap.appendChild(toggle);
  document.body.appendChild(wrap);

  function show(open) {
    box.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
    if (open) refresh();
  }
  toggle.addEventListener('click', function () { show(box.hidden); });
  close.addEventListener('click', function () { show(false); toggle.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) { show(false); toggle.focus(); } });

  function set(v) { T.setTest(v); T.tick(); refresh(); }
  apply.addEventListener('click', function () {
    if (!date.value) { date.focus(); return; }
    set(date.value + 'T' + (time.value || '10:00'));
  });
  real.addEventListener('click', function () { set(null); });

  function refresh() {
    var d = T.now(), test = T.getTest();
    date.value = T.iso(d);
    time.value = T.pad(d.getHours()) + ':' + T.pad(d.getMinutes());
    nowLine.textContent = 'Showing ' + T.fmtDate(d) + ', ' + T.fmt(d.getHours() * 60 + d.getMinutes()) + (test ? ' (pretend)' : ' (real time in India)');
    toggle.textContent = test ? 'Test · pretend time' : 'Test';
    toggle.classList.toggle('is-on', !!test);
    var marks = T.qsa('mark.tbc').filter(function (m) { return m.offsetParent !== null; });
    tbcCount.textContent = marks.length + (marks.length === 1 ? ' item' : ' items');
    tbcNext.disabled = !marks.length;
  }
  var idx = -1;
  tbcNext.addEventListener('click', function () {
    var marks = T.qsa('mark.tbc').filter(function (m) { return m.offsetParent !== null; });
    if (!marks.length) return;
    idx = (idx + 1) % marks.length;
    var m = marks[idx];
    m.scrollIntoView({ behavior: 'smooth', block: 'center' });
    m.classList.remove('tbc--flash'); void m.offsetWidth; m.classList.add('tbc--flash');
    tbcCount.textContent = (idx + 1) + ' of ' + marks.length;
  });
  T.onTick(function () { if (!box.hidden) refresh(); else toggle.textContent = T.getTest() ? 'Test · pretend time' : 'Test'; toggle.classList.toggle('is-on', !!T.getTest()); });
})();
