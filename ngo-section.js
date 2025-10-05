// NGO Section JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNGOSection();
});

function initializeNGOSection() {
  const ngoSection = document.getElementById('ngo-section');
  
  if (!ngoSection) {
    console.warn('NGO section not found');
    return;
  }
  
  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // If it's a stat item, also animate the icon
        if (entry.target.classList.contains('ngo-stat-item')) {
          animateStatIcon(entry.target);
        }
      }
    });
  }, observerOptions);

  // Animate Cards on Scroll
  const ngoCards = document.querySelectorAll('.ngo-card');
  ngoCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Animate Stats on Scroll
  const ngoStatItems = document.querySelectorAll('.ngo-stat-item');
  ngoStatItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Card Link Interactions
  const ngoCardLinks = document.querySelectorAll('.ngo-card-link');
  ngoCardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if it's a hash link
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
      }
      
      // Add ripple effect
      createRippleEffect(this);
    });
  });

  // Button Click Animation
  const ngoBtnRead = document.querySelector('.ngo-btn-read');
  if (ngoBtnRead) {
    ngoBtnRead.addEventListener('click', function(e) {
      // Only prevent default if it's a hash link
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
      }
      
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }

  // Card Icon Hover Effects
  const ngoCardIcons = document.querySelectorAll('.ngo-card-icon');
  ngoCardIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.animation = 'ngo-pulse 0.5s ease';
    });
    
    icon.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });

  // Initialize section when it comes into view
  const ngoSectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initializeParallaxEffect();
      }
    });
  }, { threshold: 0.1 });

  ngoSectionObserver.observe(ngoSection);
}

// Helper function for ripple effect
function createRippleEffect(element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.position = 'absolute';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.background = 'rgba(0, 114, 206, 0.3)';
  ripple.style.borderRadius = '50%';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ngo-ripple 0.6s ease-out';
  ripple.style.pointerEvents = 'none';
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Helper function for stat icon animation
function animateStatIcon(statItem) {
  const statNumber = statItem.querySelector('.ngo-stat-number');
  if (statNumber) {
    statNumber.style.transform = 'scale(0)';
    statNumber.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
      statNumber.style.transform = 'scale(1)';
    }, 200);
  }
}

// Parallax effect for background
function initializeParallaxEffect() {
  const ngoSection = document.getElementById('ngo-section');
  
  if (!ngoSection) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const sectionTop = ngoSection.offsetTop;
    const sectionHeight = ngoSection.offsetHeight;
    
    if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
      const parallaxSpeed = (scrolled - sectionTop) * 0.3;
      ngoSection.style.backgroundPosition = `center ${parallaxSpeed}px`;
    }
  });
}

// Export functions for global access if needed
window.NGOSection = {
  initialize: initializeNGOSection,
  createRippleEffect: createRippleEffect,
  animateStatIcon: animateStatIcon
};


