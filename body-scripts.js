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

// features.js
// Animate feature cards on scroll
document.addEventListener("DOMContentLoaded", () => {
    const featureCards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("animate-in");
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => observer.observe(card));
});

/* ===== Hero Carousel + Dots + Thumbnails + Swipe ===== */
const heroEventsContainer = document.getElementById('hero-events');
const carouselDotsContainer = document.getElementById('carousel-dots');
const carouselThumbnailsContainer = document.getElementById('carousel-thumbnails');
let currentSlide = 0;

const heroEventsData = [
  {
    "title": "ONSNC Annual Conference 2025",
    "date": "25th November 2025 | Assam",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  },
  {
    "title": "Civilization 3.0 Innovation Talk",
    "date": "5th January 2026 | Online",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  },
  {
    "title": "Youth Leadership Seminar",
    "date": "18th December 2025 | Assam",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  }
];

// Render slides, dots, thumbnails
heroEventsData.forEach((event, index) => {
  // Slides
  const slide = document.createElement('div');
  slide.classList.add('hero-slide');
  if(index === 0) slide.classList.add('active');
  slide.innerHTML = `
    <img src="${event.image}" alt="${event.title}">
    <div class="hero-content">
      <h2 class="hero-title">${event.title}</h2>
      <p class="hero-date">${event.date}</p>
      <a href="${event.link}" class="hero-btn">Register Now</a>
    </div>
  `;
  heroEventsContainer.appendChild(slide);

  // Dots
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if(index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showSlide(index));
  carouselDotsContainer.appendChild(dot);

  // Thumbnails
  const thumb = document.createElement('img');
  thumb.src = event.thumbnail;
  thumb.alt = event.title;
  thumb.classList.add('carousel-thumbnail');
  if(index === 0) thumb.classList.add('active');
  thumb.addEventListener('click', () => showSlide(index));
  carouselThumbnailsContainer.appendChild(thumb);
});

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.carousel-dot');
const thumbnails = document.querySelectorAll('.carousel-thumbnail');

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  thumbnails.forEach(thumb => thumb.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  thumbnails[index].classList.add('active');
  currentSlide = index;
}

// Auto-slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Prev/Next buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});
document.querySelector('.next-btn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

/* ===== Swipe Support ===== */
let startX = 0, endX = 0;
const threshold = 50;

heroEventsContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
heroEventsContainer.addEventListener('touchmove', e => endX = e.touches[0].clientX);
heroEventsContainer.addEventListener('touchend', () => {
  const diffX = endX - startX;
  if(Math.abs(diffX) > threshold){
    currentSlide = diffX > 0 ? (currentSlide - 1 + slides.length) % slides.length : (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  startX = 0; endX = 0;
});

/* ===== Explore More Events ===== */
const eventsData = [
  {"title":"ONSNC Tech Workshop 2025","date":"10th Dec 2025","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"ONSNC Community Meetup","date":"20th Jan 2026","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"Youth Leadership Seminar","date":"18th Dec 2025","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"Innovation Roundtable","date":"12th Feb 2026","thumbnail":"https://via.placeholder.com/400x225","link":"#"}
];

let displayedEvents = 0;
const eventsBatchSize = 2;
const eventsGrid = document.getElementById('events-grid');
const loadMoreEventsBtn = document.getElementById('load-more-events-btn');

function renderEventsBatch() {
  const batch = eventsData.slice(displayedEvents, displayedEvents + eventsBatchSize);
  batch.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <img src="${event.thumbnail}" alt="${event.title}">
      <div class="event-info">
        <h4 class="event-title">${event.title}</h4>
        <p class="event-date">${event.date}</p>
        <a href="${event.link}" class="event-btn">Learn More</a>
      </div>
    `;
    eventsGrid.appendChild(card);
  });
  displayedEvents += batch.length;
  if(displayedEvents >= eventsData.length) loadMoreEventsBtn.style.display = 'none';
}

renderEventsBatch();
loadMoreEventsBtn.addEventListener('click', renderEventsBatch);

// cta.js
// Optional: subtle fade-in animation for CTA
document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-container");
    cta.style.opacity = 0;
    cta.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        cta.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        cta.style.opacity = 1;
        cta.style.transform = "translateY(0)";
    }, 300);
});

// cta.js
// Optional: subtle fade-in animation for CTA
document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-container");
    cta.style.opacity = 0;
    cta.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        cta.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        cta.style.opacity = 1;
        cta.style.transform = "translateY(0)";
    }, 300);
});

// Sample media data
const mediaData = [
  {
    "title": "ONSNC Annual Conference 2025",
    "description": "Highlights from the ONSNC Annual Conference.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    "title": "Innovation in Civilization 3.0",
    "description": "Key breakthroughs and updates in Civilization 3.0.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    "title": "ONSNC Media Coverage",
    "description": "Watch media coverage of ONSNC initiatives.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

let displayedCount = 0;
const batchSize = 2;

const grid = document.getElementById('media-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close-btn');

function renderMediaBatch() {
  const batch = mediaData.slice(displayedCount, displayedCount + batchSize);

  batch.forEach(media => {
    const card = document.createElement('div');
    card.classList.add('media-card');
    card.innerHTML = `
      <img src="${media.thumbnail}" alt="${media.title}">
      <div class="media-info">
        <h3 class="media-title">${media.title}</h3>
        <p class="media-description">${media.description}</p>
      </div>
    `;
    grid.appendChild(card);

    // Click event on card opens modal
    card.addEventListener('click', () => {
      modalVideo.src = media.videoUrl + "?autoplay=1";
      modal.style.display = 'flex';
    });
  });

  displayedCount += batch.length;

  if(displayedCount >= mediaData.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Initial render
renderMediaBatch();
loadMoreBtn.addEventListener('click', renderMediaBatch);

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.src = "";
});

// Close modal when clicking outside the video
window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
    modalVideo.src = "";
  }
});

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

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/articles.json")
    .then(response => response.json())
    .then(articles => {
      const container = document.getElementById("news-container");
      articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <div class="news-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" class="read-more">Read More →</a>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading articles:", err));
});
