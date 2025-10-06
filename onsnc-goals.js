/**
 * ONSNC 35 Goals Page - Interactive Functionality
 * Handles animations, scroll effects, and interactive features
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  function initONSNCGoalsPage() {
    
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Goal card hover effects
    initGoalCardEffects();
    
    // Active navigation highlighting
    initActiveNavigation();
    
    // Stats counter animation
    initStatsCounter();
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Intersection Observer for fade-in animations
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe goal cards
    const goalCards = document.querySelectorAll('.goal-card, .civ3-card, .pillar-card');
    goalCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
      observer.observe(card);
    });
  }

  /**
   * Goal card interactive effects
   */
  function initGoalCardEffects() {
    const goalCards = document.querySelectorAll('.goal-card, .civ3-card');
    
    goalCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
      });
      
      // Add click tracking for analytics (placeholder)
      card.addEventListener('click', function(e) {
        const goalNumber = this.getAttribute('data-goal');
        if (goalNumber) {
          console.log('Goal card clicked:', goalNumber);
          // Add analytics tracking here if needed
        }
      });
    });
  }

  /**
   * Highlight active navigation section
   */
  function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) {
      return;
    }

    function updateActiveNav() {
      let currentSection = '';
      const scrollPosition = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.style.backgroundColor = '';
        link.style.color = '';
        
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.style.backgroundColor = '#f3f4f6';
          link.style.color = '#111827';
        }
      });
    }

    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial update
    updateActiveNav();
  }

  /**
   * Animated counter for hero stats
   */
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
      return;
    }

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }

  /**
   * Animate number counting
   */
  function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  /**
   * Add pillar section toggle functionality (optional enhancement)
   */
  function initPillarToggle() {
    const pillarHeaders = document.querySelectorAll('.pillar-header');
    
    pillarHeaders.forEach(header => {
      header.style.cursor = 'pointer';
      
      header.addEventListener('click', function() {
        const section = this.parentElement;
        const goalsGrid = section.querySelector('.goals-grid');
        
        if (goalsGrid) {
          const isHidden = goalsGrid.style.display === 'none';
          goalsGrid.style.display = isHidden ? 'grid' : 'none';
          
          // Add visual indicator
          const title = this.querySelector('.pillar-section-title');
          if (title) {
            title.textContent = isHidden 
              ? title.textContent.replace('▶ ', '') 
              : '▶ ' + title.textContent;
          }
        }
      });
    });
  }

  /**
   * Filter goals by pillar (optional enhancement)
   */
  function initPillarFilter() {
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach(card => {
      card.addEventListener('click', function() {
        const pillarTitle = this.querySelector('.pillar-title').textContent;
        console.log('Filter by pillar:', pillarTitle);
        // Implement filtering logic here if needed
      });
    });
  }

  /**
   * Back to top button
   */
  function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
      } else {
        backToTopBtn.style.opacity = '0';
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }

  /**
   * Print/PDF functionality
   */
  function initPrintHandler() {
    // Add print button if needed
    const ctaButtons = document.querySelector('.cta-buttons');
    if (ctaButtons) {
      const printBtn = document.createElement('a');
      printBtn.href = '#';
      printBtn.className = 'btn-cta btn-secondary';
      printBtn.textContent = 'Download PDF';
      printBtn.style.background = 'linear-gradient(135deg, #7c3aed, #ec4899)';
      
      printBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
      });
      
      // Optionally add to page
      // ctaButtons.appendChild(printBtn);
    }
  }

  /**
   * Mobile menu toggle for responsive navigation
   */
  function initMobileMenu() {
    const quickNav = document.querySelector('.quick-nav');
    
    if (!quickNav) return;
    
    // Check if mobile
    if (window.innerWidth <= 768) {
      const menuToggle = document.createElement('button');
      menuToggle.textContent = '☰';
      menuToggle.style.cssText = `
        display: block;
        background: transparent;
        border: 1px solid #e5e7eb;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
      `;
      
      const headerContent = document.querySelector('.header-content');
      if (headerContent) {
        headerContent.insertBefore(menuToggle, quickNav);
      }
      
      quickNav.style.display = 'none';
      
      menuToggle.addEventListener('click', function() {
        if (quickNav.style.display === 'none') {
          quickNav.style.display = 'flex';
          quickNav.style.flexDirection = 'column';
          quickNav.style.width = '100%';
          this.textContent = '✕';
        } else {
          quickNav.style.display = 'none';
          this.textContent = '☰';
        }
      });
    }
  }

  /**
   * Track goal card interactions for analytics
   */
  function trackGoalInteractions() {
    const goalLinks = document.querySelectorAll('.goal-link, .civ3-link');
    
    goalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const card = this.closest('.goal-card, .civ3-card');
        const goalNumber = card ? card.getAttribute('data-goal') : null;
        const goalTitle = card ? card.querySelector('.goal-title, .civ3-title').textContent : null;
        
        // Log for debugging (replace with actual analytics)
        console.log('Goal explored:', {
          number: goalNumber,
          title: goalTitle,
          timestamp: new Date().toISOString()
        });
        
        // Add your analytics tracking code here
        // Example: gtag('event', 'goal_click', { goal_number: goalNumber });
      });
    });
  }

  /**
   * Progressive loading of goal cards for performance
   */
  function initProgressiveLoading() {
    const pillarSections = document.querySelectorAll('.pillar-section');
    
    const observerOptions = {
      threshold: 0.01,
      rootMargin: '200px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.goal-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    pillarSections.forEach(section => {
      observer.observe(section);
    });
  }

  /**
   * Add search/filter functionality
   */
  function initSearchFilter() {
    // Create search input
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
      margin-top: 24px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search goals...';
    searchInput.style.cssText = `
      width: 100%;
      padding: 12px 20px;
      border: 2px solid #e5e7eb;
      border-radius: 50px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    `;
    
    searchInput.addEventListener('focus', function() {
      this.style.borderColor = '#3b82f6';
    });
    
    searchInput.addEventListener('blur', function() {
      this.style.borderColor = '#e5e7eb';
    });
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const allGoalCards = document.querySelectorAll('.goal-card, .civ3-card');
      
      allGoalCards.forEach(card => {
        const title = card.querySelector('.goal-title, .civ3-title').textContent.toLowerCase();
        const description = card.querySelector('.goal-description, .civ3-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = searchTerm ? 'none' : 'block';
        }
      });
    });
    
    searchContainer.appendChild(searchInput);
    // Uncomment to add search to page:
    // heroContent.appendChild(searchContainer);
  }

  /**
   * Initialize all functionality
   */
  function init() {
    initONSNCGoalsPage();
    initBackToTop();
    initMobileMenu();
    trackGoalInteractions();
    initProgressiveLoading();
    // initSearchFilter(); // Uncomment if you want search functionality
    // initPrintHandler(); // Uncomment if you want print button
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  // Handle window resize for responsive features
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Reinitialize mobile menu if needed
      if (window.innerWidth > 768) {
        const quickNav = document.querySelector('.quick-nav');
        if (quickNav) {
          quickNav.style.display = 'flex';
          quickNav.style.flexDirection = 'row';
          quickNav.style.width = 'auto';
        }
      }
    }, 250);
  });

  // Expose utility functions for external use if needed
  window.ONSNCGoals = {
    scrollToSection: function(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },
    
    filterByPillar: function(pillarName) {
      const allCards = document.querySelectorAll('.goal-card');
      allCards.forEach(card => {
        const pillarClass = Array.from(card.classList).find(c => c.startsWith('goal-'));
        if (pillarClass && pillarClass.includes(pillarName.toLowerCase())) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    },
    
    resetFilters: function() {
      const allCards = document.querySelectorAll('.goal-card, .civ3-card');
      allCards.forEach(card => {
        card.style.display = 'block';
      });
    }
  };

})();

