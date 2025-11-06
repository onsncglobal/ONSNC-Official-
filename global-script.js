/**
 * ==========================================
 * ONSNC Civilization 3.0 - Global Scripts
 * ==========================================
 * Minimal, performant, dependency-free scripts
 */

(function () {
  'use strict';

  // ==========================================
  // DOM Element References
  // ==========================================
  const nav = document.getElementById('primaryNav');
  const toggle = document.getElementById('navToggle');
  const lang = document.getElementById('lang-select');
  const newsletterForm = document.getElementById('newsletterForm');

  // Early exit if elements don't exist
  if (!nav || !toggle || !lang) {
    console.warn('ONSNC: Required header elements not found');
    return;
  }

  // ==========================================
  // Utility Functions
  // ==========================================

  /**
   * Debounce function to limit function calls
   */
  function debounce(fn, wait) {
    let timer;
    return function () {
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
      }, wait);
    };
  }

  /**
   * Safe sessionStorage operations with fallback
   */
  const storage = {
    memory: {},
    
    set: function (key, value) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        this.memory[key] = value;
      }
    },
    
    get: function (key) {
      try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        return this.memory.hasOwnProperty(key) ? this.memory[key] : null;
      }
    }
  };

  /**
   * Announce to screen readers
   */
  function announce(message, politeness) {
    politeness = politeness || 'polite';
    let announcer = document.getElementById('onsnc-aria-live');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'onsnc-aria-live';
      announcer.setAttribute('aria-live', politeness);
      announcer.style.position = 'absolute';
      announcer.style.left = '-9999px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = String(message);
  }

  /**
   * Trap focus within a container
   */
  function trapFocus(container) {
    if (!container) return function () {};
    
    const focusable = container.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusable.length) return function () {};
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    function handler(e) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    
    container.addEventListener('keydown', handler);
    
    return function restore() {
      container.removeEventListener('keydown', handler);
    };
  }

  // ==========================================
  // Language Selection
  // ==========================================

  // Restore saved language
  try {
    const savedLang = storage.get('onsnc_lang');
    if (savedLang) {
      lang.value = savedLang;
    }
  } catch (e) {
    console.warn('ONSNC: Could not restore language preference');
  }

  // Handle language change
  lang.addEventListener('change', function () {
    try {
      storage.set('onsnc_lang', lang.value);
    } catch (e) {
      console.warn('ONSNC: Could not save language preference');
    }
    
    // Emit custom event for language change
    const event = new CustomEvent('onsnc:languageChange', {
      detail: { lang: lang.value }
    });
    window.dispatchEvent(event);
    
    // Announce to screen readers
    const selectedText = lang.options[lang.selectedIndex].text;
    announce('Language changed to ' + selectedText, 'polite');
  });

  // ==========================================
  // Navigation Menu Toggle
  // ==========================================

  // Store focus restoration
  nav._restoreFocus = null;
  nav._lastToggleFocus = null;

  /**
   * Set navigation expanded state
   */
  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    nav.classList.toggle('open', !!expanded);
    
    if (expanded) {
      // Store last focused element
      nav._lastToggleFocus = document.activeElement;
      
      // Trap focus on small screens
      if (window.innerWidth < 900) {
        nav._restoreFocus = trapFocus(nav);
        
        // Move focus into nav
        const firstFocusable = nav.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
      
      announce('Navigation opened', 'polite');
      
      // Emit custom event
      window.dispatchEvent(new CustomEvent('onsnc:nav', {
        detail: { action: 'open' }
      }));
    } else {
      // Restore focus trap
      if (nav._restoreFocus) {
        nav._restoreFocus();
        nav._restoreFocus = null;
      }
      
      // Restore focus to toggle or last focused element
      try {
        (nav._lastToggleFocus || toggle).focus();
      } catch (e) {
        toggle.focus();
      }
      
      announce('Navigation closed', 'polite');
      
      // Emit custom event
      window.dispatchEvent(new CustomEvent('onsnc:nav', {
        detail: { action: 'close' }
      }));
    }
  }

  // Toggle button click handler
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isOpen);
  });

  // Close navigation on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        setExpanded(false);
        toggle.focus();
      }
    }
  });

  // Close navigation when clicking outside
  document.addEventListener('click', debounce(function (e) {
    const target = e.target;
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    
    if (isOpen && !nav.contains(target) && !toggle.contains(target)) {
      setExpanded(false);
    }
  }, 90));

  // Reset navigation state on window resize
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth >= 900) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      
      if (nav._restoreFocus) {
        nav._restoreFocus();
        nav._restoreFocus = null;
      }
    }
  }, 120));

  // ==========================================
  // Newsletter Form Handler
  // ==========================================

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const nameInput = newsletterForm.querySelector('input[name="name"]');
      const emailInput = newsletterForm.querySelector('input[name="email"]');
      
      if (nameInput && emailInput) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (name && email) {
          // Show success message
          alert('Thank you ' + name + ' for subscribing to ONSNC Civilization 3.0 updates!');
          
          // Reset form
          newsletterForm.reset();
          
          // Emit custom event for tracking
          window.dispatchEvent(new CustomEvent('onsnc:newsletter', {
            detail: { name: name, email: email }
          }));
        }
      }
    });
  }

  // ==========================================
  // Public API
  // ==========================================

  window.onsncHeader = window.onsncHeader || {};
  
  window.onsncHeader.open = function () {
    setExpanded(true);
  };
  
  window.onsncHeader.close = function () {
    setExpanded(false);
  };
  
  window.onsncHeader.toggle = function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isOpen);
  };

  // ==========================================
  // Analytics Hook (Optional)
  // ==========================================

  // Listen for custom events and send to analytics
  window.addEventListener('onsnc:nav', function (evt) {
    // Example: Google Analytics 4
    // if (window.gtag) {
    //   gtag('event', 'navigation_' + evt.detail.action, {
    //     event_category: 'Navigation',
    //     event_label: 'Main Menu'
    //   });
    // }
    
    // Example: Google Tag Manager
    // if (window.dataLayer) {
    //   window.dataLayer.push({
    //     event: 'onsnc_nav',
    //     action: evt.detail.action
    //   });
    // }
  });

  window.addEventListener('onsnc:languageChange', function (evt) {
    // Track language changes
    // if (window.gtag) {
    //   gtag('event', 'language_change', {
    //     event_category: 'User Preference',
    //     event_label: evt.detail.lang
    //   });
    // }
  });

  window.addEventListener('onsnc:newsletter', function (evt) {
    // Track newsletter subscriptions
    // if (window.gtag) {
    //   gtag('event', 'newsletter_subscription', {
    //     event_category: 'Engagement',
    //     event_label: 'Footer Newsletter'
    //   });
    // }
  });

  // ==========================================
  // Smooth Scroll (Optional Enhancement)
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Close mobile nav if open
        if (window.innerWidth < 900) {
          setExpanded(false);
        }
        
        // Smooth scroll
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
        
        // Focus target for accessibility
        target.focus();
      }
    });
  });

  // ==========================================
  // Console Info
  // ==========================================

  console.log('%c ONSNC Civilization 3.0 ', 'background: #1f5bd8; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log('Global scripts loaded successfully.');
  console.log('Public API available at: window.onsncHeader');

})();
