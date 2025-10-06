/**
 * ONSNC 30 Goals Section - Interactive Functionality
 * Handles category filtering and card display
 */

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  function initGoalsSection() {
    const categoryButtons = document.querySelectorAll('.onsnc-category-btn');
    const goalCards = document.querySelectorAll('.onsnc-goal-card');
    
    // Check if elements exist before adding event listeners
    if (categoryButtons.length === 0 || goalCards.length === 0) {
      return;
    }
    
    /**
     * Filter goal cards based on selected category
     * @param {string} category - The category to filter by
     */
    function filterGoals(category) {
      goalCards.forEach(function(card) {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all-goals') {
          // Show all cards
          card.style.display = 'block';
          // Add fade-in animation
          card.style.opacity = '0';
          setTimeout(function() {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          // Show only matching category cards
          if (cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(function() {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        }
      });
    }
    
    /**
     * Update active state of category buttons
     * @param {HTMLElement} activeButton - The button that was clicked
     */
    function updateActiveButton(activeButton) {
      categoryButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      activeButton.classList.add('active');
    }
    
    // Add click event listeners to all category buttons
    categoryButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const category = this.getAttribute('data-category');
        
        // Update button states
        updateActiveButton(this);
        
        // Filter cards
        filterGoals(category);
      });
    });
    
    // Initialize with all goals visible
    filterGoals('all-goals');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoalsSection);
  } else {
    // DOM is already ready
    initGoalsSection();
  }
  
})();

