/* About page: the five-years chip on the journey counts down to Rath Yatra, 5 July 2027 (the 5th Pratishtha anniversary). */
(function () {
  'use strict';
  var T = window.TMM;
  T.onPage('about', function () {
    var el = T.qs('[data-abt-five]');
    if (!el) return;
    var bnEl = T.qs('[data-abt-five-bn]', el), enEl = T.qs('[data-abt-five-en]', el);
    T.onTick(function () {
      var n = T.daysTo('2027-07-05');
      if (n > 0) { bnEl.textContent = T.bn(n) + ' দিন বাকি'; enEl.textContent = n + (n === 1 ? ' day' : ' days') + ' to go'; }
      else if (n === 0) { bnEl.textContent = 'আজ রথযাত্রা'; enEl.textContent = 'Rath Yatra today: five years'; }
      else { bnEl.textContent = 'পাঁচ বছর পূর্ণ'; enEl.textContent = 'Five years complete'; }
    });
  });
})();
