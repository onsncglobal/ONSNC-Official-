// Global Crisis Page JavaScript
class GlobalCrisisPage {
    constructor() {
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeCounters();
        this.initializeScrollEffects();
    }

    initializeEventListeners() {
        // Scroll to crisis section
        document.querySelector('.scroll-to-crisis').addEventListener('click', () => {
            this.scrollToSection('.crisis-overview');
        });

        // Card actions
        document.querySelectorAll('.card-actions .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCardAction(e.target);
            });
        });

        // Crisis card interactions
        document.querySelectorAll('.crisis-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    this.expandCrisisCard(card);
                }
            });
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate specific elements
                    if (entry.target.classList.contains('crisis-card')) {
                        this.animateCrisisCard(entry.target);
                    } else if (entry.target.classList.contains('connection-card')) {
                        this.animateConnectionCard(entry.target);
                    } else if (entry.target.classList.contains('reference-card')) {
                        this.animateReferenceCard(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.crisis-card, .connection-card, .reference-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Hero animation
        const hero = document.querySelector('.crisis-hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(20px)';
            hero.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    initializeCounters() {
        // Animate hero statistics
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateHeroCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(document.querySelector('.hero-stats'));

        // Animate crisis card statistics
        document.querySelectorAll('.crisis-card').forEach(card => {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCardCounters(entry.target);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            statsObserver.observe(card);
        });
    }

    initializeScrollEffects() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / (docHeight - winHeight)) * 100;
            
            progressBar.style.width = progress + '%';
            
            // Show/hide back to top button
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    scrollToSection(selector) {
        const section = document.querySelector(selector);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    animateHeroCounters() {
        const counters = document.querySelectorAll('.hero-stats .stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = this.formatNumber(target);
                    clearInterval(timer);
                } else {
                    counter.textContent = this.formatNumber(Math.floor(current));
                }
            }, 16);
        });
    }

    animateCardCounters(card) {
        const counters = card.querySelectorAll('.stat-value[data-count]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target % 1 === 0 ? target.toString() : target.toFixed(1);
                    clearInterval(timer);
                } else {
                    counter.textContent = current % 1 === 0 ? Math.floor(current).toString() : current.toFixed(1);
                }
            }, 16);
        });
    }

    animateCrisisCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Stagger animation for inner elements
        const elements = card.querySelectorAll('.card-header, .crisis-description, .crisis-stats, .crisis-impacts, .card-actions');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-20px)';
            el.style.transition = `all 0.4s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            }, 100);
        });
    }

    animateConnectionCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate strength bar
        const strengthFill = card.querySelector('.strength-fill');
        if (strengthFill) {
            const width = strengthFill.style.width;
            strengthFill.style.width = '0%';
            
            setTimeout(() => {
                strengthFill.style.transition = 'width 1s ease 0.3s';
                strengthFill.style.width = width;
            }, 300);
        }
    }

    animateReferenceCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }

    expandCrisisCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            card.classList.remove('expanded');
            card.style.transform = 'translateY(-10px)';
        } else {
            card.classList.add('expanded');
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.zIndex = '10';
        }
    }

    handleCardAction(button) {
        const card = button.closest('.crisis-card');
        const crisisType = card.classList.contains('card-environmental') ? 'Environmental' :
                          card.classList.contains('card-economic') ? 'Economic' :
                          card.classList.contains('card-technological') ? 'Technological' : 'Governance';
        
        if (button.textContent.includes('Learn More')) {
            // Show detailed information
            this.showCrisisDetails(crisisType);
        } else if (button.textContent.includes('View Solutions')) {
            // Navigate to solutions page
            window.location.href = `global-solutions.html#${crisisType.toLowerCase()}`;
        }
    }

    showCrisisDetails(crisisType) {
        // In a real implementation, this would show a modal or expand the card
        alert(`Showing detailed analysis for ${crisisType} Crisis. This would open an expanded view with comprehensive data.`);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + 'k';
        }
        return num.toString();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.globalCrisisPage = new GlobalCrisisPage();
});

// Add CSS for animations
const animationStyles = `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .crisis-card.expanded {
            transform: translateY(-15px) scale(1.02) !important;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2) !important;
            z-index: 10;
        }
        
        .connection-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        
        .reference-card {
            transition: all 0.3s ease !important;
        }
        
        /* Pulse animation for critical items */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .crisis-level {
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Glow effect for hero */
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(161, 140, 209, 0.5); }
            50% { box-shadow: 0 0 30px rgba(161, 140, 209, 0.8); }
        }
        
        .hero-badge {
            animation: glow 3s ease-in-out infinite;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);

// Add console message
console.log('%c🌍 Global Crisis Analysis', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cUnderstanding interconnected crises to build effective solutions for Civilization 2.0', 'color: #764ba2; font-size: 14px;');
