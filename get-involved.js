// Get Involved Page JavaScript
class GetInvolvedPage {
    constructor() {
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeCounters();
        this.initializeTabs();
    }

    initializeEventListeners() {
        // Scroll to opportunities
        document.querySelector('.scroll-to-opportunities').addEventListener('click', () => {
            document.querySelector('.scientific-framework').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Form submission
        document.getElementById('involvement-form').addEventListener('submit', (e) => {
            this.handleFormSubmission(e);
        });

        // Pathway card interactions
        document.querySelectorAll('.pathway-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    this.expandPathwayCard(card);
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
                    
                    // Animate stats in pathway cards
                    if (entry.target.classList.contains('pathway-card')) {
                        this.animatePathwayStats(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.framework-card, .system-card, .pathway-card, .model-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    initializeCounters() {
        // Animate hero statistics
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(document.querySelector('.hero-stats'));
    }

    initializeTabs() {
        const tabLinks = document.querySelectorAll('.tab-link');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetTab = link.getAttribute('data-tab');
                
                // Update active tab link
                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Show target tab pane
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
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

    animatePathwayStats(card) {
        const stats = card.querySelectorAll('.pathway-stats .stat');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    expandPathwayCard(card) {
        // Toggle expanded state
        card.classList.toggle('expanded');
        
        if (card.classList.contains('expanded')) {
            card.style.zIndex = '10';
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.zIndex = '';
            card.style.transform = '';
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.submitFormData(new FormData(form));
            
            // Show success message
            this.showSuccessMessage(form);
            
        } catch (error) {
            this.showErrorMessage(submitBtn, originalText);
        }
    }

    async submitFormData(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate API call - 90% success rate for demo
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });
    }

    showSuccessMessage(form) {
        form.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; color: #4cd964; margin-bottom: 20px;">✓</div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Welcome to Civilization 2.0!</h3>
                <p style="color: #6c757d; line-height: 1.6;">
                    Thank you for joining our global movement. We'll contact you within 24 hours 
                    to onboard you into our collaboration platform and connect you with relevant projects.
                </p>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 20px;">
                    Complete Another Form
                </button>
            </div>
        `;
    }

    showErrorMessage(submitBtn, originalText) {
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
        submitBtn.style.background = '#dc3545';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
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
    window.getInvolvedPage = new GetInvolvedPage();
});

// Add CSS for animations
const animationStyles = `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .pathway-stats .stat {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
        }
        
        .pathway-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .pathway-card.expanded {
            transform: scale(1.05);
            box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
        }
        
        .success-message {
            animation: fadeInUp 0.6s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);

