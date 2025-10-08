// ================= Responsive Header JavaScript =================

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Navigation Toggle =====
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');
    
    if (toggle && menu) {
      // Toggle Menu Function
      const toggleMenu = () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(isOpen));
        
        // Prevent body scroll when menu is open on mobile
        if (window.innerWidth <= 900) {
          document.body.style.overflow = isOpen ? 'hidden' : '';
        }
      };

      // Click Event
      toggle.addEventListener('click', toggleMenu);

      // Keyboard Navigation (Enter/Space)
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });

      // Escape Key - Close Menu
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      // Close Menu When Clicking Outside
      document.addEventListener('click', (e) => {
        const isClickInsideMenu = menu.contains(e.target);
        const isClickOnToggle = toggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      // Close Menu When Clicking on Menu Links (Mobile)
      const menuLinks = menu.querySelectorAll('.menu-link');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 900 && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        });
      });

      // Handle Window Resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Close mobile menu and reset body scroll on desktop
          if (window.innerWidth > 900) {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        }, 250);
      });
    }

    // ===== Sticky Header Effect =====
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class for shadow effect
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });

    // ===== Smooth Scroll for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or "#donate"
        if (href === '#' || href === '#donate') {
          return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu after clicking
          if (window.innerWidth <= 900 && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        }
      });
    });

    // ===== Active Menu Link Highlighting =====
    const sections = document.querySelectorAll('section[id], main[id]');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      menuLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${current}` || (href === 'index.html' && !current)) {
          link.classList.add('active');
        }
      });
    });

    // ===== Donate Button Click Animation =====
    const donateButtons = document.querySelectorAll('.btn-donate');
    
    donateButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // If it's just "#donate", prevent default and show alert
        if (this.getAttribute('href') === '#donate') {
          e.preventDefault();
          alert('Donation page coming soon! Thank you for your interest in supporting ONSNC Foundation.');
        }
      });
    });

    // ===== Accessibility: Trap Focus in Mobile Menu =====
    if (toggle && menu) {
      const focusableElements = menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      menu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && menu.classList.contains('open')) {
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      });
    }

    // ===== Console Welcome Message =====
    console.log('%c🌍 Welcome to ONSNC Foundation!', 'color: #27ae60; font-size: 20px; font-weight: bold;');
    console.log('%cBuilding a better tomorrow through sustainable impact.', 'color: #222; font-size: 14px;');

  });

  // ===== Add Active Link Styles =====
  const style = document.createElement('style');
  style.textContent = `
    .menu-link.active {
      color: #27ae60;
      background: rgba(39, 174, 96, 0.1);
    }
  `;
  document.head.appendChild(style);

})();
