(function () {
  'use strict';

  var DESKTOP_OPEN_Y = [-150, -200, -250];
  var MOBILE_OPEN_Y = [-132, -176, -220];
  var DELAYS = [200, 300, 400];

  function getOpenPositions() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      return MOBILE_OPEN_Y;
    }
    return DESKTOP_OPEN_Y;
  }

  function initSocialButtons() {
    var container = document.querySelector('.sm-buttons');
    if (!container) return;

    var refButton = container.querySelector('.sm-button-1');
    var extraButtons = container.querySelectorAll('.sm-button-3, .sm-button-4, .sm-button-5');
    if (!refButton || !extraButtons.length) return;

    function isOpen() {
      var style = window.getComputedStyle(refButton);
      return style.display !== 'none' && parseFloat(style.opacity) > 0.5;
    }

    function syncExtraButtons() {
      var open = isOpen();
      var openPositions = getOpenPositions();

      extraButtons.forEach(function (btn, i) {
        btn.style.transitionDelay = open ? DELAYS[i] + 'ms' : '0ms';

        if (open) {
          btn.style.display = 'flex';
          btn.style.opacity = '1';
          btn.style.transform = 'translate(0, ' + openPositions[i] + 'px)';
          return;
        }

        btn.style.opacity = '0';
        btn.style.transform = 'translate(0, ' + (openPositions[i] + 25) + 'px)';
        window.setTimeout(function () {
          if (!isOpen()) btn.style.display = 'none';
        }, 700);
      });
    }

    extraButtons.forEach(function (btn) {
      btn.style.opacity = '0';
      btn.style.display = 'none';
    });

    var observer = new MutationObserver(syncExtraButtons);
    observer.observe(refButton, { attributes: true, attributeFilter: ['style', 'class'] });

    var refButton2 = container.querySelector('.sm-button-2');
    if (refButton2) {
      observer.observe(refButton2, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    var plus = container.querySelector('.sm-button-plus');
    if (plus) {
      plus.addEventListener('click', function () {
        [50, 150, 400, 800, 1200].forEach(function (delay) {
          window.setTimeout(syncExtraButtons, delay);
        });
      });
    }

    window.addEventListener('resize', syncExtraButtons);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialButtons);
  } else {
    initSocialButtons();
  }
})();
