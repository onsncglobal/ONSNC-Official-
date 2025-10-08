// ================= ONSNC Foundation - JavaScript =================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Navigation Functionality =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ===== Sticky Header on Scroll =====
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just '#'
      if (targetId === '#') {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active Navigation Link Based on Scroll Position =====
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      
      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ===== Scroll Animation for Cards =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll('.project-card, .sector-card, .involvement-card, .stat-box');
  cards.forEach(card => {
    observer.observe(card);
  });

  // ===== Hero Image Upload Functionality (For Development) =====
  window.uploadHeroImage = function() {
    const fileInput = document.getElementById('heroImageUpload');
    const heroImage = document.querySelector('.hero-image');
    
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        heroImage.src = e.target.result;
        
        // Save to localStorage for persistence (optional)
        localStorage.setItem('heroImage', e.target.result);
        
        alert('Hero image updated successfully!');
      };
      
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  // Load saved hero image from localStorage (if exists)
  const savedHeroImage = localStorage.getItem('heroImage');
  if (savedHeroImage) {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      heroImage.src = savedHeroImage;
    }
  }

  // ===== Video Player Functionality =====
  window.playVideo = function(button) {
    const videoContainer = button.closest('.video-container');
    const video = videoContainer.querySelector('video');
    const overlay = videoContainer.querySelector('.video-overlay');
    
    if (video) {
      video.play();
      videoContainer.classList.add('playing');
      overlay.style.opacity = '0';
      
      video.addEventListener('pause', function() {
        videoContainer.classList.remove('playing');
        overlay.style.opacity = '1';
      });
      
      video.addEventListener('ended', function() {
        videoContainer.classList.remove('playing');
        overlay.style.opacity = '1';
      });
    }
  };

  // Auto-hide video overlay when video starts playing
  const videos = document.querySelectorAll('.video-container video');
  videos.forEach(video => {
    video.addEventListener('play', function() {
      const videoContainer = this.closest('.video-container');
      const overlay = videoContainer.querySelector('.video-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
    });
    
    video.addEventListener('pause', function() {
      const videoContainer = this.closest('.video-container');
      const overlay = videoContainer.querySelector('.video-overlay');
      if (overlay && !this.ended) {
        overlay.style.opacity = '1';
      }
    });
  });

  // ===== Newsletter Form Submission =====
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validate inputs
      if (!name || !email) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = this.querySelector('.btn-subscribe');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      submitButton.disabled = true;
      
      // Simulate API call (replace with actual API endpoint)
      setTimeout(() => {
        // Success
        showNotification(`Thank you ${name}! You've been subscribed to our newsletter.`, 'success');
        newsletterForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Save to localStorage (optional)
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({ name, email, date: new Date().toISOString() });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
      }, 1500);
    });
  }

  // ===== Notification System =====
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
      existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </span>
        <span class="notification-message">${message}</span>
      </div>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    if (!document.getElementById('notification-styles')) {
      const notifStyles = document.createElement('style');
      notifStyles.id = 'notification-styles';
      notifStyles.textContent = `
        .notification {
          position: fixed;
          top: 100px;
          right: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          animation: slideInRight 0.4s ease;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .notification-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .notification-success {
          border-left: 4px solid #28a745;
        }
        
        .notification-success .notification-icon {
          background: #d4edda;
          color: #28a745;
        }
        
        .notification-error {
          border-left: 4px solid #dc3545;
        }
        
        .notification-error .notification-icon {
          background: #f8d7da;
          color: #dc3545;
        }
        
        .notification-info {
          border-left: 4px solid #0066cc;
        }
        
        .notification-info .notification-icon {
          background: #cce5ff;
          color: #0066cc;
        }
        
        .notification-message {
          color: #333;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .notification-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }
        
        .notification-close:hover {
          color: #333;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .notification {
            right: 20px;
            left: 20px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(notifStyles);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease';
      setTimeout(() => notification.remove(), 400);
    }, 5000);
  }
  
  // Add slideOutRight animation
  const slideOutStyle = document.createElement('style');
  slideOutStyle.textContent = `
    @keyframes slideOutRight {
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(slideOutStyle);

  // ===== Counter Animation for Stats =====
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Observe stats for counter animation
  const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber && !statNumber.dataset.animated) {
          const target = parseInt(statNumber.textContent);
          statNumber.dataset.animated = 'true';
          animateCounter(statNumber, target);
        }
      }
    });
  }, { threshold: 0.5 });

  // If there are stat elements (for future use)
  document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
  });

  // ===== Parallax Effect for Hero Section =====
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content-wrapper');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // ===== Card Hover Effects Enhancement =====
  const projectCards = document.querySelectorAll('.project-card, .sector-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // ===== Button Ripple Effect =====
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== Lazy Loading for Images =====
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ===== Scroll to Top Button (Optional Enhancement) =====
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-to-top';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-blue);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.background = 'var(--dark-blue)';
  });
  
  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.background = 'var(--primary-blue)';
  });

  // ===== Form Validation (For Future Contact Forms) =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
          
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });
      
      if (isValid) {
        // Submit form or show success message
        console.log('Form is valid and ready to submit');
        // form.submit(); // Uncomment when ready to submit
      }
    });
  });

  // ===== Prevent Default for Empty Links =====
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });

  // ===== Loading Animation for Page =====
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation
    const fadeElements = document.querySelectorAll('.hero-content, .section-header');
    fadeElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  });

  // ===== Dynamic Year in Footer =====
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
  }

  // ===== Intersection Observer for Section Animations =====
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        
        // Animate section header
        const sectionHeader = entry.target.querySelector('.section-header');
        if (sectionHeader) {
          sectionHeader.style.opacity = '1';
          sectionHeader.style.transform = 'translateY(0)';
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });

  // ===== Enhanced Card Animations =====
  const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 50);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe cards with staggered animation
  document.querySelectorAll('.project-card, .sector-card, .involvement-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
    cardObserver.observe(card);
  });

  // ===== Tooltip Functionality (Optional) =====
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = this.dataset.tooltip;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      
      setTimeout(() => {
        tooltip.style.opacity = '1';
      }, 10);
      
      this.addEventListener('mouseleave', function() {
        tooltip.remove();
      }, { once: true });
    });
  });

  // ===== Image Error Handling =====
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://via.placeholder.com/400x300/87CEEB/ffffff?text=Image+Not+Available';
      this.alt = 'Image not available';
    });
  });

  // ===== Accessibility Enhancements =====
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#mission';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-blue);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);

  // ===== Keyboard Navigation Enhancement =====
  document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ===== Console Welcome Message =====
  console.log('%c🌍 ONSNC Foundation', 'font-size: 24px; color: #0066cc; font-weight: bold;');
  console.log('%cBuilding a Better Tomorrow', 'font-size: 14px; color: #666;');
  console.log('%cWebsite loaded successfully!', 'font-size: 12px; color: #28a745;');

  // ===== Performance Monitoring (Optional) =====
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
      }, 0);
    });
  }

  // ===== Dynamic Content Loading (For Future Use) =====
  window.loadMoreProjects = function() {
    // Placeholder for loading more projects dynamically
    console.log('Load more projects functionality');
  };

  // ===== Search Functionality (For Future Implementation) =====
  window.searchProjects = function(query) {
    const cards = document.querySelectorAll('.project-card, .sector-card');
    
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ===== Browser Detection and Warnings =====
  const userAgent = navigator.userAgent;
  const isOldBrowser = /MSIE|Trident/.test(userAgent);
  
  if (isOldBrowser) {
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff6b6b;
      color: white;
      padding: 15px;
      text-align: center;
      z-index: 10001;
    `;
    warning.textContent = 'You are using an outdated browser. Please upgrade for a better experience.';
    document.body.appendChild(warning);
  }

  // ===== Print Styles Handler =====
  window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
  });

  // ===== Local Storage Management =====
  function saveUserPreferences(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  function getUserPreferences(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  }

  // Make functions globally available
  window.saveUserPreferences = saveUserPreferences;
  window.getUserPreferences = getUserPreferences;

  // ===== Animation on Scroll Progress =====
  window.addEventListener('scroll', function() {
    const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Can be used for progress bar
    if (document.querySelector('.scroll-progress')) {
      document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
    }
  });

  // ===== Initialize Everything =====
  console.log('✅ All scripts initialized successfully');
  
  // Trigger initial animations
  setTimeout(() => {
    highlightNavOnScroll();
  }, 100);

});

// ===== Service Worker Registration (For PWA - Future Enhancement) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('ServiceWorker registered'))
    //   .catch(err => console.log('ServiceWorker registration failed'));
  });
}

// ===== Global Error Handler =====
window.addEventListener('error', function(e) {
  console.error('Global error:', e.message);
  // Could send to error tracking service here
});

// ===== Unhandled Promise Rejection Handler =====
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===== Export functions for external use (if needed) =====
window.ONSNCFoundation = {
  version: '1.0.0',
  uploadHeroImage: window.uploadHeroImage,
  searchProjects: window.searchProjects,
  loadMoreProjects: window.loadMoreProjects,
  savePreferences: window.saveUserPreferences,
  getPreferences: window.getUserPreferences
};

console.log('🚀 ONSNC Foundation Website v1.0.0 - Ready!');click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollTopBtn.addEventListener('

