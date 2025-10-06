// Scientific & Practical Solutions Page Specific JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }

  // Initialize animations
  initAnimations();
});

// Animation initialization
function initAnimations() {
  // Solution cards animation
  const solutionsObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const solutionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        solutionsObserver.unobserve(entry.target);
      }
    });
  }, solutionsObserverOptions);

  // Observe solution cards for animation
  document.querySelectorAll('.solution-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    solutionsObserver.observe(card);
  });

  // Methodology steps animation
  const methodologyObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const methodologyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        methodologyObserver.unobserve(entry.target);
      }
    });
  }, methodologyObserverOptions);

  // Observe methodology steps for animation
  document.querySelectorAll('.methodology-step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    methodologyObserver.observe(step);
  });

  // Case studies animation
  const caseObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        caseObserver.unobserve(entry.target);
      }
    });
  }, caseObserverOptions);

  // Observe case studies for animation
  document.querySelectorAll('.case-study').forEach((caseStudy, index) => {
    caseStudy.style.opacity = '0';
    caseStudy.style.transform = 'translateY(30px)';
    caseStudy.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    caseObserver.observe(caseStudy);
  });

  // Hero stats counter animation
  const statsObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, statsObserverOptions);

  // Observe stats section
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Page load animation for hero
  const heroSection = document.querySelector('.solutions-hero');
  if (heroSection) {
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(30px)';
    heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
      heroSection.style.opacity = '1';
      heroSection.style.transform = 'translateY(0)';
    }, 300);
  }
}

// Counter animation function
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCount();
  });
}

