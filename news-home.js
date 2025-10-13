// Latest news data
const latestNewsData = [
  {
    type: "news",
    title: "AI Revolution in India",
    date: "2025-10-10",
    link: "/news-home.html#Technology",
    image: "images/ai-india.jpg"
  },
  {
    type: "news",
    title: "Assam's Bamboo Forest Conservation",
    date: "2025-10-08",
    link: "/news-home.html#Environment",
    image: "images/bamboo.jpg"
  },
  {
    type: "news",
    title: "Policy Reforms Announced",
    date: "2025-10-12",
    link: "/news-home.html#Politics",
    image: "images/policy.jpg"
  }
];

// Latest videos data
const latestVideoData = [
  {
    title: "Community Education Pilot",
    link: "https://www.youtube.com/watch?v=VIDEO_ID",
    thumbnail: "images/video-education.jpg"
  },
  {
    title: "Sustainable Farming Initiatives",
    link: "https://www.youtube.com/watch?v=VIDEO_ID2",
    thumbnail: "images/video-farming.jpg"
  }
];

// Render latest news
function renderLatestNews() {
  const newsContainer = document.getElementById('latest-news-grid');
  latestNewsData.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('news-card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3><a href="${item.link}">${item.title}</a></h3>
      <p class="news-date">${item.date}</p>
      <a href="${item.link}" class="read-more">Read More</a>
    `;
    newsContainer.appendChild(card);
  });

  // Render videos
  const videoContainer = document.getElementById('latest-video-grid');
  latestVideoData.forEach(video => {
    const card = document.createElement('div');
    card.classList.add('news-card');
    card.innerHTML = `
      <div class="video-thumbnail">
        <a href="${video.link}" target="_blank">
          <img src="${video.thumbnail}" alt="${video.title}">
          <div class="play-button">&#9658;</div>
        </a>
      </div>
      <h3><a href="${video.link}" target="_blank">${video.title}</a></h3>
    `;
    videoContainer.appendChild(card);
  });
}

window.onload = renderLatestNews;