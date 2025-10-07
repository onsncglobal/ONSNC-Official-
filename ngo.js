// ================= NGO Page JavaScript (Fixed - No Overlap Issues) =================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Mobile Navigation Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ===== Sticky Header on Scroll =====
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== Smooth Scroll for Anchor Links =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll Animation Observer =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  const animateElements = document.querySelectorAll('.project-card, .impact-card, .involvement-card, .stat-box');
  
  animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(element);
  });

  // Add animate-in class styles dynamically
  if (!document.getElementById('animate-styles')) {
    const style = document.createElement('style');
    style.id = 'animate-styles';
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== Card Hover Effects =====
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ===== Button Click Ripple Effect =====
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Ripple effect styles
  if (!document.getElementById('ripple-styles')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-styles';
    rippleStyle.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);
  }

  // ===== Hero Section Parallax Effect =====
  const hero = document.getElementById('ngo-hero');
  
  if (hero) {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          
          // Only apply parallax if we're still in hero section
          if (scrolled < hero.offsetHeight) {
            const parallaxSpeed = scrolled * 0.5;
            const overlay = hero.querySelector('.hero-overlay');
            if (overlay) {
              overlay.style.transform = `translateY(${parallaxSpeed}px)`;
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ===== Counter Animation for Stats (if needed in future) =====
  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  // ===== Lazy Loading Images (if images are added) =====
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== Form Validation (for contact forms if added) =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add your form validation and submission logic here
      const formData = new FormData(this);
      
      // Example: Show success message
      showNotification('Thank you! We will get back to you soon.', 'success');
    });
  });

  // ===== Notification System =====
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : '#f44336'};
      color: white;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ===== Active Navigation Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== Card Link Click Animation =====
  const cardLinks = document.querySelectorAll('.card-link');
  
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if it's a # link
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      
      // Add bounce animation
      this.style.animation = 'bounce 0.5s ease';
      
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
    });
  });

  // ===== Scroll to Top Button =====
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #9B59B6, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(155, 89, 182, 0.3);
    z-index: 1000;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });

  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });

  // ===== Additional Animation Styles =====
  if (!document.getElementById('additional-animations')) {
    const additionalStyles = document.createElement('style');
    additionalStyles.id = 'additional-animations';
    additionalStyles.textContent = `
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
    document.head.appendChild(additionalStyles);
  }

  // ===== Console Welcome Message =====
  console.log('%c🌍 Welcome to ONSNC Foundation!', 'color: #9B59B6; font-size: 20px; font-weight: bold;');
  console.log('%cJoin us in creating sustainable impact!', 'color: #764ba2; font-size: 14px;');

});

// ===== Prevent Scroll Issues (Critical Fix) =====
// Ensure all sections have proper positioning
document.addEventListener('DOMContentLoaded', function() {
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    section.style.position = 'relative';
    section.style.zIndex = '2';
  });
  
  // Ensure hero doesn't have fixed/sticky positioning
  const hero = document.getElementById('ngo-hero');
  if (hero) {
    hero.style.position = 'relative';
    hero.style.zIndex = '1';
  }
});

