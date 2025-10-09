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


