/* Visit page: the open / closed sticker on the first screen (open late on kirtan nights, from the shared T.dayState),
   and the guest-house booking enquiry: a live estimate for one room, the earliest dates each date field takes (so the
   shared form check in 40-forms.js catches dates in the past or a check-out before check-in, along with every other
   field), the estimate lines in what is sent, "Ask for this room" buttons that pick the room, and "Ask about this"
   buttons that tick the walk or an experience. */
(function () {
  'use strict';
  var T = window.TMM, D = T.data;
  var WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function bnClock(m) {   /* 1260 -> ৯টা, 1290 -> ৯:৩০ */
    var h = Math.floor(m / 60) % 12 || 12, mm = m % 60;
    return mm ? T.bn(h + ':' + T.pad(mm)) : T.bn(h) + 'টা';
  }
  function short(m) {     /* 300 -> 5 AM, 1290 -> 9:30 PM */
    var h = Math.floor(m / 60), mm = m % 60;
    return (h % 12 || 12) + (mm ? ':' + T.pad(mm) : '') + (h % 24 < 12 ? ' AM' : ' PM');
  }
  function money(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
  function isoAdd(iso, n) {
    var d = new Date((T.dayNum(iso) + n) * 864e5);
    return d.getUTCFullYear() + '-' + T.pad(d.getUTCMonth() + 1) + '-' + T.pad(d.getUTCDate());
  }
  function nice(iso) {
    var d = new Date(T.dayNum(iso) * 864e5);
    return WD[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MON[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  T.onPage('visit', function () {
    /* ---------------------------------------------------------------- the sticker */
    T.onTick(function () {
      var st = T.dayState();
      T.qsa('[data-vis-open]').forEach(function (el) {
        var n, b, e, label, state;
        if (st.open && st.kirtan) {
          n = 'খোলা'; b = 'সারা রাত কীর্তন'; e = 'Open late tonight'; state = st.late ? 'late' : 'yes';
          label = 'Open late tonight, with kirtan through the night';
        } else if (st.open) {
          n = 'খোলা'; b = 'রাত ' + bnClock(st.close) + ' পর্যন্ত'; e = 'Open now'; state = 'yes';
          label = 'Darshan is open now, until ' + T.fmt(st.close);
        } else {
          n = 'বন্ধ'; b = 'ভোর ' + bnClock(D.hours.open).replace('টা', 'টায়'); e = 'Opens ' + short(D.hours.open); state = 'no';
          label = 'Closed now. Darshan opens at ' + T.fmt(D.hours.open);
        }
        var a = el.querySelector('.sticker__num'), c = el.querySelector('.sticker__bn'), d = el.querySelector('.sticker__en');
        if (a) { a.textContent = n; a.className = 'sticker__num sticker__num--word'; }
        if (c) c.textContent = b;
        if (d) { d.textContent = e; d.className = 'sticker__en' + (e.length > 12 ? ' sticker__en--long' : ''); }
        el.setAttribute('data-open', state);
        el.setAttribute('aria-label', label);
      });
    });

    /* ---------------------------------------------------------------- the booking enquiry */
    var form = T.qs('form[data-form="book-form"]');
    var est = T.qs('[data-vis-est]');
    if (!form || !est) return;
    var cin = form.elements.checkin, cout = form.elements.checkout, room = form.elements.room;
    var prices = {};
    try { prices = JSON.parse(est.getAttribute('data-prices')) || {}; } catch (e) { prices = {}; }
    var out = {
      room: est.querySelector('[data-est-room]'), nights: est.querySelector('[data-est-nights]'),
      total: est.querySelector('[data-est-total]'), adv: est.querySelector('[data-est-adv]')
    };
    var minPrice = Math.min.apply(null, Object.keys(prices).map(function (k) { return prices[k]; }).concat([Infinity]));

    function nights() {
      if (!cin.value || !cout.value) return 0;
      return T.dayNum(cout.value) - T.dayNum(cin.value);
    }

    function update() {
      /* the earliest day each field takes: today for check-in, the day after check-in for check-out */
      var today = T.iso(T.now());
      cin.min = today;
      cout.min = isoAdd(cin.value && cin.value >= today ? cin.value : today, 1);
      var n = nights(), p = prices[room.value];
      out.room.textContent = room.value ? room.options[room.selectedIndex].text.split(' · ')[0] : 'Choose a room and your dates';
      if (n > 0) out.nights.textContent = n + (n === 1 ? ' night' : ' nights') + ' · ' + nice(cin.value) + ' to ' + nice(cout.value);
      else out.nights.textContent = p ? money(p) + ' a night' : (isFinite(minPrice) ? 'From ' + money(minPrice) + ' a night' : '');
      var has = n > 0 && !!p;
      out.total.textContent = has ? money(n * p) : '₹ —';
      out.adv.textContent = has ? '30% advance · ' + money(n * p * 0.3) : '';
      out.adv.hidden = !has;
    }

    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('reset', function () { setTimeout(update, 0); });
    /* just before the shared check runs (capture on the section): bring the earliest dates up to date */
    (form.closest('section') || document).addEventListener('submit', function (e) { if (e.target === form) update(); }, true);
    form.tmmExtra = function () {
      var n = nights(), p = prices[room.value], lines = [];
      if (n > 0) lines.push('Stay: ' + n + (n === 1 ? ' night, ' : ' nights, ') + nice(cin.value) + ' to ' + nice(cout.value));
      if (n > 0 && p) lines.push('Estimate for one room: ' + money(n * p) + ' (30% advance ' + money(n * p * 0.3) + ')');
      return lines;
    };

    /* "Ask for this room" on a room card picks it in the form */
    T.qsa('[data-room]').forEach(function (a) {
      a.addEventListener('click', function () {
        var v = a.getAttribute('data-room');
        for (var i = 0; i < room.options.length; i++) if (room.options[i].value === v) { room.selectedIndex = i; break; }
        room.dispatchEvent(new Event('input', { bubbles: true }));   /* clears an earlier "please fill this in" (40-forms.js) */
        update();
      });
    });
    /* "Ask about this" on the walk and the guest-house experiences ticks it under "Also ask about" */
    T.qsa('[data-also]').forEach(function (a) {
      a.addEventListener('click', function () {
        var v = a.getAttribute('data-also');
        T.qsa('input[name="also"]', form).forEach(function (c) { if (c.value === v) c.checked = true; });
      });
    });

    update();
    T.onTick(update);   /* keeps "today" right if the page stays open past midnight */
  });
})();
