// Global Crisis Page Specific JavaScript

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
document.querySelectorAll('.issue-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Reference items animation
document.querySelectorAll('.reference-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  observer.observe(item);
});

// Page load animation for header
window.addEventListener('load', () => {
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.style.opacity = '0';
    pageHeader.style.transform = 'translateY(30px)';
    pageHeader.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
      pageHeader.style.opacity = '1';
      pageHeader.style.transform = 'translateY(0)';
    }, 300);
  }
});

