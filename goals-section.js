/**
 * ONSNC Civilization 3.0 - 50 Goals Section
 * Interactive Functionality for Category Filtering and Card Display
 */

(function() {
  'use strict';
  
  /**
   * Initialize the Civilization 3.0 Goals section
   */
  function initCiv3GoalsSection() {
    const categoryButtons = document.querySelectorAll('.civ3-category-btn');
    const goalCards = document.querySelectorAll('.civ3-goal-card');
    
    // Verify elements exist
    if (categoryButtons.length === 0 || goalCards.length === 0) {
      console.warn('Civ3 Goals: Required DOM elements not found');
      return;
    }
    
    // Initialize scroll animations
    initScrollAnimations(goalCards);
    
    // Setup category filtering
    setupCategoryFiltering(categoryButtons, goalCards);
    
    // Initialize on load
    filterGoals('all-goals', goalCards);
  }

  /**
   * Setup smooth scroll animations for goal cards
   * @param {NodeList} goalCards - All goal card elements
   */
  function initScrollAnimations(goalCards) {
    // Use Intersection Observer if available
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      goalCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      return;
    }

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

    goalCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
      observer.observe(card);
    });
  }

  /**
   * Setup category button filtering
   * @param {NodeList} categoryButtons - All category button elements
   * @param {NodeList} goalCards - All goal card elements
   */
  function setupCategoryFiltering(categoryButtons, goalCards) {
    categoryButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const category = this.getAttribute('data-category');
        
        // Update active button state
        updateActiveButton(this, categoryButtons);
        
        // Filter cards
        filterGoals(category, goalCards);
      });
    });
  }

  /**
   * Update active button styling
   * @param {HTMLElement} activeButton - The clicked button
   * @param {NodeList} allButtons - All category buttons
   */
  function updateActiveButton(activeButton, allButtons) {
    allButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    activeButton.classList.add('active');
  }

  /**
   * Filter goal cards by category
   * @param {string} category - Category to filter by
   * @param {NodeList} goalCards - All goal card elements
   */
  function filterGoals(category, goalCards) {
    let visibleCount = 0;

    goalCards.forEach(function(card) {
      const cardCategory = card.getAttribute('data-category');
      
      let shouldShow = false;
      
      if (category === 'all-goals') {
        shouldShow = true;
      } else {
        shouldShow = (cardCategory === category);
      }
      
      // Show or hide card
      if (shouldShow) {
        card.style.display = 'block';
        visibleCount++;
        
        // Animate card entrance
        setTimeout(function() {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        // Animate card exit
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
          card.style.display = 'none';
        }, 200);
      }
    });
    
    // Log filter action
    console.log(`Filtered by category: ${category} - ${visibleCount} cards visible`);
  }

  /**
   * Add smooth scroll behavior for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
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
   * Track goal card interactions
   */
  function trackGoalInteractions() {
    const goalCards = document.querySelectorAll('.civ3-goal-card');
    
    goalCards.forEach(card => {
      card.addEventListener('click', function() {
        const goalNumber = this.querySelector('.goal-number-badge span').textContent;
        const goalTitle = this.querySelector('.goal-card-title').textContent;
        const goalCategory = this.getAttribute('data-category');
        
        // Log interaction (replace with actual analytics)
        console.log('Goal Card Interaction:', {
          number: goalNumber,
          title: goalTitle,
          category: goalCategory,
          timestamp: new Date().toISOString()
        });
        
        // Add your analytics tracking here
        // Example: gtag('event', 'goal_card_click', { goal_number: goalNumber });
      });
    });
  }

  /**
   * Add keyboard navigation support
   */
  function initKeyboardNavigation() {
    const categoryButtons = document.querySelectorAll('.civ3-category-btn');
    let currentIndex = 0;
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' && currentIndex < categoryButtons.length - 1) {
        currentIndex++;
        categoryButtons[currentIndex].click();
        categoryButtons[currentIndex].focus();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        categoryButtons[currentIndex].click();
        categoryButtons[currentIndex].focus();
      }
    });
  }

  /**
   * Add scroll-to-top functionality
   */
  function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'civ3-scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a855f7, #06b6d4);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'auto';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
      }
    });
    
    scrollButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initCiv3GoalsSection();
    initSmoothScroll();
    trackGoalInteractions();
    initKeyboardNavigation();
    initScrollToTop();
    
    // Log initialization
    console.log('Civilization 3.0 Goals Section initialized successfully');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  /**
   * Public API for external use
   */
  window.Civ3Goals = {
    /**
     * Filter goals by category
     * @param {string} category - Category name
     */
    filterByCategory: function(category) {
      const categoryButtons = document.querySelectorAll('.civ3-category-btn');
      const goalCards = document.querySelectorAll('.civ3-goal-card');
      
      const button = Array.from(categoryButtons).find(btn => 
        btn.getAttribute('data-category') === category
      );
      
      if (button) {
        button.click();
      }
    },

    /**
     * Reset all filters and show all goals
     */
    showAll: function() {
      const allButton = document.querySelector('[data-category="all-goals"]');
      if (allButton) {
        allButton.click();
      }
    },

    /**
     * Get count of visible goals
     * @returns {number} Number of visible goal cards
     */
    getVisibleCount: function() {
      const visibleCards = document.querySelectorAll('.civ3-goal-card[style*="display: block"]');
      return visibleCards.length;
    },

    /**
     * Get all categories
     * @returns {Array} Array of category names
     */
    getCategories: function() {
      const buttons = document.querySelectorAll('.civ3-category-btn');
      return Array.from(buttons).map(btn => ({
        name: btn.textContent.trim(),
        value: btn.getAttribute('data-category')
      }));
    }
  };

})();
