/* Darshan page: the sticker that counts down to the Sandhya Arati, open / closed / open late (kirtan nights, from the
   shared T.dayState and T.openText), today's date and notes (kirtan tonight, every festival on today), and today's row
   on the hours board. The schedule tiles and the status line use the shared data-slot / data-live hooks (10-live.js). */
(function () {
  'use strict';
  var T = window.TMM, D = T.data;
  var WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var BN_MON = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  /* the same size classes as ui.sticker_num_class: numbers fill the sticker, short words less, longer words less again */
  function numClass(num) {
    if (/^[০-৯0-9—✦–+]+$/.test(num)) return num.length > 2 ? ' sticker__num--3' : '';
    return num.length <= 3 ? ' sticker__num--short' : ' sticker__num--word';
  }
  function utc(iso) { return new Date(T.dayNum(iso) * 864e5); }
  function shortDate(iso) { var d = utc(iso); return WD[d.getUTCDay()].slice(0, 3) + ' ' + d.getUTCDate() + ' ' + MON[d.getUTCMonth()].slice(0, 3); }
  function bnDate(iso) { var d = utc(iso); return T.bn(d.getUTCDate()) + ' ' + BN_MON[d.getUTCMonth()]; }

  T.onPage('darshan', function () {
    var A = null;
    (D.schedule || []).forEach(function (s) { if (!A && /Sandhya/i.test(s.en)) A = s; });
    var A0 = A ? A.start : 1110, A1 = A && A.end != null ? A.end : A0 + 90;
    var aBn = T.bn(T.fmt(A0).replace(/ (AM|PM)$/, ''));   /* ৬:৩০ */

    function setSticker(el, num, bnLine, enLine, label) {
      var n = el.querySelector('.sticker__num'), b = el.querySelector('.sticker__bn'), e = el.querySelector('.sticker__en');
      if (n) { n.textContent = num; n.className = 'sticker__num' + numClass(num); }
      if (b) b.textContent = bnLine;
      if (e) { e.textContent = enLine; e.className = 'sticker__en' + (enLine.length > 12 ? ' sticker__en--long' : ''); }
      el.setAttribute('aria-label', label);
    }

    /* the festivals on today, each once: a day of a longer festival (Ulto Rath in Rath Yatra) is not listed twice */
    function festivalsToday(iso) {
      var on = T.festivals.filter(function (f) { return T.daysTo(f.start) <= 0 && T.daysTo(f.end) >= 0; });
      var dayNames = [];
      on.forEach(function (f) { (f.days || []).forEach(function (x) { if (x.date === iso) dayNames.push({ f: f, en: x.en }); }); });
      var out = [];
      on.forEach(function (f) {
        var name = f.en.split(' · ')[0];
        if (dayNames.some(function (x) { return x.f !== f && x.en === name; })) return;
        var day = null, next = null;
        (f.days || []).forEach(function (x) { if (x.date === iso) day = x; else if (x.date > iso && !next) next = x; });
        if (day) out.push({ f: f, bn: day.bn, en: day.en === name ? T.festName(f) : name + ', ' + day.en });
        else if (f.days && f.days.length && next) out.push({ f: f, bn: f.bn + ' চলছে · ' + next.bn + ' ' + bnDate(next.date), en: name + ' week · ' + next.en + ' ' + shortDate(next.date) });
        else out.push({ f: f, bn: f.bn, en: T.festName(f) });
      });
      return out;
    }

    T.onTick(function () {
      var st = T.dayState(), m = st.mins, d = st.date, wd = d.getDay();

      /* the first screen's sticker: hours and minutes to today's Sandhya Arati, "now", or tomorrow's */
      T.qsa('[data-dar-arati]').forEach(function (el) {
        if (m >= A0 && m < A1) { setSticker(el, 'এখন', 'চলছে', 'Arati is on now', 'The Sandhya Arati is on now'); return; }
        if (m >= A1) { setSticker(el, 'কাল', 'সন্ধ্যা ' + aBn, 'Sandhya Arati', 'The next Sandhya Arati is tomorrow at ' + T.fmt(A0)); return; }
        var left = A0 - m, h = Math.floor(left / 60), mm = left % 60;
        var label = (h ? h + (h === 1 ? ' hour' : ' hours') + (mm ? ' ' : '') : '') + (mm ? mm + (mm === 1 ? ' minute' : ' minutes') : '') + ' to the Sandhya Arati';
        if (!h) setSticker(el, T.bn(mm), 'মিনিট বাকি', 'to Sandhya Arati', label);
        else setSticker(el, T.bn(h), 'ঘণ্টা' + (mm ? ' ' + T.bn(mm) + ' মিনিট' : ' বাকি'), 'to Sandhya Arati', label);   /* ১৭ / ঘণ্টা ৩০ মিনিট */
      });

      /* today: the date; open late on kirtan nights (the text itself comes from T.openText) */
      T.qsa('[data-dar-date]').forEach(function (el) { el.textContent = WD[wd] + ' ' + d.getDate() + ' ' + MON[d.getMonth()] + ' · India time'; });
      T.qsa('.dar-open[data-live="open"]').forEach(function (el) { el.setAttribute('data-open', st.late ? 'late' : (st.open ? 'yes' : 'no')); });

      /* notes under the tiles */
      var tithi = T.qs('[data-dar-tithi]');
      if (tithi) tithi.hidden = !st.kirtan;
      var festEl = T.qs('[data-dar-fest]'), list = festivalsToday(T.iso(d));
      if (festEl) {
        festEl.hidden = !list.length;
        var bnEl = festEl.querySelector('[data-dar-fest-bn]'), enEl = festEl.querySelector('[data-dar-fest-en]');
        var key = list.map(function (x) { return x.en; }).join('|');
        if (list.length && festEl.getAttribute('data-key') !== key) {
          festEl.setAttribute('data-key', key);
          bnEl.textContent = 'আজ ' + list.map(function (x) { return x.bn; }).join(', ');
          enEl.textContent = 'Today: ';
          list.forEach(function (x, i) {
            if (i) enEl.appendChild(document.createTextNode(' · '));
            var a = document.createElement('a');
            a.className = 'u';
            a.href = x.f.id === 'durga' ? festEl.getAttribute('data-href-durga') : festEl.getAttribute('data-href') + '#' + x.f.id;
            a.textContent = x.en;
            enEl.appendChild(a);
          });
        }
      }
      var notes = T.qs('.dar-notes');
      if (notes) notes.hidden = !(st.kirtan || list.length);

      /* the hours board: today's rows */
      T.qsa('[data-dar-row]').forEach(function (row) {
        var k = row.getAttribute('data-dar-row');
        var on = k === 'tithi' ? st.kirtan : (k === 'weekend' ? (wd === 0 || wd === 6) : (wd > 0 && wd < 6));
        row.classList.toggle('is-today', on);
        var tag = row.querySelector('[data-dar-today]');
        if (tag) tag.hidden = !on;
      });
    });
  });
})();
