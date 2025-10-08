// Animation reveal on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Select all sections for animation
    const sections = document.querySelectorAll('section');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Add smooth scrolling for anchor links (if any are added in the future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation for buttons
    const buttons = document.querySelectorAll('.download-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If it's a demo link without actual file, prevent default
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show a message or loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<span>Document not yet available</span>';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
});

