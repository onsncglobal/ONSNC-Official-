
    // Mobile Menu Toggle
    document.addEventListener('DOMContentLoaded', function() {
      const mobileToggle = document.getElementById('mobileToggle');
      const navMenu = document.getElementById('navMenu');

      if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          navMenu.classList.toggle('active');
          document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
      }

      // Close mobile menu when clicking on nav links
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          if (mobileToggle) mobileToggle.classList.remove('active');
          if (navMenu) navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Card animation on scroll
      const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Observe cards for animation
      document.querySelectorAll('.solution-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
      
      // Observe timeline items for animation
      document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
      });

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });


```
