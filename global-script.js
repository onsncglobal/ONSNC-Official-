// ========================================
// ONSNC Header Navigation - Complete JS
// ========================================

// Mobile navigation toggle functionality
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
const primaryNav = document.querySelector('.primary');
const buttonRow = document.querySelector('.nav-buttons-row');

if (toggle && menu) {
  // Toggle menu function
  const toggleMenu = () => {
    const isOpen = primaryNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
    
    // Show/hide buttons and menu
    if (buttonRow) {
      buttonRow.classList.toggle('show', isOpen);
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
    if (primaryNav && primaryNav.classList.contains('open')) {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && 
          (!buttonRow || !buttonRow.contains(e.target))) {
        primaryNav.classList.remove('open');
        if (buttonRow) buttonRow.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      if (buttonRow) buttonRow.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });

  // Close menu when clicking on menu links
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      if (buttonRow) buttonRow.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip empty anchors
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      // Close menu if open before scrolling
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (buttonRow) buttonRow.classList.remove('show');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰';
        }
      }
      
      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
    link.style.fontWeight = '600';
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
    
    // Only modify shadow for depth effect
    if (currentScroll > 10) {
      header.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }
    
    // Keep background white always
    header.style.backgroundColor = '#ffffff';
    
    lastScroll = currentScroll;
  });
}

// ========================================
// Responsive Behavior Handler
// ========================================
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // Reset mobile menu on desktop resize
    if (primaryNav) primaryNav.classList.remove('open');
    if (buttonRow) buttonRow.classList.remove('show');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  }
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
        alert("Please enter your name and email.");
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Success message
      alert(`Thank you, ${name}! You are now subscribed to Civilization 3.0 updates.`);
      
      // Reset form
      form.reset();
    });
  }
});

// ========================================
// Accessibility Enhancements
// ========================================

// Focus trap for mobile menu
if (primaryNav && toggle) {
  const focusableElements = primaryNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
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

// ========================================
// Performance: Debounced Resize Handler
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Add any resize-specific optimizations here
    console.log('Window resized - layout updated');
  }, 250);
});

// ========================================
// Console Info
// ========================================
console.log('%c🌐 ONSNC Civilization 3.0', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
console.log('%cBuilding the Future Together', 'color: #7c3aed; font-size: 12px;');
console.log('Navigation system loaded successfully ✓');
