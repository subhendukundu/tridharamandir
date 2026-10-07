/* Festival calendar: filter by dhara, "this month" and quieter past months, the next big festival, pill colours.
   The year wheel and the countdown sticker on the first screen are drawn by TMM_FES (the script in the page head). */
(function () {
  'use strict';
  var T = window.TMM;

  T.onPage('festivals', function () {
    var months = T.qsa('[data-fes-month]');
    var fests = T.qsa('[data-fes-fest]');
    var wheel = T.qs('[data-fes-wheel]');
    function short(f) { return f.en.split(' · ')[0]; }

    /* ---------------------------------------------------------------- filter by dhara */
    var bar = T.qs('[data-fes-filter]');
    var chips = bar ? T.qsa('[data-fes-dh]', bar) : [];
    var current = '';
    function filter(dh, say) {
      current = dh;
      chips.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-fes-dh') === dh)); });
      var shown = 0;
      months.forEach(function (m) {
        var n = 0;
        T.qsa('[data-fes-fest]', m).forEach(function (el) {
          var ok = !dh || el.getAttribute('data-dhara') === dh;
          el.hidden = !ok;
          if (ok) n++;
        });
        shown += n;
        var empty = !!dh && n === 0;
        m.classList.toggle('is-empty', empty);
        var body = m.querySelector('[data-fes-body]'), none = m.querySelector('[data-fes-none]');
        if (body) body.hidden = empty;
        if (none) none.hidden = !empty;
      });
      if (wheel) { if (dh) wheel.setAttribute('data-filter', dh); else wheel.removeAttribute('data-filter'); }
      if (say) {
        var b = chips.filter(function (c) { return c.getAttribute('data-fes-dh') === dh; })[0];
        var name = b ? b.querySelector('.fes-chip__en').textContent : '';
        T.say(dh ? 'Showing ' + shown + (shown === 1 ? ' festival: ' : ' festivals: ') + name : 'Showing all ' + shown + ' festivals');
      }
    }
    if (bar && chips.length) {
      bar.hidden = false;
      chips.forEach(function (b) {
        b.addEventListener('click', function () {
          var dh = b.getAttribute('data-fes-dh');
          filter(dh && dh === current ? '' : dh, true);   // pressing the chosen one again shows all
        });
      });
    }
    /* a link to a festival that the filter is hiding (e.g. "Find it in the calendar") shows everything first */
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href*="#"]') : null;
      if (!a || !current) return;
      var id = a.getAttribute('href').split('#')[1], el = id && document.getElementById(id);
      if (el && el.hasAttribute('data-fes-fest') && el.hidden) filter('', false);
    });

    /* ---------------------------------------------------------------- the next big festival (or the one on now) */
    var nextH = document.getElementById('next-h');
    var nextEn = T.qs('[data-fes-next-en]');
    var count = T.qs('[data-fes-count]');
    var variants = T.qsa('[data-fes-next]');
    function pick() {
      for (var i = 0; i < T.festivals.length; i++) {
        var f = T.festivals[i];
        if (f.big && T.daysTo(f.start) <= 0 && T.daysTo(f.end) >= 0) return { f: f, on: true };
      }
      var nb = T.nextBig();
      return nb ? { f: nb, on: false } : null;
    }
    function setCount(num, bnLine, enLine) {
      if (!count) return;
      var n = count.querySelector('.fes-count__n'), b = count.querySelector('.fes-count__bn'), e = count.querySelector('.fes-count__en');
      if (n) n.textContent = num;
      if (b) b.textContent = bnLine;
      if (e) e.textContent = enLine;
    }
    function nextUp() {
      var x = pick(), id = x ? x.f.id : '';
      variants.forEach(function (v) { v.hidden = v.getAttribute('data-fes-next') !== id; });
      if (nextH) nextH.textContent = x && x.on ? 'আজকের পার্বণ' : 'পরের পার্বণ';
      if (nextEn) nextEn.textContent = x ? (x.on ? 'On now' : 'Next up') + ' · ' + short(x.f) + ' ' + x.f.start.slice(0, 4) : 'Next up · the new festival year';
      if (!x) { setCount('✦', 'পরের বছর', 'Dates to come'); return; }
      var f = x.f, l = T.daysLabel(f.start, f.end), days = f.days || [];
      if (!x.on) {
        setCount(T.bn(l.n), 'দিন বাকি', (l.n === 1 ? 'day' : 'days') + ' to ' + (days.length ? days[0].en : T.festName(f)));
        return;
      }
      var iso = T.iso(T.now()), dd = null;
      days.forEach(function (d) { if (d.date === iso) dd = d; });
      var len = T.dayNum(f.end) - T.dayNum(f.start) + 1, k = T.today() - T.dayNum(f.start) + 1;
      if (dd) setCount('আজ', dd.bn, dd.en);
      else if (len > 1) setCount('আজ', f.id === 'durga' ? 'পুজো চলছে' : 'উৎসব চলছে', 'Day ' + k + ' of ' + len);
      else setCount('আজ', f.bn, f.confirm ? 'Today (date to be confirmed)' : 'Today');
    }

    /* ---------------------------------------------------------------- every tick: this month, past months, the wheel */
    T.onTick(function () {
      var t = T.today(), cur = -1;
      months.forEach(function (m, i) {
        if (t >= T.dayNum(m.getAttribute('data-from')) && t <= T.dayNum(m.getAttribute('data-to'))) cur = i;   // the later month wins on overlap
      });
      months.forEach(function (m, i) {
        m.classList.toggle('is-cur', i === cur);
        m.classList.toggle('is-past', t > T.dayNum(m.getAttribute('data-to')));
        var tag = m.querySelector('[data-fes-cur]');
        if (tag) tag.hidden = i !== cur;
      });
      fests.forEach(function (el) { el.classList.toggle('is-done', T.daysTo(el.getAttribute('data-end')) < 0); });
      T.qsa('.fes-pill, .fes-np__pill').forEach(function (p) {
        p.setAttribute('data-state', T.daysLabel(p.getAttribute('data-days-to'), p.getAttribute('data-days-end')).state);
      });
      if (window.TMM_FES) window.TMM_FES.hero(t);
      nextUp();
    });
  });
})();
