// Mobile navigation toggle functionality
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
const centerSection = document.querySelector('.center-section');
const primaryNav = document.querySelector('.primary');
const mainHeader = document.querySelector('.main-header');

if (toggle && menu) {
  // Toggle menu function
  const toggleMenu = () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
    
    // Show/hide slogan on mobile
    if (centerSection) {
      if (isOpen) {
        centerSection.classList.add('mobile-show');
        primaryNav.classList.add('mobile-show');
      } else {
        centerSection.classList.remove('mobile-show');
        primaryNav.classList.remove('mobile-show');
      }
    }
  };

  // Click event on toggle button
  toggle.addEventListener('click', toggleMenu);

  // Keyboard support (Enter/Space keys)
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && 
        !menu.contains(e.target) && 
        !toggle.contains(e.target) &&
        !centerSection.contains(e.target)) {
      menu.classList.remove('open');
      centerSection.classList.remove('mobile-show');
      primaryNav.classList.remove('mobile-show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      centerSection.classList.remove('mobile-show');
      primaryNav.classList.remove('mobile-show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });

  // Close menu when clicking on menu links
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove('open');
        centerSection.classList.remove('mobile-show');
        primaryNav.classList.remove('mobile-show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      // Close menu if open before scrolling
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        if (centerSection) centerSection.classList.remove('mobile-show');
        if (primaryNav) primaryNav.classList.remove('mobile-show');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰';
        }
      }
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active state to current page link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.menu a');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.style.background = 'rgba(79, 70, 229, 0.1)';
    link.style.color = '#4f46e5';
  }
});

// Header scroll effect
let lastScroll = 0;
const headerTop = document.querySelector('.header-top');
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 10) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
  }
  
  lastScroll = currentScroll;
});

// Handle responsive behavior
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // Reset mobile menu on desktop resize
    if (menu) menu.classList.remove('open');
    if (centerSection) centerSection.classList.remove('mobile-show');
    if (primaryNav) primaryNav.classList.remove('mobile-show');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  }
});
