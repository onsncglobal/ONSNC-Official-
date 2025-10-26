// ========================================
// ONSNC Navigation System - Complete
// ========================================

// Navigation Elements
const toggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary');

if (toggle && primaryNav) {
  // Toggle menu function
  const toggleMenu = () => {
    const isOpen = primaryNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
    
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Click event on toggle button
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Keyboard support (Enter/Space keys)
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (primaryNav.classList.contains('open')) {
      if (!primaryNav.contains(e.target) && !toggle.contains(e.target)) {
        primaryNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
        document.body.style.overflow = '';
      }
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  // Close menu when clicking on any menu link
  const menuLinks = primaryNav.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
      document.body.style.overflow = '';
    });
  });
}

// ========================================
// Language Switcher Functionality
// ========================================
const langSelect = document.getElementById('lang-select');

if (langSelect) {
  // Load saved language preference
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  langSelect.value = savedLang;

  // Language change handler
  langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('selectedLanguage', selectedLang);
    
    // Update page language attribute
    document.documentElement.lang = selectedLang;
    
    // You can add translation logic here
    console.log(`Language changed to: ${selectedLang}`);
    
    // Optional: Show confirmation
    const langNames = {
      'en': 'English',
      'hi': 'हिन्दी',
      'as': 'অসমীয়া'
    };
    
    // Update brand text based on language
    updateBrandText(selectedLang);
  });
}

// Update brand text based on language
function updateBrandText(lang) {
  const brand = document.getElementById('onsnc-brand');
  if (brand) {
    const translations = {
      'en': 'Welcome to ONSNC Foundation',
      'hi': 'ONSNC फाउंडेशन में आपका स्वागत है',
      'as': 'ONSNC ফাউণ্ডেশ্যনলৈ স্বাগতম'
    };
    brand.textContent = translations[lang] || translations['en'];
  }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip empty anchors
    if (href === '#' || href === '#!') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      // Close menu if open
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰';
        }
        document.body.style.overflow = '';
      }
      
      // Calculate offset for sticky header
      const headerHeight = document.querySelector('.main-header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Active Page Link Highlighting
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.menu a');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.style.background = 'rgba(79, 70, 229, 0.1)';
    link.style.color = '#4f46e5';
    link.style.fontWeight = '700';
    link.style.borderLeft = '4px solid #4f46e5';
    link.style.paddingLeft = '24px';
  }
});

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0;
const header = document.querySelector('.main-header');

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Enhanced shadow on scroll
    if (currentScroll > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// Responsive Behavior Handler
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close menu on resize if open
    if (primaryNav && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
      document.body.style.overflow = '';
    }
  }, 250);
});

// ========================================
// Footer Newsletter Form Handler
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = form.name.value.trim();
      const email = form.email.value.trim();

      // Validation
      if (!name || !email) {
        showNotification("Please enter your name and email.", "error");
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Success message
      showNotification(`Thank you, ${name}! You are now subscribed to Civilization 3.0 updates.`, "success");
      
      // Reset form
      form.reset();
    });
  }

  // Initialize language on page load
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  updateBrandText(savedLang);
});

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: '9999',
    fontWeight: '600',
    fontSize: '14px',
    maxWidth: '300px',
    animation: 'slideIn 0.3s ease'
  });

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// Accessibility Focus Management
// ========================================
if (primaryNav && toggle) {
  const focusableElements = primaryNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
  
  if (focusableElements.length > 0) {
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    primaryNav.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && primaryNav.classList.contains('open')) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
  }
}

// ========================================
// Console Branding
// ========================================
console.log('%c🌐 ONSNC CIVILIZATION 3.0', 'color: #4f46e5; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(79,70,229,0.3);');
console.log('%cBuilding the Future Together', 'color: #7c3aed; font-size: 14px; font-weight: 600;');
console.log('%c✓ Navigation system loaded', 'color: #10b981; font-size: 12px;');
console.log('%c✓ Multi-language support active', 'color: #10b981; font-size: 12px;');
console.log('%c✓ Responsive design ready', 'color: #10b981; font-size: 12px;');


// 🌙 Detect System Theme + Load Saved Theme
function getPreferredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌓';
}

// Initialize Theme
applyTheme(getPreferredTheme());

// Toggle Theme Button
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const current = document.body.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// 📱 Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('primary-nav');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// 🌐 Language Switcher
const langSelect = document.getElementById('lang-select');
const translations = {
  en: 'Welcome to ONSNC Civilization 3.0',
  hi: 'ONSNC सभ्यता 3.0 में आपका स्वागत है',
  as: 'ONSNC সভ্যতা 3.0লৈ স্বাগতম'
};
langSelect.addEventListener('change', e => {
  alert(translations[e.target.value]);
});

// 🧠 Shrink Header on Scroll
const header = document.getElementById('onsnc-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

