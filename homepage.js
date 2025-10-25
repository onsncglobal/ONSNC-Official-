but// Homepage specific JavaScript with advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize homepage-specific features after common.js
    setTimeout(initializeHomepageFeatures, 100);
});

function initializeHomepageFeatures() {
    // Advanced solution link hover effects with magnetic animation
    document.querySelectorAll('.solution-link, .card-link').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            this.style.gap = '12px';
            createMagneticEffect(this, e);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.gap = '8px';
            resetMagneticEffect(this);
        });
    });

    // Advanced interactive timeline with scroll animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        initializeAdvancedTimeline(timelineItems);
    }

    // Animated statistics counter//
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length > 0) {
        initializeAnimatedCounters(statElements);
    }

    // Advanced card hover effects with 3D transform
    document.querySelectorAll('.principle-card, .feature-card, .overview-card').forEach(card => {
        initialize3DCardEffect(card);
    });

    // Parallax scrolling effects for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        initializeParallaxEffect(heroSection);
    }

    // Advanced loading animations for homepage sections
    initializeSectionRevealAnimations();

    // Interactive floating elements animation
    const floatingElements = document.querySelectorAll('.float-element');
    if (floatingElements.length > 0) {
        initializeFloatingElements(floatingElements);
    }

    // Advanced mouse follower for hero section
    initializeHeroMouseFollower();

    // Dynamic background gradients
    initializeDynamicBackgrounds();

    // Scroll progress indicator
    initializeScrollProgress();
}

// Advanced Magnetic Effect for Links
function createMagneticEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    element.style.setProperty('--mouse-x', `${x}px`);
    element.style.setProperty('--mouse-y', `${y}px`);
    element.style.transform = 'translate(var(--tx, 0), var(--ty, 0))';
}

function resetMagneticEffect(element) {
    element.style.transform = 'translate(0, 0)';
}

// Advanced Timeline with Scroll Animations
function initializeAdvancedTimeline(timelineItems) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.timeline-content');
                const year = entry.target.querySelector('.timeline-year');
                
                content.style.animation = 'timelineSlideIn 0.6s ease-out forwards';
                year.style.animation = 'yearPopIn 0.4s ease-out 0.3s forwards';
                
                // Add progress indicator
                const progress = document.createElement('div');
                progress.className = 'timeline-progress-fill';
                content.appendChild(progress);
                
                setTimeout(() => {
                    progress.style.width = '100%';
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Animated Statistics Counter
function initializeAnimatedCounters(statElements) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.textContent.replace(/,/g, ''));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        element.textContent = formatNumber(target);
                        clearInterval(timer);
                    } else {
                        element.textContent = formatNumber(Math.floor(current));
                    }
                }, 16);
                
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(element => {
        counterObserver.observe(element);
    });
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 3D Card Hover Effects
function initialize3DCardEffect(card) {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        this.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 25px rgba(0, 0, 0, 0.1)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    });
}

// Parallax Scrolling Effect
function initializeParallaxEffect(section) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        section.style.transform = `translateY(${rate}px)`;
    });
}

// Section Reveal Animations
function initializeSectionRevealAnimations() {
    const sections = document.querySelectorAll('.vision-section, .features-section, .civilization-overview');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.principle-card, .feature-card, .overview-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Advanced Floating Elements Animation
function initializeFloatingElements(elements) {
    elements.forEach((element, index) => {
        element.style.animation = `floatAdvanced ${15 + index * 2}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 2}s`;
    });
}

// Hero Section Mouse Follower
function initializeHeroMouseFollower() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const follower = document.createElement('div');
    follower.className = 'hero-mouse-follower';
    hero.appendChild(follower);

    hero.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
        
        // Move background gradient
        hero.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}

// Dynamic Background Gradients
function initializeDynamicBackgrounds() {
    const sections = document.querySelectorAll('.vision-section, .features-section');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const color1 = `hsl(${x * 360}, 70%, 95%)`;
            const color2 = `hsl(${y * 360 + 180}, 70%, 95%)`;
            
            this.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        });
    });
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Add homepage-specific CSS
const homepageStyles = `
    <style>
        /* Advanced Timeline Animations */
        @keyframes timelineSlideIn {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes yearPopIn {
            from {
                opacity: 0;
                transform: scale(0);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .timeline-progress-fill {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #0072CE, #198754);
            width: 0%;
            transition: width 1s ease;
            border-radius: 2px;
        }
        
        /* Advanced Floating Animation */
        @keyframes floatAdvanced {
            0%, 100% {
                transform: translateY(0px) rotate(0deg) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) rotate(90deg) scale(1.1);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-40px) rotate(180deg) scale(1);
                opacity: 0.7;
            }
            75% {
                transform: translateY(-20px) rotate(270deg) scale(0.9);
                opacity: 0.5;
            }
        }
        
        /* Hero Mouse Follower */
        .hero-mouse-follower {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(0, 114, 206, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 2;
            transition: all 0.1s ease;
        }
        
        /* Scroll Progress Bar */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0072CE, #198754);
            z-index: 10000;
            transition: width 0.1s ease;
        }
        
        /* 3D Card Transform */
        .principle-card,
        .feature-card,
        .overview-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Magnetic Link Effect */
        .solution-link,
        .card-link {
            position: relative;
            transition: gap 0.3s ease, transform 0.2s ease;
        }
        
        /* Dynamic Gradient Backgrounds */
        .vision-section,
        .features-section {
            transition: background 0.3s ease;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', homepageStyles);

<script>
// Simple category filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const goalCards = document.querySelectorAll('.goal-card');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
      categoryButtons.forEach(btn => btn.classList.add('bg-white', 'text-gray-700'));
      
      // Add active class to clicked button
      this.classList.remove('bg-white', 'text-gray-700');
      this.classList.add('active', 'bg-blue-600', 'text-white');
      
      const category = this.textContent.trim().toLowerCase().replace(' ', '-');
      
      // Show/hide cards based on category
      goalCards.forEach(card => {
        if (category === 'all-goals') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});

// vision.js
// Example: animate principles on scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".principle-card, .pillar");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});
// Smooth hover animation for cards + light glow entry
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".nexus-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => {
    observer.observe(card);
  });
});

// Reveal animation for philosophy cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".philosophy-card");

  const reveal = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", reveal);
  reveal();
});

