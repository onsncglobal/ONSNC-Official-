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


// Add below your existing header IIFE

// Small utilities used by header (local, dependency-free)
(function(){
  // debounce helper
  function debounce(fn, wait){ var t; return function(){ var args = arguments; clearTimeout(t); t = setTimeout(function(){ fn.apply(null, args); }, wait); }; }

  // safe session set/get with fallback
  var _mem = {};
  function safeSet(key, value){
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) { _mem[key] = value; }
  }
  function safeGet(key){
    try { var v = sessionStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return _mem.hasOwnProperty(key) ? _mem[key] : null; }
  }

  // aria live announcer
  function announce(msg, politeness){
    politeness = politeness || 'polite';
    var el = document.getElementById('onsnc-aria-live');
    if(!el){
      el = document.createElement('div');
      el.id = 'onsnc-aria-live';
      el.setAttribute('aria-live', politeness);
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
    }
    el.textContent = String(msg);
  }

  // focus trap for a container; returns restore function
  function trapFocus(container){
    if(!container) return function(){};
    var focusable = container.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if(!focusable.length) return function(){};
    var first = focusable[0], last = focusable[focusable.length - 1];
    function handler(e){
      if(e.key !== 'Tab') return;
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
    container.addEventListener('keydown', handler);
    return function restore(){ container.removeEventListener('keydown', handler); };
  }

  // Expose small API on nav element for use elsewhere
  var nav = document.getElementById('primaryNav');
  var toggle = document.getElementById('navToggle');
  var lang  = document.getElementById('lang-select');
  if(!nav || !toggle || !lang) return;

  // Restore language using safeGet
  try {
    var saved = safeGet('onsnc_lang');
    if(saved) lang.value = saved;
  } catch(e){}

  // store restore function to restore focus when closing
  nav._restoreFocus = null;
  nav._lastToggleFocus = null;

  // enhance setExpanded to trap/restore focus and announce
  function setExpandedEnhanced(expanded){
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    nav.classList.toggle('open', !!expanded);
    if(expanded){
      // store last focused element
      nav._lastToggleFocus = document.activeElement;
      if(window.innerWidth < 900){
        nav._restoreFocus = trapFocus(nav);
        // move focus into nav for keyboard users
        var firstFocusable = nav.querySelector('a,button,[tabindex]:not([tabindex="-1"])');
        if(firstFocusable) firstFocusable.focus();
      }
      announce('Navigation opened', 'polite');
      window.dispatchEvent(new CustomEvent('onsnc:nav', { detail: { action: 'open' } }));
    } else {
      if(nav._restoreFocus){ nav._restoreFocus(); nav._restoreFocus = null; }
      // restore focus to toggle for context
      try { (nav._lastToggleFocus || toggle).focus(); } catch(e){}
      announce('Navigation closed', 'polite');
      window.dispatchEvent(new CustomEvent('onsnc:nav', { detail: { action: 'close' } }));
    }
  }

  // Override click handler to use enhanced behavior
  toggle.addEventListener('click', function(e){
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setExpandedEnhanced(!isOpen);
  });

  // language change: safe persist + emit + announce
  lang.addEventListener('change', function(){
    try { safeSet('onsnc_lang', lang.value); } catch(e){}
    window.dispatchEvent(new CustomEvent('onsnc:languageChange', { detail: { lang: lang.value } }));
    announce('Language changed to ' + lang.options[lang.selectedIndex].text, 'polite');
  });

  // escape to close (keep existing behavior)
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      setExpandedEnhanced(false);
      toggle.focus();
    }
  });

  // debounced outside click close (safer)
  document.addEventListener('click', debounce(function(e){
    var target = e.target;
    if(!nav.contains(target) && !toggle.contains(target) && window.innerWidth < 900){
      setExpandedEnhanced(false);
    }
  }, 90));

  // reset nav on resize (debounced)
  var resizeTimer;
  window.addEventListener('resize', debounce(function(){
    if(window.innerWidth >= 900){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if(nav._restoreFocus){ nav._restoreFocus(); nav._restoreFocus = null; }
    }
  }, 120), false);

  // small public API for other scripts
  window.onsncHeader = window.onsncHeader || {};
  window.onsncHeader.open = function(){ setExpandedEnhanced(true); };
  window.onsncHeader.close = function(){ setExpandedEnhanced(false); };
  window.onsncHeader.toggle = function(){ setExpandedEnhanced(toggle.getAttribute('aria-expanded') !== 'true'); };

  // optional: analytics hook (fire events you can listen to)
  window.addEventListener('onsnc:nav', function(evt){
    // example: window.dataLayer && window.dataLayer.push({ event: 'onsnc_nav', action: evt.detail.action });
  });

})();
