/* ========================================
   CIVILIZATION 2.0 - REFINED INTERACTIONS
   Professional, Smooth, Performance-Optimized
   Namespace: civ2 (no conflicts)
   ======================================== */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    particleCount: 25,
    particleSpeed: { min: 15, max: 25 },
    enableParallax: true,
    enableReveal: true
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCiv2);
  } else {
    initCiv2();
  }

  function initCiv2() {
    const section = document.querySelector('.civ2-section');
    if (!section) return;

    // Initialize all features
    createFloatingParticles();
    initCardInteractions();
    initSmoothReveal();
    initParallaxScroll();
    initButtonEffects();
  }

  /* === FLOATING PARTICLES (SUBTLE) === */
  function createFloatingParticles() {
    const section = document.querySelector('.civ2-section');
    if (!section) return;

    // Create particle container
    const container = document.createElement('div');
    container.className = 'civ2-particles';
    section.insertBefore(container, section.firstChild);

    // Generate particles
    for (let i = 0; i < CONFIG.particleCount; i++) {
      setTimeout(() => createParticle(container), i * 200);
    }
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1.5;
    const startX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * (CONFIG.particleSpeed.max - CONFIG.particleSpeed.min) + CONFIG.particleSpeed.min;
    const drift = (Math.random() - 0.5) * 50;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(0, 119, 255, ${opacity}), transparent);
      border-radius: 50%;
      left: ${startX}%;
      bottom: -20px;
      pointer-events: none;
      animation: civ2-float-${Math.random().toString(36).substr(2, 9)} ${duration}s linear ${delay}s infinite;
      box-shadow: 0 0 ${size * 3}px rgba(0, 119, 255, ${opacity * 0.5});
    `;
    
    // Create unique animation for each particle
    const keyframes = `
      @keyframes civ2-float-${particle.style.animationName.split('-')[2]} {
        0% {
          transform: translateY(0) translateX(0) scale(0);
          opacity: 0;
        }
        10% {
          opacity: ${opacity};
          transform: translateY(-10vh) translateX(0) scale(1);
        }
        90% {
          opacity: ${opacity};
          transform: translateY(-90vh) translateX(${drift}px) scale(1);
        }
        100% {
          transform: translateY(-100vh) translateX(${drift}px) scale(0);
          opacity: 0;
        }
      }
    `;
    
    if (!document.querySelector(`style[data-particle="${particle.style.animationName}"]`)) {
      const style = document.createElement('style');
      style.setAttribute('data-particle', particle.style.animationName);
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
    
    container.appendChild(particle);
  }

  /* === CARD INTERACTIONS === */
  function initCardInteractions() {
    const cards = document.querySelectorAll('.civ2-card');
    
    cards.forEach(card => {
      // Subtle 3D tilt effect
      card.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5; // Subtle rotation
        const rotateY = ((centerX - x) / centerX) * 5;
        
        card.style.transform = `
          translateY(-12px) 
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });

      // Icon pulse on hover
      const icon = card.querySelector('.civ2-card-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          icon.style.animation = 'civ2-icon-pulse 0.6s ease';
        });
        card.addEventListener('mouseleave', () => {
          icon.style.animation = '';
        });
      }
    });

    // Add icon pulse animation
    if (!document.querySelector('style[data-anim="icon-pulse"]')) {
      const style = document.createElement('style');
      style.setAttribute('data-anim', 'icon-pulse');
      style.textContent = `
        @keyframes civ2-icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* === SMOOTH REVEAL ON SCROLL === */
  function initSmoothReveal() {
    if (!CONFIG.enableReveal) return;

    const elements = document.querySelectorAll('.civ2-card, .civ2-header');
    
    // Set initial state
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    // Intersection Observer for reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /* === PARALLAX SCROLL EFFECT === */
  function initParallaxScroll() {
    if (!CONFIG.enableParallax || window.innerWidth < 768) return;

    const section = document.querySelector('.civ2-section');
    if (!section) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Only apply when section is visible
      if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const offset = ((scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight)) * 50;
        section.style.backgroundPosition = `center ${offset}px`;
      }
      
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* === BUTTON EFFECTS === */
  function initButtonEffects() {
    const buttons = document.querySelectorAll('.civ2-btn');
    
    buttons.forEach(button => {
      // Ripple effect on click
      button.addEventListener('click', function(e) {
        createRipple(e, this);
      });

      // Magnetic effect on hover (desktop only)
      if (window.innerWidth >= 768) {
        button.addEventListener('mousemove', function(e) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          button.style.transform = `translateY(-3px) translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function() {
          button.style.transform = '';
        });
      }
    });
  }

  function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      pointer-events: none;
      z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Animate
    requestAnimationFrame(() => {
      ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
    
    setTimeout(() => ripple.remove(), 600);
  }

  /* === PERFORMANCE OPTIMIZATION === */
  
  // Reduce particle count on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    CONFIG.particleCount = 15;
  }

  // Disable expensive effects on mobile
  if (window.innerWidth < 768) {
    CONFIG.enableParallax = false;
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    const particles = document.querySelector('.civ2-particles');
    if (particles) particles.remove();
  });

})();

