// ================= NGO Section JavaScript =================

document.addEventListener('DOMContentLoaded', function() {
  
  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Animate Cards on Scroll
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Animate Stats on Scroll
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Smooth Scroll for Card Links
  const cardLinks = document.querySelectorAll('.card-link');
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(102, 126, 234, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.parentElement.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Button Click Animation
  const btnRead = document.querySelector('.btn-read');
  if (btnRead) {
    btnRead.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }

  // Parallax Effect on Scroll
  window.addEventListener('scroll', function() {
    const section = document.getElementById('ngo-section');
    if (!section) return;
    
    const scrolled = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
      const parallaxSpeed = (scrolled - sectionTop) * 0.5;
      section.style.backgroundPosition = `center ${parallaxSpeed}px`;
    }
  });

  // Card Icon Pulse Effect
  const cardIcons = document.querySelectorAll('.card-icon');
  cardIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 0.5s ease';
    });
    
    icon.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });

});

// CSS Animation Keyframes (Add to CSS if needed)
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
document.head.appendChild(style);


