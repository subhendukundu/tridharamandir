/* Homepage first screen. The small script in the page head (TMM_HERO, written by pages/home.py) picks the screen and
   fills its sticker before anything is drawn; this keeps both right as the date changes (or the Test panel's pretend time). */
(function () {
  'use strict';
  var T = window.TMM;

  T.onPage('home', function () {
    T.onTick(function () {
      var H = window.TMM_HERO;
      if (!H) return;
      var m = H.apply(T.today());
      var hero = T.qs('.hero[data-hero="' + m.id + '"]');
      if (!hero) return;
      T.qsa('[data-sticker]', hero).forEach(function (st) { H.fill(st); });
      var nb = T.nextBig();
      T.qsa('[data-next-big]', hero).forEach(function (el) {
        el.textContent = nb ? 'Next at the mandir: ' + T.festName(nb) + ', ' + nb.date_en + '.' : 'Dates for the next festival are coming soon.';
      });

      /* festival posters: the next six that haven't finished */
      T.qsa('[data-next-posters]').forEach(function (wrap) {
        var max = +wrap.getAttribute('data-next-posters') || 6, shown = 0;
        wrap.classList.add('is-live');
        T.qsa('.poster', wrap).forEach(function (p) {
          var pill = p.querySelector('[data-days-to]');
          var done = pill && T.daysTo(pill.getAttribute('data-days-end') || pill.getAttribute('data-days-to')) < 0;
          var show = !done && shown < max;
          if (show) shown++;
          p.classList.toggle('is-gone', !show);
        });
      });

      /* the moving strip: festivals from today on */
      T.qsa('[data-marquee="festivals"]').forEach(function (mq) {
        var items = T.festivals.filter(function (f) { return T.daysTo(f.end) >= 0; }).slice(0, 9);
        if (!items.length) return;
        var key = items.map(function (f) { return f.id; }).join(',');
        if (mq.getAttribute('data-key') === key) return;
        mq.setAttribute('data-key', key);
        T.qsa('.marquee__grp', mq).forEach(function (g) {
          g.innerHTML = '';
          items.forEach(function (f) {
            var a = document.createElement('span'); a.textContent = f.bn.split(' · ')[0] + ' ' + f.date_bn; g.appendChild(a);
            var b = document.createElement('span'); b.className = 'marquee__star'; b.textContent = '✦'; g.appendChild(b);
          });
        });
      });
    });
  });
})();
