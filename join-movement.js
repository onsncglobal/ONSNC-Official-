// Join the Movement Section JavaScript
class JoinMovement {
    constructor() {
        this.modal = document.getElementById('registration-modal');
        this.form = document.getElementById('join-form');
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeCounters();
    }

    initializeEventListeners() {
        // Opportunity card CTA buttons
        document.querySelectorAll('.opportunity-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                const opportunity = e.target.dataset.opportunity;
                this.openModal(opportunity);
            });
        });

        // Main CTA button
        document.getElementById('main-cta-button').addEventListener('click', () => {
            this.openModal();
        });

        // Learn more button
        document.getElementById('learn-more-button').addEventListener('click', () => {
            this.scrollToOpportunities();
        });

        // Modal close button
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Opportunity card hover effects
        this.initializeCardInteractions();
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate stats if it's an opportunity card
                    if (entry.target.classList.contains('opportunity-card')) {
                        this.animateCardStats(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe opportunity cards and other elements
        document.querySelectorAll('.opportunity-card, .movement-cta').forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
    }

    initializeCounters() {
        // Animate statistics numbers
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('[data-count]');
        
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

    animateCardStats(card) {
        const stats = card.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    initializeCardInteractions() {
        document.querySelectorAll('.opportunity-card').forEach(card => {
            // 3D hover effect
            card.addEventListener('mousemove', (e) => {
                this.handleCardHover(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });

            // Click effect
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('opportunity-cta')) {
                    this.pulseCard(card);
                }
            });
        });
    }

    handleCardHover(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    resetCardHover(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }

    pulseCard(card) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }

    openModal(opportunityType = null) {
        if (opportunityType) {
            const select = document.getElementById('interest-area');
            select.value = opportunityType;
        }
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
            this.modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }

    closeModal() {
        this.modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(0.9)';
        this.modal.querySelector('.modal-content').style.opacity = '0';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            this.form.reset();
        }, 300);
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        try {
            await this.submitFormData(new FormData(this.form));
            
            // Show success state
            this.showSuccessMessage();
            
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitFormData(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    showSuccessMessage() {
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 48px; color: #198754; margin-bottom: 20px;">✓</div>
                <h3 style="color: #003366; margin-bottom: 15px;">Welcome to the Movement!</h3>
                <p style="color: #495057; margin-bottom: 30px; line-height: 1.6;">
                    Thank you for joining Civilization 2.0. We'll contact you within 24 hours 
                    to discuss how you can contribute to building a better future.
                </p>
                <button class="btn btn-primary" onclick="joinMovement.closeModal()">
                    Continue
                </button>
            </div>
        `;
    }

    showErrorMessage() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = '#dc3545';
        
        setTimeout(() => {
            submitBtn.textContent = 'Join Now';
            submitBtn.style.background = '';
        }, 3000);
    }

    scrollToOpportunities() {
        const opportunitiesGrid = document.querySelector('.opportunities-grid');
        opportunitiesGrid.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.joinMovement = new JoinMovement();
});

// Add CSS for dynamic styles
const dynamicStyles = `
    <style>
        .opportunity-card .stat {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
        }
        
        .modal-content {
            transition: all 0.3s ease;
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
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
    </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);

