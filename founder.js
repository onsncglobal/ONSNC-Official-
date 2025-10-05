// Founder Page Specific JavaScript

// Timeline animation
const timelineObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, timelineObserverOptions);

// Observe timeline items for animation
document.querySelectorAll('.timeline-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
  timelineObserver.observe(item);
});

// Milestone counter animation
const milestoneObserverOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px'
};

const milestoneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateMilestoneCounters();
      milestoneObserver.unobserve(entry.target);
    }
  });
}, milestoneObserverOptions);

// Observe milestones section
const milestonesSection = document.querySelector('.milestones');
if (milestonesSection) {
  milestoneObserver.observe(milestonesSection);
}

// Milestone counter animation function
function animateMilestoneCounters() {
  const counters = document.querySelectorAll('.milestone-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let count = 0;
    const duration = 1500; // 1.5 seconds
    const increment = target / (duration / 16); // 60fps
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count) + (counter.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
      }
    };
    
    updateCount();
  });
}

// Founder profile photo hover effect
const founderPhoto = document.querySelector('.founder-photo');
if (founderPhoto) {
  founderPhoto.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  founderPhoto.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

// Milestone cards animation
const milestoneCardsObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const milestoneCardsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      milestoneCardsObserver.unobserve(entry.target);
    }
  });
}, milestoneCardsObserverOptions);

// Observe milestone cards for animation
document.querySelectorAll('.milestone').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  milestoneCardsObserver.observe(card);
});

// Page load animation for hero section
window.addEventListener('load', () => {
  const founderHero = document.querySelector('.founder-hero');
  if (founderHero) {
    founderHero.style.opacity = '0';
    founderHero.style.transform = 'translateY(30px)';
    founderHero.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
      founderHero.style.opacity = '1';
      founderHero.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // Animate founder profile and details sections
  const founderProfile = document.querySelector('.founder-profile');
  const founderDetails = document.querySelector('.founder-details');
  
  if (founderProfile && founderDetails) {
    founderProfile.style.opacity = '0';
    founderProfile.style.transform = 'translateX(-30px)';
    founderProfile.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
    
    founderDetails.style.opacity = '0';
    founderDetails.style.transform = 'translateX(30px)';
    founderDetails.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
    
    setTimeout(() => {
      founderProfile.style.opacity = '1';
      founderProfile.style.transform = 'translateX(0)';
      founderDetails.style.opacity = '1';
      founderDetails.style.transform = 'translateX(0)';
    }, 500);
  }
});

