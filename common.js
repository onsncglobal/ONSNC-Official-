// Common JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button hover effects with advanced animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            createRippleEffect(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click ripple effect
        button.addEventListener('click', function(e) {
            createClickRipple(e, this);
        });
    });

    // Advanced image loading with lazy loading and blur effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add lazy loading if not already set
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Add blur effect while loading
        if (!img.complete) {
            img.style.filter = 'blur(10px)';
            img.style.transition = 'filter 0.5s ease';
        }

        img.addEventListener('load', function() {
            this.style.filter = 'blur(0)';
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease, filter 0.5s ease';
    });

    // Header scroll effect with parallax
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add shadow and background when scrolled
            if (currentScrollY > 100) {
                header.style.background = 'rgba(0, 51, 102, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = '#003366';
                header.style.backdropFilter = 'blur(0)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Advanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-up, .slide-in-left, .scale-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Advanced cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('a, button, .card, .solution-card, .principle-card').forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
        });
    });

    // Page loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });

    // Initialize tooltips if any
    initializeTooltips();
});

// Utility Functions
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const size = Math.max(element.offsetWidth, element.offsetHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = -size/2 + 'px';
    ripple.style.marginTop = -size/2 + 'px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createClickRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size/2;
    const y = event.clientY - rect.top - size/2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: clickRipple 0.6s ease-out;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeTooltips() {
    // Add tooltip functionality to elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'advanced-tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        el.addEventListener('mouseenter', function(e) {
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        el.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
}

// Add CSS for advanced features
const advancedStyles = `
    <style>
        .custom-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background: #0072CE;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            mix-blend-mode: difference;
        }
        
        .advanced-tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            z-index: 10000;
            white-space: nowrap;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes clickRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        body {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .main-header {
            transition: all 0.3s ease;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', advancedStyles);

