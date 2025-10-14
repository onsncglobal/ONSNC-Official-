/* ===== Hero Carousel + Dots + Thumbnails + Swipe ===== */
const heroEventsContainer = document.getElementById('hero-events');
const carouselDotsContainer = document.getElementById('carousel-dots');
const carouselThumbnailsContainer = document.getElementById('carousel-thumbnails');
let currentSlide = 0;

const heroEventsData = [
  {
    "title": "ONSNC Annual Conference 2025",
    "date": "25th November 2025 | Assam",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  },
  {
    "title": "Civilization 3.0 Innovation Talk",
    "date": "5th January 2026 | Online",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  },
  {
    "title": "Youth Leadership Seminar",
    "date": "18th December 2025 | Assam",
    "image": "https://via.placeholder.com/1200x500",
    "thumbnail": "https://via.placeholder.com/160x90",
    "link": "#"
  }
];

// Render slides, dots, thumbnails
heroEventsData.forEach((event, index) => {
  // Slides
  const slide = document.createElement('div');
  slide.classList.add('hero-slide');
  if(index === 0) slide.classList.add('active');
  slide.innerHTML = `
    <img src="${event.image}" alt="${event.title}">
    <div class="hero-content">
      <h2 class="hero-title">${event.title}</h2>
      <p class="hero-date">${event.date}</p>
      <a href="${event.link}" class="hero-btn">Register Now</a>
    </div>
  `;
  heroEventsContainer.appendChild(slide);

  // Dots
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if(index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showSlide(index));
  carouselDotsContainer.appendChild(dot);

  // Thumbnails
  const thumb = document.createElement('img');
  thumb.src = event.thumbnail;
  thumb.alt = event.title;
  thumb.classList.add('carousel-thumbnail');
  if(index === 0) thumb.classList.add('active');
  thumb.addEventListener('click', () => showSlide(index));
  carouselThumbnailsContainer.appendChild(thumb);
});

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.carousel-dot');
const thumbnails = document.querySelectorAll('.carousel-thumbnail');

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  thumbnails.forEach(thumb => thumb.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  thumbnails[index].classList.add('active');
  currentSlide = index;
}

// Auto-slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Prev/Next buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});
document.querySelector('.next-btn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

/* ===== Swipe Support ===== */
let startX = 0, endX = 0;
const threshold = 50;

heroEventsContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
heroEventsContainer.addEventListener('touchmove', e => endX = e.touches[0].clientX);
heroEventsContainer.addEventListener('touchend', () => {
  const diffX = endX - startX;
  if(Math.abs(diffX) > threshold){
    currentSlide = diffX > 0 ? (currentSlide - 1 + slides.length) % slides.length : (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  startX = 0; endX = 0;
});

/* ===== Explore More Events ===== */
const eventsData = [
  {"title":"ONSNC Tech Workshop 2025","date":"10th Dec 2025","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"ONSNC Community Meetup","date":"20th Jan 2026","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"Youth Leadership Seminar","date":"18th Dec 2025","thumbnail":"https://via.placeholder.com/400x225","link":"#"},
  {"title":"Innovation Roundtable","date":"12th Feb 2026","thumbnail":"https://via.placeholder.com/400x225","link":"#"}
];

let displayedEvents = 0;
const eventsBatchSize = 2;
const eventsGrid = document.getElementById('events-grid');
const loadMoreEventsBtn = document.getElementById('load-more-events-btn');

function renderEventsBatch() {
  const batch = eventsData.slice(displayedEvents, displayedEvents + eventsBatchSize);
  batch.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <img src="${event.thumbnail}" alt="${event.title}">
      <div class="event-info">
        <h4 class="event-title">${event.title}</h4>
        <p class="event-date">${event.date}</p>
        <a href="${event.link}" class="event-btn">Learn More</a>
      </div>
    `;
    eventsGrid.appendChild(card);
  });
  displayedEvents += batch.length;
  if(displayedEvents >= eventsData.length) loadMoreEventsBtn.style.display = 'none';
}

renderEventsBatch();
loadMoreEventsBtn.addEventListener('click', renderEventsBatch);

