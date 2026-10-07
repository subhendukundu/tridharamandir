/* Start: draw everything that depends on the time now, then every 30 seconds. */
(function () {
  'use strict';
  var T = window.TMM;
  T.tick();
  setInterval(T.tick, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) T.tick(); });
})();
