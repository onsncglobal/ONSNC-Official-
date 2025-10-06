// Civilization 2.0 Vision Page Specific JavaScript

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
  // Timeline animation
  const timelineObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, timelineObserverOptions);

  // Observe timeline items for animation
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    
    // Alternate direction for animation
    if (index % 2 === 0) {
      item.style.transform = 'translateX(-50px)';
    } else {
      item.style.transform = 'translateX(50px)';
    }
    
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
  });

  // Pillar cards animation
  const pillarObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        pillarObserver.unobserve(entry.target);
      }
    });
  }, pillarObserverOptions);

  // Observe pillar cards for animation
  document.querySelectorAll('.pillar-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    pillarObserver.observe(card);
  });

  // Vision overview animation
  const visionObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const visionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        visionObserver.unobserve(entry.target);
      }
    });
  }, visionObserverOptions);

  // Observe vision overview elements
  document.querySelectorAll('.vision-text, .vision-image').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    visionObserver.observe(element);
  });

  // Vision stats counter animation
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
  const statsSection = document.querySelector('.vision-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Page load animation for header
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.style.opacity = '0';
    pageHeader.style.transform = 'translateY(30px)';
    pageHeader.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
      pageHeader.style.opacity = '1';
      pageHeader.style.transform = 'translateY(0)';
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
