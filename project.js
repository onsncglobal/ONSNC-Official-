// ONSNC Foundation Projects Section JavaScript - Conflict Free
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Add animation to project cards when they come into view
        const projectCards = document.querySelectorAll('.onsnc-project-card');
        
        const observerOptions = {
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
        }, observerOptions);
        
        // Set initial state for animation
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
        
        // Add animation to sector cards
        const sectorCards = document.querySelectorAll('.onsnc-sector-card');
        
        const sectorObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Set initial state for animation
        sectorCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            sectorObserver.observe(card);
        });
        
        // Add staggered animation for pathway items
        const pathwayItems = document.querySelectorAll('.onsnc-pathway-item');
        
        const pathwayObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100 * Array.from(pathwayItems).indexOf(entry.target));
                }
            });
        }, observerOptions);
        
        // Set initial state for animation
        pathwayItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            pathwayObserver.observe(item);
        });
        
        // Add hover effect to stats
        const stats = document.querySelectorAll('.onsnc-stat');
        
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            stat.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
})();

