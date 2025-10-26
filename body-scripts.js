// ===========================================
// BODY SCRIPTS - Conflict Free & Optimized
// For Homepage Body Sections Only
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStatsCounter();
    initCategoryFilter();
    initVideoGallery();
    initEventCarousel();
    initSmoothScrolling();
    initPerformanceOptimizations();
});

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const statElement = document.getElementById('projectCount');
    if (!statElement) return;
    
    const targetCount = 7;
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps
    
    let currentCount = 0;
    
    const updateCount = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            statElement.textContent = Math.floor(currentCount);
            requestAnimationFrame(updateCount);
        } else {
            statElement.textContent = targetCount;
        }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statElement);
}

// ===== Category Filter for Goals =====
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.civ3-category-btn');
    const goalCards = document.querySelectorAll('.civ3-goal-card');
    
    if (categoryButtons.length === 0 || goalCards.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter cards
            goalCards.forEach(card => {
                if (category === 'all-goals' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Video Gallery =====
function initVideoGallery() {
    const mediaGrid = document.getElementById('media-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!mediaGrid) return;
    
    // Sample video data - replace with actual data
    const videos = [
        {
            id: 1,
            title: "Civilization 3.0 Introduction",
            thumbnail: "images/video1-thumb.jpg",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: 2,
            title: "ONSNC Vision Explained",
            thumbnail: "images/video2-thumb.jpg",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: 3,
            title: "Sustainable Community Projects",
            thumbnail: "images/video3-thumb.jpg",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: 4,
            title: "Technology & Innovation",
            thumbnail: "images/video4-thumb.jpg",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ];
    
    let visibleVideos = 2; // Initially show 2 videos
    
    // Render videos
    function renderVideos() {
        mediaGrid.innerHTML = '';
        
        for (let i = 0; i < Math.min(visibleVideos, videos.length); i++) {
            const video = videos[i];
            const videoCard = createVideoCard(video);
            mediaGrid.appendChild(videoCard);
        }
        
        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleVideos >= videos.length ? 'none' : 'block';
        }
    }
    
    // Create video card element
    function createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="play-button">▶</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
            </div>
        `;
        
        card.addEventListener('click', () => openVideoModal(video.videoUrl));
        return card;
    }
    
    // Open video modal
    function openVideoModal(videoUrl) {
        if (modalVideo && videoModal) {
            modalVideo.src = videoUrl;
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Close video modal
    function closeVideoModal() {
        if (modalVideo && videoModal) {
            videoModal.style.display = 'none';
            modalVideo.src = '';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Load more videos
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleVideos += 2;
            renderVideos();
        });
    }
    
    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Initial render
    renderVideos();
    
    // Add CSS for video cards
    const style = document.createElement('style');
    style.textContent = `
        .video-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .video-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .video-thumbnail {
            position: relative;
            aspect-ratio: 16 / 9;
            overflow: hidden;
        }
        
        .video-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .video-card:hover .play-button {
            background: rgba(77, 166, 255, 0.9);
            transform: translate(-50%, -50%) scale(1.1);
        }
        
        .video-info {
            padding: 1.5rem;
        }
        
        .video-info h3 {
            color: #003366;
            margin: 0;
            font-size: 1.1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ===== Event Carousel =====
function initEventCarousel() {
    const heroEvents = document.getElementById('hero-events');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselDots = document.getElementById('carousel-dots');
    const carouselThumbnails = document.getElementById('carousel-thumbnails');
    const eventsGrid = document.getElementById('events-grid');
    const loadMoreEventsBtn = document.getElementById('load-more-events-btn');
    
    if (!heroEvents) return;
    
    // Sample event data - replace with actual data
    const events = [
        {
            id: 1,
            title: "Global Summit 2023",
            date: "December 15, 2023",
            location: "Virtual Event",
            image: "images/event1.jpg",
            description: "Join global leaders in discussing the future of Civilization 3.0"
        },
        {
            id: 2,
            title: "Community Workshop",
            date: "January 20, 2024",
            location: "New York, USA",
            image: "images/event2.jpg",
            description: "Hands-on workshop for building sustainable communities"
        },
        {
            id: 3,
            title: "Technology Expo",
            date: "February 10, 2024",
            location: "Berlin, Germany",
            image: "images/event3.jpg",
            description: "Showcasing the latest innovations for Civilization 3.0"
        }
    ];
    
    let currentSlide = 0;
    
    // Initialize hero carousel
    function initHeroCarousel() {
        heroEvents.innerHTML = '';
        carouselDots.innerHTML = '';
        carouselThumbnails.innerHTML = '';
        
        events.forEach((event, index) => {
            // Hero slide
            const slide = document.createElement('div');
            slide.className = 'hero-slide';
            slide.innerHTML = `
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="slide-content">
                    <h3>${event.title}</h3>
                    <p>${event.date} • ${event.location}</p>
                    <p>${event.description}</p>
                    <button class="btn-primary">Register Now</button>
                </div>
            `;
            heroEvents.appendChild(slide);
            
            // Dot indicator
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
            
            // Thumbnail
            const thumbnail = document.createElement('div');
            thumbnail.className = 'carousel-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.innerHTML = `<img src="${event.image}" alt="${event.title}" loading="lazy">`;
            thumbnail.addEventListener('click', () => goToSlide(index));
            carouselThumbnails.appendChild(thumbnail);
        });
        
        updateCarousel();
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Update carousel display
    function updateCarousel() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const thumbnails = document.querySelectorAll('.carousel-thumbnail');
        
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % events.length;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + events.length) % events.length;
        updateCarousel();
    }
    
    // Initialize events grid
    function initEventsGrid() {
        if (!eventsGrid) return;
        
        let visibleEvents = 4; // Initially show 4 events
        
        function renderEvents() {
            eventsGrid.innerHTML = '';
            
            for (let i = 0; i < Math.min(visibleEvents, events.length); i++) {
                const event = events[i];
                const eventCard = createEventCard(event);
                eventsGrid.appendChild(eventCard);
            }
            
            // Show/hide load more button
            if (loadMoreEventsBtn) {
                loadMoreEventsBtn.style.display = visibleEvents >= events.length ? 'none' : 'block';
            }
        }
        
        function createEventCard(event) {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p class="event-meta">${event.date} • ${event.location}</p>
                    <p>${event.description}</p>
                    <button class="btn-secondary">Learn More</button>
                </div>
            `;
            return card;
        }
        
        if (loadMoreEventsBtn) {
            loadMoreEventsBtn.addEventListener('click', () => {
                visibleEvents += 4;
                renderEvents();
            });
        }
        
        renderEvents();
        
        // Add CSS for event cards
        const style = document.createElement('style');
        style.textContent = `
            .event-card {
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }
            
            .event-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            
            .event-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            
            .event-content {
                padding: 1.5rem;
            }
            
            .event-content h3 {
                color: #003366;
                margin: 0 0 0.5rem 0;
                font-size: 1.2rem;
            }
            
            .event-meta {
                color: #666;
                font-size: 0.9rem;
                margin: 0 0 1rem 0;
            }
            
            .event-content p:last-of-type {
                color: #555;
                line-height: 1.5;
                margin-bottom: 1.5rem;
            }
            
            .hero-slide {
                min-width: 100%;
                transition: transform 0.5s ease;
                position: relative;
            }
            
            .hero-slide img {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }
            
            .slide-content {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                color: white;
                padding: 2rem;
            }
            
            .slide-content h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.5rem;
            }
            
            .carousel-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #ccc;
                display: inline-block;
                margin: 0 5px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .carousel-dot.active {
                background: #003366;
            }
            
            .carousel-thumbnail {
                width: 60px;
                height: 40px;
                border-radius: 5px;
                overflow: hidden;
                cursor: pointer;
                opacity: 0.6;
                transition: opacity 0.3s ease;
            }
            
            .carousel-thumbnail.active {
                opacity: 1;
                border: 2px solid #003366;
            }
            
            .carousel-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Event listeners for carousel navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    heroEvents.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    heroEvents.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
    
    // Initialize both carousel and grid
    initHeroCarousel();
    initEventsGrid();
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Performance Optimizations =====
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Performance-heavy scroll operations here
        }, 100);
    });
    
    // Preload critical resources
    const criticalResources = [
        'images/article1.jpg',
        'images/article2.jpg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// ===== Utility Functions =====
// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
