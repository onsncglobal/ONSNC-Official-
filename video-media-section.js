// Sample media data
const mediaData = [
  {
    "title": "ONSNC Annual Conference 2025",
    "description": "Highlights from the ONSNC Annual Conference.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    "title": "Innovation in Civilization 3.0",
    "description": "Key breakthroughs and updates in Civilization 3.0.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    "title": "ONSNC Media Coverage",
    "description": "Watch media coverage of ONSNC initiatives.",
    "thumbnail": "https://via.placeholder.com/400x225",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

let displayedCount = 0;
const batchSize = 2;

const grid = document.getElementById('media-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close-btn');

function renderMediaBatch() {
  const batch = mediaData.slice(displayedCount, displayedCount + batchSize);

  batch.forEach(media => {
    const card = document.createElement('div');
    card.classList.add('media-card');
    card.innerHTML = `
      <img src="${media.thumbnail}" alt="${media.title}">
      <div class="media-info">
        <h3 class="media-title">${media.title}</h3>
        <p class="media-description">${media.description}</p>
      </div>
    `;
    grid.appendChild(card);

    // Click event on card opens modal
    card.addEventListener('click', () => {
      modalVideo.src = media.videoUrl + "?autoplay=1";
      modal.style.display = 'flex';
    });
  });

  displayedCount += batch.length;

  if(displayedCount >= mediaData.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Initial render
renderMediaBatch();
loadMoreBtn.addEventListener('click', renderMediaBatch);

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.src = "";
});

// Close modal when clicking outside the video
window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
    modalVideo.src = "";
  }
});

