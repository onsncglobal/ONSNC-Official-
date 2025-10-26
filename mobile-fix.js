// mobile-scripts.js - Mobile Specific Fixes
document.addEventListener('DOMContentLoaded', function() {
    // Viewport fix for mobile
    function fixViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (window.innerWidth <= 768) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        } else {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    }
    
    // Prevent horizontal scroll
    function preventHorizontalScroll() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }
    
    // Mobile menu handler
    function handleMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.menu');
        
        if (navToggle && menu) {
            navToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                menu.style.display = isExpanded ? 'none' : 'block';
            });
        }
    }
    
    // Initialize mobile fixes
    fixViewport();
    preventHorizontalScroll();
    handleMobileMenu();
    
    // Re-run on resize
    window.addEventListener('resize', fixViewport);
});

