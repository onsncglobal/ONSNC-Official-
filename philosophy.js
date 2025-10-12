// Expand Civilization 3.0 sub-timeline
document.querySelectorAll('.expandable').forEach(milestone => {
  milestone.addEventListener('click', () => {
    milestone.classList.toggle('active');
  });
});

// Timeline Scroll
const track = document.querySelector('.timeline-track');
const leftBtn = document.querySelector('.timeline-scroll-indicator .fa-chevron-left');
const rightBtn = document.querySelector('.timeline-scroll-indicator .fa-chevron-right');

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -250, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 250, behavior: 'smooth' });
});

// Modal logic
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.timeline-milestone').forEach(milestone => {
  milestone.addEventListener('click', () => {
    const infoCard = milestone.querySelector('.info-card');
    if(infoCard) {
      modalBody.innerHTML = infoCard.innerHTML;
      modalOverlay.style.display = 'flex';
    }
  });
});

modalClose.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

window.addEventListener('click', e => {
  if(e.target === modalOverlay) modalOverlay.style.display = 'none';
});