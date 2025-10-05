// ================= NGO Section JavaScript (Conflict Free) =================

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
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
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
      item.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(item);
    });

    // Smooth Scroll for Card Links - Only NGO card links
    const ngoCardLinks = ngoSection.querySelectorAll('.ngo-card-link');
    ngoCardLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Don't prevent default - let the link work normally
        // Just add visual effect
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(102, 126, 234, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ngoRipple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const parent = this.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Button Click Animation - Only NGO button
    const ngoBtnRead = ngoSection.querySelector('.ngo-btn-read');
    if (ngoBtnRead) {
      ngoBtnRead.addEventListener('click', function(e) {
        // Don't prevent default - let the link work
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    }

    // Parallax Effect on Scroll - Only for NGO section
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          const sectionTop = ngoSection.offsetTop;
          const sectionHeight = ngoSection.offsetHeight;
          
          if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const parallaxSpeed = (scrolled - sectionTop) * 0.5;
            ngoSection.style.backgroundPosition = `center ${parallaxSpeed}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    // Card Icon Pulse Effect - Only NGO card icons
    const ngoCardIcons = ngoSection.querySelectorAll('.ngo-card-icon');
    ngoCardIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.animation = 'ngoPulse 0.5s ease';
      });
      
      icon.addEventListener('animationend', function() {
        this.style.animation = '';
      });
    });

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
            transform: scale(1.1);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
})();
