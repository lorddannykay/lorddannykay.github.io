(function () {
  var mobileQuery = window.matchMedia('(max-width: 991px)');

  if (!mobileQuery.matches) {
    return;
  }

  var contentSelectors = [
    '.wrap-heading h1',
    '.wrap-heading h2',
    '.wrap-heading h3',
    '.simple-wrap [data-w-id]',
    '.byteai-section-wrap [data-w-id]',
    '.contact-section-wrap [data-w-id]'
  ];

  function isStuckHidden(el) {
    var style = window.getComputedStyle(el);
    var opacity = parseFloat(style.opacity);
    var transform = style.transform || 'none';

    if (opacity < 0.1) {
      return true;
    }

    if (transform !== 'none') {
      var match = transform.match(/matrix\([^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*([^,]+),\s*([^)]+)\)/);
      if (match) {
        var ty = parseFloat(match[2]);
        if (Math.abs(ty) > 40) {
          return true;
        }
      }

      if (transform.indexOf('translateY') !== -1) {
        var yMatch = transform.match(/translateY\(([^)]+)\)/);
        if (yMatch) {
          var yVal = parseFloat(yMatch[1]);
          if (Math.abs(yVal) > 40) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function resetEl(el) {
    if (!isStuckHidden(el)) {
      return;
    }

    el.style.setProperty('opacity', '1', 'important');
    el.style.setProperty('transform', 'translate3d(0, 0, 0)', 'important');
    el.style.setProperty('visibility', 'visible', 'important');
  }

  function checkContent() {
    contentSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(resetEl);
    });

    document.querySelectorAll('.wrap-heading').forEach(function (wrap) {
      wrap.style.setProperty('overflow', 'visible', 'important');
    });
  }

  function init() {
    window.setTimeout(checkContent, 1500);
    window.setTimeout(checkContent, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', init);
})();
