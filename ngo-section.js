// ONSNC Foundation Projects Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animation to cards when they come into view
    const cards = document.querySelectorAll('.ngo-civ2-card');
    
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
    
    // Set initial state for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Stats counter animation (if we had actual numbers)
    // This is a placeholder for future implementation
    const statsSection = document.querySelector('.ngo-civ2-stats');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation for stats would go here
                console.log('Stats section in view - animation could be triggered here');
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
});

