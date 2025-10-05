// Implementation Pathways Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add animation to pathway cards when they come into view
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
  
  // Observe pathway cards for animation
  document.querySelectorAll('.pathway-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
  
  // Add animation to region cards
  document.querySelectorAll('.region-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
  
  // Animate timeline phases
  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const phases = document.querySelectorAll('.timeline-phase.detailed');
        phases.forEach((phase, index) => {
          setTimeout(() => {
            phase.style.opacity = '1';
            phase.style.transform = 'translateX(0)';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.1 });
  
  const timelineSection = document.querySelector('.implementation-timeline');
  if (timelineSection) {
    timelineObserver.observe(timelineSection);
    
    // Set initial state for animation
    document.querySelectorAll('.timeline-phase.detailed').forEach(phase => {
      phase.style.opacity = '0';
      phase.style.transform = 'translateX(-20px)';
      phase.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
  
  // Add interactive features to pathway cards
  document.querySelectorAll('.pathway-card').forEach(card => {
    // Add click effect
    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      setTimeout(() => {
        this.style.transform = 'translateY(-10px)';
      }, 150);
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
          if (stat.textContent === '12') {
            target = 12;
          } else if (stat.textContent === '47') {
            target = 47;
          } else {
            target = 2030;
          }
          
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              stat.textContent = current.toFixed(0);
            } else {
              stat.textContent = Math.floor(current);
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
  
  // Add progress bar animation
  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = document.querySelectorAll('.timeline-progress');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease-in-out';
          }, 100);
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const pathwaysSection = document.querySelector('.pathways-grid');
  if (pathwaysSection) {
    progressObserver.observe(pathwaysSection);
  }
  
  // Add milestone completion animation
  const milestoneObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach((milestone, index) => {
          setTimeout(() => {
            milestone.style.opacity = '1';
            milestone.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const milestonesSection = document.querySelector('.phase-milestones');
  if (milestonesSection) {
    milestoneObserver.observe(milestonesSection);
    
    document.querySelectorAll('.milestone').forEach(milestone => {
      milestone.style.opacity = '0';
      milestone.style.transform = 'translateX(-20px)';
      milestone.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
  
  // Enhanced accessibility features
  document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Tab') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('pathway-card') || 
          focusedElement.classList.contains('region-card')) {
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
  
  // Add current phase highlighting
  const currentPhase = document.querySelector('.timeline-phase.current');
  if (currentPhase) {
    setInterval(() => {
      currentPhase.style.boxShadow = currentPhase.style.boxShadow ? 
        '' : '0 0 20px rgba(0, 200, 150, 0.3)';
    }, 2000);
  }
});

