document.addEventListener("DOMContentLoaded", () => {
  fetch("data/articles.json")
    .then(response => response.json())
    .then(articles => {
      const container = document.getElementById("news-container");
      articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <div class="news-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" class="read-more">Read More →</a>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading articles:", err));
});

