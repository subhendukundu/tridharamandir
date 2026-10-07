/* Menu on phones, copy buttons. */
(function () {
  'use strict';
  var T = window.TMM;

  /* ---------------------------------------------------------------- menu */
  var menu = T.qs('#menu'), openBtn = T.qs('[data-menu-open]'), closeBtn = T.qs('[data-menu-close]');
  if (menu && openBtn) {
    var lastFocus = null;
    var focusables = function () { return T.qsa('a[href], button:not([disabled])', menu).filter(function (el) { return el.offsetParent !== null; }); };
    var open = function () {
      lastFocus = document.activeElement;
      menu.hidden = false;
      document.documentElement.classList.add('menu-open');
      openBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    };
    var close = function () {
      menu.hidden = true;
      document.documentElement.classList.remove('menu-open');
      openBtn.setAttribute('aria-expanded', 'false');
      (lastFocus && lastFocus.focus ? lastFocus : openBtn).focus();
    };
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (a && a.getAttribute('href').charAt(0) === '#') close(); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('resize', function () { if (!menu.hidden && window.innerWidth >= 1100) close(); });
  }

  /* ---------------------------------------------------------------- moving strips: a pause button (it also stops for reduced motion) */
  T.qsa('[data-marquee-pause]').forEach(function (b) {
    var m = b.closest('.marquee');
    b.addEventListener('click', function () {
      var paused = m.classList.toggle('is-paused');
      b.setAttribute('aria-pressed', String(paused));
    });
  });

  /* route maps on phones scroll sideways and start at the left, at Kolkata, where the route begins
     (no script: starting at the mandir's end cut the first pill, "মোট ১৮০ কিমি", to "৮০ কিমি") */

  /* ---------------------------------------------------------------- copy buttons */
  function selectText(el) {
    if (!el) return;
    try { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) { /* ignore */ }
  }
  T.copy = function (btn, value, target) {
    var label = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', label);
    var done = function (ok) {
      btn.textContent = ok ? 'Copied' : 'Selected';
      T.say(ok ? 'Copied ' + value : 'Selected. Press Ctrl+C or Command+C to copy.');
      clearTimeout(btn._t); btn._t = setTimeout(function () { btn.textContent = label; }, 2200);
    };
    var fallback = function () { selectText(target); done(false); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).then(function () { done(true); }, fallback);
      else fallback();
    } catch (e) { fallback(); }
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var wrap = b.closest('.copyval, [data-copy-scope]');
    var target = wrap ? wrap.querySelector('.copyval__v, [data-copy-text]') : null;
    var value = b.getAttribute('data-copy') || (target ? target.textContent : '');
    T.copy(b, value, target);
  });
})();
