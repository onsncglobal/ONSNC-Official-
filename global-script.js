// Minimal, performant, dependency-free header interactions
(function () {
  var nav = document.getElementById('primaryNav');
  var toggle = document.getElementById('navToggle');
  var lang = document.getElementById('lang-select');

  // Restore language selection from sessionStorage for simple persistence
  try {
    var savedLang = sessionStorage.getItem('onsnc_lang');
    if (savedLang) lang.value = savedLang;
  } catch (e) {}

  // Language change handler (keeps small, fast)
  lang.addEventListener('change', function () {
    try { sessionStorage.setItem('onsnc_lang', lang.value); } catch (e) {}
    // Emit a custom event for integration (consumers can listen and load JSON translations)
    var evt = new CustomEvent('onsnc:languageChange', { detail: { lang: lang.value } });
    window.dispatchEvent(evt);
  });

  // Toggle navigation open/close
  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (expanded) {
      nav.classList.add('open');
    } else {
      nav.classList.remove('open');
    }
  }

  toggle.addEventListener('click', function (e) {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isOpen);
  });

  // Close nav on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setExpanded(false);
      toggle.focus();
    }
  });

  // Close nav when clicking outside on small screens
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!nav.contains(target) && !toggle.contains(target) && window.innerWidth < 900) {
      setExpanded(false);
    }
  });

  // Ensure nav state resets on resize to avoid stuck open/closed states
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 900) {
        // show inline nav on large screens
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }, 120);
  });

})();
