/* Seva page: the anna-daan plate calculator, the seva request form (seva choice, amount, live summary, extra summary
   lines), the ceremony picker of the rituals enquiry and the seva desk's open/closed line. Nothing is paid here:
   the forms only send a request (40-forms.js posts them to /api/form on the live site).
   Other pages can open a form with a choice made: seva/?seva=other&which=Khichuri%20seva#seva-form ,
   seva/?ceremony=wedding#ritual-form */
(function () {
  'use strict';
  var T = window.TMM;

  T.onPage('seva', function () {
    var RATE = 1001 / 80;            // ₹1,001 feeds 80 devotees (the current site's homepage), so a plate is about ₹12.50: an estimate
    var MAX = 9999999, DRAW_MAX = 2000;

    function num(v) {
      var n = parseFloat(String(v == null ? '' : v).replace(/[^\d.]/g, ''));
      return isFinite(n) && n > 0 ? Math.min(Math.round(n), MAX) : 0;
    }
    function group(n) { return Math.round(n).toLocaleString('en-IN'); }
    function inr(n) { return '₹' + group(n); }
    function platesFor(a) { return Math.round(a / RATE); }
    function plural(n, one, many) { return n === 1 ? one : many; }

    /* a big figure shrinks to fit its box (a long amount like ₹1,00,000 must not spill out) */
    function fit(el, room) {
      if (!el) return;
      el.style.fontSize = '';
      var max = parseFloat(window.getComputedStyle(el).fontSize);
      var w = room || el.clientWidth, sw = el.scrollWidth;
      if (w > 0 && sw > w) el.style.fontSize = Math.max(16, Math.floor(max * w / sw * 0.97)) + 'px';
    }

    /* ---------------------------------------------------------------- the plate calculator */
    var calc = T.qs('[data-sev-calc]');
    var calcAmount = 1001;
    var refits = [];
    if (calc) {
      var input = T.qs('[data-calc-input]', calc);
      var picks = T.qsa('[data-calc-pick]', calc), custom = T.qs('[data-calc-custom]', calc);
      var svg = T.qs('[data-calc-svg]', calc), g = T.qs('[data-calc-plates]', calc), fig = svg.parentNode;
      var total = T.qs('[data-calc-total]', calc), lineBn = T.qs('[data-calc-bn]', calc), lineEn = T.qs('[data-calc-en]', calc);
      var capBn = T.qs('[data-calc-capbn]', calc), capEn = T.qs('[data-calc-capen]', calc);
      var drawn = '';

      /* the leaf plates: one per devotee; up to 80 they fill a fixed grid, beyond that they shrink to fit (2,000 at most) */
      var draw = function (n) {
        var wide = fig.clientWidth >= 460, C0 = wide ? 16 : 10, R0 = wide ? 5 : 8, S = 45, W = C0 * S, H = R0 * S;
        var key = n + '|' + wide;
        if (key === drawn) return;
        drawn = key;
        var base = C0 * R0, m, c, r, cell;
        if (n <= base) { m = base; c = C0; r = R0; cell = S; }
        else { m = Math.min(n, DRAW_MAX); c = Math.ceil(Math.sqrt(m * C0 / R0)); r = Math.ceil(m / c); cell = Math.min(W / c, H / r); }
        var ox = (W - c * cell) / 2, oy = (H - r * cell) / 2, out = [];
        for (var i = 0; i < m; i++) {
          out.push('<use href="#sev-plate' + (i >= n ? '-e' : '') + '" x="' + (ox + (i % c) * cell).toFixed(1) + '" y="' + (oy + Math.floor(i / c) * cell).toFixed(1)
            + '" width="' + cell.toFixed(2) + '" height="' + cell.toFixed(2) + '"/>');
        }
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        g.innerHTML = out.join('');
        svg.setAttribute('aria-label', n ? group(n) + plural(n, ' leaf plate', ' leaf plates') + (n > DRAW_MAX ? ', of which ' + group(DRAW_MAX) + ' are drawn' : '') : 'No plates yet');
      };

      var update = function () {
        var a = num(input.value), n = a ? platesFor(a) : 0, matched = false;
        calcAmount = a;
        picks.forEach(function (b) {
          var on = +b.getAttribute('data-calc-pick') === a;
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (on) matched = true;
        });
        if (custom) custom.setAttribute('aria-pressed', matched ? 'false' : 'true');
        total.textContent = a ? inr(a) : '₹ —';
        total.style.setProperty('--len', String(Math.max(total.textContent.length, 5)));
        fit(total);
        if (!a) { lineBn.textContent = 'টাকার অঙ্ক লিখুন'; lineEn.textContent = 'Type an amount to see the plates'; }
        else if (n < 1) { lineBn.textContent = 'এক পাতের চেয়ে কম'; lineEn.textContent = 'Less than one plate (about ₹12.50 a plate)'; }
        else { lineBn.textContent = 'প্রায় ' + T.bn(group(n)) + ' জনের পাত'; lineEn.textContent = 'About ' + group(n) + plural(n, ' plate', ' plates') + ' of anna-daan'; }
        capBn.textContent = n ? T.bn(group(n)) + ' জন, ' + T.bn(group(n)) + 'টি পাত' : 'পাত এখনও খালি';
        capEn.textContent = n > DRAW_MAX ? 'Showing ' + group(DRAW_MAX) + ' plates: more than a day of anna-daan at the mandir'
          : (n >= 2000 ? 'About a day of anna-daan at the mandir' : 'Each plate is one devotee fed');
        draw(n);
      };

      picks.forEach(function (b) {
        b.addEventListener('click', function () { input.value = b.getAttribute('data-calc-pick'); update(); });
      });
      if (custom) custom.addEventListener('click', function () {
        picks.forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
        custom.setAttribute('aria-pressed', 'true');
        input.focus();
        try { input.select(); } catch (e) { /* some browsers do not select number fields */ }
      });
      input.addEventListener('input', update);
      refits.push(function () { draw(platesFor(num(input.value))); fit(total); });
      update();
    }

    /* ---------------------------------------------------------------- the seva desk: open or closed now (India time; open daily, 8 AM – 6 PM) */
    var desk = T.qs('[data-sev-desk]');
    if (desk) {
      T.onTick(function () {
        var m = T.mins(), open = m >= 480 && m < 1080, left = 1080 - m;
        var line = open ? 'Open now · closes at 6 PM' + (left <= 60 ? ' (in ' + left + ' min)' : '')
          : (m < 480 ? 'Closed now · opens at 8 AM' : 'Closed for the day · opens at 8 AM tomorrow');
        var el = T.qs('[data-sev-desk-line]', desk);
        if (el) el.textContent = line;
        desk.setAttribute('data-open', open ? 'yes' : 'no');
      });
    }

    /* ---------------------------------------------------------------- rituals and ceremonies: the enquiry form */
    var rform = T.qs('#ritual-form');
    if (rform) {
      var rsel = T.qs('[data-rit-select]', rform), rdate = T.qs('[data-rit-date]', rform);
      if (rdate) rdate.min = T.iso(T.now());          // a ceremony date from today on
      var choose = function (v) {
        if (!rsel || v == null) return;
        if (v === 'sanskar') {                       // the Sanskar card: keep a sanskar already chosen, else ask which one
          var cur = rsel.options[rsel.selectedIndex];
          if (!cur || cur.getAttribute('data-group') !== 'sanskar') rsel.value = '';
        } else if (T.qs('option[value="' + v + '"]', rsel)) {
          rsel.value = v;
        }
        rsel.dispatchEvent(new Event('change', { bubbles: true }));
      };
      document.addEventListener('click', function (e) {
        var b = e.target.closest('[data-rit-pick]');
        if (b) choose(b.getAttribute('data-rit-pick'));
      });
      try {
        var cq = new URLSearchParams(window.location.search).get('ceremony');
        if (cq) choose(cq);
      } catch (e) { /* old browsers: no preselection */ }
    }

    /* ---------------------------------------------------------------- the seva request form */
    var form = T.qs('#seva-form');
    if (!form) return;
    var radios = T.qsa('input[name="seva"]', form);
    var amount = T.qs('#seva-amount', form), hint = T.qs('[data-sev-amt-hint]', form);
    var whenSel = T.qs('[data-sev-when]', form), dateIn = T.qs('[data-sev-date]', form), forIn = T.qs('#seva-for', form);
    var whichWrap = T.qs('[data-sev-which-wrap]', form), whichIn = T.qs('[data-sev-which]', form);
    var sum = T.qs('.sev-sum');

    /* festivals that have already passed this year drop out of the occasion list */
    if (whenSel) T.qsa('option[data-end]', whenSel).forEach(function (o) { if (T.daysTo(o.getAttribute('data-end')) < 0) o.remove(); });

    function chosen() { for (var i = 0; i < radios.length; i++) if (radios[i].checked) return radios[i]; return null; }
    function checked(name) { var el = T.qs('input[name="' + name + '"]:checked', form); return el ? el.getAttribute('data-text') : ''; }
    function set(key, text) { if (!sum) return; var el = T.qs('[data-sum="' + key + '"]', sum); if (el) el.textContent = text; }

    function whenText() {
      var parts = [], o = whenSel && whenSel.options[whenSel.selectedIndex];
      if (o && o.getAttribute('data-name')) parts.push(o.getAttribute('data-name'));
      var m = dateIn && /^(\d{4})-(\d\d)-(\d\d)$/.exec(dateIn.value);
      if (m) parts.push(T.fmtDate(new Date(+m[1], m[2] - 1, +m[3])));
      return parts.join(' · ') || (o && o.value === 'date' ? 'Choose a date' : 'Any day');
    }

    /* "Another seva": ask which one; the amount is then up to the visitor */
    function otherMode(on) {
      if (!whichWrap || !whichIn) return;
      whichWrap.hidden = !on;
      whichIn.disabled = !on;
      whichIn.required = on;
      amount.required = !on;
      var star = amount.closest('.field') && T.qs('.field__req', amount.closest('.field'));
      if (star) star.hidden = on;
    }

    function refresh() {
      var r = chosen(), a = num(amount.value), n = a ? platesFor(a) : 0;
      var plates = !!(r && r.hasAttribute('data-plates')), monthly = !!(r && r.hasAttribute('data-monthly')), other = !!(r && r.hasAttribute('data-other'));
      if (hint) {
        hint.textContent = plates ? (a ? 'About ' + group(n) + plural(n, ' plate', ' plates') + ' of anna-daan (an estimate). Change the amount if you wish.' : 'Type the amount you wish to offer.')
          : other ? 'If you know the amount; you can also leave it empty.'
          : (monthly ? 'This amount, every month. Change it if you wish.' : 'The amount listed for this seva. Change it if you wish.');
      }
      if (sum) {
        var which = other && whichIn ? whichIn.value.trim() : '';
        set('bn', r ? r.getAttribute('data-bn') : '—');
        set('en', r ? r.getAttribute('data-text') + (which ? ': ' + which : '') + (plates && n ? ' for ' + group(n) : '') : '');
        var pr = T.qs('[data-sum-row="plates"]', sum);
        if (pr) pr.hidden = !plates;
        set('plates', n ? 'প্রায় ' + T.bn(group(n)) : '—');
        set('when', whenText());
        set('for', (forIn && forIn.value.trim()) || '—');
        set('pay', checked('pay') || '—');
        set('total', a ? inr(a) : '₹ —');
        var per = T.qs('[data-sum-per]', sum);
        if (per) per.hidden = !monthly;
        T.qsa('[data-sum-ic]', sum).forEach(function (ic) { ic.hidden = !r || ic.getAttribute('data-sum-ic') !== r.value; });
        fitSum();
      }
      T.qsa('[data-sev-total]', form).forEach(function (el) { el.textContent = a ? ' · ' + inr(a) + (monthly ? ' a month' : '') : ''; });
    }
    function fitSum() {
      var tot = sum && T.qs('[data-sum="total"]', sum);
      if (!tot) return;
      var cs = window.getComputedStyle(sum);
      fit(tot, sum.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    }
    refits.push(fitSum);

    /* "Offer this seva" buttons on the cards and the calculator choose the seva (and amount) before the page scrolls to the form */
    function pick(id, amt, which) {
      var r = T.qs('input[name="seva"][value="' + id + '"]', form);
      if (!r) return;
      r.checked = true;
      otherMode(r.hasAttribute('data-other'));
      amount.value = amt ? String(amt) : (r.getAttribute('data-amount') || '');
      if (which && whichIn) whichIn.value = which;
      amount.dispatchEvent(new Event('input', { bubbles: true }));   // clears an old error message, if any
      refresh();
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sev-pick]');
      if (b) pick(b.getAttribute('data-sev-pick'), b.hasAttribute('data-sev-from-calc') ? calcAmount : 0);
    });
    radios.forEach(function (r) {
      r.addEventListener('change', function () { otherMode(r.hasAttribute('data-other')); amount.value = r.getAttribute('data-amount') || ''; refresh(); });
    });
    form.addEventListener('input', refresh);
    form.addEventListener('change', refresh);
    form.addEventListener('reset', function () { setTimeout(function () { otherMode(false); refresh(); }, 0); });

    /* a link from another page can choose the seva: ?seva=other&which=Khichuri%20seva */
    try {
      var q = new URLSearchParams(window.location.search), want = q.get('seva');
      if (want) pick(want, num(q.get('amount')), (q.get('which') || '').slice(0, 80));
    } catch (e) { /* old browsers: no preselection */ }

    /* extra lines for the summary the visitor sends (see T.formSummary in 40-forms.js) */
    form.tmmExtra = function () {
      var r = chosen(), a = num(amount.value), lines = [];
      if (r && r.hasAttribute('data-plates') && a) lines.push('Plates (estimate): about ' + group(platesFor(a)) + ' (₹1,001 feeds 80, so about ₹12.50 a plate)');
      if (r && r.hasAttribute('data-monthly')) lines.push('How often: every month');
      return lines;
    };

    /* after the summary appears: the next step is paying */
    var box = T.qs('[data-form-result]', form);
    if (box && window.MutationObserver) {
      new MutationObserver(function () {
        if (box.hidden || !box.firstChild || T.qs('.sev-next', box)) return;
        var next = document.createElement('div');
        next.className = 'sev-next';
        next.innerHTML = '<p class="sev-next__t"><strong>Then pay</strong> by UPI, bank transfer or cheque: for the details, call or email the seva desk '
          + '(8 AM – 6 PM daily). Receipt within 48 hours of contribution confirmation.</p>'
          + '<a class="btn btn--sm btn--haldi" href="#pay">How to pay</a>';
        box.appendChild(next);
      }).observe(box, { childList: true });
    }
    refresh();

    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { refits.forEach(function (fn) { fn(); }); }, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { refits.forEach(function (fn) { fn(); }); });
  });
})();
