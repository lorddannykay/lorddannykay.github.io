(function () {
  var footerSelectors = [
    '.footer-logo-wrap',
    '.footer-bootom-part-wrap',
    '.footer-bootom-text',
    '.footer-heading-wrap',
    '.footer-heading-1',
    '.footer-heading-1-1',
    '.footer-heading-1-2',
    '.footer-paragraph',
    '.footer-center-line-wrap',
    '.footer-center-line',
    '.footer-frame-line-left',
    '.footer-frame-line-right',
    '.footer-frame-line-top',
    '.footer-frame-line-bottom',
    '.port-to-top-wrap',
    '[data-w-id*="8c1d2cce"]',
    '[data-w-id*="d2e31283"]'
  ];

  function resetEl(el) {
    el.style.setProperty('opacity', '1', 'important');
    el.style.setProperty('transform', 'translate3d(0, 0, 0)', 'important');
    el.style.setProperty('transition', 'none', 'important');
    el.style.setProperty('visibility', 'visible', 'important');
  }

  function fixFooterLinks(footer) {
    footer.querySelectorAll('.footer-email-link-wrap .footer-email-text:not(.second)').forEach(function (el) {
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('position', 'relative', 'important');
    });

    footer.querySelectorAll('.footer-email-link-wrap .footer-email-text.second').forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });

    footer.querySelectorAll('.footer-phone-link-wrap .footer-phone-text').forEach(function (el) {
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('position', 'relative', 'important');
      el.style.setProperty('margin-top', '0', 'important');
    });

    footer.querySelectorAll('.footer-email-link-wrap, .footer-phone-link-wrap').forEach(function (el) {
      el.style.setProperty('overflow', 'visible', 'important');
    });
  }

  function showFooter() {
    var footer = document.querySelector('.footer');
    if (!footer) {
      return;
    }

    resetEl(footer);

    footerSelectors.forEach(function (selector) {
      footer.querySelectorAll(selector).forEach(function (el) {
        if (el.classList.contains('footer-email-link-wrap') || el.classList.contains('footer-phone-link-wrap')) {
          return;
        }
        resetEl(el);
      });
    });

    fixFooterLinks(footer);
  }

  function init() {
    showFooter();
    window.setTimeout(showFooter, 0);
    window.setTimeout(showFooter, 100);
    window.setTimeout(showFooter, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', init);
})();
