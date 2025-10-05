// Contact Page Specific JavaScript

// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual Formspree submission)
      setTimeout(() => {
        // In a real scenario, you would use Formspree's native form submission
        // For demonstration, we'll show a success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Notification function
  function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
      color: ${type === 'success' ? '#155724' : '#721c24'};
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 15px;
      z-index: 10000;
      max-width: 400px;
      animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
      font-size: 1rem;
    `;
    
    closeBtn.addEventListener('click', function() {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
    
    document.body.appendChild(notification);
    
    // Add keyframes for animation
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Floating buttons animation on scroll
  const floatingButtons = document.querySelectorAll('.floating-btn');
  
  window.addEventListener('scroll', function() {
    floatingButtons.forEach(btn => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      } else {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
      }
    });
  });
  
  // Initialize floating buttons
  floatingButtons.forEach(btn => {
    btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
  });
  
  // Trigger scroll event to set initial state
  window.dispatchEvent(new Event('scroll'));
  
  // Contact cards animation on scroll
  const contactCards = document.querySelectorAll('.contact-card');
  
  const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);
  
  // Observe contact cards for animation
  contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    cardObserver.observe(card);
  });
  
  // Map section animation
  const mapSection = document.querySelector('.map-section');
  
  if (mapSection) {
    const mapObserverOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          mapObserver.unobserve(entry.target);
        }
      });
    }, mapObserverOptions);
    
    mapSection.style.opacity = '0';
    mapSection.style.transform = 'translateY(30px)';
    mapSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    mapObserver.observe(mapSection);
  }
  
  // Page load animation for hero section
  window.addEventListener('load', function() {
    const contactHero = document.querySelector('.contact-hero');
    if (contactHero) {
      contactHero.style.opacity = '0';
      contactHero.style.transform = 'translateY(30px)';
      contactHero.style.transition = 'opacity 1s ease, transform 1s ease';
      
      setTimeout(() => {
        contactHero.style.opacity = '1';
        contactHero.style.transform = 'translateY(0)';
      }, 300);
    }
  });
});

