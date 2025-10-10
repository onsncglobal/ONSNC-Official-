// Optional: Click cards to redirect to category page or Google Form
document.querySelectorAll('.mc-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Redirect to detailed media page or Google Form.');
    // Example: window.location.href = 'media-subpage.html';
  });
});

