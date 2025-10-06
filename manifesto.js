// ONSNC Manifesto Page JavaScript
class ManifestoPage {
    constructor() {
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeScrollEffects();
    }

    initializeEventListeners() {
        // Hero actions
        document.getElementById('exploreVision').addEventListener('click', () => {
            this.scrollToSection('.vision-overview');
        });

        document.getElementById('downloadManifesto').addEventListener('click', () => {
            this.downloadManifesto();
        });

        // Principle card interactions
        document.querySelectorAll('.principle-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-link')) {
                    this.togglePrincipleCard(card);
                }
            });
        });

        // Pillar card hover effects
        document.querySelectorAll('.pillar-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animatePillarCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animatePillarCard(card, false);
            });
        });

        // CTA buttons
        document.querySelectorAll('.final-cta .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCTAAction(e.target);
            });
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animations based on element type
                    if (entry.target.classList.contains('vision-card')) {
                        this.animateVisionCard(entry.target);
                    } else if (entry.target.classList.contains('principle-card')) {
                        this.animatePrincipleCard(entry.target);
                    } else if (entry.target.classList.contains('pillar-card')) {
                        this.animatePillarCardEntry(entry.target);
                    } else if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        document.querySelectorAll('.vision-card, .principle-card, .pillar-card, .timeline-item, .impact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
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

        window.addEventListener('scroll', () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / (docHeight - winHeight)) * 100;
            
            progressBar.style.width = progress + '%';
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

    downloadManifesto() {
        // Simulate PDF download
        const button = document.getElementById('downloadManifesto');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            // In a real implementation, this would trigger actual PDF download
            alert('ONSNC 2.0 Manifesto PDF would start downloading. This is a demo.');
            
            // Uncomment for actual download:
            // window.open('path/to/onsnc-manifesto.pdf', '_blank');
        }, 2000);
    }

    togglePrincipleCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            card.classList.remove('expanded');
            card.style.transform = 'translateY(0)';
        } else {
            card.classList.add('expanded');
            card.style.transform = 'translateY(-10px)';
            card.style.zIndex = '10';
        }
    }

    animateVisionCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }

    animatePrincipleCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Stagger animation for inner elements
        const elements = card.querySelectorAll('.principle-header, .principle-title, .principle-description, .principle-features li');
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

    animatePillarCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(-10px) scale(1)';
        }
    }

    animatePillarCardEntry(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate icon separately
        const icon = card.querySelector('.pillar-icon');
        if (icon) {
            icon.style.transform = 'scale(0)';
            icon.style.transition = 'transform 0.6s ease 0.3s';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 400);
        }
    }

    animateTimelineItem(item) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        
        // Add connecting line animation
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            content.style.transition = 'clip-path 0.8s ease 0.3s';
            
            setTimeout(() => {
                content.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            }, 400);
        }
    }

    handleCTAAction(button) {
        const text = button.textContent.trim();
        
        if (text.includes('Download')) {
            this.downloadManifesto();
        } else if (text.includes('Join')) {
            // Redirect to community page
            alert('Redirecting to community platform...');
            // window.location.href = '/community';
        } else if (text.includes('Pilot')) {
            // Redirect to projects page
            alert('Redirecting to pilot projects...');
            // window.location.href = '/projects';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.manifestoPage = new ManifestoPage();
});

// Add CSS for animations
const animationStyles = `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .principle-card.expanded {
            transform: translateY(-10px) !important;
            box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2) !important;
        }
        
        .pillar-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        
        .timeline-content {
            transition: clip-path 0.8s ease !important;
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Pulse animation for CTA */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .final-cta .btn-primary {
            animation: pulse 2s ease-in-out infinite;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);

// Add console welcome message
console.log('%c🚀 ONSNC 2.0 Manifesto', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cBuilding a post-scarcity, symbiotic civilization for all sentient beings.', 'color: #764ba2; font-size: 16px;');