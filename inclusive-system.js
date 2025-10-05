// Inclusive System Design Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add animation to inclusive cards when they come into view
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, cardObserverOptions);
  
  // Observe inclusive cards for animation
  document.querySelectorAll('.inclusive-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
  
  // Add staggered animation to framework steps
  const frameworkObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = document.querySelectorAll('.framework-step');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.1 });
  
  const frameworkSection = document.querySelector('.implementation-framework');
  if (frameworkSection) {
    frameworkObserver.observe(frameworkSection);
    
    // Set initial state for animation
    document.querySelectorAll('.framework-step').forEach(step => {
      step.style.opacity = '0';
      step.style.transform = 'translateX(-20px)';
      step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
  
  // Animate the inclusion wheel
  const wheelObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const wheel = document.querySelector('.inclusion-wheel');
        wheel.style.transform = 'rotate(360deg)';
        wheel.style.transition = 'transform 2s ease';
        
        setTimeout(() => {
          wheel.style.transform = 'rotate(0deg)';
        }, 2000);
      }
    });
  }, { threshold: 0.5 });
  
  const wheelSection = document.querySelector('.framework-visual');
  if (wheelSection) {
    wheelObserver.observe(wheelSection);
  }
  
  // Add interactive features to cards
  document.querySelectorAll('.inclusive-card').forEach(card => {
    // Add click effect
    card.addEventListener('click', function(e) {
      if (!e.target.closest('.case-link')) {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
          this.style.transform = 'translateY(-10px)';
        }, 150);
      }
    });
    
    // Add focus state for accessibility
    card.addEventListener('focus', function() {
      this.style.boxShadow = '0 10px 25px rgba(0, 114, 206, 0.2)';
    });
    
    card.addEventListener('blur', function() {
      this.style.boxShadow = 'var(--card-shadow)';
    });
  });
  
  // Add statistics counter animation
  const statElements = document.querySelectorAll('.stat-number');
  const heroStatsSection = document.querySelector('.hero-stats');
  
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statElements.forEach(stat => {
          let target;
          if (stat.textContent.includes('B')) {
            target = 7.9;
          } else if (stat.textContent.includes('+')) {
            target = 190;
          } else {
            target = 100;
          }
          
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              stat.textContent = current.toFixed(target === 7.9 ? 1 : 0) + 
                (stat.textContent.includes('B') ? 'B' : 
                 stat.textContent.includes('+') ? '+' : '%');
            } else {
              stat.textContent = current.toFixed(target === 7.9 ? 1 : 0) + 
                (stat.textContent.includes('B') ? 'B' : 
                 stat.textContent.includes('+') ? '+' : '%');
            }
          }, 30);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
  }
  
  // Add animation to principles
  const principlesObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const principles = document.querySelectorAll('.principle');
        principles.forEach((principle, index) => {
          setTimeout(() => {
            principle.style.opacity = '1';
            principle.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const principlesSection = document.querySelector('.principles-grid');
  if (principlesSection) {
    principlesObserver.observe(principlesSection);
    
    document.querySelectorAll('.principle').forEach(principle => {
      principle.style.opacity = '0';
      principle.style.transform = 'translateY(20px)';
      principle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
  
  // Enhanced accessibility features
  document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Tab') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('inclusive-card')) {
        focusedElement.style.outline = '2px solid var(--accent-blue)';
        focusedElement.style.outlineOffset = '2px';
      }
    }
  });
  
  // Add skip to content link for screen readers
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.position = 'absolute';
  skipLink.style.left = '-10000px';
  skipLink.style.top = 'auto';
  skipLink.style.width = '1px';
  skipLink.style.height = '1px';
  skipLink.style.overflow = 'hidden';
  skipLink.style.backgroundColor = 'var(--primary-blue)';
  skipLink.style.color = 'white';
  skipLink.style.padding = '10px';
  skipLink.style.zIndex = '10000';
  
  skipLink.addEventListener('focus', function() {
    this.style.left = '10px';
    this.style.top = '10px';
    this.style.width = 'auto';
    this.style.height = 'auto';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content id for skip link
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.id = 'main-content';
  }
});

