// ================= NGO Section JavaScript (Enhanced & Conflict Free) =================

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNGOSection);
  } else {
    initNGOSection();
  }
  
  function initNGOSection() {
    // Check if NGO section exists
    const ngoSection = document.getElementById('ngo-section');
    if (!ngoSection) return;
    
    // Scroll Animation Observer
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Animate Cards on Scroll - Only NGO cards
    const ngoCards = ngoSection.querySelectorAll('.ngo-card');
    ngoCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(card);
    });

    // Animate Stats on Scroll - Only NGO stats
    const ngoStatItems = ngoSection.querySelectorAll('.ngo-stat-item');
    ngoStatItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.12}s`;
      observer.observe(item);
    });

    // Enhanced Card Link Interactions - Only NGO card links
    const ngoCardLinks = ngoSection.querySelectorAll('.ngo-card-link');
    ngoCardLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(155, 89, 182, 0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: ngoRipple 0.6s ease-out;
          pointer-events: none;
          left: 50%;
          top: 50%;
          margin-left: -${size/2}px;
          margin-top: -${size/2}px;
        `;
        
        const parent = this.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Enhanced Button Click Animation - Only NGO button
    const ngoBtnRead = ngoSection.querySelector('.ngo-btn-read');
    if (ngoBtnRead) {
      // Click animation
      ngoBtnRead.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.96) translateY(-5px)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });

      // Add particle effect on hover
      ngoBtnRead.addEventListener('mouseenter', function() {
        createParticles(this);
      });
    }

    // Particle effect for button
    function createParticles(button) {
      const particleCount = 6;
      const rect = button.getBoundingClientRect();
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
          position: fixed;
          width: 6px;
          height: 6px;
          background: #2E86DE;
          border-radius: 50%;
          pointer-events: none;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          z-index: 9999;
          animation: ngoParticle 0.8s ease-out forwards;
        `;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
    }

    // Smooth Parallax Effect on Scroll - Only for NGO section
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          const sectionTop = ngoSection.offsetTop;
          const sectionHeight = ngoSection.offsetHeight;
          
          if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const parallaxSpeed = (scrolled - sectionTop) * 0.3;
            const bgElements = ngoSection.querySelectorAll('::before, ::after');
            ngoSection.style.backgroundPosition = `center ${parallaxSpeed}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    // Enhanced Card Icon Animations - Only NGO card icons
    const ngoCardIcons = ngoSection.querySelectorAll('.ngo-card-icon');
    ngoCardIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.animation = 'ngoPulse 0.5s ease, ngoRotate 0.5s ease';
      });
      
      icon.addEventListener('animationend', function() {
        this.style.animation = '';
      });
    });

    // Badge floating animation enhancement
    const badge = ngoSection.querySelector('.ngo-section-badge');
    if (badge) {
      let badgeHoverTimer;
      badge.addEventListener('mouseenter', function() {
        clearTimeout(badgeHoverTimer);
        this.style.animation = 'badgePulse 0.5s ease';
      });
      
      badge.addEventListener('mouseleave', function() {
        badgeHoverTimer = setTimeout(() => {
          this.style.animation = 'badgePulse 3s ease-in-out infinite';
        }, 500);
      });
    }

    // Add CSS animations specific to NGO section
    if (!document.getElementById('ngo-section-animations')) {
      const style = document.createElement('style');
      style.id = 'ngo-section-animations';
      style.textContent = `
        @keyframes ngoRipple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes ngoPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        
        @keyframes ngoRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.15);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }
        
        @keyframes ngoParticle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Add intersection observer for header animation
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease';
        }
      });
    }, { threshold: 0.3 });

    const sectionHeader = ngoSection.querySelector('.ngo-section-header');
    if (sectionHeader) {
      headerObserver.observe(sectionHeader);
    }

    // Add fadeInUp animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(fadeStyle);
  }
  
})();

