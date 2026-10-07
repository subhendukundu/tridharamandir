/* 404 page: show which address the visitor asked for (the host serves this page for any missing path). */
(function () {
  'use strict';
  var T = window.TMM;
  T.onPage('notfound', function () {
    var box = T.qs('[data-nf-path]'), v = T.qs('[data-nf-path-v]');
    var path = '';
    try { path = decodeURI(window.location.pathname || ''); } catch (e) { path = window.location.pathname || ''; }
    if (!box || !v || !path || /(^|\/)404(\.html)?$/.test(path)) return;
    v.textContent = path.length > 80 ? path.slice(0, 77) + '…' : path;
    box.hidden = false;
  });
})();
