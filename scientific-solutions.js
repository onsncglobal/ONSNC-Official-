// Solutions Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add animation to solution cards when they come into view
  const solutionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const solutionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, solutionObserverOptions);
  
  // Observe solution cards for animation
  document.querySelectorAll('.solution-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    solutionObserver.observe(card);
  });
  
  // Add staggered animation to methodology steps
  const methodologyObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = document.querySelectorAll('.methodology-step');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.1 });
  
  const methodologySection = document.querySelector('.methodology');
  if (methodologySection) {
    methodologyObserver.observe(methodologySection);
    
    // Set initial state for animation
    document.querySelectorAll('.methodology-step').forEach(step => {
      step.style.opacity = '0';
      step.style.transform = 'translateX(-20px)';
      step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
  
  // Add interactive features to solution cards
  document.querySelectorAll('.solution-card').forEach(card => {
    // Add click effect
    card.addEventListener('click', function(e) {
      if (!e.target.closest('.solution-link')) {
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
  
  // Add smooth scrolling for solution links
  document.querySelectorAll('.solution-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // In a real implementation, this would navigate to detailed solution pages
      // For demo purposes, we'll show an alert
      const solutionName = this.closest('.solution-card').querySelector('h3').textContent;
      alert(`This would navigate to the detailed implementation page for: ${solutionName}`);
    });
  });
  
  // Add statistics counter animation
  const statElements = document.querySelectorAll('.stat-number');
  const heroStatsSection = document.querySelector('.hero-stats');
  
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statElements.forEach(stat => {
          const target = parseInt(stat.textContent);
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
          }, 30);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
  }
});

