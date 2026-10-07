/* The day at the mandir: what's on now, what's next, open or closed. Countdown pills on festival posters. */
(function () {
  'use strict';
  var T = window.TMM, D = T.data;

  /* Where the day stands. kirtan = a kirtan night (Ekadashi, Purnima, Amavasya in site.json tithi_nights):
     the mandir stays open through the night, so after the usual closing and until 5 AM next morning it is 'open late'. */
  T.dayState = function () {
    var d = T.now(), mins = d.getHours() * 60 + d.getMinutes(), wd = d.getDay();
    var close = (wd === 0 || wd === 6) ? D.hours.close_weekend : D.hours.close_weekday;
    var slots = D.schedule.map(function (x) { return [x.start, x.end == null ? close : x.end]; });
    var cur = -1, nxt = -1;
    slots.forEach(function (r, i) { if (cur < 0 && mins >= r[0] && mins < r[1]) cur = i; });
    for (var i = 0; i < slots.length; i++) { if (slots[i][0] > mins) { nxt = i; break; } }
    var tithi = D.tithi || [];
    var y = new Date(d.getTime() - 864e5);
    var kirtanToday = tithi.indexOf(T.iso(d)) >= 0;
    var kirtanLastNight = tithi.indexOf(T.iso(y)) >= 0 && mins < D.hours.open;
    var regular = mins >= D.hours.open && mins < close;
    var late = !regular && ((kirtanToday && mins >= close) || kirtanLastNight);
    return {
      date: d, mins: mins, close: close, slots: slots, cur: cur, nxt: nxt,
      open: regular || late, regular: regular, late: late,
      kirtan: kirtanToday || kirtanLastNight, tithi: kirtanToday || kirtanLastNight
    };
  };

  T.nowLine = function (st) {
    var S = D.schedule;
    if (st.late) return 'Open late tonight · kirtan through the night';
    if (st.cur >= 0) return S[st.cur].en + ' is on now' + (st.kirtan ? ' · kirtan through the night tonight' : '');
    if (st.nxt >= 0) {
      var dd = S[st.nxt].start - st.mins;
      return (st.open ? 'Darshan is open · ' : 'Opens at ' + T.fmt(D.hours.open) + ' · ') + S[st.nxt].en + ' in ' + T.dur(dd);
    }
    return 'Closed for the night · ' + S[0].en + ' at ' + T.fmt(S[0].start);
  };

  T.openText = function (st) {
    if (st.late) return 'Open late tonight · kirtan through the night';
    if (st.open) return st.kirtan ? 'Open now · kirtan through the night tonight' : 'Open now · closes ' + T.fmt(st.close);
    return 'Closed now · opens ' + T.fmt(D.hours.open);
  };

  T.onTick(function () {
    var st = T.dayState(), S = D.schedule;

    /* one-line status */
    T.qsa('[data-live="line"]').forEach(function (el) { el.textContent = T.nowLine(st); });
    T.qsa('[data-live="open"]').forEach(function (el) {
      el.textContent = T.openText(st);
      el.setAttribute('data-open', st.open ? 'yes' : 'no');
    });

    /* schedule tiles */
    var dayOver = st.cur < 0 && st.nxt < 0, earlyMorning = st.mins < D.hours.open;
    T.qsa('[data-slot]').forEach(function (el) {
      var i = +el.getAttribute('data-slot'), r = st.slots[i];
      if (!r) return;
      var isCur = i === st.cur, isNext = (st.cur < 0 && i === st.nxt) || (dayOver && i === 0), past = !earlyMorning && r[1] <= st.mins;
      el.classList.toggle('is-now', isCur);
      el.classList.toggle('is-next', isNext);
      el.classList.toggle('is-past', past && !isCur && !isNext);
      var tag = el.querySelector('[data-slot-tag]');
      if (tag) {
        tag.hidden = !(isCur || isNext);
        tag.innerHTML = isCur ? '<span lang="bn">এখন</span> · Now' : (dayOver ? '<span lang="bn">কাল</span> · Tomorrow' : '<span lang="bn">পরের</span> · Next');
      }
    });

    /* the phone bar in the first screen */
    T.qsa('[data-livebar]').forEach(function (el) {
      var k, name, when;
      if (st.late) { k = 'আজ রাতে'; name = 'Kirtan through the night'; when = 'Open late tonight'; }
      else if (st.cur >= 0) { k = 'এখন'; name = S[st.cur].en; when = 'On now'; }
      else if (st.nxt >= 0) { k = 'আজ'; name = S[st.nxt].en; when = T.fmt(S[st.nxt].start) + ' · in ' + T.dur(S[st.nxt].start - st.mins); }
      else { k = 'কাল'; name = S[0].en; when = T.fmt(S[0].start) + ' tomorrow'; }
      var a = el.querySelector('[data-live-k]'), b = el.querySelector('[data-live-name]'), c = el.querySelector('[data-live-when]');
      if (a) a.textContent = k;
      if (b) b.textContent = name;
      if (c) c.textContent = when;
    });

    /* festival countdown pills */
    T.qsa('[data-days-to]').forEach(function (el) {
      var l = T.daysLabel(el.getAttribute('data-days-to'), el.getAttribute('data-days-end'));
      el.textContent = l.bn;
      el.setAttribute('title', l.en);
      el.hidden = false;
    });
    /* any element that wants a plain number of days: data-count-to="2026-10-16" */
    T.qsa('[data-count-to]').forEach(function (el) {
      var n = T.daysTo(el.getAttribute('data-count-to'));
      el.textContent = el.hasAttribute('data-bn') ? T.bn(Math.max(n, 0)) : String(Math.max(n, 0));
    });
  });
})();
